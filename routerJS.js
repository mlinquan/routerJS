"object"==typeof module&&(window.module=module,module=void 0),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var t=this.length>>>0,r=Number(arguments[1])||0;for(r=r<0?Math.ceil(r):Math.floor(r),r<0&&(r+=t);r<t;r++)if(r in this&&this[r]===e)return r;return-1}),Array.prototype.remove||(Array.prototype.remove=function(e){var t=this.indexOf(e);t!==-1&&this.splice(t,1)}),function(){function e(e){var t=document.createElement("a");return t.href=e,t.hostname!=m}function t(e){var t=document.createElement("a");t.href=e;var r=t.pathname;/^\//.exec(r)||(r="/"+r);for(var n=location.pathname.split("/"),o=r.split("/"),i=0,a=Math.max(n.length,o.length),s=1;s<a;s++)n[s]&&o[s]&&n[s]==o[s]&&i++;return C.prevDepth=o.length,C.samePathDepth=i,r!=location.pathname}function r(e){return"[object String]"===S.call(e)}function n(e){return"[object Function]"===S.call(e)}function o(e){return"[object Array]"===S.call(e)}function i(e){return"[object Object]"===S.call(e)}function a(e){return c(s(e))}function s(e){e||(e=location.search);var t={};if(!e)return t;e=e.substr(1);for(var r=e.split("&"),n=0;n<r.length;n++){var o=r[n].split("=");t[o[0]]=decodeURIComponent(o[1])}return t}function c(e){var t=[];if(!i(e))return t;for(var r in e)t.push(r+"="+e[r]);return t.sort(),t&&(t="?"+t.join("&")),t}function u(e,t){if(e){var r;for(r=0;r<e.length&&(!e[r]||!t(e[r],r,e));r+=1);}}function h(e,t){return v.call(e,t)}function l(e,t){var r;for(r in e)if(h(e,r)&&t(e[r],r))break}function f(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];e=e||{};for(var a=0,s=r.length,c=void 0,u=void 0,h=void 0,l=void 0;a<s;a++)if(c=r[a])for(u in c)h=e[u],l=c[u],h&&h===l||(i(l)?e[u]=f(h&&i(h)?h:{},l):o(l)?e[u]=f([],l):e[u]=l);return e}function p(e,t,r){r=r||{},t=t||[];var n,i=r.strict,a=r.end!==!1,s=r.sensitive?"":"i",c=0,u=t.length,h=0,l=0;if(e instanceof RegExp){for(;n=j.exec(e.source);)t.push({name:l++,optional:!1,offset:n.index});return e}if(o(e))return e=e.map(function(e){return p(e,t,r).source}),new RegExp("(?:"+e.join("|")+")",s);for(e=("^"+e+(i?"":"/"===e[e.length-1]?"?":"/?")).replace(/\/\(/g,"/(?:").replace(/([\/\.])/g,"\\$1").replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(e,r,n,o,i,a,s,u){r=r||"",n=n||"",i=i||"([^\\/"+n+"]+?)",s=s||"",t.push({name:o,optional:!!s,offset:u+c});var h=""+(s?"":r)+"(?:"+n+(s?r:"")+i+(a?"((?:[\\/"+n+"].+?)?)":"")+")"+s;return c+=h.length-e.length,h}).replace(/\*/g,function(e,r){for(var n=t.length;n-- >u&&t[n].offset>r;)t[n].offset+=3;return"(.*)"});n=j.exec(e);)(u+h===t.length||t[u+h].offset>n.index)&&t.splice(u+h,0,{name:l++,optional:!1,offset:n.index}),h++;return e+=a?"$":"/"===e[e.length-1]?"":"(?=\\/|$)",new RegExp(e,s)}var d=document.head||document.getElementsByTagName("head")[0],g=location,m=g.hostname,y=Object.prototype,S=y.toString,v=y.hasOwnProperty,w={css:/\.css([\#\?]{1}.*)?$/,js:/\.js([\#\?]{1}.*)?$/},x={},b=[],j=/\((?!\?)/g,C=function(e){return e||(e=m),h(C,e)||(C[e]=new C.init(e)),C[e]};C.fn=C.prototype={config:function(e){this.router={},this.fileMap={},this.libs={},this.config=f({revSuffix:"-[0-9a-f]{8,10}-?",prefix:C.prefix,thisPage:{}},e),this.config.onStart&&n(this.config.onStart)||(this.config.onStart=function(){}),this.config.revSuffix=new RegExp(this.config.revSuffix);var t=this.config.onStart;if(C.history&&!window._historyPushState&&"pushState"in history){window._historyPushState=window.History&&History.prototype.pushState||history.pushState,window._historyReplaceState=window.History&&History.prototype.replaceState||history.replaceState;var r=function(e,r,n){return!C.changeUrl(n).hash&&(t(e,r,n),C.changeUrl(n).href?_historyPushState.call(this,e,r,n):_historyReplaceState.call(this,e,r,n),C.load())},o=function(e,r,n){return!C.changeUrl(n).hash&&(t(e,r,n),_historyReplaceState.call(this,e,r,n),C.load())};History.prototype&&(History.prototype.pushState=r),history.pushState&&(history.pushState=r),History.prototype&&(History.prototype.replaceState=o),history.pushState&&(history.replaceState=o),window.addEventListener("popstate",function(e){return!C.changeUrl(C.oldpath).hash&&(t(),C.load())})}return this},set:function(e,t){return this.router[e]=t,this},makeItem:function(t,n,i){var a=this.fileMap,s=this,c=this.makeItem,l=this.libs,p=this.config.prefix,d={js:s.config.jsPath,css:s.config.cssPath};if(o(t)){if(i)return C.error("jsMap do not use Array Object.");var g=[];return u(t,function(e){g.push(c.call(s,e,n))}),g}var m=(this.config.jsPath||"",this.config.revSuffix),a=this.fileMap,y={type:n||"js"};if(y.path=t.path||r(t)&&t,y.name=i||t.name||y.path.replace(w[y.type],"").replace(m,""),!y.name)return C.error("not name ");if("js"==y.type&&h(a,y.name))return f({},a[y.name]);y.path=d[y.type]+y.path.replace(w[y.type],"")+"."+y.type,y.isremote=e(y.path);var S=p+y.name+"."+y.type;return l[S]=1,"js"!=n?y:(y.children=[],y.require=r(t.require)&&[t.require]||o(t.require)&&t.require||[],t.when&&(y.when=t.when),void 0!==t.storage&&(y.storage=t.storage),y)},makeMap:function(){var e=this,t=this.config.jsMap,r=this.router,n=this.fileMap,i=this.makeItem;l(t,function(t,r){var o=i.call(e,t);o&&(n[r]=i.call(e,t,"js",r))}),l(r,function(t,r){t.css&&(o(t.css)||(t.css=[t.css]),t.css=i.call(e,t.css,"css")),t.js&&(o(t.js)||(t.js=[t.js]),t.js=i.call(e,t.js,"js"))})},makeThisPage:function(){function e(t,r){return u(t,function(t){h(x,t)||(x[t]=i[t]),h(x[t],"children")||(x[t].children=[]),x[t].children.indexOf(r)==-1&&x[t].children.push(r),h(x[r],"require")||(x[r].require=[]),x[r].require.indexOf(t)==-1&&x[r].require.push(t),b.indexOf(t)==-1&&b.push(t),h(x[t],"require")&&x[t].require.length&&e(x[t].require,t)})}var t=location.pathname.replace(/(.+)\/$/,"$1"),r={},o=(this.config.cssPath||"",this.config.jsPath||"",f({},this.router)),i=f({},this.fileMap),a=(this.config.revSuffix,this.libs,this.config.prefix,{});x={},C.thisCbs=[],b=[],C.allReadyed=!1,this.config.cb&&n(this.config.cb)&&C.thisCbs.push(this.config.cb),l(o,function(e,o){var i=p(o);i.exec(t)&&(a=f(a,e),e.cb&&n(e.cb)&&C.thisCbs.push(e.cb),e.css&&u(e.css,function(e){r[e.name]=e}),e.js&&u(e.js,function(e){x[e.name]=e}))}),C.thisPage=this.config.thisPage=a,delete a.css,delete a.js,l(x,function(t,r){b.indexOf(r)==-1&&b.push(r),t.require&&t.require.length&&e(t.require,r)}),0==b.length&&C.thisCbs.length&&u(C.thisCbs,function(e){e()}),l(x,function(e,t){return h(C.loadedJS,t)?(x[t].status="ready",C.push(t),!1):x[t].when&&n(x[t].when)&&!x[t].when()?(x[t].status="ready",C.push(t),!1):void C.get(e,function(e,r){e&&(x[t].source=e.source,x[t].status="loaded"),r&&(x[t].status="pending"),x[t].el=C.createJS(x[t]),C.push(t)})}),l(r,function(e,t){h(C.loadedCSS,t)||C.get(e,function(r,n){C.loadedCSS[t]=C.createCSS(r||e),d.appendChild(C.loadedCSS[t])})})},run:function(){this.makeMap(),this.load()},load:function(){C.isRedirect=t(C.oldpath),C.isVirgin===!0?C.isVirgin=1:C.isVirgin=!1,C.oldpath==location.href&&C.thisCbs.length?u(C.thisCbs,function(e){e()}):(C.oldpath=location.href,this.makeThisPage(),this.clear())},clear:function(){if(C.support.localStorage){var e=this.config.prefix,t=this.libs;l(localStorage,function(r,n){0!=n.indexOf(e)||h(t,n)||localStorage.removeItem(n)})}}},f(C,{support:{textContent:"undefined"!=typeof document.textContent,localStorage:"localStorage"in window},debug:!1,isVirgin:!0,isRedirect:!1,history:!1,storage:!0,allReadyed:!1,loadedCSS:{},loadedJS:{},oldpath:location.href,thisCbs:[],prefix:"routerI_",to:function(e,t){var r=document.createElement("a");return r.href=e,"pushState"in window.history&&location.hostname===r.hostname?t?history.replaceState({},null,e):history.pushState({},null,e):void(window.location.href=e)},error:function(e){throw new Error(e)},changeUrl:function(e,t){var r=document.createElement("a");r.href=e;var n;t?(n=document.createElement("a"),n.href=t):n=location;var o=r.hostname,i=r.pathname,s=r.href,c=r.hash||s.replace(/([^\#]*)/,""),u=(s.replace(c,""),a(r.search)),h=n.hostname,l=n.pathname,f=n.href,p=n.hash||f.replace(/([^\#]*)/,""),d=(f.replace(p,""),a(n.search));return{hostname:!(o==h),href:!(o==h&&i==l&&u==d),hash:o==h&&i==l&&u==d&&c!=p}},createJS:function(e){var t=document.createElement("script");return t.type="text/javascript",e.source?(C.debug&&(t.title=e.name),C.support.textContent?(t.textContent=e.source,t):(t.text=e.source,t)):(t.src=e.path,t)},createCSS:function(e){var t;return e.source?(t=document.createElement("style"),t.type="text/css",C.support.textContent?(t.textContent=e.source,t):(t.styleSheet.cssText=e.source,t)):(t=document.createElement("link"),t.rel="stylesheet",t.type="text/css",t.href=e.path,t)},getStorage:function(e){if(C.support.localStorage){var t=C.prefix+e.name+"."+e.type;return localStorage.getItem(t)}},setStorage:function(e){if(C.support.localStorage){var t=C.prefix+e.name+"."+e.type,r=JSON.stringify(e);return localStorage.setItem(t,r)}},get:function(e,t){if(C.debug||!C.storage&&!e.storage||e.storage===!1||C.thisPage.storage===!1){if(e.storage===!1||C.thisPage.storage===!1){var r=C.prefix+e.name+"."+e.type;localStorage.hasOwnProperty(r)&&localStorage.removeItem(r)}return t(null,"debug")}var n,o=C.getStorage(e);try{n=JSON.parse(o)}catch(i){return t(null,i)}if(n&&n.source&&n.path&&n.path==e.path&&!n.error)return t(n);var a,s,r=e.name;try{a=new XMLHttpRequest}catch(i){}if(e.isremote||a||!window.ActiveXObject||(a=new ActiveXObject("Microsoft.XMLHTTP")),e.isremote&&"undefined"!=typeof XDomainRequest&&(a=new XDomainRequest,s="XDR"),!a)return t(null,"maybe not-allow-cors");if(a)if("XDR"==s)a.timeout=1e4,a.open("get",e.path),a.onprogress=function(){},a.ontimeout=function(){t(null,"timeout")},a.onerror=function(e){t(null,"not-allow-cors")},a.onload=function(){e.source=a.responseText,C.setStorage(e),t(e)},setTimeout(function(){a.send()},0);else try{a.onreadystatechange=function(r){4==a.readyState&&(200==a.status||304==a.status?(e.source=a.responseText,C.setStorage(e),t(e)):e.isremote&&0===a.status?t(null,"not-allow-cors"):t(null,a.status))},a.open("get",e.path,!0),a.send(null)}catch(i){return t(null,i)}},push:function(e,t){var r=x[e];if(r){if(r.require&&r.require.length){var n;if(u(r.require,function(e){h(x,e)&&(n=!0),h(x,e)||r.require.remove(e)}),n&&"ready"!=r.status)return}"ready"==r.status&&C.allReady(r),"loaded"==r.status&&(C.loadedJS[r.name]=1,d.appendChild(r.el),C.allReady(r)),"pending"==r.status&&(r.el.onload=r.el.onreadystatechange=function(e){r.el.readyState&&"loaded"!=r.el.readyState&&"complete"!=r.el.readyState||(C.loadedJS[r.name]=1,C.allReady(r))},d.appendChild(r.el))}},allReady:function(e){var t=f([],e.children);delete x[e.name],b.remove(e.name),t.length&&u(t,function(t){h(x,t)&&(x[t].require.remove(e.name),C.push(t))}),b.length<=0&&C.thisCbs.length&&!C.allReadyed&&(C.allReadyed=!0,u(C.thisCbs,function(e){e()}))},load:function(){return C[m]&&C[m].load()}});var R=C.init=function(e){return this};R.prototype=C.fn,"function"==typeof define&&define.amd&&define("routerjs",[],function(){return C}),window.routerJS=window.RJS=C}();
//# sourceMappingURL=map/routerJS.js.map
