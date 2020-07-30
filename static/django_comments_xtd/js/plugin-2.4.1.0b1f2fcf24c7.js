/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commentbox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_commentbox_jsx__WEBPACK_IMPORTED_MODULE_2__["CommentBox"], Object.assign(window.comments_props, window.comments_props_override)), document.getElementById('comments'));

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentBox", function() { return CommentBox; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var django__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var django__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(django__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _comment_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _commentform_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(79);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var CommentBox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CommentBox, _React$Component);

  function CommentBox(props) {
    var _this;

    _classCallCheck(this, CommentBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CommentBox).call(this, props));
    _lib_js__WEBPACK_IMPORTED_MODULE_3__["jquery_ajax_setup"]('csrftoken');
    _this.state = {
      previewing: false,
      preview: {
        name: '',
        email: '',
        url: '',
        comment: ''
      },
      tree: [],
      cids: [],
      newcids: [],
      counter: _this.props.comment_count
    };
    _this.handle_comment_created = _this.handle_comment_created.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handle_preview = _this.handle_preview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handle_update = _this.handle_update.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CommentBox, [{
    key: "handle_comment_created",
    value: function handle_comment_created() {
      this.load_comments();
    }
  }, {
    key: "handle_preview",
    value: function handle_preview(name, email, url, comment) {
      this.setState({
        preview: {
          name: name,
          email: email,
          url: url,
          comment: comment
        },
        previewing: true
      });
    }
  }, {
    key: "handle_update",
    value: function handle_update(event) {
      event.preventDefault();
      this.load_comments();
    }
  }, {
    key: "reset_preview",
    value: function reset_preview() {
      this.setState({
        preview: {
          name: '',
          email: '',
          url: '',
          comment: ''
        },
        previewing: false
      });
    }
  }, {
    key: "render_comment_counter",
    value: function render_comment_counter() {
      if (this.state.counter > 0) {
        var fmts = django__WEBPACK_IMPORTED_MODULE_4___default.a.ngettext("%s comment.", "%s comments.", this.state.cids.length);
        var text = django__WEBPACK_IMPORTED_MODULE_4___default.a.interpolate(fmts, [this.state.cids.length]);
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", {
          className: "text-center"
        }, text);
      } else return "";
    }
  }, {
    key: "render_comment_form",
    value: function render_comment_form() {
      if (this.props.allow_comments) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_commentform_jsx__WEBPACK_IMPORTED_MODULE_6__["CommentForm"], _extends({}, this.props, {
          on_comment_created: this.handle_comment_created
        }));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", null, "Comments are disabled for this article.");
      }
    }
  }, {
    key: "render_update_alert",
    value: function render_update_alert() {
      var diff = this.state.counter - this.state.cids.length;

      if (diff > 0) {
        var fmts = django__WEBPACK_IMPORTED_MODULE_4___default.a.ngettext("There is %s new comment.", "There are %s new comments.", diff);
        var message = django__WEBPACK_IMPORTED_MODULE_4___default.a.interpolate(fmts, [diff]);
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "alert alert-info d-flex align-items-center"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
          className: "mr-auto"
        }, message), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
          type: "button",
          className: "btn btn-secondary btn-xs",
          onClick: this.handle_update
        }, "update"));
      } else return "";
    }
  }, {
    key: "create_tree",
    value: function create_tree(data) {
      var tree = new Array();
      var order = new Array();
      var comments = {};
      var children = {};
      var incids = [],
          curcids = [],
          newcids = [];

      function get_children(cid) {
        return children[cid].map(function (index) {
          if (comments[index].children == undefined) {
            comments[index].children = get_children(index);
          }

          return comments[index];
        });
      }

      ;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          incids.push(item.id);
          comments[item.id] = item;

          if (item.level == 0) {
            order.push(item.id);
          }

          children[item.id] = [];

          if (item.parent_id !== item.id) {
            children[item.parent_id].push(item.id);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      for (var _i = 0; _i < order.length; _i++) {
        var _id = order[_i];
        comments[_id].children = get_children(_id);
        tree.push(comments[_id]);
      } // Update attributes curcids and newcids.


      if (incids.length) {
        if (this.state.cids.length) {
          for (var _i2 = 0; _i2 < incids.length; _i2++) {
            var id = incids[_i2];
            if (this.state.cids.indexOf(id) == -1) newcids.push(id);
            curcids.push(id);
          }
        } else {
          curcids = incids;
          newcids = [];
        }
      }

      this.setState({
        tree: tree,
        cids: curcids,
        newcids: newcids,
        counter: curcids.length
      });
    }
  }, {
    key: "load_comments",
    value: function load_comments() {
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        url: this.props.list_url,
        dataType: 'json',
        cache: false,
        success: function (data) {
          // Set here a cookie with the last time comments have been retrieved.
          // I'll use it to add a label 'new' to every new comment received
          // after the timestamp stored in the cookie.
          this.create_tree(data);
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.list_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: "load_count",
    value: function load_count() {
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        url: this.props.count_url,
        dataType: 'json',
        cache: false,
        success: function (data) {
          this.setState({
            counter: data.count
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.count_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.load_comments();
      if (this.props.polling_interval) setInterval(this.load_count.bind(this), this.props.polling_interval);
    }
  }, {
    key: "render",
    value: function render() {
      var settings = this.props;
      var comment_counter = this.render_comment_counter();
      var update_alert = this.render_update_alert();
      var comment_form = this.render_comment_form();
      var nodes = this.state.tree.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_comment_jsx__WEBPACK_IMPORTED_MODULE_5__["Comment"], {
          key: item.id,
          data: item,
          settings: settings,
          newcids: this.state.newcids,
          on_comment_created: this.handle_comment_created
        });
      }.bind(this));
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, comment_counter, comment_form, update_alert, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "comment-tree"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "media-list"
      }, nodes)));
    }
  }]);

  return CommentBox;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csrfSafeMethod", function() { return csrfSafeMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jquery_ajax_setup", function() { return jquery_ajax_setup; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]); // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}
