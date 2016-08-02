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

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

if(!Array.prototype.remove) {
    Array.prototype.remove = function(item) {
        var i = this.indexOf(item);
        if(i === -1) {
            return;
        }
        this.splice(i, 1);
    };
}

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
    var head = document.head || document.getElementsByTagName('head')[0],
    local = location,
    host = local.hostname,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    cssExt = /\.css$/,
    jsExt = /\.js$/,
    thisTimeUse = {},
    queue = [];

    function isRemote(path) {
        var _link_tmp = document.createElement('a');
        _link_tmp.href = path;
        return _link_tmp.hostname != host;
    }

    function isRedirect(path) {
        var _link_tmp = document.createElement('a');
        _link_tmp.href = path;
        return _link_tmp.pathname != location.pathname;
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

    function formatSearch(search) {
        return param2search(search2param(search));
    }

    function search2param(search) {
        if(!search) {
            search = location.search;
        }
        var param = {};
        search = decodeURIComponent(search.substr(1));
        var param_list = search.split('&');
        for(var i=0;i<param_list.length;i++) {
            var param_i = param_list[i].split('=');
            param[param_i[0]] = param_i[1];
        }
        return param;
    }

    function param2search(param) {
        var search = [];
        if(!isObject(param)) {
            return search;
        }
        for(var key in param) {
            search.push(key + '=' + param[key]);
        }
        search.sort();
        if(search) {
            search = '?' + search.join('&');
        }
        return search;
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
    function extend(target) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
        }

        target = target || {};
        var i = 0,
          length = args.length,
          options = undefined,
          name = undefined,
          src = undefined,
          copy = undefined;
        for (; i < length; i++) {
        options = args[i];
        if (!options) {
          continue;
        }
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (src && src === copy) {
            continue;
          }
          if (isObject(copy)) {
            target[name] = extend(src && isObject(src) ? src : {}, copy);
          } else if (isArray(copy)) {
            target[name] = extend([], copy);
          } else {
            target[name] = copy;
          }
        }
        }
        return target;
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
            this.config = extend({
                revSuffix: '-[0-9a-f]{8,10}-?',
                prefix: routerJS.prefix
            }, options);
            if(!this.config.onStart || !isFunction(this.config.onStart)) {
                this.config.onStart = function() {};
            }
            this.config.revSuffix = new RegExp(this.config.revSuffix);
            var onStartFun = this.config.onStart;

            if(routerJS.history && !window._historyPushState && ('pushState' in history)) {
                window._historyPushState = History.prototype.pushState;
                window._historyReplaceState = History.prototype.replaceState;

                History.prototype.pushState = function(state, title, url) {
                    if(routerJS.changeUrl(location.href, url).hash) {
                        return false;
                    }
                    onStartFun(state, title, url);
                    _historyPushState.call(this, state, title, url);
                    return routerJS.load();
                };

                History.prototype.replaceState = function(state, title, url) {
                    if(routerJS.changeUrl(location.href, url).hash) {
                        return false;
                    }
                    onStartFun(state, title, url);
                    _historyReplaceState.call(this, state, title, url);
                    return routerJS.load();
                };

                window.addEventListener("popstate", function(e) {
                    if(routerJS.changeUrl(location.href, routerJS.oldpath).hash) {
                        return false;
                    }
                    onStartFun();
                    return routerJS.load();
                });
            }
        },
        set: function(path, options) {
            this.router[path] = options;
        },
        makeMap: function() {
            var jsMap = this.config.jsMap;
            var fileMap = this.fileMap;
            var jsPath = this.config.jsPath || '';
            var revSuffix = this.config.revSuffix;
            var libs = this.libs;
            var prefix = this.config.prefix;

            eachProp(jsMap, function(js, name) {

                var libName = prefix + name + '.js';

                libs[libName] = 1;

                fileMap[name] = {
                    name: name,
                    type: 'js'
                };

                var path;

                if(isObject(js)) {
                    path = jsPath + js.path.replace(jsExt, '') + '.js';
                    if(js.require) {
                        if(isString(js.require)) {
                            js.require = [js.require];
                        }
                    }
                }

                if(!js.require) {
                    js.require = [];
                }

                each(js.require, function(lib) {
                    var lib_name = prefix + lib + '.js';
                    libs[lib_name] = 1;
                });

                js.children = [];

                if(isString(js)) {
                    path = jsPath + js.replace(cssExt, '').replace(revSuffix, '') + '.js';
                }

                js.path = path;
                js.isremote = isRemote(path);
                extend(fileMap[name], js);
            });
        },
        makeThisPage: function() {
            var pathname = location.pathname;
            var cssList = {};
            var cssPath = this.config.cssPath || '';
            var jsPath = this.config.jsPath || '';
            var router = extend({}, this.router);
            var fileMap = this.fileMap;
            var revSuffix = this.config.revSuffix;
            var libs = this.libs;
            var prefix = this.config.prefix;

            thisTimeUse = {};
            thisCbs = [];
            queue = [];
            routerJS.allReadyed = false;

            if(this.config.cb && isFunction(this.config.cb)) {
                thisCbs.push(this.config.cb);
            }

            eachProp(router, function(route, path) {
                if(route.js) {
                    if(isString(route.js)) {
                        var jslib = prefix + route.js.replace(jsExt, '').replace(revSuffix, '') + '.js';
                        libs[jslib] = 1;
                    }
                    if(route.js.path) {
                        if(isString(route.js.path)) {
                            var jslib = prefix + route.js.path.replace(jsExt, '').replace(revSuffix, '') + '.js';
                            libs[jslib] = 1;
                        }
                        if(isArray(route.js.path)) {
                            each(route.js.path, function(jsname) {
                                var jslib = prefix + jsname.replace(jsExt, '').replace(revSuffix, '') + '.js';
                                libs[jslib] = 1;
                            });
                        }
                    }
                }
                if(route.css) {
                    if(isString(route.css)) {
                        var csslib = prefix + route.css.replace(cssExt, '').replace(revSuffix, '') + '.css';
                        libs[csslib] = 1;
                    }
                    if(isArray(route.css)) {
                        each(route.css, function(cssname) {
                            var csslib = prefix + cssname.replace(cssExt, '').replace(revSuffix, '') + '.css';
                            libs[csslib] = 1;
                        });
                    }
                }

                var pathReg = pathtoRegexp(path);
                if(!pathReg.exec(pathname)) {
                    return;
                }
                if(route.cb && isFunction(route.cb)) {
                    thisCbs.push(route.cb);
                }

                if(route.css) {

                    if(isString(route.css)) {
                        var name = route.css.replace(cssExt, '').replace(revSuffix, '');
                        var path = cssPath + route.css;
                        cssList[name] = {
                            name: name,
                            path: path,
                            type: 'css',
                            isremote: isRemote(path),
                            children: [],
                            require: []
                        };
                    }

                    if(isArray(route.css)) {
                        each(route.css, function(path) {
                            var name = path.replace(cssExt, '').replace(revSuffix, '');
                            var path = cssPath + path;
                            cssList[name] = {
                                name: name,
                                path: path,
                                type: 'css',
                                isremote: isRemote(path),
                                children: [],
                                require: []
                            };
                        });
                    }

                }

                if(route.js) {
                    if(isString(route.js)) {
                        if(fileMap[route.js]) {
                            thisTimeUse[route.js] = fileMap[route.js];
                            return;
                        }
                        var name = route.js.replace(jsExt, '').replace(revSuffix, '');
                        var path = jsPath + route.js;
                        var isremote = isRemote(path);
                        thisTimeUse[name] = {
                            name: name,
                            path: path,
                            type: 'js',
                            isremote: isremote,
                            children: [],
                            require: []
                        };
                        return;
                    }
                    if(isArray(route.js)) {
                        each(route.js, function(jsObj) {
                            if(fileMap[jsObj]) {
                                thisTimeUse[jsObj] = fileMap[files];
                                return;
                            }
                            var name = jsObj.replace(jsExt, '').replace(revSuffix, '');
                            var path = jsPath + jsObj;
                            var isremote = isRemote(path);
                            thisTimeUse[name] = {
                                name: name,
                                path: path,
                                type: 'js',
                                isremote: isremote,
                                children: [],
                                require: []
                            };
                        });
                    }

                    if(isObject(route.js)) {
                        var name = route.js.name || route.js.path.replace(jsExt, '').replace(revSuffix, '');
                        var path = jsPath + route.js.path;
                        var isremote = isRemote(path);
                        var require = [];
                        if(route.js.require) {
                            if(isString(route.js.require)) {
                                require = [route.js.require];
                            }
                            if(isArray(route.js.require)) {
                                require = route.js.require;
                            }
                        }
                        thisTimeUse[name] = {
                            name: name,
                            path: path,
                            type: 'js',
                            isremote: isremote,
                            children: [],
                            require: require
                        };
                    }

                }
            });

            function reMapping(requireList, childrenName) {
                return each(requireList, function(requireName) {
                    if(!hasProp(thisTimeUse, requireName)) {
                        thisTimeUse[requireName] = fileMap[requireName];
                    }
                    if(!thisTimeUse[requireName].children) {
                        thisTimeUse[requireName].children = [];
                    }
                    if(thisTimeUse[requireName].children.indexOf(childrenName) == -1) {
                        thisTimeUse[requireName].children.push(childrenName);
                    }
                    if(!thisTimeUse[childrenName].require) {
                        thisTimeUse[childrenName].require = [];
                    }
                    if(thisTimeUse[childrenName].require.indexOf(requireName) == -1) {
                        thisTimeUse[childrenName].require.push(requireName);
                    }
                    if(queue.indexOf(requireName) == -1) {
                        queue.push(requireName);
                    }
                    if(thisTimeUse[requireName].require && thisTimeUse[requireName].require.length) {
                        reMapping(thisTimeUse[requireName].require, requireName);
                    }
                });
            }

            eachProp(thisTimeUse, function(jsObj, name) {
                if(queue.indexOf(name) == -1) {
                    queue.push(name);
                }
                if(jsObj.require && jsObj.require.length) {
                    reMapping(jsObj.require, name);
                }
            });

            if(queue.length == 0 && thisCbs.length) {
                each(thisCbs, function(cb) {
                    cb();
                });
            }

            eachProp(thisTimeUse, function(jsObj, name) {

                if(routerJS.loadedJS[name]) {
                    thisTimeUse[name].status = 'ready';
                    routerJS.push(name);
                    return false;
                }

                if(thisTimeUse[name].when && isFunction(thisTimeUse[name].when) && !thisTimeUse[name].when()) {
                    thisTimeUse[name].status = 'ready';
                    routerJS.push(name);
                    return false;
                }
                routerJS.get(jsObj, function(obj, error) {
                    if(obj) {
                        thisTimeUse[name].source = obj.source;
                        thisTimeUse[name].status = 'loaded';
                    }
                    if(error) {
                        thisTimeUse[name].status = 'pending';
                    }
                    thisTimeUse[name].el = routerJS.createJS(thisTimeUse[name]);
                    routerJS.push(name);
                });
            });

            /* Load CSS */
            each(routerJS.loadedCSS, function(loadedCSS) {
                if(cssList.indexOf(loadedCSS) == -1) {
                    head.removeChild(routerJS.loadedCSS[loadedCSS]);
                }
            });
            eachProp(cssList, function(cssObj, name) {
                if(!routerJS.loadedCSS[name]) {
                    routerJS.get(cssObj, function(obj, error) {
                        if(obj) {
                            routerJS.loadedCSS[name] = routerJS.createCSS(obj);
                            head.appendChild(routerJS.loadedCSS[name]);
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
            routerJS.isRedirect = isRedirect(routerJS.oldpath);
            if(routerJS.isVirgin === true) {
                routerJS.isVirgin = 1;
            } else {
                routerJS.isVirgin = false;
            }
            routerJS.oldpath = location.href;
            this.makeThisPage();
            this.clear();
        },
        clear: function() {
            var prefix = this.config.prefix;
            var libs = this.libs;
            !!window.localStorage && eachProp(localStorage, function(storage, name) {
                if(name.indexOf(prefix) == 0 && !libs[name]) {
                    localStorage.removeItem(name);
                }
            });
        }
    };

    extend(routerJS, {
        debug: false,
        isVirgin: true,
        isRedirect: false,
        history: false,
        allReadyed: false,

        loadedCSS: {},
        loadedJS: {},

        oldpath: location.href,

        prefix: 'routerI_',

        error: function(msg) {
            throw new Error( msg );
        },

        changeUrl: function(url1, url2) {
            var tmp_a1 = document.createElement('a');
            tmp_a1.href = url1;
            var tmp_a2 = document.createElement('a');
            tmp_a2.href = url2;

            var host = tmp_a1.hostname;
            var path = tmp_a1.pathname;
            var href = tmp_a1.href;
            var hash = tmp_a1.hash || href.replace(/([^\#]*)/, "");//.replace(/^#(.*)$/, "$1");
            var nohash_href = href.replace(hash, '');
            var search = formatSearch(this.search);

            var local_host = tmp_a2.hostname;
            var local_path = tmp_a2.pathname;
            var local_href = tmp_a2.href;
            var local_hash = tmp_a2.hash || local_href.replace(/([^\#]*)/, "");
            var local_nohash_href = local_href.replace(local_hash, '');
            var local_search = formatSearch(tmp_a2.search);
            return {
                hostname: !(host == local_host),
                href: !(host == local_host && path == local_path && search == local_search),
                hash: (host == local_host && path == local_path && search == local_search && hash != local_hash)
            };
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
                element = document.createElement('style');
                element.type = 'text/css';
                if(typeof document.textContent == 'object') {
                    element.textContent = obj.source;
                    return element;
                }
                element.styleSheet.cssText = obj.source;
                return element;
            }
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = obj.url;
            return element;
        },

        getStrage: function(obj) {
            var name = routerJS.prefix + obj.name + '.' + obj.type;
            return !!window.localStorage && localStorage.getItem(name);
        },

        setStorage: function(obj) {
            var name = routerJS.prefix + obj.name + '.' + obj.type;
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
                return cb(_data_tmp);
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
                                    routerJS.setStorage(obj);
                                    return cb(obj);
                                } else if(obj.isremote && xhr.status === 0) {
                                    return cb(null, "not-allow-cors");
                                } else {
                                    return cb(null, xhr.status);
                                }
                            }
                        };
                        xhr.open('get', obj.path, true);
                        xhr.send(null);
                    } catch(e) {
                        return cb(null, e);
                    }
                } else {
                    xhr.onerror = function(e) {
                        return cb(null, "not-allow-cors");
                    };
                    xhr.onload = function() {
                        obj.source = xhr.responseText;
                        routerJS.setStorage(obj);
                        return cb(obj);
                    };
                    xhr.open('get', obj.path);
                    xhr.send(null);
                }
            }
        },

        push: function(name, cb) {
            var jsObj = thisTimeUse[name];
            if(jsObj.require && jsObj.require.length) {
                var hasRequires;
                each(jsObj.require, function(requireNmae) {
                    if(thisTimeUse[requireNmae]) {
                        hasRequires = true;
                    }
                    if(!thisTimeUse[requireNmae]) {
                        jsObj.require.remove(requireNmae);
                    }
                });
                if(!!hasRequires && jsObj.status != 'ready') {
                    return;
                }
            }
            if(jsObj.status == 'ready') {
                routerJS.allReady(jsObj);
            }
            if(jsObj.status == 'loaded') {
                routerJS.loadedJS[jsObj.name] = 1;
                head.appendChild(jsObj.el);
                routerJS.allReady(jsObj);
            }
            if(jsObj.status == 'pending') {
                jsObj.el.onload = jsObj.el.onreadystatechange = function(e) {
                    if(!jsObj.el.el.readyState || jsObj.el.el.readyState == "loaded" || jsObj.el.el.readyState == "complete") {
                        routerJS.loadedJS[jsObj.name] = 1;
                        routerJS.allReady(jsObj);
                    }
                };
                head.appendChild(jsObj.el);
            }
        },

        allReady: function(jsObj) {
            var childrens = extend([], jsObj.children);
            delete thisTimeUse[jsObj.name];
            queue.remove(jsObj.name);
            if(childrens.length) {
                each(childrens, function(childrenName) {
                    if(thisTimeUse[childrenName]) {
                        thisTimeUse[childrenName].require.remove(jsObj.name);
                        routerJS.push(childrenName);
                    }
                });
            }
            if(queue.length <= 0 && thisCbs.length && !routerJS.allReadyed) {
                routerJS.allReadyed = true;
                each(thisCbs, function(cb) {
                    cb();
                });
            }
        },

        load: function() {
            return routerJS[host] && routerJS[host].load();
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