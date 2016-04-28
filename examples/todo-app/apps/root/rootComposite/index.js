import Initializer from "plugins/dot2";

import template from "./templates/composite.html";
import config from "./config.js";
import Reducers from "./reducers";
import "./styles/root.less";

export default {
    render () {
        return Initializer.call(this, config.VMConfig, template, Reducers);
    },
	config
};