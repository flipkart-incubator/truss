let defaultVal = {
	"value": "Durgesh",
	"id": 4567,
	"style": "border-bottom-color: rgb(0, 68, 68);"
};

export default function state(state = defaultVal, action) {
	switch (action.type) {
		case "CHANGE_EXTRACT":
			return Object.assign({}, state);
		default:
			return Object.assign({}, state);
	}
}
