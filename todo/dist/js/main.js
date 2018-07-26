/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/style.scss":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/style.scss ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _dom_handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-handlers */ "./src/js/dom-handlers.js");
/* harmony import */ var _to_do_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-do-list */ "./src/js/to-do-list.js");



class Application {

    renderItemsList() {
        const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_0__["DomHandlers"]();
        const toDoList = new _to_do_list__WEBPACK_IMPORTED_MODULE_1__["ToDoList"]();
        const listPromise = toDoList.getList();

        listPromise.then(data => {
            domHandlers.renderItems(data);
            domHandlers.hideLoader();
        });
    }

}

/***/ }),

/***/ "./src/js/constants/classes.js":
/*!*************************************!*\
  !*** ./src/js/constants/classes.js ***!
  \*************************************/
/*! exports provided: NODE_SELECTORS, DISPLAY_CLASSES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_SELECTORS", function() { return NODE_SELECTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_CLASSES", function() { return DISPLAY_CLASSES; });
const NODE_SELECTORS = {
    VIEW_DESC: 'js-view-desc',
    TODO_ITEM: '.js-todo__item',
    SAVE_ITEM: 'js-save-item',
    UPDATE_STATUS: 'js-update-status',
    ADD_ITEM: 'js-add-item',
    DELETE_ITEM: 'js-delete-item',
    TODO_LOADER: '.js-todo__loader',
    TODO_FORM: '.js-todo-form',
    ITEM_DESC: '.js-item-desc',
    DELETE_BUTTON: '.js-delete-item',
    TODO_LIST: '.js-todo__list',
    TODO_ITEM: '.js-todo__item',
    STATUS_LABEL: '.js-item-status',
    ITEM_DESC_CONTENT: '.js-item-desc-content',
    INPUT_DESC: 'textarea[name="description"]',
    INPUT_STATUS: 'input[name="status"]',
    INPUT_CAPTION: 'input[name="caption"]',
    INPUT_DATE: 'input[name="finishDate"]',
    TEXTAREA_DESCRIPTION: 'textarea[name="description"]',
    INPUT_ID: 'input[name="id"]'
};

const DISPLAY_CLASSES = {
    HIDDEN: 'hidden'
};

/***/ }),

/***/ "./src/js/constants/endpoints.js":
/*!***************************************!*\
  !*** ./src/js/constants/endpoints.js ***!
  \***************************************/
/*! exports provided: ENDPOINTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINTS", function() { return ENDPOINTS; });
const ENDPOINTS = {
    SERVER_PATH: 'http://localhost:3000/api/todo/',
    DESCRIPTION_PATH: '/description'
};

/***/ }),

/***/ "./src/js/constants/index.js":
/*!***********************************!*\
  !*** ./src/js/constants/index.js ***!
  \***********************************/
/*! exports provided: ENDPOINTS, STATUSES, NODE_CLASSES, DISPLAY_CLASSES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpoints */ "./src/js/constants/endpoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ENDPOINTS", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"]; });

/* harmony import */ var _statuses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statuses */ "./src/js/constants/statuses.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUSES", function() { return _statuses__WEBPACK_IMPORTED_MODULE_1__["STATUSES"]; });

/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes */ "./src/js/constants/classes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NODE_SELECTORS", function() { return _classes__WEBPACK_IMPORTED_MODULE_2__["NODE_SELECTORS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_CLASSES", function() { return _classes__WEBPACK_IMPORTED_MODULE_2__["DISPLAY_CLASSES"]; });





/***/ }),

/***/ "./src/js/constants/statuses.js":
/*!**************************************!*\
  !*** ./src/js/constants/statuses.js ***!
  \**************************************/
/*! exports provided: STATUSES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUSES", function() { return STATUSES; });
const STATUSES = {
    NEW: 'NEW',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};

/***/ }),

/***/ "./src/js/dom-handlers.js":
/*!********************************!*\
  !*** ./src/js/dom-handlers.js ***!
  \********************************/
/*! exports provided: DomHandlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomHandlers", function() { return DomHandlers; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants/index.js");
/* harmony import */ var _to_do_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-do-item */ "./src/js/to-do-item.js");





class DomHandlers {

    hideLoader() {
        this.hideElementByClass(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_LOADER);
    }

    showLoader() {
        this.showElementByClass(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_LOADER);
    }

