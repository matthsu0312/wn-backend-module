"use strict";
(self["webpackChunk_wintercms_wn_backend_module"] = self["webpackChunk_wintercms_wn_backend_module"] || []).push([["/assets/ui/js/build/backend"],{

/***/ "./assets/ui/js/ajax/Handler.js":
/*!**************************************!*\
  !*** ./assets/ui/js/ajax/Handler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Handler)
/* harmony export */ });
/* harmony import */ var jquery_events_to_dom_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery-events-to-dom-events */ "../../node_modules/jquery-events-to-dom-events/dist/index.m.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/**
 * Backend AJAX handler.
 *
 * This is a utility script that resolves some backwards-compatibility issues with the functionality
 * that relies on the old framework, and ensures that Snowboard works well within the Backend
 * environment.
 *
 * Functions:
 *  - Adds the "render" jQuery event to Snowboard requests that widgets use to initialise.
 *  - Ensures the CSRF token is included in requests.
 *
 * @copyright 2021 Winter.
 * @author Ben Thomson <git@alfreido.com>
 */
var Handler = /*#__PURE__*/function (_Snowboard$Singleton) {
  _inherits(Handler, _Snowboard$Singleton);
  var _super = _createSuper(Handler);
  function Handler() {
    _classCallCheck(this, Handler);
    return _super.apply(this, arguments);
  }
  _createClass(Handler, [{
    key: "listens",
    value:
    /**
     * Event listeners.
     *
     * @returns {Object}
     */
    function listens() {
      return {
        ready: 'ready',
        ajaxFetchOptions: 'ajaxFetchOptions',
        ajaxUpdateComplete: 'ajaxUpdateComplete'
      };
    }

    /**
     * Ready handler.
     *
     * Fires off a "render" event.
     */
  }, {
    key: "ready",
    value: function ready() {
      var _this = this;
      if (!window.jQuery) {
        return;
      }

      // Add global event for rendering in Snowboard
      (0,jquery_events_to_dom_events__WEBPACK_IMPORTED_MODULE_0__.delegate)('render');
      document.addEventListener('$render', function () {
        _this.snowboard.globalEvent('render');
      });

      // Add "render" event for backwards compatibility
      window.jQuery(document).trigger('render');
    }

    /**
     * Adds the jQuery AJAX prefilter that the old framework uses to inject the CSRF token in AJAX
     * calls.
     */
  }, {
    key: "addPrefilter",
    value: function addPrefilter() {
      var _this2 = this;
      if (!window.jQuery) {
        return;
      }
      window.jQuery.ajaxPrefilter(function (options) {
        if (_this2.hasToken()) {
          if (!options.headers) {
            options.headers = {};
          }
          options.headers['X-CSRF-TOKEN'] = _this2.getToken();
        }
      });
    }

    /**
     * Fetch options handler.
     *
     * Ensures that the CSRF token is included in Snowboard requests.
     *
     * @param {Object} options
     */
  }, {
    key: "ajaxFetchOptions",
    value: function ajaxFetchOptions(options) {
      if (this.hasToken()) {
        options.headers['X-CSRF-TOKEN'] = this.getToken();
      }
    }

    /**
     * Update complete handler.
     *
     * Fires off a "render" event when partials are updated so that any widgets included in
     * responses are correctly initialised.
     */
  }, {
    key: "ajaxUpdateComplete",
    value: function ajaxUpdateComplete() {
      if (!window.jQuery) {
        return;
      }

      // Add "render" event for backwards compatibility
      window.jQuery(document).trigger('render');
    }

    /**
     * Determines if a CSRF token is available.
     *
     * @returns {Boolean}
     */
  }, {
    key: "hasToken",
    value: function hasToken() {
      var tokenElement = document.querySelector('meta[name="csrf-token"]');
      if (!tokenElement) {
        return false;
      }
      if (!tokenElement.hasAttribute('content')) {
        return false;
      }
      return true;
    }

    /**
     * Gets the CSRF token.
     *
     * @returns {String}
     */
  }, {
    key: "getToken",
    value: function getToken() {
      return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }
  }]);
  return Handler;
}(Snowboard.Singleton);


/***/ }),

/***/ "./assets/ui/js/index.js":
/*!*******************************!*\
  !*** ./assets/ui/js/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _ajax_Handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ajax/Handler */ "./assets/ui/js/ajax/Handler.js");
/* harmony import */ var _ui_DateTimeControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/DateTimeControl */ "./assets/ui/js/ui/DateTimeControl.js");
/* harmony import */ var _ui_EventHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/EventHandler */ "./assets/ui/js/ui/EventHandler.js");
/* harmony import */ var _ui_WidgetHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/WidgetHandler */ "./assets/ui/js/ui/WidgetHandler.js");





if (window.Snowboard === undefined) {
  throw new Error('Snowboard must be loaded in order to use the Backend UI.');
}
(function (Snowboard) {
  // Add necessary plugins
  Snowboard.addPlugin('backend.ajax.handler', _ajax_Handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  Snowboard.addPlugin('backend.ui.eventHandler', _ui_EventHandler__WEBPACK_IMPORTED_MODULE_3__["default"]);
  Snowboard.addPlugin('backend.ui.widgetHandler', _ui_WidgetHandler__WEBPACK_IMPORTED_MODULE_4__["default"]);

  // Add the pre-filter immediately
  Snowboard['backend.ajax.handler']().addPrefilter();

  // Global controls
  Snowboard.addPlugin('backend.ui.dateTimeControl', _ui_DateTimeControl__WEBPACK_IMPORTED_MODULE_2__["default"]);
  Snowboard['backend.ui.widgetHandler']().register('datetime', 'backend.ui.dateTimeControl');

  // Add polyfill for AssetManager
  window.AssetManager = {
    load: function load(assets, callback) {
      Snowboard.assetLoader().load(assets).then(function () {
        if (callback && typeof callback === 'function') {
          callback();
        }
      });
    }
  };
  window.assetManager = window.AssetManager;
})(window.Snowboard);

// Add Vue to global scope
window.Vue = vue__WEBPACK_IMPORTED_MODULE_0__;

/***/ }),

/***/ "./assets/ui/js/ui/DateTimeControl.js":
/*!********************************************!*\
  !*** ./assets/ui/js/ui/DateTimeControl.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateTimeControl)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! luxon */ "../../node_modules/luxon/src/luxon.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/**
 * DateTime control.
 *
 * This control uses the Luxon time library to display time and date values. It will be attached to
 * `<time data-control="datetime">` elements.
 *
 * Usage:
 *
 * <time
 *      data-control="datetime"
 *      data-datetime="2014-11-19 01:21:57"
 *      data-format="dddd Do [o]f MMMM YYYY hh:mm:ss A"
 *      data-timezone="Australia/Sydney"
 *      data-locale="en-au">This text will be replaced</time>
 *
 * Alias options:
 *
 * time             -> 6:28 AM
 * timeLong         -> 6:28:01 AM
 * date             -> 04/23/2016
 * dateMin          -> 4/23/2016
 * dateLong         -> April 23, 2016
 * dateLongMin      -> Apr 23, 2016
 * dateTime         -> April 23, 2016 6:28 AM
 * dateTimeMin      -> Apr 23, 2016 6:28 AM
 * dateTimeLong     -> Saturday, April 23, 2016 6:28 AM
 * dateTimeLongMin  -> Sat, Apr 23, 2016 6:29 AM
 *
 * @copyright 2022 Winter.
 * @author Ben Thomson <git@alfreido.com>
 */
