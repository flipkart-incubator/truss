import template from "./template.html";
import "./style.less";

export default {
	render: function () {
		console.log("render of career called");
		const containerSelector = this.getUniqueId();
		const placeholders = this.instanceConfig.placeholders;
		document.querySelector(`#${containerSelector}`).innerHTML = template(placeholders);
	},
    template,
    config: {}
};
