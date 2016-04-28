const initialState = [];

export default function todos(state = initialState, action) {

    var returnObj;

	switch (action.type) {
        case "R_ADD_TODO":
            returnObj = [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text
                },
                ...state
            ];
            return returnObj;
        case "R_TOGGLE":
            return Object.assign([], state).map(function(todo) {
                if (todo.id === action.data.id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
		default:
			return state
	}
}