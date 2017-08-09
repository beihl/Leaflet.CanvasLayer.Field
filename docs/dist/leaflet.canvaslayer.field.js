!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=11)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=function(){function t(e,n,r){i(this,t),this.center=e,this.value=n,this.size=r}return r(t,[{key:"equals",value:function(t){return this.center.equals(t.center)&&this._equalValues(this.value,t.value)&&this.size===t.size}},{key:"_equalValues",value:function(t,e){var n=t.constructor.name;return{Number:t===e,Vector:t.u===e.u&&t.v===e.v}[n]}},{key:"getBounds",value:function(){var t=this.size/2,e=this.center.lat,n=this.center.lng,i=L.latLng([e+t,n-t]),r=L.latLng([e-t,n+t]);return L.latLngBounds(L.latLng(r.lat,i.lng),L.latLng(i.lat,r.lng))}}]),t}();e.a=o},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n(0),o=function(){function t(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(e){i(this,t),this.params=e,this.nCols=e.nCols,this.nRows=e.nRows,this.width=e.nCols,this.height=e.nRows,this.xllCorner=e.xllCorner,this.yllCorner=e.yllCorner,this.xurCorner=e.xllCorner+e.nCols*e.cellSize,this.yurCorner=e.yllCorner+e.nRows*e.cellSize,this.cellSize=e.cellSize,this.grid=null,this.isContinuous=this.xurCorner-this.xllCorner>=360,this.longitudeNeedsToBeWrapped=this.xurCorner>180,this._inFilter=null}return a(t,[{key:"_buildGrid",value:function(){throw new TypeError("Must be overriden")}},{key:"_updateRange",value:function(){this.range=this._calculateRange()}},{key:"numCells",value:function(){return this.nRows*this.nCols}},{key:"getCells",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=[],n=0;n<this.nRows;n+=t)for(var i=0;i<this.nCols;i+=t){var a=this._lonLatAtIndexes(i,n),s=o(a,2),l=s[0],u=s[1],h=L.latLng(u,l),c=this._valueAtIndexes(i,n),f=new r.a(h,c,this.cellSize);e.push(f)}return e}},{key:"setFilter",value:function(t){this._inFilter=t,this._updateRange()}},{key:"extent",value:function(){var t=this._getWrappedLongitudes(),e=o(t,2),n=e[0],i=e[1];return[n,this.yllCorner,i,this.yurCorner]}},{key:"_getWrappedLongitudes",value:function(){var t=this.xllCorner,e=this.xurCorner;return this.longitudeNeedsToBeWrapped&&(this.isContinuous?(t=-180,e=180):(e=this.xurCorner-360,t=this.xllCorner-360)),[t,e]}},{key:"contains",value:function(t,e){var n=this._getWrappedLongitudes(),i=o(n,2),r=i[0],a=i[1],s=t>=r&&t<=a,l=e>=this.yllCorner&&e<=this.yurCorner;return s&&l}},{key:"notContains",value:function(t,e){return!this.contains(t,e)}},{key:"interpolatedValueAt",value:function(t,e){if(this.notContains(t,e))return null;var n=this._getDecimalIndexes(t,e),i=o(n,2),r=i[0],a=i[1];return this.interpolatedValueAtIndexes(r,a)}},{key:"interpolatedValueAtIndexes",value:function(t,e){var n=this._getFourSurroundingIndexes(t,e),i=o(n,4),r=i[0],a=i[1],s=i[2],l=i[3],u=this._getFourSurroundingValues(r,a,s,l);if(u){var h=o(u,4),c=h[0],f=h[1],d=h[2],v=h[3];return this._doInterpolation(t-r,e-s,c,f,d,v)}return null}},{key:"_getDecimalIndexes",value:function(t,e){this.longitudeNeedsToBeWrapped&&t<0&&(t+=360);var n=(t-this.xllCorner)/this.cellSize,i=this._clampColumnIndex(n),r=(this.yurCorner-e)/this.cellSize;return[i,this._clampRowIndex(r)]}},{key:"_getFourSurroundingIndexes",value:function(t,e){var n=this._clampColumnIndex(Math.floor(t)),i=this._clampColumnIndex(n+1),r=this._clampRowIndex(Math.floor(e));return[n,i,r,this._clampRowIndex(r+1)]}},{key:"_getFourSurroundingValues",value:function(t,e,n,i){var r;if(r=this.grid[n]){var o=r[t],a=r[e];if(this._isValid(o)&&this._isValid(a)&&(r=this.grid[i])){var s=r[t],l=r[e];if(this._isValid(s)&&this._isValid(l))return[o,a,s,l]}}return null}},{key:"valueAt",value:function(t,e){if(this.notContains(t,e))return null;var n=this._getDecimalIndexes(t,e),i=o(n,2),r=i[0],a=i[1],s=Math.floor(r),l=Math.floor(a),u=this._valueAtIndexes(s,l);return this._inFilter&&!this._inFilter(u)?null:u}},{key:"hasValueAt",value:function(t,e){var n=this.valueAt(t,e),i=null!==n,r=!0;return this._inFilter&&(r=this._inFilter(n)),i&&r}},{key:"notHasValueAt",value:function(t,e){return!this.hasValueAt(t,e)}},{key:"randomPosition",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Math.random()*this.nCols|0,n=Math.random()*this.nRows|0;return t.x=this._longitudeAtX(e),t.y=this._latitudeAtY(n),t}},{key:"_valueAtIndexes",value:function(t,e){return this.grid[e][t]}},{key:"_lonLatAtIndexes",value:function(t,e){return[this._longitudeAtX(t),this._latitudeAtY(e)]}},{key:"_longitudeAtX",value:function(t){var e=this.cellSize/2,n=this.xllCorner+e+t*this.cellSize;return this.longitudeNeedsToBeWrapped&&(n=n>180?n-360:n),n}},{key:"_latitudeAtY",value:function(t){var e=this.cellSize/2;return this.yurCorner-e-t*this.cellSize}},{key:"_doInterpolation",value:function(t,e,n,i,r,o){throw new TypeError("Must be overriden")}},{key:"_clampColumnIndex",value:function(t){var e=t;t<0&&(e=0);var n=this.nCols-1;return t>n&&(e=this.isContinuous?0:n),e}},{key:"_clampRowIndex",value:function(t){var e=t;t<0&&(e=0);var n=this.nRows-1;return t>n&&(e=n),e}},{key:"_isValid",value:function(t){return null!==t&&void 0!==t}}]),t}();e.a=s},function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=n(1),l=function(){function t(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),h=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.zs=t.zs,n.grid=n._buildGrid(),n._updateRange(),n}return a(e,t),u(e,null,[{key:"fromASCIIGrid",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=t.split("\n");e._checkIsValidASCIIGridHeader(r);for(var o=/-?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/,a={nCols:parseInt(r[0].match(o)),nRows:parseInt(r[1].match(o)),xllCorner:parseFloat(r[2].match(o)),yllCorner:parseFloat(r[3].match(o)),cellSize:parseFloat(r[4].match(o))},s=r[5].toUpperCase().replace("NODATA_VALUE","").trim(),l=[],u=6;u<r.length;u++){var h=r[u].trim();if(""===h)break;var c=h.split(" "),f=c.map(function(t){return t!==s?parseFloat(t*n):null});l.push.apply(l,i(f))}return a.zs=l,new e(a)}},{key:"_checkIsValidASCIIGridHeader",value:function(t){var e=t.map(function(t){return t.toUpperCase()}),n=["NCOLS","NROWS","XLLCORNER","YLLCORNER","CELLSIZE","NODATA_VALUE"],i=0,r=!0,o=!1,a=void 0;try{for(var s,l=n[Symbol.iterator]();!(r=(s=l.next()).done);r=!0){var u=s.value,h=e[i];if(!(-1!=h.indexOf(u)))throw"Not valid ASCIIGrid: expected '"+u+"' at line '"+h+"' [lin. nº "+i+"]";i++}}catch(t){o=!0,a=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw a}}}},{key:"fromGeoTIFF",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=GeoTIFF.parse(t),r=i.getImage(),o=r.readRasters(),a=r.getTiePoints()[0],s=r.getFileDirectory(),u=s.ModelPixelScale,h=l(u,2),c=h[0],f=h[1];c!==f&&(console.warn("GeoTIFF with different scale in x: "+c+" y: "+f+" is not currently supported"),console.warn("Make sure the difference is just a floating precission issue"));var d=o[n];if(s.GDAL_NODATA){var v=parseFloat(s.GDAL_NODATA);d=Array.from(d).map(function(t){return t===v?null:t})}return new e({nCols:r.getWidth(),nRows:r.getHeight(),xllCorner:a.x,yllCorner:a.y-r.getHeight()*u[0],cellSize:u[0],zs:d})}}]),u(e,[{key:"_buildGrid",value:function(){return this._arrayTo2d(this.zs,this.nRows,this.nCols)}},{key:"_arrayTo2d",value:function(t,e,n){for(var i=[],r=0,o=0;o<e;o++){for(var a=[],s=0;s<n;s++,r++){var l=t[r];a[s]=this._isValid(l)?l:null}i[o]=a}return i}},{key:"_newDataArrays",value:function(t){t.zs=[]}},{key:"_pushValueToArrays",value:function(t,e){t.zs.push(e)}},{key:"_makeNewFrom",value:function(t){return new e(t)}},{key:"_calculateRange",value:function(){var t=this.zs;return this._inFilter&&(t=t.filter(this._inFilter)),[d3.min(t),d3.max(t)]}},{key:"_doInterpolation",value:function(t,e,n,i,r,o){var a=1-t,s=1-e;return n*a*s+i*t*s+r*a*e+o*t*e}}]),e}(s.a);e.a=h},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=function(){function t(e,n){i(this,t),this.u=e,this.v=n}return r(t,[{key:"magnitude",value:function(){return Math.sqrt(this.u*this.u+this.v*this.v)}},{key:"directionTo",value:function(){var t=Math.atan2(this.u,this.v),e=t*(180/Math.PI);return e<0&&(e+=360),e}},{key:"directionFrom",value:function(){return(this.directionTo()+180)%360}}]),t}();e.a=o},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=n(3),s=n(1),l=n(2),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),h=function(t){function e(t){i(this,e);var n=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.us=t.us,n.vs=t.vs,n.grid=n._buildGrid(),n.range=n._calculateRange(),n}return o(e,t),u(e,null,[{key:"fromASCIIGrids",value:function(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=l.a.fromASCIIGrid(t,i),o=l.a.fromASCIIGrid(n,i);return new e(e._paramsFromScalarFields(r,o))}},{key:"fromGeoTIFFs",value:function(t,n){var i=l.a.fromGeoTIFF(t),r=l.a.fromGeoTIFF(n);return new e(e._paramsFromScalarFields(i,r))}},{key:"fromMultibandGeoTIFF",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[0,1],i=l.a.fromGeoTIFF(t,n[0]),r=l.a.fromGeoTIFF(t,n[1]);return new e(e._paramsFromScalarFields(i,r))}},{key:"_paramsFromScalarFields",value:function(t,e){return{nCols:t.nCols,nRows:t.nRows,xllCorner:t.xllCorner,yllCorner:t.yllCorner,cellSize:t.cellSize,us:t.zs,vs:e.zs}}}]),u(e,[{key:"getScalarField",value:function(t){var e=this._getFunctionFor(t),n={nCols:this.params.nCols,nRows:this.params.nRows,xllCorner:this.params.xllCorner,yllCorner:this.params.yllCorner,cellSize:this.params.cellSize,zs:this._applyOnField(e)};return new l.a(n)}},{key:"_getFunctionFor",value:function(t){return function(e,n){return new a.a(e,n)[t]()}}},{key:"_applyOnField",value:function(t){for(var e=[],n=this.numCells(),i=0;i<n;i++){var r=this.us[i],o=this.vs[i];this._isValid(r)&&this._isValid(o)?e.push(t(r,o)):e.push(null)}return e}},{key:"_buildGrid",value:function(){return this._arraysTo2d(this.us,this.vs,this.nRows,this.nCols)}},{key:"_arraysTo2d",value:function(t,e,n,i){for(var r=[],o=0,s=0;s<n;s++){for(var l=[],u=0;u<i;u++,o++){var h=t[o],c=e[o],f=this._isValid(h)&&this._isValid(c);l[u]=f?new a.a(h,c):null}r[s]=l}return r}},{key:"_newDataArrays",value:function(t){t.us=[],t.vs=[]}},{key:"_pushValueToArrays",value:function(t,e){t.us.push(e.u),t.vs.push(e.v)}},{key:"_makeNewFrom",value:function(t){return new e(t)}},{key:"_calculateRange",value:function(){var t=this.getCells().map(function(t){return t.value}).filter(function(t){return null!==t});this._inFilter&&(t=t.filter(this._inFilter));var e=t.map(function(t){return t.magnitude()});return[d3.min(e),d3.max(e)]}},{key:"_doInterpolation",value:function(t,e,n,i,r,o){var s=1-t,l=1-e,u=s*l,h=t*l,c=s*e,f=t*e,d=n.u*u+i.u*h+r.u*c+o.u*f,v=n.v*u+i.v*h+r.v*c+o.v*f;return new a.a(d,v)}},{key:"_isValid",value:function(t){return null!==t&&void 0!==t}}]),e}(s.a);e.a=h},function(t,e){var n=function(){function t(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();L.Control.ColorBar=L.Control.extend({options:{position:"bottomleft",width:300,height:15,margin:15,background:"#fff",textColor:"black",steps:100,decimals:2,units:"uds",title:"Legend",labels:[],labelFontSize:10,labelTextPosition:"middle"},initialize:function(t,e,n){this.color=t,this.range=e,L.Util.setOptions(this,n)},onAdd:function(t){this._map=t;var e=L.DomUtil.create("div","leaflet-control-colorBar leaflet-bar leaflet-control");return e.style.padding="10px",L.DomEvent.addListener(e,"click",L.DomEvent.stopPropagation).addListener(e,"click",L.DomEvent.preventDefault),e.style.backgroundColor=this.options.background,e.style.cursor="text",e.innerHTML=this.title()+this.palette(),e},title:function(){var t=document.createElement("div");return d3.select(t).append("span").style("color",this.options.textColor).style("display","block").style("margin-bottom","5px").attr("class","leaflet-control-colorBar-title").text(this.options.title),t.innerHTML},palette:function(){var t=document.createElement("div"),e=this._createSvgIn(t);return this._appendColorBarTo(e),this.options.labels&&this._appendLabelsTo(e),t.innerHTML},_createSvgIn:function(t){var e=this.options.labels?this.options.margin:0;return d3.select(t).append("svg").attr("width",this.options.width+2*this.options.margin).attr("height",this.options.height+e)},_appendColorBarTo:function(t){var e=this,n=this._getColorPerValue(),i=this.options.width/n.length,r=t.append("g").attr("id","colorBar-buckets"),o=r.selectAll("rect").data(n).enter().append("rect");o.attr("x",function(t,n){return n*i+e.options.margin}).attr("y",function(){return 0}).attr("height",function(){return e.options.height}).attr("width",function(){return i}).attr("stroke-width",2).attr("stroke-linecap","butt").attr("stroke",function(t){return t.color.hex()}).attr("fill",function(t){return t.color.hex()}),o.append("title").text(function(t){return t.value.toFixed(e.options.decimals)+" "+e.options.units})},_appendLabelsTo:function(t){var e=this,n=this._getPositionPerLabelValue();t.append("g").attr("id","colorBar-labels").selectAll("text").data(n).enter().append("text").attr("x",function(t){return t.position+e.options.margin}).attr("y",this.options.height+this.options.margin).attr("font-size",this.options.labelFontSize+"px").attr("text-anchor",this.options.labelTextPosition).attr("fill",this.options.textColor).attr("class","leaflet-control-colorBar-label").text(function(t){return""+t.value.toFixed(e.options.decimals)})},_getColorPerValue:function(){var t=this,e=n(this.range,2),i=e[0],r=e[1],o=(r-i)/this.options.steps;return d3.range(i,r+o,o).map(function(e){return{value:e,color:t.color(e)}})},_getPositionPerLabelValue:function(){var t=d3.scaleLinear().range([0,this.options.width]).domain(this.range);return this.options.labels.map(function(e){return{value:e,position:t(e)}})}}),L.control.colorBar=function(t,e,n){return new L.Control.ColorBar(t,e,n)}},function(t,e){L.CanvasLayer.Field=L.CanvasLayer.extend({options:{mouseMoveCursor:{value:"pointer",noValue:"default"},opacity:1,onClick:null,onMouseMove:null,inFilter:null},initialize:function(t,e){L.Util.setOptions(this,e),this._visible=!0,t&&this.setData(t)},getEvents:function(){var t=L.CanvasLayer.prototype.getEvents.call(this);return t.zoomstart=this._hideCanvas.bind(this),t.zoomend=this._showCanvas.bind(this),t},onLayerDidMount:function(){this._enableIdentify(),this._ensureCanvasAlignment()},show:function(){this._visible=!0,this._showCanvas(),this._enableIdentify()},hide:function(){this._visible=!1,this._hideCanvas(),this._disableIdentify()},isVisible:function(){return this._visible},_showCanvas:function(){this._canvas&&this._visible&&(this._canvas.style.visibility="visible")},_hideCanvas:function(){this._canvas&&(this._canvas.style.visibility="hidden")},_enableIdentify:function(){this._map.on("click",this._onClick,this),this._map.on("mousemove",this._onMouseMove,this),this.options.onClick&&this.on("click",this.options.onClick,this),this.options.onMouseMove&&this.on("mousemove",this.options.onMouseMove,this)},_disableIdentify:function(){this._map.off("click",this._onClick,this),this._map.off("mousemove",this._onMouseMove,this),this.options.onClick&&this.off("click",this.options.onClick,this),this.options.onMouseMove&&this.off("mousemove",this.options.onMouseMove,this)},_ensureCanvasAlignment:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t)},onLayerWillUnmount:function(){this._disableIdentify()},needRedraw:function(){this._map&&this._field&&L.CanvasLayer.prototype.needRedraw.call(this)},onDrawLayer:function(t){throw new TypeError("Must be overriden")},setData:function(t){this.options.inFilter&&t.setFilter(this.options.inFilter),this._field=t,this.needRedraw(),this.fire("load")},setFilter:function(t){this.options.inFilter=t,this._field&&this._field.setFilter(t),this.needRedraw()},setOpacity:function(t){return this.options.opacity=t,this._canvas&&this._updateOpacity(),this},getBounds:function(){var t=this._field.extent(),e=L.latLng(t[1],t[0]),n=L.latLng(t[3],t[2]);return L.latLngBounds(e,n)},_onClick:function(t){var e=this._queryValue(t);this.fire("click",e)},_onMouseMove:function(t){var e=this._queryValue(t);this._changeCursorOn(e),this.fire("mousemove",e)},_changeCursorOn:function(t){if(this.options.mouseMoveCursor){var e=this.options.mouseMoveCursor,n=e.value,i=e.noValue;this._map.getContainer().style.cursor=null!==t.value?n:i}},_updateOpacity:function(){L.DomUtil.setOpacity(this._canvas,this.options.opacity)},_queryValue:function(t){var e=this._field?this._field.valueAt(t.latlng.lng,t.latlng.lat):null;return{latlng:t.latlng,value:e}},_getDrawingContext:function(){var t=this._canvas.getContext("2d");return t.clearRect(0,0,this._canvas.width,this._canvas.height),t}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function t(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();L.CanvasLayer.ScalarField=L.CanvasLayer.Field.extend({options:{type:"colormap",color:null,interpolate:!1,vectorSize:20,arrowDirection:"from"},initialize:function(t,e){L.CanvasLayer.Field.prototype.initialize.call(this,t,e),L.Util.setOptions(this,e)},_defaultColorScale:function(){return chroma.scale(["white","black"]).domain(this._field.range)},setColor:function(t){this.options.color=t,this.needRedraw()},onDrawLayer:function(t){if(this.isVisible()){this._updateOpacity();this._getRendererMethod()()}},_getRendererMethod:function(){switch(this.options.type){case"colormap":return this._drawImage.bind(this);case"vector":return this._drawArrows.bind(this);default:throw Error("Unkwown renderer type: "+this.options.type)}},_ensureColor:function(){null===this.options.color&&this.setColor(this._defaultColorScale())},_showCanvas:function(){L.CanvasLayer.Field.prototype._showCanvas.call(this),this.needRedraw()},_drawImage:function(){this._ensureColor();var t=this._getDrawingContext(),e=this._canvas.width,n=this._canvas.height,i=t.createImageData(e,n),r=i.data;this._prepareImageIn(r,e,n),t.putImageData(i,0,0)},_prepareImageIn:function(t,e,n){for(var i=this.options.interpolate?"interpolatedValueAt":"valueAt",o=0,a=0;a<n;a++)for(var s=0;s<e;s++){var l=this._map.containerPointToLatLng([s,a]),u=l.lng,h=l.lat,c=this._field[i](u,h);if(null!==c){var f=this._getColorFor(c),d=f.rgba(),v=r(d,4),p=v[0],y=v[1],_=v[2],m=v[3];t[o]=p,t[o+1]=y,t[o+2]=_,t[o+3]=parseInt(255*m)}o+=4}},_drawArrows:function(){var t=this._pixelBounds(),e=(t.max.x-t.min.x)/this._field.nCols,n=Math.max(1,Math.floor(1.2*this.options.vectorSize/e)),o=this._getDrawingContext();o.strokeStyle=this.options.color;for(var a=this._map.getBounds(),s=0;s<this._field.height;s+=n)for(var l=0;l<this._field.width;l+=n){var u=this._field._lonLatAtIndexes(l,s),h=r(u,2),c=h[0],f=h[1],d=this._field.valueAt(c,f),v=L.latLng(f,c);if(null!==d&&a.contains(v)){var p=new i.a(v,d,this.cellSize);this._drawArrow(p,o)}}},_pixelBounds:function(){var t=this.getBounds(),e=this._map.latLngToContainerPoint(t.getNorthWest()),n=this._map.latLngToContainerPoint(t.getSouthEast());return L.bounds(e,n)},_drawArrow:function(t,e){var n=this._map.latLngToContainerPoint(t.center),i=this.options.color;"function"==typeof i&&(e.strokeStyle=i(t.value));var r=this.options.vectorSize;e.save(),e.translate(n.x,n.y);var o=(90+t.value)*Math.PI/180;"towards"===this.options.arrowDirection&&(o+=Math.PI),e.rotate(o),e.beginPath(),e.moveTo(-r/2,0),e.lineTo(+r/2,0),e.moveTo(.25*r,.25*-r),e.lineTo(+r/2,0),e.lineTo(.25*r,.25*r),e.stroke(),e.restore()},_getColorFor:function(t){var e=this.options.color;return"function"==typeof e&&(e=this.options.color(t)),chroma(e)}}),L.canvasLayer.scalarField=function(t,e){return new L.CanvasLayer.ScalarField(t,e)}},function(t,e){function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}L.CanvasLayer.SimpleLonLat=L.CanvasLayer.extend({options:{color:"gray"},initialize:function(t,e){this.points=t,L.Util.setOptions(this,e)},onLayerDidMount:function(){},onLayerWillUnmount:function(){},setData:function(t){this.needRedraw()},onDrawLayer:function(t){var e=t.canvas.getContext("2d");e.clearRect(0,0,t.canvas.width,t.canvas.height),e.fillStyle=this.options.color;var n=!0,i=!1,r=void 0;try{for(var o,a=this.points[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value,l=t.layer._map.latLngToContainerPoint(s);e.beginPath(),e.fillRect(l.x,l.y,2,2),e.fill(),e.closePath(),e.stroke()}}catch(t){i=!0,r=t}finally{try{!n&&a.return&&a.return()}finally{if(i)throw r}}},getBounds:function(){var t=this.points.map(function(t){return t.lng}),e=this.points.map(function(t){return t.lat}),i=Math.min.apply(Math,n(t)),r=Math.min.apply(Math,n(e)),o=Math.max.apply(Math,n(t)),a=Math.max.apply(Math,n(e)),s=L.latLng(r,i),l=L.latLng(a,o);return L.latLngBounds(s,l)}}),L.canvasLayer.simpleLonLat=function(t,e){return new L.CanvasLayer.SimpleLonLat(t,e)}},function(t,e){L.CanvasLayer.VectorFieldAnim=L.CanvasLayer.Field.extend({options:{paths:800,color:"white",width:1,fade:.96,duration:20,maxAge:200,velocityScale:2e-4},initialize:function(t,e){L.CanvasLayer.Field.prototype.initialize.call(this,t,e),L.Util.setOptions(this,e),this.timer=null},onLayerDidMount:function(){L.CanvasLayer.Field.prototype.onLayerDidMount.call(this),this._map.on("move resize",this._stopAnimation,this)},onLayerWillUnmount:function(){L.CanvasLayer.Field.prototype.onLayerWillUnmount.call(this),this._map.off("move resize",this._stopAnimation,this),this._stopAnimation()},_hideCanvas:function(){L.CanvasLayer.Field.prototype._hideCanvas.call(this),this._stopAnimation()},onDrawLayer:function(t){function e(){r.forEach(function(t){t.age>o.options.maxAge&&(t.age=0,o._field.randomPosition(t));var e=o._field.valueAt(t.x,t.y);if(null===e)t.age=o.options.maxAge;else{var n=t.x+e.u*o.options.velocityScale,i=t.y+e.v*o.options.velocityScale;o._field.hasValueAt(n,i)?(t.xt=n,t.yt=i,t.m=e.magnitude()):t.age=o.options.maxAge}t.age+=1})}function n(){var e=i.globalCompositeOperation;i.globalCompositeOperation="destination-in",i.fillRect(0,0,i.canvas.width,i.canvas.height),i.globalCompositeOperation=e,i.fillStyle="rgba(0, 0, 0, "+o.options.fade+")",i.lineWidth=o.options.width,i.strokeStyle=o.options.color,r.forEach(function(e){o._drawParticle(t,i,e)})}if(this._field&&this.isVisible()){this._updateOpacity();var i=this._getDrawingContext(),r=this._prepareParticlePaths();this.timer=d3.timer(function(){e(),n()},this.options.duration);var o=this}},_drawParticle:function(t,e,n){var i=new L.latLng(n.y,n.x),r=new L.latLng(n.yt,n.xt);if(t.bounds.contains(i)&&n.age<=this.options.maxAge){var o=t.layer._map.latLngToContainerPoint(i),a=t.layer._map.latLngToContainerPoint(r);e.beginPath(),e.moveTo(o.x,o.y),e.lineTo(a.x,a.y),n.x=n.xt,n.y=n.yt;var s=this.options.color;"function"==typeof s&&(e.strokeStyle=s(n.m));var l=this.options.width;"function"==typeof l&&(e.lineWidth=l(n.m)),e.stroke()}},_prepareParticlePaths:function(){for(var t=[],e=0;e<this.options.paths;e++){var n=this._field.randomPosition();n.age=this._randomAge(),t.push(n)}return t},_randomAge:function(){return Math.floor(Math.random()*this.options.maxAge)},_stopAnimation:function(){this.timer&&this.timer.stop()}}),L.canvasLayer.vectorFieldAnim=function(t,e){return new L.CanvasLayer.VectorFieldAnim(t,e)}},function(t,e){L.CanvasLayer=L.Layer.extend({initialize:function(t){this._map=null,this._canvas=null,this._frame=null,this._delegate=null,L.setOptions(this,t)},delegate:function(t){return this._delegate=t,this},needRedraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this.drawLayer,this)),this},_onLayerDidResize:function(t){this._canvas.width=t.newSize.x,this._canvas.height=t.newSize.y},_onLayerDidMove:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t),this.drawLayer()},getEvents:function(){var t={resize:this._onLayerDidResize,moveend:this._onLayerDidMove};return this._map.options.zoomAnimation&&L.Browser.any3d&&(t.zoomanim=this._animateZoom),t},onAdd:function(t){this._map=t,this._canvas=L.DomUtil.create("canvas","leaflet-layer"),this.tiles={};var e=this._map.getSize();this._canvas.width=e.x,this._canvas.height=e.y;var n=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(n?"animated":"hide")),t._panes.overlayPane.appendChild(this._canvas),t.on(this.getEvents(),this);var i=this._delegate||this;i.onLayerDidMount&&i.onLayerDidMount(),this.needRedraw()},onRemove:function(t){var e=this._delegate||this;e.onLayerWillUnmount&&e.onLayerWillUnmount(),t.getPanes().overlayPane.removeChild(this._canvas),t.off(this.getEvents(),this),this._canvas=null},addTo:function(t){return t.addLayer(this),this},LatLonToMercator:function(t){return{x:6378137*t.lng*Math.PI/180,y:6378137*Math.log(Math.tan((90+t.lat)*Math.PI/360))}},drawLayer:function(){var t=this._map.getSize(),e=this._map.getBounds(),n=this._map.getZoom(),i=this.LatLonToMercator(this._map.getCenter()),r=this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize())),o=this._delegate||this;o.onDrawLayer&&o.onDrawLayer({layer:this,canvas:this._canvas,bounds:e,size:t,zoom:n,center:i,corner:r}),this._frame=null},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),n=this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(),t.zoom,t.center);L.DomUtil.setTransform(this._canvas,n,e)}}),L.canvasLayer=function(){return new L.CanvasLayer}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),r=n(0),o=n(1),a=n(2),s=n(4);window.L.Vector=i.a,window.L.Cell=r.a,window.L.Field=o.a,window.L.ScalarField=a.a,window.L.VectorField=s.a,n(10),n(8),n(6),n(7),n(9),n(5),console.log("leaflet.canvaslayer.field v1.3.1")}]);