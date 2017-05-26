"object"==typeof module&&(window.module=module,module=void 0),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var t=this.length>>>0,n=Number(arguments[1])||0;for(n=n<0?Math.ceil(n):Math.floor(n),n<0&&(n+=t);n<t;n++)if(n in this&&this[n]===e)return n;return-1}),Array.prototype.remove||(Array.prototype.remove=function(e){var t=this.indexOf(e);t!==-1&&this.splice(t,1)}),function(){function e(e){var t=document.createElement("a");return t.href=e,t.hostname!=m}function t(e){var t=document.createElement("a");t.href=e;var n=t.pathname;/^\//.exec(n)||(n="/"+n);for(var r=location.pathname.split("/"),o=n.split("/"),i=0,a=Math.max(r.length,o.length),s=1;s<a;s++)r[s]&&o[s]&&r[s]==o[s]&&i++;return C.prevDepth=o.length,C.samePathDepth=i,n!=location.pathname}function n(e){return"[object String]"===v.call(e)}function r(e){return"[object Function]"===v.call(e)}function o(e){return"[object Array]"===v.call(e)}function i(e){return"[object Object]"===v.call(e)}function a(e){return c(s(e))}function s(e){e||(e=location.search);var t={};e=decodeURIComponent(e.substr(1));for(var n=e.split("&"),r=0;r<n.length;r++){var o=n[r].split("=");t[o[0]]=o[1]}return t}function c(e){var t=[];if(!i(e))return t;for(var n in e)t.push(n+"="+e[n]);return t.sort(),t&&(t="?"+t.join("&")),t}function u(e,t){if(e){var n;for(n=0;n<e.length&&(!e[n]||!t(e[n],n,e));n+=1);}}function l(e,t){return S.call(e,t)}function h(e,t){var n;for(n in e)if(l(e,n)&&t(e[n],n))break}function f(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];e=e||{};for(var a=0,s=n.length,c=void 0,u=void 0,l=void 0,h=void 0;a<s;a++)if(c=n[a])for(u in c)l=e[u],h=c[u],l&&l===h||(i(h)?e[u]=f(l&&i(l)?l:{},h):o(h)?e[u]=f([],h):e[u]=h);return e}function p(e,t,n){n=n||{},t=t||[];var r,i=n.strict,a=n.end!==!1,s=n.sensitive?"":"i",c=0,u=t.length,l=0,h=0;if(e instanceof RegExp){for(;r=j.exec(e.source);)t.push({name:h++,optional:!1,offset:r.index});return e}if(o(e))return e=e.map(function(e){return p(e,t,n).source}),new RegExp("(?:"+e.join("|")+")",s);for(e=("^"+e+(i?"":"/"===e[e.length-1]?"?":"/?")).replace(/\/\(/g,"/(?:").replace(/([\/\.])/g,"\\$1").replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(e,n,r,o,i,a,s,u){n=n||"",r=r||"",i=i||"([^\\/"+r+"]+?)",s=s||"",t.push({name:o,optional:!!s,offset:u+c});var l=""+(s?"":n)+"(?:"+r+(s?n:"")+i+(a?"((?:[\\/"+r+"].+?)?)":"")+")"+s;return c+=l.length-e.length,l}).replace(/\*/g,function(e,n){for(var r=t.length;r-- >u&&t[r].offset>n;)t[r].offset+=3;return"(.*)"});r=j.exec(e);)(u+l===t.length||t[u+l].offset>r.index)&&t.splice(u+l,0,{name:h++,optional:!1,offset:r.index}),l++;return e+=a?"$":"/"===e[e.length-1]?"":"(?=\\/|$)",new RegExp(e,s)}var d=document.head||document.getElementsByTagName("head")[0],g=location,m=g.hostname,y=Object.prototype,v=y.toString,S=y.hasOwnProperty,w={css:/\.css([\#\?]{1}.*)?$/,js:/\.js([\#\?]{1}.*)?$/},x={},b=[],j=/\((?!\?)/g,C=function(e){return e||(e=m),l(C,e)||(C[e]=new C.init(e)),C[e]};C.fn=C.prototype={config:function(e){this.router={},this.fileMap={},this.libs={},this.config=f({revSuffix:"-[0-9a-f]{8,10}-?",prefix:C.prefix,thisPage:{}},e),this.config.onStart&&r(this.config.onStart)||(this.config.onStart=function(){}),this.config.revSuffix=new RegExp(this.config.revSuffix);var t=this.config.onStart;return C.history&&!window._historyPushState&&"pushState"in history&&(window._historyPushState=window.History&&History.prototype.pushState||history.pushState,window._historyReplaceState=window.History&&History.prototype.replaceState||history.replaceState,history.pushState=function(e,n,r){return!C.changeUrl(r).hash&&(t(e,n,r),C.changeUrl(r).href?_historyPushState.call(this,e,n,r):_historyReplaceState.call(this,e,n,r),C.load())},history.replaceState=function(e,n,r){return!C.changeUrl(r).hash&&(t(e,n,r),_historyReplaceState.call(this,e,n,r),C.load())},window.addEventListener("popstate",function(e){return!C.changeUrl(C.oldpath).hash&&(t(),C.load())})),this},set:function(e,t){return this.router[e]=t,this},makeItem:function(t,r,i){var a=this.fileMap,s=this,c=this.makeItem,h=this.libs,p=this.config.prefix,d={js:s.config.jsPath,css:s.config.cssPath};if(o(t)){if(i)return C.error("jsMap do not use Array Object.");var g=[];return u(t,function(e){g.push(c.call(s,e,r))}),g}var m=(this.config.jsPath||"",this.config.revSuffix),a=this.fileMap,y={type:r||"js"};if(y.path=t.path||n(t)&&t,y.name=i||t.name||y.path.replace(w[y.type],"").replace(m,""),!y.name)return C.error("not name ");if("js"==y.type&&l(a,y.name))return f({},a[y.name]);y.path=d[y.type]+y.path.replace(w[y.type],"")+"."+y.type,y.isremote=e(y.path);var v=p+y.name+"."+y.type;return h[v]=1,"js"!=r?y:(y.children=[],y.require=n(t.require)&&[t.require]||o(t.require)&&t.require||[],t.when&&(y.when=t.when),void 0!==t.storage&&(y.storage=t.storage),y)},makeMap:function(){var e=this,t=this.config.jsMap,n=this.router,r=this.fileMap,i=this.makeItem;h(t,function(t,n){var o=i.call(e,t);o&&(r[n]=i.call(e,t,"js",n))}),h(n,function(t,n){t.css&&(o(t.css)||(t.css=[t.css]),t.css=i.call(e,t.css,"css")),t.js&&(o(t.js)||(t.js=[t.js]),t.js=i.call(e,t.js,"js"))})},makeThisPage:function(){function e(t,n){return u(t,function(t){l(x,t)||(x[t]=i[t]),l(x[t],"children")||(x[t].children=[]),x[t].children.indexOf(n)==-1&&x[t].children.push(n),l(x[n],"require")||(x[n].require=[]),x[n].require.indexOf(t)==-1&&x[n].require.push(t),b.indexOf(t)==-1&&b.push(t),l(x[t],"require")&&x[t].require.length&&e(x[t].require,t)})}var t=location.pathname.replace(/(.+)\/$/,"$1"),n={},o=(this.config.cssPath||"",this.config.jsPath||"",f({},this.router)),i=f({},this.fileMap);this.config.revSuffix,this.libs,this.config.prefix;this.config.thisPage={};var a=this.config.thisPage;x={},C.thisCbs=[],b=[],C.allReadyed=!1,this.config.cb&&r(this.config.cb)&&C.thisCbs.push(this.config.cb),h(o,function(e,o){var i=p(o);i.exec(t)&&(a=f(a,e),e.cb&&r(e.cb)&&C.thisCbs.push(e.cb),e.css&&u(e.css,function(e){n[e.name]=e}),e.js&&u(e.js,function(e){x[e.name]=e}))}),delete a.css,delete a.js,h(x,function(t,n){b.indexOf(n)==-1&&b.push(n),t.require&&t.require.length&&e(t.require,n)}),0==b.length&&C.thisCbs.length&&u(C.thisCbs,function(e){e()}),h(x,function(e,t){return l(C.loadedJS,t)?(x[t].status="ready",C.push(t),!1):x[t].when&&r(x[t].when)&&!x[t].when()?(x[t].status="ready",C.push(t),!1):void C.get(e,function(e,n){e&&(x[t].source=e.source,x[t].status="loaded"),n&&(x[t].status="pending"),x[t].el=C.createJS(x[t]),C.push(t)})}),h(n,function(e,t){l(C.loadedCSS,t)||C.get(e,function(n,r){C.loadedCSS[t]=C.createCSS(n||e),d.appendChild(C.loadedCSS[t])})})},run:function(){this.makeMap(),this.load()},load:function(){C.isRedirect=t(C.oldpath),C.isVirgin===!0?C.isVirgin=1:C.isVirgin=!1,C.oldpath==location.href&&C.thisCbs.length?u(C.thisCbs,function(e){e()}):(C.oldpath=location.href,this.makeThisPage(),this.clear())},clear:function(){if(C.support.localStorage){var e=this.config.prefix,t=this.libs;h(localStorage,function(n,r){0!=r.indexOf(e)||l(t,r)||localStorage.removeItem(r)})}}},f(C,{support:{textContent:"undefined"!=typeof document.textContent,localStorage:"localStorage"in window},debug:!1,isVirgin:!0,isRedirect:!1,history:!1,storage:!0,allReadyed:!1,loadedCSS:{},loadedJS:{},oldpath:location.href,thisCbs:[],prefix:"routerI_",to:function(e,t){var n=document.createElement("a");return n.href=e,"pushState"in window.history&&location.hostname===n.hostname?t?history.replaceState({},null,e):history.pushState({},null,e):void(window.location.href=e)},error:function(e){throw new Error(e)},changeUrl:function(e,t){var n=document.createElement("a");n.href=e;var r;t?(r=document.createElement("a"),r.href=t):r=location;var o=n.hostname,i=n.pathname,s=n.href,c=n.hash||s.replace(/([^\#]*)/,""),u=(s.replace(c,""),a(n.search)),l=r.hostname,h=r.pathname,f=r.href,p=r.hash||f.replace(/([^\#]*)/,""),d=(f.replace(p,""),a(r.search));return{hostname:!(o==l),href:!(o==l&&i==h&&u==d),hash:o==l&&i==h&&u==d&&c!=p}},createJS:function(e){var t=document.createElement("script");return t.type="text/javascript",e.source?(C.debug&&(t.title=e.name),C.support.textContent?(t.textContent=e.source,t):(t.text=e.source,t)):(t.src=e.path,t)},createCSS:function(e){var t;return e.source?(t=document.createElement("style"),t.type="text/css",C.support.textContent?(t.textContent=e.source,t):(t.styleSheet.cssText=e.source,t)):(t=document.createElement("link"),t.rel="stylesheet",t.type="text/css",t.href=e.path,t)},getStrage:function(e){if(C.support.localStorage){var t=C.prefix+e.name+"."+e.type;return localStorage.getItem(t)}},setStorage:function(e){if(C.support.localStorage){var t=C.prefix+e.name+"."+e.type,n=JSON.stringify(e);return localStorage.setItem(t,n)}},get:function(e,t){if(C.debug||!C.storage&&!e.storage||e.storage===!1)return t(null,"debug");var n,r=C.getStrage(e);try{n=JSON.parse(r)}catch(o){return t(null,o)}if(n&&n.source&&n.path&&n.path==e.path&&!n.error)return t(n);var i,a;e.name;try{i=new XMLHttpRequest}catch(o){}if(e.isremote||i||!window.ActiveXObject||(i=new ActiveXObject("Microsoft.XMLHTTP")),e.isremote&&"undefined"!=typeof XDomainRequest&&(i=new XDomainRequest,a="XDR"),!i)return t(null,"maybe not-allow-cors");if(i)if("XDR"==a)i.timeout=1e4,i.open("get",e.path),i.onprogress=function(){},i.ontimeout=function(){t(null,"timeout")},i.onerror=function(e){t(null,"not-allow-cors")},i.onload=function(){e.source=i.responseText,C.setStorage(e),t(e)},setTimeout(function(){i.send()},0);else try{i.onreadystatechange=function(n){4==i.readyState&&(200==i.status||304==i.status?(e.source=i.responseText,C.setStorage(e),t(e)):e.isremote&&0===i.status?t(null,"not-allow-cors"):t(null,i.status))},i.open("get",e.path,!0),i.send(null)}catch(o){return t(null,o)}},push:function(e,t){var n=x[e];if(n){if(n.require&&n.require.length){var r;if(u(n.require,function(e){l(x,e)&&(r=!0),l(x,e)||n.require.remove(e)}),r&&"ready"!=n.status)return}"ready"==n.status&&C.allReady(n),"loaded"==n.status&&(C.loadedJS[n.name]=1,d.appendChild(n.el),C.allReady(n)),"pending"==n.status&&(n.el.onload=n.el.onreadystatechange=function(e){n.el.readyState&&"loaded"!=n.el.readyState&&"complete"!=n.el.readyState||(C.loadedJS[n.name]=1,C.allReady(n))},d.appendChild(n.el))}},allReady:function(e){var t=f([],e.children);delete x[e.name],b.remove(e.name),t.length&&u(t,function(t){l(x,t)&&(x[t].require.remove(e.name),C.push(t))}),b.length<=0&&C.thisCbs.length&&!C.allReadyed&&(C.allReadyed=!0,u(C.thisCbs,function(e){e()}))},load:function(){return C[m]&&C[m].load()}});var R=C.init=function(e){return this};R.prototype=C.fn,"function"==typeof define&&define.amd&&define("routerjs",[],function(){return C}),window.routerJS=window.RJS=C}();
//# sourceMappingURL=map/routerJS.js.map