    hideElementByClass(className) {
        document.querySelector(className).classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__["DISPLAY_CLASSES"].HIDDEN);
    }

    hideElementByNode(element) {
        element.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__["DISPLAY_CLASSES"].HIDDEN);
    }

    showElementByClass(className) {
        document.querySelector(className).classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__["DISPLAY_CLASSES"].HIDDEN);
    }

    hideForm() {
        this.hideElementByClass(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM);
    }

    showForm() {
        this.showElementByClass(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM);
    }

    hideDescription() {
        this.hideElementByClass(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].ITEM_DESC);
    }

    showDescription() {
        this.showElementByClass(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].ITEM_DESC);
    }

    switchOnDeleteBtn() {
        document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].DELETE_BUTTON).disabled = false;
    }

    switchOffDeleteBtn() {
        document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].DELETE_BUTTON).disabled = true;
    }

    renderItems(data) {
        const toDoList = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_LIST);

        while (toDoList.firstChild) {
            toDoList.removeChild(toDoList.firstChild);
        }

        data.forEach(item => {
            const caption = item.caption ? item.caption : '';

            const newItemContent = `
                <div class="todo__item js-todo__item" data-id="` + item.id + `">
                    <div class="todo__info">
                        <div class="todo__name">
                            ` + caption + `
                        </div>

                        <div class="todo__status">
                            status: <span class="todo__status-name">` + item.status + `</span>
                        </div>
                    </div>

                    <div class="todo__description-btn">
                        <button class="button js-view-desc">view description</button>
                    </div>
                </div>`;

            toDoList.insertAdjacentHTML('beforeEnd', newItemContent);
        });
    }

    getItemId(element) {
        return element.closest(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_ITEM).getAttribute('data-id');
    }

    getFormStatus() {
        const form = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM);
        const inputStatus = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].INPUT_STATUS);
        return inputStatus.value;
    }

    setFormStatus(status) {
        const form = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM);
        const inputStatus = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].INPUT_STATUS);
        const statusLabel = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].STATUS_LABEL);

        inputStatus.value = status;
        statusLabel.innerHTML = status;
    }

    fillForm(data) {
        const form = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM);
        const inputCaption = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].INPUT_CAPTION);
        const inputDate = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].INPUT_DATE);
        const inputDesc = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].INPUT_DESC);
        const inputId = form.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].INPUT_ID);

        const caption = data.caption ? data.caption : '';
        const date = data.finishDate ? data.finishDate : '';
        const description = data.description ? data.description : '';

        inputCaption.value = caption;
        inputDate.value = date;
        inputDesc.value = description;
        inputId.value = data.id;
        this.setFormStatus(data.status);
    }

    showItemDescription(e) {
        const currentId = { id: this.getItemId(e.target) };
        const toDoItem = new _to_do_item__WEBPACK_IMPORTED_MODULE_1__["ToDoItem"](currentId);

        this.hideForm();
        this.showDescription();
        const descPromise = toDoItem.getDescription();

        descPromise.then(description => {
            document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].ITEM_DESC_CONTENT).innerHTML = description;
        });
    }

    getFormData() {
        let data = {};
        const formData = new FormData(document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM));

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        return data;
    }

    formReset() {
        document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_FORM).reset();
        this.setFormStatus(_constants__WEBPACK_IMPORTED_MODULE_0__["STATUSES"].NEW);
    }

}

/***/ }),

/***/ "./src/js/listeners.js":
/*!*****************************!*\
  !*** ./src/js/listeners.js ***!
  \*****************************/
/*! exports provided: Listeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Listeners", function() { return Listeners; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants/index.js");
/* harmony import */ var _dom_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-handlers */ "./src/js/dom-handlers.js");
/* harmony import */ var _to_do_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./to-do-item */ "./src/js/to-do-item.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/js/app.js");







class Listeners {

    constructor() {
        this.saveStatuse = 0; //0 - save, 1 - update
    }

    start() {
        document.addEventListener('click', e => {

            if (e.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].VIEW_DESC)) {
                const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_1__["DomHandlers"]();
                domHandlers.showItemDescription(e);
            } else {
                let todoItemElement = e.target.closest(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].TODO_ITEM);

                if (todoItemElement) {
                    this.toDoItemEdit(e);
                }
            }

            if (e.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].SAVE_ITEM)) {
                e.preventDefault();
                this.toDoItemsave();
            }

            if (e.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].UPDATE_STATUS)) {
                e.preventDefault();
                this.toDoItemUpdateStatus();
            }

            if (e.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].ADD_ITEM)) {
                this.showAddForm();
            }

            if (e.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__["NODE_SELECTORS"].DELETE_ITEM)) {
                e.preventDefault();
                console.log('asaa');
                this.toDoItemDelete();
            }
        });
    }

    showAddForm() {
        const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_1__["DomHandlers"]();
        domHandlers.hideDescription();
        domHandlers.showForm();
        domHandlers.formReset();
        this.saveStatuse = 0;
        domHandlers.switchOffDeleteBtn();
    }

    toDoItemsave() {
        const app = new _app__WEBPACK_IMPORTED_MODULE_3__["Application"]();
        const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_1__["DomHandlers"]();
        let formData = domHandlers.getFormData();
        let savePromise;
        const item = new _to_do_item__WEBPACK_IMPORTED_MODULE_2__["ToDoItem"](formData);

        if (this.saveStatuse == 0) {
            savePromise = item.save();
        } else if (this.saveStatuse == 1) {
            savePromise = item.update();
        }

        savePromise.then(data => {
            domHandlers.formReset();
            domHandlers.showLoader();
            app.renderItemsList();
            this.saveStatuse = 0;
        });
    }

    toDoItemEdit(e) {
        const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_1__["DomHandlers"]();
        const itemId = { id: domHandlers.getItemId(e.target) };
        const toDoItem = new _to_do_item__WEBPACK_IMPORTED_MODULE_2__["ToDoItem"](itemId);
        const itemPromise = toDoItem.getItemById();

        this.saveStatuse = 1;
        domHandlers.switchOnDeleteBtn();

        itemPromise.then(item => {
            domHandlers.hideDescription();
            domHandlers.showForm();
            domHandlers.fillForm(item);
        });
    }

    toDoItemUpdateStatus() {
        const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_1__["DomHandlers"]();
        const statusesCount = Object.keys(_constants__WEBPACK_IMPORTED_MODULE_0__["STATUSES"]).length;
        const itemStatus = domHandlers.getFormStatus();
        const statuses = Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__["STATUSES"]);
        const statusIndex = statuses.indexOf(itemStatus);
        let newStatus = '';

        if (statusIndex < statusesCount - 1) {
            newStatus = statuses[statusIndex + 1];
        } else {
            newStatus = statuses[0];
        }

        domHandlers.setFormStatus(newStatus);
    }

    toDoItemDelete() {
        const domHandlers = new _dom_handlers__WEBPACK_IMPORTED_MODULE_1__["DomHandlers"]();
        const app = new _app__WEBPACK_IMPORTED_MODULE_3__["Application"]();
        let formData = domHandlers.getFormData();
        const item = new _to_do_item__WEBPACK_IMPORTED_MODULE_2__["ToDoItem"](formData);
        const deletePromise = item.delete();

        deletePromise.then(data => {
            domHandlers.formReset();
            domHandlers.switchOffDeleteBtn();
            this.saveStatuse = 0;
            app.renderItemsList();
        });
    }

}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./src/css/style.scss");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./src/js/app.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/js/listeners.js");




