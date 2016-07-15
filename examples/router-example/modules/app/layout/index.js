import template from "./templates/composite.html";
import "./styles/root.less";

export default {
	resolveRenderOn: function(){
		return new Promise((resolve, reject)=>{
			reject({
				name: "John Doe"
			})
		});
	},

	render: function(data){
		console.log(data);
		console.log("render of layout called");
		const containerSelector = this.getUniqueId();
		const placeholders = this.instanceConfig.placeholders;
		document.querySelector(`#${containerSelector}`).innerHTML = template(placeholders);
	},

	onRenderComplete: function(){
		console.log("onRenderComplete of layout called");
	}
};
