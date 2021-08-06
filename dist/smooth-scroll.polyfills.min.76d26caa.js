// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../assets/js/smooth-scroll.polyfills.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! SmoothScroll v16.1.4 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).SmoothScroll = t();
}(this, function () {
  "use strict";

  window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
    var t,
        n = (this.document || this.ownerDocument).querySelectorAll(e),
        o = this;

    do {
      for (t = n.length; --t >= 0 && n.item(t) !== o;) {
        ;
      }
    } while (t < 0 && (o = o.parentElement));

    return o;
  }), function () {
    if ("function" == typeof window.CustomEvent) return !1;

    function e(e, t) {
      t = t || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }

    e.prototype = window.Event.prototype, window.CustomEvent = e;
  }(),
  /**
  	 * requestAnimationFrame() polyfill
  	 * By Erik Möller. Fixes from Paul Irish and Tino Zijdel.
  	 * @link http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  	 * @link http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  	 * @license MIT
  	 */
  function () {
    for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) {
      window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
    }

    window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
      var o = new Date().getTime(),
          i = Math.max(0, 16 - (o - e)),
          a = window.setTimeout(function () {
        t(o + i);
      }, i);
      return e = o + i, a;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
      clearTimeout(e);
    });
  }();

  var e = {
    ignore: "[data-scroll-ignore]",
    header: null,
    topOnEmptyHash: !0,
    speed: 500,
    speedAsDuration: !1,
    durationMax: null,
    durationMin: null,
    clip: !0,
    offset: 0,
    easing: "easeInOutCubic",
    customEasing: null,
    updateURL: !0,
    popstate: !0,
    emitEvents: !0
  },
      t = function t() {
    var e = {};
    return Array.prototype.forEach.call(arguments, function (t) {
      for (var n in t) {
        if (!t.hasOwnProperty(n)) return;
        e[n] = t[n];
      }
    }), e;
  },
      n = function n(e) {
    "#" === e.charAt(0) && (e = e.substr(1));

    for (var t, n = String(e), o = n.length, i = -1, a = "", r = n.charCodeAt(0); ++i < o;) {
      if (0 === (t = n.charCodeAt(i))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
      t >= 1 && t <= 31 || 127 == t || 0 === i && t >= 48 && t <= 57 || 1 === i && t >= 48 && t <= 57 && 45 === r ? a += "\\" + t.toString(16) + " " : a += t >= 128 || 45 === t || 95 === t || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(i) : "\\" + n.charAt(i);
    }

    return "#" + a;
  },
      o = function o() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  },
      i = function i(e) {
    return e ? (t = e, parseInt(window.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
    var t;
  },
      a = function a(e, t, n) {
    0 === e && document.body.focus(), n || (e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), window.scrollTo(0, t));
  },
      r = function r(e, t, n, o) {
    if (t.emitEvents && "function" == typeof window.CustomEvent) {
      var i = new CustomEvent(e, {
        bubbles: !0,
        detail: {
          anchor: n,
          toggle: o
        }
      });
      document.dispatchEvent(i);
    }
  };

  return function (c, u) {
    var s,
        l,
        d,
        m,
        f = {};
    f.cancelScroll = function (e) {
      cancelAnimationFrame(m), m = null, e || r("scrollCancel", s);
    }, f.animateScroll = function (n, c, u) {
      f.cancelScroll();
      var l = t(s || e, u || {}),
          w = "[object Number]" === Object.prototype.toString.call(n),
          h = w || !n.tagName ? null : n;

      if (w || h) {
        var p = window.pageYOffset;
        l.header && !d && (d = document.querySelector(l.header));

        var g,
            y,
            v,
            S = i(d),
            E = w ? n : function (e, t, n, i) {
          var a = 0;
          if (e.offsetParent) do {
            a += e.offsetTop, e = e.offsetParent;
          } while (e);
          return a = Math.max(a - t - n, 0), i && (a = Math.min(a, o() - window.innerHeight)), a;
        }(h, S, parseInt("function" == typeof l.offset ? l.offset(n, c) : l.offset, 10), l.clip),
            b = E - p,
            A = o(),
            O = 0,
            C = function (e, t) {
          var n = t.speedAsDuration ? t.speed : Math.abs(e / 1e3 * t.speed);
          return t.durationMax && n > t.durationMax ? t.durationMax : t.durationMin && n < t.durationMin ? t.durationMin : parseInt(n, 10);
        }(b, l),
            M = function M(e) {
          g || (g = e), O += e - g, v = p + b * function (e, t) {
            var n;
            return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t;
          }(l, y = (y = 0 === C ? 0 : O / C) > 1 ? 1 : y), window.scrollTo(0, Math.floor(v)), function (e, t) {
            var o = window.pageYOffset;
            if (e == t || o == t || (p < t && window.innerHeight + o) >= A) return f.cancelScroll(!0), a(n, t, w), r("scrollStop", l, n, c), g = null, m = null, !0;
          }(v, E) || (m = window.requestAnimationFrame(M), g = e);
        };

        0 === window.pageYOffset && window.scrollTo(0, 0), function (e, t, n) {
          t || history.pushState && n.updateURL && history.pushState({
            smoothScroll: JSON.stringify(n),
            anchor: e.id
          }, document.title, e === document.documentElement ? "#top" : "#" + e.id);
        }(n, w, l), "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches ? a(n, Math.floor(E), !1) : (r("scrollStart", l, n, c), f.cancelScroll(!0), window.requestAnimationFrame(M));
      }
    };

    var w = function w(e) {
      if (!e.defaultPrevented && !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) && "closest" in e.target && (l = e.target.closest(c)) && "a" === l.tagName.toLowerCase() && !e.target.closest(s.ignore) && l.hostname === window.location.hostname && l.pathname === window.location.pathname && /#/.test(l.href)) {
        var t, o;

        try {
          t = n(decodeURIComponent(l.hash));
        } catch (e) {
          t = n(l.hash);
        }

        if ("#" === t) {
          if (!s.topOnEmptyHash) return;
          o = document.documentElement;
        } else o = document.querySelector(t);

        (o = o || "#top" !== t ? o : document.documentElement) && (e.preventDefault(), function (e) {
          if (history.replaceState && e.updateURL && !history.state) {
            var t = window.location.hash;
            t = t || "", history.replaceState({
              smoothScroll: JSON.stringify(e),
              anchor: t || window.pageYOffset
            }, document.title, t || window.location.href);
          }
        }(s), f.animateScroll(o, l));
      }
    },
        h = function h() {
      if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(s)) {
        var e = history.state.anchor;
        "string" == typeof e && e && !(e = document.querySelector(n(history.state.anchor))) || f.animateScroll(e, null, {
          updateURL: !1
        });
      }
    };

    f.destroy = function () {
      s && (document.removeEventListener("click", w, !1), window.removeEventListener("popstate", h, !1), f.cancelScroll(), s = null, l = null, d = null, m = null);
    };

    return function () {
      if (!("querySelector" in document && "addEventListener" in window && "requestAnimationFrame" in window && "closest" in window.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
      f.destroy(), s = t(e, u || {}), d = s.header ? document.querySelector(s.header) : null, document.addEventListener("click", w, !1), s.updateURL && s.popstate && window.addEventListener("popstate", h, !1);
    }(), f;
  };
});
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51145" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../assets/js/smooth-scroll.polyfills.min.js"], null)
//# sourceMappingURL=/smooth-scroll.polyfills.min.76d26caa.js.map