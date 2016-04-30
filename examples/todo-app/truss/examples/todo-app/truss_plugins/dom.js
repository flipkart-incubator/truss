import _ from "lodash";
import $ from "jquery";


function DomNode(node) {
	this._node = $(node);
	this.elem = this._node[0];
}

function DomCollection(nodeCollection) {
	this._nodeCollection = nodeCollection;

	for (var i = 0; i < this._nodeCollection.length; i++) {
		this.push(new DomNode(this._nodeCollection[i]));
	}
}

DomNode.prototype = {
	prependDOM: function (elem) {
		this._node.prepend(elem._nodeCollection || elem._node);
		return this;
	},
	appendDOM: function (elem) {
		this._node.append(elem._nodeCollection || elem._node);
		return this;
	},
	setHtml: function (html) {
		this._node.html(html);
		return this;
	},
	getHtml: function () {
		return this._node.html();
	},
	setText: function (text) {
		this._node.text(text);
		return this;
	},
	getText: function () {
		return this._node.text();
	},
	addClass: function (className) {
		this._node.addClass(className);
		return this;
	},
	removeClass: function (className) {
		this._node.removeClass(className);
		return this;
	},
	hasClass: function (className) {
		return this._node.hasClass(className);
	},
	on: function () {
		this._node.on.apply(this._node, arguments);
		return this;
	},
	one: function () {
		node.one.apply(node, arguments);
		return this;
	},
	filter: function (selector) {
		var filtered = this._node.filter(selector);
		return new DomCollection(filtered);
	},
	children: function (selector) {
		var children = this._node.children(selector);
		return new DomCollection(children);
	},
	find: function (selector, endIndex, startIndex) {
		var children = this._node.find(selector);

		if (endIndex != null && startIndex == null) {
			children = new DomNode(children[endIndex]);
		} else {
			endIndex = endIndex || (children.length - 1);
			startIndex = startIndex || 0;

			children = new DomCollection(children.slice(startIndex, endIndex + 1));
		}

		return children;
	},
	val: function (value) {
		if (!(typeof value === 'undefined')) {
			this._node.val(value);
			return this;
		}

		return this._node.val();
    },
	is: function (selector) {
		return this._node.is(selector);
	},
	text: function () {
		return this._node.text.apply(this._node, arguments);
	},
	getParent: function (selector) {
		return new DomCollection(this._node.parent(selector));
	},
	getParents: function (selector) {
		return new DomCollection(this._node.parents(selector));
	},
	closest: function (selector) {
		return new DomCollection(this._node.closest(selector));
	},
	attr: function (attrName, value) {
		if (value !== undefined) {
			this._node.attr(attrName, value);
			return this;
		}

		return this._node.attr(attrName);
    },
    data: function (attrName, value) {
		if (value !== undefined) {
			this._node.data(attrName, value);
			return this;
		}

		return this._node.data(attrName);
	},
	prop: function (attrName, value) {
		if (typeof value === 'undefined') {
			this._node.prop(attrName, value);
			return this;
		}

		return this._node.prop(attrName);
	},
	focus: function () {
		this._node.focus();
		return this;
	},
	offset: function () {
		return this._node.offset();
	},
	removeAttr: function (attrName) {
		this._node.removeAttr(attrName);
		return this;
	},
	show: function () {
		this._node.show();
		return this;
	},
	hide: function () {
		this._node.hide();
		return this;
	},
	outerHeight: function () {
		return this._node.outerHeight(true);
	},
	outerWidth: function (includeMargin) {
		return this._node.outerWidth(includeMargin);
	},
	scrollHeight: function () {
		return this._node.prop('scrollHeight');
	},
	css: function () {
		this._node.css.apply(this._node, arguments);
		return this;
	},
	remove: function () {
		this._node.remove();
		return this;
	},
	serializeArray: function () {
		return this._node.serializeArray();
	},
	off: function () {
		this._node.off.apply(this._node, arguments);
		return this;
	},
	window: function () {
		return this._node.get(0).contentWindow;
	},
	length: function () {
		return this._node.length;
	},
	animate: function () {
		this._node.animate.apply(this._node, arguments);
		return this;
	},
	trigger: function (eventName, eventData) {
		this._node.trigger(eventName, eventData);
	},
	scrollTop: function (newScrollHeight) {
		return this._node.scrollTop(newScrollHeight);
	},
	clone: function () {
		return this._node.clone();
	},
	prev: function () {
		return new DomCollection(this._node.prev.apply(this._node, arguments));
	},
	next: function () {
		return new DomCollection(this._node.apply(this._node, arguments));
	},
	toggleClass: function () {
		this._node.toggleClass.apply(this._node, arguments);
		return this;
	},
	getDomElement: function () {
		return this.elem;
	},

	wrapInner: function () {
		this._node.wrapInner.apply(this._node, arguments);
		return this;
	},

	slideUp: function () {
		this._node.slideUp.apply(this._node, arguments);
		return this;
	},

	slideDown: function () {
		this._node.slideDown.apply(this._node, arguments);
		return this;
	},

	empty: function () {
		this._node.empty.apply(this._node, arguments);
		return this;
	}
};

