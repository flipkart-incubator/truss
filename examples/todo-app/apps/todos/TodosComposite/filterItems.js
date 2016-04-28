export default function(state, block) {
    var ret = "";

    if (state.showAll) {
        ret = ret + block.fn(this);
    } else if (state.showActive && !this.completed) {
        ret = ret + block.fn(this);
    } else if (state.showCompleted && this.completed) {
        ret = ret + block.fn(this);
    }

    return ret;
};