var DateTimeControl = /*#__PURE__*/function (_Snowboard$PluginBase) {
  _inherits(DateTimeControl, _Snowboard$PluginBase);
  var _super = _createSuper(DateTimeControl);
  function DateTimeControl() {
    _classCallCheck(this, DateTimeControl);
    return _super.apply(this, arguments);
  }
  _createClass(DateTimeControl, [{
    key: "construct",
    value:
    /**
     * Constructor.
     *
     * @param {HTMLElement} element
     */
    function construct(element) {
      this.element = element;
      this.config = this.snowboard.dataConfig(this, element);
      this.appTimezone = this.getAppTimezone();
      this.backendTimezone = this.getBackendTimezone();
      this.backendLocale = this.getBackendLocale();
      this.format = this.getFormat();
      if (!this.config.get('datetime')) {
        throw new Error('The "datetime" attribute is required for a DateTime control.');
      }
      this.updateElement();
    }

    /**
     * Sets the default options for this widget.
     *
     * Available options:
     *
     * - `data-datetime=""`: The date and time to format. This is required.
     * - `data-format=""`: The format to use for the date and time. See the DateTimeControl class docs for available formats.
     * - `data-format-alias=""`: An alternate way of defining the format, by using the alias as opposed to the format code.
     * - `data-ignore-timezone`: If set, the user and default timezone will be ignored and set to UTC.
     * - `data-time-since`: If set, the time will be displayed as a time since the given date.
     * - `data-time-tense`: If set, the time will be displayed in a full tense format.
     *
     * @returns {Object}
     */
  }, {
    key: "defaults",
    value: function defaults() {
      return {
        datetime: null,
        format: 'ccc ff',
        formatAlias: null,
        ignoreTimezone: false,
        timeSince: false,
        timeTense: false
      };
    }

    /**
     * Updates the element with the formatted date and time.
     */
  }, {
    key: "updateElement",
    value: function updateElement() {
      this.element.innerText = this.getFormattedValue();
    }

    /**
     * Gets the formatted date and time.
     *
     * @returns {String}
     */
  }, {
    key: "getFormattedValue",
    value: function getFormattedValue() {
      var dateObj = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromSQL(this.config.get('datetime'), {
        zone: this.appTimezone
      }).setLocale(this.backendLocale).setZone(this.backendTimezone);
      if (this.config.get('timeSince')) {
        return dateObj.toRelative();
      }
      if (this.config.get('timeTense')) {
        var weekAgo = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now().minus({
          weeks: 1
        });
        if (weekAgo < dateObj) {
          // Add tooltip for full date
          this.element.setAttribute('title', dateObj.toFormat(this.format));
          this.element.setAttribute('data-toggle', 'tooltip');
          var relativeDate = dateObj.toRelativeCalendar({
            unit: 'days'
          });
          return relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1);
        }
      }
      return dateObj.toFormat(this.format);
    }

    /**
     * Returns a map of format aliases to their format codes.
     *
     * @returns {Object}
     */
  }, {
    key: "formatAliases",
    value: function formatAliases() {
      return {
        time: 't',
        timeLong: 'tt',
        date: 'D',
        dateMin: 'D',
        dateLong: 'DDD',
        dateLongMin: 'DD',
        dateTime: 'fff',
        dateTimeMin: 'ff',
        dateTimeLong: 'ffff',
        dateTimeLongMin: 'ccc ff'
      };
    }

    /**
     * Gets the configured format for this dateTime control.
     *
     * @returns {String}
     */
  }, {
    key: "getFormat",
    value: function getFormat() {
      if (this.config.get('formatAlias') && Object.keys(this.formatAliases()).includes(this.config.get('formatAlias'))) {
        return this.formatAliases()[this.config.get('formatAlias')];
      }
      return this.config.get('format');
    }

    /**
     * Gets the app default timezome.
     *
     * @returns {String}
     */
  }, {
    key: "getAppTimezone",
    value: function getAppTimezone() {
      return this.config.get('ignoreTimezone') ? 'UTC' : this.getMetaValue('app-timezone', 'UTC');
    }

    /**
     * Gets the backend timezone, which is user-configurable.
     *
     * @returns {String}
     */
  }, {
    key: "getBackendTimezone",
    value: function getBackendTimezone() {
      return this.config.get('ignoreTimezone') ? 'UTC' : this.getMetaValue('backend-timezone', 'UTC');
    }

    /**
     * Gets the backend locale.
     *
     * @returns {String}
     */
  }, {
    key: "getBackendLocale",
    value: function getBackendLocale() {
      return this.getMetaValue('backend-locale', 'en-US');
    }

    /**
     * Gets the value from a given meta tag.
     *
     * @param {String} name
     * @param {*} defaultValue
     * @returns {String}
     */
  }, {
    key: "getMetaValue",
    value: function getMetaValue(name) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var meta = document.querySelector("meta[name=\"".concat(name, "\"]"));
      if (!meta) {
        return defaultValue;
      }
      return meta.getAttribute('content');
    }
  }]);
  return DateTimeControl;
}(Snowboard.PluginBase);

;

/***/ }),

/***/ "./assets/ui/js/ui/EventHandler.js":
/*!*****************************************!*\
  !*** ./assets/ui/js/ui/EventHandler.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventHandler)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Widget event handler.
 *
 * Extends a widget with event handling functionality, allowing for the quick definition of events
 * and listening for events on a specific instance of a widget.
 *
 * This is a complement to Snowboard's global events - these events will still fire in order to
 * allow external code to listen and handle events. Local events can cancel the global event (and
 * further local events) by returning `false` from the callback.
 *
 * @copyright 2022 Winter.
 * @author Ben Thomson <git@alfreido.com>
 */
var EventHandler = /*#__PURE__*/function (_Snowboard$PluginBase) {
  _inherits(EventHandler, _Snowboard$PluginBase);
  var _super = _createSuper(EventHandler);
  function EventHandler() {
    _classCallCheck(this, EventHandler);
    return _super.apply(this, arguments);
  }
  _createClass(EventHandler, [{
    key: "construct",
    value:
    /**
     * Constructor.
     *
     * @param {PluginBase} instance
     * @param {String} eventPrefix
     */
    function construct(instance, eventPrefix) {
      if (instance instanceof Snowboard.PluginBase === false) {
        throw new Error('Event handling can only be applied to Snowboard classes.');
      }
      if (!eventPrefix) {
        throw new Error('Event prefix is required.');
      }
      this.instance = instance;
      this.eventPrefix = eventPrefix;
      this.events = [];
    }

    /**
     * Registers a listener for a widget's event.
     *
     * @param {String} event
     * @param {Function} callback
     */
  }, {
    key: "on",
    value: function on(event, callback) {
      this.events.push({
        event: event,
        callback: callback
      });
    }

    /**
     * Deregisters a listener for a widget's event.
     *
     * @param {String} event
     * @param {Function} callback
     */
  }, {
    key: "off",
    value: function off(event, callback) {
      this.events = this.events.filter(function (registeredEvent) {
        return registeredEvent.event !== event || registeredEvent.callback !== callback;
      });
    }

    /**
     * Registers a listener for a widget's event that will only fire once.
     *
     * @param {String} event
     * @param {Function} callback
     */
  }, {
    key: "once",
    value: function once(event, _callback) {
      var _this = this;
      var length = this.events.push({
        event: event,
        callback: function callback() {
          _callback.apply(void 0, arguments);
          _this.events.splice(length - 1, 1);
        }
      });
    }

    /**
     * Fires an event on the widget.
     *
     * Local events are fired first, then a global event is fired afterwards.
     *
     * @param {String} eventName
     * @param  {...any} parameters
     */
  }, {
    key: "fire",
    value: function fire(eventName) {
      for (var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parameters[_key - 1] = arguments[_key];
      }
      // Fire local events first
      var events = this.events.filter(function (registeredEvent) {
        return registeredEvent.event === eventName;
      });
      var cancelled = false;
      events.forEach(function (event) {
        if (cancelled) {
          return;
        }
        if (event.callback.apply(event, parameters) === false) {
          cancelled = true;
        }
      });
      if (!cancelled) {
        var _this$snowboard;
        (_this$snowboard = this.snowboard).globalEvent.apply(_this$snowboard, ["".concat(this.eventPrefix, ".").concat(eventName)].concat(parameters));
      }
    }

    /**
     * Fires a promise event on the widget.
     *
     * Local events are fired first, then a global event is fired afterwards.
     *
     * @param {String} eventName
     * @param  {...any} parameters
     */
  }, {
    key: "firePromise",
    value: function firePromise(eventName) {
      var _this2 = this;
      for (var _len2 = arguments.length, parameters = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        parameters[_key2 - 1] = arguments[_key2];
      }
      var events = this.events.filter(function (registeredEvent) {
        return registeredEvent.event === eventName;
      });
      var promises = events.filter(function (event) {
        return event !== null;
      }, events.map(function (event) {
        return event.callback.apply(event, parameters);
      }));
      Promise.all(promises).then(function () {
        var _this2$snowboard;
        (_this2$snowboard = _this2.snowboard).globalPromiseEvent.apply(_this2$snowboard, ["".concat(_this2.eventPrefix, ".").concat(eventName)].concat(parameters));
      });
    }
  }]);
  return EventHandler;
}(Snowboard.PluginBase);


