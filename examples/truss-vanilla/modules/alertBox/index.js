import DomHelper from 'plugins/dom';
import TemplateHelper from 'plugins/template';
import templateFn from './template.html';
import './styles/default.less';
'use strict';
    /**
     * Attaches/removes the event handlers based on the value of the
     * parameter.
     */
    function setInputHandlers() {
        var self = this;
        var $closeButton = self.$container.find('.js-close-button');

        // If no close button exists.
        if(! $closeButton.length) {
            return;
        }
        $closeButton.on('click', closeAlertBox.bind(self));
    }

    /**
     * Closes the alert box.
     */
    function closeAlertBox() {
        var self = this;

        self.$container.hide();
        self.publish("CLOSED_ALERT_BOX",{
            uniqueId : self.getUniqueId()
        });
    }

    export default {
        init: function(){
            var self = this;
            self.$container =
                DomHelper.getDomNode(self.getModuleContainer());

            var renderPromise = self.render.call(self);

            return renderPromise.then(function() {
                setInputHandlers.call(self, true);
            }, function() {
                console.error('alertBox: Failed to render template.');
            });
        },
        render: function() {
            var self = this;
            self.$container.setHtml(TemplateHelper.render(templateFn, self.modulePlaceholders));
            return Promise.resolve();
        }
    };
