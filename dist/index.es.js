import { useState, useRef, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */

var now = function () {
  return _root.Date.now();
};

var now_1 = now;

/** Built-in value references. */

var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol_1(value)) {
    return NAN;
  }

  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;

/** Error message constants. */

var FUNC_ERROR_TEXT = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber_1(wait) || 0;

  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now_1();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

/** Error message constants. */

var FUNC_ERROR_TEXT$1 = 'Expected a function';
/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */

function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  if (isObject_1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce_1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

var scrollLock = createCommonjsModule(function (module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    return (
      /******/
      function (modules) {
        // webpackBootstrap

        /******/
        // The module cache

        /******/
        var installedModules = {};
        /******/

        /******/
        // The require function

        /******/

        function __webpack_require__(moduleId) {
          /******/

          /******/
          // Check if module is in cache

          /******/
          if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
          }
          /******/
          // Create a new module (and put it into the cache)

          /******/


          var module = installedModules[moduleId] = {
            /******/
            i: moduleId,

            /******/
            l: false,

            /******/
            exports: {}
            /******/

          };
          /******/

          /******/
          // Execute the module function

          /******/

          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          /******/

          /******/
          // Flag the module as loaded

          /******/

          module.l = true;
          /******/

          /******/
          // Return the exports of the module

          /******/

          return module.exports;
          /******/
        }
        /******/

        /******/

        /******/
        // expose the modules object (__webpack_modules__)

        /******/


        __webpack_require__.m = modules;
        /******/

        /******/
        // expose the module cache

        /******/

        __webpack_require__.c = installedModules;
        /******/

        /******/
        // define getter function for harmony exports

        /******/

        __webpack_require__.d = function (exports, name, getter) {
          /******/
          if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
              enumerable: true,
              get: getter
            });
            /******/
          }
          /******/

        };
        /******/

        /******/
        // define __esModule on exports

        /******/


        __webpack_require__.r = function (exports) {
          /******/
          if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/
            Object.defineProperty(exports, Symbol.toStringTag, {
              value: 'Module'
            });
            /******/
          }
          /******/


          Object.defineProperty(exports, '__esModule', {
            value: true
          });
          /******/
        };
        /******/

        /******/
        // create a fake namespace object

        /******/
        // mode & 1: value is a module id, require it

        /******/
        // mode & 2: merge all properties of value into the ns

        /******/
        // mode & 4: return value when already ns object

        /******/
        // mode & 8|1: behave like require

        /******/


        __webpack_require__.t = function (value, mode) {
          /******/
          if (mode & 1) value = __webpack_require__(value);
          /******/

          if (mode & 8) return value;
          /******/

          if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
          /******/

          var ns = Object.create(null);
          /******/

          __webpack_require__.r(ns);
          /******/


          Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
          });
          /******/

          if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
          /******/

          return ns;
          /******/
        };
        /******/

        /******/
        // getDefaultExport function for compatibility with non-harmony modules

        /******/


        __webpack_require__.n = function (module) {
          /******/
          var getter = module && module.__esModule ?
          /******/
          function getDefault() {
            return module['default'];
          } :
          /******/
          function getModuleExports() {
            return module;
          };
          /******/

          __webpack_require__.d(getter, 'a', getter);
          /******/


          return getter;
          /******/
        };
        /******/

        /******/
        // Object.prototype.hasOwnProperty.call

        /******/


        __webpack_require__.o = function (object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/

        /******/
        // __webpack_public_path__

        /******/


        __webpack_require__.p = "";
        /******/

        /******/

        /******/
        // Load entry module and return exports

        /******/

        return __webpack_require__(__webpack_require__.s = 0);
        /******/
      }(
      /************************************************************************/

      /******/
      [
      /* 0 */

      /***/
      function (module, __webpack_exports__, __webpack_require__) {

        __webpack_require__.r(__webpack_exports__); // CONCATENATED MODULE: ./src/tools.js


        var argumentAsArray = function argumentAsArray(argument) {
          return Array.isArray(argument) ? argument : [argument];
        };

        var isElement = function isElement(target) {
          return target instanceof Node;
        };

        var isElementList = function isElementList(nodeList) {
          return nodeList instanceof NodeList;
        };

        var eachNode = function eachNode(nodeList, callback) {
          if (nodeList && callback) {
            nodeList = isElementList(nodeList) ? nodeList : [nodeList];

            for (var i = 0; i < nodeList.length; i++) {
              if (callback(nodeList[i], i, nodeList.length) === true) {
                break;
              }
            }
          }
        };

        var throwError = function throwError(message) {
          return console.error("[scroll-lock] ".concat(message));
        };

        var arrayAsSelector = function arrayAsSelector(array) {
          if (Array.isArray(array)) {
            var selector = array.join(', ');
            return selector;
          }
        };

        var nodeListAsArray = function nodeListAsArray(nodeList) {
          var nodes = [];
          eachNode(nodeList, function (node) {
            return nodes.push(node);
          });
          return nodes;
        };

        var findParentBySelector = function findParentBySelector($el, selector) {
          var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

          if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
            return $el;
          }

          while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {
          }

          return $el;
        };

        var elementHasSelector = function elementHasSelector($el, selector) {
          var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
          var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
          return has;
        };

        var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
          if ($el) {
            var computedStyle = getComputedStyle($el);
            var overflowIsHidden = computedStyle.overflow === 'hidden';
            return overflowIsHidden;
          }
        };

        var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
          if ($el) {
            if (elementHasOverflowHidden($el)) {
              return true;
            }

            var scrollTop = $el.scrollTop;
            return scrollTop <= 0;
          }
        };

        var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
          if ($el) {
            if (elementHasOverflowHidden($el)) {
              return true;
            }

            var scrollTop = $el.scrollTop;
            var scrollHeight = $el.scrollHeight;
            var scrollTopWithHeight = scrollTop + $el.offsetHeight;
            return scrollTopWithHeight >= scrollHeight;
          }
        };

        var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
          if ($el) {
            if (elementHasOverflowHidden($el)) {
              return true;
            }

            var scrollLeft = $el.scrollLeft;
            return scrollLeft <= 0;
          }
        };

        var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
          if ($el) {
            if (elementHasOverflowHidden($el)) {
              return true;
            }

            var scrollLeft = $el.scrollLeft;
            var scrollWidth = $el.scrollWidth;
            var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
            return scrollLeftWithWidth >= scrollWidth;
          }
        };

        var elementIsScrollableField = function elementIsScrollableField($el) {
          var selector = 'textarea, [contenteditable="true"]';
          return elementHasSelector($el, selector);
        };

        var elementIsInputRange = function elementIsInputRange($el) {
          var selector = 'input[type="range"]';
          return elementHasSelector($el, selector);
        }; // CONCATENATED MODULE: ./src/scroll-lock.js

        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "disablePageScroll", function () {
          return disablePageScroll;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "enablePageScroll", function () {
          return enablePageScroll;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getScrollState", function () {
          return getScrollState;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function () {
          return clearQueueScrollLocks;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function () {
          return scroll_lock_getTargetScrollBarWidth;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function () {
          return scroll_lock_getCurrentTargetScrollBarWidth;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function () {
          return getPageScrollBarWidth;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function () {
          return getCurrentPageScrollBarWidth;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function () {
          return scroll_lock_addScrollableTarget;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function () {
          return scroll_lock_removeScrollableTarget;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function () {
          return scroll_lock_addScrollableSelector;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function () {
          return scroll_lock_removeScrollableSelector;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "addLockableTarget", function () {
          return scroll_lock_addLockableTarget;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "addLockableSelector", function () {
          return scroll_lock_addLockableSelector;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function () {
          return scroll_lock_setFillGapMethod;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function () {
          return scroll_lock_addFillGapTarget;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function () {
          return scroll_lock_removeFillGapTarget;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function () {
          return scroll_lock_addFillGapSelector;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function () {
          return scroll_lock_removeFillGapSelector;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "refillGaps", function () {
          return refillGaps;
        });

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);

            if (typeof Object.getOwnPropertySymbols === 'function') {
              ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
              }));
            }

            ownKeys.forEach(function (key) {
              _defineProperty(target, key, source[key]);
            });
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
        var TOUCH_DIRECTION_DETECT_OFFSET = 3;
        var state = {
          scroll: true,
          queue: 0,
          scrollableSelectors: ['[data-scroll-lock-scrollable]'],
          lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
          fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
          fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
          //
          startTouchY: 0,
          startTouchX: 0
        };

        var disablePageScroll = function disablePageScroll(target) {
          if (state.queue <= 0) {
            state.scroll = false;
            scroll_lock_hideLockableOverflow();
            fillGaps();
          }

          scroll_lock_addScrollableTarget(target);
          state.queue++;
        };

        var enablePageScroll = function enablePageScroll(target) {
          state.queue > 0 && state.queue--;

          if (state.queue <= 0) {
            state.scroll = true;
            scroll_lock_showLockableOverflow();
            unfillGaps();
          }

          scroll_lock_removeScrollableTarget(target);
        };

        var getScrollState = function getScrollState() {
          return state.scroll;
        };

        var clearQueueScrollLocks = function clearQueueScrollLocks() {
          state.queue = 0;
        };

        var scroll_lock_getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
          var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (isElement($target)) {
            var currentOverflowYProperty = $target.style.overflowY;

            if (onlyExists) {
              if (!getScrollState()) {
                $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-overflow-y-property');
              }
            } else {
              $target.style.overflowY = 'scroll';
            }

            var width = scroll_lock_getCurrentTargetScrollBarWidth($target);
            $target.style.overflowY = currentOverflowYProperty;
            return width;
          } else {
            return 0;
          }
        };

        var scroll_lock_getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
          if (isElement($target)) {
            if ($target === document.body) {
              var documentWidth = document.documentElement.clientWidth;
              var windowWidth = window.innerWidth;
              var currentWidth = windowWidth - documentWidth;
              return currentWidth;
            } else {
              var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
              var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
              $target.style.borderLeftWidth = '0px';
              $target.style.borderRightWidth = '0px';

              var _currentWidth = $target.offsetWidth - $target.clientWidth;

              $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
              $target.style.borderRightWidth = borderRightWidthCurrentProperty;
              return _currentWidth;
            }
          } else {
            return 0;
          }
        };

        var getPageScrollBarWidth = function getPageScrollBarWidth() {
          var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          return scroll_lock_getTargetScrollBarWidth(document.body, onlyExists);
        };

        var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
          return scroll_lock_getCurrentTargetScrollBarWidth(document.body);
        };

        var scroll_lock_addScrollableTarget = function addScrollableTarget(target) {
          if (target) {
            var targets = argumentAsArray(target);
            targets.map(function ($targets) {
              eachNode($targets, function ($target) {
                if (isElement($target)) {
                  $target.setAttribute('data-scroll-lock-scrollable', '');
                } else {
                  throwError("\"".concat($target, "\" is not a Element."));
                }
              });
            });
          }
        };

        var scroll_lock_removeScrollableTarget = function removeScrollableTarget(target) {
          if (target) {
            var targets = argumentAsArray(target);
            targets.map(function ($targets) {
              eachNode($targets, function ($target) {
                if (isElement($target)) {
                  $target.removeAttribute('data-scroll-lock-scrollable');
                } else {
                  throwError("\"".concat($target, "\" is not a Element."));
                }
              });
            });
          }
        };

        var scroll_lock_addScrollableSelector = function addScrollableSelector(selector) {
          if (selector) {
            var selectors = argumentAsArray(selector);
            selectors.map(function (selector) {
              state.scrollableSelectors.push(selector);
            });
          }
        };

        var scroll_lock_removeScrollableSelector = function removeScrollableSelector(selector) {
          if (selector) {
            var selectors = argumentAsArray(selector);
            selectors.map(function (selector) {
              state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
                return sSelector !== selector;
              });
            });
          }
        };

        var scroll_lock_addLockableTarget = function addLockableTarget(target) {
          if (target) {
            var targets = argumentAsArray(target);
            targets.map(function ($targets) {
              eachNode($targets, function ($target) {
                if (isElement($target)) {
                  $target.setAttribute('data-scroll-lock-lockable', '');
                } else {
                  throwError("\"".concat($target, "\" is not a Element."));
                }
              });
            });

            if (!getScrollState()) {
              scroll_lock_hideLockableOverflow();
            }
          }
        };

        var scroll_lock_addLockableSelector = function addLockableSelector(selector) {
          if (selector) {
            var selectors = argumentAsArray(selector);
            selectors.map(function (selector) {
              state.lockableSelectors.push(selector);
            });

            if (!getScrollState()) {
              scroll_lock_hideLockableOverflow();
            }

            scroll_lock_addFillGapSelector(selector);
          }
        };

        var scroll_lock_setFillGapMethod = function setFillGapMethod(method) {
          if (method) {
            if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
              state.fillGapMethod = method;
              refillGaps();
            } else {
              var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
              throwError("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
            }
          }
        };

        var scroll_lock_addFillGapTarget = function addFillGapTarget(target) {
          if (target) {
            var targets = argumentAsArray(target);
            targets.map(function ($targets) {
              eachNode($targets, function ($target) {
                if (isElement($target)) {
                  $target.setAttribute('data-scroll-lock-fill-gap', '');

                  if (!state.scroll) {
                    scroll_lock_fillGapTarget($target);
                  }
                } else {
                  throwError("\"".concat($target, "\" is not a Element."));
                }
              });
            });
          }
        };

        var scroll_lock_removeFillGapTarget = function removeFillGapTarget(target) {
          if (target) {
            var targets = argumentAsArray(target);
            targets.map(function ($targets) {
              eachNode($targets, function ($target) {
                if (isElement($target)) {
                  $target.removeAttribute('data-scroll-lock-fill-gap');

                  if (!state.scroll) {
                    scroll_lock_unfillGapTarget($target);
                  }
                } else {
                  throwError("\"".concat($target, "\" is not a Element."));
                }
              });
            });
          }
        };

        var scroll_lock_addFillGapSelector = function addFillGapSelector(selector) {
          if (selector) {
            var selectors = argumentAsArray(selector);
            selectors.map(function (selector) {
              if (state.fillGapSelectors.indexOf(selector) === -1) {
                state.fillGapSelectors.push(selector);

                if (!state.scroll) {
                  scroll_lock_fillGapSelector(selector);
                }
              }
            });
          }
        };

        var scroll_lock_removeFillGapSelector = function removeFillGapSelector(selector) {
          if (selector) {
            var selectors = argumentAsArray(selector);
            selectors.map(function (selector) {
              state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
                return fSelector !== selector;
              });

              if (!state.scroll) {
                scroll_lock_unfillGapSelector(selector);
              }
            });
          }
        };

        var refillGaps = function refillGaps() {
          if (!state.scroll) {
            fillGaps();
          }
        };

        var scroll_lock_hideLockableOverflow = function hideLockableOverflow() {
          var selector = arrayAsSelector(state.lockableSelectors);
          scroll_lock_hideLockableOverflowSelector(selector);
        };

        var scroll_lock_showLockableOverflow = function showLockableOverflow() {
          var selector = arrayAsSelector(state.lockableSelectors);
          scroll_lock_showLockableOverflowSelector(selector);
        };

        var scroll_lock_hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
          var $targets = document.querySelectorAll(selector);
          eachNode($targets, function ($target) {
            scroll_lock_hideLockableOverflowTarget($target);
          });
        };

        var scroll_lock_showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
          var $targets = document.querySelectorAll(selector);
          eachNode($targets, function ($target) {
            scroll_lock_showLockableOverflowTarget($target);
          });
        };

        var scroll_lock_hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
          if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') !== 'true') {
            var computedStyle = window.getComputedStyle($target);
            $target.setAttribute('data-scroll-lock-saved-overflow-y-property', computedStyle.overflowY);
            $target.setAttribute('data-scroll-lock-saved-inline-overflow-property', $target.style.overflow);
            $target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property', $target.style.overflowY);
            $target.style.overflow = 'hidden';
            $target.setAttribute('data-scroll-lock-locked', 'true');
          }
        };

        var scroll_lock_showLockableOverflowTarget = function showLockableOverflowTarget($target) {
          if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') === 'true') {
            $target.style.overflow = $target.getAttribute('data-scroll-lock-saved-inline-overflow-property');
            $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');
            $target.removeAttribute('data-scroll-lock-saved-overflow-property');
            $target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
            $target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
            $target.removeAttribute('data-scroll-lock-locked');
          }
        };

        var fillGaps = function fillGaps() {
          state.fillGapSelectors.map(function (selector) {
            scroll_lock_fillGapSelector(selector);
          });
        };

        var unfillGaps = function unfillGaps() {
          state.fillGapSelectors.map(function (selector) {
            scroll_lock_unfillGapSelector(selector);
          });
        };

        var scroll_lock_fillGapSelector = function fillGapSelector(selector) {
          var $targets = document.querySelectorAll(selector);
          var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
          eachNode($targets, function ($target) {
            scroll_lock_fillGapTarget($target, isLockable);
          });
        };

        var scroll_lock_fillGapTarget = function fillGapTarget($target) {
          var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (isElement($target)) {
            var scrollBarWidth;

            if ($target.getAttribute('data-scroll-lock-lockable') === '' || isLockable) {
              scrollBarWidth = scroll_lock_getTargetScrollBarWidth($target, true);
            } else {
              var $lockableParent = findParentBySelector($target, arrayAsSelector(state.lockableSelectors));
              scrollBarWidth = scroll_lock_getTargetScrollBarWidth($lockableParent, true);
            }

            if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
              scroll_lock_unfillGapTarget($target);
            }

            var computedStyle = window.getComputedStyle($target);
            $target.setAttribute('data-scroll-lock-filled-gap', 'true');
            $target.setAttribute('data-scroll-lock-current-fill-gap-method', state.fillGapMethod);

            if (state.fillGapMethod === 'margin') {
              var currentMargin = parseFloat(computedStyle.marginRight);
              $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
            } else if (state.fillGapMethod === 'width') {
              $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
            } else if (state.fillGapMethod === 'max-width') {
              $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
            } else if (state.fillGapMethod === 'padding') {
              var currentPadding = parseFloat(computedStyle.paddingRight);
              $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
            }
          }
        };

        var scroll_lock_unfillGapSelector = function unfillGapSelector(selector) {
          var $targets = document.querySelectorAll(selector);
          eachNode($targets, function ($target) {
            scroll_lock_unfillGapTarget($target);
          });
        };

        var scroll_lock_unfillGapTarget = function unfillGapTarget($target) {
          if (isElement($target)) {
            if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
              var currentFillGapMethod = $target.getAttribute('data-scroll-lock-current-fill-gap-method');
              $target.removeAttribute('data-scroll-lock-filled-gap');
              $target.removeAttribute('data-scroll-lock-current-fill-gap-method');

              if (currentFillGapMethod === 'margin') {
                $target.style.marginRight = "";
              } else if (currentFillGapMethod === 'width') {
                $target.style.width = "";
              } else if (currentFillGapMethod === 'max-width') {
                $target.style.maxWidth = "";
              } else if (currentFillGapMethod === 'padding') {
                $target.style.paddingRight = "";
              }
            }
          }
        };

        var onResize = function onResize(e) {
          refillGaps();
        };

        var onTouchStart = function onTouchStart(e) {
          if (!state.scroll) {
            state.startTouchY = e.touches[0].clientY;
            state.startTouchX = e.touches[0].clientX;
          }
        };

        var scroll_lock_onTouchMove = function onTouchMove(e) {
          if (!state.scroll) {
            var startTouchY = state.startTouchY,
                startTouchX = state.startTouchX;
            var currentClientY = e.touches[0].clientY;
            var currentClientX = e.touches[0].clientX;

            if (e.touches.length < 2) {
              var selector = arrayAsSelector(state.scrollableSelectors);
              var direction = {
                up: startTouchY < currentClientY,
                down: startTouchY > currentClientY,
                left: startTouchX < currentClientX,
                right: startTouchX > currentClientX
              };
              var directionWithOffset = {
                up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
                down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
                left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
                right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
              };

              var handle = function handle($el) {
                var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                if ($el) {
                  var parentScrollableEl = findParentBySelector($el, selector, false);

                  if (elementIsInputRange($el)) {
                    return false;
                  }

                  if (skip || elementIsScrollableField($el) && findParentBySelector($el, selector) || elementHasSelector($el, selector)) {
                    var prevent = false;

                    if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
                      if (direction.up && elementScrollTopOnStart($el) || direction.down && elementScrollTopOnEnd($el)) {
                        prevent = true;
                      }
                    } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
                      if (direction.left && elementScrollLeftOnStart($el) || direction.right && elementScrollLeftOnEnd($el)) {
                        prevent = true;
                      }
                    } else if (directionWithOffset.up && elementScrollTopOnStart($el) || directionWithOffset.down && elementScrollTopOnEnd($el) || directionWithOffset.left && elementScrollLeftOnStart($el) || directionWithOffset.right && elementScrollLeftOnEnd($el)) {
                      prevent = true;
                    }

                    if (prevent) {
                      if (parentScrollableEl) {
                        handle(parentScrollableEl, true);
                      } else {
                        e.preventDefault();
                      }
                    }
                  } else {
                    handle(parentScrollableEl);
                  }
                } else {
                  e.preventDefault();
                }
              };

              handle(e.target);
            }
          }
        };

        var onTouchEnd = function onTouchEnd(e) {
          if (!state.scroll) {
            state.startTouchY = 0;
            state.startTouchX = 0;
          }
        };

        if (typeof window !== 'undefined') {
          window.addEventListener('resize', onResize);
        }

        if (typeof document !== 'undefined') {
          document.addEventListener('touchstart', onTouchStart);
          document.addEventListener('touchmove', scroll_lock_onTouchMove, {
            passive: false
          });
          document.addEventListener('touchend', onTouchEnd);
        }

        var deprecatedMethods = {
          hide: function hide(target) {
            throwError('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
            disablePageScroll(target);
          },
          show: function show(target) {
            throwError('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
            enablePageScroll(target);
          },
          toggle: function toggle(target) {
            throwError('"toggle" is deprecated! Do not use it.');

            if (getScrollState()) {
              disablePageScroll();
            } else {
              enablePageScroll(target);
            }
          },
          getState: function getState() {
            throwError('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
            return getScrollState();
          },
          getWidth: function getWidth() {
            throwError('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
            return getPageScrollBarWidth();
          },
          getCurrentWidth: function getCurrentWidth() {
            throwError('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
            return getCurrentPageScrollBarWidth();
          },
          setScrollableTargets: function setScrollableTargets(target) {
            throwError('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
            scroll_lock_addScrollableTarget(target);
          },
          setFillGapSelectors: function setFillGapSelectors(selector) {
            throwError('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
            scroll_lock_addFillGapSelector(selector);
          },
          setFillGapTargets: function setFillGapTargets(target) {
            throwError('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
            scroll_lock_addFillGapTarget(target);
          },
          clearQueue: function clearQueue() {
            throwError('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
            clearQueueScrollLocks();
          }
        };

        var scrollLock = _objectSpread({
          disablePageScroll: disablePageScroll,
          enablePageScroll: enablePageScroll,
          getScrollState: getScrollState,
          clearQueueScrollLocks: clearQueueScrollLocks,
          getTargetScrollBarWidth: scroll_lock_getTargetScrollBarWidth,
          getCurrentTargetScrollBarWidth: scroll_lock_getCurrentTargetScrollBarWidth,
          getPageScrollBarWidth: getPageScrollBarWidth,
          getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
          addScrollableSelector: scroll_lock_addScrollableSelector,
          removeScrollableSelector: scroll_lock_removeScrollableSelector,
          addScrollableTarget: scroll_lock_addScrollableTarget,
          removeScrollableTarget: scroll_lock_removeScrollableTarget,
          addLockableSelector: scroll_lock_addLockableSelector,
          addLockableTarget: scroll_lock_addLockableTarget,
          addFillGapSelector: scroll_lock_addFillGapSelector,
          removeFillGapSelector: scroll_lock_removeFillGapSelector,
          addFillGapTarget: scroll_lock_addFillGapTarget,
          removeFillGapTarget: scroll_lock_removeFillGapTarget,
          setFillGapMethod: scroll_lock_setFillGapMethod,
          refillGaps: refillGaps,
          _state: state
        }, deprecatedMethods);
        /* harmony default export */


        var scroll_lock = __webpack_exports__["default"] = scrollLock;
        /***/
      }
      /******/
      ])["default"]
    );
  });
});
var scrollLock$1 = unwrapExports(scrollLock);

var enablePageScroll = scrollLock$1.enablePageScroll, disablePageScroll = scrollLock$1.disablePageScroll;
var INITIAL_STATE = {
    x: 0,
    y: 0,
    state: 'done'
};
var win = process.browser ? window || null : null;
var getAbsolutePosFunc = function (element) { return function (position) {
    return ((win !== null && win !== void 0 ? win : window)["scroll" + position.toUpperCase()] +
        element.getBoundingClientRect()[position]);
}; };
var useSwipe = function (target, options) {
    var _a, _b;
    var _c = options || {}, _d = _c.scope, scope = _d === void 0 ? {} : _d, _e = _c.fps, fps = _e === void 0 ? 60 : _e, ignoreElement = _c.ignoreElement;
    var ms = 1000 / fps;
    var _f = useState(INITIAL_STATE), swipeState = _f[0], setSwipeState = _f[1];
    var targetRef = useRef(null);
    var startPositionRef = useRef([0, 0]);
    var blocking = false;
    var element = targetRef.current;
    var effectDependencies = __spreadArrays([
        element,
        ignoreElement
    ], ((_a = scope === null || scope === void 0 ? void 0 : scope.x) !== null && _a !== void 0 ? _a : []), ((_b = scope === null || scope === void 0 ? void 0 : scope.y) !== null && _b !== void 0 ? _b : []));
    var onTouchMove = useCallback(function (_a) {
        var targetTouches = _a.targetTouches;
        if (blocking)
            return;
        var _b = targetTouches[0], screenY = _b.screenY, screenX = _b.screenX;
        var _c = startPositionRef.current, startY = _c[0], startX = _c[1];
        setSwipeState({
            x: screenX - startX,
            y: screenY - startY,
            state: 'move'
        });
    }, effectDependencies);
    var throttledOnTouchMove = useMemo(function () { return throttle_1(onTouchMove, ms); }, [onTouchMove, ms]);
    var onTouchStart = useCallback(function (_a) {
        var targetTouches = _a.targetTouches, target = _a.target;
        var _b = targetTouches[0], screenY = _b.screenY, screenX = _b.screenX, clientY = _b.clientY, clientX = _b.clientX;
        if (ignoreElement) {
            var ignoreEl = typeof ignoreElement === 'string'
                ? element.querySelector(ignoreElement)
                : ignoreElement;
            if (ignoreEl && (ignoreEl === target || ignoreEl.contains(target))) {
                return;
            }
        }
        if (scope === null || scope === void 0 ? void 0 : scope.x) {
            var _c = scope.x, _d = _c === void 0 ? [0, 0] : _c, scopeStart = _d[0], scopeEnd = _d[1];
            var getAbsolutePos = getAbsolutePosFunc(element);
            var touchedPositionInElement = clientX - getAbsolutePos('x');
            if (touchedPositionInElement < scopeStart) {
                return;
            }
            if (touchedPositionInElement > scopeEnd) {
                return;
            }
        }
        if (scope === null || scope === void 0 ? void 0 : scope.y) {
            var _e = scope.y, _f = _e === void 0 ? [0, 0] : _e, scopeStart = _f[0], scopeEnd = _f[1];
            var getAbsolutePos = getAbsolutePosFunc(element);
            var touchedPositionInElement = clientY - getAbsolutePos('y');
            if (touchedPositionInElement < scopeStart) {
                return;
            }
            if (touchedPositionInElement > scopeEnd) {
                return;
            }
        }
        startPositionRef.current = [screenY, screenX];
        disablePageScroll(document.body);
        blocking = false;
        element.addEventListener('touchmove', throttledOnTouchMove, { passive: true });
    }, __spreadArrays(effectDependencies, [throttledOnTouchMove]));
    var throttledOnTouchStart = useMemo(function () { return throttle_1(onTouchStart, ms); }, [onTouchStart, ms]);
    var onTouchEnd = useCallback(function () {
        blocking = true;
        startPositionRef.current = [0, 0];
        setSwipeState(INITIAL_STATE);
        enablePageScroll(document.body);
        element.removeEventListener('touchmove', throttledOnTouchMove);
    }, __spreadArrays(effectDependencies, [throttledOnTouchStart, throttledOnTouchMove]));
    var removeEventListenerBundle = useCallback(function () {
        if (element) {
            element.removeEventListener('touchstart', throttledOnTouchStart);
            element.removeEventListener('touchmove', throttledOnTouchMove);
            element.removeEventListener('touchend', onTouchEnd);
        }
        enablePageScroll(document.body);
    }, __spreadArrays(effectDependencies, [throttledOnTouchStart, throttledOnTouchMove, onTouchEnd]));
    useEffect(function () {
        if (element) {
            element.addEventListener('touchstart', throttledOnTouchStart, { passive: true });
            element.addEventListener('touchend', onTouchEnd, { passive: true });
            return function () { return removeEventListenerBundle(); };
        }
    }, __spreadArrays(effectDependencies, [throttledOnTouchStart, onTouchEnd, removeEventListenerBundle]));
    useLayoutEffect(function () {
        targetRef.current =
            target && ('current' in target ? target.current : target);
    }, [target]);
    return useMemo(function () { return swipeState; }, [swipeState.x, swipeState.y]);
};

export default useSwipe;
//# sourceMappingURL=index.es.js.map