/***/ }),

/***/ "./assets/ui/js/ui/WidgetHandler.js":
/*!******************************************!*\
  !*** ./assets/ui/js/ui/WidgetHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WidgetHandler)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Backend widget handler.
 *
 * Handles the creation and disposal of widgets in the Backend. Widgets should include this as
 * a dependency in order to be loaded and initialised after the handler, in order to correctly
 * register.
 *
 * @copyright 2022 Winter.
 * @author Ben Thomson <git@alfreido.com>
 */
var WidgetHandler = /*#__PURE__*/function (_Snowboard$Singleton) {
  _inherits(WidgetHandler, _Snowboard$Singleton);
  var _super = _createSuper(WidgetHandler);
  function WidgetHandler() {
    _classCallCheck(this, WidgetHandler);
    return _super.apply(this, arguments);
  }
  _createClass(WidgetHandler, [{
    key: "construct",
    value:
    /**
     * Constructor.
     */
    function construct() {
      var _this = this;
      this.registeredWidgets = [];
      this.elements = [];
      this.events = {
        mutate: function mutate(mutations) {
          return _this.onMutation(mutations);
        }
      };
      this.observer = null;
    }

    /**
     * Listeners.
     *
     * @returns {Object}
     */
  }, {
    key: "listens",
    value: function listens() {
      return {
        ready: 'onReady',
        render: 'onRender',
        ajaxUpdate: 'onAjaxUpdate'
      };
    }

    /**
     * Registers a widget as a given data control.
     *
     * Registering a widget will allow any element that contains a "data-control" attribute matching
     * the control name to be initialized with the given widget.
     *
     * You may optionally provide a callback that will be fired when an instance of the widget is
     * initialized - the callback will be provided the element and the widget instance as parameters.
     *
     * @param {String} control
     * @param {Snowboard.PluginBase} widget
     * @param {Function} callback
     */
  }, {
    key: "register",
    value: function register(control, widget, callback) {
      this.registeredWidgets.push({
        control: control,
        widget: widget,
        callback: callback
      });
    }

    /**
     * Unregisters a data control.
     *
     * @param {String} control
     */
  }, {
    key: "unregister",
    value: function unregister(control) {
      this.registeredWidgets = this.registeredWidgets.filter(function (widget) {
        return widget.control !== control;
      });
    }

    /**
     * Ready handler.
     *
     * Initializes widgets within the entire document.
     */
  }, {
    key: "onReady",
    value: function onReady() {
      this.initializeWidgets(document.body);

      // Register a DOM observer and watch for any removed nodes
      if (!this.observer) {
        this.observer = new MutationObserver(this.events.mutate);
        this.observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }

    /**
     * Render handler.
     *
     * Initializes widgets within the entire document.
     */
  }, {
    key: "onRender",
    value: function onRender() {
      this.initializeWidgets(document.body);
    }

    /**
     * AJAX update handler.
     *
     * Initializes widgets inside an update element from an AJAX response.
     *
     * @param {HTMLElement} element
     */
  }, {
    key: "onAjaxUpdate",
    value: function onAjaxUpdate(element) {
      this.initializeWidgets(element);
    }

    /**
     * Initializes all widgets within an element.
     *
     * If an element contains a "data-control" attribute matching a registered widget, the widget
     * is initialized and attached to the element as a "widget" property.
     *
     * Only one widget may be initialized to a particular element.
     *
     * @param {HTMLElement} element
     */
  }, {
    key: "initializeWidgets",
    value: function initializeWidgets(element) {
      var _this2 = this;
      this.registeredWidgets.forEach(function (widget) {
        var instances = element.querySelectorAll("[data-control=\"".concat(widget.control, "\"]:not([data-widget-initialized])"));
        if (instances.length) {
          instances.forEach(function (instance) {
            // Prevent double-widget initialization
            if (instance.dataset.widgetInitialized) {
              return;
            }
            var widgetInstance = _this2.snowboard[widget.widget](instance);
            _this2.elements.push({
              element: instance,
              instance: widgetInstance
            });
            instance.dataset.widgetInitialized = true;
            _this2.snowboard.globalEvent('backend.widget.initialized', instance, widgetInstance);
            if (typeof widget.callback === 'function') {
              widget.callback(widgetInstance, instance);
            }
          });
        }
      });
    }

    /**
     * Returns a widget that is attached to the given element, if any.
     *
     * @param {HTMLElement} element
     * @returns {Snowboard.PluginBase|null}
     */
  }, {
    key: "getWidget",
    value: function getWidget(element) {
      var found = this.elements.find(function (widget) {
        return widget.element === element;
      });
      if (found) {
        return found.instance;
      }
      return null;
    }

    /**
     * Callback for mutation events.
     *
     * We're only tracking removed nodes, to ensure that those widgets are disposed of.
     *
     * @param {MutationRecord[]} mutations
     */
  }, {
    key: "onMutation",
    value: function onMutation(mutations) {
      var _this3 = this;
      var removedNodes = mutations.filter(function (mutation) {
        return mutation.removedNodes.length;
      }).map(function (mutation) {
        return Array.from(mutation.removedNodes);
      }).flat();
      if (!removedNodes.length) {
        return;
      }
      removedNodes.forEach(function (node) {
        var widgets = _this3.elements.filter(function (widget) {
          return node.contains(widget.element);
        });
        if (widgets.length) {
          widgets.forEach(function (widget) {
            widget.instance.destruct();
            _this3.elements = _this3.elements.filter(function (element) {
              return element !== widget;
            });
          });
        }
      });
    }
  }]);
  return WidgetHandler;
}(Snowboard.Singleton);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets/ui/js/build/vendor"], () => (__webpack_exec__("./assets/ui/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM1QixRQUFRLENBQUNmLE1BQU0sQ0FBQyxVQUFDdUIsTUFBTTtVQUFBLE9BQUttQixJQUFJLENBQUNFLFFBQVEsQ0FBQ3JCLE1BQU0sQ0FBQ3RGLE9BQU8sQ0FBQztRQUFBLEVBQUM7UUFDL0UsSUFBSTBHLE9BQU8sQ0FBQ3pDLE1BQU0sRUFBRTtVQUNoQnlDLE9BQU8sQ0FBQ3BDLE9BQU8sQ0FBQyxVQUFDZ0IsTUFBTSxFQUFLO1lBQ3hCQSxNQUFNLENBQUM1QixRQUFRLENBQUNrRCxRQUFRLEVBQUU7WUFDMUIsTUFBSSxDQUFDOUIsUUFBUSxHQUFHLE1BQUksQ0FBQ0EsUUFBUSxDQUFDZixNQUFNLENBQUMsVUFBQy9ELE9BQU87Y0FBQSxPQUFLQSxPQUFPLEtBQUtzRixNQUFNO1lBQUEsRUFBQztVQUN6RSxDQUFDLENBQUM7UUFDTjtNQUNKLENBQUMsQ0FBQztJQUNOO0VBQUM7RUFBQTtBQUFBLEVBektzQzNHLFNBQVMsQ0FBQ0MsU0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL0B3aW50ZXJjbXMvd24tYmFja2VuZC1tb2R1bGUvLi9hc3NldHMvdWkvanMvYWpheC9IYW5kbGVyLmpzIiwid2VicGFjazovL0B3aW50ZXJjbXMvd24tYmFja2VuZC1tb2R1bGUvLi9hc3NldHMvdWkvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQHdpbnRlcmNtcy93bi1iYWNrZW5kLW1vZHVsZS8uL2Fzc2V0cy91aS9qcy91aS9EYXRlVGltZUNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vQHdpbnRlcmNtcy93bi1iYWNrZW5kLW1vZHVsZS8uL2Fzc2V0cy91aS9qcy91aS9FdmVudEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vQHdpbnRlcmNtcy93bi1iYWNrZW5kLW1vZHVsZS8uL2Fzc2V0cy91aS9qcy91aS9XaWRnZXRIYW5kbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlbGVnYXRlIH0gZnJvbSAnanF1ZXJ5LWV2ZW50cy10by1kb20tZXZlbnRzJztcblxuLyoqXG4gKiBCYWNrZW5kIEFKQVggaGFuZGxlci5cbiAqXG4gKiBUaGlzIGlzIGEgdXRpbGl0eSBzY3JpcHQgdGhhdCByZXNvbHZlcyBzb21lIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGlzc3VlcyB3aXRoIHRoZSBmdW5jdGlvbmFsaXR5XG4gKiB0aGF0IHJlbGllcyBvbiB0aGUgb2xkIGZyYW1ld29yaywgYW5kIGVuc3VyZXMgdGhhdCBTbm93Ym9hcmQgd29ya3Mgd2VsbCB3aXRoaW4gdGhlIEJhY2tlbmRcbiAqIGVudmlyb25tZW50LlxuICpcbiAqIEZ1bmN0aW9uczpcbiAqICAtIEFkZHMgdGhlIFwicmVuZGVyXCIgalF1ZXJ5IGV2ZW50IHRvIFNub3dib2FyZCByZXF1ZXN0cyB0aGF0IHdpZGdldHMgdXNlIHRvIGluaXRpYWxpc2UuXG4gKiAgLSBFbnN1cmVzIHRoZSBDU1JGIHRva2VuIGlzIGluY2x1ZGVkIGluIHJlcXVlc3RzLlxuICpcbiAqIEBjb3B5cmlnaHQgMjAyMSBXaW50ZXIuXG4gKiBAYXV0aG9yIEJlbiBUaG9tc29uIDxnaXRAYWxmcmVpZG8uY29tPlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kbGVyIGV4dGVuZHMgU25vd2JvYXJkLlNpbmdsZXRvbiB7XG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBsaXN0ZW5zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZHk6ICdyZWFkeScsXG4gICAgICAgICAgICBhamF4RmV0Y2hPcHRpb25zOiAnYWpheEZldGNoT3B0aW9ucycsXG4gICAgICAgICAgICBhamF4VXBkYXRlQ29tcGxldGU6ICdhamF4VXBkYXRlQ29tcGxldGUnLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWR5IGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBGaXJlcyBvZmYgYSBcInJlbmRlclwiIGV2ZW50LlxuICAgICAqL1xuICAgIHJlYWR5KCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBnbG9iYWwgZXZlbnQgZm9yIHJlbmRlcmluZyBpbiBTbm93Ym9hcmRcbiAgICAgICAgZGVsZWdhdGUoJ3JlbmRlcicpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCckcmVuZGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbm93Ym9hcmQuZ2xvYmFsRXZlbnQoJ3JlbmRlcicpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBZGQgXCJyZW5kZXJcIiBldmVudCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICAgICAgd2luZG93LmpRdWVyeShkb2N1bWVudCkudHJpZ2dlcigncmVuZGVyJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgalF1ZXJ5IEFKQVggcHJlZmlsdGVyIHRoYXQgdGhlIG9sZCBmcmFtZXdvcmsgdXNlcyB0byBpbmplY3QgdGhlIENTUkYgdG9rZW4gaW4gQUpBWFxuICAgICAqIGNhbGxzLlxuICAgICAqL1xuICAgIGFkZFByZWZpbHRlcigpIHtcbiAgICAgICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rva2VuKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydYLUNTUkYtVE9LRU4nXSA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggb3B0aW9ucyBoYW5kbGVyLlxuICAgICAqXG4gICAgICogRW5zdXJlcyB0aGF0IHRoZSBDU1JGIHRva2VuIGlzIGluY2x1ZGVkIGluIFNub3dib2FyZCByZXF1ZXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICovXG4gICAgYWpheEZldGNoT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1Rva2VuKCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVyc1snWC1DU1JGLVRPS0VOJ10gPSB0aGlzLmdldFRva2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29tcGxldGUgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEZpcmVzIG9mZiBhIFwicmVuZGVyXCIgZXZlbnQgd2hlbiBwYXJ0aWFscyBhcmUgdXBkYXRlZCBzbyB0aGF0IGFueSB3aWRnZXRzIGluY2x1ZGVkIGluXG4gICAgICogcmVzcG9uc2VzIGFyZSBjb3JyZWN0bHkgaW5pdGlhbGlzZWQuXG4gICAgICovXG4gICAgYWpheFVwZGF0ZUNvbXBsZXRlKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBcInJlbmRlclwiIGV2ZW50IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgICB3aW5kb3cualF1ZXJ5KGRvY3VtZW50KS50cmlnZ2VyKCdyZW5kZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgQ1NSRiB0b2tlbiBpcyBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNUb2tlbigpIHtcbiAgICAgICAgY29uc3QgdG9rZW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpO1xuXG4gICAgICAgIGlmICghdG9rZW5FbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b2tlbkVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250ZW50JykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIENTUkYgdG9rZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFRva2VuKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IEJhY2tlbmRBamF4SGFuZGxlciBmcm9tICcuL2FqYXgvSGFuZGxlcic7XG5pbXBvcnQgQmFja2VuZERhdGVUaW1lQ29udHJvbCBmcm9tICcuL3VpL0RhdGVUaW1lQ29udHJvbCc7XG5pbXBvcnQgQmFja2VuZFVpRXZlbnRIYW5kbGVyIGZyb20gJy4vdWkvRXZlbnRIYW5kbGVyJztcbmltcG9ydCBCYWNrZW5kVWlXaWRnZXRIYW5kbGVyIGZyb20gJy4vdWkvV2lkZ2V0SGFuZGxlcic7XG5cbmlmICh3aW5kb3cuU25vd2JvYXJkID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nub3dib2FyZCBtdXN0IGJlIGxvYWRlZCBpbiBvcmRlciB0byB1c2UgdGhlIEJhY2tlbmQgVUkuJyk7XG59XG5cbigoU25vd2JvYXJkKSA9PiB7XG4gICAgLy8gQWRkIG5lY2Vzc2FyeSBwbHVnaW5zXG4gICAgU25vd2JvYXJkLmFkZFBsdWdpbignYmFja2VuZC5hamF4LmhhbmRsZXInLCBCYWNrZW5kQWpheEhhbmRsZXIpO1xuICAgIFNub3dib2FyZC5hZGRQbHVnaW4oJ2JhY2tlbmQudWkuZXZlbnRIYW5kbGVyJywgQmFja2VuZFVpRXZlbnRIYW5kbGVyKTtcbiAgICBTbm93Ym9hcmQuYWRkUGx1Z2luKCdiYWNrZW5kLnVpLndpZGdldEhhbmRsZXInLCBCYWNrZW5kVWlXaWRnZXRIYW5kbGVyKTtcblxuICAgIC8vIEFkZCB0aGUgcHJlLWZpbHRlciBpbW1lZGlhdGVseVxuICAgIFNub3dib2FyZFsnYmFja2VuZC5hamF4LmhhbmRsZXInXSgpLmFkZFByZWZpbHRlcigpO1xuXG4gICAgLy8gR2xvYmFsIGNvbnRyb2xzXG4gICAgU25vd2JvYXJkLmFkZFBsdWdpbignYmFja2VuZC51aS5kYXRlVGltZUNvbnRyb2wnLCBCYWNrZW5kRGF0ZVRpbWVDb250cm9sKTtcbiAgICBTbm93Ym9hcmRbJ2JhY2tlbmQudWkud2lkZ2V0SGFuZGxlciddKCkucmVnaXN0ZXIoJ2RhdGV0aW1lJywgJ2JhY2tlbmQudWkuZGF0ZVRpbWVDb250cm9sJyk7XG5cbiAgICAvLyBBZGQgcG9seWZpbGwgZm9yIEFzc2V0TWFuYWdlclxuICAgIHdpbmRvdy5Bc3NldE1hbmFnZXIgPSB7XG4gICAgICAgIGxvYWQ6IChhc3NldHMsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBTbm93Ym9hcmQuYXNzZXRMb2FkZXIoKS5sb2FkKGFzc2V0cykudGhlbihcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHdpbmRvdy5hc3NldE1hbmFnZXIgPSB3aW5kb3cuQXNzZXRNYW5hZ2VyO1xufSkod2luZG93LlNub3dib2FyZCk7XG5cbi8vIEFkZCBWdWUgdG8gZ2xvYmFsIHNjb3BlXG53aW5kb3cuVnVlID0gVnVlO1xuIiwiaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbi8qKlxuICogRGF0ZVRpbWUgY29udHJvbC5cbiAqXG4gKiBUaGlzIGNvbnRyb2wgdXNlcyB0aGUgTHV4b24gdGltZSBsaWJyYXJ5IHRvIGRpc3BsYXkgdGltZSBhbmQgZGF0ZSB2YWx1ZXMuIEl0IHdpbGwgYmUgYXR0YWNoZWQgdG9cbiAqIGA8dGltZSBkYXRhLWNvbnRyb2w9XCJkYXRldGltZVwiPmAgZWxlbWVudHMuXG4gKlxuICogVXNhZ2U6XG4gKlxuICogPHRpbWVcbiAqICAgICAgZGF0YS1jb250cm9sPVwiZGF0ZXRpbWVcIlxuICogICAgICBkYXRhLWRhdGV0aW1lPVwiMjAxNC0xMS0xOSAwMToyMTo1N1wiXG4gKiAgICAgIGRhdGEtZm9ybWF0PVwiZGRkZCBEbyBbb11mIE1NTU0gWVlZWSBoaDptbTpzcyBBXCJcbiAqICAgICAgZGF0YS10aW1lem9uZT1cIkF1c3RyYWxpYS9TeWRuZXlcIlxuICogICAgICBkYXRhLWxvY2FsZT1cImVuLWF1XCI+VGhpcyB0ZXh0IHdpbGwgYmUgcmVwbGFjZWQ8L3RpbWU+XG4gKlxuICogQWxpYXMgb3B0aW9uczpcbiAqXG4gKiB0aW1lICAgICAgICAgICAgIC0+IDY6MjggQU1cbiAqIHRpbWVMb25nICAgICAgICAgLT4gNjoyODowMSBBTVxuICogZGF0ZSAgICAgICAgICAgICAtPiAwNC8yMy8yMDE2XG4gKiBkYXRlTWluICAgICAgICAgIC0+IDQvMjMvMjAxNlxuICogZGF0ZUxvbmcgICAgICAgICAtPiBBcHJpbCAyMywgMjAxNlxuICogZGF0ZUxvbmdNaW4gICAgICAtPiBBcHIgMjMsIDIwMTZcbiAqIGRhdGVUaW1lICAgICAgICAgLT4gQXByaWwgMjMsIDIwMTYgNjoyOCBBTVxuICogZGF0ZVRpbWVNaW4gICAgICAtPiBBcHIgMjMsIDIwMTYgNjoyOCBBTVxuICogZGF0ZVRpbWVMb25nICAgICAtPiBTYXR1cmRheSwgQXByaWwgMjMsIDIwMTYgNjoyOCBBTVxuICogZGF0ZVRpbWVMb25nTWluICAtPiBTYXQsIEFwciAyMywgMjAxNiA2OjI5IEFNXG4gKlxuICogQGNvcHlyaWdodCAyMDIyIFdpbnRlci5cbiAqIEBhdXRob3IgQmVuIFRob21zb24gPGdpdEBhbGZyZWlkby5jb20+XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lQ29udHJvbCBleHRlbmRzIFNub3dib2FyZC5QbHVnaW5CYXNlIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3QoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuc25vd2JvYXJkLmRhdGFDb25maWcodGhpcywgZWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5hcHBUaW1lem9uZSA9IHRoaXMuZ2V0QXBwVGltZXpvbmUoKTtcbiAgICAgICAgdGhpcy5iYWNrZW5kVGltZXpvbmUgPSB0aGlzLmdldEJhY2tlbmRUaW1lem9uZSgpO1xuICAgICAgICB0aGlzLmJhY2tlbmRMb2NhbGUgPSB0aGlzLmdldEJhY2tlbmRMb2NhbGUoKTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSB0aGlzLmdldEZvcm1hdCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb25maWcuZ2V0KCdkYXRldGltZScpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcImRhdGV0aW1lXCIgYXR0cmlidXRlIGlzIHJlcXVpcmVkIGZvciBhIERhdGVUaW1lIGNvbnRyb2wuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoaXMgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIGBkYXRhLWRhdGV0aW1lPVwiXCJgOiBUaGUgZGF0ZSBhbmQgdGltZSB0byBmb3JtYXQuIFRoaXMgaXMgcmVxdWlyZWQuXG4gICAgICogLSBgZGF0YS1mb3JtYXQ9XCJcImA6IFRoZSBmb3JtYXQgdG8gdXNlIGZvciB0aGUgZGF0ZSBhbmQgdGltZS4gU2VlIHRoZSBEYXRlVGltZUNvbnRyb2wgY2xhc3MgZG9jcyBmb3IgYXZhaWxhYmxlIGZvcm1hdHMuXG4gICAgICogLSBgZGF0YS1mb3JtYXQtYWxpYXM9XCJcImA6IEFuIGFsdGVybmF0ZSB3YXkgb2YgZGVmaW5pbmcgdGhlIGZvcm1hdCwgYnkgdXNpbmcgdGhlIGFsaWFzIGFzIG9wcG9zZWQgdG8gdGhlIGZvcm1hdCBjb2RlLlxuICAgICAqIC0gYGRhdGEtaWdub3JlLXRpbWV6b25lYDogSWYgc2V0LCB0aGUgdXNlciBhbmQgZGVmYXVsdCB0aW1lem9uZSB3aWxsIGJlIGlnbm9yZWQgYW5kIHNldCB0byBVVEMuXG4gICAgICogLSBgZGF0YS10aW1lLXNpbmNlYDogSWYgc2V0LCB0aGUgdGltZSB3aWxsIGJlIGRpc3BsYXllZCBhcyBhIHRpbWUgc2luY2UgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogLSBgZGF0YS10aW1lLXRlbnNlYDogSWYgc2V0LCB0aGUgdGltZSB3aWxsIGJlIGRpc3BsYXllZCBpbiBhIGZ1bGwgdGVuc2UgZm9ybWF0LlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBkZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGV0aW1lOiBudWxsLFxuICAgICAgICAgICAgZm9ybWF0OiAnY2NjIGZmJyxcbiAgICAgICAgICAgIGZvcm1hdEFsaWFzOiBudWxsLFxuICAgICAgICAgICAgaWdub3JlVGltZXpvbmU6IGZhbHNlLFxuICAgICAgICAgICAgdGltZVNpbmNlOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbWVUZW5zZTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZWxlbWVudCB3aXRoIHRoZSBmb3JtYXR0ZWQgZGF0ZSBhbmQgdGltZS5cbiAgICAgKi9cbiAgICB1cGRhdGVFbGVtZW50KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5nZXRGb3JtYXR0ZWRWYWx1ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZvcm1hdHRlZCBkYXRlIGFuZCB0aW1lLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRGb3JtYXR0ZWRWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgZGF0ZU9iaiA9IERhdGVUaW1lLmZyb21TUUwodGhpcy5jb25maWcuZ2V0KCdkYXRldGltZScpLCB7XG4gICAgICAgICAgICB6b25lOiB0aGlzLmFwcFRpbWV6b25lLFxuICAgICAgICB9KS5zZXRMb2NhbGUodGhpcy5iYWNrZW5kTG9jYWxlKS5zZXRab25lKHRoaXMuYmFja2VuZFRpbWV6b25lKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuZ2V0KCd0aW1lU2luY2UnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVPYmoudG9SZWxhdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5nZXQoJ3RpbWVUZW5zZScpKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrQWdvID0gRGF0ZVRpbWUubm93KCkubWludXMoeyB3ZWVrczogMSB9KTtcbiAgICAgICAgICAgIGlmICh3ZWVrQWdvIDwgZGF0ZU9iaikge1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0b29sdGlwIGZvciBmdWxsIGRhdGVcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIGRhdGVPYmoudG9Gb3JtYXQodGhpcy5mb3JtYXQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZScsICd0b29sdGlwJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZURhdGUgPSBkYXRlT2JqLnRvUmVsYXRpdmVDYWxlbmRhcih7IHVuaXQ6ICdkYXlzJyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVsYXRpdmVEYXRlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVsYXRpdmVEYXRlLnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlT2JqLnRvRm9ybWF0KHRoaXMuZm9ybWF0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWFwIG9mIGZvcm1hdCBhbGlhc2VzIHRvIHRoZWlyIGZvcm1hdCBjb2Rlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZm9ybWF0QWxpYXNlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpbWU6ICd0JyxcbiAgICAgICAgICAgIHRpbWVMb25nOiAndHQnLFxuICAgICAgICAgICAgZGF0ZTogJ0QnLFxuICAgICAgICAgICAgZGF0ZU1pbjogJ0QnLFxuICAgICAgICAgICAgZGF0ZUxvbmc6ICdEREQnLFxuICAgICAgICAgICAgZGF0ZUxvbmdNaW46ICdERCcsXG4gICAgICAgICAgICBkYXRlVGltZTogJ2ZmZicsXG4gICAgICAgICAgICBkYXRlVGltZU1pbjogJ2ZmJyxcbiAgICAgICAgICAgIGRhdGVUaW1lTG9uZzogJ2ZmZmYnLFxuICAgICAgICAgICAgZGF0ZVRpbWVMb25nTWluOiAnY2NjIGZmJyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjb25maWd1cmVkIGZvcm1hdCBmb3IgdGhpcyBkYXRlVGltZSBjb250cm9sLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRGb3JtYXQoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmdldCgnZm9ybWF0QWxpYXMnKVxuICAgICAgICAgICAgJiYgT2JqZWN0LmtleXModGhpcy5mb3JtYXRBbGlhc2VzKCkpLmluY2x1ZGVzKHRoaXMuY29uZmlnLmdldCgnZm9ybWF0QWxpYXMnKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRBbGlhc2VzKClbdGhpcy5jb25maWcuZ2V0KCdmb3JtYXRBbGlhcycpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXQoJ2Zvcm1hdCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFwcCBkZWZhdWx0IHRpbWV6b21lLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRBcHBUaW1lem9uZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldCgnaWdub3JlVGltZXpvbmUnKVxuICAgICAgICAgICAgPyAnVVRDJ1xuICAgICAgICAgICAgOiB0aGlzLmdldE1ldGFWYWx1ZSgnYXBwLXRpbWV6b25lJywgJ1VUQycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGJhY2tlbmQgdGltZXpvbmUsIHdoaWNoIGlzIHVzZXItY29uZmlndXJhYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRCYWNrZW5kVGltZXpvbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXQoJ2lnbm9yZVRpbWV6b25lJylcbiAgICAgICAgICAgID8gJ1VUQydcbiAgICAgICAgICAgIDogdGhpcy5nZXRNZXRhVmFsdWUoJ2JhY2tlbmQtdGltZXpvbmUnLCAnVVRDJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYmFja2VuZCBsb2NhbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldEJhY2tlbmRMb2NhbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1ldGFWYWx1ZSgnYmFja2VuZC1sb2NhbGUnLCAnZW4tVVMnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBmcm9tIGEgZ2l2ZW4gbWV0YSB0YWcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRNZXRhVmFsdWUobmFtZSwgZGVmYXVsdFZhbHVlID0gbnVsbCkge1xuICAgICAgICBjb25zdCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbWV0YVtuYW1lPVwiJHtuYW1lfVwiXWApO1xuXG4gICAgICAgIGlmICghbWV0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXRhLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xuICAgIH1cbn07XG4iLCIvKipcbiAqIFdpZGdldCBldmVudCBoYW5kbGVyLlxuICpcbiAqIEV4dGVuZHMgYSB3aWRnZXQgd2l0aCBldmVudCBoYW5kbGluZyBmdW5jdGlvbmFsaXR5LCBhbGxvd2luZyBmb3IgdGhlIHF1aWNrIGRlZmluaXRpb24gb2YgZXZlbnRzXG4gKiBhbmQgbGlzdGVuaW5nIGZvciBldmVudHMgb24gYSBzcGVjaWZpYyBpbnN0YW5jZSBvZiBhIHdpZGdldC5cbiAqXG4gKiBUaGlzIGlzIGEgY29tcGxlbWVudCB0byBTbm93Ym9hcmQncyBnbG9iYWwgZXZlbnRzIC0gdGhlc2UgZXZlbnRzIHdpbGwgc3RpbGwgZmlyZSBpbiBvcmRlciB0b1xuICogYWxsb3cgZXh0ZXJuYWwgY29kZSB0byBsaXN0ZW4gYW5kIGhhbmRsZSBldmVudHMuIExvY2FsIGV2ZW50cyBjYW4gY2FuY2VsIHRoZSBnbG9iYWwgZXZlbnQgKGFuZFxuICogZnVydGhlciBsb2NhbCBldmVudHMpIGJ5IHJldHVybmluZyBgZmFsc2VgIGZyb20gdGhlIGNhbGxiYWNrLlxuICpcbiAqIEBjb3B5cmlnaHQgMjAyMiBXaW50ZXIuXG4gKiBAYXV0aG9yIEJlbiBUaG9tc29uIDxnaXRAYWxmcmVpZG8uY29tPlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEhhbmRsZXIgZXh0ZW5kcyBTbm93Ym9hcmQuUGx1Z2luQmFzZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1BsdWdpbkJhc2V9IGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50UHJlZml4XG4gICAgICovXG4gICAgY29uc3RydWN0KGluc3RhbmNlLCBldmVudFByZWZpeCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UgaW5zdGFuY2VvZiBTbm93Ym9hcmQuUGx1Z2luQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnQgaGFuZGxpbmcgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBTbm93Ym9hcmQgY2xhc3Nlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV2ZW50UHJlZml4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IHByZWZpeCBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgIHRoaXMuZXZlbnRQcmVmaXggPSBldmVudFByZWZpeDtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBsaXN0ZW5lciBmb3IgYSB3aWRnZXQncyBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVyZWdpc3RlcnMgYSBsaXN0ZW5lciBmb3IgYSB3aWRnZXQncyBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgb2ZmKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcigocmVnaXN0ZXJlZEV2ZW50KSA9PiByZWdpc3RlcmVkRXZlbnQuZXZlbnQgIT09IGV2ZW50IHx8IHJlZ2lzdGVyZWRFdmVudC5jYWxsYmFjayAhPT0gY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGxpc3RlbmVyIGZvciBhIHdpZGdldCdzIGV2ZW50IHRoYXQgd2lsbCBvbmx5IGZpcmUgb25jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgb25jZShldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoLi4ucGFyYW1ldGVycykgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKC4uLnBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNwbGljZShsZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIGFuIGV2ZW50IG9uIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBMb2NhbCBldmVudHMgYXJlIGZpcmVkIGZpcnN0LCB0aGVuIGEgZ2xvYmFsIGV2ZW50IGlzIGZpcmVkIGFmdGVyd2FyZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtICB7Li4uYW55fSBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZmlyZShldmVudE5hbWUsIC4uLnBhcmFtZXRlcnMpIHtcbiAgICAgICAgLy8gRmlyZSBsb2NhbCBldmVudHMgZmlyc3RcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKChyZWdpc3RlcmVkRXZlbnQpID0+IHJlZ2lzdGVyZWRFdmVudC5ldmVudCA9PT0gZXZlbnROYW1lKTtcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuY2FsbGJhY2soLi4ucGFyYW1ldGVycykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc25vd2JvYXJkLmdsb2JhbEV2ZW50KGAke3RoaXMuZXZlbnRQcmVmaXh9LiR7ZXZlbnROYW1lfWAsIC4uLnBhcmFtZXRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYSBwcm9taXNlIGV2ZW50IG9uIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBMb2NhbCBldmVudHMgYXJlIGZpcmVkIGZpcnN0LCB0aGVuIGEgZ2xvYmFsIGV2ZW50IGlzIGZpcmVkIGFmdGVyd2FyZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtICB7Li4uYW55fSBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZmlyZVByb21pc2UoZXZlbnROYW1lLCAuLi5wYXJhbWV0ZXJzKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcigocmVnaXN0ZXJlZEV2ZW50KSA9PiByZWdpc3RlcmVkRXZlbnQuZXZlbnQgPT09IGV2ZW50TmFtZSk7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gZXZlbnRzLmZpbHRlcigoZXZlbnQpID0+IGV2ZW50ICE9PSBudWxsLCBldmVudHMubWFwKChldmVudCkgPT4gZXZlbnQuY2FsbGJhY2soLi4ucGFyYW1ldGVycykpKTtcblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNub3dib2FyZC5nbG9iYWxQcm9taXNlRXZlbnQoYCR7dGhpcy5ldmVudFByZWZpeH0uJHtldmVudE5hbWV9YCwgLi4ucGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQmFja2VuZCB3aWRnZXQgaGFuZGxlci5cbiAqXG4gKiBIYW5kbGVzIHRoZSBjcmVhdGlvbiBhbmQgZGlzcG9zYWwgb2Ygd2lkZ2V0cyBpbiB0aGUgQmFja2VuZC4gV2lkZ2V0cyBzaG91bGQgaW5jbHVkZSB0aGlzIGFzXG4gKiBhIGRlcGVuZGVuY3kgaW4gb3JkZXIgdG8gYmUgbG9hZGVkIGFuZCBpbml0aWFsaXNlZCBhZnRlciB0aGUgaGFuZGxlciwgaW4gb3JkZXIgdG8gY29ycmVjdGx5XG4gKiByZWdpc3Rlci5cbiAqXG4gKiBAY29weXJpZ2h0IDIwMjIgV2ludGVyLlxuICogQGF1dGhvciBCZW4gVGhvbXNvbiA8Z2l0QGFsZnJlaWRvLmNvbT5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lkZ2V0SGFuZGxlciBleHRlbmRzIFNub3dib2FyZC5TaW5nbGV0b24ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdCgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcmVkV2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge1xuICAgICAgICAgICAgbXV0YXRlOiAobXV0YXRpb25zKSA9PiB0aGlzLm9uTXV0YXRpb24obXV0YXRpb25zKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBsaXN0ZW5zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVhZHk6ICdvblJlYWR5JyxcbiAgICAgICAgICAgIHJlbmRlcjogJ29uUmVuZGVyJyxcbiAgICAgICAgICAgIGFqYXhVcGRhdGU6ICdvbkFqYXhVcGRhdGUnLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIHdpZGdldCBhcyBhIGdpdmVuIGRhdGEgY29udHJvbC5cbiAgICAgKlxuICAgICAqIFJlZ2lzdGVyaW5nIGEgd2lkZ2V0IHdpbGwgYWxsb3cgYW55IGVsZW1lbnQgdGhhdCBjb250YWlucyBhIFwiZGF0YS1jb250cm9sXCIgYXR0cmlidXRlIG1hdGNoaW5nXG4gICAgICogdGhlIGNvbnRyb2wgbmFtZSB0byBiZSBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBZb3UgbWF5IG9wdGlvbmFsbHkgcHJvdmlkZSBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFuIGluc3RhbmNlIG9mIHRoZSB3aWRnZXQgaXNcbiAgICAgKiBpbml0aWFsaXplZCAtIHRoZSBjYWxsYmFjayB3aWxsIGJlIHByb3ZpZGVkIHRoZSBlbGVtZW50IGFuZCB0aGUgd2lkZ2V0IGluc3RhbmNlIGFzIHBhcmFtZXRlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29udHJvbFxuICAgICAqIEBwYXJhbSB7U25vd2JvYXJkLlBsdWdpbkJhc2V9IHdpZGdldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY29udHJvbCwgd2lkZ2V0LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzLnB1c2goe1xuICAgICAgICAgICAgY29udHJvbCxcbiAgICAgICAgICAgIHdpZGdldCxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVycyBhIGRhdGEgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250cm9sXG4gICAgICovXG4gICAgdW5yZWdpc3Rlcihjb250cm9sKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFdpZGdldHMgPSB0aGlzLnJlZ2lzdGVyZWRXaWRnZXRzLmZpbHRlcigod2lkZ2V0KSA9PiB3aWRnZXQuY29udHJvbCAhPT0gY29udHJvbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhZHkgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEluaXRpYWxpemVzIHdpZGdldHMgd2l0aGluIHRoZSBlbnRpcmUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplV2lkZ2V0cyhkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICAvLyBSZWdpc3RlciBhIERPTSBvYnNlcnZlciBhbmQgd2F0Y2ggZm9yIGFueSByZW1vdmVkIG5vZGVzXG4gICAgICAgIGlmICghdGhpcy5vYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuZXZlbnRzLm11dGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEluaXRpYWxpemVzIHdpZGdldHMgd2l0aGluIHRoZSBlbnRpcmUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVdpZGdldHMoZG9jdW1lbnQuYm9keSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQUpBWCB1cGRhdGUgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEluaXRpYWxpemVzIHdpZGdldHMgaW5zaWRlIGFuIHVwZGF0ZSBlbGVtZW50IGZyb20gYW4gQUpBWCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBvbkFqYXhVcGRhdGUoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVXaWRnZXRzKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGFsbCB3aWRnZXRzIHdpdGhpbiBhbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogSWYgYW4gZWxlbWVudCBjb250YWlucyBhIFwiZGF0YS1jb250cm9sXCIgYXR0cmlidXRlIG1hdGNoaW5nIGEgcmVnaXN0ZXJlZCB3aWRnZXQsIHRoZSB3aWRnZXRcbiAgICAgKiBpcyBpbml0aWFsaXplZCBhbmQgYXR0YWNoZWQgdG8gdGhlIGVsZW1lbnQgYXMgYSBcIndpZGdldFwiIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogT25seSBvbmUgd2lkZ2V0IG1heSBiZSBpbml0aWFsaXplZCB0byBhIHBhcnRpY3VsYXIgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBpbml0aWFsaXplV2lkZ2V0cyhlbGVtZW50KSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFdpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvbnRyb2w9XCIke3dpZGdldC5jb250cm9sfVwiXTpub3QoW2RhdGEtd2lkZ2V0LWluaXRpYWxpemVkXSlgKTtcblxuICAgICAgICAgICAgaWYgKGluc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZXMuZm9yRWFjaCgoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBkb3VibGUtd2lkZ2V0IGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5kYXRhc2V0LndpZGdldEluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXRJbnN0YW5jZSA9IHRoaXMuc25vd2JvYXJkW3dpZGdldC53aWRnZXRdKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IHdpZGdldEluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuZGF0YXNldC53aWRnZXRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc25vd2JvYXJkLmdsb2JhbEV2ZW50KCdiYWNrZW5kLndpZGdldC5pbml0aWFsaXplZCcsIGluc3RhbmNlLCB3aWRnZXRJbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aWRnZXQuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5jYWxsYmFjayh3aWRnZXRJbnN0YW5jZSwgaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB3aWRnZXQgdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgZ2l2ZW4gZWxlbWVudCwgaWYgYW55LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtTbm93Ym9hcmQuUGx1Z2luQmFzZXxudWxsfVxuICAgICAqL1xuICAgIGdldFdpZGdldChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5lbGVtZW50cy5maW5kKCh3aWRnZXQpID0+IHdpZGdldC5lbGVtZW50ID09PSBlbGVtZW50KTtcblxuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZC5pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciBtdXRhdGlvbiBldmVudHMuXG4gICAgICpcbiAgICAgKiBXZSdyZSBvbmx5IHRyYWNraW5nIHJlbW92ZWQgbm9kZXMsIHRvIGVuc3VyZSB0aGF0IHRob3NlIHdpZGdldHMgYXJlIGRpc3Bvc2VkIG9mLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNdXRhdGlvblJlY29yZFtdfSBtdXRhdGlvbnNcbiAgICAgKi9cbiAgICBvbk11dGF0aW9uKG11dGF0aW9ucykge1xuICAgICAgICBjb25zdCByZW1vdmVkTm9kZXMgPSBtdXRhdGlvbnMuZmlsdGVyKChtdXRhdGlvbikgPT4gbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCkubWFwKChtdXRhdGlvbikgPT4gQXJyYXkuZnJvbShtdXRhdGlvbi5yZW1vdmVkTm9kZXMpKS5mbGF0KCk7XG4gICAgICAgIGlmICghcmVtb3ZlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldHMgPSB0aGlzLmVsZW1lbnRzLmZpbHRlcigod2lkZ2V0KSA9PiBub2RlLmNvbnRhaW5zKHdpZGdldC5lbGVtZW50KSk7XG4gICAgICAgICAgICBpZiAod2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3aWRnZXRzLmZvckVhY2goKHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXQuaW5zdGFuY2UuZGVzdHJ1Y3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuZWxlbWVudHMuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ICE9PSB3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiZGVsZWdhdGUiLCJIYW5kbGVyIiwicmVhZHkiLCJhamF4RmV0Y2hPcHRpb25zIiwiYWpheFVwZGF0ZUNvbXBsZXRlIiwid2luZG93IiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic25vd2JvYXJkIiwiZ2xvYmFsRXZlbnQiLCJ0cmlnZ2VyIiwiYWpheFByZWZpbHRlciIsIm9wdGlvbnMiLCJoYXNUb2tlbiIsImhlYWRlcnMiLCJnZXRUb2tlbiIsInRva2VuRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJTbm93Ym9hcmQiLCJTaW5nbGV0b24iLCJWdWUiLCJCYWNrZW5kQWpheEhhbmRsZXIiLCJCYWNrZW5kRGF0ZVRpbWVDb250cm9sIiwiQmFja2VuZFVpRXZlbnRIYW5kbGVyIiwiQmFja2VuZFVpV2lkZ2V0SGFuZGxlciIsInVuZGVmaW5lZCIsIkVycm9yIiwiYWRkUGx1Z2luIiwiYWRkUHJlZmlsdGVyIiwicmVnaXN0ZXIiLCJBc3NldE1hbmFnZXIiLCJsb2FkIiwiYXNzZXRzIiwiY2FsbGJhY2siLCJhc3NldExvYWRlciIsInRoZW4iLCJhc3NldE1hbmFnZXIiLCJEYXRlVGltZSIsIkRhdGVUaW1lQ29udHJvbCIsImVsZW1lbnQiLCJjb25maWciLCJkYXRhQ29uZmlnIiwiYXBwVGltZXpvbmUiLCJnZXRBcHBUaW1lem9uZSIsImJhY2tlbmRUaW1lem9uZSIsImdldEJhY2tlbmRUaW1lem9uZSIsImJhY2tlbmRMb2NhbGUiLCJnZXRCYWNrZW5kTG9jYWxlIiwiZm9ybWF0IiwiZ2V0Rm9ybWF0IiwiZ2V0IiwidXBkYXRlRWxlbWVudCIsImRhdGV0aW1lIiwiZm9ybWF0QWxpYXMiLCJpZ25vcmVUaW1lem9uZSIsInRpbWVTaW5jZSIsInRpbWVUZW5zZSIsImlubmVyVGV4dCIsImdldEZvcm1hdHRlZFZhbHVlIiwiZGF0ZU9iaiIsImZyb21TUUwiLCJ6b25lIiwic2V0TG9jYWxlIiwic2V0Wm9uZSIsInRvUmVsYXRpdmUiLCJ3ZWVrQWdvIiwibm93IiwibWludXMiLCJ3ZWVrcyIsInNldEF0dHJpYnV0ZSIsInRvRm9ybWF0IiwicmVsYXRpdmVEYXRlIiwidG9SZWxhdGl2ZUNhbGVuZGFyIiwidW5pdCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0aW1lIiwidGltZUxvbmciLCJkYXRlIiwiZGF0ZU1pbiIsImRhdGVMb25nIiwiZGF0ZUxvbmdNaW4iLCJkYXRlVGltZSIsImRhdGVUaW1lTWluIiwiZGF0ZVRpbWVMb25nIiwiZGF0ZVRpbWVMb25nTWluIiwiT2JqZWN0Iiwia2V5cyIsImZvcm1hdEFsaWFzZXMiLCJpbmNsdWRlcyIsImdldE1ldGFWYWx1ZSIsIm5hbWUiLCJkZWZhdWx0VmFsdWUiLCJtZXRhIiwiUGx1Z2luQmFzZSIsIkV2ZW50SGFuZGxlciIsImluc3RhbmNlIiwiZXZlbnRQcmVmaXgiLCJldmVudHMiLCJldmVudCIsInB1c2giLCJmaWx0ZXIiLCJyZWdpc3RlcmVkRXZlbnQiLCJsZW5ndGgiLCJzcGxpY2UiLCJldmVudE5hbWUiLCJwYXJhbWV0ZXJzIiwiY2FuY2VsbGVkIiwiZm9yRWFjaCIsInByb21pc2VzIiwibWFwIiwiUHJvbWlzZSIsImFsbCIsImdsb2JhbFByb21pc2VFdmVudCIsIldpZGdldEhhbmRsZXIiLCJyZWdpc3RlcmVkV2lkZ2V0cyIsImVsZW1lbnRzIiwibXV0YXRlIiwibXV0YXRpb25zIiwib25NdXRhdGlvbiIsIm9ic2VydmVyIiwicmVuZGVyIiwiYWpheFVwZGF0ZSIsImNvbnRyb2wiLCJ3aWRnZXQiLCJpbml0aWFsaXplV2lkZ2V0cyIsImJvZHkiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJpbnN0YW5jZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsIndpZGdldEluaXRpYWxpemVkIiwid2lkZ2V0SW5zdGFuY2UiLCJmb3VuZCIsImZpbmQiLCJyZW1vdmVkTm9kZXMiLCJtdXRhdGlvbiIsIkFycmF5IiwiZnJvbSIsImZsYXQiLCJub2RlIiwid2lkZ2V0cyIsImNvbnRhaW5zIiwiZGVzdHJ1Y3QiXSwic291cmNlUm9vdCI6IiJ9