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
if (typeof module === 'object') {
  window.module = module;
  module = undefined;
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt /*, from*/ ) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ?
      Math.ceil(from) :
      Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++) {
      if (from in this &&
        this[from] === elt)
        return from;
    }
    return -1;
  };
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function(item) {
    var i = this.indexOf(item);
    if (i === -1) {
      return;
    }
    this.splice(i, 1);
  };
}

(function() {
  var head = document.head || document.getElementsByTagName('head')[0],
    local = location,
    host = local.hostname,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    ext = {
      css: /\.css([\#\?]{1}.*)?$/,
      js: /\.js([\#\?]{1}.*)?$/
    },
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
    var _link_pathname = _link_tmp.pathname;
    if (!/^\//.exec(_link_pathname)) {
      _link_pathname = '/' + _link_pathname;
    }
    var local_path_ary = location.pathname.split('/');
    var link_path_ary = _link_pathname.split('/');
    var samePathDepth = 0;
    var samePathDepth_max = Math.max(local_path_ary.length, link_path_ary.length);
    for (var i = 1; i < samePathDepth_max; i++) {
      if (local_path_ary[i] && link_path_ary[i] && local_path_ary[i] == link_path_ary[i]) {
        samePathDepth++;
      }
    }
    routerJS.prevDepth = link_path_ary.length;
    routerJS.samePathDepth = samePathDepth;
    return _link_pathname != location.pathname;
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
    if (!search) {
      search = location.search;
    }
    var param = {};
    if (!search) {
      return param;
    }
    search = search.substr(1);
    var param_list = search.split('&');
    for (var i = 0; i < param_list.length; i++) {
      var param_i = param_list[i].split('=');
      param[param_i[0]] = decodeURIComponent(param_i[1]);
    }
    return param;
  }

  function param2search(param) {
    var search = [];
    if (!isObject(param)) {
      return search;
    }
    for (var key in param) {
      search.push(key + '=' + param[key]);
    }
    search.sort();
    if (search) {
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
      path = path.map(function(value) {
        return pathtoRegexp(value, keys, options).source;
      });

      return new RegExp('(?:' + path.join('|') + ')', flags);
    }

    path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
      .replace(/\/\(/g, '/(?:')
      .replace(/([\/\.])/g, '\\$1')
      .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function(match, slash, format, key, capture, star, optional, offset) {
        slash = slash || '';
        format = format || '';
        capture = capture || '([^\\/' + format + ']+?)';
        optional = optional || '';

        keys.push({
          name: key,
          optional: !!optional,
          offset: offset + extraOffset
        });

        var result = '' +
          (optional ? '' : slash) +
          '(?:' +
          format + (optional ? slash : '') + capture +
          (star ? '((?:[\\/' + format + '].+?)?)' : '') +
          ')' +
          optional;

        extraOffset += result.length - match.length;

        return result;
      })
      .replace(/\*/g, function(star, index) {
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
    if (!domain) {
      domain = host;
    }
    if (!hasProp(routerJS, domain)) {
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
        prefix: routerJS.prefix,
        thisPage: {}
      }, options);
      if (!this.config.onStart || !isFunction(this.config.onStart)) {
        this.config.onStart = function() {};
      }
      this.config.revSuffix = new RegExp(this.config.revSuffix);
      var onStartFun = this.config.onStart;

      if (routerJS.history && !window._historyPushState && ('pushState' in history)) {
        window._historyPushState = (window.History && History.prototype.pushState) || history.pushState;
        window._historyReplaceState = (window.History && History.prototype.replaceState) || history.replaceState;

        var pushState = function(state, title, url) {
          if (routerJS.changeUrl(url).hash) {
            return false;
          }
          onStartFun(state, title, url);
          if (routerJS.changeUrl(url).href) {
            _historyPushState.call(this, state, title, url);
          } else {
            _historyReplaceState.call(this, state, title, url);
          }
          return routerJS.load();
        };

        var replaceState = function(state, title, url) {
          if (routerJS.changeUrl(url).hash) {
            return false;
          }
          onStartFun(state, title, url);
          _historyReplaceState.call(this, state, title, url);
          return routerJS.load();
        };

        History.prototype && (History.prototype.pushState = pushState);
        history.pushState && (history.pushState = pushState);
        History.prototype && (History.prototype.replaceState = replaceState);
        history.pushState && (history.replaceState = replaceState);

        window.addEventListener("popstate", function(e) {
          if (routerJS.changeUrl(routerJS.oldpath).hash) {
            return false;
          }
          onStartFun();
          return routerJS.load();
        });
      }
      return this;
    },
    set: function(path, options) {
      this.router[path] = options;
      return this;
    },
    makeItem: function(jsObj, type, name) {
      var fileMap = this.fileMap;
      var that = this;
      var makeItem = this.makeItem;
      var libs = this.libs;
      var prefix = this.config.prefix;
      var paths = {
        js: that.config.jsPath,
        css: that.config.cssPath
      };

      if (isArray(jsObj)) {
        if (name) {
          return routerJS.error('jsMap do not use Array Object.');
        }
        var jsObjs = [];
        each(jsObj, function(jsItem) {
          jsObjs.push(makeItem.call(that, jsItem, type));
        });
        return jsObjs;
      }
      var jsPath = this.config.jsPath || '';
      var revSuffix = this.config.revSuffix;
      var fileMap = this.fileMap;
      var new_jsObj = {
        type: type || 'js'
      };
      new_jsObj.path = jsObj.path || (isString(jsObj) && jsObj);
      new_jsObj.name = name || jsObj.name || new_jsObj.path.replace(ext[new_jsObj.type], '').replace(revSuffix, '');

      if (!new_jsObj.name) {
        return routerJS.error('not name ');
      }

      if (new_jsObj.type == 'js' && hasProp(fileMap, new_jsObj.name)) {
        return extend({}, fileMap[new_jsObj.name]);
      }

      new_jsObj.path = paths[new_jsObj.type] + new_jsObj.path.replace(ext[new_jsObj.type], '') + '.' + new_jsObj.type;
      new_jsObj.isremote = isRemote(new_jsObj.path);
      var libName = prefix + new_jsObj.name + '.' + new_jsObj.type;
      libs[libName] = 1;
      if (type != 'js') {
        return new_jsObj;
      }
      new_jsObj.children = [];
      new_jsObj.require = (isString(jsObj.require) && [jsObj.require]) || (isArray(jsObj.require) && jsObj.require) || [];
      if (jsObj.when) {
        new_jsObj.when = jsObj.when;
      }
      if (jsObj.storage !== undefined) {
        new_jsObj.storage = jsObj.storage;
      }
      return new_jsObj;
    },
    makeMap: function() {
      var that = this;
      var jsMap = this.config.jsMap;
      var router = this.router;
      var fileMap = this.fileMap;
      var makeItem = this.makeItem;

      eachProp(jsMap, function(jsObj, name) {
        var new_jsObj = makeItem.call(that, jsObj);
        new_jsObj && (fileMap[name] = makeItem.call(that, jsObj, 'js', name));
      });
      eachProp(router, function(route, path) {
        if (route.css) {
          if (!isArray(route.css)) {
            route.css = [route.css];
          }
          route.css = makeItem.call(that, route.css, 'css');
        }
        if (route.js) {
          if (!isArray(route.js)) {
            route.js = [route.js];
          }
          route.js = makeItem.call(that, route.js, 'js');
        }
      });
    },
    makeThisPage: function() {
      var pathname = location.pathname.replace(/(.+)\/$/, "$1");
      var cssList = {};
      var cssPath = this.config.cssPath || '';
      var jsPath = this.config.jsPath || '';
      var router = extend({}, this.router);
      var fileMap = extend({}, this.fileMap);
      var revSuffix = this.config.revSuffix;
      var libs = this.libs;
      var prefix = this.config.prefix;
      var thisRoute = {};

      thisTimeUse = {};
      routerJS.thisCbs = [];
      queue = [];
      routerJS.allReadyed = false;

      if (this.config.cb && isFunction(this.config.cb)) {
        routerJS.thisCbs.push(this.config.cb);
      }

      eachProp(router, function(route, path) {

        var pathReg = pathtoRegexp(path);

        if (!pathReg.exec(pathname)) {
          return;
        }

        thisRoute = extend(thisRoute, route);

        if (route.cb && isFunction(route.cb)) {
          routerJS.thisCbs.push(route.cb);
        }

        route.css && (each(route.css, function(cssObj) {
          cssList[cssObj.name] = cssObj;
        }));

        route.js && (each(route.js, function(jsObj) {
          thisTimeUse[jsObj.name] = jsObj;
        }));

      });

      routerJS.thisPage = this.config.thisPage = thisRoute;

      delete thisRoute.css;
      delete thisRoute.js;

      function reMapping(requireList, childrenName) {
        return each(requireList, function(requireName) {
          if (!hasProp(thisTimeUse, requireName)) {
            thisTimeUse[requireName] = fileMap[requireName];
          }
          if (!hasProp(thisTimeUse[requireName], 'children')) {
            thisTimeUse[requireName].children = [];
          }
          if (thisTimeUse[requireName].children.indexOf(childrenName) == -1) {
            thisTimeUse[requireName].children.push(childrenName);
          }
          if (!hasProp(thisTimeUse[childrenName], 'require')) {
            thisTimeUse[childrenName].require = [];
          }
          if (thisTimeUse[childrenName].require.indexOf(requireName) == -1) {
            thisTimeUse[childrenName].require.push(requireName);
          }
          if (queue.indexOf(requireName) == -1) {
            queue.push(requireName);
          }
          if (hasProp(thisTimeUse[requireName], 'require') && thisTimeUse[requireName].require.length) {
            reMapping(thisTimeUse[requireName].require, requireName);
          }
        });
      }

      eachProp(thisTimeUse, function(jsObj, name) {
        if (queue.indexOf(name) == -1) {
          queue.push(name);
        }
        if (jsObj.require && jsObj.require.length) {
          reMapping(jsObj.require, name);
        }
      });

      if (queue.length == 0 && routerJS.thisCbs.length) {
        each(routerJS.thisCbs, function(cb) {
          cb();
        });
      }

      eachProp(thisTimeUse, function(jsObj, name) {

        if (hasProp(routerJS.loadedJS, name)) {
          thisTimeUse[name].status = 'ready';
          routerJS.push(name);
          return false;
        }

        if (thisTimeUse[name].when && isFunction(thisTimeUse[name].when) && !thisTimeUse[name].when()) {
          thisTimeUse[name].status = 'ready';
          routerJS.push(name);
          return false;
        }
        routerJS.get(jsObj, function(obj, error) {
          if (obj) {
            thisTimeUse[name].source = obj.source;
            thisTimeUse[name].status = 'loaded';
          }
          if (error) {
            thisTimeUse[name].status = 'pending';
          }
          thisTimeUse[name].el = routerJS.createJS(thisTimeUse[name]);
          routerJS.push(name);
        });
      });

      /* Load CSS */
      /*eachProp(routerJS.loadedCSS, function(loadedCSS, name) {
          if(!hasProp(cssList, name)) {
              head.removeChild(loadedCSS);
              delete routerJS.loadedCSS[name];
          }
      });*/
      eachProp(cssList, function(cssObj, name) {
        if (!hasProp(routerJS.loadedCSS, name)) {
          routerJS.get(cssObj, function(obj, error) {
            routerJS.loadedCSS[name] = routerJS.createCSS(obj || cssObj);
            head.appendChild(routerJS.loadedCSS[name]);
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
      if (routerJS.isVirgin === true) {
        routerJS.isVirgin = 1;
      } else {
        routerJS.isVirgin = false;
      }
      if (routerJS.oldpath == location.href && routerJS.thisCbs.length) {
        each(routerJS.thisCbs, function(cb) {
          cb();
        });
      } else {
        routerJS.oldpath = location.href;
        this.makeThisPage();
        this.clear();
      }
    },
    clear: function() {
      if (!routerJS.support.localStorage) {
        return;
      }
      var prefix = this.config.prefix;
      var libs = this.libs;
      eachProp(localStorage, function(storage, name) {
        if (name.indexOf(prefix) == 0 && !hasProp(libs, name)) {
          localStorage.removeItem(name);
        }
      });
    }
  };

  extend(routerJS, {
    support: {
      textContent: typeof document.textContent !== 'undefined',
      localStorage: ('localStorage' in window)
    },
    debug: false,
    isVirgin: true,
    isRedirect: false,
    history: false,
    storage: true,
    allReadyed: false,

    loadedCSS: {},
    loadedJS: {},

    oldpath: location.href,
    thisCbs: [],

    prefix: 'routerI_',

    to: function(url, force) {
      var url_tmp = document.createElement('a');
      url_tmp.href = url;
      if ('pushState' in window.history && location.hostname === url_tmp.hostname) {
        if (force) {
          return history.replaceState({}, null, url);
        }
        return history.pushState({}, null, url);
      }
      window.location.href = url;
    },

    error: function(msg) {
      throw new Error(msg);
    },

    changeUrl: function(url1, url2) {
      var tmp_a1 = document.createElement('a');
      tmp_a1.href = url1;
      var tmp_a2;
      if (!url2) {
        tmp_a2 = location;
      } else {
        tmp_a2 = document.createElement('a');
        tmp_a2.href = url2;
      }

      var host = tmp_a1.hostname;
      var path = tmp_a1.pathname;
      var href = tmp_a1.href;
      var hash = tmp_a1.hash || href.replace(/([^\#]*)/, ""); //.replace(/^#(.*)$/, "$1");
      var nohash_href = href.replace(hash, '');
      var search = formatSearch(tmp_a1.search);

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
      if (obj.source) {
        if (routerJS.debug) {
          element.title = obj.name;
        }
        if (routerJS.support.textContent) {
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
      if (obj.source) {
        element = document.createElement('style');
        element.type = 'text/css';
        if (routerJS.support.textContent) {
          element.textContent = obj.source;
          return element;
        }
        element.styleSheet.cssText = obj.source;
        return element;
      }
      element = document.createElement('link');
      element.rel = 'stylesheet';
      element.type = 'text/css';
      element.href = obj.path;
      return element;
    },

    getStorage: function(obj) {
      if (!routerJS.support.localStorage) {
        return;
      }
      var name = routerJS.prefix + obj.name + '.' + obj.type;
      return localStorage.getItem(name);
    },

    setStorage: function(obj) {
      if (!routerJS.support.localStorage) {
        return;
      }
      var name = routerJS.prefix + obj.name + '.' + obj.type;
      var data = JSON.stringify(obj);
      return localStorage.setItem(name, data);
    },

    get: function(obj, cb) {
      if (routerJS.debug || (!routerJS.storage && !obj.storage) || obj.storage === false || routerJS.thisPage.storage === false) {
        if (obj.storage === false || routerJS.thisPage.storage === false) {
          var name = routerJS.prefix + obj.name + '.' + obj.type;
          if (localStorage.hasOwnProperty(name)) {
            localStorage.removeItem(name);
          }
        }
        return cb(null, 'debug');
      }
      var _ls_tmp = routerJS.getStorage(obj),
        _data_tmp;
      try {
        _data_tmp = JSON.parse(_ls_tmp);
      } catch (e) {
        return cb(null, e);
      }

      if (_data_tmp && _data_tmp.source && _data_tmp.path && (_data_tmp.path == obj.path) && !_data_tmp.error) {
        return cb(_data_tmp);
      }

      var xhr, xtype, data_tmp, name = obj.name;

      try {
        xhr = new XMLHttpRequest();
      } catch (e) {}

      if (!obj.isremote && !xhr && window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      if (obj.isremote && typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xtype = 'XDR';
      }

      if (!xhr) {
        return cb(null, 'maybe not-allow-cors');
      }

      if (xhr) {
        if (xtype == 'XDR') {
          xhr.timeout = 10000;
          xhr.open('get', obj.path);
          xhr.onprogress = function() {};
          xhr.ontimeout = function() {
            cb(null, "timeout");
          };
          xhr.onerror = function(e) {
            cb(null, "not-allow-cors");
          };
          xhr.onload = function() {
            obj.source = xhr.responseText;
            routerJS.setStorage(obj);
            cb(obj);
          };
          setTimeout(function() {
            xhr.send();
          }, 0);
        } else {
          try { //Firefox 3.0
            xhr.onreadystatechange = function(e) {
              if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                  obj.source = xhr.responseText;
                  routerJS.setStorage(obj);
                  cb(obj);
                } else if (obj.isremote && xhr.status === 0) {
                  cb(null, "not-allow-cors");
                } else {
                  cb(null, xhr.status);
                }
              }
            };
            xhr.open('get', obj.path, true);
            xhr.send(null);
          } catch (e) {
            return cb(null, e);
          }
        }
      }
    },

    push: function(name, cb) {
      var jsObj = thisTimeUse[name];
      if (!jsObj) {
        return;
      }
      if (jsObj.require && jsObj.require.length) {
        var hasRequires;
        each(jsObj.require, function(requireNmae) {
          if (hasProp(thisTimeUse, requireNmae)) {
            hasRequires = true;
          }
          if (!hasProp(thisTimeUse, requireNmae)) {
            jsObj.require.remove(requireNmae);
          }
        });
        if (!!hasRequires && jsObj.status != 'ready') {
          return;
        }
      }
      if (jsObj.status == 'ready') {
        routerJS.allReady(jsObj);
      }
      if (jsObj.status == 'loaded') {
        routerJS.loadedJS[jsObj.name] = 1;
        head.appendChild(jsObj.el);
        routerJS.allReady(jsObj);
      }
      if (jsObj.status == 'pending') {
        jsObj.el.onload = jsObj.el.onreadystatechange = function(e) {
          if (!jsObj.el.readyState || jsObj.el.readyState == "loaded" || jsObj.el.readyState == "complete") {
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
      if (childrens.length) {
        each(childrens, function(childrenName) {
          if (hasProp(thisTimeUse, childrenName)) {
            thisTimeUse[childrenName].require.remove(jsObj.name);
            routerJS.push(childrenName);
          }
        });
      }
      if (queue.length <= 0 && routerJS.thisCbs.length && !routerJS.allReadyed) {
        routerJS.allReadyed = true;
        each(routerJS.thisCbs, function(cb) {
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

  if (typeof define === "function" && define.amd) {
    define("routerjs", [], function() {
      return routerJS;
    });
  }

  window.routerJS = window.RJS = routerJS;

})();