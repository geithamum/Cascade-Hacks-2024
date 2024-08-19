/*! For license information please see extension-worker.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VirtualMachine=t():e.VirtualMachine=t()}(self,(()=>(()=>{var e={"./src/dispatch/shared-dispatch.js":(e,t,n)=>{const o=n("./src/util/log.js");e.exports=class{constructor(){this.callbacks=[],this.nextResponseId=0}call(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return this.transferCall(e,t,null,...o)}transferCall(e,t,n){try{const{provider:s,isRemote:l}=this._getServiceProvider(e);if(s){for(var o=arguments.length,i=new Array(o>3?o-3:0),r=3;r<o;r++)i[r-3]=arguments[r];if(l)return this._remoteTransferCall(s,e,t,n,...i);const a=s[t].apply(s,i);return Promise.resolve(a)}return Promise.reject(new Error("Service not found: ".concat(e)))}catch(e){return Promise.reject(e)}}_isRemoteService(e){return this._getServiceProvider(e).isRemote}_remoteCall(e,t,n){for(var o=arguments.length,i=new Array(o>3?o-3:0),r=3;r<o;r++)i[r-3]=arguments[r];return this._remoteTransferCall(e,t,n,null,...i)}_remoteTransferCall(e,t,n,o){for(var i=arguments.length,r=new Array(i>4?i-4:0),s=4;s<i;s++)r[s-4]=arguments[s];return new Promise(((i,s)=>{const l=this._storeCallbacks(i,s);r.length>0&&"function"==typeof r[r.length-1].yield&&r.pop(),o?e.postMessage({service:t,method:n,responseId:l,args:r},o):e.postMessage({service:t,method:n,responseId:l,args:r})}))}_storeCallbacks(e,t){const n=this.nextResponseId++;return this.callbacks[n]=[e,t],n}_deliverResponse(e,t){try{const[n,o]=this.callbacks[e];delete this.callbacks[e],t.error?o(t.error):n(t.result)}catch(e){o.error("Dispatch callback failed: ".concat(JSON.stringify(e)))}}_onMessage(e,t){const n=t.data;let i;n.args=n.args||[],n.service?i="dispatch"===n.service?this._onDispatchMessage(e,n):this.call(n.service,n.method,...n.args):void 0===n.responseId?o.error("Dispatch caught malformed message from a worker: ".concat(JSON.stringify(t))):this._deliverResponse(n.responseId,n),i&&(void 0===n.responseId?o.error("Dispatch message missing required response ID: ".concat(JSON.stringify(t))):i.then((t=>e.postMessage({responseId:n.responseId,result:t})),(t=>e.postMessage({responseId:n.responseId,error:t}))))}_getServiceProvider(e){throw new Error("Could not get provider for ".concat(e,": _getServiceProvider not implemented"))}_onDispatchMessage(e,t){throw new Error("Unimplemented dispatch message handler cannot handle ".concat(t.method," method"))}}},"./src/dispatch/worker-dispatch.js":(e,t,n)=>{const o=n("./src/dispatch/shared-dispatch.js"),i=n("./src/util/log.js");e.exports=new class extends o{constructor(){super(),this._connectionPromise=new Promise((e=>{this._onConnect=e})),this.services={},this._onMessage=this._onMessage.bind(this,self),"undefined"!=typeof self&&(self.onmessage=this._onMessage)}get waitForConnection(){return this._connectionPromise}setService(e,t){return Object.prototype.hasOwnProperty.call(this.services,e)&&i.warn("Worker dispatch replacing existing service provider for ".concat(e)),this.services[e]=t,this.waitForConnection.then((()=>this._remoteCall(self,"dispatch","setService",e)))}_getServiceProvider(e){const t=this.services[e];return{provider:t||self,isRemote:!t}}_onDispatchMessage(e,t){let n;switch(t.method){case"handshake":n=this._onConnect();break;case"terminate":setTimeout((()=>self.close()),0),n=Promise.resolve();break;default:i.error("Worker dispatch received message for unknown method: ".concat(t.method))}return n}}},"./src/extension-support/argument-type.js":e=>{e.exports={ANGLE:"angle",BOOLEAN:"Boolean",COLOR:"color",NUMBER:"number",STRING:"string",MATRIX:"matrix",NOTE:"note",IMAGE:"image"}},"./src/extension-support/block-type.js":e=>{e.exports={BOOLEAN:"Boolean",BUTTON:"button",COMMAND:"command",CONDITIONAL:"conditional",EVENT:"event",HAT:"hat",LOOP:"loop",REPORTER:"reporter"}},"./src/extension-support/target-type.js":e=>{e.exports={SPRITE:"sprite",STAGE:"stage"}},"./src/util/log.js":(e,t,n)=>{const o=n("./node_modules/minilog/lib/web/index.js");o.enable(),e.exports=o("vm")},"./node_modules/microee/index.js":e=>{function t(){this._events={}}t.prototype={on:function(e,t){this._events||(this._events={});var n=this._events;return(n[e]||(n[e]=[])).push(t),this},removeListener:function(e,t){var n,o=this._events[e]||[];for(n=o.length-1;n>=0&&o[n];n--)o[n]!==t&&o[n].cb!==t||o.splice(n,1)},removeAllListeners:function(e){e?this._events[e]&&(this._events[e]=[]):this._events={}},listeners:function(e){return this._events&&this._events[e]||[]},emit:function(e){this._events||(this._events={});var t,n=Array.prototype.slice.call(arguments,1),o=this._events[e]||[];for(t=o.length-1;t>=0&&o[t];t--)o[t].apply(this,n);return this},when:function(e,t){return this.once(e,t,!0)},once:function(e,t,n){if(!t)return this;function o(){n||this.removeListener(e,o),t.apply(this,arguments)&&n&&this.removeListener(e,o)}return o.cb=t,this.on(e,o),this}},t.mixin=function(e){var n,o=t.prototype;for(n in o)o.hasOwnProperty(n)&&(e.prototype[n]=o[n])},e.exports=t},"./node_modules/minilog/lib/common/filter.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i={debug:1,info:2,warn:3,error:4};function r(){this.enabled=!0,this.defaultResult=!0,this.clear()}function s(e,t){return e.n.test?e.n.test(t):e.n==t}o.mixin(r),r.prototype.allow=function(e,t){return this._white.push({n:e,l:i[t]}),this},r.prototype.deny=function(e,t){return this._black.push({n:e,l:i[t]}),this},r.prototype.clear=function(){return this._white=[],this._black=[],this},r.prototype.test=function(e,t){var n,o=Math.max(this._white.length,this._black.length);for(n=0;n<o;n++){if(this._white[n]&&s(this._white[n],e)&&i[t]>=this._white[n].l)return!0;if(this._black[n]&&s(this._black[n],e)&&i[t]<=this._black[n].l)return!1}return this.defaultResult},r.prototype.write=function(e,t,n){if(!this.enabled||this.test(e,t))return this.emit("item",e,t,n)},e.exports=r},"./node_modules/minilog/lib/common/minilog.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=n("./node_modules/minilog/lib/common/filter.js"),r=new o,s=Array.prototype.slice;(t=e.exports=function(e){var n=function(){return r.write(e,void 0,s.call(arguments)),n};return n.debug=function(){return r.write(e,"debug",s.call(arguments)),n},n.info=function(){return r.write(e,"info",s.call(arguments)),n},n.warn=function(){return r.write(e,"warn",s.call(arguments)),n},n.error=function(){return r.write(e,"error",s.call(arguments)),n},n.log=n.debug,n.suggest=t.suggest,n.format=r.format,n}).defaultBackend=t.defaultFormatter=null,t.pipe=function(e){return r.pipe(e)},t.end=t.unpipe=t.disable=function(e){return r.unpipe(e)},t.Transform=o,t.Filter=i,t.suggest=new i,t.enable=function(){return t.defaultFormatter?r.pipe(t.suggest).pipe(t.defaultFormatter).pipe(t.defaultBackend):r.pipe(t.suggest).pipe(t.defaultBackend)}},"./node_modules/minilog/lib/common/transform.js":(e,t,n)=>{function o(){}n("./node_modules/microee/index.js").mixin(o),o.prototype.write=function(e,t,n){this.emit("item",e,t,n)},o.prototype.end=function(){this.emit("end"),this.removeAllListeners()},o.prototype.pipe=function(e){var t=this;function n(){e.write.apply(e,Array.prototype.slice.call(arguments))}function o(){!e._isStdio&&e.end()}return t.emit("unpipe",e),e.emit("pipe",t),t.on("item",n),t.on("end",o),t.when("unpipe",(function(i){var r=i===e||void 0===i;return r&&(t.removeListener("item",n),t.removeListener("end",o),e.emit("unpipe")),r})),e},o.prototype.unpipe=function(e){return this.emit("unpipe",e),this},o.prototype.format=function(e){throw new Error(["Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:","var Minilog = require('minilog');","Minilog","  .pipe(Minilog.backends.console.formatClean)","  .pipe(Minilog.backends.console);"].join("\n"))},o.mixin=function(e){var t,n=o.prototype;for(t in n)n.hasOwnProperty(t)&&(e.prototype[t]=n[t])},e.exports=o},"./node_modules/minilog/lib/web/array.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=[],r=new o;r.write=function(e,t,n){i.push([e,t,n])},r.get=function(){return i},r.empty=function(){i=[]},e.exports=r},"./node_modules/minilog/lib/web/console.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=/\n+$/,r=new o;r.write=function(e,t,n){var o=n.length-1;if("undefined"!=typeof console&&console.log){if(console.log.apply)return console.log.apply(console,[e,t].concat(n));if(JSON&&JSON.stringify){n[o]&&"string"==typeof n[o]&&(n[o]=n[o].replace(i,""));try{for(o=0;o<n.length;o++)n[o]=JSON.stringify(n[o])}catch(e){}console.log(n.join(" "))}}},r.formatters=["color","minilog"],r.color=n("./node_modules/minilog/lib/web/formatters/color.js"),r.minilog=n("./node_modules/minilog/lib/web/formatters/minilog.js"),e.exports=r},"./node_modules/minilog/lib/web/formatters/color.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=n("./node_modules/minilog/lib/web/formatters/util.js"),r={debug:["cyan"],info:["purple"],warn:["yellow",!0],error:["red",!0]},s=new o;s.write=function(e,t,n){console.log,console[t]&&console[t].apply&&console[t].apply(console,["%c"+e+" %c"+t,i("gray"),i.apply(i,r[t])].concat(n))},s.pipe=function(){},e.exports=s},"./node_modules/minilog/lib/web/formatters/minilog.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=n("./node_modules/minilog/lib/web/formatters/util.js"),r={debug:["gray"],info:["purple"],warn:["yellow",!0],error:["red",!0]},s=new o;s.write=function(e,t,n){var o=console.log;"debug"!=t&&console[t]&&(o=console[t]);var s=0;if("info"!=t){for(;s<n.length&&"string"==typeof n[s];s++);o.apply(console,["%c"+e+" "+n.slice(0,s).join(" "),i.apply(i,r[t])].concat(n.slice(s)))}else o.apply(console,["%c"+e,i.apply(i,r[t])].concat(n))},s.pipe=function(){},e.exports=s},"./node_modules/minilog/lib/web/formatters/util.js":e=>{var t={black:"#000",red:"#c23621",green:"#25bc26",yellow:"#bbbb00",blue:"#492ee1",magenta:"#d338d3",cyan:"#33bbc8",gray:"#808080",purple:"#708"};e.exports=function(e,n){return n?"color: #fff; background: "+t[e]+";":"color: "+t[e]+";"}},"./node_modules/minilog/lib/web/index.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/minilog.js"),i=o.enable,r=o.disable,s="undefined"!=typeof navigator&&/chrome/i.test(navigator.userAgent),l=n("./node_modules/minilog/lib/web/console.js");if(o.defaultBackend=s?l.minilog:l,"undefined"!=typeof window){try{o.enable(JSON.parse(window.localStorage.minilogSettings))}catch(e){}if(window.location&&window.location.search){var a=RegExp("[?&]minilog=([^&]*)").exec(window.location.search);a&&o.enable(decodeURIComponent(a[1]))}}o.enable=function(){i.call(o,!0);try{window.localStorage.minilogSettings=JSON.stringify(!0)}catch(e){}return this},o.disable=function(){r.call(o);try{delete window.localStorage.minilogSettings}catch(e){}return this},(e.exports=o).backends={array:n("./node_modules/minilog/lib/web/array.js"),browser:o.defaultBackend,localStorage:n("./node_modules/minilog/lib/web/localstorage.js"),jQuery:n("./node_modules/minilog/lib/web/jquery_simple.js")}},"./node_modules/minilog/lib/web/jquery_simple.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=(new Date).valueOf().toString(36);function r(e){this.url=e.url||"",this.cache=[],this.timer=null,this.interval=e.interval||3e4,this.enabled=!0,this.jQuery=window.jQuery,this.extras={}}o.mixin(r),r.prototype.write=function(e,t,n){this.timer||this.init(),this.cache.push([e,t].concat(n))},r.prototype.init=function(){if(this.enabled&&this.jQuery){var e=this;this.timer=setTimeout((function(){var t,n,o=[],r=e.url;if(0==e.cache.length)return e.init();for(t=0;t<e.cache.length;t++)try{JSON.stringify(e.cache[t]),o.push(e.cache[t])}catch(e){}e.jQuery.isEmptyObject(e.extras)?(n=JSON.stringify({logs:o}),r=e.url+"?client_id="+i):n=JSON.stringify(e.jQuery.extend({logs:o},e.extras)),e.jQuery.ajax(r,{type:"POST",cache:!1,processData:!1,data:n,contentType:"application/json",timeout:1e4}).success((function(t,n,o){t.interval&&(e.interval=Math.max(1e3,t.interval))})).error((function(){e.interval=3e4})).always((function(){e.init()})),e.cache=[]}),this.interval)}},r.prototype.end=function(){},r.jQueryWait=function(e){if("undefined"!=typeof window&&(window.jQuery||window.$))return e(window.jQuery||window.$);"undefined"!=typeof window&&setTimeout((function(){r.jQueryWait(e)}),200)},e.exports=r},"./node_modules/minilog/lib/web/localstorage.js":(e,t,n)=>{var o=n("./node_modules/minilog/lib/common/transform.js"),i=!1,r=new o;r.write=function(e,t,n){if("undefined"!=typeof window&&"undefined"!=typeof JSON&&JSON.stringify&&JSON.parse)try{i||(i=window.localStorage.minilog?JSON.parse(window.localStorage.minilog):[]),i.push([(new Date).toString(),e,t,n]),window.localStorage.minilog=JSON.stringify(i)}catch(e){}},e.exports=r}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();const o=n("./src/extension-support/argument-type.js"),i=n("./src/extension-support/block-type.js"),r=n("./src/dispatch/worker-dispatch.js"),s=n("./src/extension-support/target-type.js");n.g.Scratch=n.g.Scratch||{},n.g.Scratch.ArgumentType=o,n.g.Scratch.BlockType=i,n.g.Scratch.TargetType=s;const l=new class{constructor(){this.nextExtensionId=0,this.initialRegistrations=[],r.waitForConnection.then((()=>{r.call("extensions","allocateWorker").then((e=>{const[t,n]=e;this.workerId=t;try{importScripts(n);const e=this.initialRegistrations;this.initialRegistrations=null,Promise.all(e).then((()=>r.call("extensions","onWorkerInit",t)))}catch(e){r.call("extensions","onWorkerInit",t,e)}}))})),this.extensions=[]}register(e){const t=this.nextExtensionId++;this.extensions.push(e);const n="extension.".concat(this.workerId,".").concat(t),o=r.setService(n,e).then((()=>r.call("extensions","registerExtensionService",n)));return this.initialRegistrations&&this.initialRegistrations.push(o),o}};return n.g.Scratch.extensions={register:l.register.bind(l)},{}})()));