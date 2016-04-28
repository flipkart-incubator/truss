export default {

    VMConfig: {

        // Initial store data
        store: {},

        // Emit Custom Events on DOM events
        //  All the events are being handles through config.
        events: {
            "change": [{
                type: "R_TOGGLE",
                selectors: [".toggle"],
                data: ["id"],
                valueIn: "value"
            }],
            "click": [{
                selectors: [".state-all"],
                type: "R_SHOW_ALL",
                valueIn: "text",
                eventIn: "event"
            },{
                selectors: [".state-active"],
                type: "R_SHOW_ACTIVE",
                valueIn: "text",
                eventIn: "event"
            },{
                selectors: [".state-completed"],
                type: "R_SHOW_COMPLETED",
                valueIn: "text",
                eventIn: "event"
            }],
            "keyup": [{
                which: [13],
                attributeOnWhich: "value",
                attributeValueOnWhich: "",
                selectors: [".new-todo"],
                type: "R_ADD_TODO",
                valueIn: "text",
                eventIn: "event"
            }, {
                selectors: [".new-todo"],
                which: [13],
                eventName: "T_TODO_ADDED",
                valueIn: "text",
                eventIn: "event"
            }]
        }
    }
};