const emptyState = {
    showAll: false,
    showActive: false,
    showCompleted: false
};

export default function state(state = emptyState, action) {
    switch (action.type) {
		case "R_SHOW_COMPLETED":
            return Object.assign({}, emptyState, { showCompleted: true });
        case "R_SHOW_ACTIVE":
            return Object.assign({}, emptyState, { showActive: true });
        case "R_SHOW_ALL":
            return Object.assign({}, emptyState, { showAll: true });
        default:
            return Object.assign({}, emptyState, { showAll: true });
	}
}