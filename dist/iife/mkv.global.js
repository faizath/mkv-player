var mkvjs = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/process-nextick-args/index.js
  var require_process_nextick_args = __commonJS({
    "node_modules/process-nextick-args/index.js"(exports, module) {
      "use strict";
      if (!process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
        module.exports = nextTick;
      } else {
        module.exports = process.nextTick;
      }
      function nextTick(fn, arg1, arg2, arg3) {
        if (typeof fn !== "function") {
          throw new TypeError('"callback" argument must be a function');
        }
        var len = arguments.length;
        var args, i;
        switch (len) {
          case 0:
          case 1:
            return process.nextTick(fn);
          case 2:
            return process.nextTick(function afterTickOne() {
              fn.call(null, arg1);
            });
          case 3:
            return process.nextTick(function afterTickTwo() {
              fn.call(null, arg1, arg2);
            });
          case 4:
            return process.nextTick(function afterTickThree() {
              fn.call(null, arg1, arg2, arg3);
            });
          default:
            args = new Array(len - 1);
            i = 0;
            while (i < args.length) {
              args[i++] = arguments[i];
            }
            return process.nextTick(function afterTick() {
              fn.apply(null, args);
            });
        }
      }
    }
  });

  // node_modules/isarray/index.js
  var require_isarray = __commonJS({
    "node_modules/isarray/index.js"(exports, module) {
      var toString = {}.toString;
      module.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/readable-stream/lib/internal/streams/stream-browser.js
  var require_stream_browser = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports, module) {
      module.exports = require_events().EventEmitter;
    }
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer2;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer2.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes3 = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes3.length - 1; i += 2) {
          res += String.fromCharCode(bytes3[i] + bytes3[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes3 = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          const len = bytes3.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes3[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes3 = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes3.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes3.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes3.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes3.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes3.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes3.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes3.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes3.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes3;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/buffer-shims/index.js
  var require_buffer_shims = __commonJS({
    "node_modules/buffer-shims/index.js"(exports) {
      "use strict";
      var buffer = require_buffer();
      var Buffer2 = buffer.Buffer;
      var SlowBuffer = buffer.SlowBuffer;
      var MAX_LEN = buffer.kMaxLength || 2147483647;
      exports.alloc = function alloc(size, fill, encoding) {
        if (typeof Buffer2.alloc === "function") {
          return Buffer2.alloc(size, fill, encoding);
        }
        if (typeof encoding === "number") {
          throw new TypeError("encoding must not be number");
        }
        if (typeof size !== "number") {
          throw new TypeError("size must be a number");
        }
        if (size > MAX_LEN) {
          throw new RangeError("size is too large");
        }
        var enc = encoding;
        var _fill = fill;
        if (_fill === void 0) {
          enc = void 0;
          _fill = 0;
        }
        var buf = new Buffer2(size);
        if (typeof _fill === "string") {
          var fillBuf = new Buffer2(_fill, enc);
          var flen = fillBuf.length;
          var i = -1;
          while (++i < size) {
            buf[i] = fillBuf[i % flen];
          }
        } else {
          buf.fill(_fill);
        }
        return buf;
      };
      exports.allocUnsafe = function allocUnsafe(size) {
        if (typeof Buffer2.allocUnsafe === "function") {
          return Buffer2.allocUnsafe(size);
        }
        if (typeof size !== "number") {
          throw new TypeError("size must be a number");
        }
        if (size > MAX_LEN) {
          throw new RangeError("size is too large");
        }
        return new Buffer2(size);
      };
      exports.from = function from(value, encodingOrOffset, length) {
        if (typeof Buffer2.from === "function" && (!global.Uint8Array || Uint8Array.from !== Buffer2.from)) {
          return Buffer2.from(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError('"value" argument must not be a number');
        }
        if (typeof value === "string") {
          return new Buffer2(value, encodingOrOffset);
        }
        if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
          var offset = encodingOrOffset;
          if (arguments.length === 1) {
            return new Buffer2(value);
          }
          if (typeof offset === "undefined") {
            offset = 0;
          }
          var len = length;
          if (typeof len === "undefined") {
            len = value.byteLength - offset;
          }
          if (offset >= value.byteLength) {
            throw new RangeError("'offset' is out of bounds");
          }
          if (len > value.byteLength - offset) {
            throw new RangeError("'length' is out of bounds");
          }
          return new Buffer2(value.slice(offset, offset + len));
        }
        if (Buffer2.isBuffer(value)) {
          var out = new Buffer2(value.length);
          value.copy(out, 0, 0, value.length);
          return out;
        }
        if (value) {
          if (Array.isArray(value) || typeof ArrayBuffer !== "undefined" && value.buffer instanceof ArrayBuffer || "length" in value) {
            return new Buffer2(value);
          }
          if (value.type === "Buffer" && Array.isArray(value.data)) {
            return new Buffer2(value.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      };
      exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
        if (typeof Buffer2.allocUnsafeSlow === "function") {
          return Buffer2.allocUnsafeSlow(size);
        }
        if (typeof size !== "number") {
          throw new TypeError("size must be a number");
        }
        if (size >= MAX_LEN) {
          throw new RangeError("size is too large");
        }
        return new SlowBuffer(size);
      };
    }
  });

  // node_modules/core-util-is/lib/util.js
  var require_util = __commonJS({
    "node_modules/core-util-is/lib/util.js"(exports) {
      function isArray(arg) {
        if (Array.isArray) {
          return Array.isArray(arg);
        }
        return objectToString(arg) === "[object Array]";
      }
      exports.isArray = isArray;
      function isBoolean(arg) {
        return typeof arg === "boolean";
      }
      exports.isBoolean = isBoolean;
      function isNull(arg) {
        return arg === null;
      }
      exports.isNull = isNull;
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isNumber(arg) {
        return typeof arg === "number";
      }
      exports.isNumber = isNumber;
      function isString(arg) {
        return typeof arg === "string";
      }
      exports.isString = isString;
      function isSymbol(arg) {
        return typeof arg === "symbol";
      }
      exports.isSymbol = isSymbol;
      function isUndefined(arg) {
        return arg === void 0;
      }
      exports.isUndefined = isUndefined;
      function isRegExp(re) {
        return objectToString(re) === "[object RegExp]";
      }
      exports.isRegExp = isRegExp;
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      exports.isObject = isObject;
      function isDate(d) {
        return objectToString(d) === "[object Date]";
      }
      exports.isDate = isDate;
      function isError(e) {
        return objectToString(e) === "[object Error]" || e instanceof Error;
      }
      exports.isError = isError;
      function isFunction(arg) {
        return typeof arg === "function";
      }
      exports.isFunction = isFunction;
      function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
        typeof arg === "undefined";
      }
      exports.isPrimitive = isPrimitive;
      exports.isBuffer = Buffer.isBuffer;
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = /* @__PURE__ */ Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "node_modules/has-tostringtag/shams.js"(exports, module) {
      "use strict";
      var hasSymbols = require_shams();
      module.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // node_modules/es-object-atoms/index.js
  var require_es_object_atoms = __commonJS({
    "node_modules/es-object-atoms/index.js"(exports, module) {
      "use strict";
      module.exports = Object;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js"(exports, module) {
      "use strict";
      module.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js"(exports, module) {
      "use strict";
      module.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js"(exports, module) {
      "use strict";
      module.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js"(exports, module) {
      "use strict";
      module.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js"(exports, module) {
      "use strict";
      module.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js"(exports, module) {
      "use strict";
      module.exports = TypeError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js"(exports, module) {
      "use strict";
      module.exports = URIError;
    }
  });

  // node_modules/math-intrinsics/abs.js
  var require_abs = __commonJS({
    "node_modules/math-intrinsics/abs.js"(exports, module) {
      "use strict";
      module.exports = Math.abs;
    }
  });

  // node_modules/math-intrinsics/floor.js
  var require_floor = __commonJS({
    "node_modules/math-intrinsics/floor.js"(exports, module) {
      "use strict";
      module.exports = Math.floor;
    }
  });

  // node_modules/math-intrinsics/max.js
  var require_max = __commonJS({
    "node_modules/math-intrinsics/max.js"(exports, module) {
      "use strict";
      module.exports = Math.max;
    }
  });

  // node_modules/math-intrinsics/min.js
  var require_min = __commonJS({
    "node_modules/math-intrinsics/min.js"(exports, module) {
      "use strict";
      module.exports = Math.min;
    }
  });

  // node_modules/math-intrinsics/pow.js
  var require_pow = __commonJS({
    "node_modules/math-intrinsics/pow.js"(exports, module) {
      "use strict";
      module.exports = Math.pow;
    }
  });

  // node_modules/math-intrinsics/round.js
  var require_round = __commonJS({
    "node_modules/math-intrinsics/round.js"(exports, module) {
      "use strict";
      module.exports = Math.round;
    }
  });

  // node_modules/math-intrinsics/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/math-intrinsics/isNaN.js"(exports, module) {
      "use strict";
      module.exports = Number.isNaN || function isNaN2(a) {
        return a !== a;
      };
    }
  });

  // node_modules/math-intrinsics/sign.js
  var require_sign = __commonJS({
    "node_modules/math-intrinsics/sign.js"(exports, module) {
      "use strict";
      var $isNaN = require_isNaN();
      module.exports = function sign(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
    }
  });

  // node_modules/gopd/gOPD.js
  var require_gOPD = __commonJS({
    "node_modules/gopd/gOPD.js"(exports, module) {
      "use strict";
      module.exports = Object.getOwnPropertyDescriptor;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js"(exports, module) {
      "use strict";
      var $gOPD = require_gOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module.exports = $gOPD;
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = false;
        }
      }
      module.exports = $defineProperty;
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/get-proto/Reflect.getPrototypeOf.js
  var require_Reflect_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
    }
  });

  // node_modules/get-proto/Object.getPrototypeOf.js
  var require_Object_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
      "use strict";
      var $Object = require_es_object_atoms();
      module.exports = $Object.getPrototypeOf || null;
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports, module) {
      "use strict";
      var implementation = require_implementation();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/call-bind-apply-helpers/functionCall.js
  var require_functionCall = __commonJS({
    "node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
      "use strict";
      module.exports = Function.prototype.call;
    }
  });

  // node_modules/call-bind-apply-helpers/functionApply.js
  var require_functionApply = __commonJS({
    "node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
      "use strict";
      module.exports = Function.prototype.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/reflectApply.js
  var require_reflectApply = __commonJS({
    "node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/actualApply.js
  var require_actualApply = __commonJS({
    "node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var $reflectApply = require_reflectApply();
      module.exports = $reflectApply || bind.call($call, $apply);
    }
  });

  // node_modules/call-bind-apply-helpers/index.js
  var require_call_bind_apply_helpers = __commonJS({
    "node_modules/call-bind-apply-helpers/index.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $TypeError = require_type();
      var $call = require_functionCall();
      var $actualApply = require_actualApply();
      module.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind, $call, args);
      };
    }
  });

  // node_modules/dunder-proto/get.js
  var require_get = __commonJS({
    "node_modules/dunder-proto/get.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind_apply_helpers();
      var gOPD = require_gopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
          throw e;
        }
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
    }
  });

  // node_modules/get-proto/index.js
  var require_get_proto = __commonJS({
    "node_modules/get-proto/index.js"(exports, module) {
      "use strict";
      var reflectGetProto = require_Reflect_getPrototypeOf();
      var originalGetProto = require_Object_getPrototypeOf();
      var getDunderProto = require_get();
      module.exports = reflectGetProto ? function getProto(O) {
        return reflectGetProto(O);
      } : originalGetProto ? function getProto(O) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O);
      } : getDunderProto ? function getProto(O) {
        return getDunderProto(O);
      } : null;
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js"(exports, module) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require_function_bind();
      module.exports = bind.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports, module) {
      "use strict";
      var undefined2;
      var $Object = require_es_object_atoms();
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var abs = require_abs();
      var floor = require_floor();
      var max = require_max();
      var min = require_min();
      var pow = require_pow();
      var round = require_round();
      var sign = require_sign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = require_gopd();
      var $defineProperty = require_es_define_property();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? (function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      })() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = require_get_proto();
      var $ObjectGPO = require_Object_getPrototypeOf();
      var $ReflectGPO = require_Reflect_getPrototypeOf();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max,
        "%Math.min%": min,
        "%Math.pow%": pow,
        "%Math.round%": round,
        "%Math.sign%": sign,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void undefined2;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bound/index.js
  var require_call_bound = __commonJS({
    "node_modules/call-bound/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBindBasic = require_call_bind_apply_helpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
    }
  });

  // node_modules/is-arguments/index.js
  var require_is_arguments = __commonJS({
    "node_modules/is-arguments/index.js"(exports, module) {
      "use strict";
      var hasToStringTag = require_shams2()();
      var callBound = require_call_bound();
      var $toString = callBound("Object.prototype.toString");
      var isStandardArguments = function isArguments(value) {
        if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
          return false;
        }
        return $toString(value) === "[object Arguments]";
      };
      var isLegacyArguments = function isArguments(value) {
        if (isStandardArguments(value)) {
          return true;
        }
        return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
      };
      var supportsStandardArguments = (function() {
        return isStandardArguments(arguments);
      })();
      isStandardArguments.isLegacyArguments = isLegacyArguments;
      module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    }
  });

  // node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "node_modules/is-regex/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var hasToStringTag = require_shams2()();
      var hasOwn = require_hasown();
      var gOPD = require_gopd();
      var fn;
      if (hasToStringTag) {
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
        fn = function isRegex(value) {
          if (!value || typeof value !== "object") {
            return false;
          }
          var descriptor = (
            /** @type {NonNullable<typeof gOPD>} */
            gOPD(
              /** @type {{ lastIndex?: unknown }} */
              value,
              "lastIndex"
            )
          );
          var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
          if (!hasLastIndexDataProperty) {
            return false;
          }
          try {
            $exec(
              value,
              /** @type {string} */
              /** @type {unknown} */
              badStringifier
            );
          } catch (e) {
            return e === isRegexMarker;
          }
        };
      } else {
        $toString = callBound("Object.prototype.toString");
        regexClass = "[object RegExp]";
        fn = function isRegex(value) {
          if (!value || typeof value !== "object" && typeof value !== "function") {
            return false;
          }
          return $toString(value) === regexClass;
        };
      }
      var $exec;
      var isRegexMarker;
      var throwRegexMarker;
      var badStringifier;
      var $toString;
      var regexClass;
      module.exports = fn;
    }
  });

  // node_modules/safe-regex-test/index.js
  var require_safe_regex_test = __commonJS({
    "node_modules/safe-regex-test/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var isRegex = require_is_regex();
      var $exec = callBound("RegExp.prototype.exec");
      var $TypeError = require_type();
      module.exports = function regexTester(regex) {
        if (!isRegex(regex)) {
          throw new $TypeError("`regex` must be a RegExp");
        }
        return function test(s) {
          return $exec(regex, s) !== null;
        };
      };
    }
  });

  // node_modules/generator-function/index.js
  var require_generator_function = __commonJS({
    "node_modules/generator-function/index.js"(exports, module) {
      "use strict";
      var cached = (
        /** @type {GeneratorFunctionConstructor} */
        function* () {
        }.constructor
      );
      module.exports = () => cached;
    }
  });

  // node_modules/is-generator-function/index.js
  var require_is_generator_function = __commonJS({
    "node_modules/is-generator-function/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var safeRegexTest = require_safe_regex_test();
      var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
      var hasToStringTag = require_shams2()();
      var getProto = require_get_proto();
      var toStr = callBound("Object.prototype.toString");
      var fnToStr = callBound("Function.prototype.toString");
      var getGeneratorFunction = require_generator_function();
      module.exports = function isGeneratorFunction(fn) {
        if (typeof fn !== "function") {
          return false;
        }
        if (isFnRegex(fnToStr(fn))) {
          return true;
        }
        if (!hasToStringTag) {
          var str = toStr(fn);
          return str === "[object GeneratorFunction]";
        }
        if (!getProto) {
          return false;
        }
        var GeneratorFunction = getGeneratorFunction();
        return GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;
      };
    }
  });

  // node_modules/is-callable/index.js
  var require_is_callable = __commonJS({
    "node_modules/is-callable/index.js"(exports, module) {
      "use strict";
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_) {
          if (_ !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        all = document.all;
        if (toStr.call(all) === toStr.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e) {
              }
            }
            return false;
          };
        }
      }
      var all;
      module.exports = reflectApply ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e) {
          if (e !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }
  });

  // node_modules/for-each/index.js
  var require_for_each = __commonJS({
    "node_modules/for-each/index.js"(exports, module) {
      "use strict";
      var isCallable = require_is_callable();
      var toStr = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
              iterator(array[i], i, array);
            } else {
              iterator.call(receiver, array[i], i, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i = 0, len = string.length; i < len; i++) {
          if (receiver == null) {
            iterator(string.charAt(i), i, string);
          } else {
            iterator.call(receiver, string.charAt(i), i, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k in object) {
          if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
              iterator(object[k], k, object);
            } else {
              iterator.call(receiver, object[k], k, object);
            }
          }
        }
      };
      function isArray(x) {
        return toStr.call(x) === "[object Array]";
      }
      module.exports = function forEach(list, iterator, thisArg) {
        if (!isCallable(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (isArray(list)) {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
    }
  });

  // node_modules/possible-typed-array-names/index.js
  var require_possible_typed_array_names = __commonJS({
    "node_modules/possible-typed-array-names/index.js"(exports, module) {
      "use strict";
      module.exports = [
        "Float16Array",
        "Float32Array",
        "Float64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigInt64Array",
        "BigUint64Array"
      ];
    }
  });

  // node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS({
    "node_modules/available-typed-arrays/index.js"(exports, module) {
      "use strict";
      var possibleNames = require_possible_typed_array_names();
      var g = typeof globalThis === "undefined" ? global : globalThis;
      module.exports = function availableTypedArrays() {
        var out = [];
        for (var i = 0; i < possibleNames.length; i++) {
          if (typeof g[possibleNames[i]] === "function") {
            out[out.length] = possibleNames[i];
          }
        }
        return out;
      };
    }
  });

  // node_modules/define-data-property/index.js
  var require_define_data_property = __commonJS({
    "node_modules/define-data-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var gopd = require_gopd();
      module.exports = function defineDataProperty(obj, property, value) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new $TypeError("`obj` must be an object or a function`");
        }
        if (typeof property !== "string" && typeof property !== "symbol") {
          throw new $TypeError("`property` must be a string or a symbol`");
        }
        if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
          throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
          throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
          throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
          throw new $TypeError("`loose`, if provided, must be a boolean");
        }
        var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
        var nonWritable = arguments.length > 4 ? arguments[4] : null;
        var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
        var loose = arguments.length > 6 ? arguments[6] : false;
        var desc = !!gopd && gopd(obj, property);
        if ($defineProperty) {
          $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
          });
        } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
          obj[property] = value;
        } else {
          throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
        }
      };
    }
  });

  // node_modules/has-property-descriptors/index.js
  var require_has_property_descriptors = __commonJS({
    "node_modules/has-property-descriptors/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var hasPropertyDescriptors = function hasPropertyDescriptors2() {
        return !!$defineProperty;
      };
      hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
        if (!$defineProperty) {
          return null;
        }
        try {
          return $defineProperty([], "length", { value: 1 }).length !== 1;
        } catch (e) {
          return true;
        }
      };
      module.exports = hasPropertyDescriptors;
    }
  });

  // node_modules/set-function-length/index.js
  var require_set_function_length = __commonJS({
    "node_modules/set-function-length/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var define = require_define_data_property();
      var hasDescriptors = require_has_property_descriptors()();
      var gOPD = require_gopd();
      var $TypeError = require_type();
      var $floor = GetIntrinsic("%Math.floor%");
      module.exports = function setFunctionLength(fn, length) {
        if (typeof fn !== "function") {
          throw new $TypeError("`fn` is not a function");
        }
        if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
          throw new $TypeError("`length` must be a positive 32-bit integer");
        }
        var loose = arguments.length > 2 && !!arguments[2];
        var functionLengthIsConfigurable = true;
        var functionLengthIsWritable = true;
        if ("length" in fn && gOPD) {
          var desc = gOPD(fn, "length");
          if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
          }
          if (desc && !desc.writable) {
            functionLengthIsWritable = false;
          }
        }
        if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
          if (hasDescriptors) {
            define(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length,
              true,
              true
            );
          } else {
            define(
              /** @type {Parameters<define>[0]} */
              fn,
              "length",
              length
            );
          }
        }
        return fn;
      };
    }
  });

  // node_modules/call-bind-apply-helpers/applyBind.js
  var require_applyBind = __commonJS({
    "node_modules/call-bind-apply-helpers/applyBind.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var actualApply = require_actualApply();
      module.exports = function applyBind() {
        return actualApply(bind, $apply, arguments);
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports, module) {
      "use strict";
      var setFunctionLength = require_set_function_length();
      var $defineProperty = require_es_define_property();
      var callBindBasic = require_call_bind_apply_helpers();
      var applyBind = require_applyBind();
      module.exports = function callBind(originalFunction) {
        var func = callBindBasic(arguments);
        var adjustedLength = 1 + originalFunction.length - (arguments.length - 1);
        return setFunctionLength(
          func,
          adjustedLength > 0 ? adjustedLength : 0,
          true
        );
      };
      if ($defineProperty) {
        $defineProperty(module.exports, "apply", { value: applyBind });
      } else {
        module.exports.apply = applyBind;
      }
    }
  });

  // node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS({
    "node_modules/which-typed-array/index.js"(exports, module) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBind = require_call_bind();
      var callBound = require_call_bound();
      var gOPD = require_gopd();
      var getProto = require_get_proto();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var g = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $slice = callBound("String.prototype.slice");
      var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
        for (var i = 0; i < array.length; i += 1) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      };
      var cache = { __proto__: null };
      if (hasToStringTag && gOPD && getProto) {
        forEach(typedArrays, function(typedArray) {
          var arr = new g[typedArray]();
          if (Symbol.toStringTag in arr && getProto) {
            var proto = getProto(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor && proto) {
              var superProto = getProto(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            if (descriptor && descriptor.get) {
              var bound = callBind(descriptor.get);
              cache[
                /** @type {`$${TypedArrayName}`} */
                "$" + typedArray
              ] = bound;
            }
          }
        });
      } else {
        forEach(typedArrays, function(typedArray) {
          var arr = new g[typedArray]();
          var fn = arr.slice || arr.set;
          if (fn) {
            var bound = (
              /** @type {typeof BoundSlice | typeof BoundSet} */
              // @ts-expect-error TODO FIXME
              callBind(fn)
            );
            cache[
              /** @type {`$${TypedArrayName}`} */
              "$" + typedArray
            ] = bound;
          }
        });
      }
      function tryTypedArrays(value) {
        var found = false;
        forEach(
          /** @type {Record<`$${TypedArrayName}`, Getter>} */
          cache,
          /** @param {Getter} getter @param {`$${TypedArrayName}`} typedArray */
          function(getter, typedArray) {
            if (!found) {
              try {
                if ("$" + getter(value) === typedArray) {
                  found = /** @type {TypedArrayName} */
                  $slice(typedArray, 1);
                }
              } catch (e) {
              }
            }
          }
        );
        return found;
      }
      function trySlices(value) {
        var found = false;
        forEach(
          /** @type {Record<`$${TypedArrayName}`, Getter>} */
          cache,
          /** @param {Getter} getter @param {`$${TypedArrayName}`} name */
          function(getter, name) {
            if (!found) {
              try {
                getter(value);
                found = /** @type {TypedArrayName} */
                $slice(name, 1);
              } catch (e) {
              }
            }
          }
        );
        return found;
      }
      function isTATag(tag) {
        return $indexOf(typedArrays, tag) > -1;
      }
      function whichTypedArray(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        if (!hasToStringTag) {
          var tag = $slice($toString(value), 8, -1);
          if (isTATag(tag)) {
            return tag;
          }
          if (tag !== "Object") {
            return false;
          }
          return trySlices(value);
        }
        if (!gOPD) {
          return null;
        }
        return tryTypedArrays(value);
      }
      module.exports = whichTypedArray;
    }
  });

  // node_modules/is-typed-array/index.js
  var require_is_typed_array = __commonJS({
    "node_modules/is-typed-array/index.js"(exports, module) {
      "use strict";
      var whichTypedArray = require_which_typed_array();
      module.exports = function isTypedArray(value) {
        return !!whichTypedArray(value);
      };
    }
  });

  // node_modules/util/support/types.js
  var require_types = __commonJS({
    "node_modules/util/support/types.js"(exports) {
      "use strict";
      var isArgumentsObject = require_is_arguments();
      var isGeneratorFunction = require_is_generator_function();
      var whichTypedArray = require_which_typed_array();
      var isTypedArray = require_is_typed_array();
      function uncurryThis(f) {
        return f.call.bind(f);
      }
      var BigIntSupported = typeof BigInt !== "undefined";
      var SymbolSupported = typeof Symbol !== "undefined";
      var ObjectToString = uncurryThis(Object.prototype.toString);
      var numberValue2 = uncurryThis(Number.prototype.valueOf);
      var stringValue2 = uncurryThis(String.prototype.valueOf);
      var booleanValue = uncurryThis(Boolean.prototype.valueOf);
      if (BigIntSupported) {
        bigIntValue = uncurryThis(BigInt.prototype.valueOf);
      }
      var bigIntValue;
      if (SymbolSupported) {
        symbolValue = uncurryThis(Symbol.prototype.valueOf);
      }
      var symbolValue;
      function checkBoxedPrimitive(value, prototypeValueOf) {
        if (typeof value !== "object") {
          return false;
        }
        try {
          prototypeValueOf(value);
          return true;
        } catch (e) {
          return false;
        }
      }
      exports.isArgumentsObject = isArgumentsObject;
      exports.isGeneratorFunction = isGeneratorFunction;
      exports.isTypedArray = isTypedArray;
      function isPromise(input) {
        return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
      }
      exports.isPromise = isPromise;
      function isArrayBufferView(value) {
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          return ArrayBuffer.isView(value);
        }
        return isTypedArray(value) || isDataView(value);
      }
      exports.isArrayBufferView = isArrayBufferView;
      function isUint8Array(value) {
        return whichTypedArray(value) === "Uint8Array";
      }
      exports.isUint8Array = isUint8Array;
      function isUint8ClampedArray(value) {
        return whichTypedArray(value) === "Uint8ClampedArray";
      }
      exports.isUint8ClampedArray = isUint8ClampedArray;
      function isUint16Array(value) {
        return whichTypedArray(value) === "Uint16Array";
      }
      exports.isUint16Array = isUint16Array;
      function isUint32Array(value) {
        return whichTypedArray(value) === "Uint32Array";
      }
      exports.isUint32Array = isUint32Array;
      function isInt8Array(value) {
        return whichTypedArray(value) === "Int8Array";
      }
      exports.isInt8Array = isInt8Array;
      function isInt16Array(value) {
        return whichTypedArray(value) === "Int16Array";
      }
      exports.isInt16Array = isInt16Array;
      function isInt32Array(value) {
        return whichTypedArray(value) === "Int32Array";
      }
      exports.isInt32Array = isInt32Array;
      function isFloat32Array(value) {
        return whichTypedArray(value) === "Float32Array";
      }
      exports.isFloat32Array = isFloat32Array;
      function isFloat64Array(value) {
        return whichTypedArray(value) === "Float64Array";
      }
      exports.isFloat64Array = isFloat64Array;
      function isBigInt64Array(value) {
        return whichTypedArray(value) === "BigInt64Array";
      }
      exports.isBigInt64Array = isBigInt64Array;
      function isBigUint64Array(value) {
        return whichTypedArray(value) === "BigUint64Array";
      }
      exports.isBigUint64Array = isBigUint64Array;
      function isMapToString(value) {
        return ObjectToString(value) === "[object Map]";
      }
      isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
      function isMap(value) {
        if (typeof Map === "undefined") {
          return false;
        }
        return isMapToString.working ? isMapToString(value) : value instanceof Map;
      }
      exports.isMap = isMap;
      function isSetToString(value) {
        return ObjectToString(value) === "[object Set]";
      }
      isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
      function isSet(value) {
        if (typeof Set === "undefined") {
          return false;
        }
        return isSetToString.working ? isSetToString(value) : value instanceof Set;
      }
      exports.isSet = isSet;
      function isWeakMapToString(value) {
        return ObjectToString(value) === "[object WeakMap]";
      }
      isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
      function isWeakMap(value) {
        if (typeof WeakMap === "undefined") {
          return false;
        }
        return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
      }
      exports.isWeakMap = isWeakMap;
      function isWeakSetToString(value) {
        return ObjectToString(value) === "[object WeakSet]";
      }
      isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
      function isWeakSet(value) {
        return isWeakSetToString(value);
      }
      exports.isWeakSet = isWeakSet;
      function isArrayBufferToString(value) {
        return ObjectToString(value) === "[object ArrayBuffer]";
      }
      isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
      function isArrayBuffer(value) {
        if (typeof ArrayBuffer === "undefined") {
          return false;
        }
        return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
      }
      exports.isArrayBuffer = isArrayBuffer;
      function isDataViewToString(value) {
        return ObjectToString(value) === "[object DataView]";
      }
      isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
      function isDataView(value) {
        if (typeof DataView === "undefined") {
          return false;
        }
        return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
      }
      exports.isDataView = isDataView;
      var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
      function isSharedArrayBufferToString(value) {
        return ObjectToString(value) === "[object SharedArrayBuffer]";
      }
      function isSharedArrayBuffer(value) {
        if (typeof SharedArrayBufferCopy === "undefined") {
          return false;
        }
        if (typeof isSharedArrayBufferToString.working === "undefined") {
          isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
        }
        return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
      }
      exports.isSharedArrayBuffer = isSharedArrayBuffer;
      function isAsyncFunction(value) {
        return ObjectToString(value) === "[object AsyncFunction]";
      }
      exports.isAsyncFunction = isAsyncFunction;
      function isMapIterator(value) {
        return ObjectToString(value) === "[object Map Iterator]";
      }
      exports.isMapIterator = isMapIterator;
      function isSetIterator(value) {
        return ObjectToString(value) === "[object Set Iterator]";
      }
      exports.isSetIterator = isSetIterator;
      function isGeneratorObject(value) {
        return ObjectToString(value) === "[object Generator]";
      }
      exports.isGeneratorObject = isGeneratorObject;
      function isWebAssemblyCompiledModule(value) {
        return ObjectToString(value) === "[object WebAssembly.Module]";
      }
      exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
      function isNumberObject(value) {
        return checkBoxedPrimitive(value, numberValue2);
      }
      exports.isNumberObject = isNumberObject;
      function isStringObject(value) {
        return checkBoxedPrimitive(value, stringValue2);
      }
      exports.isStringObject = isStringObject;
      function isBooleanObject(value) {
        return checkBoxedPrimitive(value, booleanValue);
      }
      exports.isBooleanObject = isBooleanObject;
      function isBigIntObject(value) {
        return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
      }
      exports.isBigIntObject = isBigIntObject;
      function isSymbolObject(value) {
        return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
      }
      exports.isSymbolObject = isSymbolObject;
      function isBoxedPrimitive(value) {
        return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
      }
      exports.isBoxedPrimitive = isBoxedPrimitive;
      function isAnyArrayBuffer(value) {
        return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
      }
      exports.isAnyArrayBuffer = isAnyArrayBuffer;
      ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
        Object.defineProperty(exports, method, {
          enumerable: false,
          value: function() {
            throw new Error(method + " is not supported in userland");
          }
        });
      });
    }
  });

  // node_modules/util/support/isBufferBrowser.js
  var require_isBufferBrowser = __commonJS({
    "node_modules/util/support/isBufferBrowser.js"(exports, module) {
      module.exports = function isBuffer(arg) {
        return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
      };
    }
  });

  // node_modules/util/util.js
  var require_util2 = __commonJS({
    "node_modules/util/util.js"(exports) {
      var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
        var keys = Object.keys(obj);
        var descriptors = {};
        for (var i = 0; i < keys.length; i++) {
          descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
        }
        return descriptors;
      };
      var formatRegExp = /%[sdj%]/g;
      exports.format = function(f) {
        if (!isString(f)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(" ");
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function(x2) {
          if (x2 === "%%") return "%";
          if (i >= len) return x2;
          switch (x2) {
            case "%s":
              return String(args[i++]);
            case "%d":
              return Number(args[i++]);
            case "%j":
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return "[Circular]";
              }
            default:
              return x2;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += " " + x;
          } else {
            str += " " + inspect(x);
          }
        }
        return str;
      };
      exports.deprecate = function(fn, msg) {
        if (typeof process !== "undefined" && process.noDeprecation === true) {
          return fn;
        }
        if (typeof process === "undefined") {
          return function() {
            return exports.deprecate(fn, msg).apply(this, arguments);
          };
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (process.throwDeprecation) {
              throw new Error(msg);
            } else if (process.traceDeprecation) {
              console.trace(msg);
            } else {
              console.error(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      };
      var debugs = {};
      var debugEnvRegex = /^$/;
      if (process.env.NODE_DEBUG) {
        debugEnv = process.env.NODE_DEBUG;
        debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
        debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
      }
      var debugEnv;
      exports.debuglog = function(set) {
        set = set.toUpperCase();
        if (!debugs[set]) {
          if (debugEnvRegex.test(set)) {
            var pid = process.pid;
            debugs[set] = function() {
              var msg = exports.format.apply(exports, arguments);
              console.error("%s %d: %s", set, pid, msg);
            };
          } else {
            debugs[set] = function() {
            };
          }
        }
        return debugs[set];
      };
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3) ctx.depth = arguments[2];
        if (arguments.length >= 4) ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          exports._extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
        if (isUndefined(ctx.depth)) ctx.depth = 2;
        if (isUndefined(ctx.colors)) ctx.colors = false;
        if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
        if (ctx.colors) ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      exports.inspect = inspect;
      inspect.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
        } else {
          return str;
        }
      }
      function stylizeNoColor(str, styleType) {
        return str;
      }
      function arrayToHash(array) {
        var hash = {};
        array.forEach(function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
        value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes, ctx);
          if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys = Object.keys(value);
        var visibleKeys = arrayToHash(keys);
        if (ctx.showHidden) {
          keys = Object.getOwnPropertyNames(value);
        }
        if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
          return formatError(value);
        }
        if (keys.length === 0) {
          if (isFunction(value)) {
            var name = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name + "]", "special");
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
          }
          if (isError(value)) {
            return formatError(value);
          }
        }
        var base = "", array = false, braces = ["{", "}"];
        if (isArray(value)) {
          array = true;
          braces = ["[", "]"];
        }
        if (isFunction(value)) {
          var n = value.name ? ": " + value.name : "";
          base = " [Function" + n + "]";
        }
        if (isRegExp(value)) {
          base = " " + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base = " " + Date.prototype.toUTCString.call(value);
        }
        if (isError(value)) {
          base = " " + formatError(value);
        }
        if (keys.length === 0 && (!array || value.length == 0)) {
          return braces[0] + base + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          } else {
            return ctx.stylize("[Object]", "special");
          }
        }
        ctx.seen.push(value);
        var output;
        if (array) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
        } else {
          output = keys.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize("undefined", "undefined");
        if (isString(value)) {
          var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return ctx.stylize(simple, "string");
        }
        if (isNumber(value))
          return ctx.stylize("" + value, "number");
        if (isBoolean(value))
          return ctx.stylize("" + value, "boolean");
        if (isNull(value))
          return ctx.stylize("null", "null");
      }
      function formatError(value) {
        return "[" + Error.prototype.toString.call(value) + "]";
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];
        for (var i = 0, l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              String(i),
              true
            ));
          } else {
            output.push("");
          }
        }
        keys.forEach(function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              key,
              true
            ));
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name, str, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize("[Getter/Setter]", "special");
          } else {
            str = ctx.stylize("[Getter]", "special");
          }
        } else {
          if (desc.set) {
            str = ctx.stylize("[Setter]", "special");
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name = "[" + key + "]";
        }
        if (!str) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf("\n") > -1) {
              if (array) {
                str = str.split("\n").map(function(line) {
                  return "  " + line;
                }).join("\n").slice(2);
              } else {
                str = "\n" + str.split("\n").map(function(line) {
                  return "   " + line;
                }).join("\n");
              }
            }
          } else {
            str = ctx.stylize("[Circular]", "special");
          }
        }
        if (isUndefined(name)) {
          if (array && key.match(/^\d+$/)) {
            return str;
          }
          name = JSON.stringify("" + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.slice(1, -1);
            name = ctx.stylize(name, "name");
          } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, "string");
          }
        }
        return name + ": " + str;
      }
      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = output.reduce(function(prev, cur) {
          numLinesEst++;
          if (cur.indexOf("\n") >= 0) numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
        }
        return braces[0] + base + " " + output.join(", ") + " " + braces[1];
      }
      exports.types = require_types();
      function isArray(ar) {
        return Array.isArray(ar);
      }
      exports.isArray = isArray;
      function isBoolean(arg) {
        return typeof arg === "boolean";
      }
      exports.isBoolean = isBoolean;
      function isNull(arg) {
        return arg === null;
      }
      exports.isNull = isNull;
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isNumber(arg) {
        return typeof arg === "number";
      }
      exports.isNumber = isNumber;
      function isString(arg) {
        return typeof arg === "string";
      }
      exports.isString = isString;
      function isSymbol(arg) {
        return typeof arg === "symbol";
      }
      exports.isSymbol = isSymbol;
      function isUndefined(arg) {
        return arg === void 0;
      }
      exports.isUndefined = isUndefined;
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === "[object RegExp]";
      }
      exports.isRegExp = isRegExp;
      exports.types.isRegExp = isRegExp;
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      exports.isObject = isObject;
      function isDate(d) {
        return isObject(d) && objectToString(d) === "[object Date]";
      }
      exports.isDate = isDate;
      exports.types.isDate = isDate;
      function isError(e) {
        return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
      }
      exports.isError = isError;
      exports.types.isNativeError = isError;
      function isFunction(arg) {
        return typeof arg === "function";
      }
      exports.isFunction = isFunction;
      function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
        typeof arg === "undefined";
      }
      exports.isPrimitive = isPrimitive;
      exports.isBuffer = require_isBufferBrowser();
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      function pad(n) {
        return n < 10 ? "0" + n.toString(10) : n.toString(10);
      }
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      function timestamp() {
        var d = /* @__PURE__ */ new Date();
        var time = [
          pad(d.getHours()),
          pad(d.getMinutes()),
          pad(d.getSeconds())
        ].join(":");
        return [d.getDate(), months[d.getMonth()], time].join(" ");
      }
      exports.log = function() {
        console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
      };
      exports.inherits = require_inherits();
      exports._extend = function(origin, add) {
        if (!add || !isObject(add)) return origin;
        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }
        return origin;
      };
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? /* @__PURE__ */ Symbol("util.promisify.custom") : void 0;
      exports.promisify = function promisify(original) {
        if (typeof original !== "function")
          throw new TypeError('The "original" argument must be of type Function');
        if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
          var fn = original[kCustomPromisifiedSymbol];
          if (typeof fn !== "function") {
            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
          }
          Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true
          });
          return fn;
        }
        function fn() {
          var promiseResolve, promiseReject;
          var promise = new Promise(function(resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;
          });
          var args = [];
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          args.push(function(err, value) {
            if (err) {
              promiseReject(err);
            } else {
              promiseResolve(value);
            }
          });
          try {
            original.apply(this, args);
          } catch (err) {
            promiseReject(err);
          }
          return promise;
        }
        Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
        if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return Object.defineProperties(
          fn,
          getOwnPropertyDescriptors(original)
        );
      };
      exports.promisify.custom = kCustomPromisifiedSymbol;
      function callbackifyOnRejected(reason, cb) {
        if (!reason) {
          var newReason = new Error("Promise was rejected with a falsy value");
          newReason.reason = reason;
          reason = newReason;
        }
        return cb(reason);
      }
      function callbackify(original) {
        if (typeof original !== "function") {
          throw new TypeError('The "original" argument must be of type Function');
        }
        function callbackified() {
          var args = [];
          for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          var maybeCb = args.pop();
          if (typeof maybeCb !== "function") {
            throw new TypeError("The last argument must be of type Function");
          }
          var self2 = this;
          var cb = function() {
            return maybeCb.apply(self2, arguments);
          };
          original.apply(this, args).then(
            function(ret) {
              process.nextTick(cb.bind(null, null, ret));
            },
            function(rej) {
              process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
            }
          );
        }
        Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
        Object.defineProperties(
          callbackified,
          getOwnPropertyDescriptors(original)
        );
        return callbackified;
      }
      exports.callbackify = callbackify;
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/inherits/inherits.js
  var require_inherits = __commonJS({
    "node_modules/inherits/inherits.js"(exports, module) {
      try {
        util = require_util2();
        if (typeof util.inherits !== "function") throw "";
        module.exports = util.inherits;
      } catch (e) {
        module.exports = require_inherits_browser();
      }
      var util;
    }
  });

  // node_modules/readable-stream/lib/internal/streams/BufferList.js
  var require_BufferList = __commonJS({
    "node_modules/readable-stream/lib/internal/streams/BufferList.js"(exports, module) {
      "use strict";
      var Buffer2 = require_buffer().Buffer;
      var bufferShim = require_buffer_shims();
      module.exports = BufferList;
      function BufferList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList.prototype.push = function(v) {
        var entry = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function(s) {
        if (this.length === 0) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function(n) {
        if (this.length === 0) return bufferShim.alloc(0);
        if (this.length === 1) return this.head.data;
        var ret = bufferShim.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          p.data.copy(ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
    }
  });

  // node_modules/util-deprecate/node.js
  var require_node = __commonJS({
    "node_modules/util-deprecate/node.js"(exports, module) {
      module.exports = require_util2().deprecate;
    }
  });

  // node_modules/readable-stream/lib/_stream_writable.js
  var require_stream_writable = __commonJS({
    "node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
      "use strict";
      module.exports = Writable;
      var processNextTick = require_process_nextick_args();
      var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
      var Duplex;
      Writable.WritableState = WritableState;
      var util = require_util();
      util.inherits = require_inherits();
      var internalUtil = {
        deprecate: require_node()
      };
      var Stream = require_stream_browser();
      var Buffer2 = require_buffer().Buffer;
      var bufferShim = require_buffer_shims();
      util.inherits(Writable, Stream);
      function nop() {
      }
      function WriteReq(chunk, encoding, cb) {
        this.chunk = chunk;
        this.encoding = encoding;
        this.callback = cb;
        this.next = null;
      }
      function WritableState(options, stream) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        this.objectMode = !!options.objectMode;
        if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
        var hwm = options.highWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
        this.highWaterMark = ~~this.highWaterMark;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      (function() {
        try {
          Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate(function() {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
          });
        } catch (_) {
        }
      })();
      var realHasInstance;
      if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
        realHasInstance = Function.prototype[Symbol.hasInstance];
        Object.defineProperty(Writable, Symbol.hasInstance, {
          value: function(object) {
            if (realHasInstance.call(this, object)) return true;
            return object && object._writableState instanceof WritableState;
          }
        });
      } else {
        realHasInstance = function(object) {
          return object instanceof this;
        };
      }
      function Writable(options) {
        Duplex = Duplex || require_stream_duplex();
        if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
          return new Writable(options);
        }
        this._writableState = new WritableState(options, this);
        this.writable = true;
        if (options) {
          if (typeof options.write === "function") this._write = options.write;
          if (typeof options.writev === "function") this._writev = options.writev;
        }
        Stream.call(this);
      }
      Writable.prototype.pipe = function() {
        this.emit("error", new Error("Cannot pipe, not readable"));
      };
      function writeAfterEnd(stream, cb) {
        var er = new Error("write after end");
        stream.emit("error", er);
        processNextTick(cb, er);
      }
      function validChunk(stream, state, chunk, cb) {
        var valid = true;
        var er = false;
        if (chunk === null) {
          er = new TypeError("May not write null values to stream");
        } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
          er = new TypeError("Invalid non-string/buffer chunk");
        }
        if (er) {
          stream.emit("error", er);
          processNextTick(cb, er);
          valid = false;
        }
        return valid;
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        var isBuf = Buffer2.isBuffer(chunk);
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (isBuf) encoding = "buffer";
        else if (!encoding) encoding = state.defaultEncoding;
        if (typeof cb !== "function") cb = nop;
        if (state.ended) writeAfterEnd(this, cb);
        else if (isBuf || validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        var state = this._writableState;
        state.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string") encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
          chunk = bufferShim.from(chunk, encoding);
        }
        return chunk;
      }
      function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
        if (!isBuf) {
          chunk = decodeChunk(state, chunk, encoding);
          if (Buffer2.isBuffer(chunk)) encoding = "buffer";
        }
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        if (!ret) state.needDrain = true;
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
          if (last) {
            last.next = state.lastBufferedRequest;
          } else {
            state.bufferedRequest = state.lastBufferedRequest;
          }
          state.bufferedRequestCount += 1;
        } else {
          doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (writev) stream._writev(chunk, state.onwrite);
        else stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) processNextTick(cb, er);
        else cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
      }
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        onwriteStateUpdate(state);
        if (er) onwriteError(stream, state, sync, er, cb);
        else {
          var finished = needFinish(state);
          if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
          }
          if (sync) {
            asyncWrite(afterWrite, stream, state, finished, cb);
          } else {
            afterWrite(stream, state, finished, cb);
          }
        }
      }
      function afterWrite(stream, state, finished, cb) {
        if (!finished) onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          while (entry) {
            buffer[count] = entry;
            entry = entry.next;
            count += 1;
          }
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else {
            state.corkedRequestsFree = new CorkedRequest(state);
          }
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            if (state.writing) {
              break;
            }
          }
          if (entry === null) state.lastBufferedRequest = null;
        }
        state.bufferedRequestCount = 0;
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new Error("_write() is not implemented"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending && !state.finished) endWritable(this, state, cb);
      };
      function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
      }
      function prefinish(stream, state) {
        if (!state.prefinished) {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          if (state.pendingcb === 0) {
            prefinish(stream, state);
            state.finished = true;
            stream.emit("finish");
          } else {
            prefinish(stream, state);
          }
        }
        return need;
      }
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
          if (state.finished) processNextTick(cb);
          else stream.once("finish", cb);
        }
        state.ended = true;
        stream.writable = false;
      }
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function(err) {
          var entry = _this.entry;
          _this.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = _this;
          } else {
            state.corkedRequestsFree = _this;
          }
        };
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_duplex.js
  var require_stream_duplex = __commonJS({
    "node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
      "use strict";
      var objectKeys = Object.keys || function(obj) {
        var keys2 = [];
        for (var key in obj) {
          keys2.push(key);
        }
        return keys2;
      };
      module.exports = Duplex;
      var processNextTick = require_process_nextick_args();
      var util = require_util();
      util.inherits = require_inherits();
      var Readable2 = require_stream_readable();
      var Writable = require_stream_writable();
      util.inherits(Duplex, Readable2);
      var keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
      var method;
      var v;
      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);
        Readable2.call(this, options);
        Writable.call(this, options);
        if (options && options.readable === false) this.readable = false;
        if (options && options.writable === false) this.writable = false;
        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
        this.once("end", onend);
      }
      function onend() {
        if (this.allowHalfOpen || this._writableState.ended) return;
        processNextTick(onEndNT, this);
      }
      function onEndNT(self2) {
        self2.end();
      }
    }
  });

  // node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder = __commonJS({
    "node_modules/readable-stream/node_modules/string_decoder/lib/string_decoder.js"(exports) {
      "use strict";
      var Buffer2 = require_buffer().Buffer;
      var bufferShim = require_buffer_shims();
      var isEncoding = Buffer2.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc) return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried) return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = bufferShim.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0) return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0) return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127) return 0;
        else if (byte >> 5 === 6) return 2;
        else if (byte >> 4 === 14) return 3;
        else if (byte >> 3 === 30) return 4;
        return -1;
      }
      function utf8CheckIncomplete(self2, buf, i) {
        var j = buf.length - 1;
        if (j < i) return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2) nb = 0;
            else self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf, p) {
        if ((buf[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "\uFFFD".repeat(p);
        }
        if (self2.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "\uFFFD".repeat(p + 1);
          }
          if (self2.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self2.lastNeed = 2;
              return "\uFFFD".repeat(p + 2);
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf, p);
        if (r !== void 0) return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed) return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + "\uFFFD".repeat(this.lastTotal - this.lastNeed);
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0) return buf.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_readable.js
  var require_stream_readable = __commonJS({
    "node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
      "use strict";
      module.exports = Readable2;
      var processNextTick = require_process_nextick_args();
      var isArray = require_isarray();
      var Duplex;
      Readable2.ReadableState = ReadableState;
      var EE = require_events().EventEmitter;
      var EElistenerCount = function(emitter, type) {
        return emitter.listeners(type).length;
      };
      var Stream = require_stream_browser();
      var Buffer2 = require_buffer().Buffer;
      var bufferShim = require_buffer_shims();
      var util = require_util();
      util.inherits = require_inherits();
      var debugUtil = require_util2();
      var debug = void 0;
      if (debugUtil && debugUtil.debuglog) {
        debug = debugUtil.debuglog("stream");
      } else {
        debug = function() {
        };
      }
      var BufferList = require_BufferList();
      var StringDecoder;
      util.inherits(Readable2, Stream);
      var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function") {
          return emitter.prependListener(event, fn);
        } else {
          if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
          else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
          else emitter._events[event] = [fn, emitter._events[event]];
        }
      }
      function ReadableState(options, stream) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        this.objectMode = !!options.objectMode;
        if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
        var hwm = options.highWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
        this.highWaterMark = ~~this.highWaterMark;
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.ranOut = false;
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable2(options) {
        Duplex = Duplex || require_stream_duplex();
        if (!(this instanceof Readable2)) return new Readable2(options);
        this._readableState = new ReadableState(options, this);
        this.readable = true;
        if (options && typeof options.read === "function") this._read = options.read;
        Stream.call(this);
      }
      Readable2.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        if (!state.objectMode && typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = bufferShim.from(chunk, encoding);
            encoding = "";
          }
        }
        return readableAddChunk(this, state, chunk, encoding, false);
      };
      Readable2.prototype.unshift = function(chunk) {
        var state = this._readableState;
        return readableAddChunk(this, state, chunk, "", true);
      };
      Readable2.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      function readableAddChunk(stream, state, chunk, encoding, addToFront) {
        var er = chunkInvalid(state, chunk);
        if (er) {
          stream.emit("error", er);
        } else if (chunk === null) {
          state.reading = false;
          onEofChunk(stream, state);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (state.ended && !addToFront) {
            var e = new Error("stream.push() after EOF");
            stream.emit("error", e);
          } else if (state.endEmitted && addToFront) {
            var _e = new Error("stream.unshift() after end event");
            stream.emit("error", _e);
          } else {
            var skipAdd;
            if (state.decoder && !addToFront && !encoding) {
              chunk = state.decoder.write(chunk);
              skipAdd = !state.objectMode && chunk.length === 0;
            }
            if (!addToFront) state.reading = false;
            if (!skipAdd) {
              if (state.flowing && state.length === 0 && !state.sync) {
                stream.emit("data", chunk);
                stream.read(0);
              } else {
                state.length += state.objectMode ? 1 : chunk.length;
                if (addToFront) state.buffer.unshift(chunk);
                else state.buffer.push(chunk);
                if (state.needReadable) emitReadable(stream);
              }
            }
            maybeReadMore(stream, state);
          }
        } else if (!addToFront) {
          state.reading = false;
        }
        return needMoreData(state);
      }
      function needMoreData(state) {
        return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
      }
      Readable2.prototype.setEncoding = function(enc) {
        if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
        this._readableState.decoder = new StringDecoder(enc);
        this._readableState.encoding = enc;
        return this;
      };
      var MAX_HWM = 8388608;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
          n = MAX_HWM;
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended) return 0;
        if (state.objectMode) return 1;
        if (n !== n) {
          if (state.flowing && state.length) return state.buffer.head.data.length;
          else return state.length;
        }
        if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length) return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      Readable2.prototype.read = function(n) {
        debug("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0) state.emittedReadable = false;
        if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended) endReadable(this);
          else emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0) endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug("reading or ended", doRead);
        } else if (doRead) {
          debug("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0) state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading) n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0) ret = fromList(n, state);
        else ret = null;
        if (ret === null) {
          state.needReadable = true;
          n = 0;
        } else {
          state.length -= n;
        }
        if (state.length === 0) {
          if (!state.ended) state.needReadable = true;
          if (nOrig !== n && state.ended) endReadable(this);
        }
        if (ret !== null) this.emit("data", ret);
        return ret;
      };
      function chunkInvalid(state, chunk) {
        var er = null;
        if (!Buffer2.isBuffer(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state.objectMode) {
          er = new TypeError("Invalid non-string/buffer chunk");
        }
        return er;
      }
      function onEofChunk(stream, state) {
        if (state.ended) return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        emitReadable(stream);
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          if (state.sync) processNextTick(emitReadable_, stream);
          else emitReadable_(stream);
        }
      }
      function emitReadable_(stream) {
        debug("emit readable");
        stream.emit("readable");
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          processNextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        var len = state.length;
        while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
          else len = state.length;
        }
        state.readingMore = false;
      }
      Readable2.prototype._read = function(n) {
        this.emit("error", new Error("_read() is not implemented"));
      };
      Readable2.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
        var endFn = doEnd ? onend : cleanup;
        if (state.endEmitted) processNextTick(endFn);
        else src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable) {
          debug("onunpipe");
          if (readable === src) {
            cleanup();
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", cleanup);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
        }
        var increasedAwaitDrain = false;
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          increasedAwaitDrain = false;
          var ret = dest.write(chunk);
          if (false === ret && !increasedAwaitDrain) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
              debug("false write response, pause", src._readableState.awaitDrain);
              src._readableState.awaitDrain++;
              increasedAwaitDrain = true;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function() {
          var state = src._readableState;
          debug("pipeOnDrain", state.awaitDrain);
          if (state.awaitDrain) state.awaitDrain--;
          if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      Readable2.prototype.unpipe = function(dest) {
        var state = this._readableState;
        if (state.pipesCount === 0) return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes) return this;
          if (!dest) dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest) dest.emit("unpipe", this);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var i = 0; i < len; i++) {
            dests[i].emit("unpipe", this);
          }
          return this;
        }
        var index = indexOf(state.pipes, dest);
        if (index === -1) return this;
        state.pipes.splice(index, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1) state.pipes = state.pipes[0];
        dest.emit("unpipe", this);
        return this;
      };
      Readable2.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn);
        if (ev === "data") {
          if (this._readableState.flowing !== false) this.resume();
        } else if (ev === "readable") {
          var state = this._readableState;
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.emittedReadable = false;
            if (!state.reading) {
              processNextTick(nReadingNextTick, this);
            } else if (state.length) {
              emitReadable(this, state);
            }
          }
        }
        return res;
      };
      Readable2.prototype.addListener = Readable2.prototype.on;
      function nReadingNextTick(self2) {
        debug("readable nexttick read 0");
        self2.read(0);
      }
      Readable2.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = true;
          resume(this, state);
        }
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          processNextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        if (!state.reading) {
          debug("resume read 0");
          stream.read(0);
        }
        state.resumeScheduled = false;
        state.awaitDrain = 0;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading) stream.read(0);
      }
      Readable2.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (false !== this._readableState.flowing) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && stream.read() !== null) {
        }
      }
      Readable2.prototype.wrap = function(stream) {
        var state = this._readableState;
        var paused = false;
        var self2 = this;
        stream.on("end", function() {
          debug("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) self2.push(chunk);
          }
          self2.push(null);
        });
        stream.on("data", function(chunk) {
          debug("wrapped data");
          if (state.decoder) chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0)) return;
          else if (!state.objectMode && (!chunk || !chunk.length)) return;
          var ret = self2.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = /* @__PURE__ */ (function(method) {
              return function() {
                return stream[method].apply(stream, arguments);
              };
            })(i);
          }
        }
        for (var n = 0; n < kProxyEvents.length; n++) {
          stream.on(kProxyEvents[n], self2.emit.bind(self2, kProxyEvents[n]));
        }
        self2._read = function(n2) {
          debug("wrapped _read", n2);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return self2;
      };
      Readable2._fromList = fromList;
      function fromList(n, state) {
        if (state.length === 0) return null;
        var ret;
        if (state.objectMode) ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder) ret = state.buffer.join("");
          else if (state.buffer.length === 1) ret = state.buffer.head.data;
          else ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = fromListPartial(n, state.buffer, state.decoder);
        }
        return ret;
      }
      function fromListPartial(n, list, hasStrings) {
        var ret;
        if (n < list.head.data.length) {
          ret = list.head.data.slice(0, n);
          list.head.data = list.head.data.slice(n);
        } else if (n === list.head.data.length) {
          ret = list.shift();
        } else {
          ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
        }
        return ret;
      }
      function copyFromBufferString(n, list) {
        var p = list.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length) ret += str;
          else ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next) list.head = p.next;
              else list.head = list.tail = null;
            } else {
              list.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        list.length -= c;
        return ret;
      }
      function copyFromBuffer(n, list) {
        var ret = bufferShim.allocUnsafe(n);
        var p = list.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next) list.head = p.next;
              else list.head = list.tail = null;
            } else {
              list.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        list.length -= c;
        return ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
        if (!state.endEmitted) {
          state.ended = true;
          processNextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
        }
      }
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) return i;
        }
        return -1;
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_transform.js
  var require_stream_transform = __commonJS({
    "node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
      "use strict";
      module.exports = Transform;
      var Duplex = require_stream_duplex();
      var util = require_util();
      util.inherits = require_inherits();
      util.inherits(Transform, Duplex);
      function TransformState(stream) {
        this.afterTransform = function(er, data) {
          return afterTransform(stream, er, data);
        };
        this.needTransform = false;
        this.transforming = false;
        this.writecb = null;
        this.writechunk = null;
        this.writeencoding = null;
      }
      function afterTransform(stream, er, data) {
        var ts = stream._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb) return stream.emit("error", new Error("no writecb in Transform class"));
        ts.writechunk = null;
        ts.writecb = null;
        if (data !== null && data !== void 0) stream.push(data);
        cb(er);
        var rs = stream._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          stream._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform)) return new Transform(options);
        Duplex.call(this, options);
        this._transformState = new TransformState(this);
        var stream = this;
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function") this._transform = options.transform;
          if (typeof options.flush === "function") this._flush = options.flush;
        }
        this.once("prefinish", function() {
          if (typeof this._flush === "function") this._flush(function(er, data) {
            done(stream, er, data);
          });
          else done(stream);
        });
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error("_transform() is not implemented");
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      function done(stream, er, data) {
        if (er) return stream.emit("error", er);
        if (data !== null && data !== void 0) stream.push(data);
        var ws = stream._writableState;
        var ts = stream._transformState;
        if (ws.length) throw new Error("Calling transform done when ws.length != 0");
        if (ts.transforming) throw new Error("Calling transform done when still transforming");
        return stream.push(null);
      }
    }
  });

  // node_modules/readable-stream/lib/_stream_passthrough.js
  var require_stream_passthrough = __commonJS({
    "node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
      "use strict";
      module.exports = PassThrough;
      var Transform = require_stream_transform();
      var util = require_util();
      util.inherits = require_inherits();
      util.inherits(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough)) return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // node_modules/readable-stream/readable-browser.js
  var require_readable_browser = __commonJS({
    "node_modules/readable-stream/readable-browser.js"(exports, module) {
      exports = module.exports = require_stream_readable();
      exports.Stream = exports;
      exports.Readable = exports;
      exports.Writable = require_stream_writable();
      exports.Duplex = require_stream_duplex();
      exports.Transform = require_stream_transform();
      exports.PassThrough = require_stream_passthrough();
    }
  });

  // node_modules/from2/index.js
  var require_from2 = __commonJS({
    "node_modules/from2/index.js"(exports, module) {
      var Readable2 = require_readable_browser().Readable;
      var inherits = require_inherits();
      module.exports = from2;
      from2.ctor = ctor;
      from2.obj = obj;
      var Proto = ctor();
      function toFunction(list) {
        list = list.slice();
        return function(_, cb) {
          var err = null;
          var item = list.length ? list.shift() : null;
          if (item instanceof Error) {
            err = item;
            item = null;
          }
          cb(err, item);
        };
      }
      function from2(opts, read) {
        if (typeof opts !== "object" || Array.isArray(opts)) {
          read = opts;
          opts = {};
        }
        var rs = new Proto(opts);
        rs._from = Array.isArray(read) ? toFunction(read) : read || noop;
        return rs;
      }
      function ctor(opts, read) {
        if (typeof opts === "function") {
          read = opts;
          opts = {};
        }
        opts = defaults(opts);
        inherits(Class, Readable2);
        function Class(override) {
          if (!(this instanceof Class)) return new Class(override);
          this._reading = false;
          this._callback = check;
          this.destroyed = false;
          Readable2.call(this, override || opts);
          var self2 = this;
          var hwm = this._readableState.highWaterMark;
          function check(err, data) {
            if (self2.destroyed) return;
            if (err) return self2.destroy(err);
            if (data === null) return self2.push(null);
            self2._reading = false;
            if (self2.push(data)) self2._read(hwm);
          }
        }
        Class.prototype._from = read || noop;
        Class.prototype._read = function(size) {
          if (this._reading || this.destroyed) return;
          this._reading = true;
          this._from(size, this._callback);
        };
        Class.prototype.destroy = function(err) {
          if (this.destroyed) return;
          this.destroyed = true;
          var self2 = this;
          process.nextTick(function() {
            if (err) self2.emit("error", err);
            self2.emit("close");
          });
        };
        return Class;
      }
      function obj(opts, read) {
        if (typeof opts === "function" || Array.isArray(opts)) {
          read = opts;
          opts = {};
        }
        opts = defaults(opts);
        opts.objectMode = true;
        opts.highWaterMark = 16;
        return from2(opts, read);
      }
      function noop() {
      }
      function defaults(opts) {
        opts = opts || {};
        return opts;
      }
    }
  });

  // node_modules/is-typedarray/index.js
  var require_is_typedarray = __commonJS({
    "node_modules/is-typedarray/index.js"(exports, module) {
      module.exports = isTypedArray;
      isTypedArray.strict = isStrictTypedArray;
      isTypedArray.loose = isLooseTypedArray;
      var toString = Object.prototype.toString;
      var names = {
        "[object Int8Array]": true,
        "[object Int16Array]": true,
        "[object Int32Array]": true,
        "[object Uint8Array]": true,
        "[object Uint8ClampedArray]": true,
        "[object Uint16Array]": true,
        "[object Uint32Array]": true,
        "[object Float32Array]": true,
        "[object Float64Array]": true
      };
      function isTypedArray(arr) {
        return isStrictTypedArray(arr) || isLooseTypedArray(arr);
      }
      function isStrictTypedArray(arr) {
        return arr instanceof Int8Array || arr instanceof Int16Array || arr instanceof Int32Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Uint16Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array;
      }
      function isLooseTypedArray(arr) {
        return names[toString.call(arr)];
      }
    }
  });

  // node_modules/typedarray-to-buffer/index.js
  var require_typedarray_to_buffer = __commonJS({
    "node_modules/typedarray-to-buffer/index.js"(exports, module) {
      var isTypedArray = require_is_typedarray().strict;
      module.exports = function typedarrayToBuffer(arr) {
        if (isTypedArray(arr)) {
          var buf = new Buffer(arr.buffer);
          if (arr.byteLength !== arr.buffer.byteLength) {
            buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
          }
          return buf;
        } else {
          return new Buffer(arr);
        }
      };
    }
  });

  // node_modules/filereader-stream/index.js
  var require_filereader_stream = __commonJS({
    "node_modules/filereader-stream/index.js"(exports, module) {
      var from2 = require_from2();
      var toBuffer = require_typedarray_to_buffer();
      module.exports = function(file, options) {
        options = options || {};
        var offset = options.offset || 0;
        var chunkSize = options.chunkSize || 1024 * 1024;
        var fileReader = new FileReader(file);
        var from = from2(function(size, cb) {
          if (offset >= file.size) return cb(null, null);
          fileReader.onloadend = function loaded(event) {
            var data = event.target.result;
            if (data instanceof ArrayBuffer) data = toBuffer(new Uint8Array(event.target.result));
            cb(null, data);
          };
          var end = offset + chunkSize;
          var slice = file.slice(offset, end);
          fileReader.readAsArrayBuffer(slice);
          offset = end;
        });
        from.name = file.name;
        from.size = file.size;
        from.type = file.type;
        from.lastModifiedDate = file.lastModifiedDate;
        fileReader.onerror = function(err) {
          from.destroy(err);
        };
        return from;
      };
    }
  });

  // node_modules/readable-stream/transform.js
  var require_transform = __commonJS({
    "node_modules/readable-stream/transform.js"(exports, module) {
      module.exports = require_readable_browser().Transform;
    }
  });

  // node_modules/xtend/immutable.js
  var require_immutable = __commonJS({
    "node_modules/xtend/immutable.js"(exports, module) {
      module.exports = extend;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function extend() {
        var target = {};
        for (var i = 0; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      }
    }
  });

  // node_modules/through2/through2.js
  var require_through2 = __commonJS({
    "node_modules/through2/through2.js"(exports, module) {
      var Transform = require_transform();
      var inherits = require_util2().inherits;
      var xtend = require_immutable();
      function DestroyableTransform(opts) {
        Transform.call(this, opts);
        this._destroyed = false;
      }
      inherits(DestroyableTransform, Transform);
      DestroyableTransform.prototype.destroy = function(err) {
        if (this._destroyed) return;
        this._destroyed = true;
        var self2 = this;
        process.nextTick(function() {
          if (err)
            self2.emit("error", err);
          self2.emit("close");
        });
      };
      function noop(chunk, enc, callback) {
        callback(null, chunk);
      }
      function through2(construct) {
        return function(options, transform, flush) {
          if (typeof options == "function") {
            flush = transform;
            transform = options;
            options = {};
          }
          if (typeof transform != "function")
            transform = noop;
          if (typeof flush != "function")
            flush = null;
          return construct(options, transform, flush);
        };
      }
      module.exports = through2(function(options, transform, flush) {
        var t2 = new DestroyableTransform(options);
        t2._transform = transform;
        if (flush)
          t2._flush = flush;
        return t2;
      });
      module.exports.ctor = through2(function(options, transform, flush) {
        function Through2(override) {
          if (!(this instanceof Through2))
            return new Through2(override);
          this.options = xtend(options, override);
          DestroyableTransform.call(this, this.options);
        }
        inherits(Through2, DestroyableTransform);
        Through2.prototype._transform = transform;
        if (flush)
          Through2.prototype._flush = flush;
        return Through2;
      });
      module.exports.obj = through2(function(options, transform, flush) {
        var t2 = new DestroyableTransform(xtend({ objectMode: true, highWaterMark: 16 }, options));
        t2._transform = transform;
        if (flush)
          t2._flush = flush;
        return t2;
      });
    }
  });

  // node_modules/speedometer/index.js
  var require_speedometer = __commonJS({
    "node_modules/speedometer/index.js"(exports, module) {
      var tick = 1;
      var maxTick = 65535;
      var resolution = 4;
      var inc = function() {
        tick = tick + 1 & maxTick;
      };
      var timer = setInterval(inc, 1e3 / resolution | 0);
      if (timer.unref) timer.unref();
      module.exports = function(seconds) {
        var size = resolution * (seconds || 5);
        var buffer = [0];
        var pointer = 1;
        var last = tick - 1 & maxTick;
        return function(delta) {
          var dist = tick - last & maxTick;
          if (dist > size) dist = size;
          last = tick;
          while (dist--) {
            if (pointer === size) pointer = 0;
            buffer[pointer] = buffer[pointer === 0 ? size - 1 : pointer - 1];
            pointer++;
          }
          if (delta) buffer[pointer - 1] += delta;
          var top = buffer[pointer - 1];
          var btm = buffer.length < size ? 0 : buffer[pointer === size ? 0 : pointer];
          return buffer.length < resolution ? top : (top - btm) * resolution / buffer.length;
        };
      };
    }
  });

  // node_modules/progress-stream/index.js
  var require_progress_stream = __commonJS({
    "node_modules/progress-stream/index.js"(exports, module) {
      var through = require_through2();
      var speedometer = require_speedometer();
      module.exports = function(options, onprogress) {
        if (typeof options === "function") return module.exports(null, options);
        options = options || {};
        var length = options.length || 0;
        var time = options.time || 0;
        var drain = options.drain || false;
        var transferred = options.transferred || 0;
        var nextUpdate = Date.now() + time;
        var delta = 0;
        var speed = speedometer(options.speed || 5e3);
        var startTime = Date.now();
        var update = {
          percentage: 0,
          transferred,
          length,
          remaining: length,
          eta: 0,
          runtime: 0
        };
        var emit = function(ended) {
          update.delta = delta;
          update.percentage = ended ? 100 : length ? transferred / length * 100 : 0;
          update.speed = speed(delta);
          update.eta = Math.round(update.remaining / update.speed);
          update.runtime = parseInt((Date.now() - startTime) / 1e3);
          nextUpdate = Date.now() + time;
          delta = 0;
          tr.emit("progress", update);
        };
        var write = function(chunk, enc, callback) {
          var len = options.objectMode ? 1 : chunk.length;
          transferred += len;
          delta += len;
          update.transferred = transferred;
          update.remaining = length >= transferred ? length - transferred : 0;
          if (Date.now() >= nextUpdate) emit(false);
          callback(null, chunk);
        };
        var end = function(callback) {
          emit(true);
          callback();
        };
        var tr = through(options.objectMode ? { objectMode: true, highWaterMark: 16 } : {}, write, end);
        var onlength = function(newLength) {
          length = newLength;
          update.length = length;
          update.remaining = length - update.transferred;
          tr.emit("length", length);
        };
        tr.setLength = onlength;
        tr.on("pipe", function(stream) {
          if (typeof length === "number") return;
          if (stream.readable && !stream.writable && stream.headers) {
            return onlength(parseInt(stream.headers["content-length"] || 0));
          }
          if (typeof stream.length === "number") {
            return onlength(stream.length);
          }
          stream.on("response", function(res) {
            if (!res || !res.headers) return;
            if (res.headers["content-encoding"] === "gzip") return;
            if (res.headers["content-length"]) {
              return onlength(parseInt(res.headers["content-length"]));
            }
          });
        });
        if (drain) tr.resume();
        if (onprogress) tr.on("progress", onprogress);
        tr.progress = function() {
          update.speed = speed(0);
          update.eta = Math.round(update.remaining / update.speed);
          return update;
        };
        return tr;
      };
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/stream-browser.js
  var require_stream_browser2 = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports, module) {
      module.exports = require_events().EventEmitter;
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
      "use strict";
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var _require = require_buffer();
      var Buffer2 = _require.Buffer;
      var _require2 = require_util2();
      var inspect = _require2.inspect;
      var custom = inspect && inspect.custom || "inspect";
      function copyBuffer(src, target, offset) {
        Buffer2.prototype.copy.call(src, target, offset);
      }
      module.exports = /* @__PURE__ */ (function() {
        function BufferList() {
          _classCallCheck(this, BufferList);
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        _createClass(BufferList, [{
          key: "push",
          value: function push(v) {
            var entry = {
              data: v,
              next: null
            };
            if (this.length > 0) this.tail.next = entry;
            else this.head = entry;
            this.tail = entry;
            ++this.length;
          }
        }, {
          key: "unshift",
          value: function unshift(v) {
            var entry = {
              data: v,
              next: this.head
            };
            if (this.length === 0) this.tail = entry;
            this.head = entry;
            ++this.length;
          }
        }, {
          key: "shift",
          value: function shift() {
            if (this.length === 0) return;
            var ret = this.head.data;
            if (this.length === 1) this.head = this.tail = null;
            else this.head = this.head.next;
            --this.length;
            return ret;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.head = this.tail = null;
            this.length = 0;
          }
        }, {
          key: "join",
          value: function join(s) {
            if (this.length === 0) return "";
            var p = this.head;
            var ret = "" + p.data;
            while (p = p.next) ret += s + p.data;
            return ret;
          }
        }, {
          key: "concat",
          value: function concat(n) {
            if (this.length === 0) return Buffer2.alloc(0);
            var ret = Buffer2.allocUnsafe(n >>> 0);
            var p = this.head;
            var i = 0;
            while (p) {
              copyBuffer(p.data, ret, i);
              i += p.data.length;
              p = p.next;
            }
            return ret;
          }
          // Consumes a specified amount of bytes or characters from the buffered data.
        }, {
          key: "consume",
          value: function consume(n, hasStrings) {
            var ret;
            if (n < this.head.data.length) {
              ret = this.head.data.slice(0, n);
              this.head.data = this.head.data.slice(n);
            } else if (n === this.head.data.length) {
              ret = this.shift();
            } else {
              ret = hasStrings ? this._getString(n) : this._getBuffer(n);
            }
            return ret;
          }
        }, {
          key: "first",
          value: function first() {
            return this.head.data;
          }
          // Consumes a specified amount of characters from the buffered data.
        }, {
          key: "_getString",
          value: function _getString(n) {
            var p = this.head;
            var c = 1;
            var ret = p.data;
            n -= ret.length;
            while (p = p.next) {
              var str = p.data;
              var nb = n > str.length ? str.length : n;
              if (nb === str.length) ret += str;
              else ret += str.slice(0, n);
              n -= nb;
              if (n === 0) {
                if (nb === str.length) {
                  ++c;
                  if (p.next) this.head = p.next;
                  else this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = str.slice(nb);
                }
                break;
              }
              ++c;
            }
            this.length -= c;
            return ret;
          }
          // Consumes a specified amount of bytes from the buffered data.
        }, {
          key: "_getBuffer",
          value: function _getBuffer(n) {
            var ret = Buffer2.allocUnsafe(n);
            var p = this.head;
            var c = 1;
            p.data.copy(ret);
            n -= p.data.length;
            while (p = p.next) {
              var buf = p.data;
              var nb = n > buf.length ? buf.length : n;
              buf.copy(ret, ret.length - n, 0, nb);
              n -= nb;
              if (n === 0) {
                if (nb === buf.length) {
                  ++c;
                  if (p.next) this.head = p.next;
                  else this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = buf.slice(nb);
                }
                break;
              }
              ++c;
            }
            this.length -= c;
            return ret;
          }
          // Make sure the linked list only shows the minimal necessary information.
        }, {
          key: custom,
          value: function value(_, options) {
            return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
              // Only inspect one level.
              depth: 0,
              // It should not recurse.
              customInspect: false
            }));
          }
        }]);
        return BufferList;
      })();
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/destroy.js
  var require_destroy = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
      "use strict";
      function destroy(err, cb) {
        var _this = this;
        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;
        if (readableDestroyed || writableDestroyed) {
          if (cb) {
            cb(err);
          } else if (err) {
            if (!this._writableState) {
              process.nextTick(emitErrorNT, this, err);
            } else if (!this._writableState.errorEmitted) {
              this._writableState.errorEmitted = true;
              process.nextTick(emitErrorNT, this, err);
            }
          }
          return this;
        }
        if (this._readableState) {
          this._readableState.destroyed = true;
        }
        if (this._writableState) {
          this._writableState.destroyed = true;
        }
        this._destroy(err || null, function(err2) {
          if (!cb && err2) {
            if (!_this._writableState) {
              process.nextTick(emitErrorAndCloseNT, _this, err2);
            } else if (!_this._writableState.errorEmitted) {
              _this._writableState.errorEmitted = true;
              process.nextTick(emitErrorAndCloseNT, _this, err2);
            } else {
              process.nextTick(emitCloseNT, _this);
            }
          } else if (cb) {
            process.nextTick(emitCloseNT, _this);
            cb(err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        });
        return this;
      }
      function emitErrorAndCloseNT(self2, err) {
        emitErrorNT(self2, err);
        emitCloseNT(self2);
      }
      function emitCloseNT(self2) {
        if (self2._writableState && !self2._writableState.emitClose) return;
        if (self2._readableState && !self2._readableState.emitClose) return;
        self2.emit("close");
      }
      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }
        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finalCalled = false;
          this._writableState.prefinished = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      }
      function emitErrorNT(self2, err) {
        self2.emit("error", err);
      }
      function errorOrDestroy(stream, err) {
        var rState = stream._readableState;
        var wState = stream._writableState;
        if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
        else stream.emit("error", err);
      }
      module.exports = {
        destroy,
        undestroy,
        errorOrDestroy
      };
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/errors-browser.js
  var require_errors_browser = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/errors-browser.js"(exports, module) {
      "use strict";
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      var codes = {};
      function createErrorType(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        function getMessage(arg1, arg2, arg3) {
          if (typeof message === "string") {
            return message;
          } else {
            return message(arg1, arg2, arg3);
          }
        }
        var NodeError = /* @__PURE__ */ (function(_Base) {
          _inheritsLoose(NodeError2, _Base);
          function NodeError2(arg1, arg2, arg3) {
            return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
          }
          return NodeError2;
        })(Base);
        NodeError.prototype.name = Base.name;
        NodeError.prototype.code = code;
        codes[code] = NodeError;
      }
      function oneOf(expected, thing) {
        if (Array.isArray(expected)) {
          var len = expected.length;
          expected = expected.map(function(i) {
            return String(i);
          });
          if (len > 2) {
            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
          } else if (len === 2) {
            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
          } else {
            return "of ".concat(thing, " ").concat(expected[0]);
          }
        } else {
          return "of ".concat(thing, " ").concat(String(expected));
        }
      }
      function startsWith(str, search, pos) {
        return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      }
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function includes(str, search, start) {
        if (typeof start !== "number") {
          start = 0;
        }
        if (start + search.length > str.length) {
          return false;
        } else {
          return str.indexOf(search, start) !== -1;
        }
      }
      createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
        return 'The value "' + value + '" is invalid for option "' + name + '"';
      }, TypeError);
      createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
        var determiner;
        if (typeof expected === "string" && startsWith(expected, "not ")) {
          determiner = "must not be";
          expected = expected.replace(/^not /, "");
        } else {
          determiner = "must be";
        }
        var msg;
        if (endsWith(name, " argument")) {
          msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        } else {
          var type = includes(name, ".") ? "property" : "argument";
          msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
        }
        msg += ". Received type ".concat(typeof actual);
        return msg;
      }, TypeError);
      createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
      createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
        return "The " + name + " method is not implemented";
      });
      createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
      createErrorType("ERR_STREAM_DESTROYED", function(name) {
        return "Cannot call " + name + " after a stream was destroyed";
      });
      createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
      createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
      createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
      createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
      createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
        return "Unknown encoding: " + arg;
      }, TypeError);
      createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
      module.exports.codes = codes;
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/state.js
  var require_state = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
      "use strict";
      var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
      function highWaterMarkFrom(options, isDuplex, duplexKey) {
        return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
      }
      function getHighWaterMark(state, options, duplexKey, isDuplex) {
        var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
        if (hwm != null) {
          if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : "highWaterMark";
            throw new ERR_INVALID_OPT_VALUE(name, hwm);
          }
          return Math.floor(hwm);
        }
        return state.objectMode ? 16 : 16 * 1024;
      }
      module.exports = {
        getHighWaterMark
      };
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_writable.js
  var require_stream_writable2 = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
      "use strict";
      module.exports = Writable;
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function() {
          onCorkedFinish(_this, state);
        };
      }
      var Duplex;
      Writable.WritableState = WritableState;
      var internalUtil = {
        deprecate: require_node()
      };
      var Stream = require_stream_browser2();
      var Buffer2 = require_buffer().Buffer;
      var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer2.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var destroyImpl = require_destroy();
      var _require = require_state();
      var getHighWaterMark = _require.getHighWaterMark;
      var _require$codes = require_errors_browser().codes;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
      var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
      var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
      var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
      var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
      var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
      var errorOrDestroy = destroyImpl.errorOrDestroy;
      require_inherits()(Writable, Stream);
      function nop() {
      }
      function WritableState(options, stream, isDuplex) {
        Duplex = Duplex || require_stream_duplex2();
        options = options || {};
        if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
        this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
        this.finalCalled = false;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        this.destroyed = false;
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.emitClose = options.emitClose !== false;
        this.autoDestroy = !!options.autoDestroy;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      (function() {
        try {
          Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate(function writableStateBufferGetter() {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
          });
        } catch (_) {
        }
      })();
      var realHasInstance;
      if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
        realHasInstance = Function.prototype[Symbol.hasInstance];
        Object.defineProperty(Writable, Symbol.hasInstance, {
          value: function value(object) {
            if (realHasInstance.call(this, object)) return true;
            if (this !== Writable) return false;
            return object && object._writableState instanceof WritableState;
          }
        });
      } else {
        realHasInstance = function realHasInstance2(object) {
          return object instanceof this;
        };
      }
      function Writable(options) {
        Duplex = Duplex || require_stream_duplex2();
        var isDuplex = this instanceof Duplex;
        if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
        this._writableState = new WritableState(options, this, isDuplex);
        this.writable = true;
        if (options) {
          if (typeof options.write === "function") this._write = options.write;
          if (typeof options.writev === "function") this._writev = options.writev;
          if (typeof options.destroy === "function") this._destroy = options.destroy;
          if (typeof options.final === "function") this._final = options.final;
        }
        Stream.call(this);
      }
      Writable.prototype.pipe = function() {
        errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
      };
      function writeAfterEnd(stream, cb) {
        var er = new ERR_STREAM_WRITE_AFTER_END();
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
      }
      function validChunk(stream, state, chunk, cb) {
        var er;
        if (chunk === null) {
          er = new ERR_STREAM_NULL_VALUES();
        } else if (typeof chunk !== "string" && !state.objectMode) {
          er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
        }
        if (er) {
          errorOrDestroy(stream, er);
          process.nextTick(cb, er);
          return false;
        }
        return true;
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        var isBuf = !state.objectMode && _isUint8Array(chunk);
        if (isBuf && !Buffer2.isBuffer(chunk)) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (isBuf) encoding = "buffer";
        else if (!encoding) encoding = state.defaultEncoding;
        if (typeof cb !== "function") cb = nop;
        if (state.ending) writeAfterEnd(this, cb);
        else if (isBuf || validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        this._writableState.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string") encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      Object.defineProperty(Writable.prototype, "writableBuffer", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer();
        }
      });
      function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
          chunk = Buffer2.from(chunk, encoding);
        }
        return chunk;
      }
      Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark;
        }
      });
      function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
        if (!isBuf) {
          var newChunk = decodeChunk(state, chunk, encoding);
          if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
          }
        }
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        if (!ret) state.needDrain = true;
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = {
            chunk,
            encoding,
            isBuf,
            callback: cb,
            next: null
          };
          if (last) {
            last.next = state.lastBufferedRequest;
          } else {
            state.bufferedRequest = state.lastBufferedRequest;
          }
          state.bufferedRequestCount += 1;
        } else {
          doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
        else if (writev) stream._writev(chunk, state.onwrite);
        else stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) {
          process.nextTick(cb, er);
          process.nextTick(finishMaybe, stream, state);
          stream._writableState.errorEmitted = true;
          errorOrDestroy(stream, er);
        } else {
          cb(er);
          stream._writableState.errorEmitted = true;
          errorOrDestroy(stream, er);
          finishMaybe(stream, state);
        }
      }
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
        onwriteStateUpdate(state);
        if (er) onwriteError(stream, state, sync, er, cb);
        else {
          var finished = needFinish(state) || stream.destroyed;
          if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
          }
          if (sync) {
            process.nextTick(afterWrite, stream, state, finished, cb);
          } else {
            afterWrite(stream, state, finished, cb);
          }
        }
      }
      function afterWrite(stream, state, finished, cb) {
        if (!finished) onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          var allBuffers = true;
          while (entry) {
            buffer[count] = entry;
            if (!entry.isBuf) allBuffers = false;
            entry = entry.next;
            count += 1;
          }
          buffer.allBuffers = allBuffers;
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else {
            state.corkedRequestsFree = new CorkedRequest(state);
          }
          state.bufferedRequestCount = 0;
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--;
            if (state.writing) {
              break;
            }
          }
          if (entry === null) state.lastBufferedRequest = null;
        }
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending) endWritable(this, state, cb);
        return this;
      };
      Object.defineProperty(Writable.prototype, "writableLength", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._writableState.length;
        }
      });
      function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
      }
      function callFinal(stream, state) {
        stream._final(function(err) {
          state.pendingcb--;
          if (err) {
            errorOrDestroy(stream, err);
          }
          state.prefinished = true;
          stream.emit("prefinish");
          finishMaybe(stream, state);
        });
      }
      function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) {
          if (typeof stream._final === "function" && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick(callFinal, stream, state);
          } else {
            state.prefinished = true;
            stream.emit("prefinish");
          }
        }
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          prefinish(stream, state);
          if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit("finish");
            if (state.autoDestroy) {
              var rState = stream._readableState;
              if (!rState || rState.autoDestroy && rState.endEmitted) {
                stream.destroy();
              }
            }
          }
        }
        return need;
      }
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
          if (state.finished) process.nextTick(cb);
          else stream.once("finish", cb);
        }
        state.ended = true;
        stream.writable = false;
      }
      function onCorkedFinish(corkReq, state, err) {
        var entry = corkReq.entry;
        corkReq.entry = null;
        while (entry) {
          var cb = entry.callback;
          state.pendingcb--;
          cb(err);
          entry = entry.next;
        }
        state.corkedRequestsFree.next = corkReq;
      }
      Object.defineProperty(Writable.prototype, "destroyed", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          if (this._writableState === void 0) {
            return false;
          }
          return this._writableState.destroyed;
        },
        set: function set(value) {
          if (!this._writableState) {
            return;
          }
          this._writableState.destroyed = value;
        }
      });
      Writable.prototype.destroy = destroyImpl.destroy;
      Writable.prototype._undestroy = destroyImpl.undestroy;
      Writable.prototype._destroy = function(err, cb) {
        cb(err);
      };
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_duplex.js
  var require_stream_duplex2 = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
      "use strict";
      var objectKeys = Object.keys || function(obj) {
        var keys2 = [];
        for (var key in obj) keys2.push(key);
        return keys2;
      };
      module.exports = Duplex;
      var Readable2 = require_stream_readable2();
      var Writable = require_stream_writable2();
      require_inherits()(Duplex, Readable2);
      {
        keys = objectKeys(Writable.prototype);
        for (v = 0; v < keys.length; v++) {
          method = keys[v];
          if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      var keys;
      var method;
      var v;
      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);
        Readable2.call(this, options);
        Writable.call(this, options);
        this.allowHalfOpen = true;
        if (options) {
          if (options.readable === false) this.readable = false;
          if (options.writable === false) this.writable = false;
          if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once("end", onend);
          }
        }
      }
      Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark;
        }
      });
      Object.defineProperty(Duplex.prototype, "writableBuffer", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer();
        }
      });
      Object.defineProperty(Duplex.prototype, "writableLength", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._writableState.length;
        }
      });
      function onend() {
        if (this._writableState.ended) return;
        process.nextTick(onEndNT, this);
      }
      function onEndNT(self2) {
        self2.end();
      }
      Object.defineProperty(Duplex.prototype, "destroyed", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function set(value) {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return;
          }
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      });
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports, module) {
      var buffer = require_buffer();
      var Buffer2 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer2(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer2.prototype);
      copyProps(Buffer2, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer2(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer2(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer2(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder2 = __commonJS({
    "node_modules/string_decoder/lib/string_decoder.js"(exports) {
      "use strict";
      var Buffer2 = require_safe_buffer().Buffer;
      var isEncoding = Buffer2.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc) return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried) return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer2.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0) return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0) return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127) return 0;
        else if (byte >> 5 === 6) return 2;
        else if (byte >> 4 === 14) return 3;
        else if (byte >> 3 === 30) return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self2, buf, i) {
        var j = buf.length - 1;
        if (j < i) return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self2.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2) nb = 0;
            else self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf, p) {
        if ((buf[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "\uFFFD";
        }
        if (self2.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "\uFFFD";
          }
          if (self2.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self2.lastNeed = 2;
              return "\uFFFD";
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf, p);
        if (r !== void 0) return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed) return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + "\uFFFD";
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0) return buf.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/end-of-stream.js
  var require_end_of_stream = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
      "use strict";
      var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
      function once(callback) {
        var called = false;
        return function() {
          if (called) return;
          called = true;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          callback.apply(this, args);
        };
      }
      function noop() {
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function eos(stream, opts, callback) {
        if (typeof opts === "function") return eos(stream, null, opts);
        if (!opts) opts = {};
        callback = once(callback || noop);
        var readable = opts.readable || opts.readable !== false && stream.readable;
        var writable = opts.writable || opts.writable !== false && stream.writable;
        var onlegacyfinish = function onlegacyfinish2() {
          if (!stream.writable) onfinish();
        };
        var writableEnded = stream._writableState && stream._writableState.finished;
        var onfinish = function onfinish2() {
          writable = false;
          writableEnded = true;
          if (!readable) callback.call(stream);
        };
        var readableEnded = stream._readableState && stream._readableState.endEmitted;
        var onend = function onend2() {
          readable = false;
          readableEnded = true;
          if (!writable) callback.call(stream);
        };
        var onerror = function onerror2(err) {
          callback.call(stream, err);
        };
        var onclose = function onclose2() {
          var err;
          if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
          }
          if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
          }
        };
        var onrequest = function onrequest2() {
          stream.req.on("finish", onfinish);
        };
        if (isRequest(stream)) {
          stream.on("complete", onfinish);
          stream.on("abort", onclose);
          if (stream.req) onrequest();
          else stream.on("request", onrequest);
        } else if (writable && !stream._writableState) {
          stream.on("end", onlegacyfinish);
          stream.on("close", onlegacyfinish);
        }
        stream.on("end", onend);
        stream.on("finish", onfinish);
        if (opts.error !== false) stream.on("error", onerror);
        stream.on("close", onclose);
        return function() {
          stream.removeListener("complete", onfinish);
          stream.removeListener("abort", onclose);
          stream.removeListener("request", onrequest);
          if (stream.req) stream.req.removeListener("finish", onfinish);
          stream.removeListener("end", onlegacyfinish);
          stream.removeListener("close", onlegacyfinish);
          stream.removeListener("finish", onfinish);
          stream.removeListener("end", onend);
          stream.removeListener("error", onerror);
          stream.removeListener("close", onclose);
        };
      }
      module.exports = eos;
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/async_iterator.js
  var require_async_iterator = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
      "use strict";
      var _Object$setPrototypeO;
      function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var finished = require_end_of_stream();
      var kLastResolve = /* @__PURE__ */ Symbol("lastResolve");
      var kLastReject = /* @__PURE__ */ Symbol("lastReject");
      var kError = /* @__PURE__ */ Symbol("error");
      var kEnded = /* @__PURE__ */ Symbol("ended");
      var kLastPromise = /* @__PURE__ */ Symbol("lastPromise");
      var kHandlePromise = /* @__PURE__ */ Symbol("handlePromise");
      var kStream = /* @__PURE__ */ Symbol("stream");
      function createIterResult(value, done) {
        return {
          value,
          done
        };
      }
      function readAndResolve(iter) {
        var resolve = iter[kLastResolve];
        if (resolve !== null) {
          var data = iter[kStream].read();
          if (data !== null) {
            iter[kLastPromise] = null;
            iter[kLastResolve] = null;
            iter[kLastReject] = null;
            resolve(createIterResult(data, false));
          }
        }
      }
      function onReadable(iter) {
        process.nextTick(readAndResolve, iter);
      }
      function wrapForNext(lastPromise, iter) {
        return function(resolve, reject) {
          lastPromise.then(function() {
            if (iter[kEnded]) {
              resolve(createIterResult(void 0, true));
              return;
            }
            iter[kHandlePromise](resolve, reject);
          }, reject);
        };
      }
      var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
      });
      var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
        get stream() {
          return this[kStream];
        },
        next: function next() {
          var _this = this;
          var error = this[kError];
          if (error !== null) {
            return Promise.reject(error);
          }
          if (this[kEnded]) {
            return Promise.resolve(createIterResult(void 0, true));
          }
          if (this[kStream].destroyed) {
            return new Promise(function(resolve, reject) {
              process.nextTick(function() {
                if (_this[kError]) {
                  reject(_this[kError]);
                } else {
                  resolve(createIterResult(void 0, true));
                }
              });
            });
          }
          var lastPromise = this[kLastPromise];
          var promise;
          if (lastPromise) {
            promise = new Promise(wrapForNext(lastPromise, this));
          } else {
            var data = this[kStream].read();
            if (data !== null) {
              return Promise.resolve(createIterResult(data, false));
            }
            promise = new Promise(this[kHandlePromise]);
          }
          this[kLastPromise] = promise;
          return promise;
        }
      }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
        return this;
      }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
        var _this2 = this;
        return new Promise(function(resolve, reject) {
          _this2[kStream].destroy(null, function(err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(createIterResult(void 0, true));
          });
        });
      }), _Object$setPrototypeO), AsyncIteratorPrototype);
      var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
        var _Object$create;
        var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
          value: stream,
          writable: true
        }), _defineProperty(_Object$create, kLastResolve, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kLastReject, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kError, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kEnded, {
          value: stream._readableState.endEmitted,
          writable: true
        }), _defineProperty(_Object$create, kHandlePromise, {
          value: function value(resolve, reject) {
            var data = iterator[kStream].read();
            if (data) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              resolve(createIterResult(data, false));
            } else {
              iterator[kLastResolve] = resolve;
              iterator[kLastReject] = reject;
            }
          },
          writable: true
        }), _Object$create));
        iterator[kLastPromise] = null;
        finished(stream, function(err) {
          if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var reject = iterator[kLastReject];
            if (reject !== null) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              reject(err);
            }
            iterator[kError] = err;
            return;
          }
          var resolve = iterator[kLastResolve];
          if (resolve !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(void 0, true));
          }
          iterator[kEnded] = true;
        });
        stream.on("readable", onReadable.bind(null, iterator));
        return iterator;
      };
      module.exports = createReadableStreamAsyncIterator;
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/from-browser.js
  var require_from_browser = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports, module) {
      module.exports = function() {
        throw new Error("Readable.from is not available in the browser");
      };
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_readable.js
  var require_stream_readable2 = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
      "use strict";
      module.exports = Readable2;
      var Duplex;
      Readable2.ReadableState = ReadableState;
      var EE = require_events().EventEmitter;
      var EElistenerCount = function EElistenerCount2(emitter, type) {
        return emitter.listeners(type).length;
      };
      var Stream = require_stream_browser2();
      var Buffer2 = require_buffer().Buffer;
      var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer2.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var debugUtil = require_util2();
      var debug;
      if (debugUtil && debugUtil.debuglog) {
        debug = debugUtil.debuglog("stream");
      } else {
        debug = function debug2() {
        };
      }
      var BufferList = require_buffer_list();
      var destroyImpl = require_destroy();
      var _require = require_state();
      var getHighWaterMark = _require.getHighWaterMark;
      var _require$codes = require_errors_browser().codes;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
      var StringDecoder;
      var createReadableStreamAsyncIterator;
      var from;
      require_inherits()(Readable2, Stream);
      var errorOrDestroy = destroyImpl.errorOrDestroy;
      var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
        if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
        else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
        else emitter._events[event] = [fn, emitter._events[event]];
      }
      function ReadableState(options, stream, isDuplex) {
        Duplex = Duplex || require_stream_duplex2();
        options = options || {};
        if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
        this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.paused = true;
        this.emitClose = options.emitClose !== false;
        this.autoDestroy = !!options.autoDestroy;
        this.destroyed = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          if (!StringDecoder) StringDecoder = require_string_decoder2().StringDecoder;
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable2(options) {
        Duplex = Duplex || require_stream_duplex2();
        if (!(this instanceof Readable2)) return new Readable2(options);
        var isDuplex = this instanceof Duplex;
        this._readableState = new ReadableState(options, this, isDuplex);
        this.readable = true;
        if (options) {
          if (typeof options.read === "function") this._read = options.read;
          if (typeof options.destroy === "function") this._destroy = options.destroy;
        }
        Stream.call(this);
      }
      Object.defineProperty(Readable2.prototype, "destroyed", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          if (this._readableState === void 0) {
            return false;
          }
          return this._readableState.destroyed;
        },
        set: function set(value) {
          if (!this._readableState) {
            return;
          }
          this._readableState.destroyed = value;
        }
      });
      Readable2.prototype.destroy = destroyImpl.destroy;
      Readable2.prototype._undestroy = destroyImpl.undestroy;
      Readable2.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Readable2.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        var skipChunkCheck;
        if (!state.objectMode) {
          if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
              chunk = Buffer2.from(chunk, encoding);
              encoding = "";
            }
            skipChunkCheck = true;
          }
        } else {
          skipChunkCheck = true;
        }
        return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
      };
      Readable2.prototype.unshift = function(chunk) {
        return readableAddChunk(this, chunk, null, true, false);
      };
      function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
        debug("readableAddChunk", chunk);
        var state = stream._readableState;
        if (chunk === null) {
          state.reading = false;
          onEofChunk(stream, state);
        } else {
          var er;
          if (!skipChunkCheck) er = chunkInvalid(state, chunk);
          if (er) {
            errorOrDestroy(stream, er);
          } else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
              chunk = _uint8ArrayToBuffer(chunk);
            }
            if (addToFront) {
              if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
              else addChunk(stream, state, chunk, true);
            } else if (state.ended) {
              errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
            } else if (state.destroyed) {
              return false;
            } else {
              state.reading = false;
              if (state.decoder && !encoding) {
                chunk = state.decoder.write(chunk);
                if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
                else maybeReadMore(stream, state);
              } else {
                addChunk(stream, state, chunk, false);
              }
            }
          } else if (!addToFront) {
            state.reading = false;
            maybeReadMore(stream, state);
          }
        }
        return !state.ended && (state.length < state.highWaterMark || state.length === 0);
      }
      function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && state.length === 0 && !state.sync) {
          state.awaitDrain = 0;
          stream.emit("data", chunk);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);
          else state.buffer.push(chunk);
          if (state.needReadable) emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
      function chunkInvalid(state, chunk) {
        var er;
        if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
          er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
        return er;
      }
      Readable2.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      Readable2.prototype.setEncoding = function(enc) {
        if (!StringDecoder) StringDecoder = require_string_decoder2().StringDecoder;
        var decoder = new StringDecoder(enc);
        this._readableState.decoder = decoder;
        this._readableState.encoding = this._readableState.decoder.encoding;
        var p = this._readableState.buffer.head;
        var content = "";
        while (p !== null) {
          content += decoder.write(p.data);
          p = p.next;
        }
        this._readableState.buffer.clear();
        if (content !== "") this._readableState.buffer.push(content);
        this._readableState.length = content.length;
        return this;
      };
      var MAX_HWM = 1073741824;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
          n = MAX_HWM;
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended) return 0;
        if (state.objectMode) return 1;
        if (n !== n) {
          if (state.flowing && state.length) return state.buffer.head.data.length;
          else return state.length;
        }
        if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length) return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      Readable2.prototype.read = function(n) {
        debug("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0) state.emittedReadable = false;
        if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended) endReadable(this);
          else emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0) endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug("reading or ended", doRead);
        } else if (doRead) {
          debug("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0) state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading) n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0) ret = fromList(n, state);
        else ret = null;
        if (ret === null) {
          state.needReadable = state.length <= state.highWaterMark;
          n = 0;
        } else {
          state.length -= n;
          state.awaitDrain = 0;
        }
        if (state.length === 0) {
          if (!state.ended) state.needReadable = true;
          if (nOrig !== n && state.ended) endReadable(this);
        }
        if (ret !== null) this.emit("data", ret);
        return ret;
      };
      function onEofChunk(stream, state) {
        debug("onEofChunk");
        if (state.ended) return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        if (state.sync) {
          emitReadable(stream);
        } else {
          state.needReadable = false;
          if (!state.emittedReadable) {
            state.emittedReadable = true;
            emitReadable_(stream);
          }
        }
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        debug("emitReadable", state.needReadable, state.emittedReadable);
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          process.nextTick(emitReadable_, stream);
        }
      }
      function emitReadable_(stream) {
        var state = stream._readableState;
        debug("emitReadable_", state.destroyed, state.length, state.ended);
        if (!state.destroyed && (state.length || state.ended)) {
          stream.emit("readable");
          state.emittedReadable = false;
        }
        state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          process.nextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
          var len = state.length;
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
        }
        state.readingMore = false;
      }
      Readable2.prototype._read = function(n) {
        errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
      };
      Readable2.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
        var endFn = doEnd ? onend : unpipe;
        if (state.endEmitted) process.nextTick(endFn);
        else src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe");
          if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
              unpipeInfo.hasUnpiped = true;
              cleanup();
            }
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", unpipe);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
        }
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          var ret = dest.write(chunk);
          debug("dest.write", ret);
          if (ret === false) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
              debug("false write response, pause", state.awaitDrain);
              state.awaitDrain++;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function pipeOnDrainFunctionResult() {
          var state = src._readableState;
          debug("pipeOnDrain", state.awaitDrain);
          if (state.awaitDrain) state.awaitDrain--;
          if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      Readable2.prototype.unpipe = function(dest) {
        var state = this._readableState;
        var unpipeInfo = {
          hasUnpiped: false
        };
        if (state.pipesCount === 0) return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes) return this;
          if (!dest) dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest) dest.emit("unpipe", this, unpipeInfo);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
          return this;
        }
        var index = indexOf(state.pipes, dest);
        if (index === -1) return this;
        state.pipes.splice(index, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1) state.pipes = state.pipes[0];
        dest.emit("unpipe", this, unpipeInfo);
        return this;
      };
      Readable2.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn);
        var state = this._readableState;
        if (ev === "data") {
          state.readableListening = this.listenerCount("readable") > 0;
          if (state.flowing !== false) this.resume();
        } else if (ev === "readable") {
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) {
              emitReadable(this);
            } else if (!state.reading) {
              process.nextTick(nReadingNextTick, this);
            }
          }
        }
        return res;
      };
      Readable2.prototype.addListener = Readable2.prototype.on;
      Readable2.prototype.removeListener = function(ev, fn) {
        var res = Stream.prototype.removeListener.call(this, ev, fn);
        if (ev === "readable") {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      Readable2.prototype.removeAllListeners = function(ev) {
        var res = Stream.prototype.removeAllListeners.apply(this, arguments);
        if (ev === "readable" || ev === void 0) {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      function updateReadableListening(self2) {
        var state = self2._readableState;
        state.readableListening = self2.listenerCount("readable") > 0;
        if (state.resumeScheduled && !state.paused) {
          state.flowing = true;
        } else if (self2.listenerCount("data") > 0) {
          self2.resume();
        }
      }
      function nReadingNextTick(self2) {
        debug("readable nexttick read 0");
        self2.read(0);
      }
      Readable2.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = !state.readableListening;
          resume(this, state);
        }
        state.paused = false;
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          process.nextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        debug("resume", state.reading);
        if (!state.reading) {
          stream.read(0);
        }
        state.resumeScheduled = false;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading) stream.read(0);
      }
      Readable2.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (this._readableState.flowing !== false) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        this._readableState.paused = true;
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && stream.read() !== null) ;
      }
      Readable2.prototype.wrap = function(stream) {
        var _this = this;
        var state = this._readableState;
        var paused = false;
        stream.on("end", function() {
          debug("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) _this.push(chunk);
          }
          _this.push(null);
        });
        stream.on("data", function(chunk) {
          debug("wrapped data");
          if (state.decoder) chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0)) return;
          else if (!state.objectMode && (!chunk || !chunk.length)) return;
          var ret = _this.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = /* @__PURE__ */ (function methodWrap(method) {
              return function methodWrapReturnFunction() {
                return stream[method].apply(stream, arguments);
              };
            })(i);
          }
        }
        for (var n = 0; n < kProxyEvents.length; n++) {
          stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
        }
        this._read = function(n2) {
          debug("wrapped _read", n2);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return this;
      };
      if (typeof Symbol === "function") {
        Readable2.prototype[Symbol.asyncIterator] = function() {
          if (createReadableStreamAsyncIterator === void 0) {
            createReadableStreamAsyncIterator = require_async_iterator();
          }
          return createReadableStreamAsyncIterator(this);
        };
      }
      Object.defineProperty(Readable2.prototype, "readableHighWaterMark", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._readableState.highWaterMark;
        }
      });
      Object.defineProperty(Readable2.prototype, "readableBuffer", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._readableState && this._readableState.buffer;
        }
      });
      Object.defineProperty(Readable2.prototype, "readableFlowing", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._readableState.flowing;
        },
        set: function set(state) {
          if (this._readableState) {
            this._readableState.flowing = state;
          }
        }
      });
      Readable2._fromList = fromList;
      Object.defineProperty(Readable2.prototype, "readableLength", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
          return this._readableState.length;
        }
      });
      function fromList(n, state) {
        if (state.length === 0) return null;
        var ret;
        if (state.objectMode) ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder) ret = state.buffer.join("");
          else if (state.buffer.length === 1) ret = state.buffer.first();
          else ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = state.buffer.consume(n, state.decoder);
        }
        return ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        debug("endReadable", state.endEmitted);
        if (!state.endEmitted) {
          state.ended = true;
          process.nextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        debug("endReadableNT", state.endEmitted, state.length);
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
          if (state.autoDestroy) {
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) {
              stream.destroy();
            }
          }
        }
      }
      if (typeof Symbol === "function") {
        Readable2.from = function(iterable, opts) {
          if (from === void 0) {
            from = require_from_browser();
          }
          return from(Readable2, iterable, opts);
        };
      }
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) return i;
        }
        return -1;
      }
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_transform.js
  var require_stream_transform2 = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
      "use strict";
      module.exports = Transform;
      var _require$codes = require_errors_browser().codes;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
      var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
      var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
      var Duplex = require_stream_duplex2();
      require_inherits()(Transform, Duplex);
      function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (cb === null) {
          return this.emit("error", new ERR_MULTIPLE_CALLBACK());
        }
        ts.writechunk = null;
        ts.writecb = null;
        if (data != null)
          this.push(data);
        cb(er);
        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          this._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform)) return new Transform(options);
        Duplex.call(this, options);
        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null
        };
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function") this._transform = options.transform;
          if (typeof options.flush === "function") this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function prefinish() {
        var _this = this;
        if (typeof this._flush === "function" && !this._readableState.destroyed) {
          this._flush(function(er, data) {
            done(_this, er, data);
          });
        } else {
          done(this, null, null);
        }
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      Transform.prototype._destroy = function(err, cb) {
        Duplex.prototype._destroy.call(this, err, function(err2) {
          cb(err2);
        });
      };
      function done(stream, er, data) {
        if (er) return stream.emit("error", er);
        if (data != null)
          stream.push(data);
        if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
        if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
        return stream.push(null);
      }
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_passthrough.js
  var require_stream_passthrough2 = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
      "use strict";
      module.exports = PassThrough;
      var Transform = require_stream_transform2();
      require_inherits()(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough)) return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/pipeline.js
  var require_pipeline = __commonJS({
    "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
      "use strict";
      var eos;
      function once(callback) {
        var called = false;
        return function() {
          if (called) return;
          called = true;
          callback.apply(void 0, arguments);
        };
      }
      var _require$codes = require_errors_browser().codes;
      var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
      var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
      function noop(err) {
        if (err) throw err;
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function destroyer(stream, reading, writing, callback) {
        callback = once(callback);
        var closed = false;
        stream.on("close", function() {
          closed = true;
        });
        if (eos === void 0) eos = require_end_of_stream();
        eos(stream, {
          readable: reading,
          writable: writing
        }, function(err) {
          if (err) return callback(err);
          closed = true;
          callback();
        });
        var destroyed = false;
        return function(err) {
          if (closed) return;
          if (destroyed) return;
          destroyed = true;
          if (isRequest(stream)) return stream.abort();
          if (typeof stream.destroy === "function") return stream.destroy();
          callback(err || new ERR_STREAM_DESTROYED("pipe"));
        };
      }
      function call(fn) {
        fn();
      }
      function pipe(from, to) {
        return from.pipe(to);
      }
      function popCallback(streams) {
        if (!streams.length) return noop;
        if (typeof streams[streams.length - 1] !== "function") return noop;
        return streams.pop();
      }
      function pipeline() {
        for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
          streams[_key] = arguments[_key];
        }
        var callback = popCallback(streams);
        if (Array.isArray(streams[0])) streams = streams[0];
        if (streams.length < 2) {
          throw new ERR_MISSING_ARGS("streams");
        }
        var error;
        var destroys = streams.map(function(stream, i) {
          var reading = i < streams.length - 1;
          var writing = i > 0;
          return destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach(call);
            if (reading) return;
            destroys.forEach(call);
            callback(error);
          });
        });
        return streams.reduce(pipe);
      }
      module.exports = pipeline;
    }
  });

  // node_modules/stream-browserify/index.js
  var require_stream_browserify = __commonJS({
    "node_modules/stream-browserify/index.js"(exports, module) {
      module.exports = Stream;
      var EE = require_events().EventEmitter;
      var inherits = require_inherits();
      inherits(Stream, EE);
      Stream.Readable = require_stream_readable2();
      Stream.Writable = require_stream_writable2();
      Stream.Duplex = require_stream_duplex2();
      Stream.Transform = require_stream_transform2();
      Stream.PassThrough = require_stream_passthrough2();
      Stream.finished = require_end_of_stream();
      Stream.pipeline = require_pipeline();
      Stream.Stream = Stream;
      function Stream() {
        EE.call(this);
      }
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend);
          source.on("close", onclose);
        }
        var didOnEnd = false;
        function onend() {
          if (didOnEnd) return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd) return;
          didOnEnd = true;
          if (typeof dest.destroy === "function") dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (EE.listenerCount(this, "error") === 0) {
            throw er;
          }
        }
        source.on("error", onerror);
        dest.on("error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
    }
  });

  // node_modules/ebml/lib/ebml/tools.js
  var require_tools = __commonJS({
    "node_modules/ebml/lib/ebml/tools.js"(exports, module) {
      var tools = {
        readVint: function(buffer, start) {
          start = start || 0;
          for (var length = 1; length <= 8; length++) {
            if (buffer[start] >= Math.pow(2, 8 - length)) {
              break;
            }
          }
          if (length > 8) {
            throw new Error("Unrepresentable length: " + length + " " + buffer.toString("hex", start, start + length));
          }
          if (start + length > buffer.length) {
            return null;
          }
          var value = buffer[start] & (1 << 8 - length) - 1;
          for (var i = 1; i < length; i++) {
            if (i === 7) {
              if (value >= Math.pow(2, 53 - 8) && buffer[start + 7] > 0) {
                return {
                  length,
                  value: -1
                };
              }
            }
            value *= Math.pow(2, 8);
            value += buffer[start + i];
          }
          return {
            length,
            value
          };
        },
        writeVint: function(value) {
          if (value < 0 || value > Math.pow(2, 53)) {
            throw new Error("Unrepresentable value: " + value);
          }
          for (var length = 1; length <= 8; length++) {
            if (value < Math.pow(2, 7 * length) - 1) {
              break;
            }
          }
          var buffer = new Buffer(length);
          for (var i = 1; i <= length; i++) {
            var b = value & 255;
            buffer[length - i] = b;
            value -= b;
            value /= Math.pow(2, 8);
          }
          buffer[0] = buffer[0] | 1 << 8 - length;
          return buffer;
        }
      };
      module.exports = tools;
    }
  });

  // node_modules/ebml/lib/ebml/schema.js
  var require_schema = __commonJS({
    "node_modules/ebml/lib/ebml/schema.js"(exports, module) {
      var schema = {
        "80": {
          "name": "ChapterDisplay",
          "level": "4",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "webm": "1",
          "description": "Contains all possible strings to use for the chapter display."
        },
        "83": {
          "name": "TrackType",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "range": "1-254",
          "description": "A set of track types coded on 8 bits (1: video, 2: audio, 3: complex, 0x10: logo, 0x11: subtitle, 0x12: buttons, 0x20: control)."
        },
        "85": {
          "name": "ChapString",
          "cppname": "ChapterString",
          "level": "5",
          "type": "8",
          "mandatory": "1",
          "minver": "1",
          "webm": "1",
          "description": "Contains the string to use as the chapter atom."
        },
        "86": {
          "name": "CodecID",
          "level": "3",
          "type": "s",
          "mandatory": "1",
          "minver": "1",
          "description": "An ID corresponding to the codec, see the codec page for more info."
        },
        "88": {
          "name": "FlagDefault",
          "cppname": "TrackFlagDefault",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "default": "1",
          "range": "0-1",
          "description": "Set if that track (audio, video or subs) SHOULD be active if no language found matches the user preference. (1 bit)"
        },
        "89": {
          "name": "ChapterTrackNumber",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "range": "not 0",
          "description": "UID of the Track to apply this chapter too. In the absense of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absense of this element indicates that the Chapter should be applied to any currently used Tracks."
        },
        "91": {
          "name": "ChapterTimeStart",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "1",
          "description": "Timestamp of the start of Chapter (not scaled)."
        },
        "92": {
          "name": "ChapterTimeEnd",
          "level": "4",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "description": "Timestamp of the end of Chapter (timestamp excluded, not scaled)."
        },
        "96": {
          "name": "CueRefTime",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "minver": "2",
          "webm": "0",
          "description": "Timestamp of the referenced Block."
        },
        "97": {
          "name": "CueRefCluster",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "webm": "0",
          "description": "The Position of the Cluster containing the referenced Block."
        },
        "98": {
          "name": "ChapterFlagHidden",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "range": "0-1",
          "description": "If a chapter is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)"
        },
        "4254": {
          "name": "ContentCompAlgo",
          "level": "6",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "br": [
            "",
            "",
            "",
            ""
          ],
          "del": [
            "1 - bzlib,",
            "2 - lzo1x"
          ],
          "description": "The compression algorithm used. Algorithms that have been specified so far are: 0 - zlib,   3 - Header Stripping"
        },
        "4255": {
          "name": "ContentCompSettings",
          "level": "6",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": "Settings that might be needed by the decompressor. For Header Stripping (ContentCompAlgo=3), the bytes that were removed from the beggining of each frames of the track."
        },
        "4282": {
          "name": "DocType",
          "level": "1",
          "type": "s",
          "mandatory": "1",
          "default": "matroska",
          "minver": "1",
          "description": "A string that describes the type of document that follows this EBML header. 'matroska' in our case or 'webm' for webm files."
        },
        "4285": {
          "name": "DocTypeReadVersion",
          "level": "1",
          "type": "u",
          "mandatory": "1",
          "default": "1",
          "minver": "1",
          "description": "The minimum DocType version an interpreter has to support to read this file."
        },
        "4286": {
          "name": "EBMLVersion",
          "level": "1",
          "type": "u",
          "mandatory": "1",
          "default": "1",
          "minver": "1",
          "description": "The version of EBML parser used to create the file."
        },
        "4287": {
          "name": "DocTypeVersion",
          "level": "1",
          "type": "u",
          "mandatory": "1",
          "default": "1",
          "minver": "1",
          "description": "The version of DocType interpreter used to create the file."
        },
        "4444": {
          "name": "SegmentFamily",
          "level": "2",
          "type": "b",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "bytesize": "16",
          "description": "A randomly generated unique ID that all segments related to each other must use (128 bits)."
        },
        "4461": {
          "name": "DateUTC",
          "level": "2",
          "type": "d",
          "minver": "1",
          "description": "Date of the origin of timestamp (value 0), i.e. production date."
        },
        "4484": {
          "name": "TagDefault",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "1",
          "range": "0-1",
          "description": "Indication to know if this is the default/original language to use for the given tag. (1 bit)"
        },
        "4485": {
          "name": "TagBinary",
          "level": "4",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": "The values of the Tag if it is binary. Note that this cannot be used in the same SimpleTag as TagString."
        },
        "4487": {
          "name": "TagString",
          "level": "4",
          "type": "8",
          "minver": "1",
          "webm": "0",
          "description": "The value of the Tag."
        },
        "4489": {
          "name": "Duration",
          "level": "2",
          "type": "f",
          "minver": "1",
          "range": "> 0",
          "description": "Duration of the segment (based on TimecodeScale)."
        },
        "4598": {
          "name": "ChapterFlagEnabled",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "1",
          "range": "0-1",
          "description": "Specify wether the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie should skip all the content between the TimeStart and TimeEnd of this chapter (see flag notes). (1 bit)"
        },
        "4660": {
          "name": "FileMimeType",
          "level": "3",
          "type": "s",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "MIME type of the file."
        },
        "4661": {
          "name": "FileUsedStartTime",
          "level": "3",
          "type": "u",
          "divx": "1",
          "description": "DivX font extension"
        },
        "4662": {
          "name": "FileUsedEndTime",
          "level": "3",
          "type": "u",
          "divx": "1",
          "description": "DivX font extension"
        },
        "4675": {
          "name": "FileReferral",
          "level": "3",
          "type": "b",
          "webm": "0",
          "description": "A binary value that a track/codec can refer to when the attachment is needed."
        },
        "5031": {
          "name": "ContentEncodingOrder",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder elements in the segment."
        },
        "5032": {
          "name": "ContentEncodingScope",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "1",
          "range": "not 0",
          "br": [
            "",
            "",
            ""
          ],
          "description": "A bit field that describes which elements have been modified in this way. Values (big endian) can be OR'ed. Possible values: 1 - all frame contents, 2 - the track's private data, 4 - the next ContentEncoding (next ContentEncodingOrder. Either the data inside ContentCompression and/or ContentEncryption)"
        },
        "5033": {
          "name": "ContentEncodingType",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "br": [
            "",
            ""
          ],
          "description": "A value describing what kind of transformation has been done. Possible values: 0 - compression, 1 - encryption"
        },
        "5034": {
          "name": "ContentCompression",
          "level": "5",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "Settings describing the compression used. Must be present if the value of ContentEncodingType is 0 and absent otherwise. Each block must be decompressable even if no previous block is available in order not to prevent seeking."
        },
        "5035": {
          "name": "ContentEncryption",
          "level": "5",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "Settings describing the encryption used. Must be present if the value of ContentEncodingType is 1 and absent otherwise."
        },
        "5378": {
          "name": "CueBlockNumber",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "1",
          "range": "not 0",
          "description": "Number of the Block in the specified Cluster."
        },
        "5654": {
          "name": "ChapterStringUID",
          "level": "4",
          "type": "8",
          "mandatory": "0",
          "minver": "3",
          "webm": "1",
          "description": "A unique string ID to identify the Chapter. Use for WebVTT cue identifier storage."
        },
        "5741": {
          "name": "WritingApp",
          "level": "2",
          "type": "8",
          "mandatory": "1",
          "minver": "1",
          "description": 'Writing application ("mkvmerge-0.3.3").'
        },
        "5854": {
          "name": "SilentTracks",
          "cppname": "ClusterSilentTracks",
          "level": "2",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking. Then you should decide what track to use."
        },
        "6240": {
          "name": "ContentEncoding",
          "level": "4",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Settings for one content encoding like compression or encryption."
        },
        "6264": {
          "name": "BitDepth",
          "cppname": "AudioBitDepth",
          "level": "4",
          "type": "u",
          "minver": "1",
          "range": "not 0",
          "description": "Bits per sample, mostly used for PCM."
        },
        "6532": {
          "name": "SignedElement",
          "level": "3",
          "type": "b",
          "multiple": "1",
          "webm": "0",
          "description": "An element ID whose data will be used to compute the signature."
        },
        "6624": {
          "name": "TrackTranslate",
          "level": "3",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "The track identification for the given Chapter Codec."
        },
        "6911": {
          "name": "ChapProcessCommand",
          "cppname": "ChapterProcessCommand",
          "level": "5",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Contains all the commands associated to the Atom."
        },
        "6922": {
          "name": "ChapProcessTime",
          "cppname": "ChapterProcessTime",
          "level": "6",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "Defines when the process command should be handled (0: during the whole chapter, 1: before starting playback, 2: after playback of the chapter)."
        },
        "6924": {
          "name": "ChapterTranslate",
          "level": "2",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "A tuple of corresponding ID used by chapter codecs to represent this segment."
        },
        "6933": {
          "name": "ChapProcessData",
          "cppname": "ChapterProcessData",
          "level": "6",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "Contains the command information. The data should be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands."
        },
        "6944": {
          "name": "ChapProcess",
          "cppname": "ChapterProcess",
          "level": "4",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Contains all the commands associated to the Atom."
        },
        "6955": {
          "name": "ChapProcessCodecID",
          "cppname": "ChapterProcessCodecID",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used. More codec IDs can be added later."
        },
        "7373": {
          "name": "Tag",
          "level": "2",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Element containing elements specific to Tracks/Chapters."
        },
        "7384": {
          "name": "SegmentFilename",
          "level": "2",
          "type": "8",
          "minver": "1",
          "webm": "0",
          "description": "A filename corresponding to this segment."
        },
        "7446": {
          "name": "AttachmentLink",
          "cppname": "TrackAttachmentLink",
          "level": "3",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "range": "not 0",
          "description": "The UID of an attachment that is used by this codec."
        },
        "258688": {
          "name": "CodecName",
          "level": "3",
          "type": "8",
          "minver": "1",
          "description": "A human-readable string specifying the codec."
        },
        "18538067": {
          "name": "Segment",
          "level": "0",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "This element contains all other top-level (level 1) elements. Typically a Matroska file is composed of 1 segment."
        },
        "447a": {
          "name": "TagLanguage",
          "level": "4",
          "type": "s",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "und",
          "description": "Specifies the language of the tag specified, in the Matroska languages form."
        },
        "45a3": {
          "name": "TagName",
          "level": "4",
          "type": "8",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "The name of the Tag that is going to be stored."
        },
        "67c8": {
          "name": "SimpleTag",
          "cppname": "TagSimple",
          "level": "3",
          "recursive": "1",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Contains general information about the target."
        },
        "63c6": {
          "name": "TagAttachmentUID",
          "level": "4",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "A unique ID to identify the Attachment(s) the tags belong to. If the value is 0 at this level, the tags apply to all the attachments in the Segment."
        },
        "63c4": {
          "name": "TagChapterUID",
          "level": "4",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "A unique ID to identify the Chapter(s) the tags belong to. If the value is 0 at this level, the tags apply to all chapters in the Segment."
        },
        "63c9": {
          "name": "TagEditionUID",
          "level": "4",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "A unique ID to identify the EditionEntry(s) the tags belong to. If the value is 0 at this level, the tags apply to all editions in the Segment."
        },
        "63c5": {
          "name": "TagTrackUID",
          "level": "4",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "A unique ID to identify the Track(s) the tags belong to. If the value is 0 at this level, the tags apply to all tracks in the Segment."
        },
        "63ca": {
          "name": "TargetType",
          "cppname": "TagTargetType",
          "level": "4",
          "type": "s",
          "minver": "1",
          "webm": "0",
          "strong": "informational",
          "description": 'An  string that can be used to display the logical level of the target like "ALBUM", "TRACK", "MOVIE", "CHAPTER", etc (see TargetType).'
        },
        "68ca": {
          "name": "TargetTypeValue",
          "cppname": "TagTargetTypeValue",
          "level": "4",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "default": "50",
          "description": "A number to indicate the logical level of the target (see TargetType)."
        },
        "63c0": {
          "name": "Targets",
          "cppname": "TagTargets",
          "level": "3",
          "type": "m",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "Contain all UIDs where the specified meta data apply. It is empty to describe everything in the segment."
        },
        "1254c367": {
          "name": "Tags",
          "level": "1",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Element containing elements specific to Tracks/Chapters. A list of valid tags can be found here."
        },
        "450d": {
          "name": "ChapProcessPrivate",
          "cppname": "ChapterProcessPrivate",
          "level": "5",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": 'Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the "DVD level" equivalent.'
        },
        "437e": {
          "name": "ChapCountry",
          "cppname": "ChapterCountry",
          "level": "5",
          "type": "s",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "The countries corresponding to the string, same 2 octets as in Internet domains."
        },
        "437c": {
          "name": "ChapLanguage",
          "cppname": "ChapterLanguage",
          "level": "5",
          "type": "s",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "1",
          "default": "eng",
          "description": "The languages corresponding to the string, in the bibliographic ISO-639-2 form."
        },
        "8f": {
          "name": "ChapterTrack",
          "level": "4",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "List of tracks on which the chapter applies. If this element is not present, all tracks apply"
        },
        "63c3": {
          "name": "ChapterPhysicalEquiv",
          "level": "4",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "description": 'Specify the physical equivalent of this ChapterAtom like "DVD" (60) or "SIDE" (50), see complete list of values.'
        },
        "6ebc": {
          "name": "ChapterSegmentEditionUID",
          "level": "4",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "range": "not 0",
          "description": "The EditionUID to play from the segment linked in ChapterSegmentUID."
        },
        "6e67": {
          "name": "ChapterSegmentUID",
          "level": "4",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "range": ">0",
          "bytesize": "16",
          "description": "A segment to play in place of this chapter. Edition ChapterSegmentEditionUID should be used for this segment, otherwise no edition is used."
        },
        "73c4": {
          "name": "ChapterUID",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "1",
          "range": "not 0",
          "description": "A unique ID to identify the Chapter."
        },
        "b6": {
          "name": "ChapterAtom",
          "level": "3",
          "recursive": "1",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "1",
          "description": "Contains the atom information to use as the chapter atom (apply to all tracks)."
        },
        "45dd": {
          "name": "EditionFlagOrdered",
          "level": "3",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "range": "0-1",
          "description": "Specify if the chapters can be defined multiple times and the order to play them is enforced. (1 bit)"
        },
        "45db": {
          "name": "EditionFlagDefault",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "range": "0-1",
          "description": "If a flag is set (1) the edition should be used as the default one. (1 bit)"
        },
        "45bd": {
          "name": "EditionFlagHidden",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "range": "0-1",
          "description": "If an edition is hidden (1), it should not be available to the user interface (but still to Control Tracks; see flag notes). (1 bit)"
        },
        "45bc": {
          "name": "EditionUID",
          "level": "3",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "range": "not 0",
          "description": "A unique ID to identify the edition. It's useful for tagging an edition."
        },
        "45b9": {
          "name": "EditionEntry",
          "level": "2",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "1",
          "description": "Contains all information about a segment edition."
        },
        "1043a770": {
          "name": "Chapters",
          "level": "1",
          "type": "m",
          "minver": "1",
          "webm": "1",
          "description": "A system to define basic menus and partition data. For more detailed information, look at the Chapters Explanation."
        },
        "46ae": {
          "name": "FileUID",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "range": "not 0",
          "description": "Unique ID representing the file, as random as possible."
        },
        "465c": {
          "name": "FileData",
          "level": "3",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "The data of the file."
        },
        "466e": {
          "name": "FileName",
          "level": "3",
          "type": "8",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "Filename of the attached file."
        },
        "467e": {
          "name": "FileDescription",
          "level": "3",
          "type": "8",
          "minver": "1",
          "webm": "0",
          "description": "A human-friendly name for the attached file."
        },
        "61a7": {
          "name": "AttachedFile",
          "level": "2",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "An attached file."
        },
        "1941a469": {
          "name": "Attachments",
          "level": "1",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "Contain attached files."
        },
        "eb": {
          "name": "CueRefCodecState",
          "level": "5",
          "type": "u",
          "webm": "0",
          "default": "0",
          "description": "The position of the Codec State corresponding to this referenced element. 0 means that the data is taken from the initial Track Entry."
        },
        "535f": {
          "name": "CueRefNumber",
          "level": "5",
          "type": "u",
          "webm": "0",
          "default": "1",
          "range": "not 0",
          "description": "Number of the referenced Block of Track X in the specified Cluster."
        },
        "db": {
          "name": "CueReference",
          "level": "4",
          "type": "m",
          "multiple": "1",
          "minver": "2",
          "webm": "0",
          "description": "The Clusters containing the required referenced Blocks."
        },
        "ea": {
          "name": "CueCodecState",
          "level": "4",
          "type": "u",
          "minver": "2",
          "webm": "0",
          "default": "0",
          "description": "The position of the Codec State corresponding to this Cue element. 0 means that the data is taken from the initial Track Entry."
        },
        "b2": {
          "name": "CueDuration",
          "level": "4",
          "type": "u",
          "mandatory": "0",
          "minver": "4",
          "webm": "0",
          "description": "The duration of the block according to the segment time base. If missing the track's DefaultDuration does not apply and no duration information is available in terms of the cues."
        },
        "f0": {
          "name": "CueRelativePosition",
          "level": "4",
          "type": "u",
          "mandatory": "0",
          "minver": "4",
          "webm": "0",
          "description": "The relative position of the referenced block inside the cluster with 0 being the first possible position for an element inside that cluster."
        },
        "f1": {
          "name": "CueClusterPosition",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "description": "The position of the Cluster containing the required Block."
        },
        "f7": {
          "name": "CueTrack",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "range": "not 0",
          "description": "The track for which a position is given."
        },
        "b7": {
          "name": "CueTrackPositions",
          "level": "3",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "Contain positions for different tracks corresponding to the timestamp."
        },
        "b3": {
          "name": "CueTime",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "description": "Absolute timestamp according to the segment time base."
        },
        "bb": {
          "name": "CuePoint",
          "level": "2",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "Contains all information relative to a seek point in the segment."
        },
        "1c53bb6b": {
          "name": "Cues",
          "level": "1",
          "type": "m",
          "minver": "1",
          "description": 'A top-level element to speed seeking access. All entries are local to the segment. Should be mandatory for non "live" streams.'
        },
        "47e6": {
          "name": "ContentSigHashAlgo",
          "level": "6",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "br": [
            "",
            ""
          ],
          "description": "The hash algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - SHA1-160 2 - MD5"
        },
        "47e5": {
          "name": "ContentSigAlgo",
          "level": "6",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "br": "",
          "description": "The algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values: 1 - RSA"
        },
        "47e4": {
          "name": "ContentSigKeyID",
          "level": "6",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": "This is the ID of the private key the data was signed with."
        },
        "47e3": {
          "name": "ContentSignature",
          "level": "6",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": "A cryptographic signature of the contents."
        },
        "47e2": {
          "name": "ContentEncKeyID",
          "level": "6",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": "For public key algorithms this is the ID of the public key the the data was encrypted with."
        },
        "47e1": {
          "name": "ContentEncAlgo",
          "level": "6",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "br": "",
          "description": "The encryption algorithm used. The value '0' means that the contents have not been encrypted but only signed. Predefined values: 1 - DES, 2 - 3DES, 3 - Twofish, 4 - Blowfish, 5 - AES"
        },
        "6d80": {
          "name": "ContentEncodings",
          "level": "3",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "Settings for several content encoding mechanisms like compression or encryption."
        },
        "c4": {
          "name": "TrickMasterTrackSegmentUID",
          "level": "3",
          "type": "b",
          "divx": "1",
          "bytesize": "16",
          "description": "DivX trick track extenstions"
        },
        "c7": {
          "name": "TrickMasterTrackUID",
          "level": "3",
          "type": "u",
          "divx": "1",
          "description": "DivX trick track extenstions"
        },
        "c6": {
          "name": "TrickTrackFlag",
          "level": "3",
          "type": "u",
          "divx": "1",
          "default": "0",
          "description": "DivX trick track extenstions"
        },
        "c1": {
          "name": "TrickTrackSegmentUID",
          "level": "3",
          "type": "b",
          "divx": "1",
          "bytesize": "16",
          "description": "DivX trick track extenstions"
        },
        "c0": {
          "name": "TrickTrackUID",
          "level": "3",
          "type": "u",
          "divx": "1",
          "description": "DivX trick track extenstions"
        },
        "ed": {
          "name": "TrackJoinUID",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "multiple": "1",
          "minver": "3",
          "webm": "0",
          "range": "not 0",
          "description": "The trackUID number of a track whose blocks are used to create this virtual track."
        },
        "e9": {
          "name": "TrackJoinBlocks",
          "level": "4",
          "type": "m",
          "minver": "3",
          "webm": "0",
          "description": "Contains the list of all tracks whose Blocks need to be combined to create this virtual track"
        },
        "e6": {
          "name": "TrackPlaneType",
          "level": "6",
          "type": "u",
          "mandatory": "1",
          "minver": "3",
          "webm": "0",
          "description": "The kind of plane this track corresponds to (0: left eye, 1: right eye, 2: background)."
        },
        "e5": {
          "name": "TrackPlaneUID",
          "level": "6",
          "type": "u",
          "mandatory": "1",
          "minver": "3",
          "webm": "0",
          "range": "not 0",
          "description": "The trackUID number of the track representing the plane."
        },
        "e4": {
          "name": "TrackPlane",
          "level": "5",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "3",
          "webm": "0",
          "description": "Contains a video plane track that need to be combined to create this 3D track"
        },
        "e3": {
          "name": "TrackCombinePlanes",
          "level": "4",
          "type": "m",
          "minver": "3",
          "webm": "0",
          "description": "Contains the list of all video plane tracks that need to be combined to create this 3D track"
        },
        "e2": {
          "name": "TrackOperation",
          "level": "3",
          "type": "m",
          "minver": "3",
          "webm": "0",
          "description": "Operation that needs to be applied on tracks to create this virtual track. For more details look at the Specification Notes on the subject."
        },
        "7d7b": {
          "name": "ChannelPositions",
          "cppname": "AudioPosition",
          "level": "4",
          "type": "b",
          "webm": "0",
          "description": "Table of horizontal angles for each successive channel, see appendix."
        },
        "9f": {
          "name": "Channels",
          "cppname": "AudioChannels",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "default": "1",
          "range": "not 0",
          "description": "Numbers of channels in the track."
        },
        "78b5": {
          "name": "OutputSamplingFrequency",
          "cppname": "AudioOutputSamplingFreq",
          "level": "4",
          "type": "f",
          "minver": "1",
          "default": "Sampling Frequency",
          "range": "> 0",
          "description": "Real output sampling frequency in Hz (used for SBR techniques)."
        },
        "b5": {
          "name": "SamplingFrequency",
          "cppname": "AudioSamplingFreq",
          "level": "4",
          "type": "f",
          "mandatory": "1",
          "minver": "1",
          "default": "8000.0",
          "range": "> 0",
          "description": "Sampling frequency in Hz."
        },
        "e1": {
          "name": "Audio",
          "cppname": "TrackAudio",
          "level": "3",
          "type": "m",
          "minver": "1",
          "description": "Audio settings."
        },
        "2383e3": {
          "name": "FrameRate",
          "cppname": "VideoFrameRate",
          "level": "4",
          "type": "f",
          "range": "> 0",
          "strong": "Informational",
          "description": "Number of frames per second.  only."
        },
        "2fb523": {
          "name": "GammaValue",
          "cppname": "VideoGamma",
          "level": "4",
          "type": "f",
          "webm": "0",
          "range": "> 0",
          "description": "Gamma Value."
        },
        "2eb524": {
          "name": "ColourSpace",
          "cppname": "VideoColourSpace",
          "level": "4",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "bytesize": "4",
          "description": "Same value as in AVI (32 bits)."
        },
        "54b3": {
          "name": "AspectRatioType",
          "cppname": "VideoAspectRatio",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "0",
          "description": "Specify the possible modifications to the aspect ratio (0: free resizing, 1: keep aspect ratio, 2: fixed)."
        },
        "54b2": {
          "name": "DisplayUnit",
          "cppname": "VideoDisplayUnit",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "0",
          "description": "How DisplayWidth & DisplayHeight should be interpreted (0: pixels, 1: centimeters, 2: inches, 3: Display Aspect Ratio)."
        },
        "54ba": {
          "name": "DisplayHeight",
          "cppname": "VideoDisplayHeight",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "PixelHeight",
          "range": "not 0",
          "description": "Height of the video frames to display. The default value is only valid when DisplayUnit is 0."
        },
        "54b0": {
          "name": "DisplayWidth",
          "cppname": "VideoDisplayWidth",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "PixelWidth",
          "range": "not 0",
          "description": "Width of the video frames to display. The default value is only valid when DisplayUnit is 0."
        },
        "54dd": {
          "name": "PixelCropRight",
          "cppname": "VideoPixelCropRight",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "0",
          "description": "The number of video pixels to remove on the right of the image."
        },
        "54cc": {
          "name": "PixelCropLeft",
          "cppname": "VideoPixelCropLeft",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "0",
          "description": "The number of video pixels to remove on the left of the image."
        },
        "54bb": {
          "name": "PixelCropTop",
          "cppname": "VideoPixelCropTop",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "0",
          "description": "The number of video pixels to remove at the top of the image."
        },
        "54aa": {
          "name": "PixelCropBottom",
          "cppname": "VideoPixelCropBottom",
          "level": "4",
          "type": "u",
          "minver": "1",
          "default": "0",
          "description": "The number of video pixels to remove at the bottom of the image (for HDTV content)."
        },
        "ba": {
          "name": "PixelHeight",
          "cppname": "VideoPixelHeight",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "range": "not 0",
          "description": "Height of the encoded video frames in pixels."
        },
        "b0": {
          "name": "PixelWidth",
          "cppname": "VideoPixelWidth",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "range": "not 0",
          "description": "Width of the encoded video frames in pixels."
        },
        "53b9": {
          "name": "OldStereoMode",
          "level": "4",
          "type": "u",
          "maxver": "0",
          "webm": "0",
          "divx": "0",
          "description": "DEPRECATED, DO NOT USE. Bogus StereoMode value used in old versions of libmatroska. (0: mono, 1: right eye, 2: left eye, 3: both eyes)."
        },
        "53c0": {
          "name": "AlphaMode",
          "cppname": "VideoAlphaMode",
          "level": "4",
          "type": "u",
          "minver": "3",
          "webm": "1",
          "default": "0",
          "description": "Alpha Video Mode. Presence of this element indicates that the BlockAdditional element could contain Alpha data."
        },
        "53b8": {
          "name": "StereoMode",
          "cppname": "VideoStereoMode",
          "level": "4",
          "type": "u",
          "minver": "3",
          "webm": "1",
          "default": "0",
          "description": "Stereo-3D video mode (0: mono, 1: side by side (left eye is first), 2: top-bottom (right eye is first), 3: top-bottom (left eye is first), 4: checkboard (right is first), 5: checkboard (left is first), 6: row interleaved (right is first), 7: row interleaved (left is first), 8: column interleaved (right is first), 9: column interleaved (left is first), 10: anaglyph (cyan/red), 11: side by side (right eye is first), 12: anaglyph (green/magenta), 13 both eyes laced in one Block (left eye is first), 14 both eyes laced in one Block (right eye is first)) . There are some more details on 3D support in the Specification Notes."
        },
        "9a": {
          "name": "FlagInterlaced",
          "cppname": "VideoFlagInterlaced",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "2",
          "webm": "1",
          "default": "0",
          "range": "0-1",
          "description": "Set if the video is interlaced. (1 bit)"
        },
        "e0": {
          "name": "Video",
          "cppname": "TrackVideo",
          "level": "3",
          "type": "m",
          "minver": "1",
          "description": "Video settings."
        },
        "66a5": {
          "name": "TrackTranslateTrackID",
          "level": "4",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "The binary value used to represent this track in the chapter codec data. The format depends on the ChapProcessCodecID used."
        },
        "66bf": {
          "name": "TrackTranslateCodec",
          "level": "4",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu)."
        },
        "66fc": {
          "name": "TrackTranslateEditionUID",
          "level": "4",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Specify an edition UID on which this translation applies. When not specified, it means for all editions found in the segment."
        },
        "56bb": {
          "name": "SeekPreRoll",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "multiple": "0",
          "default": "0",
          "minver": "4",
          "webm": "1",
          "description": "After a discontinuity, SeekPreRoll is the duration in nanoseconds of the data the decoder must decode before the decoded data is valid."
        },
        "56aa": {
          "name": "CodecDelay",
          "level": "3",
          "type": "u",
          "multiple": "0",
          "default": "0",
          "minver": "4",
          "webm": "1",
          "description": "CodecDelay is The codec-built-in delay in nanoseconds. This value must be subtracted from each block timestamp in order to get the actual timestamp. The value should be small so the muxing of tracks with the same actual timestamp are in the same Cluster."
        },
        "6fab": {
          "name": "TrackOverlay",
          "level": "3",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap (see SilentTracks) the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc."
        },
        "aa": {
          "name": "CodecDecodeAll",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "2",
          "webm": "0",
          "default": "1",
          "range": "0-1",
          "description": "The codec can decode potentially damaged data (1 bit)."
        },
        "26b240": {
          "name": "CodecDownloadURL",
          "level": "3",
          "type": "s",
          "multiple": "1",
          "webm": "0",
          "description": "A URL to download about the codec used."
        },
        "3b4040": {
          "name": "CodecInfoURL",
          "level": "3",
          "type": "s",
          "multiple": "1",
          "webm": "0",
          "description": "A URL to find information about the codec used."
        },
        "3a9697": {
          "name": "CodecSettings",
          "level": "3",
          "type": "8",
          "webm": "0",
          "description": "A string describing the encoding setting used."
        },
        "63a2": {
          "name": "CodecPrivate",
          "level": "3",
          "type": "b",
          "minver": "1",
          "description": "Private data only known to the codec."
        },
        "22b59c": {
          "name": "Language",
          "cppname": "TrackLanguage",
          "level": "3",
          "type": "s",
          "minver": "1",
          "default": "eng",
          "description": "Specifies the language of the track in the Matroska languages form."
        },
        "536e": {
          "name": "Name",
          "cppname": "TrackName",
          "level": "3",
          "type": "8",
          "minver": "1",
          "description": "A human-readable track name."
        },
        "55ee": {
          "name": "MaxBlockAdditionID",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "The maximum value of BlockAdditions for this track."
        },
        "537f": {
          "name": "TrackOffset",
          "level": "3",
          "type": "i",
          "webm": "0",
          "default": "0",
          "description": "A value to add to the Block's Timestamp. This can be used to adjust the playback offset of a track."
        },
        "23314f": {
          "name": "TrackTimecodeScale",
          "level": "3",
          "type": "f",
          "mandatory": "1",
          "minver": "1",
          "maxver": "3",
          "webm": "0",
          "default": "1.0",
          "range": "> 0",
          "description": "DEPRECATED, DO NOT USE. The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs)."
        },
        "234e7a": {
          "name": "DefaultDecodedFieldDuration",
          "cppname": "TrackDefaultDecodedFieldDuration",
          "level": "3",
          "type": "u",
          "minver": "4",
          "range": "not 0",
          "description": "The period in nanoseconds (not scaled by TimcodeScale)\nbetween two successive fields at the output of the decoding process (see the notes)"
        },
        "23e383": {
          "name": "DefaultDuration",
          "cppname": "TrackDefaultDuration",
          "level": "3",
          "type": "u",
          "minver": "1",
          "range": "not 0",
          "description": "Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one element put into a (Simple)Block)."
        },
        "6df8": {
          "name": "MaxCache",
          "cppname": "TrackMaxCache",
          "level": "3",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "description": "The maximum cache size required to store referenced frames in and the current frame. 0 means no cache is needed."
        },
        "6de7": {
          "name": "MinCache",
          "cppname": "TrackMinCache",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used."
        },
        "9c": {
          "name": "FlagLacing",
          "cppname": "TrackFlagLacing",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "default": "1",
          "range": "0-1",
          "description": "Set if the track may contain blocks using lacing. (1 bit)"
        },
        "55aa": {
          "name": "FlagForced",
          "cppname": "TrackFlagForced",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "default": "0",
          "range": "0-1",
          "description": "Set if that track MUST be active during playback. There can be many forced track for a kind (audio, video or subs), the player should select the one which language matches the user preference or the default + forced track. Overlay MAY happen between a forced and non-forced track of the same kind. (1 bit)"
        },
        "b9": {
          "name": "FlagEnabled",
          "cppname": "TrackFlagEnabled",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "2",
          "webm": "1",
          "default": "1",
          "range": "0-1",
          "description": "Set if the track is usable. (1 bit)"
        },
        "73c5": {
          "name": "TrackUID",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "range": "not 0",
          "description": "A unique ID to identify the Track. This should be kept the same when making a direct stream copy of the Track to another file."
        },
        "d7": {
          "name": "TrackNumber",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "range": "not 0",
          "description": "The track number as used in the Block Header (using more than 127 tracks is not encouraged, though the design allows an unlimited number)."
        },
        "ae": {
          "name": "TrackEntry",
          "level": "2",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "Describes a track with all elements."
        },
        "1654ae6b": {
          "name": "Tracks",
          "level": "1",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "description": "A top-level block of information with many tracks described."
        },
        "af": {
          "name": "EncryptedBlock",
          "level": "2",
          "type": "b",
          "multiple": "1",
          "webm": "0",
          "description": "Similar to EncryptedBlock Structure)"
        },
        "ca": {
          "name": "ReferenceTimeCode",
          "level": "4",
          "type": "u",
          "multiple": "0",
          "mandatory": "1",
          "minver": "0",
          "webm": "0",
          "divx": "1",
          "description": "DivX trick track extenstions"
        },
        "c9": {
          "name": "ReferenceOffset",
          "level": "4",
          "type": "u",
          "multiple": "0",
          "mandatory": "1",
          "minver": "0",
          "webm": "0",
          "divx": "1",
          "description": "DivX trick track extenstions"
        },
        "c8": {
          "name": "ReferenceFrame",
          "level": "3",
          "type": "m",
          "multiple": "0",
          "minver": "0",
          "webm": "0",
          "divx": "1",
          "description": "DivX trick track extenstions"
        },
        "cf": {
          "name": "SliceDuration",
          "level": "5",
          "type": "u",
          "default": "0",
          "description": "The (scaled) duration to apply to the element."
        },
        "ce": {
          "name": "Delay",
          "cppname": "SliceDelay",
          "level": "5",
          "type": "u",
          "default": "0",
          "description": "The (scaled) delay to apply to the element."
        },
        "cb": {
          "name": "BlockAdditionID",
          "cppname": "SliceBlockAddID",
          "level": "5",
          "type": "u",
          "default": "0",
          "description": "The ID of the BlockAdditional element (0 is the main Block)."
        },
        "cd": {
          "name": "FrameNumber",
          "cppname": "SliceFrameNumber",
          "level": "5",
          "type": "u",
          "default": "0",
          "description": "The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame)."
        },
        "cc": {
          "name": "LaceNumber",
          "cppname": "SliceLaceNumber",
          "level": "5",
          "type": "u",
          "minver": "1",
          "default": "0",
          "divx": "0",
          "description": "The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc). While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback."
        },
        "e8": {
          "name": "TimeSlice",
          "level": "4",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "divx": "0",
          "description": "Contains extra time information about the data contained in the Block. While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback."
        },
        "8e": {
          "name": "Slices",
          "level": "3",
          "type": "m",
          "minver": "1",
          "divx": "0",
          "description": "Contains slices description."
        },
        "75a2": {
          "name": "DiscardPadding",
          "level": "3",
          "type": "i",
          "minver": "4",
          "webm": "1",
          "description": "Duration in nanoseconds of the silent data added to the Block (padding at the end of the Block for positive value, at the beginning of the Block for negative value). The duration of DiscardPadding is not calculated in the duration of the TrackEntry and should be discarded during playback."
        },
        "a4": {
          "name": "CodecState",
          "level": "3",
          "type": "b",
          "minver": "2",
          "webm": "0",
          "description": "The new codec state to use. Data interpretation is private to the codec. This information should always be referenced by a seek entry."
        },
        "fd": {
          "name": "ReferenceVirtual",
          "level": "3",
          "type": "i",
          "webm": "0",
          "description": "Relative position of the data that should be in position of the virtual block."
        },
        "fb": {
          "name": "ReferenceBlock",
          "level": "3",
          "type": "i",
          "multiple": "1",
          "minver": "1",
          "description": "Timestamp of another frame used as a reference (ie: B or P frame). The timestamp is relative to the block it's attached to."
        },
        "fa": {
          "name": "ReferencePriority",
          "cppname": "FlagReferenced",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "0",
          "description": "This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced."
        },
        "9b": {
          "name": "BlockDuration",
          "level": "3",
          "type": "u",
          "minver": "1",
          "default": "TrackDuration",
          "description": 'The duration of the Block (based on TimecodeScale). This element is mandatory when DefaultDuration is set for the track (but can be omitted as other default values). When not written and with no DefaultDuration, the value is assumed to be the difference between the timestamp of this Block and the timestamp of the next Block in "display" order (not coding order). This element can be useful at the end of a Track (as there is not other Block available), or when there is a break in a track like for subtitle tracks. When set to 0 that means the frame is not a keyframe.'
        },
        "a5": {
          "name": "BlockAdditional",
          "level": "5",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "Interpreted by the codec as it wishes (using the BlockAddID)."
        },
        "ee": {
          "name": "BlockAddID",
          "level": "5",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "default": "1",
          "range": "not 0",
          "description": "An ID to identify the BlockAdditional level."
        },
        "a6": {
          "name": "BlockMore",
          "level": "4",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Contain the BlockAdditional and some parameters."
        },
        "75a1": {
          "name": "BlockAdditions",
          "level": "3",
          "type": "m",
          "minver": "1",
          "webm": "0",
          "description": "Contain additional blocks to complete the main one. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data."
        },
        "a2": {
          "name": "BlockVirtual",
          "level": "3",
          "type": "b",
          "webm": "0",
          "description": "A Block with no data. It must be stored in the stream at the place the real Block should be in display order. (see Block Virtual)"
        },
        "a1": {
          "name": "Block",
          "level": "3",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "description": "Block containing the actual data to be rendered and a timestamp relative to the Cluster Timecode. (see Block Structure)"
        },
        "a0": {
          "name": "BlockGroup",
          "level": "2",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "description": "Basic container of information containing a single Block or BlockVirtual, and information specific to that Block/VirtualBlock."
        },
        "a3": {
          "name": "SimpleBlock",
          "level": "2",
          "type": "b",
          "multiple": "1",
          "minver": "2",
          "webm": "1",
          "divx": "1",
          "description": "Similar to SimpleBlock Structure)"
        },
        "ab": {
          "name": "PrevSize",
          "cppname": "ClusterPrevSize",
          "level": "2",
          "type": "u",
          "minver": "1",
          "description": "Size of the previous Cluster, in octets. Can be useful for backward playing."
        },
        "a7": {
          "name": "Position",
          "cppname": "ClusterPosition",
          "level": "2",
          "type": "u",
          "minver": "1",
          "webm": "0",
          "description": "The Position of the Cluster in the segment (0 in live broadcast streams). It might help to resynchronise offset on damaged streams."
        },
        "58d7": {
          "name": "SilentTrackNumber",
          "cppname": "ClusterSilentTrackNumber",
          "level": "3",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster."
        },
        "e7": {
          "name": "Timecode",
          "cppname": "ClusterTimecode",
          "level": "2",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "description": "Absolute timestamp of the cluster (based on TimecodeScale)."
        },
        "1f43b675": {
          "name": "Cluster",
          "level": "1",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "description": "The lower level element containing the (monolithic) Block structure."
        },
        "4d80": {
          "name": "MuxingApp",
          "level": "2",
          "type": "8",
          "mandatory": "1",
          "minver": "1",
          "description": 'Muxing application or library ("libmatroska-0.4.3").'
        },
        "7ba9": {
          "name": "Title",
          "level": "2",
          "type": "8",
          "minver": "1",
          "webm": "0",
          "description": "General name of the segment."
        },
        "2ad7b2": {
          "name": "TimecodeScaleDenominator",
          "level": "2",
          "type": "u",
          "mandatory": "1",
          "minver": "4",
          "default": "1000000000",
          "description": "Timestamp scale numerator, see TimecodeScale."
        },
        "2ad7b1": {
          "name": "TimecodeScale",
          "level": "2",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "default": "1000000",
          "description": "Timestamp scale in nanoseconds (1.000.000 means all timestamps in the segment are expressed in milliseconds)."
        },
        "69a5": {
          "name": "ChapterTranslateID",
          "level": "3",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "The binary value used to represent this segment in the chapter codec data. The format depends on the ChapProcessCodecID used."
        },
        "69bf": {
          "name": "ChapterTranslateCodec",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "webm": "0",
          "description": "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu)."
        },
        "69fc": {
          "name": "ChapterTranslateEditionUID",
          "level": "3",
          "type": "u",
          "multiple": "1",
          "minver": "1",
          "webm": "0",
          "description": "Specify an edition UID on which this correspondance applies. When not specified, it means for all editions found in the segment."
        },
        "3e83bb": {
          "name": "NextFilename",
          "level": "2",
          "type": "8",
          "minver": "1",
          "webm": "0",
          "description": "An escaped filename corresponding to the next segment."
        },
        "3eb923": {
          "name": "NextUID",
          "level": "2",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "bytesize": "16",
          "description": "A unique ID to identify the next chained segment (128 bits)."
        },
        "3c83ab": {
          "name": "PrevFilename",
          "level": "2",
          "type": "8",
          "minver": "1",
          "webm": "0",
          "description": "An escaped filename corresponding to the previous segment."
        },
        "3cb923": {
          "name": "PrevUID",
          "level": "2",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "bytesize": "16",
          "description": "A unique ID to identify the previous chained segment (128 bits)."
        },
        "73a4": {
          "name": "SegmentUID",
          "level": "2",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "range": "not 0",
          "bytesize": "16",
          "description": "A randomly generated unique ID to identify the current segment between many others (128 bits)."
        },
        "1549a966": {
          "name": "Info",
          "level": "1",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "Contains miscellaneous general information and statistics on the file."
        },
        "53ac": {
          "name": "SeekPosition",
          "level": "3",
          "type": "u",
          "mandatory": "1",
          "minver": "1",
          "description": "The position of the element in the segment in octets (0 = first level 1 element)."
        },
        "53ab": {
          "name": "SeekID",
          "level": "3",
          "type": "b",
          "mandatory": "1",
          "minver": "1",
          "description": "The binary ID corresponding to the element name."
        },
        "4dbb": {
          "name": "Seek",
          "cppname": "SeekPoint",
          "level": "2",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "Contains a single seek entry to an EBML element."
        },
        "114d9b74": {
          "name": "SeekHead",
          "cppname": "SeekHeader",
          "level": "1",
          "type": "m",
          "multiple": "1",
          "minver": "1",
          "description": "Contains the position of other level 1 elements."
        },
        "7e7b": {
          "name": "SignatureElementList",
          "level": "2",
          "type": "m",
          "multiple": "1",
          "webm": "0",
          "i": "Cluster|Block|BlockAdditional",
          "description": "A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex:  means that the BlockAdditional of all Blocks in all Clusters is used for encryption."
        },
        "7e5b": {
          "name": "SignatureElements",
          "level": "1",
          "type": "m",
          "webm": "0",
          "description": "Contains elements that will be used to compute the signature."
        },
        "7eb5": {
          "name": "Signature",
          "level": "1",
          "type": "b",
          "webm": "0",
          "description": "The signature of the data (until a new."
        },
        "7ea5": {
          "name": "SignaturePublicKey",
          "level": "1",
          "type": "b",
          "webm": "0",
          "description": "The public key to use with the algorithm (in the case of a PKI-based signature)."
        },
        "7e9a": {
          "name": "SignatureHash",
          "level": "1",
          "type": "u",
          "webm": "0",
          "description": "Hash algorithm used (1=SHA1-160, 2=MD5)."
        },
        "7e8a": {
          "name": "SignatureAlgo",
          "level": "1",
          "type": "u",
          "webm": "0",
          "description": "Signature algorithm used (1=RSA, 2=elliptic)."
        },
        "1b538667": {
          "name": "SignatureSlot",
          "level": "-1",
          "type": "m",
          "multiple": "1",
          "webm": "0",
          "description": "Contain signature of some (coming) elements in the stream."
        },
        "bf": {
          "name": "CRC-32",
          "level": "-1",
          "type": "b",
          "minver": "1",
          "webm": "0",
          "description": "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian"
        },
        "ec": {
          "name": "Void",
          "level": "-1",
          "type": "b",
          "minver": "1",
          "description": "Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use."
        },
        "42f3": {
          "name": "EBMLMaxSizeLength",
          "level": "1",
          "type": "u",
          "mandatory": "1",
          "default": "8",
          "minver": "1",
          "description": "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid."
        },
        "42f2": {
          "name": "EBMLMaxIDLength",
          "level": "1",
          "type": "u",
          "mandatory": "1",
          "default": "4",
          "minver": "1",
          "description": "The maximum length of the IDs you'll find in this file (4 or less in Matroska)."
        },
        "42f7": {
          "name": "EBMLReadVersion",
          "level": "1",
          "type": "u",
          "mandatory": "1",
          "default": "1",
          "minver": "1",
          "description": "The minimum EBML version a parser has to support to read this file."
        },
        "1a45dfa3": {
          "name": "EBML",
          "level": "0",
          "type": "m",
          "mandatory": "1",
          "multiple": "1",
          "minver": "1",
          "description": "Set the EBML characteristics of the data to follow. Each EBML document has to start with this."
        }
      };
      module.exports = schema;
    }
  });

  // node_modules/ebml/node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ebml/node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isNaN(val) === false) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        if (ms >= d) {
          return Math.round(ms / d) + "d";
        }
        if (ms >= h) {
          return Math.round(ms / h) + "h";
        }
        if (ms >= m) {
          return Math.round(ms / m) + "m";
        }
        if (ms >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
      }
      function plural(ms, n, name) {
        if (ms < n) {
          return;
        }
        if (ms < n * 1.5) {
          return Math.floor(ms / n) + " " + name;
        }
        return Math.ceil(ms / n) + " " + name + "s";
      }
    }
  });

  // node_modules/ebml/node_modules/debug/src/debug.js
  var require_debug = __commonJS({
    "node_modules/ebml/node_modules/debug/src/debug.js"(exports, module) {
      exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
      exports.coerce = coerce;
      exports.disable = disable;
      exports.enable = enable;
      exports.enabled = enabled;
      exports.humanize = require_ms();
      exports.instances = [];
      exports.names = [];
      exports.skips = [];
      exports.formatters = {};
      function selectColor(namespace) {
        var hash = 0, i;
        for (i in namespace) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return exports.colors[Math.abs(hash) % exports.colors.length];
      }
      function createDebug(namespace) {
        var prevTime;
        function debug() {
          if (!debug.enabled) return;
          var self2 = debug;
          var curr = +/* @__PURE__ */ new Date();
          var ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          args[0] = exports.coerce(args[0]);
          if ("string" !== typeof args[0]) {
            args.unshift("%O");
          }
          var index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
            if (match === "%%") return match;
            index++;
            var formatter = exports.formatters[format];
            if ("function" === typeof formatter) {
              var val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          exports.formatArgs.call(self2, args);
          var logFn = debug.log || exports.log || console.log.bind(console);
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.enabled = exports.enabled(namespace);
        debug.useColors = exports.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        if ("function" === typeof exports.init) {
          exports.init(debug);
        }
        exports.instances.push(debug);
        return debug;
      }
      function destroy() {
        var index = exports.instances.indexOf(this);
        if (index !== -1) {
          exports.instances.splice(index, 1);
          return true;
        } else {
          return false;
        }
      }
      function enable(namespaces) {
        exports.save(namespaces);
        exports.names = [];
        exports.skips = [];
        var i;
        var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        var len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) continue;
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            exports.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
        for (i = 0; i < exports.instances.length; i++) {
          var instance = exports.instances[i];
          instance.enabled = exports.enabled(instance.namespace);
        }
      }
      function disable() {
        exports.enable("");
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        var i, len;
        for (i = 0, len = exports.skips.length; i < len; i++) {
          if (exports.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = exports.names.length; i < len; i++) {
          if (exports.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
      }
    }
  });

  // node_modules/ebml/node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/ebml/node_modules/debug/src/browser.js"(exports, module) {
      exports = module.exports = require_debug();
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      exports.formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (err) {
          return "[UnexpectedJSONParseError]: " + err.message;
        }
      };
      function formatArgs(args) {
        var useColors2 = this.useColors;
        args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
        if (!useColors2) return;
        var c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function(match) {
          if ("%%" === match) return;
          index++;
          if ("%c" === match) {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      function log() {
        return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }
      function save(namespaces) {
        try {
          if (null == namespaces) {
            exports.storage.removeItem("debug");
          } else {
            exports.storage.debug = namespaces;
          }
        } catch (e) {
        }
      }
      function load() {
        var r;
        try {
          r = exports.storage.debug;
        } catch (e) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      exports.enable(load());
      function localstorage() {
        try {
          return window.localStorage;
        } catch (e) {
        }
      }
    }
  });

  // node_modules/tty-browserify/index.js
  var require_tty_browserify = __commonJS({
    "node_modules/tty-browserify/index.js"(exports) {
      exports.isatty = function() {
        return false;
      };
      function ReadStream() {
        throw new Error("tty.ReadStream is not implemented");
      }
      exports.ReadStream = ReadStream;
      function WriteStream() {
        throw new Error("tty.WriteStream is not implemented");
      }
      exports.WriteStream = WriteStream;
    }
  });

  // node_modules/supports-color/index.js
  var require_supports_color = __commonJS({
    "node_modules/supports-color/index.js"(exports, module) {
      "use strict";
      var argv = process.argv;
      var terminator = argv.indexOf("--");
      var hasFlag = function(flag) {
        flag = "--" + flag;
        var pos = argv.indexOf(flag);
        return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
      };
      module.exports = (function() {
        if ("FORCE_COLOR" in process.env) {
          return true;
        }
        if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
          return false;
        }
        if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
          return true;
        }
        if (process.stdout && !process.stdout.isTTY) {
          return false;
        }
        if (process.platform === "win32") {
          return true;
        }
        if ("COLORTERM" in process.env) {
          return true;
        }
        if (process.env.TERM === "dumb") {
          return false;
        }
        if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
          return true;
        }
        return false;
      })();
    }
  });

  // node_modules/ebml/node_modules/debug/src/node.js
  var require_node2 = __commonJS({
    "node_modules/ebml/node_modules/debug/src/node.js"(exports, module) {
      var tty = require_tty_browserify();
      var util = require_util2();
      exports = module.exports = require_debug();
      exports.init = init;
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.colors = [6, 2, 3, 4, 5, 1];
      try {
        supportsColor = require_supports_color();
        if (supportsColor && supportsColor.level >= 2) {
          exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
          ];
        }
      } catch (err) {
      }
      var supportsColor;
      exports.inspectOpts = Object.keys(process.env).filter(function(key) {
        return /^debug_/i.test(key);
      }).reduce(function(obj, key) {
        var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
          return k.toUpperCase();
        });
        var val = process.env[key];
        if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
        else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
        else if (val === "null") val = null;
        else val = Number(val);
        obj[prop] = val;
        return obj;
      }, {});
      function useColors() {
        return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }
      exports.formatters.o = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
          return str.trim();
        }).join(" ");
      };
      exports.formatters.O = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts);
      };
      function formatArgs(args) {
        var name = this.namespace;
        var useColors2 = this.useColors;
        if (useColors2) {
          var c = this.color;
          var colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
          var prefix = "  " + colorCode + ";1m" + name + " \x1B[0m";
          args[0] = prefix + args[0].split("\n").join("\n" + prefix);
          args.push(colorCode + "m+" + exports.humanize(this.diff) + "\x1B[0m");
        } else {
          args[0] = getDate() + name + " " + args[0];
        }
      }
      function getDate() {
        if (exports.inspectOpts.hideDate) {
          return "";
        } else {
          return (/* @__PURE__ */ new Date()).toISOString() + " ";
        }
      }
      function log() {
        return process.stderr.write(util.format.apply(util, arguments) + "\n");
      }
      function save(namespaces) {
        if (null == namespaces) {
          delete process.env.DEBUG;
        } else {
          process.env.DEBUG = namespaces;
        }
      }
      function load() {
        return process.env.DEBUG;
      }
      function init(debug) {
        debug.inspectOpts = {};
        var keys = Object.keys(exports.inspectOpts);
        for (var i = 0; i < keys.length; i++) {
          debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
        }
      }
      exports.enable(load());
    }
  });

  // node_modules/ebml/node_modules/debug/src/index.js
  var require_src = __commonJS({
    "node_modules/ebml/node_modules/debug/src/index.js"(exports, module) {
      if (typeof process === "undefined" || process.type === "renderer") {
        module.exports = require_browser();
      } else {
        module.exports = require_node2();
      }
    }
  });

  // node_modules/ebml/lib/ebml/decoder.js
  var require_decoder = __commonJS({
    "node_modules/ebml/lib/ebml/decoder.js"(exports, module) {
      var Transform = require_stream_browserify().Transform;
      var tools = require_tools();
      var schema = require_schema();
      var debug = require_src()("ebml:decoder");
      var STATE_TAG = 1;
      var STATE_SIZE = 2;
      var STATE_CONTENT = 3;
      function EbmlDecoder(options) {
        options = options || {};
        options.readableObjectMode = true;
        Transform.call(this, options);
        this._buffer = null;
        this._tag_stack = [];
        this._state = STATE_TAG;
        this._cursor = 0;
        this._total = 0;
        this._schema = schema;
      }
      require_util2().inherits(EbmlDecoder, Transform);
      EbmlDecoder.prototype._transform = function(chunk, enc, done) {
        if (this._buffer === null) {
          this._buffer = chunk;
        } else {
          this._buffer = Buffer.concat([this._buffer, chunk]);
        }
        while (this._cursor < this._buffer.length) {
          if (this._state === STATE_TAG && !this.readTag()) {
            break;
          }
          if (this._state === STATE_SIZE && !this.readSize()) {
            break;
          }
          if (this._state === STATE_CONTENT && !this.readContent()) {
            break;
          }
        }
        done();
      };
      EbmlDecoder.prototype.getSchemaInfo = function(tagStr) {
        return this._schema[tagStr] || {
          "type": "unknown",
          "name": "unknown"
        };
      };
      EbmlDecoder.prototype.readTag = function() {
        debug("parsing tag");
        if (this._cursor >= this._buffer.length) {
          debug("waiting for more data");
          return false;
        }
        var start = this._total;
        var tag = tools.readVint(this._buffer, this._cursor);
        if (tag == null) {
          debug("waiting for more data");
          return false;
        }
        var tagStr = this._buffer.toString("hex", this._cursor, this._cursor + tag.length);
        this._cursor += tag.length;
        this._total += tag.length;
        this._state = STATE_SIZE;
        var tagObj = {
          tag: tag.value,
          tagStr,
          type: this.getSchemaInfo(tagStr).type,
          name: this.getSchemaInfo(tagStr).name,
          start,
          end: start + tag.length
        };
        this._tag_stack.push(tagObj);
        debug("read tag: " + tagStr);
        return true;
      };
      EbmlDecoder.prototype.readSize = function() {
        var tagObj = this._tag_stack[this._tag_stack.length - 1];
        debug("parsing size for tag: " + tagObj.tag.toString(16));
        if (this._cursor >= this._buffer.length) {
          debug("waiting for more data");
          return false;
        }
        var size = tools.readVint(this._buffer, this._cursor);
        if (size == null) {
          debug("waiting for more data");
          return false;
        }
        this._cursor += size.length;
        this._total += size.length;
        this._state = STATE_CONTENT;
        tagObj.dataSize = size.value;
        if (size.value === -1) {
          tagObj.end = -1;
        } else {
          tagObj.end += size.value + size.length;
        }
        debug("read size: " + size.value);
        return true;
      };
      EbmlDecoder.prototype.readContent = function() {
        var tagObj = this._tag_stack[this._tag_stack.length - 1];
        debug("parsing content for tag: " + tagObj.tag.toString(16));
        if (tagObj.type === "m") {
          debug("content should be tags");
          this.push(["start", tagObj]);
          this._state = STATE_TAG;
          return true;
        }
        if (this._buffer.length < this._cursor + tagObj.dataSize) {
          debug("got: " + this._buffer.length);
          debug("need: " + (this._cursor + tagObj.dataSize));
          debug("waiting for more data");
          return false;
        }
        var data = this._buffer.slice(this._cursor, this._cursor + tagObj.dataSize);
        this._total += tagObj.dataSize;
        this._state = STATE_TAG;
        this._buffer = this._buffer.slice(this._cursor + tagObj.dataSize);
        this._cursor = 0;
        this._tag_stack.pop();
        tagObj.data = data;
        this.push(["tag", tagObj]);
        while (this._tag_stack.length > 0) {
          var topEle = this._tag_stack[this._tag_stack.length - 1];
          if (this._total < topEle.end) {
            break;
          }
          this.push(["end", topEle]);
          this._tag_stack.pop();
        }
        if (debug.enabled) {
          debug("read data: " + data.toString("hex"));
        }
        return true;
      };
      module.exports = EbmlDecoder;
    }
  });

  // node_modules/buffers/index.js
  var require_buffers = __commonJS({
    "node_modules/buffers/index.js"(exports, module) {
      module.exports = Buffers;
      function Buffers(bufs) {
        if (!(this instanceof Buffers)) return new Buffers(bufs);
        this.buffers = bufs || [];
        this.length = this.buffers.reduce(function(size, buf) {
          return size + buf.length;
        }, 0);
      }
      Buffers.prototype.push = function() {
        for (var i = 0; i < arguments.length; i++) {
          if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError("Tried to push a non-buffer");
          }
        }
        for (var i = 0; i < arguments.length; i++) {
          var buf = arguments[i];
          this.buffers.push(buf);
          this.length += buf.length;
        }
        return this.length;
      };
      Buffers.prototype.unshift = function() {
        for (var i = 0; i < arguments.length; i++) {
          if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError("Tried to unshift a non-buffer");
          }
        }
        for (var i = 0; i < arguments.length; i++) {
          var buf = arguments[i];
          this.buffers.unshift(buf);
          this.length += buf.length;
        }
        return this.length;
      };
      Buffers.prototype.copy = function(dst, dStart, start, end) {
        return this.slice(start, end).copy(dst, dStart, 0, end - start);
      };
      Buffers.prototype.splice = function(i, howMany) {
        var buffers = this.buffers;
        var index = i >= 0 ? i : this.length - i;
        var reps = [].slice.call(arguments, 2);
        if (howMany === void 0) {
          howMany = this.length - index;
        } else if (howMany > this.length - index) {
          howMany = this.length - index;
        }
        for (var i = 0; i < reps.length; i++) {
          this.length += reps[i].length;
        }
        var removed = new Buffers();
        var bytes3 = 0;
        var startBytes = 0;
        for (var ii = 0; ii < buffers.length && startBytes + buffers[ii].length < index; ii++) {
          startBytes += buffers[ii].length;
        }
        if (index - startBytes > 0) {
          var start = index - startBytes;
          if (start + howMany < buffers[ii].length) {
            removed.push(buffers[ii].slice(start, start + howMany));
            var orig = buffers[ii];
            var buf0 = new Buffer(start);
            for (var i = 0; i < start; i++) {
              buf0[i] = orig[i];
            }
            var buf1 = new Buffer(orig.length - start - howMany);
            for (var i = start + howMany; i < orig.length; i++) {
              buf1[i - howMany - start] = orig[i];
            }
            if (reps.length > 0) {
              var reps_ = reps.slice();
              reps_.unshift(buf0);
              reps_.push(buf1);
              buffers.splice.apply(buffers, [ii, 1].concat(reps_));
              ii += reps_.length;
              reps = [];
            } else {
              buffers.splice(ii, 1, buf0, buf1);
              ii += 2;
            }
          } else {
            removed.push(buffers[ii].slice(start));
            buffers[ii] = buffers[ii].slice(0, start);
            ii++;
          }
        }
        if (reps.length > 0) {
          buffers.splice.apply(buffers, [ii, 0].concat(reps));
          ii += reps.length;
        }
        while (removed.length < howMany) {
          var buf = buffers[ii];
          var len = buf.length;
          var take = Math.min(len, howMany - removed.length);
          if (take === len) {
            removed.push(buf);
            buffers.splice(ii, 1);
          } else {
            removed.push(buf.slice(0, take));
            buffers[ii] = buffers[ii].slice(take);
          }
        }
        this.length -= removed.length;
        return removed;
      };
      Buffers.prototype.slice = function(i, j) {
        var buffers = this.buffers;
        if (j === void 0) j = this.length;
        if (i === void 0) i = 0;
        if (j > this.length) j = this.length;
        var startBytes = 0;
        for (var si = 0; si < buffers.length && startBytes + buffers[si].length <= i; si++) {
          startBytes += buffers[si].length;
        }
        var target = new Buffer(j - i);
        var ti = 0;
        for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
          var len = buffers[ii].length;
          var start = ti === 0 ? i - startBytes : 0;
          var end = ti + len >= j - i ? Math.min(start + (j - i) - ti, len) : len;
          buffers[ii].copy(target, ti, start, end);
          ti += end - start;
        }
        return target;
      };
      Buffers.prototype.pos = function(i) {
        if (i < 0 || i >= this.length) throw new Error("oob");
        var l = i, bi = 0, bu = null;
        for (; ; ) {
          bu = this.buffers[bi];
          if (l < bu.length) {
            return { buf: bi, offset: l };
          } else {
            l -= bu.length;
          }
          bi++;
        }
      };
      Buffers.prototype.get = function get(i) {
        var pos = this.pos(i);
        return this.buffers[pos.buf].get(pos.offset);
      };
      Buffers.prototype.set = function set(i, b) {
        var pos = this.pos(i);
        return this.buffers[pos.buf].set(pos.offset, b);
      };
      Buffers.prototype.indexOf = function(needle, offset) {
        if ("string" === typeof needle) {
          needle = new Buffer(needle);
        } else if (needle instanceof Buffer) {
        } else {
          throw new Error("Invalid type for a search string");
        }
        if (!needle.length) {
          return 0;
        }
        if (!this.length) {
          return -1;
        }
        var i = 0, j = 0, match = 0, mstart, pos = 0;
        if (offset) {
          var p = this.pos(offset);
          i = p.buf;
          j = p.offset;
          pos = offset;
        }
        for (; ; ) {
          while (j >= this.buffers[i].length) {
            j = 0;
            i++;
            if (i >= this.buffers.length) {
              return -1;
            }
          }
          var char = this.buffers[i][j];
          if (char == needle[match]) {
            if (match == 0) {
              mstart = {
                i,
                j,
                pos
              };
            }
            match++;
            if (match == needle.length) {
              return mstart.pos;
            }
          } else if (match != 0) {
            i = mstart.i;
            j = mstart.j;
            pos = mstart.pos;
            match = 0;
          }
          j++;
          pos++;
        }
      };
      Buffers.prototype.toBuffer = function() {
        return this.slice();
      };
      Buffers.prototype.toString = function(encoding, start, end) {
        return this.slice(start, end).toString(encoding);
      };
    }
  });

  // node_modules/ebml/lib/ebml/encoder.js
  var require_encoder = __commonJS({
    "node_modules/ebml/lib/ebml/encoder.js"(exports, module) {
      var Transform = require_stream_browserify().Transform;
      var tools = require_tools();
      var schema = require_schema();
      var debug = require_src()("ebml:encoder");
      var Buffers = require_buffers();
      function EbmlEncoder(options) {
        options = options || {};
        options.writableObjectMode = true;
        Transform.call(this, options);
        this._schema = schema;
        this._buffer = null;
        this._corked = false;
        this._stack = [];
      }
      require_util2().inherits(EbmlEncoder, Transform);
      EbmlEncoder.prototype._transform = function(chunk, enc, done) {
        debug("encode " + chunk[0] + " " + chunk[1].name);
        if (chunk[0] === "start") {
          this.startTag(chunk[1].name, chunk[1]);
        } else if (chunk[0] === "tag") {
          this.writeTag(chunk[1].name, chunk[1].data);
        } else if (chunk[0] === "end") {
          this.endTag(chunk[1].name);
        }
        done();
      };
      EbmlEncoder.prototype._flush = function(done) {
        done = done || function() {
        };
        if (!this._buffer || this._corked) {
          debug("no buffer/nothing pending");
          done();
          return;
        }
        debug("writing " + this._buffer.length + " bytes");
        var chunk = this._buffer.toBuffer();
        this._buffer = null;
        this.push(chunk);
        done();
      };
      EbmlEncoder.prototype._bufferAndFlush = function(buffer) {
        if (this._buffer) {
          this._buffer.push(buffer);
        } else {
          this._buffer = Buffers([buffer]);
        }
        this._flush();
      };
      EbmlEncoder.prototype.getSchemaInfo = function(tagName) {
        var tagStrs = Object.keys(this._schema);
        for (var i = 0; i < tagStrs.length; i++) {
          var tagStr = tagStrs[i];
          if (this._schema[tagStr].name === tagName) {
            return new Buffer(tagStr, "hex");
          }
        }
        return null;
      };
      EbmlEncoder.prototype.cork = function() {
        this._corked = true;
      };
      EbmlEncoder.prototype.uncork = function() {
        this._corked = false;
        this._flush();
      };
      EbmlEncoder.prototype._encodeTag = function(tagId, tagData, end) {
        return Buffers([tagId, end === -1 ? Buffer("01ffffffffffffff", "hex") : tools.writeVint(tagData.length), tagData]);
      };
      EbmlEncoder.prototype.writeTag = function(tagName, tagData) {
        var tagId = this.getSchemaInfo(tagName);
        if (!tagId) {
          throw new Error("No schema entry found for " + tagName);
        }
        var data = this._encodeTag(tagId, tagData);
        if (this._stack.length > 0) {
          this._stack[this._stack.length - 1].children.push({
            data
          });
        } else {
          this._bufferAndFlush(data.toBuffer());
        }
      };
      EbmlEncoder.prototype.startTag = function(tagName, info) {
        var tagId = this.getSchemaInfo(tagName);
        if (!tagId) {
          throw new Error("No schema entry found for " + tagName);
        }
        var tag = {
          id: tagId,
          name: tagName,
          end: info.end,
          children: []
        };
        if (this._stack.length > 0) {
          this._stack[this._stack.length - 1].children.push(tag);
        }
        this._stack.push(tag);
      };
      EbmlEncoder.prototype.endTag = function() {
        var tag = this._stack.pop();
        var childTagDataBuffers = tag.children.map(function(child) {
          return child.data;
        });
        tag.data = this._encodeTag(tag.id, Buffers(childTagDataBuffers), tag.end);
        if (this._stack.length < 1) {
          this._bufferAndFlush(tag.data.toBuffer());
        }
      };
      module.exports = EbmlEncoder;
    }
  });

  // node_modules/ebml/lib/ebml/index.js
  var require_ebml = __commonJS({
    "node_modules/ebml/lib/ebml/index.js"(exports, module) {
      module.exports = {
        tools: require_tools(),
        schema: require_schema(),
        Decoder: require_decoder(),
        Encoder: require_encoder()
      };
    }
  });

  // node_modules/ebml/index.js
  var require_ebml2 = __commonJS({
    "node_modules/ebml/index.js"(exports, module) {
      module.exports = require_ebml();
    }
  });

  // src/browser/index.js
  var browser_exports = {};
  __export(browser_exports, {
    MKVPlayer: () => MKVPlayer,
    MSEPlayer: () => MSEPlayer,
    OverlayManager: () => OverlayManager,
    attachSubtitleTracks: () => attachSubtitleTracks,
    createExtractorUI: () => createExtractorUI,
    createPlayer: () => createPlayer,
    createWorkerClient: () => createWorkerClient,
    demux: () => demuxer_default,
    extractAttachments: () => attachments_default,
    extractCues: () => extractCues,
    extractSubtitles: () => extract_default,
    getPlaybackSupport: () => getPlaybackSupport,
    hevcCodecString: () => hevcCodecString,
    isHevcMseSupported: () => isHevcMseSupported,
    loadFfmpeg: () => loadFfmpeg,
    registerMKVPlayerElement: () => registerMKVPlayerElement,
    remuxToMp4: () => remuxToMp4,
    resolvePlaybackStrategy: () => resolvePlaybackStrategy,
    transcodeToMp4: () => transcodeToMp4
  });

  // src/core/demuxer.js
  var import_filereader_stream = __toESM(require_filereader_stream(), 1);
  var import_progress_stream = __toESM(require_progress_stream(), 1);
  var import_stream = __toESM(require_stream_browserify(), 1);

  // src/core/constants.js
  var TRACK_TYPES = {
    VIDEO: 1,
    AUDIO: 2,
    COMPLEX: 3,
    LOGO: 16,
    SUBTITLE: 17,
    BUTTONS: 18,
    CONTROL: 32
  };
  var CODEC_IDS = {
    V_MPEG4_ISO_AVC: "V_MPEG4/ISO/AVC",
    V_MPEGH_HEVC: "V_MPEGH/ISO/HEVC",
    A_AAC: "A_AAC",
    A_AC3: "A_AC3",
    A_EAC3: "A_EAC3",
    A_MPEG_L3: "A_MPEG/L3",
    A_OPUS: "A_OPUS",
    A_VORBIS: "A_VORBIS",
    S_TEXT_UTF8: "S_TEXT/UTF8",
    S_TEXT_ASCII: "S_TEXT/ASCII",
    S_TEXT_ASS: "S_TEXT/ASS",
    S_TEXT_SSA: "S_TEXT/SSA",
    S_TEXT_USF: "S_TEXT/USF",
    S_TEXT_WEBVTT: "S_TEXT/WEBVTT",
    S_HDMV_PGS: "S_HDMV/PGS",
    S_VOBSUB: "S_VOBSUB"
  };
  function isBitmapSubtitleCodec(codecId) {
    return codecId === CODEC_IDS.S_HDMV_PGS || codecId === CODEC_IDS.S_VOBSUB;
  }

  // src/core/ebml-reader.js
  var import_ebml = __toESM(require_ebml2(), 1);
  function createDecoder() {
    return new import_ebml.default.Decoder();
  }
  function readVint(data) {
    return import_ebml.default.tools.readVint(data);
  }

  // src/core/demuxer.js
  function demux(source, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      let stream;
      try {
        stream = sourceToStream(source);
      } catch (error) {
        reject(error);
        return;
      }
      const result = {
        info: {},
        tracks: [],
        attachments: [],
        blocksByTrack: /* @__PURE__ */ new Map()
      };
      const decoder = createDecoder();
      const state = {
        track: null,
        attachment: null,
        clusterTimecode: 0,
        trackByNumber: /* @__PURE__ */ Object.create(null),
        timecodeScale: 1e6,
        stack: [],
        lastBlock: null
      };
      state.collectMediaBlocks = Boolean(options.collectMediaBlocks);
      let progress;
      let settled = false;
      const fail = (error) => {
        if (settled) return;
        settled = true;
        if (progress && progress.destroy) progress.destroy();
        if (stream.destroy) stream.destroy();
        reject(error);
      };
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve(result);
      };
      if (options.signal) {
        if (options.signal.aborted) {
          fail(abortError());
          return;
        }
        options.signal.addEventListener("abort", () => fail(abortError()));
      }
      if (options.onProgress) {
        progress = (0, import_progress_stream.default)({ time: 1e3, length: source.size || 0 }, (data) => {
          options.onProgress(data.percentage, data.eta);
        });
        stream = stream.pipe(progress);
      }
      decoder.on("error", fail);
      decoder.on("data", (chunk) => handleChunk(chunk, result, state));
      decoder.on("end", finish);
      stream.on("error", fail);
      stream.on("end", finish);
      stream.pipe(decoder);
    });
  }
  function handleChunk(chunk, result, state) {
    const event = chunk[0];
    const tag = chunk[1];
    if (!tag) return;
    if (event === "start") {
      state.stack.push(tag.name);
      if (tag.name === "TrackEntry") state.track = {};
      if (tag.name === "AttachedFile") state.attachment = {};
      return;
    }
    if (event === "end") {
      if (tag.name === "TrackEntry" && state.track && state.track.number) {
        const track = state.track;
        result.tracks.push(track);
        state.trackByNumber[track.number] = track;
        if (track.type === TRACK_TYPES.SUBTITLE || state.collectMediaBlocks && (track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO)) {
          result.blocksByTrack.set(track.number, []);
        }
        state.track = null;
      }
      if (tag.name === "AttachedFile" && state.attachment && state.attachment.data) {
        result.attachments.push(state.attachment);
        state.attachment = null;
      }
      state.stack.pop();
      return;
    }
    if (event !== "tag") return;
    const name = tag.name;
    const value = tag.data;
    if (state.track) {
      if (name === "TrackNumber") state.track.number = numberValue(value);
      if (name === "TrackType") state.track.type = numberValue(value);
      if (name === "CodecID") state.track.codecId = stringValue(value);
      if (name === "CodecPrivate") state.track.codecPrivate = value;
      if (name === "Language") state.track.language = stringValue(value);
      if (name === "Name") state.track.name = stringValue(value);
      if (name === "FlagDefault") state.track.default = Boolean(numberValue(value));
      if (name === "PixelWidth") state.track.width = numberValue(value);
      if (name === "PixelHeight") state.track.height = numberValue(value);
      if (name === "SamplingFrequency") state.track.samplingFrequency = Number(value);
      if (name === "Channels") state.track.channels = numberValue(value);
    }
    if (state.attachment) {
      if (name === "FileName") state.attachment.name = stringValue(value);
      if (name === "FileMimeType") state.attachment.mimeType = stringValue(value);
      if (name === "FileData") state.attachment.data = value;
    }
    if (name === "Duration") result.info.duration = Number(value);
    if (name === "Title") result.info.title = stringValue(value);
    if (name === "TimecodeScale") state.timecodeScale = numberValue(value);
    if (name === "Timecode") state.clusterTimecode = numberValue(value);
    if (name === "BlockDuration" && state.lastBlock && state.stack.indexOf("BlockGroup") !== -1) {
      const duration = toMilliseconds(numberValue(value), state.timecodeScale);
      state.lastBlock.duration = duration;
      if (state.lastBlock.durationMs !== void 0) state.lastBlock.durationMs = duration;
    }
    if (name === "SimpleBlock" || name === "Block") addBlock(value, result, state);
  }
  function addBlock(data, result, state) {
    const trackVint = readVint(data);
    const trackNumber = trackVint.value;
    const track = state.trackByNumber[trackNumber];
    if (!track || !result.blocksByTrack.has(trackNumber)) return;
    const bytes3 = new Uint8Array(data);
    const view = new DataView(bytes3.buffer, bytes3.byteOffset, bytes3.byteLength);
    const relativeTimecode = view.getInt16(trackVint.length);
    const flags = bytes3[trackVint.length + 2];
    const payload = new Uint8Array(data.slice(trackVint.length + 3));
    const timestamp = toMilliseconds(state.clusterTimecode + relativeTimecode, state.timecodeScale);
    const media = track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO;
    const binarySubtitle = track.type === TRACK_TYPES.SUBTITLE && isBitmapSubtitleCodec(track.codecId);
    const block = {
      trackNumber,
      timecode: timestamp,
      duration: 0,
      data: media || binarySubtitle ? payload : Buffer.from(payload).toString("utf8"),
      keyframe: Boolean(flags & 128)
    };
    if (binarySubtitle) block.isBinary = true;
    if (media) {
      block.clusterTimecodeMs = toMilliseconds(state.clusterTimecode, state.timecodeScale);
      block.blockTimestamp = timestamp;
      block.durationMs = 0;
    }
    state.lastBlock = block;
    result.blocksByTrack.get(trackNumber).push(block);
  }
  function toMilliseconds(timecode, scale) {
    return timecode * scale / 1e6;
  }
  function sourceToStream(source) {
    if (source && typeof source.pipe === "function") return source;
    if (source instanceof ArrayBuffer) return readableFromBuffer(new Uint8Array(source));
    if (typeof Blob !== "undefined" && source instanceof Blob) {
      return (0, import_filereader_stream.default)(source, { chunkSize: 2 * 1024 * 1024 });
    }
    if (source && typeof source.getReader === "function") return readableFromWebStream(source);
    throw new TypeError("source must be a File, Blob, ArrayBuffer, or ReadableStream");
  }
  function readableFromBuffer(buffer) {
    const stream = new import_stream.Readable();
    stream._read = () => {
      stream.push(Buffer.from(buffer));
      stream.push(null);
    };
    return stream;
  }
  function readableFromWebStream(webStream) {
    const stream = new import_stream.Readable({ read: () => {
    } });
    const reader = webStream.getReader();
    const pump = () => reader.read().then((result) => {
      if (result.done) stream.push(null);
      else {
        stream.push(Buffer.from(result.value));
        pump();
      }
    }).catch((error) => stream.destroy(error));
    pump();
    return stream;
  }
  function numberValue(value) {
    return typeof value === "number" ? value : Number(value);
  }
  function stringValue(value) {
    return Buffer.isBuffer(value) ? value.toString() : String(value);
  }
  function abortError() {
    const error = new Error("Demux aborted");
    error.name = "AbortError";
    return error;
  }
  var demuxer_default = demux;

  // src/subtitles/format.js
  function formatTimestamp(timestamp) {
    const seconds = timestamp / 1e3;
    const hh = Math.floor(seconds / 3600);
    let mm = Math.floor((seconds - hh * 3600) / 60);
    let ss = (seconds - hh * 3600 - mm * 60).toFixed(2);
    if (mm < 10) mm = `0${mm}`;
    if (ss < 10) ss = `0${ss}`;
    return `${hh}:${mm}:${ss}`;
  }
  function formatTimestampSRT(timestamp) {
    const seconds = timestamp / 1e3;
    let hh = Math.floor(seconds / 3600);
    let mm = Math.floor((seconds - hh * 3600) / 60);
    let ss = (seconds - hh * 3600 - mm * 60).toFixed(3);
    if (hh < 10) hh = `0${hh}`;
    if (mm < 10) mm = `0${mm}`;
    if (ss < 10) ss = `0${ss}`;
    return `${hh}:${mm}:${ss}`;
  }
  function formatDuration(duration) {
    duration = Math.round(duration);
    if (duration < 2) return "few seconds";
    if (duration < 58) return duration + " seconds";
    if (duration < 120) return "1 minute";
    if (duration < 3598) return Math.floor(duration / 60) + " minutes";
    if (duration < 7200) return "2 hours";
    return Math.floor(duration / 3600) + " hours";
  }

  // src/subtitles/extract.js
  var DEFAULT_DURATION = 2e3;
  function extractCues(result, trackNumber) {
    const track = result.tracks.find((item) => item.number === trackNumber);
    if (!track) return [];
    const blocks = getBlocks(result, trackNumber);
    const format = detectFormat(track, blocks);
    return blocks.map((block, index) => {
      const endMs = block.duration > 0 ? block.timecode + block.duration : blocks[index + 1] && blocks[index + 1].timecode > block.timecode ? blocks[index + 1].timecode : block.timecode + DEFAULT_DURATION;
      if (block.isBinary || format === "pgs" || format === "vobsub") {
        return { startMs: block.timecode, endMs, data: block.data, format };
      }
      return {
        startMs: block.timecode,
        endMs,
        text: format === "ass" ? assText(block.data, track.codecPrivate) : block.data,
        format
      };
    });
  }
  function extractSubtitles(result) {
    return result.tracks.filter((track) => track.type === TRACK_TYPES.SUBTITLE).map((track, index) => {
      const blocks = getBlocks(result, track.number);
      const cues = extractCues(result, track.number);
      const format = cues[0] ? cues[0].format : detectFormat(track, []);
      const extension = format === "ass" ? ".ass" : format === "pgs" ? ".sup" : format === "vobsub" ? ".sub" : ".srt";
      const data = format === "pgs" || format === "vobsub" ? cues.map((cue) => cue.data) : format === "ass" ? assData(track, cues, blocks) : srtData(cues);
      const name = "Subtitle_" + (index + 1) + extension;
      return { name, data };
    });
  }
  function getBlocks(result, trackNumber) {
    const blocks = result.blocksByTrack instanceof Map ? result.blocksByTrack.get(trackNumber) : result.blocksByTrack && result.blocksByTrack[trackNumber];
    return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode);
  }
  function detectFormat(track, blocks) {
    const codecId = track.codecId;
    if (codecId === CODEC_IDS.S_HDMV_PGS) return "pgs";
    if (codecId === CODEC_IDS.S_VOBSUB) return "vobsub";
    if (codecId === CODEC_IDS.S_TEXT_ASS || codecId === CODEC_IDS.S_TEXT_SSA) return "ass";
    if (codecId === CODEC_IDS.S_TEXT_UTF8 || codecId === CODEC_IDS.S_TEXT_ASCII) return "srt";
    const privateData = bufferToString(track.codecPrivate);
    if (/\[Events\][\s\S]*^\s*Format:/im.test(privateData)) return "ass";
    return blocks.some((block) => /^\s*Dialogue\s*:/i.test(block.data) || /^\s*Format\s*:/im.test(block.data)) ? "ass" : "srt";
  }
  function assData(track, cues, blocks) {
    const header = bufferToString(track.codecPrivate);
    const lines = cues.map((cue, index) => assDialogue(
      cue,
      track.codecPrivate,
      blocks[index] ? blocks[index].data : cue.text
    ));
    if (!header) return lines.join("\r\n") + (lines.length ? "\r\n" : "");
    return header + (header.endsWith("\n") ? "" : "\r\n") + lines.join("\r\n") + (lines.length ? "\r\n" : "");
  }
  function assDialogue(cue, codecPrivate3, data) {
    const fields = data.split(",");
    const format = assFormat(codecPrivate3);
    const start = format.indexOf("start");
    const end = format.indexOf("end");
    if (start !== -1 && end !== -1) {
      fields[start] = formatTimestamp(cue.startMs);
      fields[end] = formatTimestamp(cue.endMs);
      return "Dialogue: " + fields.join(",");
    }
    return "Dialogue: " + [
      fields[0] || "0",
      formatTimestamp(cue.startMs),
      formatTimestamp(cue.endMs)
    ].concat(fields.slice(1)).join(",");
  }
  function assText(data, codecPrivate3) {
    const fields = data.split(",");
    const format = assFormat(codecPrivate3);
    const textIndex = format.indexOf("text");
    return textIndex === -1 ? fields[fields.length - 1] : fields.slice(textIndex).join(",");
  }
  function assFormat(codecPrivate3) {
    const match = bufferToString(codecPrivate3).match(/^\s*Format:\s*([^\r\n]*)/im);
    return match ? match[1].split(",").map((field) => field.trim().toLowerCase()) : [];
  }
  function srtData(cues) {
    return cues.map((cue, index) => index + 1 + "\r\n" + formatTimestampSRT(cue.startMs).replace(".", ",") + " --> " + formatTimestampSRT(cue.endMs).replace(".", ",") + "\r\n" + cue.text + "\r\n").join("\r\n");
  }
  function bufferToString(value) {
    return value == null ? "" : Buffer.from(value).toString("utf8");
  }
  var extract_default = extractSubtitles;

  // src/extract/attachments.js
  function extractAttachments(result) {
    return result.attachments.map((attachment) => ({
      name: attachment.name,
      data: attachment.data
    }));
  }
  var attachments_default = extractAttachments;

  // src/playback/hevc/hevc-codec.js
  function hevcCodecString(codecPrivate3) {
    const data = codecPrivate3 instanceof Uint8Array ? codecPrivate3 : new Uint8Array(codecPrivate3 || []);
    if (data.length < 13 || data[0] !== 1) return "hvc1.1.6.L93.B0";
    const profileSpace = ["", "A", "B", "C"][data[1] >> 6 & 3];
    const profile = data[1] & 31;
    const compatibility = (data[2] << 24 | data[3] << 16 | data[4] << 8 | data[5]) >>> 0;
    const compatibilityString = compatibility.toString(16).toUpperCase().replace(/^0+(?=.)/, "");
    const tier = data[1] & 32 ? "H" : "L";
    const level = data[12];
    const constraints = Array.from(data.slice(6, 12));
    while (constraints.length && constraints[constraints.length - 1] === 0) constraints.pop();
    const constraintString = constraints.length ? `.${constraints.map((byte) => byte.toString(16).toUpperCase().padStart(2, "0")).join("")}` : "";
    return `hvc1.${profileSpace}${profile}.${compatibilityString}.${tier}${level}${constraintString}`;
  }

  // src/playback/hevc/mse-probe.js
  function isHevcMseSupported(codecPrivate3) {
    if (typeof MediaSource === "undefined" || typeof MediaSource.isTypeSupported !== "function") return false;
    const codec = hevcCodecString(codecPrivate3);
    return Boolean(codec && MediaSource.isTypeSupported(`video/mp4; codecs="${codec}"`));
  }

  // src/playback/strategy.js
  function resolvePlaybackStrategy(tracks, options = {}) {
    const transcodeEnabled = options.transcode === true || options.transcode === "auto";
    const videoTrack = tracks.find((track) => track.type === TRACK_TYPES.VIDEO);
    const audioTrack = tracks.find((track) => track.type === TRACK_TYPES.AUDIO);
    const codecs = [videoTrack, audioTrack].filter(Boolean).map((track) => track.codecId);
    if (!videoTrack && !audioTrack) {
      return { strategy: "unsupported", supported: false, reason: "No video or audio tracks found", videoTrack, audioTrack, codecs };
    }
    if (videoTrack && videoTrack.codecId === CODEC_IDS.V_MPEGH_HEVC) {
      if (transcodeEnabled) {
        return { strategy: "transcode", supported: true, reason: "HEVC requires remux or transcode", videoTrack, audioTrack, codecs };
      }
      if (isHevcMseSupported(videoTrack.codecPrivate)) {
        return { strategy: "remux-hevc", supported: true, videoTrack, audioTrack, codecs };
      }
      return { strategy: "transcode", supported: false, reason: "HEVC requires remux or transcode", videoTrack, audioTrack, codecs };
    }
    const supportedVideo = !videoTrack || videoTrack.codecId === CODEC_IDS.V_MPEG4_ISO_AVC || videoTrack.codecId === "V_AV1";
    const supportedAudio = !audioTrack || audioTrack.codecId === CODEC_IDS.A_AAC || audioTrack.codecId === CODEC_IDS.A_MPEG_L3;
    if (!supportedVideo || !supportedAudio) {
      const reason = !supportedVideo ? `Unsupported video codec: ${videoTrack.codecId || "unknown"}` : `Unsupported audio codec: ${audioTrack.codecId || "unknown"}`;
      if (transcodeEnabled) return { strategy: "transcode", supported: true, reason, videoTrack, audioTrack, codecs };
      return { strategy: "unsupported", supported: false, reason, videoTrack, audioTrack, codecs };
    }
    return { strategy: "remux-mse", supported: true, videoTrack, audioTrack, codecs };
  }

  // src/playback/codecs.js
  function getPlaybackSupport(tracks) {
    const strategy = resolvePlaybackStrategy(tracks);
    const reason = strategy.reason === "HEVC requires remux or transcode" ? `Unsupported video codec: ${CODEC_IDS.V_MPEGH_HEVC}; ${strategy.reason}` : strategy.reason;
    return {
      supported: strategy.supported,
      videoTrack: strategy.videoTrack,
      audioTrack: strategy.audioTrack,
      ...reason ? { reason } : {}
    };
  }

  // src/playback/hevc/remux-hevc.js
  function bytes(...parts) {
    const output = new Uint8Array(parts.reduce((length, part) => length + part.length, 0));
    let offset = 0;
    parts.forEach((part) => {
      output.set(part, offset);
      offset += part.length;
    });
    return output;
  }
  function u32(value) {
    const output = new Uint8Array(4);
    new DataView(output.buffer).setUint32(0, value >>> 0);
    return output;
  }
  function u16(value) {
    const output = new Uint8Array(2);
    new DataView(output.buffer).setUint16(0, value);
    return output;
  }
  function box(type, content) {
    return bytes(u32(content.length + 8), new TextEncoder().encode(type), content);
  }
  function codecPrivate(track) {
    return track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || []);
  }
  function hevcVisualSampleEntry(track) {
    const width = track.width || 1920;
    const height = track.height || 1080;
    const compressor = new Uint8Array(32);
    const data = bytes(
      new Uint8Array(6),
      u16(1),
      new Uint8Array(16),
      u16(width),
      u16(height),
      u32(4718592),
      u32(4718592),
      new Uint8Array(4),
      new Uint8Array([0, 0]),
      compressor,
      u16(24),
      u16(65535),
      box("hvcC", codecPrivate(track))
    );
    return box("hvc1", data);
  }
  function nextStart(data, start) {
    for (let i = start; i + 3 < data.length; i++) {
      if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || data[i + 2] === 0 && data[i + 3] === 1)) return i;
    }
    return data.length;
  }
  function hevcSample(data) {
    const input = data instanceof Uint8Array ? data : new Uint8Array(data);
    const nals = [];
    let start = 0;
    while (start < input.length) {
      let marker = -1;
      for (let i = start; i + 3 < input.length; i++) {
        if (input[i] === 0 && input[i + 1] === 0 && (input[i + 2] === 1 || input[i + 2] === 0 && input[i + 3] === 1)) {
          marker = i;
          break;
        }
      }
      if (marker < 0) break;
      const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4);
      const nalEnd = nextStart(input, nalStart);
      if (nalEnd > nalStart) nals.push(bytes(u32(nalEnd - nalStart), input.slice(nalStart, nalEnd)));
      start = nalEnd;
    }
    return nals.length ? bytes(...nals) : input;
  }

  // src/playback/remux.js
  var encoder = new TextEncoder();
  function bytes2(...parts) {
    const length = parts.reduce((total, part) => total + part.length, 0);
    const output = new Uint8Array(length);
    let offset = 0;
    parts.forEach((part) => {
      output.set(part, offset);
      offset += part.length;
    });
    return output;
  }
  function u322(value) {
    const output = new Uint8Array(4);
    new DataView(output.buffer).setUint32(0, value >>> 0);
    return output;
  }
  function i32(value) {
    const output = new Uint8Array(4);
    new DataView(output.buffer).setInt32(0, value);
    return output;
  }
  function u162(value) {
    const output = new Uint8Array(2);
    new DataView(output.buffer).setUint16(0, value);
    return output;
  }
  function box2(type, ...contents) {
    const body = bytes2(...contents);
    return bytes2(u322(body.length + 8), encoder.encode(type), body);
  }
  function fullBox(type, version, flags, ...contents) {
    return box2(type, bytes2(new Uint8Array([version]), new Uint8Array([
      flags >>> 16 & 255,
      flags >>> 8 & 255,
      flags & 255
    ]), ...contents));
  }
  function codecPrivate2(track) {
    return track.codecPrivate instanceof Uint8Array ? track.codecPrivate : track.codecPrivate ? new Uint8Array(track.codecPrivate) : new Uint8Array(0);
  }
  function avcConfig(track) {
    const privateData = codecPrivate2(track);
    if (privateData.length >= 7 && privateData[0] === 1) return privateData;
    const sps = findNal(privateData, 7);
    const pps = findNal(privateData, 8);
    if (!sps || !pps) {
      return new Uint8Array([1, 66, 0, 30, 255, 225, 0, 0, 1, 0, 0, 0, 1, 0]);
    }
    return bytes2(
      new Uint8Array([1, sps[1] || 66, sps[2] || 0, sps[3] || 30, 255, 225]),
      u162(sps.length),
      sps,
      new Uint8Array([1]),
      u162(pps.length),
      pps
    );
  }
  function findNal(data, type) {
    let start = 0;
    while (start + 4 < data.length) {
      if (data[start] === 0 && data[start + 1] === 0 && (data[start + 2] === 1 || data[start + 2] === 0 && data[start + 3] === 1)) {
        const header = data[start + 2] === 1 ? start + 3 : start + 4;
        const end = nextStart2(data, header);
        if ((data[header] & 31) === type) return data.slice(header, end);
        start = end;
      } else start++;
    }
    return null;
  }
  function nextStart2(data, start) {
    for (let i = start; i + 3 < data.length; i++) {
      if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || data[i + 2] === 0 && data[i + 3] === 1)) return i;
    }
    return data.length;
  }
  function h264Sample(data) {
    const input = data instanceof Uint8Array ? data : new Uint8Array(data);
    const output = [];
    let offset = 0;
    while (offset + 4 <= input.length) {
      const length = new DataView(input.buffer, input.byteOffset + offset, 4).getUint32(0);
      if (length === 0 || offset + 4 + length > input.length) break;
      output.push(input.slice(offset, offset + 4 + length));
      offset += 4 + length;
    }
    if (output.length && offset === input.length) return bytes2(...output);
    const nals = [];
    let start = 0;
    while (start < input.length) {
      const marker = startCode(input, start);
      if (marker < 0) break;
      const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4);
      const nalEnd = nextStart2(input, nalStart);
      if (nalEnd > nalStart) nals.push(bytes2(u322(nalEnd - nalStart), input.slice(nalStart, nalEnd)));
      start = nalEnd;
    }
    return nals.length ? bytes2(...nals) : input;
  }
  function startCode(data, from) {
    for (let i = from; i + 3 < data.length; i++) {
      if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || data[i + 2] === 0 && data[i + 3] === 1)) return i;
    }
    return -1;
  }
  function audioSample(data, track) {
    const input = data instanceof Uint8Array ? data : new Uint8Array(data);
    if (track.codecId === CODEC_IDS.A_AAC && input.length > 7 && input[0] === 255 && (input[1] & 240) === 240) {
      const protection = input[1] & 1;
      const length = (input[3] & 3) << 11 | input[4] << 3 | input[5] >> 5;
      return input.slice(7 + (protection ? 0 : 2), length);
    }
    return input;
  }
  function visualSampleEntry(track) {
    if (track.codecId === CODEC_IDS.V_MPEGH_HEVC) return hevcVisualSampleEntry(track);
    const width = track.width || 1920;
    const height = track.height || 1080;
    const compressor = new Uint8Array(32);
    const config = box2("avcC", avcConfig(track));
    const data = bytes2(
      new Uint8Array(6),
      u162(1),
      new Uint8Array(16),
      u162(width),
      u162(height),
      u322(4718592),
      u322(4718592),
      new Uint8Array(4),
      new Uint8Array([0, 0]),
      compressor,
      u162(24),
      u162(65535),
      config
    );
    return box2("avc1", data);
  }
  function audioSampleEntry(track) {
    const config = codecPrivate2(track);
    const esds = fullBox("esds", 0, 0, bytes2(
      new Uint8Array([
        3,
        25,
        0,
        0,
        0,
        4,
        17,
        64,
        21,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5,
        config.length
      ]),
      config,
      new Uint8Array([6, 1, 2])
    ));
    const rate = track.samplingFrequency || 48e3;
    return box2("mp4a", bytes2(
      new Uint8Array(6),
      u162(1),
      new Uint8Array(8),
      u162(track.channels || 2),
      u162(16),
      u162(0),
      u162(0),
      u322(rate << 16),
      esds
    ));
  }
  function trackBox(track, id) {
    const video = track.type === TRACK_TYPES.VIDEO;
    const handler = video ? "vide" : "soun";
    const sampleEntry = video ? visualSampleEntry(track) : audioSampleEntry(track);
    const stbl = box2(
      "stbl",
      box2("stsd", bytes2(new Uint8Array([0, 0, 0, 0]), u322(1), sampleEntry)),
      box2("stts", new Uint8Array(8)),
      box2("stsc", new Uint8Array(8)),
      box2("stsz", new Uint8Array(12)),
      box2("stco", new Uint8Array(8))
    );
    const minf = box2(
      "minf",
      video ? box2("vmhd", new Uint8Array(8)) : box2("smhd", new Uint8Array(4)),
      box2("dinf", box2("dref", bytes2(new Uint8Array(4), u322(1), box2("url ", new Uint8Array([0, 0, 0, 1]))))),
      stbl
    );
    const tkhd = fullBox(
      "tkhd",
      0,
      7,
      new Uint8Array(16),
      u322(id),
      new Uint8Array(8),
      u162(0),
      new Uint8Array(2),
      new Uint8Array(8),
      u322(65536),
      new Uint8Array(8),
      u322(video ? (track.width || 1920) << 16 : 0),
      u322(video ? (track.height || 1080) << 16 : 0)
    );
    const mdhd = fullBox("mdhd", 0, 0, new Uint8Array(8), u322(1e3), u322(0), u162(21956), u162(0));
    const hdlr = fullBox(
      "hdlr",
      0,
      0,
      new Uint8Array(4),
      encoder.encode(handler),
      new Uint8Array(12),
      encoder.encode(video ? "VideoHandler\0" : "SoundHandler\0")
    );
    return box2("trak", tkhd, box2("mdia", mdhd, hdlr, minf));
  }
  async function createInitSegment(tracks) {
    const videoBrand = tracks.some((track) => track.codecId === CODEC_IDS.V_MPEGH_HEVC) ? "hvc1" : "avc1";
    const selected = tracks.filter((track) => track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO);
    const mvhd = fullBox(
      "mvhd",
      0,
      0,
      new Uint8Array(8),
      u322(1e3),
      u322(0),
      u322(65536),
      u162(256),
      new Uint8Array(10),
      new Uint8Array([
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2
      ])
    );
    const trex = selected.map((track, index) => fullBox(
      "trex",
      0,
      0,
      u322(index + 1),
      u322(1),
      u322(0),
      u322(0),
      u322(0),
      u322(0)
    ));
    return bytes2(box2("ftyp", bytes2(
      encoder.encode("isom"),
      new Uint8Array([0, 0, 2, 0]),
      encoder.encode(`isomiso6${videoBrand}mp41`)
    )), box2(
      "moov",
      mvhd,
      ...selected.map((track, index) => trackBox(track, index + 1)),
      box2("mvex", ...trex)
    ));
  }
  async function createMediaSegment(blocks, sequenceNumber = 1) {
    const grouped = /* @__PURE__ */ new Map();
    blocks.forEach((block) => {
      if (!grouped.has(block.trackNumber)) grouped.set(block.trackNumber, []);
      grouped.get(block.trackNumber).push(block);
    });
    const samples = [];
    grouped.forEach((trackBlocks, trackNumber) => {
      trackBlocks.forEach((block, index) => {
        const data = block.trackType === TRACK_TYPES.AUDIO ? audioSample(block.data, block.track) : block.track.codecId === CODEC_IDS.V_MPEGH_HEVC ? hevcSample(block.data) : h264Sample(block.data);
        samples.push({ trackNumber, block, data, duration: Math.max(1, Math.round(block.durationMs || block.duration || 33)), index });
      });
    });
    samples.sort((a, b) => (a.block.blockTimestamp || a.block.timecode || 0) - (b.block.blockTimestamp || b.block.timecode || 0));
    const trackSamplesByNumber = /* @__PURE__ */ new Map();
    grouped.forEach((trackBlocks, trackNumber) => {
      trackSamplesByNumber.set(trackNumber, samples.filter((sample) => sample.trackNumber === trackNumber));
    });
    const payload = bytes2(...Array.from(trackSamplesByNumber.values()).flat().map((sample) => sample.data));
    function makeMoof(dataOffset) {
      const trafs = [];
      grouped.forEach((trackBlocks, trackNumber) => {
        const trackSamples = trackSamplesByNumber.get(trackNumber);
        const entries = trackSamples.map((sample) => bytes2(
          u322(sample.duration),
          u322(sample.data.length),
          u322(sample.block.keyframe ? 33554432 : 16842752)
        ));
        const trun = fullBox("trun", 0, 1793, u322(trackSamples.length), i32(dataOffset), ...entries);
        const tfhd = fullBox("tfhd", 0, 131072, u322(trackNumber));
        const timestamp = Math.round(trackBlocks[0].blockTimestamp || trackBlocks[0].timecode || 0);
        const tfdt = fullBox("tfdt", 0, 0, u322(Math.max(0, timestamp)));
        trafs.push(box2("traf", tfhd, tfdt, trun));
      });
      return box2("moof", fullBox("mfhd", 0, 0, u322(sequenceNumber)), ...trafs);
    }
    let moof = makeMoof(0);
    moof = makeMoof(moof.length + 8);
    return bytes2(moof, box2("mdat", payload));
  }
  async function remuxToMp4(demuxResult, options = {}) {
    const support = getPlaybackSupport(demuxResult.tracks);
    if (!support.supported) throw new Error(support.reason);
    const tracks = [support.videoTrack, support.audioTrack].filter(Boolean);
    const blocks = [];
    tracks.forEach((track) => {
      ;
      (demuxResult.blocksByTrack.get(track.number) || []).forEach((block) => {
        blocks.push({ ...block, trackType: track.type, track });
      });
    });
    const init = await createInitSegment(tracks);
    const media = await createMediaSegment(blocks, options.sequenceNumber || 1);
    return { blob: new Blob([init, media], { type: "video/mp4" }), mimeType: "video/mp4" };
  }

  // src/browser/blob-manager.js
  var urls = /* @__PURE__ */ new Set();
  function createBlobUrl(value) {
    const url = URL.createObjectURL(value);
    urls.add(url);
    return url;
  }
  function revokeBlobUrl(url) {
    if (!url) return;
    URL.revokeObjectURL(url);
    urls.delete(url);
  }

  // src/playback/mse-player.js
  var MSEPlayer = class {
    constructor(videoElement, options = {}) {
      if (!videoElement) throw new TypeError("MSEPlayer requires a video element");
      this.video = videoElement;
      this.options = options;
      this.handlers = /* @__PURE__ */ new Map();
      this.source = null;
      this.buffer = null;
      this.queue = [];
      this.objectUrl = null;
    }
    on(event, handler) {
      if (!this.handlers.has(event)) this.handlers.set(event, []);
      this.handlers.get(event).push(handler);
      return () => this.handlers.get(event).splice(this.handlers.get(event).indexOf(handler), 1);
    }
    emit(event, value) {
      ;
      (this.handlers.get(event) || []).forEach((handler) => handler(value));
    }
    async load(demuxResult, loadOptions = {}) {
      const signal = loadOptions.signal || this.options.signal;
      if (signal && signal.aborted) throw abortError2();
      const support = getPlaybackSupport(demuxResult.tracks);
      if (!support.supported) throw new Error(support.reason);
      if (typeof MediaSource === "undefined") throw new Error("MediaSource is not supported");
      const result = await remuxToMp4(demuxResult, this.options);
      if (signal && signal.aborted) throw abortError2();
      const source = new MediaSource();
      this.source = source;
      this.objectUrl = createBlobUrl(source);
      this.video.src = this.objectUrl;
      await new Promise((resolve, reject) => {
        const onAbort = () => reject(abortError2());
        if (signal) signal.addEventListener("abort", onAbort, { once: true });
        source.addEventListener("sourceopen", () => {
          if (signal && signal.aborted) {
            reject(abortError2());
            return;
          }
          try {
            const codecs = [];
            if (support.videoTrack) codecs.push(codecString(support.videoTrack));
            if (support.audioTrack) codecs.push(codecString(support.audioTrack));
            this.buffer = source.addSourceBuffer(`video/mp4; codecs="${codecs.join(", ")}"`);
            this.buffer.addEventListener("updateend", () => this.flush(resolve));
            this.queue.push(awaitBuffer(result.blob));
            this.flush(resolve);
          } catch (error) {
            reject(error);
          }
          if (signal) signal.removeEventListener("abort", onAbort);
        }, { once: true });
        source.addEventListener("error", () => reject(new Error("MediaSource error")), { once: true });
      });
      this.emit("ready");
      return this;
    }
    flush(resolve) {
      if (!this.buffer || this.buffer.updating || !this.queue.length) return;
      const next = this.queue.shift();
      if (next && typeof next.then === "function") {
        next.then((data) => {
          this.buffer.appendBuffer(data);
          if (resolve) resolve();
        });
      } else {
        this.buffer.appendBuffer(next);
        if (resolve) resolve();
      }
      this.emit("progress");
    }
    destroy() {
      if (this.buffer) {
        this.buffer.removeEventListener("updateend", this.flush);
        if (this.source && this.source.readyState === "open") this.source.endOfStream();
      }
      if (this.objectUrl) revokeBlobUrl(this.objectUrl);
      this.video.removeAttribute("src");
      this.video.load();
      this.queue = [];
      this.buffer = null;
      this.source = null;
    }
  };
  function abortError2() {
    const error = new Error("MSE load aborted");
    error.name = "AbortError";
    return error;
  }
  function awaitBuffer(blob) {
    return blob.arrayBuffer().then((buffer) => new Uint8Array(buffer));
  }
  function codecString(track) {
    if (track.codecId === CODEC_IDS.V_MPEGH_HEVC) return hevcCodecString(track.codecPrivate);
    if (track.type === 1) {
      const data = track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || []);
      if (data[0] === 1 && data.length >= 4) {
        return `avc1.${Array.from(data.slice(1, 4)).map((byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
      }
      return "avc1.42E01E";
    }
    const config = track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || []);
    const objectType = config.length ? config[0] >> 3 : 2;
    return `mp4a.40.${objectType}`;
  }

  // ../srt2vtt.js/dist/chunk-IMOAXEAO.js
  var TIMESTAMP = /^\s*(?:(\d+):)?(\d{2}):(\d{2})(?:[,.](\d{1,3}))?\s*-->\s*(?:(\d+):)?(\d{2}):(\d{2})(?:[,.](\d{1,3}))?(?:\s+.*)?$/;
  var SAFE_TAG = /<\/?(?:b|i|u|ruby|rt|c(?:\.[\w-]+)*|v(?:\s+[^<>]*)?|lang(?:\s+[^<>]*)?)>/gi;
  function escapeText(text, sanitize, allowVttMarkup) {
    if (!sanitize) return text;
    if (allowVttMarkup) {
      const tags = [];
      const protectedText = text.replace(SAFE_TAG, (tag) => {
        tags.push(tag);
        return `\0${tags.length - 1}\0`;
      });
      return protectedText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u0000(\d+)\u0000/g, (_, index) => tags[index]);
    }
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function formatTimestamp2(match, start) {
    const hours = start ? match[1] || "0" : match[5] || "0";
    const minutes = start ? match[2] : match[6];
    const seconds = start ? match[3] : match[7];
    const milliseconds = start ? match[4] : match[8];
    return `${hours.padStart(2, "0")}:${minutes}:${seconds}.${(milliseconds || "0").padEnd(3, "0")}`;
  }
  function parseCue(block, cueIndex, options) {
    const lines = block.split("\n");
    let line = 0;
    let id = "";
    if (!TIMESTAMP.test(lines[0] || "")) {
      if (lines.length < 2 || !TIMESTAMP.test(lines[1])) {
        return { error: "Missing or invalid timestamp" };
      }
      id = lines[0];
      line = 1;
    }
    const timestamp = lines[line].match(TIMESTAMP);
    if (!timestamp) return { error: "Missing or invalid timestamp" };
    const output = [];
    if (options.preserveCueIds && id) output.push(id);
    output.push(`${formatTimestamp2(timestamp, true)} --> ${formatTimestamp2(timestamp, false)}`);
    const text = lines.slice(line + 1).join("\n");
    output.push(escapeText(text, options.sanitize, options.allowVttMarkup));
    return { value: output.join("\n") };
  }
  function convert(srtString, options = {}) {
    if (typeof srtString !== "string") {
      throw new TypeError("srtString must be a string");
    }
    const settings = {
      sanitize: options.sanitize !== false,
      allowVttMarkup: options.allowVttMarkup === true,
      strict: options.strict === true,
      preserveCueIds: options.preserveCueIds !== false
    };
    const normalized = srtString.replace(/^\uFEFF/, "").replace(/\r\n?|\u2028|\u2029/g, "\n").trim();
    const blocks = normalized ? normalized.split(/\n{2,}/) : [];
    const errors = [];
    const cues = [];
    blocks.forEach((block, index) => {
      if (/^WEBVTT(?:\s|$)/i.test(block)) return;
      const parsed = parseCue(block, index, settings);
      if (parsed.error) {
        errors.push({ cueIndex: index, message: parsed.error });
      } else {
        cues.push(parsed.value);
      }
    });
    const vtt = `WEBVTT

${cues.length ? `${cues.join("\n\n")}

` : ""}`;
    return settings.strict ? { vtt, errors } : vtt;
  }

  // src/subtitles/overlay/vtt-track-renderer.js
  function cueTimestamp(milliseconds) {
    const total = Math.max(0, milliseconds || 0);
    const hours = Math.floor(total / 36e5);
    const minutes = Math.floor(total % 36e5 / 6e4);
    const seconds = Math.floor(total % 6e4 / 1e3);
    const millis = Math.floor(total % 1e3);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
  }
  function stripAssTags(text) {
    return String(text || "").replace(/\{[^}]*\}/g, "").replace(/\\N/g, "\n").replace(/\\n/g, "\n").replace(/\\h/g, " ");
  }
  function cuesToSrt(cues) {
    return cues.map((cue, index) => `${index + 1}
${cueTimestamp(cue.startMs).replace(".", ",")} --> ${cueTimestamp(cue.endMs).replace(".", ",")}
${cue.text || ""}`).join("\n\n");
  }
  function cuesToVtt(cues, format) {
    if (format === "ass") {
      return `WEBVTT

${cues.map((cue) => `${cueTimestamp(cue.startMs)} --> ${cueTimestamp(cue.endMs)}
${stripAssTags(cue.text)}`).join("\n\n")}

`;
    }
    return convert(cuesToSrt(cues));
  }
  var VttTrackRenderer = class {
    attach(video, demuxResult, track, options = {}) {
      const doc = options.document || video.ownerDocument || (typeof document !== "undefined" ? document : null);
      if (!doc || typeof doc.createElement !== "function") {
        throw new Error("VttTrackRenderer requires a document");
      }
      const cues = options.cues || extractCues(demuxResult, track.number);
      const format = options.format || (cues[0] ? cues[0].format : "srt");
      const vtt = cuesToVtt(cues, format);
      const blobUrl = createBlobUrl(new Blob([vtt], { type: "text/vtt" }));
      const element = doc.createElement("track");
      element.kind = "subtitles";
      element.srclang = track.language || options.defaultLanguage || "und";
      element.label = track.name || track.language || `Subtitle ${options.index + 1}`;
      element.src = blobUrl;
      element.default = Boolean(track.default);
      video.appendChild(element);
      return {
        track,
        element,
        format,
        cues,
        src: blobUrl,
        revoke() {
          revokeBlobUrl(blobUrl);
          if (element && typeof element.remove === "function") element.remove();
        }
      };
    }
  };

  // src/subtitles/overlay/font-loader.js
  var FONT_MIME_PREFIXES = [
    "application/x-truetype-font",
    "application/vnd.ms-opentype",
    "font/otf",
    "font/ttf",
    "font/woff",
    "font/woff2"
  ];
  function isFontAttachment(attachment) {
    const mime = String(attachment.mimeType || "").toLowerCase();
    const name = String(attachment.name || "").toLowerCase();
    return FONT_MIME_PREFIXES.some((prefix) => mime.startsWith(prefix)) || /\.(ttf|otf|woff2?)$/i.test(name);
  }
  async function loadEmbeddedFonts(demuxResult, options = {}) {
    const doc = options.document || (typeof document !== "undefined" ? document : null);
    const attachments = demuxResult && demuxResult.attachments || [];
    const fontUrls = [];
    const styleElements = [];
    attachments.filter(isFontAttachment).forEach((attachment) => {
      if (!attachment.data) return;
      const mime = attachment.mimeType || "font/otf";
      const blobUrl = createBlobUrl(new Blob([attachment.data], { type: mime }));
      fontUrls.push(blobUrl);
      if (doc && typeof doc.createElement === "function") {
        const style = doc.createElement("style");
        const family = attachment.name ? attachment.name.replace(/\.[^.]+$/, "") : "mkv-font";
        style.textContent = `@font-face{font-family:"${family}";src:url("${blobUrl}")}`;
        if (doc.head && typeof doc.head.appendChild === "function") doc.head.appendChild(style);
        styleElements.push(style);
      }
    });
    return {
      urls: fontUrls,
      revoke() {
        fontUrls.forEach(revokeBlobUrl);
        styleElements.forEach((element) => {
          if (element && typeof element.remove === "function") element.remove();
        });
      }
    };
  }

  // src/subtitles/overlay/ass-renderer.js
  var dynamicImport = new Function("specifier", "return import(specifier)");
  async function defaultAkariModuleLoader() {
    try {
      const mod = await dynamicImport("akarisub");
      return mod.default || mod.AkariSub;
    } catch (error) {
      const missing = new Error("Install akarisub peer dependency to enable styled ASS subtitles");
      missing.cause = error;
      throw missing;
    }
  }
  var akariModuleLoader = defaultAkariModuleLoader;
  var AssRenderer = class {
    async attach(video, track, cues, blocks, options = {}) {
      if (options._testMock) {
        return { track, format: "ass", revoke() {
        } };
      }
      const subContent = assData(track, cues, blocks);
      const AkariSub = await akariModuleLoader();
      const fonts = await loadEmbeddedFonts(options.demuxResult, options);
      const renderer = new AkariSub({
        video,
        subContent,
        canvas: options.canvas,
        workerUrl: options.overlay && options.overlay.assWorkerUrl,
        wasmUrl: options.overlay && options.overlay.assWasmUrl
      });
      return {
        track,
        format: "ass",
        renderer,
        revoke() {
          if (renderer && typeof renderer.destroy === "function") renderer.destroy();
          if (fonts && fonts.revoke) fonts.revoke();
        }
      };
    }
  };
  function createAssRenderer() {
    return new AssRenderer();
  }

  // src/subtitles/bitmap/pgs-adapter.js
  function blockPayload(block) {
    if (block.data instanceof Uint8Array) return block.data;
    if (typeof block.data === "string") return new TextEncoder().encode(block.data);
    return new Uint8Array(0);
  }
  function blocksToPgsBuffer(blocks) {
    const parts = (blocks || []).map(blockPayload);
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(total);
    let offset = 0;
    parts.forEach((part) => {
      output.set(part, offset);
      offset += part.length;
    });
    return output.buffer;
  }

  // src/subtitles/overlay/pgs-renderer.js
  var dynamicImport2 = new Function("specifier", "return import(specifier)");
  async function defaultPgsModuleLoader() {
    try {
      const mod = await dynamicImport2("libbitsub");
      return mod.PgsRenderer;
    } catch (error) {
      const missing = new Error("Install libbitsub peer dependency to enable PGS subtitles");
      missing.cause = error;
      throw missing;
    }
  }
  var pgsModuleLoader = defaultPgsModuleLoader;
  var PgsRendererAdapter = class {
    async attach(video, track, cues, blocks, options = {}) {
      if (options._testMock) {
        return { track, format: "pgs", revoke() {
        } };
      }
      const PgsRenderer = await pgsModuleLoader();
      const subContent = blocksToPgsBuffer(blocks);
      const renderer = new PgsRenderer({
        video,
        subContent,
        canvas: options.canvas,
        workerUrl: options.overlay && options.overlay.pgsWorkerUrl,
        onError: (error) => {
          if (typeof console !== "undefined" && console.warn) {
            console.warn("PGS renderer error", error);
          }
        }
      });
      return {
        track,
        format: "pgs",
        renderer,
        revoke() {
          if (renderer && typeof renderer.dispose === "function") renderer.dispose();
        }
      };
    }
  };
  function createPgsRenderer() {
    return new PgsRendererAdapter();
  }

  // src/subtitles/overlay/overlay-manager.js
  function createCanvasOverlay(videoElement, options = {}) {
    const doc = options.document || videoElement.ownerDocument || (typeof document !== "undefined" ? document : null);
    if (!doc || typeof doc.createElement !== "function") {
      throw new Error("OverlayManager requires a document");
    }
    const canvas = doc.createElement("canvas");
    if (typeof canvas.setAttribute === "function") canvas.setAttribute("aria-hidden", "true");
    if (!canvas.style) canvas.style = {};
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.objectFit = "contain";
    const parent = videoElement.parentElement || videoElement;
    if (parent && typeof parent.appendChild === "function") parent.appendChild(canvas);
    return canvas;
  }
  var OverlayManager = class {
    constructor(videoElement, options = {}) {
      if (!videoElement) throw new TypeError("OverlayManager requires a video element");
      this.video = videoElement;
      this.options = {
        assRenderer: "auto",
        bitmapSubtitles: "auto",
        ...options
      };
      this.canvas = options.createCanvas === false ? null : createCanvasOverlay(videoElement, options);
      this.entries = [];
      this.activeTrack = options.subtitleTrack;
      this.visible = true;
      this._fullscreenChange = () => this._handleFullscreen();
      const doc = options.document || videoElement.ownerDocument || (typeof document !== "undefined" ? document : null);
      if (doc && doc.addEventListener) doc.addEventListener("fullscreenchange", this._fullscreenChange);
    }
    async attachFromDemux(demuxResult, options = {}) {
      const merged = { ...this.options, ...options, demuxResult, canvas: this.canvas };
      const tracks = (demuxResult.tracks || []).filter((track) => track.type === TRACK_TYPES.SUBTITLE);
      this._revokeEntries();
      const vttRenderer = new VttTrackRenderer();
      const entries = [];
      for (let index = 0; index < tracks.length; index++) {
        const track = tracks[index];
        const cues = extractCues(demuxResult, track.number);
        const blocks = getBlocks2(demuxResult, track.number);
        const isBitmap = isBitmapSubtitleCodec(track.codecId);
        if (isBitmap) {
          if (merged.bitmapSubtitles === false) continue;
          try {
            entries.push(await createPgsRenderer(merged).attach(this.video, track, cues, blocks, merged));
          } catch (error) {
            warnFallback(error, "bitmap subtitle");
          }
          continue;
        }
        const wantsLibass = merged.assRenderer === "libass" || merged.assRenderer === "auto";
        if (isAss(track, cues) && wantsLibass) {
          try {
            entries.push(await createAssRenderer(merged).attach(this.video, track, cues, blocks, merged));
            continue;
          } catch (error) {
            if (merged.assRenderer === "libass") warnFallback(error, "ASS subtitle");
          }
        }
        entries.push(vttRenderer.attach(this.video, demuxResult, track, {
          ...merged,
          cues,
          index
        }));
      }
      this.entries = entries;
      this._applyTrackSelection();
      return this;
    }
    setActiveTrack(trackNumber) {
      this.activeTrack = trackNumber;
      this._applyTrackSelection();
    }
    setVisible(visible) {
      this.visible = Boolean(visible);
      if (this.canvas && this.canvas.style) this.canvas.style.display = this.visible ? "" : "none";
      this.entries.forEach((entry) => {
        if (entry.element && entry.element.track) {
          entry.element.track.mode = this.visible ? "hidden" : "disabled";
        }
      });
    }
    destroy() {
      this._revokeEntries();
      const doc = this.options.document || this.video.ownerDocument || (typeof document !== "undefined" ? document : null);
      if (doc && doc.removeEventListener) doc.removeEventListener("fullscreenchange", this._fullscreenChange);
      if (this.canvas && typeof this.canvas.remove === "function") this.canvas.remove();
      this.canvas = null;
    }
    revokeAll() {
      this.destroy();
    }
    get tracks() {
      return this.entries;
    }
    _revokeEntries() {
      this.entries.forEach((entry) => {
        if (entry.revoke) entry.revoke();
      });
      this.entries = [];
    }
    _applyTrackSelection() {
      this.entries.forEach((entry) => {
        if (!entry.element || !entry.element.track) return;
        const selected = this.activeTrack == null || entry.track.number === this.activeTrack;
        entry.element.track.mode = selected && this.visible ? "hidden" : "disabled";
      });
    }
    _handleFullscreen() {
      const doc = this.options.document || this.video.ownerDocument || (typeof document !== "undefined" ? document : null);
      const fullscreenElement = doc && doc.fullscreenElement;
      if (!this.canvas || !fullscreenElement || typeof fullscreenElement.appendChild !== "function") return;
      if (fullscreenElement === this.video || typeof fullscreenElement.contains === "function" && fullscreenElement.contains(this.video)) {
        fullscreenElement.appendChild(this.canvas);
      }
    }
  };
  function getBlocks2(result, trackNumber) {
    const blocks = result.blocksByTrack instanceof Map ? result.blocksByTrack.get(trackNumber) : result.blocksByTrack && result.blocksByTrack[trackNumber];
    return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode);
  }
  function isAss(track, cues) {
    return track.codecId === CODEC_IDS.S_TEXT_ASS || track.codecId === CODEC_IDS.S_TEXT_SSA || cues[0] && cues[0].format === "ass";
  }
  function warnFallback(error, kind) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn(`Unable to render ${kind}; skipping or falling back to WebVTT`, error);
    }
  }

  // src/browser/worker-client.js
  function createWorkerClient(options = {}) {
    const script = typeof document !== "undefined" && document.currentScript;
    const base = script ? script.src : location.href;
    const defaultUrl = new URL(base.includes("/iife/") ? "../worker/mkv-worker.js" : "worker/mkv-worker.js", base);
    const worker = options.worker || new Worker(options.workerUrl || defaultUrl, { type: "module" });
    let nextId = 0;
    const pending = /* @__PURE__ */ new Map();
    worker.onmessage = (event) => {
      const message = event.data || {};
      const request = pending.get(message.id);
      if (!request) return;
      if (message.type === "progress") {
        if (request.onProgress) request.onProgress(message.percentage, message.eta);
        return;
      }
      pending.delete(message.id);
      if (message.type === "error") {
        const error = new Error(message.error);
        error.name = message.name || "Error";
        request.reject(error);
        return;
      }
      request.resolve(deserializeResult(message.result));
    };
    worker.onerror = (event) => {
      pending.forEach((request) => request.reject(event.error || new Error(event.message || "Worker error")));
      pending.clear();
    };
    return {
      demux(source, options2 = {}) {
        const id = ++nextId;
        const transferable = source instanceof ArrayBuffer ? source : null;
        return new Promise((resolve, reject) => {
          pending.set(id, { resolve, reject, onProgress: options2.onProgress });
          if (options2.signal) {
            if (options2.signal.aborted) {
              pending.delete(id);
              reject(abortError3());
              return;
            }
            options2.signal.addEventListener("abort", () => {
              if (!pending.has(id)) return;
              pending.delete(id);
              reject(abortError3());
            }, { once: true });
          }
          const workerOptions = { ...options2 };
          delete workerOptions.onProgress;
          delete workerOptions.signal;
          worker.postMessage({ type: "demux", id, source, options: workerOptions }, transferable ? [transferable] : []);
        });
      },
      terminate() {
        pending.forEach((request) => request.reject(new Error("Worker terminated")));
        pending.clear();
        worker.terminate();
      }
    };
  }
  function abortError3() {
    const error = new Error("Demux aborted");
    error.name = "AbortError";
    return error;
  }
  function deserializeResult(result) {
    const blocksByTrack = /* @__PURE__ */ new Map();
    (result.blocks || []).forEach(([trackNumber, blocks]) => {
      blocksByTrack.set(trackNumber, blocks.map((block) => ({
        ...block,
        data: block.data && block.data.type === "bytes" ? new Uint8Array(block.data.buffer) : block.data
      })));
    });
    return { ...result, blocksByTrack };
  }

  // src/playback/transcode/ffmpeg-client.js
  var ffmpeg = null;
  var loadPromise = null;
  var dynamicImport3 = new Function("specifier", "return import(specifier)");
  var DEFAULT_CORE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js";
  var DEFAULT_WASM_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm";
  async function defaultFfmpegModuleLoader() {
    try {
      const ffmpegModule = await dynamicImport3("@ffmpeg/ffmpeg");
      const utilModule = await dynamicImport3("@ffmpeg/util");
      return { FFmpeg: ffmpegModule.FFmpeg, toBlobURL: utilModule.toBlobURL };
    } catch (error) {
      const missing = new Error("Install @ffmpeg/ffmpeg and @ffmpeg/util to enable transcode");
      missing.cause = error;
      throw missing;
    }
  }
  var ffmpegModuleLoader = defaultFfmpegModuleLoader;
  async function loadFfmpeg(options = {}) {
    if (ffmpeg) return ffmpeg;
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      const { FFmpeg, toBlobURL } = await ffmpegModuleLoader();
      const instance = new FFmpeg();
      const coreURL = options.coreURL || DEFAULT_CORE_URL;
      const wasmURL = options.wasmURL || DEFAULT_WASM_URL;
      await instance.load({
        coreURL: await toBlobURL(coreURL, "text/javascript"),
        wasmURL: await toBlobURL(wasmURL, "application/wasm")
      });
      if (typeof options.onProgress === "function") {
        instance.on("progress", ({ progress }) => options.onProgress(Math.round(progress * 100), "transcode"));
      }
      ffmpeg = instance;
      return instance;
    })();
    try {
      return await loadPromise;
    } catch (error) {
      loadPromise = null;
      throw error;
    }
  }
  async function transcodeToMp4(input, options = {}) {
    const instance = await loadFfmpeg(options);
    const data = input instanceof Uint8Array ? input : new Uint8Array(input instanceof ArrayBuffer ? input : await input.arrayBuffer());
    await instance.writeFile("input.mkv", data);
    await instance.exec([
      "-i",
      "input.mkv",
      "-c:v",
      "libx264",
      "-preset",
      options.preset || "fast",
      "-crf",
      "23",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      "output.mp4"
    ]);
    const output = await instance.readFile("output.mp4");
    return { blob: new Blob([output], { type: "video/mp4" }), mimeType: "video/mp4" };
  }

  // src/playback/strategies/transcode-strategy.js
  async function executeTranscodePlayback(video, source, options = {}) {
    const result = await transcodeToMp4(source, options);
    const url = createBlobUrl(result.blob);
    video.src = url;
    return { ...result, url };
  }

  // src/playback/player.js
  var MKVPlayer = class {
    constructor(videoElement, options = {}) {
      if (!videoElement) throw new TypeError("MKVPlayer requires a video element");
      this.video = videoElement;
      this.options = {
        assRenderer: "auto",
        bitmapSubtitles: "auto",
        transcode: false,
        ...options
      };
      this.mse = null;
      this.fallbackUrl = null;
      this.overlayManager = null;
      this.result = null;
      this.support = null;
      this.workerClient = null;
    }
    async load(source, loadOptions = {}) {
      this.destroy();
      const options = { ...this.options, ...loadOptions };
      const demuxOptions = {
        collectMediaBlocks: true,
        signal: options.signal,
        onProgress: options.onProgress
      };
      const result = options.useWorker ? await (this.workerClient || (this.workerClient = createWorkerClient(options))).demux(
        source instanceof ArrayBuffer ? source.slice(0) : await source.arrayBuffer(),
        demuxOptions
      ) : await demuxer_default(source, demuxOptions);
      const support = resolvePlaybackStrategy(result.tracks, options);
      if (!support.supported) throw new Error(support.reason);
      this.result = result;
      this.support = support;
      if (support.strategy === "transcode") {
        const transcoded = await executeTranscodePlayback(this.video, source, options);
        this.fallbackUrl = transcoded.url;
        this.overlayManager = new OverlayManager(this.video, options);
        await this.overlayManager.attachFromDemux(result, options);
        if (typeof options.onProgress === "function") options.onProgress(100, 0);
        return this;
      }
      if (support.strategy !== "remux-mse" && support.strategy !== "remux-hevc") {
        throw new Error(`${support.strategy} playback is not yet implemented`);
      }
      try {
        this.mse = new MSEPlayer(this.video, options);
        await this.mse.load(result, { signal: options.signal });
      } catch (error) {
        if (this.mse) this.mse.destroy();
        this.mse = null;
        try {
          const remuxed = await remuxToMp4(result, options);
          this.fallbackUrl = createBlobUrl(remuxed.blob);
          this.video.src = this.fallbackUrl;
        } catch (remuxError) {
          if (options.transcode !== "auto") throw remuxError;
          const transcoded = await executeTranscodePlayback(this.video, source, options);
          this.fallbackUrl = transcoded.url;
        }
      }
      this.overlayManager = new OverlayManager(this.video, options);
      await this.overlayManager.attachFromDemux(result, options);
      if (typeof options.onProgress === "function") options.onProgress(100, 0);
      return this;
    }
    destroy() {
      if (this.mse) this.mse.destroy();
      if (this.overlayManager) this.overlayManager.destroy();
      if (this.fallbackUrl) {
        revokeBlobUrl(this.fallbackUrl);
        this.video.removeAttribute("src");
        this.video.load();
      }
      this.mse = null;
      this.overlayManager = null;
      this.fallbackUrl = null;
      this.result = null;
      this.support = null;
      if (this.workerClient) this.workerClient.terminate();
      this.workerClient = null;
    }
    getTracks() {
      if (!this.result) return { video: [], audio: [], subtitles: [] };
      return {
        video: this.result.tracks.filter((track) => track.type === TRACK_TYPES.VIDEO),
        audio: this.result.tracks.filter((track) => track.type === TRACK_TYPES.AUDIO),
        subtitles: this.result.tracks.filter((track) => track.type === TRACK_TYPES.SUBTITLE)
      };
    }
    async downloadMp4() {
      if (!this.result) throw new Error("No media has been loaded");
      const { blob } = await remuxToMp4(this.result, this.options);
      const filename = this.options.filename || "video.mp4";
      if (typeof this.options.saveAs === "function") {
        this.options.saveAs(blob, filename);
        return blob;
      }
      const anchor = document.createElement("a");
      anchor.href = createBlobUrl(blob);
      anchor.download = filename;
      anchor.click();
      setTimeout(() => revokeBlobUrl(anchor.href), 0);
      return blob;
    }
  };
  function createPlayer(videoElement, options) {
    return new MKVPlayer(videoElement, options);
  }

  // src/playback/subtitles.js
  async function attachSubtitleTracks(videoElement, demuxResult, options = {}) {
    const manager = new OverlayManager(videoElement, { ...options, createCanvas: false });
    await manager.attachFromDemux(demuxResult, options);
    return manager;
  }

  // src/extract/zip-export.js
  function exportZip(files, filename, JSZip, saveAs) {
    const zip = new JSZip();
    files.forEach((file) => {
      const folder = file.folder ? zip.folder(file.folder) : zip;
      folder.file(file.name, file.data);
    });
    return zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, filename));
  }
  var zip_export_default = exportZip;

  // src/browser/demo.js
  function createExtractorUI(options = {}) {
    const doc = options.document || document;
    const root = options.root || doc;
    const input = options.input || root.querySelector("input");
    const droparea = options.droparea || root.querySelector(".file-drop-area");
    const statusEl = options.statusEl || root.querySelector(".file-msg");
    const globals = typeof window !== "undefined" ? window : {};
    const JSZip = options.JSZip || globals.JSZip;
    const saveAs = options.saveAs || globals.saveAs;
    if (!input || !droparea || !statusEl) {
      throw new TypeError("extractor UI requires an input, file-drop-area, and file-msg element");
    }
    if (!JSZip || !saveAs) {
      throw new TypeError("extractor UI requires JSZip and saveAs");
    }
    input.addEventListener("change", handleFiles);
    ["dragenter", "focus", "click"].forEach((event) => input.addEventListener(event, () => {
      droparea.classList.add("is-active");
    }));
    ["dragleave", "blur", "drop"].forEach((event) => input.addEventListener(event, () => {
      droparea.classList.remove("is-active");
    }));
    return { destroy: () => input.removeEventListener("change", handleFiles) };
    function handleFiles(event) {
      const files = Array.from(event.target.files);
      statusEl.textContent = `Loading ${files.length} ${files.length === 1 ? "file" : "files"}...`;
      const loadedData = [];
      let errors = 0;
      processFile(0);
      function processFile(index) {
        if (!files[index]) return packData();
        const file = files[index];
        demuxer_default(file, {
          onProgress: (percentage, eta) => {
            statusEl.textContent = "Loading file " + (index + 1) + " / " + files.length + ": " + percentage.toFixed(2) + "% (" + formatDuration(eta) + " remaining)";
          }
        }).then((result) => {
          loadedData.push({
            filename: file.name,
            data: extract_default(result).concat(attachments_default(result))
          });
          processFile(index + 1);
        }).catch(() => {
          errors++;
          processFile(index + 1);
        });
      }
      function packData() {
        statusEl.textContent = `${loadedData.length} ${loadedData.length === 1 ? "file" : "files"} extracted - ${errors} failed`;
        if (loadedData.length === 0) return;
        const entries = [];
        let filename;
        if (loadedData.length === 1) {
          filename = loadedData[0].filename + "_tracks.zip";
          loadedData[0].data.forEach((entry) => entries.push(entry));
        } else {
          filename = `${Date.now().toString(36)}_tracks.zip`;
          loadedData.forEach((file) => file.data.forEach((entry) => {
            entries.push({ name: entry.name, data: entry.data, folder: file.filename });
          }));
        }
        zip_export_default(entries, filename, JSZip, saveAs);
      }
    }
  }

  // src/browser/mkv-player-element.js
  var ElementBase = typeof HTMLElement === "undefined" ? class {
  } : HTMLElement;
  function parseBooleanAttribute(element, name) {
    if (!element.hasAttribute(name)) return void 0;
    const value = element.getAttribute(name);
    if (value === "" || value === "true") return true;
    if (value === "false") return false;
    if (value === "auto") return "auto";
    return value;
  }
  var MKVPlayerElement = class extends ElementBase {
    constructor() {
      super();
      this.video = document.createElement("video");
      this.video.controls = true;
      this.appendChild(this.video);
      this.player = null;
    }
    connectedCallback() {
      this.addEventListener("dragover", preventDefault);
      this.addEventListener("drop", this.handleDrop);
      const src = this.getAttribute("src");
      if (src) this.load(src);
    }
    disconnectedCallback() {
      this.removeEventListener("drop", this.handleDrop);
      if (this.player) this.player.destroy();
    }
    set file(value) {
      if (value) this.load(value);
    }
    getPlayerOptions() {
      return {
        useWorker: this.hasAttribute("use-worker"),
        transcode: parseBooleanAttribute(this, "transcode"),
        assRenderer: this.getAttribute("ass-renderer") || "auto",
        bitmapSubtitles: parseBooleanAttribute(this, "bitmap-subtitles")
      };
    }
    async load(source) {
      if (this.player) this.player.destroy();
      this.player = createPlayer(this.video, this.getPlayerOptions());
      if (typeof source === "string") {
        const response = await fetch(source);
        if (!response.ok) throw new Error(`Unable to load ${source}: ${response.status}`);
        source = await response.blob();
      }
      return this.player.load(source);
    }
    handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer && event.dataTransfer.files[0];
      if (file) this.load(file);
    }
  };
  function preventDefault(event) {
    event.preventDefault();
  }
  function registerMKVPlayerElement() {
    if (typeof customElements === "undefined") return;
    if (!customElements.get("mkv-player")) customElements.define("mkv-player", MKVPlayerElement);
  }

  // src/browser/index.js
  if (typeof customElements !== "undefined") registerMKVPlayerElement();
  if (typeof document !== "undefined" && document.querySelector(".file-drop-area") && !document.querySelector("#player-file")) {
    createExtractorUI();
  }
  return __toCommonJS(browser_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