const app = new _app__WEBPACK_IMPORTED_MODULE_1__["Application"]();
const listeners = new _listeners__WEBPACK_IMPORTED_MODULE_2__["Listeners"]();

app.renderItemsList();
listeners.start();

/***/ }),

/***/ "./src/js/to-do-item.js":
/*!******************************!*\
  !*** ./src/js/to-do-item.js ***!
  \******************************/
/*! exports provided: ToDoItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToDoItem", function() { return ToDoItem; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants/index.js");



class ToDoItem {

    constructor({ id = 0, finishDate, caption, description, status = _constants__WEBPACK_IMPORTED_MODULE_0__["STATUSES"].NEW }) {
        this.item = {};
        this.item.id = id;
        this.item.status = status;
        this.item.finishDate = new Date(finishDate);
        this.item.caption = caption;
        this.item.description = description;
        this.item = Object.preventExtensions(this.item);
    }

    getStatus(statuseId) {
        return this.item.status;
    }

    setStatus(statuseId) {
        this.item.status = _constants__WEBPACK_IMPORTED_MODULE_0__["STATUSES"][statuseId];
    }

    getItemById() {
        const itemEndpoint = _constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].SERVER_PATH + this.item.id;

        const itemPromise = fetch(itemEndpoint).then(response => {
            return response.json();
        }).then(data => {
            return data;
        });

        return itemPromise;
    }

    getDescription() {
        const descriptionEndpoint = _constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].SERVER_PATH + this.item.id + _constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].DESCRIPTION_PATH;

        const descPromise = fetch(descriptionEndpoint).then(response => {
            return response.json();
        }).then(data => {
            const description = data.description ? data.description : '';
            return description;
        });

        return descPromise;
    }

    getCaption() {
        return this.item.caption;
    }

    save() {
        const savePromise = fetch(_constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].SERVER_PATH, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(this.item)
        });

        return savePromise;
    }

    update() {
        const updatePromise = fetch(_constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].SERVER_PATH, {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(this.item)
        });

        return updatePromise;
    }

    delete() {
        const deleteEndpoint = _constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].SERVER_PATH + this.item.id;

        const deletePromise = fetch(deleteEndpoint, {
            method: 'delete'
        });

        return deletePromise;
    }

}

/***/ }),

/***/ "./src/js/to-do-list.js":
/*!******************************!*\
  !*** ./src/js/to-do-list.js ***!
  \******************************/
