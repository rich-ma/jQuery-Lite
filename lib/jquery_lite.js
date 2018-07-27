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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass DOMNodeCollection {\n  constructor(els) {\n    this.store = els;\n  }\n  \n  flattenDeep(arr1) {\n    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);\n  }\n  \n  html(string) {\n    if (string) {\n      this.store.forEach( (e) => e.innerHTML = string);\n    } \n    else {\n      return this.store[0].innerHTML;\n    }\n  }\n  \n  empty() {\n    this.html(\"\");\n  }\n  \n  attr(attribute, value = null) {\n    if (value === null){\n      return this.store[0].getAttribute(attribute);\n    } else {\n      this.store.forEach( el => {\n        el.setAttribute(attribute, value);\n      });\n    }\n  }\n  \n  addClass(className) {\n    this.store.forEach( (el) => {\n      if (el.className) el.className += ` ${className}`;\n      else el.className = className;\n    });\n  }\n  \n  removeClass(className) {\n    this.store.forEach( (el) => {\n      let curClasses = el.className.split(\" \");\n      let newClasses = curClasses.filter( (e) => e !== className);\n      el.className = newClasses.join(\" \");\n    });\n  }\n  \n  append($el) {\n    let newHTML = \"\";\n    $el.store.forEach( (el) => newHTML += el.outerHTML);\n    \n    this.store.forEach( (el) => {\n      let currentHTML = el.innerHTML;\n      el.innerHTML = currentHTML + newHTML;\n    });\n  }\n  \n  children() {\n    let childs = [];\n    this.store.forEach((el) => childs.push(Array.from(el.children)));\n    let flatChildren = flattenDeep(childs);\n    return new DOMNodeCollection(flatChildren);\n    \n    // let children = [];\n    // this.store.forEach( (el) => children.push(el.children));\n    // let flatChildren = [];\n    // let childArr = Array.from(children[0]);\n    // childArr.forEach(e => {\n    //   flatChildren = flatChildren.concat(e);\n    // });\n    // console.log(flatChildren);\n    // return new DOMNodeCollection(Array.from(flatChildren));\n  }\n  \n  parent() {\n    let parents = [];\n    this.store.forEach( (el) => parents.push(el.parent()));\n    return new DOMNodeCollection(parents);\n  }\n  \n  find(selector) {\n    const matchedEls = [];\n    let childrens = this.children();\n    let childElements = Array.from(childrens.store);\n    childElements.forEach( e => {\n      if (e.tagName === selector.toUpperCase()) matchedEls.push(e);\n    });\n    return matchedEls;\n  }\n  \n  \n  \n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DNC = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\nfunction flattenDeep(arr1) {\n   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);\n}\n$l = (selector) => {\n  let result;\n  if (typeof selector === 'string') {\n    let nodeList = document.querySelectorAll(selector);\n    let array = Array.from(nodeList);\n    result = new DNC(array);\n  }\n  if (selector instanceof HTMLElement) {\n    result = new DNC([selector]);\n  }\n  return result;\n};\n\nwindow.$l = $l;\nwindow.flattenDeep = flattenDeep;\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });