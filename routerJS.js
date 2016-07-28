console.time('123');
/*!
 * routerJS
 * http://routerjs.com/
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
    hasOwn = op.hasOwnProperty,
    cssExt = /\.css$/,
    jsExt = /\.js$/,
    thisTimeUse = {},
    queue = {
        libs: [],
        js: []
    };

    var getProto = Object.getPrototypeOf;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call( Object );

    function isRemote(path) {
        var _link_tmp = document.createElement('a');
        _link_tmp.href = path;
        return _link_tmp.hostname != location.hostname;
    }

    function isString(it) {
        return ostring.call(it) === '[object String]';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    function isObject(it) {
        return ostring.call(it) === '[object Object]';
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

    function extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {

                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( isPlainObject( copy ) ||
                        ( copyIsArray = isArray( copy ) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && isArray( src ) ? src : [];

                        } else {
                            clone = src && isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    console.log(extend({}, {a: "b"}));

    function isPlainObject( obj ) {
        var proto, Ctor;

        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if ( !obj || !isObject( obj ) ) {
            return false;
        }

        proto = getProto( obj );

        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if ( !proto ) {
            return true;
        }

        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
        return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
    }

    /**
     * Match matching groups in a regular expression.
     */
    var MATCHING_GROUP_REGEXP = /\((?!\?)/g;

    /**
     * Normalize the given path string,
     * returning a regular expression.
     *
     * An empty array should be passed,
     * which will contain the placeholder
     * key names. For example "/user/:id" will
     * then contain ["id"].
     *
     * @param  {String|RegExp|Array} path
     * @param  {Array} keys
     * @param  {Object} options
     * @return {RegExp}
     * @api private
     */

    function pathtoRegexp(path, keys, options) {
      options = options || {};
      keys = keys || [];
      var strict = options.strict;
      var end = options.end !== false;
      var flags = options.sensitive ? '' : 'i';
      var extraOffset = 0;
      var keysOffset = keys.length;
      var i = 0;
      var name = 0;
      var m;

      if (path instanceof RegExp) {
        while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
          keys.push({
            name: name++,
            optional: false,
            offset: m.index
          });
        }

        return path;
      }

      if (isArray(path)) {
        // Map array parts into regexps and return their source. We also pass
        // the same keys and options instance into every generation to get
        // consistent matching groups before we join the sources together.
        path = path.map(function (value) {
          return pathtoRegexp(value, keys, options).source;
        });

        return new RegExp('(?:' + path.join('|') + ')', flags);
      }

      path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
        .replace(/\/\(/g, '/(?:')
        .replace(/([\/\.])/g, '\\$1')
        .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
          slash = slash || '';
          format = format || '';
          capture = capture || '([^\\/' + format + ']+?)';
          optional = optional || '';

          keys.push({
            name: key,
            optional: !!optional,
            offset: offset + extraOffset
          });

          var result = ''
            + (optional ? '' : slash)
            + '(?:'
            + format + (optional ? slash : '') + capture
            + (star ? '((?:[\\/' + format + '].+?)?)' : '')
            + ')'
            + optional;

          extraOffset += result.length - match.length;

          return result;
        })
        .replace(/\*/g, function (star, index) {
          var len = keys.length

          while (len-- > keysOffset && keys[len].offset > index) {
            keys[len].offset += 3;
          }

          return '(.*)';
        });

      // This is a workaround for handling unnamed matching groups.
      while (m = MATCHING_GROUP_REGEXP.exec(path)) {
        if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
          keys.splice(keysOffset + i, 0, {
            name: name++, // Unnamed matching groups must be consistently linear.
            optional: false,
            offset: m.index
          });
        }

        i++;
      }

      // If the path is non-ending, match until the end or a slash.
      path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));

      return new RegExp(path, flags);
    }

    //One router act on one service(domainname)
    var routerJS = function(domain) {
        if(!domain) {
            domain = host;
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
            this.libs = {};
            this.config = mixin({}, options);
            if(routerJS.history && !window._historyPushState) {
                window._historyPushState = History.prototype.pushState;
                window._historyReplaceState = History.prototype.replaceState;

                History.prototype.pushState = function() {
                    _historyPushState.apply(this, arguments);
                    routerJS.isVirgin = false;
                    routerJS.load();
                };

                History.prototype.replaceState = function() {
                    _historyReplaceState.apply(this, arguments);
                    routerJS.isVirgin = false;
                    routerJS.load();
                };
            }
        },
        set: function(path, options) {
            this.router[path] = options;
        },
        makeMap: function() {
            var jsMap = this.config.jsMap;
            var fileMap = this.fileMap;
            var jsPath = this.config.jsPath || '';
            eachProp(jsMap, function(js, name) {

                fileMap[name] = {
                    name: name,
                    type: 'js'
                };

                var jsName, path;

                if(isObject(js)) {
                    jsName = js.path.replace(jsExt, '');
                    path = jsPath + jsName + '.js';
                    if(js.require) {
                        if(isString(js.require)) {
                            js.require = [js.require];
                        }
                    }
                }

                if(isString(js)) {
                    jsName = js.replace(jsExt, '');
                    path = jsPath + jsName + '.js';
                }

                js.path = path;
                js.isremote = isRemote(path);
                mixin(fileMap[name], js);
            });
        },
        makeThisPage: function() {
            var that = this;
            var pathname = location.pathname;
            var cssList = [];
            var jsList = [];
            var cssPath = this.config.cssPath || '';
            var jsPath = this.config.jsPath || '';
            var router = this.router;
            var fileMap = mixin({}, this.fileMap);

            thisTimeUse = {};
            thisTimeLibs = {};

            eachProp(router, function(route, path) {
                var pathReg = pathtoRegexp(path);
                if(pathReg.exec(pathname)) {
                    eachProp(route, function(files, type) {
                        if(type == "css") {
                            if(isString(files)) {
                               cssList.push(files);
                            }
                            if(isArray(files)) {
                                cssList = cssList.concat(files);
                            }
                        }
                        if(type == "js") {
                            var js = files;
                            var name, path;

                            if(isString(js)) {
                                name = js.replace(jsExt, '');
                                path = jsPath + name + '.js';
                                if(routerJS.loadedJS[name]) {
                                    return;
                                }
                                if(fileMap[name]) {
                                    thisTimeUse[name] = fileMap[name];
                                    return;
                                }
                            }

                            if(isObject(js)) {
                                if(js.when && isFunction(js.when) && !js.when.apply(that)) {
                                    return;
                                }
                                name = js.path.replace(jsExt, '');
                                path = jsPath + name + '.js';
                                if(routerJS.loadedJS[name]) {
                                    return;
                                }
                                if(js.require) {
                                    if(isString(js.require)) {
                                        js.require = [js.require];
                                    }
                                }
                            }

                            thisTimeUse[name] = {
                                name: name,
                                type: 'js'
                            };

                            js.path = path;
                            js.isremote = isRemote(path);
                            
                            mixin(thisTimeUse[name], js);

                        }
                    });
                }
            });

            function reMapping(requireList, childrenName) {
                var that = this;
                each(requireList, function(requireName) {
                    if(routerJS.loadedJS[requireName]) {
                        thisTimeUse[childrenName].require.splice(thisTimeUse[childrenName].require.indexOf(requireName), 1);
                        return;
                    }
                    if(fileMap[requireName].when && isFunction(fileMap[requireName].when) && !fileMap[requireName].when.apply(that)) {
                        thisTimeUse[childrenName].require.splice(thisTimeUse[childrenName].require.indexOf(requireName), 1);
                        return;
                    }
                    if(!thisTimeUse[requireName] && fileMap[requireName]) {
                        thisTimeUse[requireName] = fileMap[requireName];
                        thisTimeUse[requireName].children = [];
                    }
                    thisTimeUse[requireName].children.push(childrenName);
                    if(thisTimeUse[requireName].require && thisTimeUse[requireName].require.length) {
                        reMapping(thisTimeUse[requireName].require, requireName);
                    }
                });
            }

            eachProp(thisTimeUse, function(jsObj, name) {
                if(jsObj.require && jsObj.require.length) {
                    reMapping(jsObj.require, name);
                }
            });

            eachProp(thisTimeUse, function(jsObj, name) {
                if(queue.lib.indexOf(name) != -1 || queue.js.indexOf(name) != -1) {
                    return;
                }
                if(jsObj.lib) {
                    queue.libs.push(name);
                    if(jsObj.require && jsObj.require.length) {
                        each(jsObj.require, function(requireName) {
                            queue.libs.push(requireName);
                        });
                    }
                    return;
                }
                queue.js.push(name);
            });

            if(queue.libs.length) {
                each(queue.libs, function(jsname) {
                    routerJS.push(jsname, function() {
                        each(queue.js, function(jsname) {
                            routerJS.push(jsname);
                        });
                    });
                });
            } else {
                each(queue.js, function(jsname) {
                    routerJS.push(jsname);
                });
            }

            /* Load CSS */
            each(routerJS.loadedCSS, function(loadedCSS) {
                if(cssList.indexOf(loadedCSS) == -1) {
                    head.removeChild(routerJS.loadedCSS[loadedCSS]);
                }
            });
            each(cssList, function(name) {
                var cssName = name.replace(cssExt, '');
                if(!routerJS.loadedCSS[cssName]) {
                    var path = cssPath + cssName + '.css';
                    var cssObj = {
                        path: path,
                        name: cssName,
                        type: 'css',
                        isremote: isRemote(path)
                    };
                    routerJS.get(cssObj, function(obj, error) {
                        if(obj) {
                            routerJS.setStorage(obj);
                            routerJS.loadedCSS[name] = routerJS.createCSS(obj);
                            head.appendChild(routerJS.loadedCSS[cssName]);
                        }
                    });
                }
            });

        },
        run: function() {
            this.makeMap();
            this.load();
        },
        load: function() {
            this.makeThisPage();
        }
    };

    mixin(routerJS, {
        debug: false,

        isVirgin: true,

        history: false,

        loadedCSS: {},
        loadedJS: {},

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

        createCSS: function(obj) {
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
            var name = 'lsI_' + obj.name + '.' + obj.type;
            return !!window.localStorage && localStorage.getItem(name);
        },

        setStorage: function(obj) {
            var name = 'lsI_' + obj.name + '.' + obj.type;
            var data = JSON.stringify(obj);
            return !!window.localStorage && localStorage.setItem(name, data);
        },

        get: function(obj, cb) {
            var _ls_tmp = routerJS.getStrage(obj),
            _data_tmp;
            try{
                _data_tmp = JSON.parse(_ls_tmp);
            } catch(e) {
            }
            if(_data_tmp && _data_tmp.source && _data_tmp.path && (_data_tmp.path == obj.path) && !_data_tmp.error) {
                cb(_data_tmp);
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
                                    cb(obj);
                                } else if(obj.isremote && xhr.status === 0) {
                                    cb(null, "not-allow-cors");
                                } else {
                                    cb(null, xhr.status);
                                }
                            }
                        };
                        xhr.open('get', obj.path, true);
                        xhr.send(null);
                    } catch(e) {
                        cb(null, e);
                    }
                } else {
                    xhr.onerror = function(e) {
                        rejcet("not-allow-cors");
                    };
                    xhr.onload = function() {
                        obj.source = xhr.responseText;
                        cb(obj);
                    };
                    xhr.open('get', obj.path);
                    xhr.send(null);
                }
            }
        },

        push: function(name, cb) {
            routerJS.get(thisTimeUse[name], function(obj, error) {
                if(obj) {
                    routerJS.setStorage(obj);
                    if(obj.require.length) {
                        return;
                    }
                    routerJS.loadedJS[name] = routerJS.createJS(obj);
                    head.appendChild(routerJS.loadedCSS[cssName]);
                    if(thisTimeUse[name].children) {
                        each(thisTimeUse[name].children, function(childrenName) {
                            routerJS.push(childrenName);
                        });
                    }
                    delete thisTimeUse[name];
                    if(cb && isFunction(cb)) {
                        cb();
                    }
                }
            });
        },

        load: function() {
            var domain = location.hostname;
            return routerJS[domain] && routerJS[domain].load();
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


routerJS.history = true;

var service1 = routerJS();

service1.config({
    jsPath: '//static.hexindai.com/lv2/js/',
    cssPath: '//static.hexindai.com/lv2/css/',// Is remote, Must set 'Access-Control-Allow-Origin' header.
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

        "react": "react.min.js",
            "react-dom": {
                path: "react-dom.min.js",
                require: "react"
            },
        //Libs
        "common": {
            path: "common.js",
            lib: true
        },
        //Sub page
        "index": {
            path: "index.js"
        },
        "bids": {
            path: "bids.js",
            when: function() {
                return !routerJS.isVirgin;
            }
        },
        "packages": {
            path: "packages.js",
            when: function() {
                return !routerJS.isVirgin;
            }
        },
        "transferred": {
            path: "transferred.js",
            when: function() {
                return !routerJS.isVirgin;
            }
        }

    },
    cb: function() {
        var pathname = location.pathname;
        if($callbacks[pathname] && $.isFunction($callbacks[pathname])) {
            return $callbacks[pathname]();
        } 
    }
});

service1.set('*', {
    'js': 'common',
    'css': 'common.css'
});
service1.set('/', {
    'js': {
        path:'index',
        require: 'jquery.validate.additional'
    },
    'css': 'index.css'
});
service1.set('/bids|/packages|/transferred', {
    'css': 'invest.css'
});
service1.set('/bids', {
    'js': {
        path: 'invest.js',
        require: 'bids'
    }
});
service1.set('/packages', {
    'js': {
        path: 'invest.js',
        require: 'packages'
    }
});
service1.set('/transferred', {
    'js': {
        path: 'invest.js',
        require: 'transferred'
    }
});
service1.run();

console.log(routerJS["routerjs.org"]);
console.timeEnd('123');