function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
function jquery_ajax_setup(csrf_cookie_name) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", getCookie(csrf_cookie_name));
      }
    }
  });
}

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = django;

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return Comment; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var django__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var django__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(django__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var remarkable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var remarkable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(remarkable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _commentform_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }







var Comment =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Comment, _React$Component);

  function Comment(props) {
    var _this;

    _classCallCheck(this, Comment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Comment).call(this, props));
    _this.state = {
      current_user: props.settings.current_user,
      removal: props.data.flags.removal.active,
      removal_count: props.data.flags.removal.count,
      like: props.data.flags.like.active,
      like_users: props.data.flags.like.users || [],
      dislike: props.data.flags.dislike.active,
      dislike_users: props.data.flags.dislike.users || [],
      reply_form: {
        component: null,
        is_visible: false
      }
    };
    _this.action_like = _this.action_like.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.action_dislike = _this.action_dislike.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handle_reply_click = _this.handle_reply_click.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    console.log("Creating Comment");
    return _this;
  }

  _createClass(Comment, [{
    key: "_get_username_chunk",
    value: function _get_username_chunk() {
      var username = this.props.data.user_name,
          moderator = "";
      if (this.props.data.user_url && !this.props.data.is_removed) username = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
        href: this.props.data.user_url
      }, username);

      if (this.props.data.user_moderator) {
        var label = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("moderator");
        moderator = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "badge badge-secondary"
        }, label));
      }

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, username, moderator);
    }
  }, {
    key: "_get_right_div_chunk",
    value: function _get_right_div_chunk() {
      var flagging_count = "",
          flagging_html = "",
          moderate_html = "",
          url = "";
      if (this.props.data.is_removed) return "";

      if (this.props.settings.is_authenticated && this.props.settings.can_moderate && this.state.removal_count > 0) {
        var fmts = django__WEBPACK_IMPORTED_MODULE_1___default.a.ngettext("%s user has flagged this comment as inappropriate.", "%s users have flagged this comment as inappropriate.", this.state.removal_count);
        var text = django__WEBPACK_IMPORTED_MODULE_1___default.a.interpolate(fmts, [this.state.removal_count]);
        flagging_count = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "badge badge-danger",
          title: text
        }, this.state.removal_count);
      }

      if (this.props.settings.allow_flagging) {
        var inapp_msg = "";

        if (this.state.removal) {
          inapp_msg = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("I flagged it as inappropriate");
          flagging_html = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, flagging_count, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
            className: "fas fa-flag text-danger",
            title: inapp_msg
          }));
        } else {
          if (this.props.settings.is_authenticated) {
            url = this.props.settings.flag_url.replace('0', this.props.data.id);
          } else {
            url = this.props.settings.login_url + "?next=" + this.props.settings.flag_url.replace('0', this.props.data.id);
          }

          inapp_msg = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("flag comment as inappropriate");
          flagging_html = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
            className: "mutedlink",
            href: url
          }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
            className: "fas fa-flag",
            title: inapp_msg
          }));
        }
      }

      if (this.props.settings.is_authenticated && this.props.settings.can_moderate) {
        var remove_msg = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("remove comment");
        url = this.props.settings.delete_url.replace('0', this.props.data.id);
        moderate_html = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
          className: "mutedlink",
          href: url
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
          className: "fas fa-trash-alt",
          title: remove_msg
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, flagging_html, " ", moderate_html);
    }
  }, {
    key: "_get_feedback_chunk",
    value: function _get_feedback_chunk(dir) {
      if (!this.props.settings.allow_feedback) return "";
      var attr_list = dir + "_users"; // Produce (dis)like_users

      var show_users_chunk = "";

      if (this.props.settings.show_feedback) {
        /* Check whether the user is no longer liking/disliking the comment,
         * and be sure the list list of users who liked/disliked the comment
         * is up-to-date likewise.
         */
        var current_user_id = this.state.current_user.split(":")[0];
        var user_ids = this.state[attr_list].map(function (item) {
          return item.split(":")[0];
        });

        if (this.state[dir] && // If user expressed opinion, and
        user_ids.indexOf(current_user_id) == -1) // user not included.
          {
            // Append user to the list.
            this.state[attr_list].push(this.state.current_user);
          } else if (!this.state[dir] && // If user has no opinion, and
        user_ids.indexOf(current_user_id) > -1) // user included.
          {
            // Remove the user from the list.
            var pos = user_ids.indexOf(current_user_id);
            this.state[attr_list].splice(pos, 1);
          }

        if (this.state[attr_list].length) {
          var users = this.state[attr_list].map(function (item) {
            return item.split(":")[1];
          });
          users = users.join("<br/>");
          show_users_chunk = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
            className: "badge badge-primary text-white cfb-counter",
            "data-toggle": "tooltip",
            title: users
          }, this.state[attr_list].length));
        }
      }

      var css_class = this.state[dir] ? '' : 'mutedlink';
      var icon = dir == 'like' ? 'thumbs-up' : 'thumbs-down';
      var class_icon = "fas fa-" + icon;
      var click_hdl = dir == 'like' ? this.action_like : this.action_dislike;
      var opinion = "",
          link = "#";
      if (dir == 'like') opinion = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext('I like it');else opinion = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext('I dislike it');
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, show_users_chunk, "\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
        href: "#",
        onClick: click_hdl,
        className: css_class
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
        className: class_icon,
        title: opinion
      })), "\xA0");
    }
  }, {
    key: "render_feedback_btns",
    value: function render_feedback_btns() {
      if (this.props.settings.allow_feedback) {
        var feedback_id = "feedback-" + this.props.data.id;
        if (this.props.settings.show_feedback) this.disposeTooltips(feedback_id);

        var like_feedback = this._get_feedback_chunk("like");

        var dislike_feedback = this._get_feedback_chunk("dislike");

        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          id: feedback_id,
          className: "small"
        }, like_feedback, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "text-muted"
        }, "|"), dislike_feedback);
      } else return "";
    }
  }, {
    key: "make_form_invisible",
    value: function make_form_invisible(submit_status) {
      // this.setState({reply_form: {component: this.state.reply_form.component,
      //                             is_visible: false}});
      this.props.on_comment_created();
    }
  }, {
    key: "handle_reply_click",
    value: function handle_reply_click(event) {
      event.preventDefault();
      var component = this.state.reply_form.component;
      var visible = !this.state.reply_form.is_visible;
      if (component == null) component = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_commentform_jsx__WEBPACK_IMPORTED_MODULE_5__["CommentForm"], _extends({}, this.props.settings, {
        reply_to: this.props.data.id,
        on_comment_created: this.make_form_invisible.bind(this)
      }));
      this.setState({
        reply_form: {
          component: component,
          is_visible: visible
        }
      });
    }
  }, {
    key: "_get_reply_link_chunk",
    value: function _get_reply_link_chunk() {
      if (!this.props.data.allow_reply) return "";
      var url = this.props.settings.reply_url.replace('0', this.props.data.id),
          reply_label = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Reply");

      if (this.props.settings.allow_feedback) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "text-muted"
        }, "\u2022"), "\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
          className: "small mutedlink",
          href: url,
          onClick: this.handle_reply_click
        }, reply_label));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
          className: "small mutedlink",
          href: url,
          onClick: this.handle_reply_click
        }, reply_label);
      }
    }
  }, {
    key: "rawMarkup",
    value: function rawMarkup() {
      var md = new remarkable__WEBPACK_IMPORTED_MODULE_4___default.a();
      var rawMarkup = md.render(this.props.data.comment);
      return {
        __html: rawMarkup
      };
    }
  }, {
    key: "render_comment_body",
    value: function render_comment_body() {
      var extra_space = "";

      if (!this.props.data.allow_reply && !this.props.settings.allow_feedback) {
        extra_space = "pb-3";
      }

      if (this.props.data.is_removed) {
        var cls = "text-muted ".concat(extra_space);
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
          className: cls
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("em", null, this.props.data.comment));
      } else {
        var _cls = "content ".concat(extra_space);

        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: _cls,
          dangerouslySetInnerHTML: this.rawMarkup()
        });
      }
    }
  }, {
    key: "render_reply_form",
    value: function render_reply_form() {
      if (!this.state.reply_form.is_visible) return "";
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, this.state.reply_form.component);
    }
  }, {
    key: "_post_feedback",
    value: function _post_feedback(flag) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        method: 'POST',
        url: this.props.settings.feedback_url,
        data: {
          comment: this.props.data.id,
          flag: flag
        },
        dataType: 'json',
        cache: false,
        statusCode: {
          201: function () {
            var state = {};
            if (flag == 'like') this.setState({
              like: true,
              dislike: false
            });else if (flag == 'dislike') this.setState({
              dislike: true,
              like: false
            });
          }.bind(this),
          204: function () {
            if (flag == 'like') this.setState({
              like: false
            });else if (flag == 'dislike') this.setState({
              dislike: false
            });
          }.bind(this)
        },
        error: function (xhr, status, err) {
          if (xhr.status == 400 && xhr.responseJSON.non_field_errors.length) alert(xhr.responseJSON.non_field_errors[0]);else console.error(this.props.settings.feedback_url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: "action_like",
    value: function action_like(event) {
      event.preventDefault();
      if (this.props.settings.is_authenticated) return this._post_feedback('like');else return window.location.href = this.props.settings.login_url + "?next=" + this.props.settings.like_url.replace('0', this.props.data.id);
    }
  }, {
    key: "action_dislike",
    value: function action_dislike(event) {
      event.preventDefault();
      if (this.props.settings.is_authenticated) return this._post_feedback('dislike');else return window.location.href = this.props.settings.login_url + "?next=" + this.props.settings.dislike_url.replace('0', this.props.data.id);
    }
  }, {
    key: "is_hover",
    value: function is_hover(elem) {
      return elem.parentElement.querySelector(':hover') === elem;
    }
  }, {
    key: "disposeTooltips",
    value: function disposeTooltips(feedback_id) {
      // console.log("feedback_id = "+feedback_id);
      var elem = document.getElementById(feedback_id);
      var is_hover = elem && this.is_hover(elem);

      if (elem && !is_hover) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + feedback_id + ' A[data-toggle="tooltip"]').tooltip('dispose');
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var feedback_id = "feedback-" + this.props.data.id;
      var options = {
        html: true,
        selector: '.cfb-counter'
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + feedback_id).tooltip(options);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var feedback_id = "feedback-" + this.props.data.id;
      var options = {
        html: true,
        selector: '.cfb-counter'
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + feedback_id).tooltip(options);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var feedback_id = "feedback-" + this.props.data.id;
      var elem = document.getElementById(feedback_id);
      var is_hover = elem && this.is_hover(elem);

      if (elem && !is_hover) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + feedback_id + ' A[data-toggle="tooltip"]').tooltip('dispose');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var comment_id = "c" + this.props.data.id;

      var user_name = this._get_username_chunk(); // Plain name or link.


      var right_div = this._get_right_div_chunk(); // Flagging & moderation.


      var comment_body = this.render_comment_body();
      var feedback_btns = "",
          reply_link = "",
          reply_form = "";

      if (!this.props.data.is_removed) {
        feedback_btns = this.render_feedback_btns();
        reply_link = this._get_reply_link_chunk();
        reply_form = this.render_reply_form();
      }

      var new_label = "";

      if (this.props.newcids.indexOf(this.props.data.id) > -1) {
        new_label = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "badge badge-success"
        }, "new"), "\xA0-\xA0");
      }

      var children = "";
      var settings = this.props.settings;

      if (this.props.data.children != null) {
        children = this.props.data.children.map(function (item) {
          return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Comment, {
            key: item.id,
            data: item,
            settings: settings,
            newcids: this.props.newcids,
            on_comment_created: this.props.on_comment_created
          });
        }.bind(this));
      }

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "media",
        id: comment_id
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
        src: this.props.data.user_avatar,
        className: "mr-3",
        height: "48",
        width: "48"
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "media-body"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "comment pb-3"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
        name: comment_id
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h6", {
        className: "mb-1 small d-flex"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "mr-auto"
      }, new_label, this.props.data.submit_date, "\xA0-\xA0", user_name, "\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
        className: "permalink",
        href: this.props.data.permalink
      }, "\xB6")), right_div), comment_body, feedback_btns, reply_link, reply_form), children));
    }
  }]);

  return Comment;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentForm", function() { return CommentForm; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var django__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var django__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(django__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var remarkable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var remarkable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(remarkable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var CommentForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CommentForm, _React$Component);

  function CommentForm(props) {
    var _this;

    _classCallCheck(this, CommentForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CommentForm).call(this, props));
    _this.state = {
      name: '',
      email: '',
      url: '',
      followup: false,
      comment: '',
      reply_to: _this.props.reply_to || 0,
      visited: {
        name: false,
        email: false,
        comment: false
      },
      errors: {
        name: false,
        email: false,
        comment: false
      },
      previewing: false,
      alert: {
        message: '',
        cssc: ''
      }
    };
    _this.handle_input_change = _this.handle_input_change.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handle_blur = _this.handle_blur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handle_submit = _this.handle_submit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handle_preview = _this.handle_preview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.reset_form = _this.reset_form.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fhelp = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "form-text small invalid-feedback"
    }, django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("This field is required."));
    return _this;
  }

  _createClass(CommentForm, [{
    key: "handle_input_change",
    value: function handle_input_change(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var iname = target.name;
      this.setState(_defineProperty({}, iname, value));
    }
  }, {
    key: "handle_blur",
    value: function handle_blur(field) {
      function handler(event) {
        var visited = this.state.visited;
        visited[field] = true;
        this.setState({
          visited: visited
        });
      }

      ;
      return handler.bind(this);
    }
  }, {
    key: "validate",
    value: function validate() {
      var errors = this.state.errors;
      errors.name = false;
      errors.email = false;
      if (!this.state.comment.length) errors.comment = true;else errors.comment = false;

      if (!this.props.is_authenticated || this.props.request_name) {
        if (/^\s*$/.test(this.state.name)) errors.name = true;else errors.name = false;
      }

      if (!this.props.is_authenticated || this.props.request_email_address) {
        if (/\S+@\S+\.\S+/.test(this.state.email)) errors.email = false;else errors.email = true;
      }

      this.setState({
        errors: errors
      });
      if (this.state.errors.comment || this.state.errors.name || this.state.errors.email) return false;else return true;
    }
  }, {
    key: "render_field_comment",
    value: function render_field_comment() {
      var div_cssc = "form-group row",
          input_cssc = "form-control",
          help = "";

      if (this.state.reply_to > 0) {
        input_cssc += " form-control-sm";
      }

      if (this.state.errors.comment) {
        div_cssc += this.state.errors.comment ? " has-danger" : "";
        input_cssc += " is-invalid";
        help = this.fhelp;
      }

      var placeholder = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Your comment");
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: div_cssc
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "offset-md-1 col-md-10"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("textarea", {
        required: true,
        name: "comment",
        id: "id_comment",
        placeholder: placeholder,
        maxLength: "3000",
        className: input_cssc,
        value: this.state.comment,
        onChange: this.handle_input_change,
        onBlur: this.handle_blur('comment')
      }), help));
    }
  }, {
    key: "render_field_name",
    value: function render_field_name() {
      if (this.props.is_authenticated && !this.props.request_name) return "";
      var div_cssc = "form-group row",
          label_cssc = "col-form-label col-md-3 text-right",
          input_cssc = "form-control",
          help = "";
      var placeholder = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext('name');

      if (this.state.reply_to > 0) {
        label_cssc += " form-control-sm";
        input_cssc += " form-control-sm";
      }

      if (this.state.errors.name) {
        div_cssc += " has-danger";
        input_cssc += " is-invalid";
        help = this.fhelp;
      }

      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: div_cssc
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", {
        htmlFor: "id_name",
        className: label_cssc
      }, django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Name")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "col-md-7"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "text",
        name: "name",
        required: true,
        id: "id_name",
        value: this.state.name,
        placeholder: placeholder,
        onChange: this.handle_input_change,
        onBlur: this.handle_blur('name'),
        className: input_cssc
      }), help));
    }
  }, {
    key: "render_field_email",
    value: function render_field_email() {
      if (this.props.is_authenticated && !this.props.request_email_address) return "";
      var div_cssc = "form-group row",
          label_cssc = "col-form-label col-md-3 text-right",
          input_cssc = "form-control",
          help_cssc = "form-text small",
          helptext_style = {};
      var placeholder = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext('mail address'),
          helptext = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext('Required for comment verification.');

      if (this.state.reply_to > 0) {
        label_cssc += " form-control-sm";
        input_cssc += " form-control-sm";
        helptext_style = {
          fontSize: "0.710rem"
        };
      }

      if (this.state.errors.email) {
        div_cssc += " has-danger";
        input_cssc += " is-invalid";
        help_cssc += " invalid-feedback";
      }

      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: div_cssc
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", {
        htmlFor: "id_email",
        className: label_cssc
      }, django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Mail")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "col-md-7"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "text",
        name: "email",
        required: true,
        id: "id_email",
        value: this.state.email,
        placeholder: placeholder,
        onChange: this.handle_input_change,
        onBlur: this.handle_blur('email'),
        className: input_cssc
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        className: help_cssc,
        style: helptext_style
      }, helptext)));
    }
  }, {
    key: "render_field_url",
    value: function render_field_url() {
      if (this.props.is_authenticated) return "";
      var label_cssc = "col-form-label col-md-3 text-right",
          input_cssc = "form-control";

      if (this.state.reply_to > 0) {
        label_cssc += " form-control-sm";
        input_cssc += " form-control-sm";
      }

      if (this.state.errors.url) var placeholder = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("url your name links to (optional)");
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "form-group row"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", {
        htmlFor: "id_url",
        className: label_cssc
      }, django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Link")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "col-md-7"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "text",
        name: "url",
        id: "id_url",
        value: this.state.url,
        placeholder: placeholder,
        onChange: this.handle_input_change,
        className: input_cssc
      })));
    }
  }, {
    key: "render_field_followup",
    value: function render_field_followup() {
      var label = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Notify me about follow-up comments"),
          label_cssc = "custom-control-label";
      if (this.state.reply_to > 0) label_cssc += " small";
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "form-group row"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "offset-md-3 col-md-7"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        className: "custom-control-input",
        type: "checkbox",
        checked: this.state.followup,
        onChange: this.handle_input_change,
        name: "followup",
        id: "id_followup"
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", {
        className: label_cssc,
        htmlFor: "id_followup"
      }, "\xA0", label))));
    }
  }, {
    key: "reset_form",
    value: function reset_form() {
      this.setState({
        name: '',
        email: '',
        url: '',
        followup: false,
        comment: '',
        visited: {
          name: false,
          email: false,
          comment: false
        },
        errors: {
          name: false,
          email: false,
          comment: false
        }
      });
    }
  }, {
    key: "handle_submit_response",
    value: function handle_submit_response(status) {
      var css_class = "";
      var msg_202 = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Your comment will be reviewed. Thank your for your patience."),
          msg_204 = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Thank you, a comment confirmation request has been sent by mail."),
          msg_403 = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Sorry, your comment has been rejected.");
      var message = {
        202: msg_202,
        204: msg_204,
        403: msg_403
      },
          cssc = "alert alert-";
      if (status == 403) css_class = cssc + "danger";else css_class = cssc + "info";
      this.setState({
        alert: {
          message: message[status],
          cssc: css_class
        },
        previewing: false
      });
      this.reset_form();
      this.props.on_comment_created();
    }
  }, {
    key: "handle_submit",
    value: function handle_submit(event) {
      event.preventDefault();
      if (!this.validate()) return;
      var data = {
        content_type: this.props.form.content_type,
        object_pk: this.props.form.object_pk,
        timestamp: this.props.form.timestamp,
        security_hash: this.props.form.security_hash,
        honeypot: '',
        comment: this.state.comment,
        name: this.state.name,
        email: this.state.email,
        url: this.state.url,
        followup: this.state.followup,
        reply_to: this.state.reply_to
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        method: 'POST',
        url: this.props.send_url,
        data: data,
        dataType: 'json',
        cache: false,
        success: function (data, textStatus, xhr) {
          if ([201, 202, 204].indexOf(xhr.status) > -1) {
            this.handle_submit_response(xhr.status);
          }
        }.bind(this),
        error: function (xhr, status, err) {
          if (xhr.status == 400) {
            var errors = this.state.errors;
            xhr.responseJSON.forEach(function (item, idx, array) {
              errors[item] = true;
            });
            this.setState({
              errors: errors
            });
          } else if (xhr.status == 403) {
            this.handle_submit_response(xhr.status);
          } else {
            console.error(this.props.send_url, status, err.toString());
          }
        }.bind(this)
      });
    }
  }, {
    key: "handle_preview",
    value: function handle_preview(event) {
      event.preventDefault();
      if (this.validate()) this.setState({
        previewing: true
      });
    }
  }, {
    key: "rawMarkup",
    value: function rawMarkup() {
      var md = new remarkable__WEBPACK_IMPORTED_MODULE_5___default.a();
      var rawMarkup = md.render(this.state.comment);
      return {
        __html: rawMarkup
      };
    }
  }, {
    key: "render_preview",
    value: function render_preview() {
      if (!this.state.previewing) return "";
      var heading_name = ""; // Build Gravatar.

      var hash = md5__WEBPACK_IMPORTED_MODULE_2___default()(this.state.email.toLowerCase());
      var avatar_url = "http://www.gravatar.com/avatar/" + hash + "?s=48&d=mm";
      var avatar_img = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
        className: "mr-3",
        src: avatar_url,
        height: "48",
        width: "48"
      });

      if (this.state.url) {
        heading_name = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("a", {
          href: this.state.url,
          target: "_new"
        }, this.state.name);
      } else {
        if (this.props.is_authenticated) heading_name = this.props.current_user.split(":")[1];else heading_name = this.state.name;
      }

      var label = "";
      var header_text = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Your comment in preview");
      var header = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h5", {
        className: "text-center"
      }, header_text);

      if (this.state.reply_to > 0) {
        header = "";
        label = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
          className: "badge badge-info"
        }, "preview");
      }

      var nowtext = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Now");
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("hr", null), header, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "media"
      }, avatar_img, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "media-body"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "comment pb-3"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h6", {
        className: "mb-1 small"
      }, nowtext, "\xA0-\xA0", heading_name, "\xA0\xA0", label), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "preview",
        dangerouslySetInnerHTML: this.rawMarkup()
      })))));
    }
  }, {
    key: "render_form",
    value: function render_form() {
      var comment = this.render_field_comment();
      var name = this.render_field_name();
      var mail = this.render_field_email();
      var url = this.render_field_url();
      var followup = this.render_field_followup();
      var btns_row_class = "form-group row";
      var btn_submit_class = "btn btn-primary",
          btn_preview_class = "btn btn-secondary";

      if (this.state.reply_to != 0) {
        btns_row_class += " mb-0";
        btn_submit_class += " btn-sm";
        btn_preview_class += " btn-sm";
      }

      var btn_label_preview = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("preview");
      var btn_label_send = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("send");
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("form", {
        method: "POST",
        onSubmit: this.handle_submit
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "hidden",
        name: "content_type",
        defaultValue: this.props.form.content_type
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "hidden",
        name: "object_pk",
        defaultValue: this.props.form.object_pk
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "hidden",
        name: "timestamp",
        defaultValue: this.props.form.timestamp
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "hidden",
        name: "security_hash",
        defaultValue: this.props.form.security_hash
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "hidden",
        name: "reply_to",
        defaultValue: this.state.reply_to
      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("fieldset", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        style: {
          display: 'none'
        }
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
        type: "text",
        name: "honeypot",
        defaultValue: ""
      })), comment, " ", name, " ", mail, " ", url, " ", followup), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: btns_row_class
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "offset-md-3 col-md-7"
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
        type: "submit",
        name: "post",
        className: btn_submit_class
      }, btn_label_send), "\xA0", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
        name: "preview",
        className: btn_preview_class,
        onClick: this.handle_preview
      }, btn_label_preview))));
    }
  }, {
    key: "render",
    value: function render() {
      var preview = this.render_preview();
      var header = "";
      var div_class = "card card-block mt-2";
      var label = django__WEBPACK_IMPORTED_MODULE_1___default.a.gettext("Post your comment");

      if (this.state.reply_to == 0) {
        header = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", {
          className: "card-title text-center pb-3"
        }, label);
        div_class = "card card-block mt-4 mb-5";
      }

      var alert_div = "";

      if (this.state.alert.message) {
        alert_div = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
          className: this.state.alert.cssc
        }, this.state.alert.message);
      }

      var form = this.render_form();
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, preview, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: div_class
      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "card-body"
      }, header, alert_div, form)));
    }
  }]);

  return CommentForm;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

/***/ })

/******/ });
//# sourceMappingURL=plugin-2.4.1.js.map