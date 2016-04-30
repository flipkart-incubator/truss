export default {
    __createModuleArena: function(){
        document.querySelector(this.parentContainer).innerHTML = `<div id="${this.uniqueId}"></div>`;
    },
    render: function(){
        const containerSelector = this.uniqueId;
        const placeholders = this.modulePlaceholders;
        document.querySelector(`#${containerSelector}`).innerHTML = this.template(placeholders);
    }
}