/*! exports provided: ToDoList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToDoList", function() { return ToDoList; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants/index.js");


class ToDoList {

    getList() {
        const listPromise = fetch(_constants__WEBPACK_IMPORTED_MODULE_0__["ENDPOINTS"].SERVER_PATH).then(response => {
            return response.json();
        });

        return listPromise;
    }

}

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9zdHlsZS5zY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3Mvc3R5bGUuc2Nzcz84ZWViIiwid2VicGFjazovLy8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnN0YW50cy9jbGFzc2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMvZW5kcG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnN0YW50cy9zdGF0dXNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZG9tLWhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RvLWRvLWl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RvLWRvLWxpc3QuanMiXSwibmFtZXMiOlsiQXBwbGljYXRpb24iLCJyZW5kZXJJdGVtc0xpc3QiLCJkb21IYW5kbGVycyIsInRvRG9MaXN0IiwibGlzdFByb21pc2UiLCJnZXRMaXN0IiwidGhlbiIsImRhdGEiLCJyZW5kZXJJdGVtcyIsImhpZGVMb2FkZXIiLCJOT0RFX1NFTEVDVE9SUyIsIlZJRVdfREVTQyIsIlRPRE9fSVRFTSIsIlNBVkVfSVRFTSIsIlVQREFURV9TVEFUVVMiLCJBRERfSVRFTSIsIkRFTEVURV9JVEVNIiwiVE9ET19MT0FERVIiLCJUT0RPX0ZPUk0iLCJJVEVNX0RFU0MiLCJERUxFVEVfQlVUVE9OIiwiVE9ET19MSVNUIiwiU1RBVFVTX0xBQkVMIiwiSVRFTV9ERVNDX0NPTlRFTlQiLCJJTlBVVF9ERVNDIiwiSU5QVVRfU1RBVFVTIiwiSU5QVVRfQ0FQVElPTiIsIklOUFVUX0RBVEUiLCJURVhUQVJFQV9ERVNDUklQVElPTiIsIklOUFVUX0lEIiwiRElTUExBWV9DTEFTU0VTIiwiSElEREVOIiwiRU5EUE9JTlRTIiwiU0VSVkVSX1BBVEgiLCJERVNDUklQVElPTl9QQVRIIiwiU1RBVFVTRVMiLCJORVciLCJJTl9QUk9HUkVTUyIsIkRPTkUiLCJEb21IYW5kbGVycyIsImhpZGVFbGVtZW50QnlDbGFzcyIsInNob3dMb2FkZXIiLCJzaG93RWxlbWVudEJ5Q2xhc3MiLCJjbGFzc05hbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJoaWRlRWxlbWVudEJ5Tm9kZSIsImVsZW1lbnQiLCJyZW1vdmUiLCJoaWRlRm9ybSIsInNob3dGb3JtIiwiaGlkZURlc2NyaXB0aW9uIiwic2hvd0Rlc2NyaXB0aW9uIiwic3dpdGNoT25EZWxldGVCdG4iLCJkaXNhYmxlZCIsInN3aXRjaE9mZkRlbGV0ZUJ0biIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZvckVhY2giLCJpdGVtIiwiY2FwdGlvbiIsIm5ld0l0ZW1Db250ZW50IiwiaWQiLCJzdGF0dXMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJnZXRJdGVtSWQiLCJjbG9zZXN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0Rm9ybVN0YXR1cyIsImZvcm0iLCJpbnB1dFN0YXR1cyIsInZhbHVlIiwic2V0Rm9ybVN0YXR1cyIsInN0YXR1c0xhYmVsIiwiaW5uZXJIVE1MIiwiZmlsbEZvcm0iLCJpbnB1dENhcHRpb24iLCJpbnB1dERhdGUiLCJpbnB1dERlc2MiLCJpbnB1dElkIiwiZGF0ZSIsImZpbmlzaERhdGUiLCJkZXNjcmlwdGlvbiIsInNob3dJdGVtRGVzY3JpcHRpb24iLCJlIiwiY3VycmVudElkIiwidGFyZ2V0IiwidG9Eb0l0ZW0iLCJkZXNjUHJvbWlzZSIsImdldERlc2NyaXB0aW9uIiwiZ2V0Rm9ybURhdGEiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwicGFpciIsImVudHJpZXMiLCJmb3JtUmVzZXQiLCJyZXNldCIsIkxpc3RlbmVycyIsImNvbnN0cnVjdG9yIiwic2F2ZVN0YXR1c2UiLCJzdGFydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWlucyIsInRvZG9JdGVtRWxlbWVudCIsInRvRG9JdGVtRWRpdCIsInByZXZlbnREZWZhdWx0IiwidG9Eb0l0ZW1zYXZlIiwidG9Eb0l0ZW1VcGRhdGVTdGF0dXMiLCJzaG93QWRkRm9ybSIsImNvbnNvbGUiLCJsb2ciLCJ0b0RvSXRlbURlbGV0ZSIsImFwcCIsInNhdmVQcm9taXNlIiwic2F2ZSIsInVwZGF0ZSIsIml0ZW1JZCIsIml0ZW1Qcm9taXNlIiwiZ2V0SXRlbUJ5SWQiLCJzdGF0dXNlc0NvdW50IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIml0ZW1TdGF0dXMiLCJzdGF0dXNlcyIsInZhbHVlcyIsInN0YXR1c0luZGV4IiwiaW5kZXhPZiIsIm5ld1N0YXR1cyIsImRlbGV0ZVByb21pc2UiLCJkZWxldGUiLCJsaXN0ZW5lcnMiLCJUb0RvSXRlbSIsIkRhdGUiLCJwcmV2ZW50RXh0ZW5zaW9ucyIsImdldFN0YXR1cyIsInN0YXR1c2VJZCIsInNldFN0YXR1cyIsIml0ZW1FbmRwb2ludCIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwiZGVzY3JpcHRpb25FbmRwb2ludCIsImdldENhcHRpb24iLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cGRhdGVQcm9taXNlIiwiZGVsZXRlRW5kcG9pbnQiLCJUb0RvTGlzdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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LGFBQVE7QUFDSixjQUFNb0IsaUJBQWlCLG9EQUFBeEgsQ0FBVUMsV0FBVixHQUF3QixLQUFLNEIsSUFBTCxDQUFVRyxFQUF6RDs7QUFFQSxjQUFNbUUsZ0JBQWdCVSxNQUFNVyxjQUFOLEVBQXNCO0FBQ3hDTixvQkFBUTtBQURnQyxTQUF0QixDQUF0Qjs7QUFJQSxlQUFPZixhQUFQO0FBQ0g7O0FBdEZpQixDOzs7Ozs7Ozs7Ozs7Ozs7QUNKdEI7O0FBR08sTUFBTXNCLFFBQU4sQ0FBZTs7QUFFbEJwSixjQUFTO0FBQ0wsY0FBTUQsY0FBY3lJLE1BQU0sb0RBQUE3RyxDQUFVQyxXQUFoQixFQUNmM0IsSUFEZSxDQUNUd0ksUUFBRCxJQUFjO0FBQ2hCLG1CQUFPQSxTQUFTQyxJQUFULEVBQVA7QUFDSCxTQUhlLENBQXBCOztBQUtBLGVBQU8zSSxXQUFQO0FBQ0g7O0FBVGlCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IHtEb21IYW5kbGVyc30gZnJvbSAnLi9kb20taGFuZGxlcnMnO1xyXG5pbXBvcnQge1RvRG9MaXN0fSBmcm9tICcuL3RvLWRvLWxpc3QnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XHJcblxyXG4gICAgcmVuZGVySXRlbXNMaXN0KCl7XHJcbiAgICAgICAgY29uc3QgZG9tSGFuZGxlcnMgPSBuZXcgRG9tSGFuZGxlcnMoKTtcclxuICAgICAgICBjb25zdCB0b0RvTGlzdCA9IG5ldyBUb0RvTGlzdCgpO1xyXG4gICAgICAgIGNvbnN0IGxpc3RQcm9taXNlID0gdG9Eb0xpc3QuZ2V0TGlzdCgpO1xyXG5cclxuICAgICAgICBsaXN0UHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGRvbUhhbmRsZXJzLnJlbmRlckl0ZW1zKGRhdGEpO1xyXG4gICAgICAgICAgICBkb21IYW5kbGVycy5oaWRlTG9hZGVyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBOT0RFX1NFTEVDVE9SUyA9IHtcbiAgICBWSUVXX0RFU0M6ICdqcy12aWV3LWRlc2MnLFxuICAgIFRPRE9fSVRFTTogJy5qcy10b2RvX19pdGVtJyxcbiAgICBTQVZFX0lURU06ICdqcy1zYXZlLWl0ZW0nLFxuICAgIFVQREFURV9TVEFUVVM6ICdqcy11cGRhdGUtc3RhdHVzJyxcbiAgICBBRERfSVRFTTogJ2pzLWFkZC1pdGVtJyxcbiAgICBERUxFVEVfSVRFTTogJ2pzLWRlbGV0ZS1pdGVtJyxcbiAgICBUT0RPX0xPQURFUjogJy5qcy10b2RvX19sb2FkZXInLFxuICAgIFRPRE9fRk9STTogJy5qcy10b2RvLWZvcm0nLFxuICAgIElURU1fREVTQzogJy5qcy1pdGVtLWRlc2MnLFxuICAgIERFTEVURV9CVVRUT046ICcuanMtZGVsZXRlLWl0ZW0nLFxuICAgIFRPRE9fTElTVDogJy5qcy10b2RvX19saXN0JyxcbiAgICBUT0RPX0lURU06ICcuanMtdG9kb19faXRlbScsXG4gICAgU1RBVFVTX0xBQkVMOiAnLmpzLWl0ZW0tc3RhdHVzJyxcbiAgICBJVEVNX0RFU0NfQ09OVEVOVDogJy5qcy1pdGVtLWRlc2MtY29udGVudCcsXG4gICAgSU5QVVRfREVTQzogJ3RleHRhcmVhW25hbWU9XCJkZXNjcmlwdGlvblwiXScsXG4gICAgSU5QVVRfU1RBVFVTOiAnaW5wdXRbbmFtZT1cInN0YXR1c1wiXScsXG4gICAgSU5QVVRfQ0FQVElPTjogJ2lucHV0W25hbWU9XCJjYXB0aW9uXCJdJyxcbiAgICBJTlBVVF9EQVRFOiAnaW5wdXRbbmFtZT1cImZpbmlzaERhdGVcIl0nLFxuICAgIFRFWFRBUkVBX0RFU0NSSVBUSU9OOiAndGV4dGFyZWFbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyxcbiAgICBJTlBVVF9JRDogJ2lucHV0W25hbWU9XCJpZFwiXSdcbn07XG5cbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMQVNTRVMgPSB7XG4gICAgSElEREVOOiAnaGlkZGVuJyxcbn07XG4iLCJleHBvcnQgY29uc3QgRU5EUE9JTlRTID0ge1xuICAgIFNFUlZFUl9QQVRIOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS90b2RvLycsXG4gICAgREVTQ1JJUFRJT05fUEFUSDogJy9kZXNjcmlwdGlvbidcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2VuZHBvaW50cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc3RhdHVzZXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2NsYXNzZXMnO1xyXG4iLCJleHBvcnQgY29uc3QgU1RBVFVTRVMgPSB7XG4gICAgTkVXOiAnTkVXJyxcbiAgICBJTl9QUk9HUkVTUzogJ0lOX1BST0dSRVNTJyxcbiAgICBET05FOiAnRE9ORSdcbn07XG4iLCJpbXBvcnQge1NUQVRVU0VTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7Tk9ERV9TRUxFQ1RPUlN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtESVNQTEFZX0NMQVNTRVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtUb0RvSXRlbX0gZnJvbSAnLi90by1kby1pdGVtJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRG9tSGFuZGxlcnMge1xyXG5cclxuICAgIGhpZGVMb2FkZXIoKXtcclxuICAgICAgICB0aGlzLmhpZGVFbGVtZW50QnlDbGFzcyhOT0RFX1NFTEVDVE9SUy5UT0RPX0xPQURFUik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dMb2FkZXIoKXtcclxuICAgICAgICB0aGlzLnNob3dFbGVtZW50QnlDbGFzcyhOT0RFX1NFTEVDVE9SUy5UT0RPX0xPQURFUik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhpZGVFbGVtZW50QnlDbGFzcyhjbGFzc05hbWUpe1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKS5jbGFzc0xpc3QuYWRkKERJU1BMQVlfQ0xBU1NFUy5ISURERU4pO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVFbGVtZW50QnlOb2RlKGVsZW1lbnQpe1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChESVNQTEFZX0NMQVNTRVMuSElEREVOKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd0VsZW1lbnRCeUNsYXNzKGNsYXNzTmFtZSl7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpLmNsYXNzTGlzdC5yZW1vdmUoRElTUExBWV9DTEFTU0VTLkhJRERFTik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGhpZGVGb3JtKCl7XHJcbiAgICAgICAgdGhpcy5oaWRlRWxlbWVudEJ5Q2xhc3MoTk9ERV9TRUxFQ1RPUlMuVE9ET19GT1JNKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd0Zvcm0oKXtcclxuICAgICAgICB0aGlzLnNob3dFbGVtZW50QnlDbGFzcyhOT0RFX1NFTEVDVE9SUy5UT0RPX0ZPUk0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBoaWRlRGVzY3JpcHRpb24oKXtcclxuICAgICAgICB0aGlzLmhpZGVFbGVtZW50QnlDbGFzcyhOT0RFX1NFTEVDVE9SUy5JVEVNX0RFU0MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93RGVzY3JpcHRpb24oKXtcclxuICAgICAgICB0aGlzLnNob3dFbGVtZW50QnlDbGFzcyhOT0RFX1NFTEVDVE9SUy5JVEVNX0RFU0MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzd2l0Y2hPbkRlbGV0ZUJ0bigpe1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTk9ERV9TRUxFQ1RPUlMuREVMRVRFX0JVVFRPTikuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3dpdGNoT2ZmRGVsZXRlQnRuKCl7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihOT0RFX1NFTEVDVE9SUy5ERUxFVEVfQlVUVE9OKS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlbmRlckl0ZW1zKGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IHRvRG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihOT0RFX1NFTEVDVE9SUy5UT0RPX0xJU1QpO1xyXG5cclxuICAgICAgICB3aGlsZSAodG9Eb0xpc3QuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0b0RvTGlzdC5yZW1vdmVDaGlsZCh0b0RvTGlzdC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjYXB0aW9uID0gaXRlbS5jYXB0aW9uID8gaXRlbS5jYXB0aW9uIDogJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdJdGVtQ29udGVudCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvX19pdGVtIGpzLXRvZG9fX2l0ZW1cIiBkYXRhLWlkPVwiYCArIGl0ZW0uaWQgKyBgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG9fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG9fX25hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgKyBjYXB0aW9uICsgYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvX19zdGF0dXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogPHNwYW4gY2xhc3M9XCJ0b2RvX19zdGF0dXMtbmFtZVwiPmAgKyBpdGVtLnN0YXR1cyArIGA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fZGVzY3JpcHRpb24tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24ganMtdmlldy1kZXNjXCI+dmlldyBkZXNjcmlwdGlvbjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgICAgIHRvRG9MaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlRW5kJywgbmV3SXRlbUNvbnRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRJdGVtSWQoZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdChOT0RFX1NFTEVDVE9SUy5UT0RPX0lURU0pLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRGb3JtU3RhdHVzKCl7XHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTk9ERV9TRUxFQ1RPUlMuVE9ET19GT1JNKTtcclxuICAgICAgICBjb25zdCBpbnB1dFN0YXR1cyA9IGZvcm0ucXVlcnlTZWxlY3RvcihOT0RFX1NFTEVDVE9SUy5JTlBVVF9TVEFUVVMpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dFN0YXR1cy52YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0Rm9ybVN0YXR1cyhzdGF0dXMpe1xyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE5PREVfU0VMRUNUT1JTLlRPRE9fRk9STSk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRTdGF0dXMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoTk9ERV9TRUxFQ1RPUlMuSU5QVVRfU1RBVFVTKTtcclxuICAgICAgICBjb25zdCBzdGF0dXNMYWJlbCA9IGZvcm0ucXVlcnlTZWxlY3RvcihOT0RFX1NFTEVDVE9SUy5TVEFUVVNfTEFCRUwpO1xyXG5cclxuICAgICAgICBpbnB1dFN0YXR1cy52YWx1ZSA9IHN0YXR1cztcclxuICAgICAgICBzdGF0dXNMYWJlbC5pbm5lckhUTUwgPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZpbGxGb3JtKGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE5PREVfU0VMRUNUT1JTLlRPRE9fRk9STSk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRDYXB0aW9uID0gZm9ybS5xdWVyeVNlbGVjdG9yKE5PREVfU0VMRUNUT1JTLklOUFVUX0NBUFRJT04pO1xyXG4gICAgICAgIGNvbnN0IGlucHV0RGF0ZSA9IGZvcm0ucXVlcnlTZWxlY3RvcihOT0RFX1NFTEVDVE9SUy5JTlBVVF9EQVRFKTtcclxuICAgICAgICBjb25zdCBpbnB1dERlc2MgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoTk9ERV9TRUxFQ1RPUlMuSU5QVVRfREVTQyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRJZCA9IGZvcm0ucXVlcnlTZWxlY3RvcihOT0RFX1NFTEVDVE9SUy5JTlBVVF9JRCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhcHRpb24gPSBkYXRhLmNhcHRpb24gPyBkYXRhLmNhcHRpb24gOiAnJztcclxuICAgICAgICBjb25zdCBkYXRlID0gZGF0YS5maW5pc2hEYXRlID8gZGF0YS5maW5pc2hEYXRlIDogJyc7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uID8gZGF0YS5kZXNjcmlwdGlvbiA6ICcnO1xyXG5cclxuICAgICAgICBpbnB1dENhcHRpb24udmFsdWUgPSBjYXB0aW9uO1xyXG4gICAgICAgIGlucHV0RGF0ZS52YWx1ZSA9IGRhdGU7XHJcbiAgICAgICAgaW5wdXREZXNjLnZhbHVlID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgaW5wdXRJZC52YWx1ZSA9IGRhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy5zZXRGb3JtU3RhdHVzKGRhdGEuc3RhdHVzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd0l0ZW1EZXNjcmlwdGlvbihlKXtcclxuICAgICAgICBjb25zdCBjdXJyZW50SWQgPSB7aWQ6IHRoaXMuZ2V0SXRlbUlkKGUudGFyZ2V0KX07XHJcbiAgICAgICAgY29uc3QgdG9Eb0l0ZW0gPSBuZXcgVG9Eb0l0ZW0oY3VycmVudElkKTtcclxuXHJcbiAgICAgICAgdGhpcy5oaWRlRm9ybSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0Rlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgZGVzY1Byb21pc2UgPSB0b0RvSXRlbS5nZXREZXNjcmlwdGlvbigpO1xyXG5cclxuICAgICAgICBkZXNjUHJvbWlzZS50aGVuKChkZXNjcmlwdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE5PREVfU0VMRUNUT1JTLklURU1fREVTQ19DT05URU5UKS5pbm5lckhUTUwgPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Rm9ybURhdGEoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE5PREVfU0VMRUNUT1JTLlRPRE9fRk9STSkpO1xyXG5cclxuICAgICAgICBmb3IobGV0IHBhaXIgb2YgZm9ybURhdGEuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgIGRhdGFbcGFpclswXV0gPSBwYWlyWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZvcm1SZXNldCgpe1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTk9ERV9TRUxFQ1RPUlMuVE9ET19GT1JNKS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Rm9ybVN0YXR1cyhTVEFUVVNFUy5ORVcpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0VORFBPSU5UU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQge1NUQVRVU0VTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7Tk9ERV9TRUxFQ1RPUlN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtEb21IYW5kbGVyc30gZnJvbSAnLi9kb20taGFuZGxlcnMnO1xyXG5pbXBvcnQge1RvRG9JdGVtfSBmcm9tICcuL3RvLWRvLWl0ZW0nO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tICcuL2FwcCc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExpc3RlbmVycyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnNhdmVTdGF0dXNlID0gMDsgLy8wIC0gc2F2ZSwgMSAtIHVwZGF0ZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhOT0RFX1NFTEVDVE9SUy5WSUVXX0RFU0MpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRvbUhhbmRsZXJzID0gbmV3IERvbUhhbmRsZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBkb21IYW5kbGVycy5zaG93SXRlbURlc2NyaXB0aW9uKGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvZG9JdGVtRWxlbWVudCA9IGUudGFyZ2V0LmNsb3Nlc3QoTk9ERV9TRUxFQ1RPUlMuVE9ET19JVEVNKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0b2RvSXRlbUVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9Eb0l0ZW1FZGl0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTk9ERV9TRUxFQ1RPUlMuU0FWRV9JVEVNKSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvRG9JdGVtc2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTk9ERV9TRUxFQ1RPUlMuVVBEQVRFX1NUQVRVUykpe1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b0RvSXRlbVVwZGF0ZVN0YXR1cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoTk9ERV9TRUxFQ1RPUlMuQUREX0lURU0pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkZEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKE5PREVfU0VMRUNUT1JTLkRFTEVURV9JVEVNKSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXNhYScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b0RvSXRlbURlbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd0FkZEZvcm0oKXtcclxuICAgICAgICBjb25zdCBkb21IYW5kbGVycyA9IG5ldyBEb21IYW5kbGVycygpO1xyXG4gICAgICAgIGRvbUhhbmRsZXJzLmhpZGVEZXNjcmlwdGlvbigpO1xyXG4gICAgICAgIGRvbUhhbmRsZXJzLnNob3dGb3JtKCk7XHJcbiAgICAgICAgZG9tSGFuZGxlcnMuZm9ybVJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5zYXZlU3RhdHVzZSA9IDA7XHJcbiAgICAgICAgZG9tSGFuZGxlcnMuc3dpdGNoT2ZmRGVsZXRlQnRuKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvRG9JdGVtc2F2ZSgpe1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IG5ldyBBcHBsaWNhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IGRvbUhhbmRsZXJzID0gbmV3IERvbUhhbmRsZXJzKCk7XHJcbiAgICAgICAgbGV0IGZvcm1EYXRhID0gZG9tSGFuZGxlcnMuZ2V0Rm9ybURhdGEoKTtcclxuICAgICAgICBsZXQgc2F2ZVByb21pc2U7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBUb0RvSXRlbShmb3JtRGF0YSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2F2ZVN0YXR1c2UgPT0gMCl7XHJcbiAgICAgICAgICAgIHNhdmVQcm9taXNlID0gaXRlbS5zYXZlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2F2ZVN0YXR1c2UgPT0gMSl7XHJcbiAgICAgICAgICAgIHNhdmVQcm9taXNlID0gaXRlbS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNhdmVQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZG9tSGFuZGxlcnMuZm9ybVJlc2V0KCk7XHJcbiAgICAgICAgICAgIGRvbUhhbmRsZXJzLnNob3dMb2FkZXIoKTtcclxuICAgICAgICAgICAgYXBwLnJlbmRlckl0ZW1zTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0dXNlID0gMDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdG9Eb0l0ZW1FZGl0KGUpe1xyXG4gICAgICAgIGNvbnN0IGRvbUhhbmRsZXJzID0gbmV3IERvbUhhbmRsZXJzKCk7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkID0ge2lkOiBkb21IYW5kbGVycy5nZXRJdGVtSWQoZS50YXJnZXQpfTtcclxuICAgICAgICBjb25zdCB0b0RvSXRlbSA9IG5ldyBUb0RvSXRlbShpdGVtSWQpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1Qcm9taXNlID0gdG9Eb0l0ZW0uZ2V0SXRlbUJ5SWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zYXZlU3RhdHVzZSA9IDE7XHJcbiAgICAgICAgZG9tSGFuZGxlcnMuc3dpdGNoT25EZWxldGVCdG4oKTtcclxuXHJcbiAgICAgICAgaXRlbVByb21pc2UudGhlbigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBkb21IYW5kbGVycy5oaWRlRGVzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgZG9tSGFuZGxlcnMuc2hvd0Zvcm0oKTtcclxuICAgICAgICAgICAgZG9tSGFuZGxlcnMuZmlsbEZvcm0oaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvRG9JdGVtVXBkYXRlU3RhdHVzKCl7XHJcbiAgICAgICAgY29uc3QgZG9tSGFuZGxlcnMgPSBuZXcgRG9tSGFuZGxlcnMoKTtcclxuICAgICAgICBjb25zdCBzdGF0dXNlc0NvdW50ID0gT2JqZWN0LmtleXMoU1RBVFVTRVMpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBpdGVtU3RhdHVzID0gZG9tSGFuZGxlcnMuZ2V0Rm9ybVN0YXR1cygpO1xyXG4gICAgICAgIGNvbnN0IHN0YXR1c2VzID0gT2JqZWN0LnZhbHVlcyhTVEFUVVNFUyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdHVzSW5kZXggPSBzdGF0dXNlcy5pbmRleE9mKGl0ZW1TdGF0dXMpO1xyXG4gICAgICAgIGxldCBuZXdTdGF0dXMgPSAnJztcclxuXHJcbiAgICAgICAgaWYoc3RhdHVzSW5kZXggPCBzdGF0dXNlc0NvdW50IC0gMSl7XHJcbiAgICAgICAgICAgIG5ld1N0YXR1cyA9IHN0YXR1c2VzW3N0YXR1c0luZGV4ICsgMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3U3RhdHVzID0gc3RhdHVzZXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb21IYW5kbGVycy5zZXRGb3JtU3RhdHVzKG5ld1N0YXR1cyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvRG9JdGVtRGVsZXRlKCl7XHJcbiAgICAgICAgY29uc3QgZG9tSGFuZGxlcnMgPSBuZXcgRG9tSGFuZGxlcnMoKTtcclxuICAgICAgICBjb25zdCBhcHAgPSBuZXcgQXBwbGljYXRpb24oKTtcclxuICAgICAgICBsZXQgZm9ybURhdGEgPSBkb21IYW5kbGVycy5nZXRGb3JtRGF0YSgpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgVG9Eb0l0ZW0oZm9ybURhdGEpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2UgPSBpdGVtLmRlbGV0ZSgpO1xyXG5cclxuICAgICAgICBkZWxldGVQcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZG9tSGFuZGxlcnMuZm9ybVJlc2V0KCk7XHJcbiAgICAgICAgICAgIGRvbUhhbmRsZXJzLnN3aXRjaE9mZkRlbGV0ZUJ0bigpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0dXNlID0gMDtcclxuICAgICAgICAgICAgYXBwLnJlbmRlckl0ZW1zTGlzdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgJy4uL2Nzcy9zdHlsZS5zY3NzJztcclxuaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9hcHAnO1xyXG5pbXBvcnQge0xpc3RlbmVyc30gZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHBsaWNhdGlvbigpO1xyXG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgTGlzdGVuZXJzKCk7XHJcblxyXG5hcHAucmVuZGVySXRlbXNMaXN0KCk7XHJcbmxpc3RlbmVycy5zdGFydCgpO1xyXG4iLCJpbXBvcnQge0VORFBPSU5UU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQge1NUQVRVU0VTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRvRG9JdGVtIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih7aWQgPSAwLCBmaW5pc2hEYXRlLCBjYXB0aW9uLCBkZXNjcmlwdGlvbiwgc3RhdHVzID0gU1RBVFVTRVMuTkVXfSkge1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXRlbS5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuaXRlbS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgdGhpcy5pdGVtLmZpbmlzaERhdGUgPSBuZXcgRGF0ZShmaW5pc2hEYXRlKTtcclxuICAgICAgICB0aGlzLml0ZW0uY2FwdGlvbiA9IGNhcHRpb247XHJcbiAgICAgICAgdGhpcy5pdGVtLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5pdGVtID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHRoaXMuaXRlbSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFN0YXR1cyAoc3RhdHVzZUlkKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnN0YXR1cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0U3RhdHVzKHN0YXR1c2VJZCl7XHJcbiAgICAgICAgdGhpcy5pdGVtLnN0YXR1cyA9IFNUQVRVU0VTW3N0YXR1c2VJZF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUJ5SWQoKXtcclxuICAgICAgICBjb25zdCBpdGVtRW5kcG9pbnQgPSBFTkRQT0lOVFMuU0VSVkVSX1BBVEggKyB0aGlzLml0ZW0uaWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1Qcm9taXNlID0gZmV0Y2goaXRlbUVuZHBvaW50KVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW1Qcm9taXNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXREZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRW5kcG9pbnQgPSBFTkRQT0lOVFMuU0VSVkVSX1BBVEggKyB0aGlzLml0ZW0uaWQgKyBFTkRQT0lOVFMuREVTQ1JJUFRJT05fUEFUSDtcclxuXHJcbiAgICAgICAgY29uc3QgZGVzY1Byb21pc2UgPSBmZXRjaChkZXNjcmlwdGlvbkVuZHBvaW50KVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbiA/IGRhdGEuZGVzY3JpcHRpb24gOiAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZXNjUHJvbWlzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Q2FwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0uY2FwdGlvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2F2ZSgpe1xyXG4gICAgICAgIGNvbnN0IHNhdmVQcm9taXNlID0gZmV0Y2goRU5EUE9JTlRTLlNFUlZFUl9QQVRILCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRoaXMuaXRlbSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gc2F2ZVByb21pc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVByb21pc2UgPSBmZXRjaChFTkRQT0lOVFMuU0VSVkVSX1BBVEgsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZVByb21pc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRlbGV0ZSgpe1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUVuZHBvaW50ID0gRU5EUE9JTlRTLlNFUlZFUl9QQVRIICsgdGhpcy5pdGVtLmlkXHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb21pc2UgPSBmZXRjaChkZWxldGVFbmRwb2ludCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBkZWxldGVQcm9taXNlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0VORFBPSU5UU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUb0RvTGlzdCB7XHJcblxyXG4gICAgZ2V0TGlzdCgpe1xyXG4gICAgICAgIGNvbnN0IGxpc3RQcm9taXNlID0gZmV0Y2goRU5EUE9JTlRTLlNFUlZFUl9QQVRIKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0UHJvbWlzZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==