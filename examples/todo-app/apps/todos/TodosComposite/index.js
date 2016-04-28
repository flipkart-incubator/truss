import template from "./templates/composite.html";

import Initializer from "plugins/dot2";
import config from "./config.js";

import "./styles/todo.less";
import Reducers from "./reducers";


export default {
    emptyNewInput (data) {
        data.event.target.value = "";
    },
    render() {
        var self = this;
        return Initializer.call(this, config.VMConfig, template, Reducers);
    },
	config
};