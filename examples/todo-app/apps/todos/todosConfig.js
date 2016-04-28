import TodosCompositeInstance from "apps/todos/TodosComposite";

export default {
    staticConfig: {
        routeConfig: [{
            "appName": "todos",
            "path": "todos",
            "state": "root.todos",
            "module": {
                "moduleName": "TodosComposite",
                "instanceConfig": {
                    "container": "#content-container",
                    "placeholders": {},
                    "listensTo": [{
                        "eventName": 'T_TODO_ADDED',
                        "eventPublisher": '#content-container',
                        "callback": "emptyNewInput"
                    }]
                },
                "instance": TodosCompositeInstance
            }
        }]
    }
};