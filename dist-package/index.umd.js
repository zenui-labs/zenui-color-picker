(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react"), require("lucide-react"), require("clsx")) : typeof define === "function" && define.amd ? define(["exports", "react", "lucide-react", "clsx"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["zenui-color-picker"] = {}, global.require$$0, global.lucideReact, global.clsx));
})(this, function(exports2, require$$0, lucideReact, clsx) {
  "use strict";
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactJsxRuntime_production_min;
  function requireReactJsxRuntime_production_min() {
    if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
    hasRequiredReactJsxRuntime_production_min = 1;
    var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    reactJsxRuntime_production_min.Fragment = l;
    reactJsxRuntime_production_min.jsx = q;
    reactJsxRuntime_production_min.jsxs = q;
    return reactJsxRuntime_production_min;
  }
  var reactJsxRuntime_development = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactJsxRuntime_development;
  function requireReactJsxRuntime_development() {
    if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
    hasRequiredReactJsxRuntime_development = 1;
    if (process.env.NODE_ENV !== "production") {
      (function() {
        var React = require$$0;
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self2) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self2) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self2);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum();
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self2);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx = jsxWithValidationDynamic;
        var jsxs = jsxWithValidationStatic;
        reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
        reactJsxRuntime_development.jsx = jsx;
        reactJsxRuntime_development.jsxs = jsxs;
      })();
    }
    return reactJsxRuntime_development;
  }
  if (process.env.NODE_ENV === "production") {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  } else {
    jsxRuntime.exports = requireReactJsxRuntime_development();
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  const defaultPresetColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#2300ff",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#006b85",
    "#85C1E9",
    "#C500ABFF"
  ];
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    if (!result) return { r: 0, g: 0, b: 0 };
    const rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
    if (result[4]) {
      return { ...rgb, a: parseInt(result[4], 16) / 255 };
    }
    return rgb;
  }
  function rgbToHex(r, g, b, a) {
    const toHex = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, "0");
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    if (a !== void 0) {
      return `${hex}${toHex(a * 255)}`;
    }
    return hex;
  }
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
  function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    let h = 0;
    const s = max === 0 ? 0 : diff / max;
    const v = max;
    if (diff !== 0) {
      switch (max) {
        case r:
          h = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }
  function hsvToRgb(h, s, v) {
    h /= 360;
    s /= 100;
    v /= 100;
    const c = v * s;
    const x = c * (1 - Math.abs(h * 6 % 2 - 1));
    const m = v - c;
    let r, g, b;
    if (h < 1 / 6) {
      [r, g, b] = [c, x, 0];
    } else if (h < 2 / 6) {
      [r, g, b] = [x, c, 0];
    } else if (h < 3 / 6) {
      [r, g, b] = [0, c, x];
    } else if (h < 4 / 6) {
      [r, g, b] = [0, x, c];
    } else if (h < 5 / 6) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
  function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  }
  function parseColor(colorString) {
    try {
      const color = colorString.trim();
      if (color.startsWith("#")) {
        const rgb = hexToRgb(color);
        return colorToValue(rgb.r, rgb.g, rgb.b, rgb.a);
      }
      const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
      if (rgbMatch) {
        const values = rgbMatch[1].split(",").map((v) => parseFloat(v.trim()));
        if (values.length >= 3) {
          return colorToValue(values[0], values[1], values[2], values[3]);
        }
      }
      const hslMatch = color.match(/hsla?\(([^)]+)\)/);
      if (hslMatch) {
        const values = hslMatch[1].split(",").map((v) => parseFloat(v.trim()));
        if (values.length >= 3) {
          const rgb = hslToRgb(values[0], values[1], values[2]);
          return colorToValue(rgb.r, rgb.g, rgb.b, values[3]);
        }
      }
      return null;
    } catch {
      return null;
    }
  }
  function colorToValue(r, g, b, a) {
    const hex = rgbToHex(r, g, b, a);
    const rgb = { r, g, b, ...a !== void 0 && { a } };
    const hsl = { ...rgbToHsl(r, g, b), ...a !== void 0 && { a } };
    const hsv = { ...rgbToHsv(r, g, b), ...a !== void 0 && { a } };
    const cmyk = rgbToCmyk(r, g, b);
    return { hex, rgb, hsl, hsv, cmyk };
  }
  function formatColorValue(colorValue, format) {
    switch (format) {
      case "hex":
        return colorValue.hex;
      case "rgb":
        const { r, g, b, a } = colorValue.rgb;
        return a !== void 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
      case "hsl":
        const { h, s, l, a: hslA } = colorValue.hsl;
        return hslA !== void 0 ? `hsla(${h}, ${s}%, ${l}%, ${hslA})` : `hsl(${h}, ${s}%, ${l}%)`;
      case "hsv":
        const { h: hsvH, s: hsvS, v } = colorValue.hsv;
        return `hsv(${hsvH}, ${hsvS}%, ${v}%)`;
      case "cmyk":
        const { c, m, y, k } = colorValue.cmyk;
        return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
      default:
        return colorValue.hex;
    }
  }
  function useColorPicker(options = {}) {
    const {
      initialColor = "#00AA45",
      initialFormat = "hex",
      showAlpha = false,
      maxHistory = 10
    } = options;
    const [currentColor, setCurrentColor] = require$$0.useState(() => {
      const parsed = parseColor(initialColor);
      return parsed || colorToValue(59, 130, 246);
    });
    const [currentFormat, setCurrentFormat] = require$$0.useState(initialFormat);
    const [isOpen, setIsOpen] = require$$0.useState(false);
    const [colorHistory, setColorHistory] = require$$0.useState([]);
    const [favoriteColors, setFavoriteColors] = require$$0.useState([]);
    const historyRef = require$$0.useRef(/* @__PURE__ */ new Set());
    const updateColor = require$$0.useCallback((color) => {
      setCurrentColor(color);
      if (!historyRef.current.has(color.hex)) {
        historyRef.current.add(color.hex);
        setColorHistory((prev) => {
          const newHistory = [color, ...prev.filter((c) => c.hex !== color.hex)];
          return newHistory.slice(0, maxHistory);
        });
      }
    }, [maxHistory]);
    const updateFormat = require$$0.useCallback((format) => {
      setCurrentFormat(format);
    }, []);
    const addToFavorites = require$$0.useCallback((color) => {
      setFavoriteColors((prev) => {
        if (prev.some((c) => c.hex === color.hex)) return prev;
        return [...prev, color];
      });
    }, []);
    const removeFromFavorites = require$$0.useCallback((color) => {
      setFavoriteColors((prev) => prev.filter((c) => c.hex !== color.hex));
    }, []);
    const clearHistory = require$$0.useCallback(() => {
      setColorHistory([]);
      historyRef.current.clear();
    }, []);
    const copyToClipboard = require$$0.useCallback(async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    }, []);
    const generateRandomColor = require$$0.useCallback(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = showAlpha ? Math.random() : void 0;
      const color = colorToValue(r, g, b, a);
      updateColor(color);
      if (options.setCurrentHue) {
        options.setCurrentHue(color.hsv.h);
      }
      return color;
    }, [showAlpha, updateColor]);
    return {
      currentColor,
      currentFormat,
      isOpen,
      colorHistory,
      favoriteColors,
      updateColor,
      updateFormat,
      setIsOpen,
      addToFavorites,
      removeFromFavorites,
      clearHistory,
      copyToClipboard,
      generateRandomColor
    };
  }
  const BrightnessSlider = ({
    value,
    color,
    onChange,
    disabled
  }) => {
    const sliderRef = require$$0.useRef(null);
    const isDraggingRef = require$$0.useRef(false);
    const [currentColor, setCurrentColor] = require$$0.useState(null);
    const clampToThreeDecimals = (num) => {
      return parseFloat(Math.max(0, Math.min(1, num)).toFixed(2));
    };
    const updateValueFromPosition = require$$0.useCallback(
      (clientX) => {
        const slider = sliderRef.current;
        if (!slider) return;
        const rect = slider.getBoundingClientRect();
        const x = Math.max(2, Math.min(rect.width, clientX - rect.left));
        const percentage = x / rect.width;
        onChange(clampToThreeDecimals(percentage));
      },
      [onChange]
    );
    const handleMouseMove = require$$0.useCallback(
      (e) => {
        if (!isDraggingRef.current) return;
        updateValueFromPosition(e.clientX);
      },
      [updateValueFromPosition]
    );
    const handleTouchMove = require$$0.useCallback(
      (e) => {
        if (!isDraggingRef.current || e.touches.length === 0) return;
        updateValueFromPosition(e.touches[0].clientX);
      },
      [updateValueFromPosition]
    );
    const stopDragging = require$$0.useCallback(() => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopDragging);
    }, [handleMouseMove, handleTouchMove]);
    const startDragging = require$$0.useCallback(
      (clientX) => {
        isDraggingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", stopDragging);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", stopDragging);
        updateValueFromPosition(clientX);
      },
      [handleMouseMove, handleTouchMove, stopDragging, updateValueFromPosition]
    );
    const handleMouseDown = require$$0.useCallback(
      (e) => {
        e.preventDefault();
        startDragging(e.clientX);
      },
      [startDragging]
    );
    const handleTouchStart = require$$0.useCallback(
      (e) => {
        if (e.touches.length > 0) {
          startDragging(e.touches[0].clientX);
        }
      },
      [startDragging]
    );
    require$$0.useEffect(() => {
      setCurrentColor(color);
    }, [color]);
    const getThumbPosition = () => {
      var _a;
      const percentage = Math.max(0, Math.min(1, value));
      const sliderWidth = ((_a = sliderRef.current) == null ? void 0 : _a.offsetWidth) || 200;
      const thumbRadius = 12;
      const thumbWidthPercentage = thumbRadius / sliderWidth * 100;
      const minPosition = thumbWidthPercentage;
      const maxPosition = 100 - thumbWidthPercentage;
      return minPosition + percentage * (maxPosition - minPosition);
    };
    const getBackgroundStyle = () => {
      const solidColor = color.hex.length === 9 ? color.hex.substring(0, 7) : color.hex;
      return {
        backgroundImage: `linear-gradient(to right, transparent, ${solidColor})`
      };
    };
    const getThumbColor = () => {
      if (!currentColor) return "#fff";
      return `hsl(${currentColor.hsv.h}, ${currentColor.hsv.s}%, 50%)`;
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: sliderRef,
        className: "relative h-4 rounded-lg cursor-pointer shadow-inner mb-5",
        style: getBackgroundStyle(),
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "slider",
            "aria-valuemin": 0,
            "aria-valuemax": 359,
            "aria-valuenow": value,
            "aria-valuetext": `${value} degrees`,
            "aria-disabled": disabled,
            className: clsx.clsx(
              "absolute w-6 h-6 border-2 border-white rounded-full transition-colors duration-200 shadow-lg transform -translate-x-1/2 -translate-y-1 ",
              disabled ? "opacity-50 cursor-not-allowed" : "active:cursor-grabbing cursor-grab hover:border-3 hover:scale-[1.2]"
            ),
            style: { left: `${getThumbPosition()}%`, backgroundColor: getThumbColor() }
          }
        )
      }
    );
  };
  const ColorInput = ({
    value,
    format,
    showCopyButton,
    onChange,
    disabled,
    theme = "light"
  }) => {
    const [inputValue, setInputValue] = require$$0.useState(value);
    const [isValid, setIsValid] = require$$0.useState(true);
    const [copySuccess, setCopySuccess] = require$$0.useState(false);
    const { copyToClipboard } = useColorPicker();
    const handleCopy = async () => {
      const success = await copyToClipboard(value);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2e3);
      }
    };
    require$$0.useEffect(() => {
      setInputValue(value);
    }, [value]);
    const validateInput = (input) => {
      switch (format) {
        case "hex":
          return /^#[0-9A-Fa-f]{3,8}$/.test(input);
        case "rgb":
          return /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0|1|0\.\d+))?\s*\)$/.test(input);
        case "hsl":
          return /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*(0|1|0\.\d+))?\s*\)$/.test(input);
        case "hsv":
          return /^hsv\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(input);
        case "cmyk":
          return /^cmyk\(\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(input);
        default:
          return true;
      }
    };
    const handleChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      const valid = validateInput(newValue);
      setIsValid(valid);
      if (valid) {
        onChange(newValue);
      }
    };
    const handleBlur = () => {
      if (disabled) return;
      if (!isValid) {
        setInputValue(value);
        setIsValid(true);
      }
    };
    const placeholder = {
      hex: "#3B82F6",
      rgb: "rgb(59, 130, 246)",
      hsl: "hsl(217, 91%, 60%)",
      hsv: "hsv(217, 76%, 96%)",
      cmyk: "cmyk(76%, 47%, 0%, 4%)"
    }[format];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: `zenuicolorpicker-input-${format}`,
          "aria-label": `Enter color in ${format.toUpperCase()} format`,
          "aria-invalid": !isValid,
          "aria-describedby": !isValid ? `color-input-error-${format}` : void 0,
          type: "text",
          value: inputValue,
          disabled,
          onChange: handleChange,
          onBlur: handleBlur,
          placeholder,
          className: clsx.clsx(
            "w-full px-3 py-2 rounded-lg disabled:cursor-not-allowed border text-sm font-mono outline-none focus:ring-2 focus:ring-[var(--brand-color)] transition-colors",
            isValid ? theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-200 text-gray-900" : "border-red-300 bg-red-50 text-red-900 dark:!ring-red-500/20 dark:bg-red-500/20 dark:text-red-100"
          )
        }
      ),
      showCopyButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": copySuccess ? "Color copied to clipboard" : "Copy color value",
          "aria-live": "polite",
          type: "button",
          disabled,
          onClick: handleCopy,
          className: clsx.clsx(
            "p-2 rounded-lg disabled:cursor-not-allowed transition-colors absolute top-1/2 -translate-y-1/2 right-0.5 duration-200 cursor-pointer",
            theme === "dark" && "hover:bg-gray-700 text-white",
            copySuccess ? "text-[var(--brand-color)] bg-[var(--brand-color)]/10" : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-gray-600"
          ),
          title: copySuccess ? "Copied!" : "Copy color",
          children: copySuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(lucideReact.Check, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(lucideReact.Copy, { size: 16 })
        }
      )
    ] });
  };
  const ColorSlider = ({
    hue,
    onChange,
    height = 16,
    disabled,
    className = ""
  }) => {
    const sliderRef = require$$0.useRef(null);
    const isDraggingRef = require$$0.useRef(false);
    const [currentColor, setCurrentColor] = require$$0.useState(null);
    const getHueFromPosition = require$$0.useCallback(
      (x) => {
        const slider = sliderRef.current;
        if (!slider) return hue;
        const rect = slider.getBoundingClientRect();
        const normalizedX = Math.max(0, Math.min(rect.width, x));
        const percentage = normalizedX / rect.width;
        const calculatedHue = percentage * 359;
        return Math.max(0, Math.min(359, Math.round(calculatedHue)));
      },
      [hue]
    );
    const getThumbPosition = require$$0.useCallback(() => {
      const slider = sliderRef.current;
      if (!slider) return hue / 359 * 100;
      const rect = slider.getBoundingClientRect();
      const sliderWidth = rect.width;
      if (sliderWidth === 0) return hue / 359 * 100;
      const percentage = hue / 359 * 100;
      const thumbRadius = 12;
      const thumbWidthPercentage = thumbRadius / sliderWidth * 100;
      const minPosition = thumbWidthPercentage;
      const maxPosition = 100 - thumbWidthPercentage;
      const adjustedPercentage = minPosition + percentage / 100 * (maxPosition - minPosition);
      return Math.max(minPosition, Math.min(maxPosition, adjustedPercentage));
    }, [hue]);
    const handleMove = require$$0.useCallback(
      (clientX) => {
        if (!isDraggingRef.current || !sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const newHue = getHueFromPosition(x);
        onChange(newHue);
      },
      [onChange, getHueFromPosition]
    );
    const handleMouseMove = require$$0.useCallback(
      (e) => handleMove(e.clientX),
      [handleMove]
    );
    const handleTouchMove = require$$0.useCallback(
      (e) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX);
        }
      },
      [handleMove]
    );
    require$$0.useEffect(() => {
      const newHue = hsvToRgb(hue, 100, 100);
      const newColor = colorToValue(newHue.r, newHue.g, newHue.b);
      setCurrentColor(newColor);
    }, [hue]);
    const endDrag = require$$0.useCallback(() => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", endDrag);
    }, [handleMouseMove, handleTouchMove]);
    const startDrag = require$$0.useCallback(
      (clientX) => {
        if (disabled || !sliderRef.current) return;
        isDraggingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", endDrag);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", endDrag);
        handleMove(clientX);
      },
      [disabled, handleMove, handleMouseMove, handleTouchMove, endDrag]
    );
    const handleMouseDown = require$$0.useCallback(
      (e) => {
        e.preventDefault();
        startDrag(e.clientX);
      },
      [startDrag]
    );
    const handleTouchStart = require$$0.useCallback(
      (e) => {
        if (e.touches.length > 0) {
          startDrag(e.touches[0].clientX);
        }
      },
      [startDrag]
    );
    require$$0.useEffect(() => {
      const handleResize = () => {
        if (sliderRef.current) {
          setCurrentColor((prev) => {
            if (!prev) return null;
            return { ...prev };
          });
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx.clsx("w-full mb-4", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: sliderRef,
        className: "relative rounded-lg cursor-pointer shadow-inner",
        style: {
          height,
          backgroundImage: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
        },
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "slider",
            "aria-valuemin": 0,
            "aria-valuemax": 359,
            "aria-valuenow": hue,
            "aria-valuetext": `${hue} degrees`,
            "aria-disabled": disabled,
            className: clsx.clsx(
              "absolute w-6 h-6 transition-colors duration-200 border-2 border-white rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1",
              disabled ? "opacity-50 cursor-not-allowed" : "active:cursor-grabbing cursor-grab hover:border-3 hover:scale-[1.2]"
            ),
            style: {
              left: `${getThumbPosition()}%`,
              backgroundColor: (currentColor == null ? void 0 : currentColor.hex) || "#fff"
            }
          }
        )
      }
    ) });
  };
  const WheelPicker = ({
    color,
    onChange,
    size = 200,
    disabled
  }) => {
    const canvasRef = require$$0.useRef(null);
    const isDraggingRef = require$$0.useRef(false);
    const drawColorWheel = require$$0.useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 10;
      const innerRadius = radius * 0.3;
      ctx.clearRect(0, 0, size, size);
      for (let angle = 0; angle < 360; angle += 1) {
        const startAngle = (angle - 0.5) * Math.PI / 180;
        const endAngle = (angle + 0.5) * Math.PI / 180;
        const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius);
        const rgb = hsvToRgb(angle, 100, 100);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.7, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        gradient.addColorStop(1, `rgb(${Math.round(rgb.r * 0.8)}, ${Math.round(rgb.g * 0.8)}, ${Math.round(rgb.b * 0.8)})`);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      const circleRadius = innerRadius - 5;
      const hueRgb = hsvToRgb(color.hsv.h, 100, 100);
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(${hueRgb.r}, ${hueRgb.g}, ${hueRgb.b})`;
      ctx.fill();
      const satGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, circleRadius);
      satGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      satGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = satGradient;
      ctx.fill();
      for (let angle = 0; angle < 360; angle += 2) {
        const startAngle = (angle - 1) * Math.PI / 180;
        const endAngle = (angle + 1) * Math.PI / 180;
        const brightness = angle / 360;
        const alpha = 1 - brightness;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, circleRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fill();
      }
      const hueAngle = color.hsv.h * Math.PI / 180;
      const hueIndicatorRadius = (radius + innerRadius) / 2;
      const hueX = centerX + Math.cos(hueAngle) * hueIndicatorRadius;
      const hueY = centerY + Math.sin(hueAngle) * hueIndicatorRadius;
      ctx.beginPath();
      ctx.arc(hueX, hueY, 6, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      const saturationRadius = color.hsv.s / 100 * circleRadius;
      const brightnessAngle = color.hsv.v / 100 * Math.PI * 2;
      const satX = centerX + Math.cos(brightnessAngle) * saturationRadius;
      const satY = centerY + Math.sin(brightnessAngle) * saturationRadius;
      ctx.beginPath();
      ctx.arc(satX, satY, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
    }, [color, size]);
    require$$0.useEffect(() => {
      drawColorWheel();
    }, [drawColorWheel]);
    const handleMouseMove = require$$0.useCallback((e) => {
      if (!isDraggingRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 10;
      const innerRadius = radius * 0.3;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > innerRadius && distance < radius) {
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const hue = angle < 0 ? angle + 360 : angle;
        const { r, g, b } = hsvToRgb(hue, color.hsv.s, color.hsv.v);
        const newColor = colorToValue(r, g, b, color.rgb.a);
        onChange(newColor);
      }
      const circleRadius = innerRadius - 5;
      if (distance <= circleRadius) {
        const saturation = Math.max(0, Math.min(100, distance / circleRadius * 100));
        const brightnessAngle = Math.atan2(dy, dx);
        const angleDegrees = brightnessAngle * 180 / Math.PI;
        const normalizedAngle = angleDegrees < 0 ? angleDegrees + 360 : angleDegrees;
        const brightness = Math.max(0, Math.min(100, normalizedAngle / 360 * 100));
        const { r, g, b } = hsvToRgb(color.hsv.h, saturation, brightness);
        const newColor = colorToValue(r, g, b, color.rgb.a);
        onChange(newColor);
      }
    }, [color, onChange, size]);
    const handleMouseUp = require$$0.useCallback(() => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);
    const handleMouseDown = require$$0.useCallback((e) => {
      isDraggingRef.current = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      handleMouseMove(e.nativeEvent);
    }, [handleMouseMove, handleMouseUp]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        width: size,
        height: size,
        onMouseDown: handleMouseDown,
        className: clsx.clsx(
          "rounded-lg",
          disabled ? "cursor-not-allowed" : "cursor-crosshair"
        ),
        style: { width: size, height: size }
      }
    ) });
  };
  const HueBox = ({
    color,
    onChange,
    height = 180,
    disabled
  }) => {
    const canvasRef = require$$0.useRef(null);
    const containerRef = require$$0.useRef(null);
    const isDraggingRef = require$$0.useRef(false);
    const [width, setWidth] = require$$0.useState(0);
    require$$0.useEffect(() => {
      if (!containerRef.current) return;
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setWidth(entry.contentRect.width);
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);
    const drawSVBox = require$$0.useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas || !width) return;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const hueColor = `hsl(${color.hsv.h}, 100%, 50%)`;
      ctx.fillStyle = hueColor;
      ctx.fillRect(0, 0, width, height);
      const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
      whiteGradient.addColorStop(0, "#fff");
      whiteGradient.addColorStop(1, "transparent");
      ctx.fillStyle = whiteGradient;
      ctx.fillRect(0, 0, width, height);
      const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
      blackGradient.addColorStop(0, "transparent");
      blackGradient.addColorStop(1, "#000");
      ctx.fillStyle = blackGradient;
      ctx.fillRect(0, 0, width, height);
      const x = color.hsv.s / 100 * width;
      const y = height - color.hsv.v / 100 * height;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = color.hex;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }, [color, width, height]);
    require$$0.useEffect(() => {
      drawSVBox();
    }, [drawSVBox]);
    const getCoordinatesFromEvent = (e) => {
      if (!canvasRef.current) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, height));
      return { x, y };
    };
    const updateColorFromCoordinates = (x, y) => {
      const s = Math.max(0, Math.min(100, x / width * 100));
      const v = Math.max(0, Math.min(100, 100 - y / height * 100));
      const { r, g, b } = hsvToRgb(color.hsv.h, s, v);
      onChange(colorToValue(r, g, b, color.rgb.a));
    };
    const handleMove = (e) => {
      if (!isDraggingRef.current) return;
      const coords = getCoordinatesFromEvent(e);
      if (coords) {
        updateColorFromCoordinates(coords.x, coords.y);
      }
    };
    const handleDown = (e) => {
      e.preventDefault();
      isDraggingRef.current = true;
      const coords = getCoordinatesFromEvent(e);
      if (coords) {
        updateColorFromCoordinates(coords.x, coords.y);
      }
      const handleUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    };
    const handleWheel = (e) => {
      e.preventDefault();
      const coords = getCoordinatesFromEvent(e);
      if (!coords) return;
      const scrollSensitivity = 2;
      const deltaY = e.deltaY;
      const deltaX = e.deltaX;
      let newS = color.hsv.s;
      let newV = color.hsv.v;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        newV = Math.max(0, Math.min(100, color.hsv.v - deltaY / scrollSensitivity));
      } else {
        newS = Math.max(0, Math.min(100, color.hsv.s + deltaX / scrollSensitivity));
      }
      const { r, g, b } = hsvToRgb(color.hsv.h, newS, newV);
      onChange(colorToValue(r, g, b, color.rgb.a));
    };
    const handleKeyDown = (e) => {
      const step = e.shiftKey ? 10 : 1;
      let newS = color.hsv.s;
      let newV = color.hsv.v;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          newS = Math.max(0, color.hsv.s - step);
          break;
        case "ArrowRight":
          e.preventDefault();
          newS = Math.min(100, color.hsv.s + step);
          break;
        case "ArrowUp":
          e.preventDefault();
          newV = Math.min(100, color.hsv.v + step);
          break;
        case "ArrowDown":
          e.preventDefault();
          newV = Math.max(0, color.hsv.v - step);
          break;
        default:
          return;
      }
      const { r, g, b } = hsvToRgb(color.hsv.h, newS, newV);
      onChange(colorToValue(r, g, b, color.rgb.a));
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full relative mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        onMouseDown: handleDown,
        onWheel: handleWheel,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        className: clsx.clsx(
          "rounded-lg",
          disabled ? "cursor-not-allowed" : "cursor-crosshair"
        ),
        style: { display: "block", height },
        "aria-label": "Color saturation and value picker",
        role: "slider",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": color.hsv.s
      }
    ) });
  };
  function FormatSelect({
    currentFormat,
    handleFormatChange,
    theme,
    disabled
  }) {
    const [open, setOpen] = require$$0.useState(false);
    const [dropdownPosition, setDropdownPosition] = require$$0.useState(
      "bottom"
    );
    const dropdownRef = require$$0.useRef(null);
    const buttonRef = require$$0.useRef(null);
    const [focusedIndex, setFocusedIndex] = require$$0.useState(null);
    const options = ["hex", "rgb", "hsl", "hsv", "cmyk"];
    require$$0.useEffect(() => {
      if (open && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = options.length * 40 + 12;
        const spaceBelow = viewportHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
          setDropdownPosition("bottom");
        } else {
          setDropdownPosition("top");
        }
      }
    }, [open, options.length]);
    require$$0.useEffect(() => {
      const handleClickOutside = (event) => {
        var _a;
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !((_a = buttonRef.current) == null ? void 0 : _a.contains(event.target))) {
          setOpen(false);
        }
      };
      const handleResize = () => open && setOpen(false);
      const handleScroll = () => open && setOpen(false);
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }, [open]);
    const handleKeyDown = (e) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          setOpen(true);
          setFocusedIndex(options.findIndex((o) => o === currentFormat));
          e.preventDefault();
        }
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        setFocusedIndex(
          (prev) => prev === null ? 0 : (prev + 1) % options.length
        );
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setFocusedIndex(
          (prev) => prev === null ? options.length - 1 : (prev - 1 + options.length) % options.length
        );
        e.preventDefault();
      } else if (e.key === "Enter" && focusedIndex !== null) {
        handleFormatChange == null ? void 0 : handleFormatChange(options[focusedIndex]);
        setOpen(false);
      }
    };
    require$$0.useEffect(() => {
      if (open && focusedIndex !== null && dropdownRef.current) {
        const optionEl = dropdownRef.current.children[focusedIndex];
        optionEl == null ? void 0 : optionEl.focus();
      }
    }, [focusedIndex, open]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          ref: buttonRef,
          type: "button",
          disabled,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-controls": "format-select-list",
          onClick: () => setOpen((prev) => !prev),
          onKeyDown: handleKeyDown,
          className: clsx.clsx(
            "w-full px-3 py-2 rounded-lg cursor-pointer border text-sm flex justify-between items-center focus:outline-none focus:ring-2 disabled:cursor-not-allowed focus:ring-[var(--brand-color)] transition-colors",
            theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-200 text-black"
          ),
          children: [
            currentFormat.toUpperCase(),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              lucideReact.ChevronDown,
              {
                size: 20,
                className: clsx.clsx(
                  "transition-all duration-200",
                  theme === "dark" ? "text-gray-200" : "text-gray-500 dark:text-gray-200",
                  open ? "rotate-180" : "rotate-0"
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "ul",
        {
          ref: dropdownRef,
          id: "format-select-list",
          role: "listbox",
          "aria-activedescendant": focusedIndex !== null ? `format-option-${options[focusedIndex]}` : void 0,
          className: clsx.clsx(
            "absolute z-10 w-full p-1.5 rounded-lg shadow-lg overflow-hidden border",
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
            dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1",
            open ? dropdownPosition === "top" ? "animate-slideUp" : "animate-slideDown" : "hidden"
          ),
          tabIndex: -1,
          onKeyDown: handleKeyDown,
          children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "li",
            {
              id: `format-option-${option}`,
              role: "option",
              "aria-selected": currentFormat === option,
              tabIndex: -1,
              className: clsx.clsx(
                "px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm outline-none",
                currentFormat === option ? "bg-[var(--brand-color)] text-white" : focusedIndex === options.indexOf(option) ? "bg-[var(--brand-color)]/10" : "hover:bg-[var(--brand-color)]/10",
                theme === "dark" ? "text-white" : "text-black dark:text-white"
              ),
              onClick: () => {
                var _a;
                handleFormatChange == null ? void 0 : handleFormatChange(option);
                setOpen(false);
                (_a = buttonRef.current) == null ? void 0 : _a.focus();
              },
              children: option.toUpperCase()
            },
            option
          ))
        }
      )
    ] });
  }
  console.log(require$$0.useState);
  const ColorPicker = ({
    value,
    format = "hex",
    variant = "wheel",
    theme = "light",
    disabled = false,
    showAlpha = true,
    showHistory = true,
    showTitle = true,
    showFormats = true,
    showCopyButton = true,
    presetColors = defaultPresetColors,
    maxHistory = 10,
    containerClasses = "",
    showColorInput = true,
    containerStyle,
    popupClasses,
    onChange,
    inline = false,
    title = "Color Picker",
    enableHueSlider = false,
    showPresets = true,
    onFormatChange,
    onOpen,
    brandColor,
    enableFavorite = false,
    enableShuffle = false,
    onClose,
    triggerRef: externalTriggerRef,
    showDefaultButton = true
  }) => {
    const [dropdownPositionY, setDropdownPositionY] = require$$0.useState("bottom");
    const [dropdownPositionX, setDropdownPositionX] = require$$0.useState("left");
    const popoverRef = require$$0.useRef(null);
    const internalTriggerRef = require$$0.useRef(null);
    const [currentHue, setCurrentHue] = require$$0.useState(180);
    const {
      currentColor,
      currentFormat,
      isOpen,
      colorHistory,
      favoriteColors,
      updateColor,
      updateFormat,
      setIsOpen,
      addToFavorites,
      removeFromFavorites,
      generateRandomColor
    } = useColorPicker({
      initialColor: value,
      initialFormat: format,
      showAlpha,
      maxHistory,
      setCurrentHue
    });
    const activeTriggerRef = externalTriggerRef || internalTriggerRef;
    const isDark = theme === "dark";
    require$$0.useEffect(() => {
      if (value) {
        const parsed = parseColor(value);
        if (parsed) updateColor(parsed);
      }
    }, [value, updateColor]);
    require$$0.useEffect(() => {
      updateFormat(format);
    }, [format, updateFormat]);
    require$$0.useEffect(() => {
      const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          if (activeTriggerRef.current && !activeTriggerRef.current.contains(event.target)) {
            handleClose();
          }
        }
      };
      if (isOpen && !inline) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen, inline]);
    require$$0.useEffect(() => {
      if ((externalTriggerRef == null ? void 0 : externalTriggerRef.current) && !inline) {
        const handleExternalTriggerClick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (disabled) return;
          if (isOpen) {
            handleClose();
          } else {
            handleOpen();
          }
        };
        const triggerElement = externalTriggerRef.current;
        triggerElement.addEventListener("click", handleExternalTriggerClick);
        return () => {
          if (triggerElement) {
            triggerElement.removeEventListener("click", handleExternalTriggerClick);
          }
        };
      }
    }, [externalTriggerRef, inline, disabled, isOpen]);
    require$$0.useEffect(() => {
      const newHue = hsvToRgb(currentHue, 100, 100);
      const newColor = colorToValue(
        newHue.r,
        newHue.g,
        newHue.b
      );
      handleColorChange(newColor);
    }, [currentHue]);
    const calculateDropdownPosition = () => {
      if (!activeTriggerRef.current) return;
      const triggerRect = activeTriggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      let estimatedHeight = 200;
      if (showAlpha) estimatedHeight += 50;
      if (showPresets && presetColors.length > 0) estimatedHeight += 80;
      if (showHistory && colorHistory.length > 0) estimatedHeight += 60;
      if (enableFavorite && favoriteColors.length > 0) estimatedHeight += 60;
      const estimatedWidth = 320;
      const spaceBelow = viewportHeight - triggerRect.bottom - 10;
      const spaceAbove = triggerRect.top - 30;
      if (spaceBelow >= estimatedHeight) {
        setDropdownPositionY("bottom");
      } else if (spaceAbove >= estimatedHeight) {
        setDropdownPositionY("top");
      } else {
        setDropdownPositionY(spaceBelow > spaceAbove ? "bottom" : "top");
      }
      const spaceRight = viewportWidth - triggerRect.left;
      const spaceLeft = triggerRect.right;
      if (spaceRight >= estimatedWidth) {
        setDropdownPositionX("left");
      } else if (spaceLeft >= estimatedWidth) {
        setDropdownPositionX("right");
      } else {
        setDropdownPositionX("center");
      }
    };
    require$$0.useEffect(() => {
      setIsOpen(inline);
    }, [inline]);
    const handleOpen = () => {
      if (disabled) return;
      setIsOpen(true);
      setTimeout(calculateDropdownPosition, 0);
      onOpen == null ? void 0 : onOpen();
    };
    const handleClose = () => {
      setIsOpen(false);
      onClose == null ? void 0 : onClose();
    };
    const handleColorChange = (color) => {
      if (disabled) return;
      updateColor(color);
      setCurrentHue(color.hsv.h);
      onChange == null ? void 0 : onChange(color, currentFormat);
    };
    const handleFormatChange = (newFormat) => {
      updateFormat(newFormat);
      onFormatChange == null ? void 0 : onFormatChange(newFormat);
    };
    require$$0.useEffect(() => {
      const handleResize = () => {
        if (isOpen) {
          calculateDropdownPosition();
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);
    const themeClasses = isDark ? "bg-gray-900 text-white border-gray-600" : "bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-200";
    const currentColorString = formatColorValue(currentColor, currentFormat);
    const brandColorStyles = {
      "--brand-color": brandColor,
      ...containerStyle
    };
    const getDropdownStyles = () => {
      if (inline) return {};
      if (!activeTriggerRef.current) return {
        position: "absolute",
        zIndex: 2e15
      };
      const triggerRect = activeTriggerRef.current.getBoundingClientRect();
      const baseStyles = {
        position: "fixed",
        zIndex: 2e15
      };
      if (dropdownPositionY === "bottom") {
        baseStyles.top = triggerRect.bottom + 8;
      } else {
        baseStyles.bottom = window.innerHeight - triggerRect.top + 8;
      }
      if (dropdownPositionX === "left") {
        baseStyles.left = triggerRect.left;
      } else if (dropdownPositionX === "right") {
        baseStyles.right = window.innerWidth - triggerRect.right;
      } else {
        baseStyles.left = triggerRect.left + triggerRect.width / 2;
        baseStyles.transform = "translateX(-50%)";
      }
      return baseStyles;
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clsx.clsx(
      "relative inline-block",
      containerClasses
    ), style: brandColorStyles, children: [
      !inline && showDefaultButton && !externalTriggerRef && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-haspopup": "dialog",
          "aria-expanded": isOpen,
          "aria-controls": "zenuicolorpicker-popover",
          type: "button",
          ref: internalTriggerRef,
          onClick: handleOpen,
          disabled,
          className: clsx.clsx(
            "w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-xs hover:shadow-md transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[var(--brand-color)]",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"
          ),
          style: { backgroundColor: currentColor.hex },
          title: currentColorString
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: "zenuicolorpicker-popover",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "zenuicolorpicker-title",
          ref: popoverRef,
          className: clsx.clsx(
            "p-4 rounded-xl w-80 shadow-2xl border backdrop-blur-xs",
            themeClasses,
            popupClasses,
            disabled ? "!opacity-70 !cursor-not-allowed" : "cursor-default",
            isOpen ? dropdownPositionY === "top" ? "animate-slideUp" : "animate-slideDown" : "",
            !isOpen && "hidden"
          ),
          style: getDropdownStyles(),
          children: [
            (showTitle || enableShuffle) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              showTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "zenuicolorpicker-title", className: "text-lg font-semibold", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: enableShuffle && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  disabled,
                  type: "button",
                  "aria-label": "Generate random color",
                  onClick: generateRandomColor,
                  className: clsx.clsx(
                    "p-2 rounded-lg transition-colors group cursor-pointer duration-200",
                    isDark ? "hover:bg-gray-600 text-gray-200" : "hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-gray-600 dark:text-gray-200 text-gray-600"
                  ),
                  title: "Generate random color",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    lucideReact.RotateCcw,
                    {
                      size: 16,
                      className: clsx.clsx(
                        "transition-all duration-200",
                        !disabled && "group-hover:rotate-[-90deg]"
                      )
                    }
                  )
                }
              ) })
            ] }),
            variant === "wheel" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              WheelPicker,
              {
                color: currentColor,
                onChange: handleColorChange,
                size: 220,
                disabled
              }
            ) }),
            variant === "hue-box" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              HueBox,
              {
                color: currentColor,
                onChange: handleColorChange,
                disabled
              }
            ),
            (variant === "hue-slider" || enableHueSlider) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorSlider,
              {
                hue: currentHue,
                disabled,
                onChange: setCurrentHue
              }
            ),
            showAlpha && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              BrightnessSlider,
              {
                value: currentColor.rgb.a || 1,
                color: currentColor,
                disabled,
                onChange: (alpha) => {
                  const newColor = colorToValue(
                    currentColor.rgb.r,
                    currentColor.rgb.g,
                    currentColor.rgb.b,
                    alpha
                  );
                  handleColorChange(newColor);
                }
              }
            ) }),
            showFormats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: showFormats && /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormatSelect,
              {
                disabled,
                currentFormat,
                handleFormatChange,
                theme
              }
            ) }),
            showColorInput && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorInput,
              {
                value: currentColorString,
                format: currentFormat,
                disabled,
                onChange: (colorString) => {
                  const parsed = parseColor(colorString);
                  if (parsed) handleColorChange(parsed);
                },
                showCopyButton,
                theme
              }
            ) }),
            showPresets && presetColors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: clsx.clsx(
                "text-sm font-medium mb-2",
                isDark ? "text-gray-100" : "text-gray-600 dark:text-gray-100"
              ), children: "Preset Colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center flex-wrap gap-2", children: presetColors.map((color, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "button",
                  "aria-label": `Select color ${color}`,
                  disabled,
                  onClick: () => {
                    const parsed = parseColor(color);
                    if (parsed) handleColorChange(parsed);
                  },
                  className: clsx.clsx(
                    "disabled:cursor-not-allowed w-8 h-8 rounded-lg cursor-pointer border dark:border-gray-700 border-gray-200 hover:scale-110 disabled:hover:scale-100 transition-transform duration-200",
                    isDark ? "border-gray-700" : "border-gray-200 dark:border-gray-700"
                  ),
                  style: { backgroundColor: color },
                  title: color
                },
                index
              )) })
            ] }),
            showHistory && colorHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: clsx.clsx(
                "text-sm font-medium mb-2 flex items-center gap-1",
                isDark ? "text-gray-100" : "text-gray-600 dark:text-gray-100"
              ), children: "Recent Colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: colorHistory.slice(0, 10).map((color, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Select recent color ${color.hex}`,
                  disabled,
                  onClick: () => handleColorChange(color),
                  onDoubleClick: () => addToFavorites(color),
                  className: clsx.clsx(
                    " disabled:cursor-not-allowed w-6 h-6 rounded-sm border hover:scale-110 transition-transform disabled:hover:scale-100 duration-200",
                    isDark ? "border-gray-700" : "border-gray-200 dark:border-gray-700"
                  ),
                  style: { backgroundColor: color.hex },
                  title: `${color.hex} (double-click to favorite)`
                },
                index
              )) })
            ] }),
            enableFavorite && favoriteColors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: clsx.clsx(
                "text-sm font-medium mb-2 mt-4 gap-1",
                isDark ? "text-gray-100" : "text-gray-600 dark:text-gray-100"
              ), children: "Favorites" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: favoriteColors.map((color, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled,
                  "aria-label": `Add ${currentColorString} to favorites`,
                  onClick: () => handleColorChange(color),
                  onDoubleClick: () => removeFromFavorites(color),
                  className: clsx.clsx(
                    "w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 disabled:cursor-not-allowed transition-transform duration-200",
                    isDark ? "border-gray-700" : "border-gray-200 dark:border-gray-700"
                  ),
                  style: { backgroundColor: color.hex },
                  title: `${color.hex} (double-click to remove)`
                },
                index
              )) })
            ] }),
            enableFavorite && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: clsx.clsx(
                  isDark ? "border-gray-600" : "border-gray-200 dark:border-gray-600",
                  "mt-4 pt-4 border-t"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: clsx.clsx(
                        "w-8 h-8 rounded-lg border",
                        isDark ? "border-gray-700" : "border-gray-200 dark:border-gray-700"
                      ),
                      "aria-hidden": "true",
                      style: { backgroundColor: currentColor.hex }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: currentColorString }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: clsx.clsx(
                          "text-xs",
                          isDark ? "text-gray-300" : "text-gray-500 dark:text-gray-300"
                        ),
                        children: "Current Color"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      disabled,
                      type: "button",
                      onClick: () => addToFavorites(currentColor),
                      className: clsx.clsx(
                        "p-1 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-sm transition-colors cursor-pointer duration-200",
                        isDark ? "text-gray-200 hover:bg-gray-600" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                      ),
                      title: "Add to favorites",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(lucideReact.Heart, { size: 16 })
                    }
                  )
                ] })
              }
            )
          ]
        }
      )
    ] });
  };
  exports2.BrightnessSlider = BrightnessSlider;
  exports2.ColorInput = ColorInput;
  exports2.ColorPicker = ColorPicker;
  exports2.colorToValue = colorToValue;
  exports2.defaultPresetColors = defaultPresetColors;
  exports2.formatColorValue = formatColorValue;
  exports2.hexToRgb = hexToRgb;
  exports2.hslToRgb = hslToRgb;
  exports2.hsvToRgb = hsvToRgb;
  exports2.parseColor = parseColor;
  exports2.rgbToCmyk = rgbToCmyk;
  exports2.rgbToHex = rgbToHex;
  exports2.rgbToHsl = rgbToHsl;
  exports2.rgbToHsv = rgbToHsv;
  exports2.useColorPicker = useColorPicker;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
