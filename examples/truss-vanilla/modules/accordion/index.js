/**
 * Accordion module
 *
 * USAGE:
 * The module placeholders contains the following items:
 *  autoCollapse : BOOLEAN (defaults to true)
 *  useCSS : BOOLEAN (defaults to false) : Set to true to enable class changes to the body div
 *   whenever it is opened or closed.
 *  items: ARRAY - Each object in the items array should specift a header config, a body config,
 *      and optionally can contain a isOpen and alwaysRerender fields
 *      - header : String or Object
 *      - body : String or Object
 *          - Both header or body, if objects, should specify either (templateURL and templateData)
 *          or (moduleName and modulePlaceholders)
 *      - isOpen : BOOLEAN - Should the item body be open when first rendered.
 *      - alwaysRerender: Should the body sub-module be re-rendered whenever the accordion item is opened.
 */
import DomHelper from 'framework/plugins/dom';
import TemplateHelper from 'framework/plugins/template';
import ModuleHelper from 'framework/plugins/module';
import PromiseHelper from 'framework/plugins/promise';
import _ from 'framework/adapters/lodash';

import templateFn from './template.html';
import './styles/default.less';

export default {

        /**
         * Renders the accordion module
         *
         * All the headers are rendered by default, Only those body items that have their isOpen
         * attribute set to TRUE will be rendered.
         *
         * The event listeners are attached once all the headers are rendered.
         *
         * @param data
         * @returns {Promise}
         */
        render: function(data) {
            var self = this;
            self.config.containerNode = DomHelper.getDomNode(this.getModuleContainer());
            self.config.Id = this.getUniqueId() + '-accordion';
           // var promise = TemplateHelper.fetchTemplate(self.getModuleName(), 'index.html');

           // return promise.then(function(handlebarTemplate) {
                self.config.containerNode.setHtml(TemplateHelper.render(templateFn, self.config));

                var divPromises = [];
                self.config.items.forEach(function(item, i) {
                    var headerConfig = item.header;
                    var headerSelector = self.getHeaderSelector.call(self, i);

                    divPromises.push(self.renderDiv.call(self, headerConfig, headerSelector, self.getUniqueId()).then(function() {}, function() {
                        console.log('RenderDiv error');
                    }))

                    if(item.isOpen === true) {
                        self.showBody(i);
                    } else {
                        self.hideBody(i);
                    }
                });

                self.setEventListeners.call(self);
                return Promise.resolve();

                // Check if all renderDiv promises are fulfilled.
                /*return PromiseHelper.all(divPromises, function() {}, function() {
                    console.log('Failed to render one or more divs: '+self.config.Id);
                })*/

            /*}, function () {
                console.log('Fetch template error: ' + self.config.Id);
            });*/
        },

        /**
         * Init: sets default config options and calls render().
         *
         * @param data
         * @returns {Promise}
         */
		init: function (data) {
            this.config = this.modulePlaceholders;
            if(!(this.config.autoCollapse === false)) {
                this.config.autoCollapse = true;
            }
            return this.render(data);
        },

        /**
         * Header selector of item #index as defined in the index.html template.
         *
         * @param index
         * @returns {string}
         */
		getHeaderSelector: function (index) {
            return '#' + this.config.Id + '-' + index + '-header';
        },

        /**
         * Returns the selector for all the header divs as defined in the index.html template.
         *
         * @returns {string}
         */
		getAllHeadersSelector: function () {
            return '.' + this.config.Id + '-header';
        },

        /**
         * Body selector of item #index as defined in the index.html template.
         *
         * @param index
         * @returns {string}
         */
		getBodySelector: function (index) {
            return '#' + this.config.Id + '-' + index + '-body';
        },

        /**
         * Shows the body corresponding to the index as per the config.
         *
         * @param index
         */
		showBody: function (index) {
            var self = this;
            var selector = self.getBodySelector.call(self, index);
            var bodyNode = self.config.containerNode.find(selector)[0];

            if(self.config.useCSS === true) {
                bodyNode.removeClass('closed');
                bodyNode.addClass('open');
            } else {
                bodyNode._node.slideDown();
            }

            var item = self.config.items[index];

            if(item.alwaysRerender === true || item.rendered !== true) {
                self.renderDiv.call(self, item.body, selector).then(function() {
                    item.rendered = true;
                }, function() {
                    item.rendered = false;
                    console.log('failed to render body div: '+selector);
                });
            }
            item.isOpen = true;
            self.publish("SHOW_BODY",{index : index});
        },

        /**
         * Hides the body corresponding to the index as per the config.
         *
         * @param index
         */
		hideBody: function (index) {
            var self = this;
            var selector = self.getBodySelector.call(self, index);
            var bodyNode = self.config.containerNode.find(selector)[0];
            if(self.config.useCSS === true) {
                bodyNode.removeClass('open');
                bodyNode.addClass('closed');
            } else {
                if(bodyNode._node) bodyNode._node.slideUp();
            }


            self.config.items[index].isOpen = false;
            self.publish("HIDE_BODY",{index : index});
        },

        /**
         * Collapse all the currently open item bodies.
         */
		autoCollapse : function () {
            var self = this;
            self.config.items.forEach(function(item, i) {
                if(item.isOpen === true) {
                    self.hideBody(i);
                }
            });
        },

        /**
         * Add click listeners to all the header nodes.
         */
		setEventListeners: function () {
            var self = this;
            var clickHandler = function() {
                var getKey = function(node) {
                    return node.id.substring(node.id.lastIndexOf('-')+1, node.id.length);
                };
                var index = getKey(this.parentNode);

                if(self.config.items[index].isOpen === true) {
                    self.hideBody.call(self, index);
                } else {
                    if(self.config.autoCollapse === true) {
                        self.autoCollapse.call(self);
                    }
                    self.showBody.call(self, index);
                }
            };
            self.config.containerNode.on('click', self.getAllHeadersSelector.call(self), clickHandler);
        },

        /**
         * Renders the div (either header or body) corresponding to the dom selector
         * The divConfig parameter specifies the content of the div and can be any of the following:
         *  - STRING - Rendered as it is.
         *  - OBJECT with templateSrc and templateData fields: The template is loaded and rendered with the data
         *  - OBJECT with moduleName and placeholders fields: The module is instantiated and the placeholders are
         *  passed along to that module.
         *
         * @param divConfig
         * @param selector
         */
		renderDiv: function (divConfig, selector) {
            //import templateUrl from divConfig.templateURL;
            var self = this;
            var node = self.config.containerNode.find(selector);

            if(_.isString(divConfig)) {
                node.setText(divConfig);
                return PromiseHelper.getPromise(function(resolve, reject) {
                    resolve();
                });
            } else {
                if(divConfig.hasOwnProperty('templateURL') && divConfig.hasOwnProperty('templateData')) {
                    var headerTemplatepromise = require('modules/accordion/templates/examples/bodyTemplate.html');//divConfig.templateURL);

                    node.setHtml(TemplateHelper.render(headerTemplatepromise,divConfig.templateData));
                    return Promise.resolve();
                    /*return headerTemplatepromise.then(function(template) {
                        node.setHtml(TemplateHelper.render(template, divConfig.templateData));
                    });*/
                } else if(divConfig.hasOwnProperty('moduleName') && divConfig.hasOwnProperty('instanceConfig')) {
                    var moduleInstanceConfig = {};
					moduleInstanceConfig.moduleName =divConfig.moduleName;
					moduleInstanceConfig.instanceConfig = {};
                    moduleInstanceConfig.instanceConfig.placeholders = divConfig.instanceConfig.placeholders;
                    moduleInstanceConfig.instance = divConfig.instance;
                    moduleInstanceConfig.instanceConfig.container = selector;
                    moduleInstanceConfig.instanceConfig.placeholders.container = selector;
					ModuleHelper.loadModule(moduleInstanceConfig);
					ModuleHelper.createInstance(
						moduleInstanceConfig,
						moduleInstanceConfig.instanceConfig,
						this.getUniqueId()
					);
                   /* return ModuleHelper.loadModule(moduleName).then(function() {
                        return ModuleHelper.createInstance(moduleName, moduleInstanceConfig, self.getUniqueId());
                    });*/
                }
            }

            return Promise.resolve();
            // divConfig did not match any of the above: return rejected promise.
            /*node.setText("");
            return PromiseHelper.getPromise(function(resolve, reject) {
                reject();
            });*/
        }
}
