import { createStore, combineReducers } from 'redux';
import {h, diff, patch} from "virtual-dom";
import parser from 'vdom-parser';

import DomHelper from "plugins/dom";
import Utils from "plugins/utils";
const $ = DomHelper.getDomNode;

var render = function () {
    let self = this;
    
    
    return new Promise(function(res, rej){
        var patcher = function(){
            this.containerNodeCache = this.containerNodeCache || document.querySelector(this.getModuleContainer() + " div");
            
            var containerCache = parser(this.containerNodeCache),
                nodeCache = parser(this.template(this.store.getState())),
                patches = diff(containerCache, nodeCache);

            this.containerNodeCache = patch(this.containerNodeCache, patches);
            res();
        };
        patcher = patcher.bind(self);
        window.requestAnimationFrame(function(){
            patcher();
        });
    });
};


var eventHandlers = function () {
    var self = this;

    Utils.each(this.events, (evtDetail, key) => {

        Utils.each(evtDetail, function(val) {
            var selectors,
                dispatchFn,
                publishFn;

            dispatchFn = function(e) {
                var publishData = {type: val.type};
                if (val.valueIn) publishData[val.valueIn] = $(this).val();
                if (val.eventIn) publishData[val.eventIn] = e;

                if (val.data && val.data.length) {
                    publishData.data = {};
                    val.data.forEach((dataId) => {
                        publishData.data[dataId] = $(this).data(dataId);
                    });
                }

                // If key press needs to be handled
                if (val.which) {
                    if (val.which.indexOf(e.which) > -1) {
                        self.store.dispatch(publishData);
                    }
                } else {
                    self.store.dispatch(publishData);
                }
            };

            publishFn = function(e) {
                var publishData = {};
                if (val.valueIn) publishData[val.valueIn] = $(this).val();
                if (val.eventIn) publishData[val.eventIn] = e;

                if (val.data && val.data.length) {
                    publishData.data = {};
                    val.data.forEach((dataId) => {
                        publishData.data[dataId] = $(this).data(dataId);
                    });
                }


                // If key press needs to be handled
                if (val.which) {
                    if (val.which.indexOf(e.which) > -1) {
                        self.publish(val.eventName, publishData);
                    }
                } else {
                    self.publish(val.eventName, publishData);
                }
            };

            // selectors || container
            if (val.selectors) {
                selectors = val.selectors.join(",");
            }

            if (!selectors) {
                if (val.type) {
                    $(self.getModuleContainer()).on(key, dispatchFn);
                } else if (val.eventName) {
                    $(self.getModuleContainer()).on(key, publishFn);
                }
            } else {
                if (val.type) {
                    $(self.getModuleContainer()).on(key, selectors, dispatchFn);
                } else if (val.eventName) {
                    $(self.getModuleContainer()).on(key, selectors, publishFn);
                }
            }
        });
    });
};


export default function intialize(config, template, reducers) {

    this.template = template;
    this.store = createStore(combineReducers(reducers), config.store, window.devToolsExtension ? window.devToolsExtension() : undefined);
    this.events = config.events;
    this.containerNodeCache = undefined;

    $(this.getModuleContainer()).setHtml("<div></div>");
    this.store.subscribe(render.bind(this));
    eventHandlers.call(this)

    return render.call(this);    
};