function F() {
	this.prependDOM = function (elem) {
		this._nodeCollection.prepend(elem._nodeCollection || elem._node);
		return this;
	};

	this.appendDOM = function (elem) {
		this._nodeCollection.append(elem._nodeCollection || elem._node);
		return this;
	};

	this.appendHtml = function (htmlString) {
		this._nodeCollection.append(htmlString);
	};

	this.setHtml = function (html) {
		this._nodeCollection.html(html);
		return this;
	};

	this.getHtml = function () {
		return this._nodeCollection.html();
	};

	this.setText = function (text) {
		this._nodeCollection.text(text);
		return this;
	};

	this.getText = function () {
		return this._nodeCollection.text();
	};

	this.addClass = function (classname) {
		this._nodeCollection.addClass(classname);
		return this;
	};

	this.removeClass = function (classname) {
		this._nodeCollection.removeClass(classname);
		return this;
	};

	this.hasClass = function (className) {
		return this._nodeCollection.hasClass(className);
	};

	this.on = function () {
		this._nodeCollection.on.apply(this._nodeCollection, arguments);
		return this;
	};

	this.one = function () {
		this._nodeCollection.one.apply(this._nodeCollection, arguments);
		return this;
	};

	this.filter = function (selector) {
		return new DomCollection(this._nodeCollection.filter(selector));
	};

	this.children = function (selector) {
		return new DomCollection(this._nodeCollection.children(selector));
	};

	this.find = function (selector, endIndex, startIndex) {
		var children = this._nodeCollection.find(selector);

		if (endIndex != null && startIndex == null) {
			children = new DomNode(children[endIndex]);
		} else {
			endIndex = endIndex || (children.length - 1);
			startIndex = startIndex || 0;

			children = new DomCollection(children.slice(startIndex, endIndex + 1));
		}

		return children;
	};

	this.val = function () {
		return this._nodeCollection.val.apply(this._nodeCollection, arguments);
	};

	this.is = function (selector) {
		return this._nodeCollection.is(selector);
	};

	this.text = function () {
		return this._nodeCollection.text.apply(this._nodeCollection, arguments);
	};

	this.getParent = function (selector) {
		return new DomCollection(this._nodeCollection.parent(selector));
	};

	this.getParents = function (selector) {
		return new DomCollection(this._nodeCollection.parents(selector));
	};

	this.closest = function (selector) {
		return new DomCollection(this._nodeCollection.closest(selector));
	};

	this.attr = function (attrName, value) {
		if (value !== undefined) {
			this._nodeCollection.attr(attrName, value);
			return this;
		}

		return this._nodeCollection.attr(attrName);
    };    

	this.data = function (attrName, value) {
		if (value !== undefined) {
			this._nodeCollection.data(attrName, value);
			return this;
		}

		return this._nodeCollection.data(attrName);
    };    
    
	this.focus = function () {
		this._nodeCollection.focus();
		return this;
	};

	this.offset = function () {
		return this._nodeCollection.offset();
	};

	this.prop = function (attrName, value) {
		if (typeof value !== 'undefined') {
			this._nodeCollection.prop(attrName, value);
			return this;
		}

		return this._nodeCollection.prop(attrName);
	};

	this.removeAttr = function (attrName) {
		this._nodeCollection.removeAttr(attrName);
		return this;
	};

	this.show = function () {
		this._nodeCollection.show();
		return this;
	};

	this.hide = function () {
		this._nodeCollection.hide();
		return this;
	};

	this.outerHeight = function (includeMargin) {
		return this._nodeCollection.outerHeight(includeMargin);
	};

	this.outerWidth = function (includeMargin) {
		return this._nodeCollection.outerWidth(includeMargin);
	};

	this.css = function () {
		this._nodeCollection.css.apply(this._nodeCollection, arguments);
		return this;
	};

	this.remove = function () {
		this._nodeCollection.remove();
		return this;
	};

	this.serializeArray = function () {
		return this._nodeCollection.serializeArray();
	};

	this.off = function () {
		this._nodeCollection.off.apply(this._nodeCollection, arguments);
		return this;
	};

	this.animate = function () {
		this._nodeCollection.animate.apply(this._nodeCollection, arguments);
		return this;
	};

	this.window = function () {
		var domNode = this.getDomNode(0);

		return domNode ? domNode.window() : null;
	};

	this.getDomNode = function (index) {
		return this[index];
	};

	this.trigger = function (eventName, eventData) {
		this._nodeCollection.trigger(eventName, eventData);
	};

	this.prev = function () {
		return new DomCollection(this._nodeCollection.prev.apply(this._nodeCollection, arguments));
	};

	this.next = function () {
		return new DomCollection(this._nodeCollection.next.apply(this._nodeCollection, arguments));
	};

	this.toggleClass = function () {
		this._nodeCollection.toggleClass.apply(this._nodeCollection, arguments);
		return this;
	};

	this.scrollTop = function () {
		return this._nodeCollection.scrollTop.apply(this._nodeCollection, arguments);
	};

	this.wrapInner = function () {
		return new DomNode(this._nodeCollection.wrapInner.apply(this._nodeCollection, arguments));
	};

	this.getDomElement = function () {
		return this._nodeCollection[0];
	};

	this.slideUp = function () {
		this._nodeCollection.slideUp.apply(this._nodeCollection, arguments);
		return this;
	};

	this.slideDown = function () {
		this._nodeCollection.slideDown.apply(this._nodeCollection, arguments);
		return this;
	};

	this.empty = function () {
		this._nodeCollection.empty.apply(this._nodeCollection, arguments);
		return this;
	};

}

F.prototype = new Array();
DomCollection.prototype = new F();
DomCollection.constructor = DomCollection;

var DomPlugin = {
	getDomNode: function (selector) {
		//This pattern will allow cascading
		var node = $(selector);

		return new DomCollection(node);
	}
};

export default {
	getDomNode: function (selector) {
		// This pattern will allow cascading
		return DomPlugin.getDomNode(selector);
	}
};
