"use strict";
//promise-7.0.4.js
!function n(t,e,r){function o(u,f){if(!e[u]){if(!t[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var l=e[u]={exports:{}};t[u][0].call(l.exports,function(n){var e=t[u][1][n];return o(e?e:n)},l,l.exports,n,t,e,r)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(n,t,e){"use strict";function r(){}function o(n){try{return n.then}catch(t){return d=t,w}}function i(n,t){try{return n(t)}catch(e){return d=e,w}}function u(n,t,e){try{n(t,e)}catch(r){return d=r,w}}function f(n){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");this._37=0,this._12=null,this._59=[],n!==r&&v(n,this)}function c(n,t,e){return new n.constructor(function(o,i){var u=new f(r);u.then(o,i),s(n,new p(t,e,u))})}function s(n,t){for(;3===n._37;)n=n._12;return 0===n._37?void n._59.push(t):void y(function(){var e=1===n._37?t.onFulfilled:t.onRejected;if(null===e)return void(1===n._37?l(t.promise,n._12):a(t.promise,n._12));var r=i(e,n._12);r===w?a(t.promise,d):l(t.promise,r)})}function l(n,t){if(t===n)return a(n,new TypeError("A promise cannot be resolved with itself."));if(t&&("object"==typeof t||"function"==typeof t)){var e=o(t);if(e===w)return a(n,d);if(e===n.then&&t instanceof f)return n._37=3,n._12=t,void h(n);if("function"==typeof e)return void v(e.bind(t),n)}n._37=1,n._12=t,h(n)}function a(n,t){n._37=2,n._12=t,h(n)}function h(n){for(var t=0;t<n._59.length;t++)s(n,n._59[t]);n._59=null}function p(n,t,e){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.promise=e}function v(n,t){var e=!1,r=u(n,function(n){e||(e=!0,l(t,n))},function(n){e||(e=!0,a(t,n))});e||r!==w||(e=!0,a(t,d))}var y=n("asap/raw"),d=null,w={};t.exports=f,f._99=r,f.prototype.then=function(n,t){if(this.constructor!==f)return c(this,n,t);var e=new f(r);return s(this,new p(n,t,e)),e}},{"asap/raw":4}],2:[function(n,t,e){"use strict";function r(n){var t=new o(o._99);return t._37=1,t._12=n,t}var o=n("./core.js");t.exports=o;var i=r(!0),u=r(!1),f=r(null),c=r(void 0),s=r(0),l=r("");o.resolve=function(n){if(n instanceof o)return n;if(null===n)return f;if(void 0===n)return c;if(n===!0)return i;if(n===!1)return u;if(0===n)return s;if(""===n)return l;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new o(t.bind(n))}catch(e){return new o(function(n,t){t(e)})}return r(n)},o.all=function(n){var t=Array.prototype.slice.call(n);return new o(function(n,e){function r(u,f){if(f&&("object"==typeof f||"function"==typeof f)){if(f instanceof o&&f.then===o.prototype.then){for(;3===f._37;)f=f._12;return 1===f._37?r(u,f._12):(2===f._37&&e(f._12),void f.then(function(n){r(u,n)},e))}var c=f.then;if("function"==typeof c){var s=new o(c.bind(f));return void s.then(function(n){r(u,n)},e)}}t[u]=f,0===--i&&n(t)}if(0===t.length)return n([]);for(var i=t.length,u=0;u<t.length;u++)r(u,t[u])})},o.reject=function(n){return new o(function(t,e){e(n)})},o.race=function(n){return new o(function(t,e){n.forEach(function(n){o.resolve(n).then(t,e)})})},o.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":1}],3:[function(n,t,e){"use strict";function r(){if(c.length)throw c.shift()}function o(n){var t;t=f.length?f.pop():new i,t.task=n,u(t)}function i(){this.task=null}var u=n("./raw"),f=[],c=[],s=u.makeRequestCallFromTimer(r);t.exports=o,i.prototype.call=function(){try{this.task.call()}catch(n){o.onerror?o.onerror(n):(c.push(n),s())}finally{this.task=null,f[f.length]=this}}},{"./raw":4}],4:[function(n,t,e){(function(n){"use strict";function e(n){f.length||(u(),c=!0),f[f.length]=n}function r(){for(;s<f.length;){var n=s;if(s+=1,f[n].call(),s>l){for(var t=0,e=f.length-s;e>t;t++)f[t]=f[t+s];f.length-=s,s=0}}f.length=0,s=0,c=!1}function o(n){var t=1,e=new a(n),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){t=-t,r.data=t}}function i(n){return function(){function t(){clearTimeout(e),clearInterval(r),n()}var e=setTimeout(t,0),r=setInterval(t,50)}}t.exports=e;var u,f=[],c=!1,s=0,l=1024,a=n.MutationObserver||n.WebKitMutationObserver;u="function"==typeof a?o(r):i(r),e.requestFlush=u,e.makeRequestCallFromTimer=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(n,t,e){"function"!=typeof Promise.prototype.done&&(Promise.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(n){setTimeout(function(){throw n},0)})})},{}],6:[function(n,t,e){n("asap");"undefined"==typeof Promise&&(Promise=n("./lib/core.js"),n("./lib/es6-extensions.js")),n("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]);
/*!
 * routerJS
 * http://routerjs.com/
 *
 * Includes Promises
 * https://www.promisejs.org/
 * 
 * Copying and drawing lessons from Predecessors code
 * Released under the MIT license
 *
 * Date: 2015-12-24T21:10Z
 *
 * Copycat: LinQuan
 */

//Factory mode copy form jQuery.
(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get routerJS.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var routerJS = require("routerjs")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "routerJS requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    var lteIE8 = eval(!-[1,]),
    gteIE8 = (typeof window.localStorage != 'undefined'),
    isIE8 = (lteIE8 && gteIE8),
    ltIE8 = (lteIE8 && !isIE8),
    head = document.head || document.getElementsByTagName('head')[0],
    local = location,
    host = local.hostname,
    protocol = local.protocol,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty;

    function isString(it) {
        return ostring.call(it) === '[object String]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //One router act on one service(domainname)
    var routerJS = function(domain) {
        if(!domain) {
            domain = '.';
        }
        if(!routerJS[domain]) {
            routerJS[domain] = new routerJS.init(domain);
        }
        return routerJS[domain];
    };

    routerJS.fn = routerJS.prototype = {
        config: function(options) {
            this.router = {};
            this.fileMap = {};
            this.map = {};
            this.config = mixin({}, options);
        },
        set: function(path, options) {
            this.router[path] = options;
        },
        makeMap: function() {
            var js_map = this.config.jsMap;
            var map = this.map;
            for(var name in js_map) {
                var this_map = js_map[name];
                if(!map[name]) {
                    map[name] = {children:[],require:[]};
                }
                console.log(this_map.require);
                if(this_map.require) {
                    if(isString(this_map.require)) {
                        if(!js_map[this_map.require]) {
                            routerJS.error('Not fount ' + this_map.require + ' in jsMap');
                            continue;
                        }
                        if(!map[this_map.require]) {
                            map[this_map.require] = {children:[],require:[]};
                        }
                        if(map[name].require.indexOf(this_map.require) === -1) {
                            map[name].require.push(this_map.require);
                        }
                        if(map[this_map.require].children.indexOf(name) === -1) {
                            map[this_map.require].children.push(name);
                        }
                    }
                    if(isArray(this_map.require)) {
                        each(this_map.require, function(this_require) {
                            if(!map[this_require]) {
                                map[this_require] = {children:[],require:[]};
                            }
                            if(map[name].require.indexOf(this_require) === -1) {
                                map[name].require.push(this_require);
                            }
                            if(map[this_require].children.indexOf(name) === -1) {
                                map[this_require].children.push(name);
                            }
                        });
                    }
                }
            }
        },
        run: function() {
            
        }
    };

    mixin(routerJS, {
        debug: false,

        error: function(msg) {
            throw new Error( msg );
        },

        createJS: function(obj) {
            var element = document.createElement('script');
            element.type = 'text/javascript';
            if(obj.source) {
                if(routerJS.debug) {
                    element.title = obj.name;
                }
                if(typeof document.textContent == 'object') {
                    element.textContent = obj.source;
                    return element;
                }
                element.text = obj.source;
                return element;
            }
            element.src = obj.path;
            return element;
        },

        createCSS: function() {
            var element;
            if(obj.source) {
                if(document.createStyleSheet) {
                    element = document.createStyleSheet();
                    element.cssText = obj.source;
                    return element;
                }
                element = document.createElement('style');
                element.type = 'text/css';
                element.textContent = obj.source;
                return element;
            }
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = obj.url;
            return element;
        },

        getStrage: function(obj) {
            var name = 'lsI_' + ojb.name + '.' + obj.type;
            return !!window.localStorage && localStorage.getItem(name);
        },

        setStorage: function(obj) {
            var name = 'lsI_' + ojb.name + '.' + obj.type;
            var data = JSON.stringify(obj);
            return !!window.localStorage && localStorage.setItem(name, data);
        },

        get: function(obj) {
            return new Promise(function(resolve, rejcet) {
                var _ls_tmp = getStrage(obj),
                _data_tmp;
                try{
                    _data_tmp = JSON.parse(_ls_tmp);
                } catch(e) {
                }
                if(_data_tmp && _data_tmp.source && _data_tmp.path && (_data_tmp.path == obj.path) && !_data_tmp.error) {
                    resolve(_data_tmp);
                }
                var xhr, xtype, data_tmp, name = obj.name;
                try{
                    xhr = new XMLHttpRequest();
                } catch(e) {}

                if(!obj.isremote) {
                    if(!xhr && window.ActiveXObject) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                } else {
                    if(xhr && ("withCredentials" in xhr)) {
                        //xhr = new XMLHttpRequest();
                    } else if(typeof XDomainRequest != "undefined") {
                        xhr = new XDomainRequest();
                        xtype = 'XDR';
                    } else {
                        xhr = null;
                    }
                }

                if(xhr) {
                    if(!xtype) {
                        try{//Firefox 3.0
                            xhr.onreadystatechange = function(e) {
                                if (xhr.readyState == 4) {
                                    if(xhr.status == 200 || xhr.status == 304) {
                                        obj.source = xhr.responseText;
                                        setStorage(obj);
                                        resolve(obj);
                                    } else if(obj.isremote && xhr.status === 0) {
                                        rejcet("not-allow-cors");
                                    } else {
                                        rejcet(xhr.status);
                                    }
                                }
                            };
                            xhr.open('get', obj.path, true);
                            xhr.send(null);
                        } catch(e) {
                            rejcet(e);
                        }
                    } else {
                        xhr.onerror = function(e) {
                            rejcet("not-allow-cors");
                        };
                        xhr.onload = function() {
                            obj.source = xhr.responseText;
                            setStorage(obj);
                            resolve(obj);
                        };
                        xhr.open('get', obj.path);
                        xhr.send(null);
                    }
                }
            });
        }

    });

    var init = routerJS.init = function(domain) {
        return this;
    };

    init.prototype = routerJS.fn;

    if ( typeof define === "function" && define.amd ) {
        define( "routerjs", [], function() {
            return routerJS;
        });
    }

    var strundefined = typeof undefined;

    if ( typeof noGlobal === strundefined ) {
        window.routerJS = window.RJS = routerJS;
    }

    return routerJS;

}));

/*
* routerJS.org service
*/

var service1 = routerJS('routerjs.org');

service1.config({
    jsPath: '//static.hexindai.com/js/',// Is local.
    cssPath: '//static.routerjs.org/css/',// Is remote, Must set 'Access-Control-Allow-Origin' header.
    tplPath: '/tpl/',// Is local.
    apiPath: '//api.routerjs.org/',// Is remote, Must set 'Access-Control-Allow-Origin' header.
    jsMap: {

        //Libray and plugin
        "jquery": {
            path: "jquery-1.11.1.min.js"
        },
            "jquery.validate": {
                path: "jquery.validate.min.js",
                require: "jquery"
            },
                "jquery.validate.additional": {
                    path: "additional-methods.min.js",
                    require: "jquery.validate"
                },
            "common": {
                path: "common.js",
                require: "jquery"
            },

        "react": "react.min.js",
            "react-dom": {
                path: "react-dom.min.js",
                require: "react"
            },

        //Sub page
        "home": {
            path: "home.js",
            require: ["react-dom", "common"]
        },
        "login": {
            path: "login.js",
            require: ["react-dom", "common", "jquery.validate.additional"]
        },
        "join": {
            path: "join.js",
            require: ["react-dom", "common", "jquery.validate.additional"]
        }

    }
});

service1.set('*', {
    'js': 'common',
    'css': 'common.css'
});
service1.set('/|/index.html', {
    'js': 'home',
    'css': 'home.css',
    'tpl': 'home.tpl',
    'api': ['home/banner', 'home/news']
});
service1.set('/login', {
    'js': 'login',
    'css': 'login.css',
    'tpl': 'login.tpl'
});
service1.set('/join', {
    'js': 'join',
    'css': 'join.css',
    'tpl': 'join.tpl'
});

service1.makeMap();

console.log(routerJS["routerjs.org"]);