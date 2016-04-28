webpackJsonp([2,3],{

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _TodosComposite = __webpack_require__(126);
	
	var _TodosComposite2 = _interopRequireDefault(_TodosComposite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
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
	                "instance": _TodosComposite2.default
	            }
	        }]
	    }
	};

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _composite = __webpack_require__(127);
	
	var _composite2 = _interopRequireDefault(_composite);
	
	var _dot = __webpack_require__(14);
	
	var _dot2 = _interopRequireDefault(_dot);
	
	var _config = __webpack_require__(131);
	
	var _config2 = _interopRequireDefault(_config);
	
	__webpack_require__(132);
	
	var _reducers = __webpack_require__(134);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    emptyNewInput: function emptyNewInput(data) {
	        data.event.target.value = "";
	    },
	    render: function render() {
	        var self = this;
	        return _dot2.default.call(this, _config2.default.VMConfig, _composite2.default, _reducers2.default);
	    },
	
	    config: _config2.default
	};

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(69);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;
	
	  return ((stack1 = __default(__webpack_require__(128)).call(depth0 != null ? depth0 : {},((stack1 = (data && data.root)) && stack1.state),{"name":"./helpers/filterItems","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
	},"2":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;
	
	  return "                <li data-id=\""
	    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
	    + "\" class=\"task-"
	    + alias2(alias1((depth0 != null ? depth0.completed : depth0), depth0))
	    + "\">\n                    <div class=\"view\">\n"
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.completed : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
	    + "                        <label>"
	    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
	    + "</label>\n                        <button class=\"destroy\" data-id=\""
	    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
	    + "\"></button>\n                    </div>\n                </li>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    return "                            <input class=\"toggle\" type=\"checkbox\" data-id=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
	    + "\" checked=\"checked\">\n";
	},"5":function(container,depth0,helpers,partials,data) {
	    return "                            <input class=\"toggle\" type=\"checkbox\" data-id=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
	    + "\">\n";
	},"7":function(container,depth0,helpers,partials,data) {
	    return " selected ";
	},"9":function(container,depth0,helpers,partials,data) {
	    return "            <button class=\"clear-completed\">Clear completed</button>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};
	
	  return "<section class=\"todoapp\">\n    <header class=\"header\">\n        <h1>todos</h1>\n        <input class=\"new-todo\" placeholder=\"What needs to be done?\" autofocus>\n    </header>\n    <section class=\"main\">\n        <input class=\"toggle-all\" type=\"checkbox\">\n        <label for=\"toggle-all\">Mark all as complete</label>\n        <ul class=\"todo-list\">\n"
	    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.todos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "        </ul>\n    </section>\n\n<!--h(\"div\",[\n    h(\"section.todoapp\", [\n        h(\"header.header\",[\n            h(\"h1\", \"todos\"),\n            h(\"input.new-todo\", {\n                \"placeholer\": \"What needs to be done?\",\n                \"autofocus\": true,\n            })\n        ]),\n        h(\"section.main\", [\n            h(\"input.toggle-all\", {\n                \"type\": \"checkbox\"\n            }),\n            h(\"label\", {\n                \"for\": \"toggle-all\"\n            }, \"Mark all as complete\"),\n            h(\"ul.todo-list\")\n        ]),\n        h(\"footer.footer\", [])\n    ]),\n    h(\"footer.info\", [\n        h(\"p\", \"Built using Truss\")\n    ])\n])-->\n    <footer class=\"footer\">\n        <span class=\"todo-count\">\n            "
	    + container.escapeExpression(__default(__webpack_require__(129)).call(alias1,(depth0 != null ? depth0.todos : depth0),{"name":"./helpers/leftCount","hash":{},"data":data}))
	    + " items left.\n        </span>\n        <ul class=\"filters\">\n            <li>\n                <a href=\"javascript:void(0)\" class=\"state-all "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.showAll : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\">All</a>\n            </li>\n            <li>\n                <a href=\"javascript:void(0)\" class=\"state-active "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.showActive : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\">Active</a>\n            </li>\n            <li>\n                <a href=\"javascript:void(0)\" class=\"state-completed "
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.showCompleted : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "\">Completed</a>\n            </li>\n        </ul>\n"
	    + ((stack1 = __default(__webpack_require__(130)).call(alias1,(depth0 != null ? depth0.todos : depth0),{"name":"./helpers/showCompletedLink","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    </footer>\n</section>\n<footer class=\"info\">\n    <p>Built using Truss</p>\n</footer>";
	},"useData":true});

/***/ },

/***/ 128:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (state, block) {
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
	
	;

/***/ },

/***/ 129:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (todoList) {
	    var filteredList = todoList.filter(function (todo) {
	        return !todo.completed;
	    });
	
	    return filteredList.length;
	};

/***/ },

/***/ 130:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (todoList, block) {
	    var filteredList = todoList.filter(function (todo) {
	        return todo.completed;
	    });
	
	    if (filteredList.length > 0) {
	        return block.fn(this);
	    }
	};
	
	;

/***/ },

/***/ 131:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	
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
	            }, {
	                selectors: [".state-active"],
	                type: "R_SHOW_ACTIVE",
	                valueIn: "text",
	                eventIn: "event"
	            }, {
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

/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(133);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(94)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./todo.less", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./todo.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(93)();
	// imports
	
	
	// module
	exports.push([module.id, "hr {\n  margin: 20px 0;\n  border: 0;\n  border-top: 1px dashed #c5c5c5;\n  border-bottom: 1px dashed #f7f7f7;\n}\n@media (min-width: 899px) {\n  .learn-bar {\n    width: auto;\n    padding-left: 300px;\n  }\n}\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\nbutton {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: 100%;\n  vertical-align: baseline;\n  font-family: inherit;\n  font-weight: inherit;\n  color: inherit;\n  -webkit-appearance: none;\n  appearance: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n}\nbutton,\ninput[type=\"checkbox\"] {\n  outline: none;\n}\n.hidden {\n  display: none;\n}\n.todoapp input::-webkit-input-placeholder {\n  font-style: italic;\n  font-weight: 300;\n  color: #e6e6e6;\n}\n.todoapp input::-moz-placeholder {\n  font-style: italic;\n  font-weight: 300;\n  color: #e6e6e6;\n}\n.todoapp input::input-placeholder {\n  font-style: italic;\n  font-weight: 300;\n  color: #e6e6e6;\n}\n.new-todo,\n.edit {\n  position: relative;\n  margin: 0;\n  width: 100%;\n  font-size: 24px;\n  font-family: inherit;\n  font-weight: inherit;\n  line-height: 1.4em;\n  border: 0;\n  outline: none;\n  color: inherit;\n  padding: 6px;\n  border: 1px solid #999;\n  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n}\n.new-todo {\n  padding: 16px 16px 16px 60px;\n  border: none;\n  background: rgba(0, 0, 0, 0.003);\n  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);\n}\n.main {\n  position: relative;\n  z-index: 2;\n  border-top: 1px solid #e6e6e6;\n}\nlabel[for='toggle-all'] {\n  display: none;\n}\n.toggle-all {\n  position: absolute;\n  top: -55px;\n  left: -12px;\n  width: 60px;\n  height: 34px;\n  text-align: center;\n  border: none;\n  /* Mobile Safari */\n}\n.toggle-all:before {\n  content: '\\276F';\n  font-size: 22px;\n  color: #e6e6e6;\n  padding: 10px 27px 10px 27px;\n}\n.toggle-all:checked:before {\n  color: #737373;\n}\n.todo-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.todo-list li {\n  position: relative;\n  font-size: 24px;\n  border-bottom: 1px solid #ededed;\n}\n.todo-list li:last-child {\n  border-bottom: none;\n}\n.todo-list li.editing {\n  border-bottom: none;\n  padding: 0;\n}\n.todo-list li.editing .edit {\n  display: block;\n  width: 506px;\n  padding: 13px 17px 12px 17px;\n  margin: 0 0 0 43px;\n}\n.todo-list li.editing .view {\n  display: none;\n}\n.todo-list li .toggle {\n  text-align: center;\n  width: 40px;\n  /* auto, since non-WebKit browsers doesn't support input styling */\n  height: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  margin: auto 0;\n  border: none;\n  /* Mobile Safari */\n  -webkit-appearance: none;\n  appearance: none;\n}\n.todo-list li.task-false .toggle:after {\n  content: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#ededed\" stroke-width=\"3\"/></svg>');\n}\n.todo-list li.task-true .toggle:after {\n  content: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#bddad5\" stroke-width=\"3\"/><path fill=\"#5dc2af\" d=\"M72 25L42 71 27 56l-4 4 20 20 34-52z\"/></svg>');\n}\n.todo-list li label {\n  white-space: pre-line;\n  word-break: break-all;\n  padding: 15px 60px 15px 15px;\n  margin-left: 45px;\n  display: block;\n  line-height: 1.2;\n  transition: color 0.4s;\n}\n.todo-list li.task-true label {\n  color: #d9d9d9;\n  text-decoration: line-through;\n}\n.todo-list li .destroy {\n  display: none;\n  position: absolute;\n  top: 0;\n  right: 10px;\n  bottom: 0;\n  width: 40px;\n  height: 40px;\n  margin: auto 0;\n  font-size: 30px;\n  color: #cc9a9a;\n  margin-bottom: 11px;\n  transition: color 0.2s ease-out;\n}\n.todo-list li .destroy:hover {\n  color: #af5b5e;\n}\n.todo-list li .destroy:after {\n  content: 'x';\n}\n.todo-list li:hover .destroy {\n  display: block;\n}\n.todo-list li .edit {\n  display: none;\n}\n.todo-list li.editing:last-child {\n  margin-bottom: -1px;\n}\n.footer {\n  color: #777;\n  padding: 10px 15px;\n  height: 20px;\n  text-align: center;\n  border-top: 1px solid #e6e6e6;\n}\n.footer:before {\n  content: '';\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 50px;\n  overflow: hidden;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n.todo-count {\n  float: left;\n  text-align: left;\n}\n.todo-count strong {\n  font-weight: 300;\n}\n.filters {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  position: absolute;\n  right: 0;\n  left: 0;\n}\n.filters li {\n  display: inline;\n}\n.filters li a {\n  color: inherit;\n  margin: 3px;\n  padding: 3px 7px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  border-radius: 3px;\n}\n.filters li a.selected,\n.filters li a:hover {\n  border-color: rgba(175, 47, 47, 0.1);\n}\n.filters li a.selected {\n  border-color: rgba(175, 47, 47, 0.2);\n}\n.clear-completed,\nhtml .clear-completed:active {\n  float: right;\n  line-height: 20px;\n  text-decoration: none;\n  cursor: pointer;\n  position: relative;\n}\n.clear-completed:hover {\n  text-decoration: underline;\n}\n.info {\n  margin: 65px auto 0;\n  color: #bfbfbf;\n  font-size: 10px;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n  text-align: center;\n}\n.info p {\n  line-height: 1;\n}\n.info a {\n  color: inherit;\n  text-decoration: none;\n  font-weight: 400;\n}\n.info a:hover {\n  text-decoration: underline;\n}\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  .toggle-all,\n  .todo-list li .toggle {\n    background: none;\n  }\n  .todo-list li .toggle {\n    height: 40px;\n  }\n  .toggle-all {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n    -webkit-appearance: none;\n    appearance: none;\n  }\n}\n@media (max-width: 430px) {\n  .footer {\n    height: 50px;\n  }\n  .filters {\n    bottom: 10px;\n  }\n}\n", ""]);
	
	// exports


/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _todos = __webpack_require__(135);
	
	var _todos2 = _interopRequireDefault(_todos);
	
	var _state = __webpack_require__(136);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    todos: _todos2.default,
	    state: _state2.default
	};

/***/ },

/***/ 135:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = todos;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var initialState = [];
	
	function todos() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];
	
	
	    var returnObj;
	
	    switch (action.type) {
	        case "R_ADD_TODO":
	            returnObj = [{
	                id: state.reduce(function (maxId, todo) {
	                    return Math.max(todo.id, maxId);
	                }, -1) + 1,
	                completed: false,
	                text: action.text
	            }].concat(_toConsumableArray(state));
	            return returnObj;
	        case "R_TOGGLE":
	            return Object.assign([], state).map(function (todo) {
	                if (todo.id === action.data.id) {
	                    todo.completed = !todo.completed;
	                }
	                return todo;
	            });
	        default:
	            return state;
	    }
	}

/***/ },

/***/ 136:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = state;
	var emptyState = {
	    showAll: false,
	    showActive: false,
	    showCompleted: false
	};
	
	function state() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? emptyState : arguments[0];
	    var action = arguments[1];
	
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

/***/ }

});
//# sourceMappingURL=2.Todos-4f6628052ca081a8b5ca.js.map