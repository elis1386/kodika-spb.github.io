/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/**
 * jQuery SHA1 hash algorithm function
 * 
 *      <code>
 *              Calculate the sha1 hash of a String 
 *              String $.sha1 ( String str )
 *      </code>
 * 
 * Calculates the sha1 hash of str using the US Secure Hash Algorithm 1.
 * SHA-1 the Secure Hash Algorithm (SHA) was developed by NIST and is specified in the Secure Hash Standard (SHS, FIPS 180).
 * This script is used to process variable length message into a fixed-length output using the SHA-1 algorithm. It is fully compatible with UTF-8 encoding.
 * If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag).
 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
 * 
 * Example
 *      Code
 *              <code>
 *                      $.sha1("I'm Persian."); 
 *              </code>
 *      Result
 *              <code>
 *                      "1d302f9dc925d62fc859055999d2052e274513ed"
 *              </code>
 * 
 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
 * @link http://www.semnanweb.com/jquery-plugin/sha1.html
 * @see http://www.webtoolkit.info/
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
 * @param {jQuery} {sha1:function(string))
 * @return string
 */

(function($){
        
        var rotateLeft = function(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        
        var lsbHex = function(value) {
                var string = "";
                var i;
                var vh;
                var vl;
                for(i = 0;i <= 6;i += 2) {
                        vh = (value>>>(i * 4 + 4))&0x0f;
                        vl = (value>>>(i*4))&0x0f;
                        string += vh.toString(16) + vl.toString(16);
                }
                return string;
        };
        
        var cvtHex = function(value) {
                var string = "";
                var i;
                var v;
                for(i = 7;i >= 0;i--) {
                        v = (value>>>(i * 4))&0x0f;
                        string += v.toString(16);
                }
                return string;
        };
        
        var uTF8Encode = function(string) {
                string = string.replace(/\x0d\x0a/g, "\x0a");
                var output = "";
                for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                                output += String.fromCharCode(c);
                        } else if ((c > 127) && (c < 2048)) {
                                output += String.fromCharCode((c >> 6) | 192);
                                output += String.fromCharCode((c & 63) | 128);
                        } else {
                                output += String.fromCharCode((c >> 12) | 224);
                                output += String.fromCharCode(((c >> 6) & 63) | 128);
                                output += String.fromCharCode((c & 63) | 128);
                        }
                }
                return output;
        };
        
        $.extend({
                sha1: function(string) {
                        if ('undefined'===typeof string) return null;
                        var blockstart;
                        var i, j;
                        var W = new Array(80);
                        var H0 = 0x67452301;
                        var H1 = 0xEFCDAB89;
                        var H2 = 0x98BADCFE;
                        var H3 = 0x10325476;
                        var H4 = 0xC3D2E1F0;
                        var A, B, C, D, E;
                        var tempValue;
                        string = uTF8Encode(string);
                        var stringLength = string.length;
                        var wordArray = new Array();
                        for(i = 0;i < stringLength - 3;i += 4) {
                                j = string.charCodeAt(i)<<24 | string.charCodeAt(i + 1)<<16 | string.charCodeAt(i + 2)<<8 | string.charCodeAt(i + 3);
                                wordArray.push(j);
                        }
                        switch(stringLength % 4) {
                                case 0:
                                        i = 0x080000000;
                                break;
                                case 1:
                                        i = string.charCodeAt(stringLength - 1)<<24 | 0x0800000;
                                break;
                                case 2:
                                        i = string.charCodeAt(stringLength - 2)<<24 | string.charCodeAt(stringLength - 1)<<16 | 0x08000;
                                break;
                                case 3:
                                        i = string.charCodeAt(stringLength - 3)<<24 | string.charCodeAt(stringLength - 2)<<16 | string.charCodeAt(stringLength - 1)<<8 | 0x80;
                                break;
                        }
                        wordArray.push(i);
                        while((wordArray.length % 16) != 14 ) wordArray.push(0);
                        wordArray.push(stringLength>>>29);
                        wordArray.push((stringLength<<3)&0x0ffffffff);
                        for(blockstart = 0;blockstart < wordArray.length;blockstart += 16) {
                                for(i = 0;i < 16;i++) W[i] = wordArray[blockstart+i];
                                for(i = 16;i <= 79;i++) W[i] = rotateLeft(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
                                A = H0;
                                B = H1;
                                C = H2;
                                D = H3;
                                E = H4;
                                for(i = 0;i <= 19;i++) {
                                        tempValue = (rotateLeft(A, 5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                                        E = D;
                                        D = C;
                                        C = rotateLeft(B, 30);
                                        B = A;
                                        A = tempValue;
                                }
                                for(i = 20;i <= 39;i++) {
                                        tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                                        E = D;
                                        D = C;
                                        C = rotateLeft(B, 30);
                                        B = A;
                                        A = tempValue;
                                }
                                for(i = 40;i <= 59;i++) {
                                        tempValue = (rotateLeft(A, 5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                                        E = D;
                                        D = C;
                                        C = rotateLeft(B, 30);
                                        B = A;
                                        A = tempValue;
                                }
                                for(i = 60;i <= 79;i++) {
                                        tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                                        E = D;
                                        D = C;
                                        C = rotateLeft(B, 30);
                                        B = A;
                                        A = tempValue;
                                }
                                H0 = (H0 + A) & 0x0ffffffff;
                                H1 = (H1 + B) & 0x0ffffffff;
                                H2 = (H2 + C) & 0x0ffffffff;
                                H3 = (H3 + D) & 0x0ffffffff;
                                H4 = (H4 + E) & 0x0ffffffff;
                        }
                        var tempValue = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);
                        return tempValue.toLowerCase();
                }
        });
})(jQuery);
/* jquery.sparkline 2.1 - http://omnipotent.net/jquery.sparkline/ 
 ** Licensed under the New BSD License - see above site for details */

(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):a(jQuery)})(function(a){"use strict";var b={},c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I=0;c=function(){return{common:{type:"line",lineColor:"#00f",fillColor:"#cdf",defaultPixelsPerValue:3,width:"auto",height:"auto",composite:!1,tagValuesAttribute:"values",tagOptionsPrefix:"spark",enableTagOptions:!1,enableHighlight:!0,highlightLighten:1.4,tooltipSkipNull:!0,tooltipPrefix:"",tooltipSuffix:"",disableHiddenCheck:!1,numberFormatter:!1,numberDigitGroupCount:3,numberDigitGroupSep:",",numberDecimalMark:".",disableTooltips:!1,disableInteraction:!1},line:{spotColor:"#f80",highlightSpotColor:"#5f5",highlightLineColor:"#f22",spotRadius:1.5,minSpotColor:"#f80",maxSpotColor:"#f80",lineWidth:1,normalRangeMin:undefined,normalRangeMax:undefined,normalRangeColor:"#ccc",drawNormalOnTop:!1,chartRangeMin:undefined,chartRangeMax:undefined,chartRangeMinX:undefined,chartRangeMaxX:undefined,tooltipFormat:new e('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')},bar:{barColor:"#3366cc",negBarColor:"#f44",stackedBarColor:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],zeroColor:undefined,nullColor:undefined,zeroAxis:!0,barWidth:4,barSpacing:1,chartRangeMax:undefined,chartRangeMin:undefined,chartRangeClip:!1,colorMap:undefined,tooltipFormat:new e('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')},tristate:{barWidth:4,barSpacing:1,posBarColor:"#6f6",negBarColor:"#f44",zeroBarColor:"#999",colorMap:{},tooltipFormat:new e('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),tooltipValueLookups:{map:{"-1":"Loss",0:"Draw",1:"Win"}}},discrete:{lineHeight:"auto",thresholdColor:undefined,thresholdValue:0,chartRangeMax:undefined,chartRangeMin:undefined,chartRangeClip:!1,tooltipFormat:new e("{{prefix}}{{value}}{{suffix}}")},bullet:{targetColor:"#f33",targetWidth:3,performanceColor:"#33f",rangeColors:["#d3dafe","#a8b6ff","#7f94ff"],base:undefined,tooltipFormat:new e("{{fieldkey:fields}} - {{value}}"),tooltipValueLookups:{fields:{r:"Range",p:"Performance",t:"Target"}}},pie:{offset:0,sliceColors:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],borderWidth:0,borderColor:"#000",tooltipFormat:new e('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')},box:{raw:!1,boxLineColor:"#000",boxFillColor:"#cdf",whiskerColor:"#000",outlierLineColor:"#333",outlierFillColor:"#fff",medianColor:"#f00",showOutliers:!0,outlierIQR:1.5,spotRadius:1.5,target:undefined,targetColor:"#4a2",chartRangeMax:undefined,chartRangeMin:undefined,tooltipFormat:new e("{{field:fields}}: {{value}}"),tooltipFormatFieldlistKey:"field",tooltipValueLookups:{fields:{lq:"Lower Quartile",med:"Median",uq:"Upper Quartile",lo:"Left Outlier",ro:"Right Outlier",lw:"Left Whisker",rw:"Right Whisker"}}}}},B='.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}',d=function(){var b,c;return b=function(){this.init.apply(this,arguments)},arguments.length>1?(arguments[0]?(b.prototype=a.extend(new arguments[0],arguments[arguments.length-1]),b._super=arguments[0].prototype):b.prototype=arguments[arguments.length-1],arguments.length>2&&(c=Array.prototype.slice.call(arguments,1,-1),c.unshift(b.prototype),a.extend.apply(a,c))):b.prototype=arguments[0],b.prototype.cls=b,b},a.SPFormatClass=e=d({fre:/\{\{([\w.]+?)(:(.+?))?\}\}/g,precre:/(\w+)\.(\d+)/,init:function(a,b){this.format=a,this.fclass=b},render:function(a,b,c){var d=this,e=a,f,g,h,i,j;return this.format.replace(this.fre,function(){var a;return g=arguments[1],h=arguments[3],f=d.precre.exec(g),f?(j=f[2],g=f[1]):j=!1,i=e[g],i===undefined?"":h&&b&&b[h]?(a=b[h],a.get?b[h].get(i)||i:b[h][i]||i):(k(i)&&(c.get("numberFormatter")?i=c.get("numberFormatter")(i):i=p(i,j,c.get("numberDigitGroupCount"),c.get("numberDigitGroupSep"),c.get("numberDecimalMark"))),i)})}}),a.spformat=function(a,b){return new e(a,b)},f=function(a,b,c){return a<b?b:a>c?c:a},g=function(a,b){var c;return b===2?(c=Math.floor(a.length/2),a.length%2?a[c]:(a[c-1]+a[c])/2):a.length%2?(c=(a.length*b+b)/4,c%1?(a[Math.floor(c)]+a[Math.floor(c)-1])/2:a[c-1]):(c=(a.length*b+2)/4,c%1?(a[Math.floor(c)]+a[Math.floor(c)-1])/2:a[c-1])},h=function(a){var b;switch(a){case"undefined":a=undefined;break;case"null":a=null;break;case"true":a=!0;break;case"false":a=!1;break;default:b=parseFloat(a),a==b&&(a=b)}return a},i=function(a){var b,c=[];for(b=a.length;b--;)c[b]=h(a[b]);return c},j=function(a,b){var c,d,e=[];for(c=0,d=a.length;c<d;c++)a[c]!==b&&e.push(a[c]);return e},k=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},p=function(b,c,d,e,f){var g,h;b=(c===!1?parseFloat(b).toString():b.toFixed(c)).split(""),g=(g=a.inArray(".",b))<0?b.length:g,g<b.length&&(b[g]=f);for(h=g-d;h>0;h-=d)b.splice(h,0,e);return b.join("")},l=function(a,b,c){var d;for(d=b.length;d--;){if(c&&b[d]===null)continue;if(b[d]!==a)return!1}return!0},m=function(a){var b=0,c;for(c=a.length;c--;)b+=typeof a[c]=="number"?a[c]:0;return b},o=function(b){return a.isArray(b)?b:[b]},n=function(a){var b;document.createStyleSheet?document.createStyleSheet().cssText=a:(b=document.createElement("style"),b.type="text/css",document.getElementsByTagName("head")[0].appendChild(b),b[typeof document.body.style.WebkitAppearance=="string"?"innerText":"innerHTML"]=a)},a.fn.simpledraw=function(b,c,d,e){var f,g;if(d&&(f=this.data("_jqs_vcanvas")))return f;b===undefined&&(b=a(this).innerWidth()),c===undefined&&(c=a(this).innerHeight());if(a.browser.hasCanvas)f=new F(b,c,this,e);else{if(!a.browser.msie)return!1;f=new G(b,c,this)}return g=a(this).data("_jqs_mhandler"),g&&g.registerCanvas(f),f},a.fn.cleardraw=function(){var a=this.data("_jqs_vcanvas");a&&a.reset()},a.RangeMapClass=q=d({init:function(a){var b,c,d=[];for(b in a)a.hasOwnProperty(b)&&typeof b=="string"&&b.indexOf(":")>-1&&(c=b.split(":"),c[0]=c[0].length===0?-Infinity:parseFloat(c[0]),c[1]=c[1].length===0?Infinity:parseFloat(c[1]),c[2]=a[b],d.push(c));this.map=a,this.rangelist=d||!1},get:function(a){var b=this.rangelist,c,d,e;if((e=this.map[a])!==undefined)return e;if(b)for(c=b.length;c--;){d=b[c];if(d[0]<=a&&d[1]>=a)return d[2]}return undefined}}),a.range_map=function(a){return new q(a)},r=d({init:function(b,c){var d=a(b);this.$el=d,this.options=c,this.currentPageX=0,this.currentPageY=0,this.el=b,this.splist=[],this.tooltip=null,this.over=!1,this.displayTooltips=!c.get("disableTooltips"),this.highlightEnabled=!c.get("disableHighlight")},registerSparkline:function(a){this.splist.push(a),this.over&&this.updateDisplay()},registerCanvas:function(b){var c=a(b.canvas);this.canvas=b,this.$canvas=c,c.mouseenter(a.proxy(this.mouseenter,this)),c.mouseleave(a.proxy(this.mouseleave,this)),c.click(a.proxy(this.mouseclick,this))},reset:function(a){this.splist=[],this.tooltip&&a&&(this.tooltip.remove(),this.tooltip=undefined)},mouseclick:function(b){var c=a.Event("sparklineClick");c.originalEvent=b,c.sparklines=this.splist,this.$el.trigger(c)},mouseenter:function(b){a(document.body).unbind("mousemove.jqs"),a(document.body).bind("mousemove.jqs",a.proxy(this.mousemove,this)),this.over=!0,this.currentPageX=b.pageX,this.currentPageY=b.pageY,this.currentEl=b.target,!this.tooltip&&this.displayTooltips&&(this.tooltip=new s(this.options),this.tooltip.updatePosition(b.pageX,b.pageY)),this.updateDisplay()},mouseleave:function(){a(document.body).unbind("mousemove.jqs");var b=this.splist,c=b.length,d=!1,e,f;this.over=!1,this.currentEl=null,this.tooltip&&(this.tooltip.remove(),this.tooltip=null);for(f=0;f<c;f++)e=b[f],e.clearRegionHighlight()&&(d=!0);d&&this.canvas.render()},mousemove:function(a){this.currentPageX=a.pageX,this.currentPageY=a.pageY,this.currentEl=a.target,this.tooltip&&this.tooltip.updatePosition(a.pageX,a.pageY),this.updateDisplay()},updateDisplay:function(){var b=this.splist,c=b.length,d=!1,e=this.$canvas.offset(),f=this.currentPageX-e.left,g=this.currentPageY-e.top,h,i,j,k,l;if(!this.over)return;for(j=0;j<c;j++)i=b[j],k=i.setRegionHighlight(this.currentEl,f,g),k&&(d=!0);if(d){l=a.Event("sparklineRegionChange"),l.sparklines=this.splist,this.$el.trigger(l);if(this.tooltip){h="";for(j=0;j<c;j++)i=b[j],h+=i.getCurrentRegionTooltip();this.tooltip.setContent(h)}this.disableHighlight||this.canvas.render()}k===null&&this.mouseleave()}}),s=d({sizeStyle:"position: static !important;display: block !important;visibility: hidden !important;float: left !important;",init:function(b){var c=b.get("tooltipClassname","jqstooltip"),d=this.sizeStyle,e;this.container=b.get("tooltipContainer")||document.body,this.tooltipOffsetX=b.get("tooltipOffsetX",10),this.tooltipOffsetY=b.get("tooltipOffsetY",12),a("#jqssizetip").remove(),a("#jqstooltip").remove(),this.sizetip=a("<div/>",{id:"jqssizetip",style:d,"class":c}),this.tooltip=a("<div/>",{id:"jqstooltip","class":c}).appendTo(this.container),e=this.tooltip.offset(),this.offsetLeft=e.left,this.offsetTop=e.top,this.hidden=!0,a(window).unbind("resize.jqs scroll.jqs"),a(window).bind("resize.jqs scroll.jqs",a.proxy(this.updateWindowDims,this)),this.updateWindowDims()},updateWindowDims:function(){this.scrollTop=a(window).scrollTop(),this.scrollLeft=a(window).scrollLeft(),this.scrollRight=this.scrollLeft+a(window).width(),this.updatePosition()},getSize:function(a){this.sizetip.html(a).appendTo(this.container),this.width=this.sizetip.width()+1,this.height=this.sizetip.height(),this.sizetip.remove()},setContent:function(a){if(!a){this.tooltip.css("visibility","hidden"),this.hidden=!0;return}this.getSize(a),this.tooltip.html(a).css({width:this.width,height:this.height,visibility:"visible"}),this.hidden&&(this.hidden=!1,this.updatePosition())},updatePosition:function(a,b){if(a===undefined){if(this.mousex===undefined)return;a=this.mousex-this.offsetLeft,b=this.mousey-this.offsetTop}else this.mousex=a-=this.offsetLeft,this.mousey=b-=this.offsetTop;if(!this.height||!this.width||this.hidden)return;b-=this.height+this.tooltipOffsetY,a+=this.tooltipOffsetX,b<this.scrollTop&&(b=this.scrollTop),a<this.scrollLeft?a=this.scrollLeft:a+this.width>this.scrollRight&&(a=this.scrollRight-this.width),this.tooltip.css({left:a,top:b})},remove:function(){this.tooltip.remove(),this.sizetip.remove(),this.sizetip=this.tooltip=undefined,a(window).unbind("resize.jqs scroll.jqs")}}),C=function(){n(B)},a(C),H=[],a.fn.sparkline=function(b,c){return this.each(function(){var d=new a.fn.sparkline.options(this,c),e=a(this),f,g;f=function(){var c,f,g,h,i,j,k;if(b==="html"||b===undefined){k=this.getAttribute(d.get("tagValuesAttribute"));if(k===undefined||k===null)k=e.html();c=k.replace(/(^\s*<!--)|(-->\s*$)|\s+/g,"").split(",")}else c=b;f=d.get("width")==="auto"?c.length*d.get("defaultPixelsPerValue"):d.get("width");if(d.get("height")==="auto"){if(!d.get("composite")||!a.data(this,"_jqs_vcanvas"))h=document.createElement("span"),h.innerHTML="a",e.html(h),g=a(h).innerHeight()||a(h).height(),a(h).remove(),h=null}else g=d.get("height");d.get("disableInteraction")?i=!1:(i=a.data(this,"_jqs_mhandler"),i?d.get("composite")||i.reset():(i=new r(this,d),a.data(this,"_jqs_mhandler",i)));if(d.get("composite")&&!a.data(this,"_jqs_vcanvas")){a.data(this,"_jqs_errnotify")||(alert("Attempted to attach a composite sparkline to an element with no existing sparkline"),a.data(this,"_jqs_errnotify",!0));return}j=new(a.fn.sparkline[d.get("type")])(this,c,d,f,g),j.render(),i&&i.registerSparkline(j)};if(a(this).html()&&!d.get("disableHiddenCheck")&&a(this).is(":hidden")||a.fn.jquery<"1.3.0"&&a(this).parents().is(":hidden")||!a(this).parents("body").length){if(!d.get("composite")&&a.data(this,"_jqs_pending"))for(g=H.length;g;g--)H[g-1][0]==this&&H.splice(g-1,1);H.push([this,f]),a.data(this,"_jqs_pending",!0)}else f.call(this)})},a.fn.sparkline.defaults=c(),a.sparkline_display_visible=function(){var b,c,d,e=[];for(c=0,d=H.length;c<d;c++)b=H[c][0],a(b).is(":visible")&&!a(b).parents().is(":hidden")?(H[c][1].call(b),a.data(H[c][0],"_jqs_pending",!1),e.push(c)):!a(b).closest("html").length&&!a.data(b,"_jqs_pending")&&(a.data(H[c][0],"_jqs_pending",!1),e.push(c));for(c=e.length;c;c--)H.splice(e[c-1],1)},a.fn.sparkline.options=d({init:function(c,d){var e,f,g,h;this.userOptions=d=d||{},this.tag=c,this.tagValCache={},f=a.fn.sparkline.defaults,g=f.common,this.tagOptionsPrefix=d.enableTagOptions&&(d.tagOptionsPrefix||g.tagOptionsPrefix),h=this.getTagSetting("type"),h===b?e=f[d.type||g.type]:e=f[h],this.mergedOptions=a.extend({},g,e,d)},getTagSetting:function(a){var c=this.tagOptionsPrefix,d,e,f,g;if(c===!1||c===undefined)return b;if(this.tagValCache.hasOwnProperty(a))d=this.tagValCache.key;else{d=this.tag.getAttribute(c+a);if(d===undefined||d===null)d=b;else if(d.substr(0,1)==="["){d=d.substr(1,d.length-2).split(",");for(e=d.length;e--;)d[e]=h(d[e].replace(/(^\s*)|(\s*$)/g,""))}else if(d.substr(0,1)==="{"){f=d.substr(1,d.length-2).split(","),d={};for(e=f.length;e--;)g=f[e].split(":",2),d[g[0].replace(/(^\s*)|(\s*$)/g,"")]=h(g[1].replace(/(^\s*)|(\s*$)/g,""))}else d=h(d);this.tagValCache.key=d}return d},get:function(a,c){var d=this.getTagSetting(a),e;return d!==b?d:(e=this.mergedOptions[a])===undefined?c:e}}),a.fn.sparkline._base=d({disabled:!1,init:function(b,c,d,e,f){this.el=b,this.$el=a(b),this.values=c,this.options=d,this.width=e,this.height=f,this.currentRegion=undefined},initTarget:function(){var a=!this.options.get("disableInteraction");(this.target=this.$el.simpledraw(this.width,this.height,this.options.get("composite"),a))?(this.canvasWidth=this.target.pixelWidth,this.canvasHeight=this.target.pixelHeight):this.disabled=!0},render:function(){return this.disabled?(this.el.innerHTML="",!1):!0},getRegion:function(a,b){},setRegionHighlight:function(a,b,c){var d=this.currentRegion,e=!this.options.get("disableHighlight"),f;return b>this.canvasWidth||c>this.canvasHeight||b<0||c<0?null:(f=this.getRegion(a,b,c),d!==f?(d!==undefined&&e&&this.removeHighlight(),this.currentRegion=f,f!==undefined&&e&&this.renderHighlight(),!0):!1)},clearRegionHighlight:function(){return this.currentRegion!==undefined?(this.removeHighlight(),this.currentRegion=undefined,!0):!1},renderHighlight:function(){this.changeHighlight(!0)},removeHighlight:function(){this.changeHighlight(!1)},changeHighlight:function(a){},getCurrentRegionTooltip:function(){var b=this.options,c="",d=[],f,g,h,i,j,k,l,m,n,o,p,q,r,s;if(this.currentRegion===undefined)return"";f=this.getCurrentRegionFields(),p=b.get("tooltipFormatter");if(p)return p(this,b,f);b.get("tooltipChartTitle")&&(c+='<div class="jqs jqstitle">'+b.get("tooltipChartTitle")+"</div>\n"),g=this.options.get("tooltipFormat");if(!g)return"";a.isArray(g)||(g=[g]),a.isArray(f)||(f=[f]),l=this.options.get("tooltipFormatFieldlist"),m=this.options.get("tooltipFormatFieldlistKey");if(l&&m){n=[];for(k=f.length;k--;)o=f[k][m],(s=a.inArray(o,l))!=-1&&(n[s]=f[k]);f=n}h=g.length,r=f.length;for(k=0;k<h;k++){q=g[k],typeof q=="string"&&(q=new e(q)),i=q.fclass||"jqsfield";for(s=0;s<r;s++)if(!f[s].isNull||!b.get("tooltipSkipNull"))a.extend(f[s],{prefix:b.get("tooltipPrefix"),suffix:b.get("tooltipSuffix")}),j=q.render(f[s],b.get("tooltipValueLookups"),b),d.push('<div class="'+i+'">'+j+"</div>")}return d.length?c+d.join("\n"):""},getCurrentRegionFields:function(){},calcHighlightColor:function(a,b){var c=b.get("highlightColor"),d=b.get("highlightLighten"),e,g,h,i;if(c)return c;if(d){e=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a)||/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a);if(e){h=[],g=a.length===4?16:1;for(i=0;i<3;i++)h[i]=f(Math.round(parseInt(e[i+1],16)*g*d),0,255);return"rgb("+h.join(",")+")"}}return a}}),t={changeHighlight:function(b){var c=this.currentRegion,d=this.target,e=this.regionShapes[c],f;e&&(f=this.renderRegion(c,b),a.isArray(f)||a.isArray(e)?(d.replaceWithShapes(e,f),this.regionShapes[c]=a.map(f,function(a){return a.id})):(d.replaceWithShape(e,f),this.regionShapes[c]=f.id))},render:function(){var b=this.values,c=this.target,d=this.regionShapes,e,f,g,h;if(!this.cls._super.render.call(this))return;for(g=b.length;g--;){e=this.renderRegion(g);if(e)if(a.isArray(e)){f=[];for(h=e.length;h--;)e[h].append(),f.push(e[h].id);d[g]=f}else e.append(),d[g]=e.id;else d[g]=null}c.render()}},a.fn.sparkline.line=u=d(a.fn.sparkline._base,{type:"line",init:function(a,b,c,d,e){u._super.init.call(this,a,b,c,d,e),this.vertices=[],this.regionMap=[],this.xvalues=[],this.yvalues=[],this.yminmax=[],this.hightlightSpotId=null,this.lastShapeId=null,this.initTarget()},getRegion:function(a,b,c){var d,e=this.regionMap;for(d=e.length;d--;)if(e[d]!==null&&b>=e[d][0]&&b<=e[d][1])return e[d][2];return undefined},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.yvalues[a]===null,x:this.xvalues[a],y:this.yvalues[a],color:this.options.get("lineColor"),fillColor:this.options.get("fillColor"),offset:a}},renderHighlight:function(){var a=this.currentRegion,b=this.target,c=this.vertices[a],d=this.options,e=d.get("spotRadius"),f=d.get("highlightSpotColor"),g=d.get("highlightLineColor"),h,i;if(!c)return;e&&f&&(h=b.drawCircle(c[0],c[1],e,undefined,f),this.highlightSpotId=h.id,b.insertAfterShape(this.lastShapeId,h)),g&&(i=b.drawLine(c[0],this.canvasTop,c[0],this.canvasTop+this.canvasHeight,g),this.highlightLineId=i.id,b.insertAfterShape(this.lastShapeId,i))},removeHighlight:function(){var a=this.target;this.highlightSpotId&&(a.removeShapeId(this.highlightSpotId),this.highlightSpotId=null),this.highlightLineId&&(a.removeShapeId(this.highlightLineId),this.highlightLineId=null)},scanValues:function(){var a=this.values,b=a.length,c=this.xvalues,d=this.yvalues,e=this.yminmax,f,g,h,i,j;for(f=0;f<b;f++)g=a[f],h=typeof a[f]=="string",i=typeof a[f]=="object"&&a[f]instanceof Array,j=h&&a[f].split(":"),h&&j.length===2?(c.push(Number(j[0])),d.push(Number(j[1])),e.push(Number(j[1]))):i?(c.push(g[0]),d.push(g[1]),e.push(g[1])):(c.push(f),a[f]===null||a[f]==="null"?d.push(null):(d.push(Number(g)),e.push(Number(g))));this.options.get("xvalues")&&(c=this.options.get("xvalues")),this.maxy=this.maxyorg=Math.max.apply(Math,e),this.miny=this.minyorg=Math.min.apply(Math,e),this.maxx=Math.max.apply(Math,c),this.minx=Math.min.apply(Math,c),this.xvalues=c,this.yvalues=d,this.yminmax=e},processRangeOptions:function(){var a=this.options,b=a.get("normalRangeMin"),c=a.get("normalRangeMax");b!==undefined&&(b<this.miny&&(this.miny=b),c>this.maxy&&(this.maxy=c)),a.get("chartRangeMin")!==undefined&&(a.get("chartRangeClip")||a.get("chartRangeMin")<this.miny)&&(this.miny=a.get("chartRangeMin")),a.get("chartRangeMax")!==undefined&&(a.get("chartRangeClip")||a.get("chartRangeMax")>this.maxy)&&(this.maxy=a.get("chartRangeMax")),a.get("chartRangeMinX")!==undefined&&(a.get("chartRangeClipX")||a.get("chartRangeMinX")<this.minx)&&(this.minx=a.get("chartRangeMinX")),a.get("chartRangeMaxX")!==undefined&&(a.get("chartRangeClipX")||a.get("chartRangeMaxX")>this.maxx)&&(this.maxx=a.get("chartRangeMaxX"))},drawNormalRange:function(a,b,c,d,e){var f=this.options.get("normalRangeMin"),g=this.options.get("normalRangeMax"),h=b+Math.round(c-c*((g-this.miny)/e)),i=Math.round(c*(g-f)/e);this.target.drawRect(a,h,d,i,undefined,this.options.get("normalRangeColor")).append()},render:function(){var b=this.options,c=this.target,d=this.canvasWidth,e=this.canvasHeight,f=this.vertices,g=b.get("spotRadius"),h=this.regionMap,i,j,k,l,m,n,o,p,r,s,t,v,w,x,y,z,A,B,C,D,E,F,G,H,I;if(!u._super.render.call(this))return;this.scanValues(),this.processRangeOptions(),G=this.xvalues,H=this.yvalues;if(!this.yminmax.length||this.yvalues.length<2)return;l=m=0,i=this.maxx-this.minx===0?1:this.maxx-this.minx,j=this.maxy-this.miny===0?1:this.maxy-this.miny,k=this.yvalues.length-1,g&&(d<g*4||e<g*4)&&(g=0);if(g){E=b.get("highlightSpotColor")&&!b.get("disableInteraction");if(E||b.get("minSpotColor")||b.get("spotColor")&&H[k]===this.miny)e-=Math.ceil(g);if(E||b.get("maxSpotColor")||b.get("spotColor")&&H[k]===this.maxy)e-=Math.ceil(g),l+=Math.ceil(g);if(E||(b.get("minSpotColor")||b.get("maxSpotColor"))&&(H[0]===this.miny||H[0]===this.maxy))m+=Math.ceil(g),d-=Math.ceil(g);if(E||b.get("spotColor")||b.get("minSpotColor")||b.get("maxSpotColor")&&(H[k]===this.miny||H[k]===this.maxy))d-=Math.ceil(g)}e--,b.get("normalRangeMin")!==undefined&&!b.get("drawNormalOnTop")&&this.drawNormalRange(m,l,e,d,j),o=[],p=[o],x=y=null,z=H.length;for(I=0;I<z;I++)r=G[I],t=G[I+1],s=H[I],v=m+Math.round((r-this.minx)*(d/i)),w=I<z-1?m+Math.round((t-this.minx)*(d/i)):d,y=v+(w-v)/2,h[I]=[x||0,y,I],x=y,s===null?I&&(H[I-1]!==null&&(o=[],p.push(o)),f.push(null)):(s<this.miny&&(s=this.miny),s>this.maxy&&(s=this.maxy),o.length||o.push([v,l+e]),n=[v,l+Math.round(e-e*((s-this.miny)/j))],o.push(n),f.push(n));A=[],B=[],C=p.length;for(I=0;I<C;I++)o=p[I],o.length&&(b.get("fillColor")&&(o.push([o[o.length-1][0],l+e]),B.push(o.slice(0)),o.pop()),o.length>2&&(o[0]=[o[0][0],o[1][1]]),A.push(o));C=B.length;for(I=0;I<C;I++)c.drawShape(B[I],b.get("fillColor"),b.get("fillColor")).append();b.get("normalRangeMin")!==undefined&&b.get("drawNormalOnTop")&&this.drawNormalRange(m,l,e,d,j),C=A.length;for(I=0;I<C;I++)c.drawShape(A[I],b.get("lineColor"),undefined,b.get("lineWidth")).append();if(g&&b.get("valueSpots")){D=b.get("valueSpots"),D.get===undefined&&(D=new q(D));for(I=0;I<z;I++)F=D.get(H[I]),F&&c.drawCircle(m+Math.round((G[I]-this.minx)*(d/i)),l+Math.round(e-e*((H[I]-this.miny)/j)),g,undefined,F).append()}g&&b.get("spotColor")&&c.drawCircle(m+Math.round((G[G.length-1]-this.minx)*(d/i)),l+Math.round(e-e*((H[k]-this.miny)/j)),g,undefined,b.get("spotColor")).append(),this.maxy!==this.minyorg&&(g&&b.get("minSpotColor")&&(r=G[a.inArray(this.minyorg,H)],c.drawCircle(m+Math.round((r-this.minx)*(d/i)),l+Math.round(e-e*((this.minyorg-this.miny)/j)),g,undefined,b.get("minSpotColor")).append()),g&&b.get("maxSpotColor")&&(r=G[a.inArray(this.maxyorg,H)],c.drawCircle(m+Math.round((r-this.minx)*(d/i)),l+Math.round(e-e*((this.maxyorg-this.miny)/j)),g,undefined,b.get("maxSpotColor")).append())),this.lastShapeId=c.getLastShapeId(),this.canvasTop=l,c.render()}}),a.fn.sparkline.bar=v=d(a.fn.sparkline._base,t,{type:"bar",init:function(b,c,d,e,g){var k=parseInt(d.get("barWidth"),10),l=parseInt(d.get("barSpacing"),10),m=d.get("chartRangeMin"),n=d.get("chartRangeMax"),o=d.get("chartRangeClip"),p=Infinity,r=-Infinity,s,t,u,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P;v._super.init.call(this,b,c,d,e,g);for(y=0,z=c.length;y<z;y++){M=c[y],s=typeof M=="string"&&M.indexOf(":")>-1;if(s||a.isArray(M))H=!0,s&&(M=c[y]=i(M.split(":"))),M=j(M,null),t=Math.min.apply(Math,M),u=Math.max.apply(Math,M),t<p&&(p=t),u>r&&(r=u)}this.stacked=H,this.regionShapes={},this.barWidth=k,this.barSpacing=l,this.totalBarWidth=k+l,this.width=e=c.length*k+(c.length-1)*l,this.initTarget(),o&&(F=m===undefined?-Infinity:m,G=n===undefined?Infinity:n),x=[],w=H?[]:x;var Q=[],R=[];for(y=0,z=c.length;y<z;y++)if(H){I=c[y],c[y]=L=[],Q[y]=0,w[y]=R[y]=0;for(J=0,K=I.length;J<K;J++)M=L[J]=o?f(I[J],F,G):I[J],M!==null&&(M>0&&(Q[y]+=M),p<0&&r>0?M<0?R[y]+=Math.abs(M):w[y]+=M:w[y]+=Math.abs(M-(M<0?r:p)),x.push(M))}else M=o?f(c[y],F,G):c[y],M=c[y]=h(M),M!==null&&x.push(M);this.max=E=Math.max.apply(Math,x),this.min=D=Math.min.apply(Math,x),this.stackMax=r=H?Math.max.apply(Math,Q):E,this.stackMin=p=H?Math.min.apply(Math,x):D,d.get("chartRangeMin")!==undefined&&(d.get("chartRangeClip")||d.get("chartRangeMin")<D)&&(D=d.get("chartRangeMin")),d.get("chartRangeMax")!==undefined&&(d.get("chartRangeClip")||d.get("chartRangeMax")>E)&&(E=d.get("chartRangeMax")),this.zeroAxis=B=d.get("zeroAxis",!0),D<=0&&E>=0&&B?C=0:B==0?C=D:D>0?C=D:C=E,this.xaxisOffset=C,A=H?Math.max.apply(Math,w)+Math.max.apply(Math,R):E-D,this.canvasHeightEf=B&&D<0?this.canvasHeight-2:this.canvasHeight-1,D<C?(O=H&&E>=0?r:E,N=(O-C)/A*this.canvasHeight,N!==Math.ceil(N)&&(this.canvasHeightEf-=2,N=Math.ceil(N))):N=this.canvasHeight,this.yoffset=N,a.isArray(d.get("colorMap"))?(this.colorMapByIndex=d.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=d.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===undefined&&(this.colorMapByValue=new q(this.colorMapByValue))),this.range=A},getRegion:function(a,b,c){var d=Math.floor(b/this.totalBarWidth);return d<0||d>=this.values.length?undefined:d},getCurrentRegionFields:function(){var a=this.currentRegion,b=o(this.values[a]),c=[],d,e;for(e=b.length;e--;)d=b[e],c.push({isNull:d===null,value:d,color:this.calcColor(e,d,a),offset:a});return c},calcColor:function(b,c,d){var e=this.colorMapByIndex,f=this.colorMapByValue,g=this.options,h,i;return this.stacked?h=g.get("stackedBarColor"):h=c<0?g.get("negBarColor"):g.get("barColor"),c===0&&g.get("zeroColor")!==undefined&&(h=g.get("zeroColor")),f&&(i=f.get(c))?h=i:e&&e.length>d&&(h=e[d]),a.isArray(h)?h[b%h.length]:h},renderRegion:function(b,c){var d=this.values[b],e=this.options,f=this.xaxisOffset,g=[],h=this.range,i=this.stacked,j=this.target,k=b*this.totalBarWidth,m=this.canvasHeightEf,n=this.yoffset,o,p,q,r,s,t,u,v,w,x;d=a.isArray(d)?d:[d],u=d.length,v=d[0],r=l(null,d),x=l(f,d,!0);if(r)return e.get("nullColor")?(q=c?e.get("nullColor"):this.calcHighlightColor(e.get("nullColor"),e),o=n>0?n-1:n,j.drawRect(k,o,this.barWidth-1,0,q,q)):undefined;s=n;for(t=0;t<u;t++){v=d[t];if(i&&v===f){if(!x||w)continue;w=!0}h>0?p=Math.floor(m*(Math.abs(v-f)/h))+1:p=1,v<f||v===f&&n===0?(o=s,s+=p):(o=n-p,n-=p),q=this.calcColor(t,v,b),c&&(q=this.calcHighlightColor(q,e)),g.push(j.drawRect(k,o,this.barWidth-1,p-1,q,q))}return g.length===1?g[0]:g}}),a.fn.sparkline.tristate=w=d(a.fn.sparkline._base,t,{type:"tristate",init:function(b,c,d,e,f){var g=parseInt(d.get("barWidth"),10),h=parseInt(d.get("barSpacing"),10);w._super.init.call(this,b,c,d,e,f),this.regionShapes={},this.barWidth=g,this.barSpacing=h,this.totalBarWidth=g+h,this.values=a.map(c,Number),this.width=e=c.length*g+(c.length-1)*h,a.isArray(d.get("colorMap"))?(this.colorMapByIndex=d.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=d.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===undefined&&(this.colorMapByValue=new q(this.colorMapByValue))),this.initTarget()},getRegion:function(a,b,c){return Math.floor(b/this.totalBarWidth)},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===undefined,value:this.values[a],color:this.calcColor(this.values[a],a),offset:a}},calcColor:function(a,b){var c=this.values,d=this.options,e=this.colorMapByIndex,f=this.colorMapByValue,g,h;return f&&(h=f.get(a))?g=h:e&&e.length>b?g=e[b]:c[b]<0?g=d.get("negBarColor"):c[b]>0?g=d.get("posBarColor"):g=d.get("zeroBarColor"),g},renderRegion:function(a,b){var c=this.values,d=this.options,e=this.target,f,g,h,i,j,k;f=e.pixelHeight,h=Math.round(f/2),i=a*this.totalBarWidth,c[a]<0?(j=h,g=h-1):c[a]>0?(j=0,g=h-1):(j=h-1,g=2),k=this.calcColor(c[a],a);if(k===null)return;return b&&(k=this.calcHighlightColor(k,d)),e.drawRect(i,j,this.barWidth-1,g-1,k,k)}}),a.fn.sparkline.discrete=x=d(a.fn.sparkline._base,t,{type:"discrete",init:function(b,c,d,e,f){x._super.init.call(this,b,c,d,e,f),this.regionShapes={},this.values=c=a.map(c,Number),this.min=Math.min.apply(Math,c),this.max=Math.max.apply(Math,c),this.range=this.max-this.min,this.width=e=d.get("width")==="auto"?c.length*2:this.width,this.interval=Math.floor(e/c.length),this.itemWidth=e/c.length,d.get("chartRangeMin")!==undefined&&(d.get("chartRangeClip")||d.get("chartRangeMin")<this.min)&&(this.min=d.get("chartRangeMin")),d.get("chartRangeMax")!==undefined&&(d.get("chartRangeClip")||d.get("chartRangeMax")>this.max)&&(this.max=d.get("chartRangeMax")),this.initTarget(),this.target&&(this.lineHeight=d.get("lineHeight")==="auto"?Math.round(this.canvasHeight*.3):d.get("lineHeight"))},getRegion:function(a,b,c){return Math.floor(b/this.itemWidth)},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===undefined,value:this.values[a],offset:a}},renderRegion:function(a,b){var c=this.values,d=this.options,e=this.min,g=this.max,h=this.range,i=this.interval,j=this.target,k=this.canvasHeight,l=this.lineHeight,m=k-l,n,o,p,q;return o=f(c[a],e,g),q=a*i,n=Math.round(m-m*((o-e)/h)),p=d.get("thresholdColor")&&o<d.get("thresholdValue")?d.get("thresholdColor"):d.get("lineColor"),b&&(p=this.calcHighlightColor(p,d)),j.drawLine(q,n,q,n+l,p)}}),a.fn.sparkline.bullet=y=d(a.fn.sparkline._base,{type:"bullet",init:function(a,b,c,d,e){var f,g,h;y._super.init.call(this,a,b,c,d,e),this.values=b=i(b),h=b.slice(),h[0]=h[0]===null?h[2]:h[0],h[1]=b[1]===null?h[2]:h[1],f=Math.min.apply(Math,b),g=Math.max.apply(Math,b),c.get("base")===undefined?f=f<0?f:0:f=c.get("base"),this.min=f,this.max=g,this.range=g-f,this.shapes={},this.valueShapes={},this.regiondata={},this.width=d=c.get("width")==="auto"?"4.0em":d,this.target=this.$el.simpledraw(d,e,c.get("composite")),b.length||(this.disabled=!0),this.initTarget()},getRegion:function(a,b,c){var d=this.target.getShapeAt(a,b,c);return d!==undefined&&this.shapes[d]!==undefined?this.shapes[d]:undefined},getCurrentRegionFields:function(){var a=this.currentRegion;return{fieldkey:a.substr(0,1),value:this.values[a.substr(1)],region:a}},changeHighlight:function(a){var b=this.currentRegion,c=this.valueShapes[b],d;delete this.shapes[c];switch(b.substr(0,1)){case"r":d=this.renderRange(b.substr(1),a);break;case"p":d=this.renderPerformance(a);break;case"t":d=this.renderTarget(a)}this.valueShapes[b]=d.id,this.shapes[d.id]=b,this.target.replaceWithShape(c,d)},renderRange:function(a,b){var c=this.values[a],d=Math.round(this.canvasWidth*((c-this.min)/this.range)),e=this.options.get("rangeColors")[a-2];return b&&(e=this.calcHighlightColor(e,this.options)),this.target.drawRect(0,0,d-1,this.canvasHeight-1,e,e)},renderPerformance:function(a){var b=this.values[1],c=Math.round(this.canvasWidth*((b-this.min)/this.range)),d=this.options.get("performanceColor");return a&&(d=this.calcHighlightColor(d,this.options)),this.target.drawRect(0,Math.round(this.canvasHeight*.3),c-1,Math.round(this.canvasHeight*.4)-1,d,d)},renderTarget:function(a){var b=this.values[0],c=Math.round(this.canvasWidth*((b-this.min)/this.range)-this.options.get("targetWidth")/2),d=Math.round(this.canvasHeight*.1),e=this.canvasHeight-d*2,f=this.options.get("targetColor");return a&&(f=this.calcHighlightColor(f,this.options)),this.target.drawRect(c,d,this.options.get("targetWidth")-1,e-1,f,f)},render:function(){var a=this.values.length,b=this.target,c,d;if(!y._super.render.call(this))return;for(c=2;c<a;c++)d=this.renderRange(c).append(),this.shapes[d.id]="r"+c,this.valueShapes["r"+c]=d.id;this.values[1]!==null&&(d=this.renderPerformance().append(),this.shapes[d.id]="p1",this.valueShapes.p1=d.id),this.values[0]!==null&&(d=this.renderTarget().append(),this.shapes[d.id]="t0",this.valueShapes.t0=d.id),b.render()}}),a.fn.sparkline.pie=z=d(a.fn.sparkline._base,{type:"pie",init:function(b,c,d,e,f){var g=0,h;z._super.init.call(this,b,c,d,e,f),this.shapes={},this.valueShapes={},this.values=c=a.map(c,Number),d.get("width")==="auto"&&(this.width=this.height);if(c.length>0)for(h=c.length;h--;)g+=c[h];this.total=g,this.initTarget(),this.radius=Math.floor(Math.min(this.canvasWidth,this.canvasHeight)/2)},getRegion:function(a,b,c){var d=this.target.getShapeAt(a,b,c);return d!==undefined&&this.shapes[d]!==undefined?this.shapes[d]:undefined},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===undefined,value:this.values[a],percent:this.values[a]/this.total*100,color:this.options.get("sliceColors")[a%this.options.get("sliceColors").length],offset:a}},changeHighlight:function(a){var b=this.currentRegion,c=this.renderSlice(b,a),d=this.valueShapes[b];delete this.shapes[d],this.target.replaceWithShape(d,c),this.valueShapes[b]=c.id,this.shapes[c.id]=b},renderSlice:function(a,b){var c=this.target,d=this.options,e=this.radius,f=d.get("borderWidth"),g=d.get("offset"),h=2*Math.PI,i=this.values,j=this.total,k=g?2*Math.PI*(g/360):0,l,m,n,o,p;o=i.length;for(n=0;n<o;n++){l=k,m=k,j>0&&(m=k+h*(i[n]/j));if(a===n)return p=d.get("sliceColors")[n%d.get("sliceColors").length],b&&(p=this.calcHighlightColor(p,d)),c.drawPieSlice(e,e,e-f,l,m,undefined,p);k=m}},render:function(){var a=this.target,b=this.values,c=this.options,d=this.radius,e=c.get("borderWidth"),f,g;if(!z._super.render.call(this))return;
    e&&a.drawCircle(d,d,Math.floor(d-e/2),c.get("borderColor"),undefined,e).append();for(g=b.length;g--;)b[g]&&(f=this.renderSlice(g).append(),this.valueShapes[g]=f.id,this.shapes[f.id]=g);a.render()}}),a.fn.sparkline.box=A=d(a.fn.sparkline._base,{type:"box",init:function(b,c,d,e,f){A._super.init.call(this,b,c,d,e,f),this.values=a.map(c,Number),this.width=d.get("width")==="auto"?"4.0em":e,this.initTarget(),this.values.length||(this.disabled=1)},getRegion:function(){return 1},getCurrentRegionFields:function(){var a=[{field:"lq",value:this.quartiles[0]},{field:"med",value:this.quartiles[1]},{field:"uq",value:this.quartiles[2]}];return this.loutlier!==undefined&&a.push({field:"lo",value:this.loutlier}),this.routlier!==undefined&&a.push({field:"ro",value:this.routlier}),this.lwhisker!==undefined&&a.push({field:"lw",value:this.lwhisker}),this.rwhisker!==undefined&&a.push({field:"rw",value:this.rwhisker}),a},render:function(){var a=this.target,b=this.values,c=b.length,d=this.options,e=this.canvasWidth,f=this.canvasHeight,h=d.get("chartRangeMin")===undefined?Math.min.apply(Math,b):d.get("chartRangeMin"),i=d.get("chartRangeMax")===undefined?Math.max.apply(Math,b):d.get("chartRangeMax"),j=0,k,l,m,n,o,p,q,r,s,t,u;if(!A._super.render.call(this))return;if(d.get("raw"))d.get("showOutliers")&&b.length>5?(l=b[0],k=b[1],n=b[2],o=b[3],p=b[4],q=b[5],r=b[6]):(k=b[0],n=b[1],o=b[2],p=b[3],q=b[4]);else{b.sort(function(a,b){return a-b}),n=g(b,1),o=g(b,2),p=g(b,3),m=p-n;if(d.get("showOutliers")){k=q=undefined;for(s=0;s<c;s++)k===undefined&&b[s]>n-m*d.get("outlierIQR")&&(k=b[s]),b[s]<p+m*d.get("outlierIQR")&&(q=b[s]);l=b[0],r=b[c-1]}else k=b[0],q=b[c-1]}this.quartiles=[n,o,p],this.lwhisker=k,this.rwhisker=q,this.loutlier=l,this.routlier=r,u=e/(i-h+1),d.get("showOutliers")&&(j=Math.ceil(d.get("spotRadius")),e-=2*Math.ceil(d.get("spotRadius")),u=e/(i-h+1),l<k&&a.drawCircle((l-h)*u+j,f/2,d.get("spotRadius"),d.get("outlierLineColor"),d.get("outlierFillColor")).append(),r>q&&a.drawCircle((r-h)*u+j,f/2,d.get("spotRadius"),d.get("outlierLineColor"),d.get("outlierFillColor")).append()),a.drawRect(Math.round((n-h)*u+j),Math.round(f*.1),Math.round((p-n)*u),Math.round(f*.8),d.get("boxLineColor"),d.get("boxFillColor")).append(),a.drawLine(Math.round((k-h)*u+j),Math.round(f/2),Math.round((n-h)*u+j),Math.round(f/2),d.get("lineColor")).append(),a.drawLine(Math.round((k-h)*u+j),Math.round(f/4),Math.round((k-h)*u+j),Math.round(f-f/4),d.get("whiskerColor")).append(),a.drawLine(Math.round((q-h)*u+j),Math.round(f/2),Math.round((p-h)*u+j),Math.round(f/2),d.get("lineColor")).append(),a.drawLine(Math.round((q-h)*u+j),Math.round(f/4),Math.round((q-h)*u+j),Math.round(f-f/4),d.get("whiskerColor")).append(),a.drawLine(Math.round((o-h)*u+j),Math.round(f*.1),Math.round((o-h)*u+j),Math.round(f*.9),d.get("medianColor")).append(),d.get("target")&&(t=Math.ceil(d.get("spotRadius")),a.drawLine(Math.round((d.get("target")-h)*u+j),Math.round(f/2-t),Math.round((d.get("target")-h)*u+j),Math.round(f/2+t),d.get("targetColor")).append(),a.drawLine(Math.round((d.get("target")-h)*u+j-t),Math.round(f/2),Math.round((d.get("target")-h)*u+j+t),Math.round(f/2),d.get("targetColor")).append()),a.render()}}),a.browser.msie&&document.namespaces&&!document.namespaces.v&&document.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"),a.browser.hasCanvas===undefined&&(a.browser.hasCanvas=document.createElement("canvas").getContext!==undefined),D=d({init:function(a,b,c,d){this.target=a,this.id=b,this.type=c,this.args=d},append:function(){return this.target.appendShape(this),this}}),E=d({_pxregex:/(\d+)(px)?\s*$/i,init:function(b,c,d){if(!b)return;this.width=b,this.height=c,this.target=d,this.lastShapeId=null,d[0]&&(d=d[0]),a.data(d,"_jqs_vcanvas",this)},drawLine:function(a,b,c,d,e,f){return this.drawShape([[a,b],[c,d]],e,f)},drawShape:function(a,b,c,d){return this._genShape("Shape",[a,b,c,d])},drawCircle:function(a,b,c,d,e,f){return this._genShape("Circle",[a,b,c,d,e,f])},drawPieSlice:function(a,b,c,d,e,f,g){return this._genShape("PieSlice",[a,b,c,d,e,f,g])},drawRect:function(a,b,c,d,e,f){return this._genShape("Rect",[a,b,c,d,e,f])},getElement:function(){return this.canvas},getLastShapeId:function(){return this.lastShapeId},reset:function(){alert("reset not implemented")},_insert:function(b,c){a(c).html(b)},_calculatePixelDims:function(b,c,d){var e;e=this._pxregex.exec(c),e?this.pixelHeight=e[1]:this.pixelHeight=a(d).height(),e=this._pxregex.exec(b),e?this.pixelWidth=e[1]:this.pixelWidth=a(d).width()},_genShape:function(a,b){var c=I++;return b.unshift(c),new D(this,c,a,b)},appendShape:function(a){alert("appendShape not implemented")},replaceWithShape:function(a,b){alert("replaceWithShape not implemented")},insertAfterShape:function(a,b){alert("insertAfterShape not implemented")},removeShapeId:function(a){alert("removeShapeId not implemented")},getShapeAt:function(a,b,c){alert("getShapeAt not implemented")},render:function(){alert("render not implemented")}}),F=d(E,{init:function(b,c,d,e){F._super.init.call(this,b,c,d),this.canvas=document.createElement("canvas"),d[0]&&(d=d[0]),a.data(d,"_jqs_vcanvas",this),a(this.canvas).css({display:"inline-block",width:b,height:c,verticalAlign:"top"}),this._insert(this.canvas,d),this._calculatePixelDims(b,c,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,this.interact=e,this.shapes={},this.shapeseq=[],this.currentTargetShapeId=undefined,a(this.canvas).css({width:this.pixelWidth,height:this.pixelHeight})},_getContext:function(a,b,c){var d=this.canvas.getContext("2d");return a!==undefined&&(d.strokeStyle=a),d.lineWidth=c===undefined?1:c,b!==undefined&&(d.fillStyle=b),d},reset:function(){var a=this._getContext();a.clearRect(0,0,this.pixelWidth,this.pixelHeight),this.shapes={},this.shapeseq=[],this.currentTargetShapeId=undefined},_drawShape:function(a,b,c,d,e){var f=this._getContext(c,d,e),g,h;f.beginPath(),f.moveTo(b[0][0]+.5,b[0][1]+.5);for(g=1,h=b.length;g<h;g++)f.lineTo(b[g][0]+.5,b[g][1]+.5);c!==undefined&&f.stroke(),d!==undefined&&f.fill(),this.targetX!==undefined&&this.targetY!==undefined&&f.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a)},_drawCircle:function(a,b,c,d,e,f,g){var h=this._getContext(e,f,g);h.beginPath(),h.arc(b,c,d,0,2*Math.PI,!1),this.targetX!==undefined&&this.targetY!==undefined&&h.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a),e!==undefined&&h.stroke(),f!==undefined&&h.fill()},_drawPieSlice:function(a,b,c,d,e,f,g,h){var i=this._getContext(g,h);i.beginPath(),i.moveTo(b,c),i.arc(b,c,d,e,f,!1),i.lineTo(b,c),i.closePath(),g!==undefined&&i.stroke(),h&&i.fill(),this.targetX!==undefined&&this.targetY!==undefined&&i.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a)},_drawRect:function(a,b,c,d,e,f,g){return this._drawShape(a,[[b,c],[b+d,c],[b+d,c+e],[b,c+e],[b,c]],f,g)},appendShape:function(a){return this.shapes[a.id]=a,this.shapeseq.push(a.id),this.lastShapeId=a.id,a.id},replaceWithShape:function(a,b){var c=this.shapeseq,d;this.shapes[b.id]=b;for(d=c.length;d--;)c[d]==a&&(c[d]=b.id);delete this.shapes[a]},replaceWithShapes:function(a,b){var c=this.shapeseq,d={},e,f,g;for(f=a.length;f--;)d[a[f]]=!0;for(f=c.length;f--;)e=c[f],d[e]&&(c.splice(f,1),delete this.shapes[e],g=f);for(f=b.length;f--;)c.splice(g,0,b[f].id),this.shapes[b[f].id]=b[f]},insertAfterShape:function(a,b){var c=this.shapeseq,d;for(d=c.length;d--;)if(c[d]===a){c.splice(d+1,0,b.id),this.shapes[b.id]=b;return}},removeShapeId:function(a){var b=this.shapeseq,c;for(c=b.length;c--;)if(b[c]===a){b.splice(c,1);break}delete this.shapes[a]},getShapeAt:function(a,b,c){return this.targetX=b,this.targetY=c,this.render(),this.currentTargetShapeId},render:function(){var a=this.shapeseq,b=this.shapes,c=a.length,d=this._getContext(),e,f,g;d.clearRect(0,0,this.pixelWidth,this.pixelHeight);for(g=0;g<c;g++)e=a[g],f=b[e],this["_draw"+f.type].apply(this,f.args);this.interact||(this.shapes={},this.shapeseq=[])}}),G=d(E,{init:function(b,c,d){var e;G._super.init.call(this,b,c,d),d[0]&&(d=d[0]),a.data(d,"_jqs_vcanvas",this),this.canvas=document.createElement("span"),a(this.canvas).css({display:"inline-block",position:"relative",overflow:"hidden",width:b,height:c,margin:"0px",padding:"0px",verticalAlign:"top"}),this._insert(this.canvas,d),this._calculatePixelDims(b,c,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,e='<v:group coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'"'+' style="position:absolute;top:0;left:0;width:'+this.pixelWidth+"px;height="+this.pixelHeight+'px;"></v:group>',this.canvas.insertAdjacentHTML("beforeEnd",e),this.group=a(this.canvas).children()[0],this.rendered=!1,this.prerender=""},_drawShape:function(a,b,c,d,e){var f=[],g,h,i,j,k,l,m;for(m=0,l=b.length;m<l;m++)f[m]=""+b[m][0]+","+b[m][1];return g=f.splice(0,1),e=e===undefined?1:e,h=c===undefined?' stroked="false" ':' strokeWeight="'+e+'px" strokeColor="'+c+'" ',i=d===undefined?' filled="false"':' fillColor="'+d+'" filled="true" ',j=f[0]===f[f.length-1]?"x ":"",k='<v:shape coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+' id="jqsshape'+a+'" '+h+i+' style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;" '+' path="m '+g+" l "+f.join(", ")+" "+j+'e">'+" </v:shape>",k},_drawCircle:function(a,b,c,d,e,f,g){var h,i,j;return b-=d,c-=d,h=e===undefined?' stroked="false" ':' strokeWeight="'+g+'px" strokeColor="'+e+'" ',i=f===undefined?' filled="false"':' fillColor="'+f+'" filled="true" ',j='<v:oval  id="jqsshape'+a+'" '+h+i+' style="position:absolute;top:'+c+"px; left:"+b+"px; width:"+d*2+"px; height:"+d*2+'px"></v:oval>',j},_drawPieSlice:function(a,b,c,d,e,f,g,h){var i,j,k,l,m,n,o,p;if(e===f)return;f-e===2*Math.PI&&(e=0,f=2*Math.PI),j=b+Math.round(Math.cos(e)*d),k=c+Math.round(Math.sin(e)*d),l=b+Math.round(Math.cos(f)*d),m=c+Math.round(Math.sin(f)*d);if(j===l&&k===m&&f-e<Math.PI)return;return i=[b-d,c-d,b+d,c+d,j,k,l,m],n=g===undefined?' stroked="false" ':' strokeWeight="1px" strokeColor="'+g+'" ',o=h===undefined?' filled="false"':' fillColor="'+h+'" filled="true" ',p='<v:shape coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+' id="jqsshape'+a+'" '+n+o+' style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;" '+' path="m '+b+","+c+" wa "+i.join(", ")+' x e">'+" </v:shape>",p},_drawRect:function(a,b,c,d,e,f,g){return this._drawShape(a,[[b,c],[b,c+e],[b+d,c+e],[b+d,c],[b,c]],f,g)},reset:function(){this.group.innerHTML=""},appendShape:function(a){var b=this["_draw"+a.type].apply(this,a.args);return this.rendered?this.group.insertAdjacentHTML("beforeEnd",b):this.prerender+=b,this.lastShapeId=a.id,a.id},replaceWithShape:function(b,c){var d=a("#jqsshape"+b),e=this["_draw"+c.type].apply(this,c.args);d[0].outerHTML=e},replaceWithShapes:function(b,c){var d=a("#jqsshape"+b[0]),e="",f=c.length,g;for(g=0;g<f;g++)e+=this["_draw"+c[g].type].apply(this,c[g].args);d[0].outerHTML=e;for(g=1;g<b.length;g++)a("#jqsshape"+b[g]).remove()},insertAfterShape:function(b,c){var d=a("#jqsshape"+b),e=this["_draw"+c.type].apply(this,c.args);d[0].insertAdjacentHTML("afterEnd",e)},removeShapeId:function(b){var c=a("#jqsshape"+b);this.group.removeChild(c[0])},getShapeAt:function(a,b,c){var d=a.id.substr(8);return d},render:function(){this.rendered||(this.group.innerHTML=this.prerender,this.rendered=!0)}})});
/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*!
 * jQuery Color Animations v@VERSION
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function( jQuery, undefined ) {

	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	// plusequals test for += 100 -= 100
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
	// a set of RE's that can match strings and generate color tuples.
	stringParsers = [{
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ],
					execResult[ 3 ],
					execResult[ 4 ]
				];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ] * 2.55,
					execResult[ 2 ] * 2.55,
					execResult[ 3 ] * 2.55,
					execResult[ 4 ]
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ], 16 )
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
				];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ] / 100,
					execResult[ 3 ] / 100,
					execResult[ 4 ]
				];
			}
		}],

	// jQuery.Color( )
	color = jQuery.Color = function( color, green, blue, alpha ) {
		return new jQuery.Color.fn.parse( color, green, blue, alpha );
	},
	spaces = {
		rgba: {
			props: {
				red: {
					idx: 0,
					type: "byte"
				},
				green: {
					idx: 1,
					type: "byte"
				},
				blue: {
					idx: 2,
					type: "byte"
				}
			}
		},

		hsla: {
			props: {
				hue: {
					idx: 0,
					type: "degrees"
				},
				saturation: {
					idx: 1,
					type: "percent"
				},
				lightness: {
					idx: 2,
					type: "percent"
				}
			}
		}
	},
	propTypes = {
		"byte": {
			floor: true,
			max: 255
		},
		"percent": {
			max: 1
		},
		"degrees": {
			mod: 360,
			floor: true
		}
	},
	support = color.support = {},

	// element for support tests
	supportElem = jQuery( "<p>" )[ 0 ],

	// colors = jQuery.Color.names
	colors,

	// local aliases of functions called often
	each = jQuery.each;

// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
	space.cache = "_" + spaceName;
	space.props.alpha = {
		idx: 3,
		type: "percent",
		def: 1
	};
});

function clamp( value, prop, allowEmpty ) {
	var type = propTypes[ prop.type ] || {};

	if ( value == null ) {
		return (allowEmpty || !prop.def) ? null : prop.def;
	}

	// ~~ is an short way of doing floor for positive numbers
	value = type.floor ? ~~value : parseFloat( value );

	// IE will pass in empty strings as value for alpha,
	// which will hit this case
	if ( isNaN( value ) ) {
		return prop.def;
	}

	if ( type.mod ) {
		// we add mod before modding to make sure that negatives values
		// get converted properly: -10 -> 350
		return (value + type.mod) % type.mod;
	}

	// for now all property types without mod have min and max
	return 0 > value ? 0 : type.max < value ? type.max : value;
}

function stringParse( string ) {
	var inst = color(),
		rgba = inst._rgba = [];

	string = string.toLowerCase();

	each( stringParsers, function( i, parser ) {
		var parsed,
			match = parser.re.exec( string ),
			values = match && parser.parse( match ),
			spaceName = parser.space || "rgba";

		if ( values ) {
			parsed = inst[ spaceName ]( values );

			// if this was an rgba parse the assignment might happen twice
			// oh well....
			inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
			rgba = inst._rgba = parsed._rgba;

			// exit each( stringParsers ) here because we matched
			return false;
		}
	});

	// Found a stringParser that handled it
	if ( rgba.length ) {

		// if this came from a parsed string, force "transparent" when alpha is 0
		// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
		if ( rgba.join() === "0,0,0,0" ) {
			jQuery.extend( rgba, colors.transparent );
		}
		return inst;
	}

	// named colors
	return colors[ string ];
}

color.fn = jQuery.extend( color.prototype, {
	parse: function( red, green, blue, alpha ) {
		if ( red === undefined ) {
			this._rgba = [ null, null, null, null ];
			return this;
		}
		if ( red.jquery || red.nodeType ) {
			red = jQuery( red ).css( green );
			green = undefined;
		}

		var inst = this,
			type = jQuery.type( red ),
			rgba = this._rgba = [];

		// more than 1 argument specified - assume ( red, green, blue, alpha )
		if ( green !== undefined ) {
			red = [ red, green, blue, alpha ];
			type = "array";
		}

		if ( type === "string" ) {
			return this.parse( stringParse( red ) || colors._default );
		}

		if ( type === "array" ) {
			each( spaces.rgba.props, function( key, prop ) {
				rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
			});
			return this;
		}

		if ( type === "object" ) {
			if ( red instanceof color ) {
				each( spaces, function( spaceName, space ) {
					if ( red[ space.cache ] ) {
						inst[ space.cache ] = red[ space.cache ].slice();
					}
				});
			} else {
				each( spaces, function( spaceName, space ) {
					var cache = space.cache;
					each( space.props, function( key, prop ) {

						// if the cache doesn't exist, and we know how to convert
						if ( !inst[ cache ] && space.to ) {

							// if the value was null, we don't need to copy it
							// if the key was alpha, we don't need to copy it either
							if ( key === "alpha" || red[ key ] == null ) {
								return;
							}
							inst[ cache ] = space.to( inst._rgba );
						}

						// this is the only case where we allow nulls for ALL properties.
						// call clamp with alwaysAllowEmpty
						inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
					});

					// everything defined but alpha?
					if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
						// use the default of 1
						inst[ cache ][ 3 ] = 1;
						if ( space.from ) {
							inst._rgba = space.from( inst[ cache ] );
						}
					}
				});
			}
			return this;
		}
	},
	is: function( compare ) {
		var is = color( compare ),
			same = true,
			inst = this;

		each( spaces, function( _, space ) {
			var localCache,
				isCache = is[ space.cache ];
			if (isCache) {
				localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
				each( space.props, function( _, prop ) {
					if ( isCache[ prop.idx ] != null ) {
						same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
						return same;
					}
				});
			}
			return same;
		});
		return same;
	},
	_space: function() {
		var used = [],
			inst = this;
		each( spaces, function( spaceName, space ) {
			if ( inst[ space.cache ] ) {
				used.push( spaceName );
			}
		});
		return used.pop();
	},
	transition: function( other, distance ) {
		var end = color( other ),
			spaceName = end._space(),
			space = spaces[ spaceName ],
			startColor = this.alpha() === 0 ? color( "transparent" ) : this,
			start = startColor[ space.cache ] || space.to( startColor._rgba ),
			result = start.slice();

		end = end[ space.cache ];
		each( space.props, function( key, prop ) {
			var index = prop.idx,
				startValue = start[ index ],
				endValue = end[ index ],
				type = propTypes[ prop.type ] || {};

			// if null, don't override start value
			if ( endValue === null ) {
				return;
			}
			// if null - use end
			if ( startValue === null ) {
				result[ index ] = endValue;
			} else {
				if ( type.mod ) {
					if ( endValue - startValue > type.mod / 2 ) {
						startValue += type.mod;
					} else if ( startValue - endValue > type.mod / 2 ) {
						startValue -= type.mod;
					}
				}
				result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
			}
		});
		return this[ spaceName ]( result );
	},
	blend: function( opaque ) {
		// if we are already opaque - return ourself
		if ( this._rgba[ 3 ] === 1 ) {
			return this;
		}

		var rgb = this._rgba.slice(),
			a = rgb.pop(),
			blend = color( opaque )._rgba;

		return color( jQuery.map( rgb, function( v, i ) {
			return ( 1 - a ) * blend[ i ] + a * v;
		}));
	},
	toRgbaString: function() {
		var prefix = "rgba(",
			rgba = jQuery.map( this._rgba, function( v, i ) {
				return v == null ? ( i > 2 ? 1 : 0 ) : v;
			});

		if ( rgba[ 3 ] === 1 ) {
			rgba.pop();
			prefix = "rgb(";
		}

		return prefix + rgba.join() + ")";
	},
	toHslaString: function() {
		var prefix = "hsla(",
			hsla = jQuery.map( this.hsla(), function( v, i ) {
				if ( v == null ) {
					v = i > 2 ? 1 : 0;
				}

				// catch 1 and 2
				if ( i && i < 3 ) {
					v = Math.round( v * 100 ) + "%";
				}
				return v;
			});

		if ( hsla[ 3 ] === 1 ) {
			hsla.pop();
			prefix = "hsl(";
		}
		return prefix + hsla.join() + ")";
	},
	toHexString: function( includeAlpha ) {
		var rgba = this._rgba.slice(),
			alpha = rgba.pop();

		if ( includeAlpha ) {
			rgba.push( ~~( alpha * 255 ) );
		}

		return "#" + jQuery.map( rgba, function( v ) {

			// default to 0 when nulls exist
			v = ( v || 0 ).toString( 16 );
			return v.length === 1 ? "0" + v : v;
		}).join("");
	},
	toString: function() {
		return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
	}
});
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

function hue2rgb( p, q, h ) {
	h = ( h + 1 ) % 1;
	if ( h * 6 < 1 ) {
		return p + (q - p) * h * 6;
	}
	if ( h * 2 < 1) {
		return q;
	}
	if ( h * 3 < 2 ) {
		return p + (q - p) * ((2/3) - h) * 6;
	}
	return p;
}

spaces.hsla.to = function ( rgba ) {
	if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
		return [ null, null, null, rgba[ 3 ] ];
	}
	var r = rgba[ 0 ] / 255,
		g = rgba[ 1 ] / 255,
		b = rgba[ 2 ] / 255,
		a = rgba[ 3 ],
		max = Math.max( r, g, b ),
		min = Math.min( r, g, b ),
		diff = max - min,
		add = max + min,
		l = add * 0.5,
		h, s;

	if ( min === max ) {
		h = 0;
	} else if ( r === max ) {
		h = ( 60 * ( g - b ) / diff ) + 360;
	} else if ( g === max ) {
		h = ( 60 * ( b - r ) / diff ) + 120;
	} else {
		h = ( 60 * ( r - g ) / diff ) + 240;
	}

	// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
	// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
	if ( diff === 0 ) {
		s = 0;
	} else if ( l <= 0.5 ) {
		s = diff / add;
	} else {
		s = diff / ( 2 - add );
	}
	return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function ( hsla ) {
	if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
		return [ null, null, null, hsla[ 3 ] ];
	}
	var h = hsla[ 0 ] / 360,
		s = hsla[ 1 ],
		l = hsla[ 2 ],
		a = hsla[ 3 ],
		q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
		p = 2 * l - q;

	return [
		Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
		Math.round( hue2rgb( p, q, h ) * 255 ),
		Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
		a
	];
};


each( spaces, function( spaceName, space ) {
	var props = space.props,
		cache = space.cache,
		to = space.to,
		from = space.from;

	// makes rgba() and hsla()
	color.fn[ spaceName ] = function( value ) {

		// generate a cache for this space if it doesn't exist
		if ( to && !this[ cache ] ) {
			this[ cache ] = to( this._rgba );
		}
		if ( value === undefined ) {
			return this[ cache ].slice();
		}

		var ret,
			type = jQuery.type( value ),
			arr = ( type === "array" || type === "object" ) ? value : arguments,
			local = this[ cache ].slice();

		each( props, function( key, prop ) {
			var val = arr[ type === "object" ? key : prop.idx ];
			if ( val == null ) {
				val = local[ prop.idx ];
			}
			local[ prop.idx ] = clamp( val, prop );
		});

		if ( from ) {
			ret = color( from( local ) );
			ret[ cache ] = local;
			return ret;
		} else {
			return color( local );
		}
	};

	// makes red() green() blue() alpha() hue() saturation() lightness()
	each( props, function( key, prop ) {
		// alpha is included in more than one space
		if ( color.fn[ key ] ) {
			return;
		}
		color.fn[ key ] = function( value ) {
			var vtype = jQuery.type( value ),
				fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
				local = this[ fn ](),
				cur = local[ prop.idx ],
				match;

			if ( vtype === "undefined" ) {
				return cur;
			}

			if ( vtype === "function" ) {
				value = value.call( this, cur );
				vtype = jQuery.type( value );
			}
			if ( value == null && prop.empty ) {
				return this;
			}
			if ( vtype === "string" ) {
				match = rplusequals.exec( value );
				if ( match ) {
					value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
				}
			}
			local[ prop.idx ] = value;
			return this[ fn ]( local );
		};
	});
});

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
	var hooks = hook.split( " " );
	each( hooks, function( i, hook ) {
		jQuery.cssHooks[ hook ] = {
			set: function( elem, value ) {
				var parsed, curElem,
					backgroundColor = "";

				if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
					value = color( parsed || value );
					if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
						curElem = hook === "backgroundColor" ? elem.parentNode : elem;
						while (
							(backgroundColor === "" || backgroundColor === "transparent") &&
							curElem && curElem.style
						) {
							try {
								backgroundColor = jQuery.css( curElem, "backgroundColor" );
								curElem = curElem.parentNode;
							} catch ( e ) {
							}
						}

						value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
							backgroundColor :
							"_default" );
					}

					value = value.toRgbaString();
				}
				try {
					elem.style[ hook ] = value;
				} catch( e ) {
					// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
				}
			}
		};
		jQuery.fx.step[ hook ] = function( fx ) {
			if ( !fx.colorInit ) {
				fx.start = color( fx.elem, hook );
				fx.end = color( fx.end );
				fx.colorInit = true;
			}
			jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
		};
	});

};

color.hook( stepHooks );

jQuery.cssHooks.borderColor = {
	expand: function( value ) {
		var expanded = {};

		each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
			expanded[ "border" + part + "Color" ] = value;
		});
		return expanded;
	}
};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
	// 4.1. Basic color keywords
	aqua: "#00ffff",
	black: "#000000",
	blue: "#0000ff",
	fuchsia: "#ff00ff",
	gray: "#808080",
	green: "#008000",
	lime: "#00ff00",
	maroon: "#800000",
	navy: "#000080",
	olive: "#808000",
	purple: "#800080",
	red: "#ff0000",
	silver: "#c0c0c0",
	teal: "#008080",
	white: "#ffffff",
	yellow: "#ffff00",

	// 4.2.3. "transparent" color keyword
	transparent: [ null, null, null, 0 ],

	_default: "#ffffff"
};

}( jQuery ));

(function(h){var f={pint:/[\d]/,"int":/[\d\-]/,pnum:/[\d\.]/,money:/[\d\.\s,]/,num:/[\d\-\.]/,hex:/[0-9a-f]/i,email:/[a-z0-9_\.\-@]/i,alpha:/[a-z_]/i,alphanum:/[a-z0-9_]/i};var c={TAB:9,RETURN:13,ESC:27,BACKSPACE:8,DELETE:46};var a={63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35};var e=function(j){var i=j.keyCode;i=h.browser.safari?(a[i]||i):i;return(i>=33&&i<=40)||i==c.RETURN||i==c.TAB||i==c.ESC};var d=function(j){var i=j.keyCode;var l=j.charCode;return i==9||i==13||(i==40&&(!h.browser.opera||!j.shiftKey))||i==27||i==16||i==17||(i>=18&&i<=20)||(h.browser.opera&&!j.shiftKey&&(i==8||(i>=33&&i<=35)||(i>=36&&i<=39)||(i>=44&&i<=45)))};var b=function(j){var i=j.keyCode||j.charCode;return h.browser.safari?(a[i]||i):i};var g=function(i){return i.charCode||i.keyCode||i.which};h.fn.keyfilter=function(i){return this.keypress(function(m){if(m.ctrlKey||m.altKey){return}var j=b(m);if(h.browser.mozilla&&(e(m)||j==c.BACKSPACE||(j==c.DELETE&&m.charCode==0))){return}var o=g(m),n=String.fromCharCode(o),l=true;if(!h.browser.mozilla&&(d(m)||!n)){return}if(h.isFunction(i)){l=i.call(this,n)}else{l=i.test(n)}if(!l){m.preventDefault()}})};h.extend(h.fn.keyfilter,{defaults:{masks:f},version:1.7});h(document).ready(function(){var i=h("input[class*=mask],textarea[class*=mask]");for(var j in h.fn.keyfilter.defaults.masks){i.filter(".mask-"+j).keyfilter(h.fn.keyfilter.defaults.masks[j])}})})(jQuery);
;
(function(n){
    function F_Base64(){
        // private property
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }

    // public method for encoding
    F_Base64.prototype.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = this._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    };

    // public method for decoding
    F_Base64.prototype.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = this._utf8_decode(output);

        return output;
    };

    // private method for UTF-8 encoding
    F_Base64.prototype._utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    // private method for UTF-8 decoding
    F_Base64.prototype._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    };

    window.LpmBase64 = new F_Base64();
})();
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

!function(e){function t(a,n){return this instanceof t?(e.isPlainObject(a)?n=a:(n=n||{},n.alias=a),this.el=void 0,this.opts=e.extend(!0,{},this.defaults,n),this.maskset=void 0,this.noMasksCache=n&&void 0!==n.definitions,this.userOptions=n||{},this.events={},this.dataAttribute="data-inputmask",this.isRTL=this.opts.numericInput,void i(this.opts.alias,n,this.opts)):new t(a,n)}function i(t,a,n){var r=n.aliases[t];return r?(r.alias&&i(r.alias,void 0,n),e.extend(!0,n,r),e.extend(!0,n,a),!0):(null===n.mask&&(n.mask=t),!1)}function a(i,a){function n(i,n,r){if(null!==i&&""!==i){if(1===i.length&&r.greedy===!1&&0!==r.repeat&&(r.placeholder=""),r.repeat>0||"*"===r.repeat||"+"===r.repeat){var o="*"===r.repeat?0:"+"===r.repeat?1:r.repeat;i=r.groupmarker.start+i+r.groupmarker.end+r.quantifiermarker.start+o+","+r.repeat+r.quantifiermarker.end}var s;return void 0===t.prototype.masksCache[i]||a===!0?(s={mask:i,maskToken:t.prototype.analyseMask(i,r),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:n,maskLength:void 0},a!==!0&&(t.prototype.masksCache[r.numericInput?i.split("").reverse().join(""):i]=s,s=e.extend(!0,{},t.prototype.masksCache[r.numericInput?i.split("").reverse().join(""):i]))):s=e.extend(!0,{},t.prototype.masksCache[r.numericInput?i.split("").reverse().join(""):i]),s}}var r;if(e.isFunction(i.mask)&&(i.mask=i.mask(i)),e.isArray(i.mask)){if(i.mask.length>1){i.keepStatic=null===i.keepStatic||i.keepStatic;var o=i.groupmarker.start;return e.each(i.numericInput?i.mask.reverse():i.mask,function(t,a){o.length>1&&(o+=i.groupmarker.end+i.alternatormarker+i.groupmarker.start),o+=void 0===a.mask||e.isFunction(a.mask)?a:a.mask}),o+=i.groupmarker.end,n(o,i.mask,i)}i.mask=i.mask.pop()}return i.mask&&(r=void 0===i.mask.mask||e.isFunction(i.mask.mask)?n(i.mask,i.mask,i):n(i.mask.mask,i.mask,i)),r}function n(i,a,r){function c(e,t,i){t=t||0;var a,n,o,s=[],l=0,u=f();V=void 0!==W?W.maxLength:void 0,V===-1&&(V=void 0);do e===!0&&p().validPositions[l]?(o=p().validPositions[l],n=o.match,a=o.locator.slice(),s.push(i===!0?o.input:i===!1?n.nativeDef:_(l,n))):(o=v(l,a,l-1),n=o.match,a=o.locator.slice(),(r.jitMasking===!1||l<u||"number"==typeof r.jitMasking&&isFinite(r.jitMasking)&&r.jitMasking>l)&&s.push(i===!1?n.nativeDef:_(l,n))),l++;while((void 0===V||l<V)&&(null!==n.fn||""!==n.def)||t>l);return""===s[s.length-1]&&s.pop(),p().maskLength=l+1,s}function p(){return a}function d(e){var t=p();t.buffer=void 0,e!==!0&&(t._buffer=void 0,t.validPositions={},t.p=0)}function f(e,t,i){var a=-1,n=-1,r=i||p().validPositions;void 0===e&&(e=-1);for(var o in r){var s=parseInt(o);r[s]&&(t||null!==r[s].match.fn)&&(s<=e&&(a=s),s>=e&&(n=s))}return a!==-1&&e-a>1||n<e?a:n}function m(t,i,a,n){function o(e){var t=p().validPositions[e];if(void 0!==t&&null===t.match.fn){var i=p().validPositions[e-1],a=p().validPositions[e+1];return void 0!==i&&void 0!==a}return!1}var s,l=t,u=e.extend(!0,{},p().validPositions),c=!1;for(p().p=t,s=i-1;s>=l;s--)void 0!==p().validPositions[s]&&(a!==!0&&(!p().validPositions[s].match.optionality&&o(s)||r.canClearPosition(p(),s,f(),n,r)===!1)||delete p().validPositions[s]);for(d(!0),s=l+1;s<=f();){for(;void 0!==p().validPositions[l];)l++;if(s<l&&(s=l+1),void 0===p().validPositions[s]&&E(s))s++;else{var m=v(s);c===!1&&u[l]&&u[l].match.def===m.match.def?(p().validPositions[l]=e.extend(!0,{},u[l]),p().validPositions[l].input=m.input,delete p().validPositions[s],s++):y(l,m.match.def)?A(l,m.input||_(s),!0)!==!1&&(delete p().validPositions[s],s++,c=!0):E(s)||(s++,l--),l++}}d(!0)}function h(e,t){for(var i,a=e,n=f(),o=p().validPositions[n]||k(0)[0],s=void 0!==o.alternation?o.locator[o.alternation].toString().split(","):[],l=0;l<a.length&&(i=a[l],!(i.match&&(r.greedy&&i.match.optionalQuantifier!==!0||(i.match.optionality===!1||i.match.newBlockMarker===!1)&&i.match.optionalQuantifier!==!0)&&(void 0===o.alternation||o.alternation!==i.alternation||void 0!==i.locator[o.alternation]&&S(i.locator[o.alternation].toString().split(","),s)))||t===!0&&(null!==i.match.fn||/[0-9a-bA-Z]/.test(i.match.def)));l++);return i}function v(e,t,i){return p().validPositions[e]||h(k(e,t?t.slice():t,i))}function g(e){return p().validPositions[e]?p().validPositions[e]:k(e)[0]}function y(e,t){for(var i=!1,a=k(e),n=0;n<a.length;n++)if(a[n].match&&a[n].match.def===t){i=!0;break}return i}function k(t,i,a){function n(i,a,o,s){function u(o,s,d){function h(t,i){var a=0===e.inArray(t,i.matches);return a||e.each(i.matches,function(e,n){if(n.isQuantifier===!0&&(a=h(t,i.matches[e-1])))return!1}),a}function g(t,i,a){var n,r;return(p().tests[t]||p().validPositions[t])&&e.each(p().tests[t]||[p().validPositions[t]],function(e,t){var o=void 0!==a?a:t.alternation,s=void 0!==t.locator[o]?t.locator[o].toString().indexOf(i):-1;(void 0===r||s<r)&&s!==-1&&(n=t,r=s)}),n?n.locator.slice((void 0!==a?a:n.alternation)+1):void 0!==a?g(t,i):void 0}function y(e,i){return null===e.match.fn&&null!==i.match.fn&&i.match.fn.test(e.match.def,p(),t,!1,r,!1)}if(c>1e4)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+p().mask;if(c===t&&void 0===o.matches)return f.push({match:o,locator:s.reverse(),cd:v}),!0;if(void 0!==o.matches){if(o.isGroup&&d!==o){if(o=u(i.matches[e.inArray(o,i.matches)+1],s))return!0}else if(o.isOptional){var k=o;if(o=n(o,a,s,d)){if(l=f[f.length-1].match,!h(l,k))return!0;m=!0,c=t}}else if(o.isAlternator){var x,b=o,P=[],w=f.slice(),S=s.length,A=a.length>0?a.shift():-1;if(A===-1||"string"==typeof A){var E,C=c,R=a.slice(),M=[];if("string"==typeof A)M=A.split(",");else for(E=0;E<b.matches.length;E++)M.push(E);for(var O=0;O<M.length;O++){if(E=parseInt(M[O]),f=[],a=g(c,E,S)||R.slice(),o=u(b.matches[E]||i.matches[E],[E].concat(s),d)||o,o!==!0&&void 0!==o&&M[M.length-1]<b.matches.length){var _=e.inArray(o,i.matches)+1;i.matches.length>_&&(o=u(i.matches[_],[_].concat(s.slice(1,s.length)),d),o&&(M.push(_.toString()),e.each(f,function(e,t){t.alternation=s.length-1})))}x=f.slice(),c=C,f=[];for(var I=0;I<x.length;I++){var j=x[I],D=!1;j.alternation=j.alternation||S;for(var F=0;F<P.length;F++){var N=P[F];if(("string"!=typeof A||e.inArray(j.locator[j.alternation].toString(),M)!==-1)&&(j.match.def===N.match.def||y(j,N))){D=j.match.nativeDef===N.match.nativeDef,j.alternation==N.alternation&&N.locator[N.alternation].toString().indexOf(j.locator[j.alternation])===-1&&(N.locator[N.alternation]=N.locator[N.alternation]+","+j.locator[j.alternation],N.alternation=j.alternation,null==j.match.fn&&(N.na=N.na||j.locator[j.alternation].toString(),N.na.indexOf(j.locator[j.alternation])===-1&&(N.na=N.na+","+j.locator[j.alternation])));break}}D||P.push(j)}}"string"==typeof A&&(P=e.map(P,function(t,i){if(isFinite(i)){var a,n=t.alternation,r=t.locator[n].toString().split(",");t.locator[n]=void 0,t.alternation=void 0;for(var o=0;o<r.length;o++)a=e.inArray(r[o],M)!==-1,a&&(void 0!==t.locator[n]?(t.locator[n]+=",",t.locator[n]+=r[o]):t.locator[n]=parseInt(r[o]),t.alternation=n);if(void 0!==t.locator[n])return t}})),f=w.concat(P),c=t,m=f.length>0,a=R.slice()}else o=u(b.matches[A]||i.matches[A],[A].concat(s),d);if(o)return!0}else if(o.isQuantifier&&d!==i.matches[e.inArray(o,i.matches)-1])for(var T=o,G=a.length>0?a.shift():0;G<(isNaN(T.quantifier.max)?G+1:T.quantifier.max)&&c<=t;G++){var B=i.matches[e.inArray(T,i.matches)-1];if(o=u(B,[G].concat(s),B)){if(l=f[f.length-1].match,l.optionalQuantifier=G>T.quantifier.min-1,h(l,B)){if(G>T.quantifier.min-1){m=!0,c=t;break}return!0}return!0}}else if(o=n(o,a,s,d))return!0}else c++}for(var d=a.length>0?a.shift():0;d<i.matches.length;d++)if(i.matches[d].isQuantifier!==!0){var h=u(i.matches[d],[d].concat(o),s);if(h&&c===t)return h;if(c>t)break}}function o(t){var i=[];return e.isArray(t)||(t=[t]),t.length>0&&(void 0===t[0].alternation?(i=h(t.slice()).locator.slice(),0===i.length&&(i=t[0].locator.slice())):e.each(t,function(e,t){if(""!==t.def)if(0===i.length)i=t.locator.slice();else for(var a=0;a<i.length;a++)t.locator[a]&&i[a].toString().indexOf(t.locator[a])===-1&&(i[a]+=","+t.locator[a])})),i}function s(e){return r.keepStatic&&t>0&&e.length>1+(""===e[e.length-1].match.def?1:0)&&e[0].match.optionality!==!0&&e[0].match.optionalQuantifier!==!0&&null===e[0].match.fn&&!/[0-9a-bA-Z]/.test(e[0].match.def)?[h(e)]:e}var l,u=p().maskToken,c=i?a:0,d=i?i.slice():[0],f=[],m=!1,v=i?i.join(""):"";if(t>-1){if(void 0===i){for(var g,y=t-1;void 0===(g=p().validPositions[y]||p().tests[y])&&y>-1;)y--;void 0!==g&&y>-1&&(d=o(g),v=d.join(""),c=y)}if(p().tests[t]&&p().tests[t][0].cd===v)return s(p().tests[t]);for(var k=d.shift();k<u.length;k++){var x=n(u[k],d,[k]);if(x&&c===t||c>t)break}}return(0===f.length||m)&&f.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:"",placeholder:""},locator:[],cd:v}),void 0!==i&&p().tests[t]?s(e.extend(!0,[],f)):(p().tests[t]=e.extend(!0,[],f),s(p().tests[t]))}function x(){return void 0===p()._buffer&&(p()._buffer=c(!1,1),void 0===p().buffer&&p()._buffer.slice()),p()._buffer}function b(e){return void 0!==p().buffer&&e!==!0||(p().buffer=c(!0,f(),!0)),p().buffer}function P(e,t,i){var a;if(e===!0)d(),e=0,t=i.length;else for(a=e;a<t;a++)delete p().validPositions[a];for(a=e;a<t;a++)d(!0),i[a]!==r.skipOptionalPartCharacter&&A(a,i[a],!0,!0)}function w(e,i,a){switch(r.casing||i.casing){case"upper":e=e.toUpperCase();break;case"lower":e=e.toLowerCase();break;case"title":var n=p().validPositions[a-1];e=0===a||n&&n.input===String.fromCharCode(t.keyCode.SPACE)?e.toUpperCase():e.toLowerCase()}return e}function S(t,i){for(var a=r.greedy?i:i.slice(0,1),n=!1,o=0;o<t.length;o++)if(e.inArray(t[o],a)!==-1){n=!0;break}return n}function A(i,a,n,o,s){function l(e){var t=q?e.begin-e.end>1||e.begin-e.end===1&&r.insertMode:e.end-e.begin>1||e.end-e.begin===1&&r.insertMode;return t&&0===e.begin&&e.end===p().maskLength?"full":t}function u(t,a,n){var s=!1;return e.each(k(t),function(u,c){for(var h=c.match,v=a?1:0,g="",y=h.cardinality;y>v;y--)g+=M(t-(y-1));if(a&&(g+=a),b(!0),s=null!=h.fn?h.fn.test(g,p(),t,n,r,l(i)):(a===h.def||a===r.skipOptionalPartCharacter)&&""!==h.def&&{c:h.placeholder||h.def,pos:t},s!==!1){var k=void 0!==s.c?s.c:a;k=k===r.skipOptionalPartCharacter&&null===h.fn?h.placeholder||h.def:k;var S=t,E=b();if(void 0!==s.remove&&(e.isArray(s.remove)||(s.remove=[s.remove]),e.each(s.remove.sort(function(e,t){return t-e}),function(e,t){m(t,t+1,!0)})),void 0!==s.insert&&(e.isArray(s.insert)||(s.insert=[s.insert]),e.each(s.insert.sort(function(e,t){return e-t}),function(e,t){A(t.pos,t.c,!0,o)})),s.refreshFromBuffer){var C=s.refreshFromBuffer;if(n=!0,P(C===!0?C:C.start,C.end,E),void 0===s.pos&&void 0===s.c)return s.pos=f(),!1;if(S=void 0!==s.pos?s.pos:t,S!==t)return s=e.extend(s,A(S,k,!0,o)),!1}else if(s!==!0&&void 0!==s.pos&&s.pos!==t&&(S=s.pos,P(t,S,b().slice()),S!==t))return s=e.extend(s,A(S,k,!0)),!1;return(s===!0||void 0!==s.pos||void 0!==s.c)&&(u>0&&d(!0),x(S,e.extend({},c,{input:w(k,h,S)}),o,l(i))||(s=!1),!1)}}),s}function c(t,i,a){var n,s,l,u,c,m,h,v,g=e.extend(!0,{},p().validPositions),y=!1,x=f();for(u=p().validPositions[x];x>=0;x--)if(l=p().validPositions[x],l&&void 0!==l.alternation){if(n=x,s=p().validPositions[n].alternation,u.locator[l.alternation]!==l.locator[l.alternation])break;u=l}if(void 0!==s){v=parseInt(n);var b=void 0!==u.locator[u.alternation||s]?u.locator[u.alternation||s]:h[0];b.length>0&&(b=b.split(",")[0]);var P=p().validPositions[v],w=p().validPositions[v-1];e.each(k(v,w?w.locator:void 0,v-1),function(n,l){h=l.locator[s]?l.locator[s].toString().split(","):[];for(var u=0;u<h.length;u++){var k=[],x=0,w=0,S=!1;if(b<h[u]&&(void 0===l.na||e.inArray(h[u],l.na.split(","))===-1)){p().validPositions[v]=e.extend(!0,{},l);var E=p().validPositions[v].locator;for(p().validPositions[v].locator[s]=parseInt(h[u]),null==l.match.fn?(P.input!==l.match.def&&(S=!0,P.generatedInput!==!0&&k.push(P.input)),w++,p().validPositions[v].generatedInput=!/[0-9a-bA-Z]/.test(l.match.def),p().validPositions[v].input=l.match.def):p().validPositions[v].input=P.input,c=v+1;c<f(void 0,!0)+1;c++)m=p().validPositions[c],m&&m.generatedInput!==!0&&/[0-9a-bA-Z]/.test(m.input)?k.push(m.input):c<t&&x++,delete p().validPositions[c];for(S&&k[0]===l.match.def&&k.shift(),d(!0),y=!0;k.length>0;){var C=k.shift();if(C!==r.skipOptionalPartCharacter&&!(y=A(f(void 0,!0)+1,C,!1,o,!0)))break}if(y){p().validPositions[v].locator=E;var R=f(t)+1;for(c=v+1;c<f()+1;c++)m=p().validPositions[c],(void 0===m||null==m.match.fn)&&c<t+(w-x)&&w++;t+=w-x,y=A(t>R?R:t,i,a,o,!0)}if(y)return!1;d(),p().validPositions=e.extend(!0,{},g)}}})}return y}function g(t,i){var a=p().validPositions[i];if(a)for(var n=a.locator,r=n.length,o=t;o<i;o++)if(void 0===p().validPositions[o]&&!E(o,!0)){var s=k(o),l=s[0],u=-1;e.each(s,function(e,t){for(var i=0;i<r&&void 0!==t.locator[i]&&S(t.locator[i].toString().split(","),n[i].toString().split(","));i++)u<i&&(u=i,l=t)}),x(o,e.extend({},l,{input:l.match.placeholder||l.match.def}),!0)}}function x(t,i,a,n){if(n||r.insertMode&&void 0!==p().validPositions[t]&&void 0===a){var o,s=e.extend(!0,{},p().validPositions),l=f(void 0,!0);for(o=t;o<=l;o++)delete p().validPositions[o];p().validPositions[t]=e.extend(!0,{},i);var u,c=!0,m=p().validPositions,h=!1,v=p().maskLength;for(o=u=t;o<=l;o++){var g=s[o];if(void 0!==g)for(var k=u;k<p().maskLength&&(null===g.match.fn&&m[o]&&(m[o].match.optionalQuantifier===!0||m[o].match.optionality===!0)||null!=g.match.fn);){if(k++,h===!1&&s[k]&&s[k].match.def===g.match.def)p().validPositions[k]=e.extend(!0,{},s[k]),p().validPositions[k].input=g.input,R(k),u=k,c=!0;else if(y(k,g.match.def)){var x=A(k,g.input,!0,!0);c=x!==!1,u=x.caret||x.insert?f():k,h=!0}else c=g.generatedInput===!0;if(p().maskLength<v&&(p().maskLength=v),c)break}if(!c)break}if(!c)return p().validPositions=e.extend(!0,{},s),d(!0),!1}else p().validPositions[t]=e.extend(!0,{},i);return d(!0),!0}function R(t){for(var i=t-1;i>-1&&!p().validPositions[i];i--);var a,n;for(i++;i<t;i++)void 0===p().validPositions[i]&&(r.jitMasking===!1||r.jitMasking>i)&&(n=k(i,v(i-1).locator,i-1).slice(),""===n[n.length-1].match.def&&n.pop(),a=h(n),a&&(a.match.def===r.radixPointDefinitionSymbol||!E(i,!0)||e.inArray(r.radixPoint,b())<i&&a.match.fn&&a.match.fn.test(_(i),p(),i,!1,r))&&(I=u(i,a.match.placeholder||(null==a.match.fn?a.match.def:""!==_(i)?_(i):b()[i]),!0),I!==!1&&(p().validPositions[I.pos||i].generatedInput=!0)))}n=n===!0;var O=i;void 0!==i.begin&&(O=q&&!l(i)?i.end:i.begin);var I=!1,j=e.extend(!0,{},p().validPositions);if(R(O),l(i)&&(G(void 0,t.keyCode.DELETE,i),O=p().p),O<p().maskLength&&(I=u(O,a,n),(!n||o===!0)&&I===!1)){var D=p().validPositions[O];if(!D||null!==D.match.fn||D.match.def!==a&&a!==r.skipOptionalPartCharacter){if((r.insertMode||void 0===p().validPositions[C(O)])&&!E(O,!0)){var F=k(O).slice();""===F[F.length-1].match.def&&F.pop();var N=h(F,!0);N&&null===N.match.fn&&(N=N.match.placeholder||N.match.def,u(O,N,n),p().validPositions[O].generatedInput=!0);for(var T=O+1,B=C(O);T<=B;T++)if(I=u(T,a,n),I!==!1){g(O,void 0!==I.pos?I.pos:T),O=T;break}}}else I={caret:C(O)}}return I===!1&&r.keepStatic&&!n&&s!==!0&&(I=c(O,a,n)),I===!0&&(I={pos:O}),e.isFunction(r.postValidation)&&I!==!1&&!n&&o!==!0&&(I=!!r.postValidation(b(!0),I,r)&&I),void 0===I.pos&&(I.pos=O),I===!1&&(d(!0),p().validPositions=e.extend(!0,{},j)),I}function E(e,t){var i;if(t?(i=v(e).match,""===i.def&&(i=g(e).match)):i=g(e).match,null!=i.fn)return i.fn;if(t!==!0&&e>-1){var a=k(e);return a.length>1+(""===a[a.length-1].match.def?1:0)}return!1}function C(e,t){var i=p().maskLength;if(e>=i)return i;for(var a=e;++a<i&&(t===!0&&(g(a).match.newBlockMarker!==!0||!E(a))||t!==!0&&!E(a)););return a}function R(e,t){var i,a=e;if(a<=0)return 0;for(;--a>0&&(t===!0&&g(a).match.newBlockMarker!==!0||t!==!0&&!E(a)&&(i=k(a),i.length<2||2===i.length&&""===i[1].match.def)););return a}function M(e){return void 0===p().validPositions[e]?_(e):p().validPositions[e].input}function O(t,i,a,n,o){if(n&&e.isFunction(r.onBeforeWrite)){var s=r.onBeforeWrite(n,i,a,r);if(s){if(s.refreshFromBuffer){var l=s.refreshFromBuffer;P(l===!0?l:l.start,l.end,s.buffer||i),i=b(!0)}void 0!==a&&(a=void 0!==s.caret?s.caret:a)}}t.inputmask._valueSet(i.join("")),void 0===a||void 0!==n&&"blur"===n.type?L(t,i,a):D(t,a),o===!0&&(Y=!0,e(t).trigger("input"))}function _(e,t){if(t=t||g(e).match,void 0!==t.placeholder)return t.placeholder;if(null===t.fn){if(e>-1&&void 0===p().validPositions[e]){var i,a=k(e),n=[];if(a.length>1+(""===a[a.length-1].match.def?1:0))for(var o=0;o<a.length;o++)if(a[o].match.optionality!==!0&&a[o].match.optionalQuantifier!==!0&&(null===a[o].match.fn||void 0===i||a[o].match.fn.test(i.match.def,p(),e,!0,r)!==!1)&&(n.push(a[o]),null===a[o].match.fn&&(i=a[o]),n.length>1&&/[0-9a-bA-Z]/.test(n[0].match.def)))return r.placeholder.charAt(e%r.placeholder.length)}return t.def}return r.placeholder.charAt(e%r.placeholder.length)}function I(i,a,n,o,s,l){function u(){var e=!1,t=x().slice(h,C(h)).join("").indexOf(m);if(t!==-1&&!E(h)){e=!0;for(var i=x().slice(h,h+t),a=0;a<i.length;a++)if(" "!==i[a]){e=!1;break}}return e}var c=o.slice(),m="",h=0,g=void 0;if(d(),p().p=C(-1),!n)if(r.autoUnmask!==!0){var y=x().slice(0,C(-1)).join(""),k=c.join("").match(new RegExp("^"+t.escapeRegex(y),"g"));k&&k.length>0&&(c.splice(0,k.length*y.length),h=C(h))}else h=C(h);if(e.each(c,function(t,a){if(void 0!==a){var o=new e.Event("keypress");o.which=a.charCodeAt(0),m+=a;var s=f(void 0,!0),l=p().validPositions[s],c=v(s+1,l?l.locator.slice():void 0,s);if(!u()||n||r.autoUnmask){var y=n?t:null==c.match.fn&&c.match.optionality&&s+1<p().p?s+1:p().p;g=ee.keypressEvent.call(i,o,!0,!1,n,y),h=y+1,m=""}else g=ee.keypressEvent.call(i,o,!0,!1,!0,s+1);if(!n&&e.isFunction(r.onBeforeWrite)&&(g=r.onBeforeWrite(o,b(),g.forwardPosition,r),g&&g.refreshFromBuffer)){var k=g.refreshFromBuffer;P(k===!0?k:k.start,k.end,g.buffer),d(!0),g.caret&&(p().p=g.caret)}}}),a){var w=void 0,S=f();document.activeElement===i&&(s||g)&&(w=D(i).begin,s&&g===!1&&(w=C(f(w))),g&&l!==!0&&(w<S+1||S===-1)&&(w=r.numericInput&&void 0===g.caret?R(g.forwardPosition):g.forwardPosition)),O(i,b(),w,s||new e.Event("checkval"))}}function j(t){if(t&&void 0===t.inputmask)return t.value;var i=[],a=p().validPositions;for(var n in a)a[n].match&&null!=a[n].match.fn&&i.push(a[n].input);var o=0===i.length?"":(q?i.reverse():i).join("");if(e.isFunction(r.onUnMask)){var s=(q?b().slice().reverse():b()).join("");o=r.onUnMask(s,o,r)||o}return o}function D(e,t,i,a){function n(e){if(a!==!0&&q&&"number"==typeof e&&(!r.greedy||""!==r.placeholder)){var t=b().join("").length;e=t-e}return e}var s;if("number"!=typeof t)return e.setSelectionRange?(t=e.selectionStart,i=e.selectionEnd):window.getSelection?(s=window.getSelection().getRangeAt(0),s.commonAncestorContainer.parentNode!==e&&s.commonAncestorContainer!==e||(t=s.startOffset,i=s.endOffset)):document.selection&&document.selection.createRange&&(s=document.selection.createRange(),t=0-s.duplicate().moveStart("character",-e.inputmask._valueGet().length),i=t+s.text.length),{begin:n(t),end:n(i)};t=n(t),i=n(i),i="number"==typeof i?i:t;var l=parseInt(((e.ownerDocument.defaultView||window).getComputedStyle?(e.ownerDocument.defaultView||window).getComputedStyle(e,null):e.currentStyle).fontSize)*i;if(e.scrollLeft=l>e.scrollWidth?l:0,o||r.insertMode!==!1||t!==i||i++,e.setSelectionRange)e.selectionStart=t,e.selectionEnd=i;else if(window.getSelection){if(s=document.createRange(),void 0===e.firstChild||null===e.firstChild){var u=document.createTextNode("");e.appendChild(u)}s.setStart(e.firstChild,t<e.inputmask._valueGet().length?t:e.inputmask._valueGet().length),s.setEnd(e.firstChild,i<e.inputmask._valueGet().length?i:e.inputmask._valueGet().length),s.collapse(!0);var c=window.getSelection();c.removeAllRanges(),c.addRange(s)}else e.createTextRange&&(s=e.createTextRange(),s.collapse(!0),s.moveEnd("character",i),s.moveStart("character",t),s.select());L(e,void 0,{begin:t,end:i})}function F(t){var i,a,n=b(),r=n.length,o=f(),s={},l=p().validPositions[o],u=void 0!==l?l.locator.slice():void 0;for(i=o+1;i<n.length;i++)a=v(i,u,i-1),u=a.locator.slice(),s[i]=e.extend(!0,{},a);var c=l&&void 0!==l.alternation?l.locator[l.alternation]:void 0;for(i=r-1;i>o&&(a=s[i],(a.match.optionality||a.match.optionalQuantifier||c&&(c!==s[i].locator[l.alternation]&&null!=a.match.fn||null===a.match.fn&&a.locator[l.alternation]&&S(a.locator[l.alternation].toString().split(","),c.toString().split(","))&&""!==k(i)[0].def))&&n[i]===_(i,a.match));i--)r--;return t?{l:r,def:s[r]?s[r].match:void 0}:r}function N(e){for(var t=F(),i=e.length-1;i>t&&!E(i);i--);return e.splice(t,i+1-t),e}function T(t){if(e.isFunction(r.isComplete))return r.isComplete(t,r);if("*"!==r.repeat){var i=!1,a=F(!0),n=R(a.l);if(void 0===a.def||a.def.newBlockMarker||a.def.optionality||a.def.optionalQuantifier){i=!0;for(var o=0;o<=n;o++){var s=v(o).match;if(null!==s.fn&&void 0===p().validPositions[o]&&s.optionality!==!0&&s.optionalQuantifier!==!0||null===s.fn&&t[o]!==_(o,s)){i=!1;break}}}return i}}function G(i,a,n,o){function s(){if(r.keepStatic){for(var t=[],a=f(-1,!0),n=e.extend(!0,{},p().validPositions),o=p().validPositions[a];a>=0;a--){var s=p().validPositions[a];if(s){if(s.generatedInput!==!0&&/[0-9a-bA-Z]/.test(s.input)&&t.push(s.input),delete p().validPositions[a],void 0!==s.alternation&&s.locator[s.alternation]!==o.locator[s.alternation])break;o=s}}if(a>-1)for(p().p=C(f(-1,!0));t.length>0;){var l=new e.Event("keypress");l.which=t.pop().charCodeAt(0),ee.keypressEvent.call(i,l,!0,!1,!1,p().p)}else p().validPositions=e.extend(!0,{},n)}}if((r.numericInput||q)&&(a===t.keyCode.BACKSPACE?a=t.keyCode.DELETE:a===t.keyCode.DELETE&&(a=t.keyCode.BACKSPACE),q)){var l=n.end;n.end=n.begin,n.begin=l}a===t.keyCode.BACKSPACE&&(n.end-n.begin<1||r.insertMode===!1)?(n.begin=R(n.begin),void 0===p().validPositions[n.begin]||p().validPositions[n.begin].input!==r.groupSeparator&&p().validPositions[n.begin].input!==r.radixPoint||n.begin--):a===t.keyCode.DELETE&&n.begin===n.end&&(n.end=E(n.end,!0)?n.end+1:C(n.end)+1,void 0===p().validPositions[n.begin]||p().validPositions[n.begin].input!==r.groupSeparator&&p().validPositions[n.begin].input!==r.radixPoint||n.end++),m(n.begin,n.end,!1,o),o!==!0&&s();var u=f(n.begin,!0);u<n.begin?p().p=C(u):o!==!0&&(p().p=n.begin)}function B(t){function i(e){var i,a=document.createElement("span");for(var n in o)isNaN(n)&&n.indexOf("font")!==-1&&(a.style[n]=o[n]);a.style.textTransform=o.textTransform,a.style.letterSpacing=o.letterSpacing,a.style.position="absolute",a.style.height="auto",a.style.width="auto",a.style.visibility="hidden",a.style.whiteSpace="nowrap",document.body.appendChild(a);var r,s=t.inputmask._valueGet(),l=0;for(i=0,r=s.length;i<=r;i++){if(a.innerHTML+=s.charAt(i)||"_",a.offsetWidth>=e){var u=e-l,c=a.offsetWidth-e;a.innerHTML=s.charAt(i),u-=a.offsetWidth/3,i=u<c?i-1:i;break}l=a.offsetWidth}return document.body.removeChild(a),i}function a(){z.style.position="absolute",z.style.top=n.top+"px",z.style.left=n.left+"px",z.style.width=parseInt(t.offsetWidth)-parseInt(o.paddingLeft)-parseInt(o.paddingRight)-parseInt(o.borderLeftWidth)-parseInt(o.borderRightWidth)+"px",z.style.height=parseInt(t.offsetHeight)-parseInt(o.paddingTop)-parseInt(o.paddingBottom)-parseInt(o.borderTopWidth)-parseInt(o.borderBottomWidth)+"px",z.style.lineHeight=z.style.height,z.style.zIndex=isNaN(o.zIndex)?-1:o.zIndex-1,z.style.webkitAppearance="textfield",z.style.mozAppearance="textfield",z.style.Appearance="textfield"}var n=e(t).position(),o=(t.ownerDocument.defaultView||window).getComputedStyle(t,null);t.parentNode,z=document.createElement("div"),document.body.appendChild(z);for(var s in o)isNaN(s)&&"cssText"!==s&&s.indexOf("webkit")==-1&&(z.style[s]=o[s]);t.style.backgroundColor="transparent",t.style.color="transparent",t.style.webkitAppearance="caret",t.style.mozAppearance="caret",t.style.Appearance="caret",a(),e(window).on("resize",function(i){n=e(t).position(),o=(t.ownerDocument.defaultView||window).getComputedStyle(t,null),a()}),e(t).on("click",function(e){return D(t,i(e.clientX)),ee.clickEvent.call(this,[e])}),e(t).on("keydown",function(e){e.shiftKey||r.insertMode===!1||setTimeout(function(){L(t)},0)})}function L(e,t,i){function a(){o||null!==l.fn&&void 0!==u.input?o&&null!==l.fn&&void 0!==u.input&&(o=!1,n+="</span>"):(o=!0,n+="<span class='im-static''>")}if(void 0!==z){t=t||b(),void 0===i?i=D(e):void 0===i.begin&&(i={begin:i,end:i});var n="",o=!1;if(""!=t){var s,l,u,c=0,d=f();do c===i.begin&&document.activeElement===e&&(n+="<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>"),p().validPositions[c]?(u=p().validPositions[c],l=u.match,s=u.locator.slice(),a(),n+=u.input):(u=v(c,s,c-1),l=u.match,s=u.locator.slice(),(r.jitMasking===!1||c<d||"number"==typeof r.jitMasking&&isFinite(r.jitMasking)&&r.jitMasking>c)&&(a(),n+=_(c,l))),c++;while((void 0===V||c<V)&&(null!==l.fn||""!==l.def)||d>c)}z.innerHTML=n}}function H(t){function i(t,i){function a(t){function a(t){if(e.valHooks&&(void 0===e.valHooks[t]||e.valHooks[t].inputmaskpatch!==!0)){var a=e.valHooks[t]&&e.valHooks[t].get?e.valHooks[t].get:function(e){return e.value},n=e.valHooks[t]&&e.valHooks[t].set?e.valHooks[t].set:function(e,t){return e.value=t,e};e.valHooks[t]={get:function(e){if(e.inputmask){if(e.inputmask.opts.autoUnmask)return e.inputmask.unmaskedvalue();var t=a(e);return f(void 0,void 0,e.inputmask.maskset.validPositions)!==-1||i.nullable!==!0?t:""}return a(e)},set:function(t,i){var a,r=e(t);return a=n(t,i),t.inputmask&&r.trigger("setvalue"),a},inputmaskpatch:!0}}}function n(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():f()!==-1||i.nullable!==!0?document.activeElement===this&&i.clearMaskOnLostFocus?(q?N(b().slice()).reverse():N(b().slice())).join(""):s.call(this):"":s.call(this)}function r(t){l.call(this,t),this.inputmask&&e(this).trigger("setvalue")}function o(t){J.on(t,"mouseenter",function(t){var i=e(this),a=this,n=a.inputmask._valueGet();n!==b().join("")&&i.trigger("setvalue")})}var s,l;if(!t.inputmask.__valueGet){if(i.noValuePatching!==!0){if(Object.getOwnPropertyDescriptor){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"==typeof"test".__proto__?function(e){return e.__proto__}:function(e){return e.constructor.prototype});var u=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"value"):void 0;u&&u.get&&u.set?(s=u.get,l=u.set,Object.defineProperty(t,"value",{get:n,set:r,configurable:!0})):"INPUT"!==t.tagName&&(s=function(){return this.textContent},l=function(e){this.textContent=e},Object.defineProperty(t,"value",{get:n,set:r,configurable:!0}))}else document.__lookupGetter__&&t.__lookupGetter__("value")&&(s=t.__lookupGetter__("value"),l=t.__lookupSetter__("value"),t.__defineGetter__("value",n),t.__defineSetter__("value",r));t.inputmask.__valueGet=s,t.inputmask.__valueSet=l}t.inputmask._valueGet=function(e){return q&&e!==!0?s.call(this.el).split("").reverse().join(""):s.call(this.el)},t.inputmask._valueSet=function(e,t){l.call(this.el,null===e||void 0===e?"":t!==!0&&q?e.split("").reverse().join(""):e)},void 0===s&&(s=function(){return this.value},l=function(e){this.value=e},a(t.type),o(t))}}var n=t.getAttribute("type"),r="INPUT"===t.tagName&&e.inArray(n,i.supportsInputType)!==-1||t.isContentEditable||"TEXTAREA"===t.tagName;if(!r)if("INPUT"===t.tagName){var o=document.createElement("input");o.setAttribute("type",n),r="text"===o.type,o=null}else r="partial";return r!==!1&&a(t),r}var a=i(t,r);if(a!==!1&&(W=t,U=e(W),("rtl"===W.dir||r.rightAlign)&&(W.style.textAlign="right"),("rtl"===W.dir||r.numericInput)&&(W.dir="ltr",W.removeAttribute("dir"),W.inputmask.isRTL=!0,q=!0),r.colorMask===!0&&B(W),u&&(W.hasOwnProperty("inputmode")&&(W.inputmode=r.inputmode,W.setAttribute("inputmode",r.inputmode)),"rtfm"===r.androidHack&&(r.colorMask!==!0&&B(W),W.type="password")),J.off(W),a===!0&&(J.on(W,"submit",ee.submitEvent),J.on(W,"reset",ee.resetEvent),J.on(W,"mouseenter",ee.mouseenterEvent),J.on(W,"blur",ee.blurEvent),J.on(W,"focus",ee.focusEvent),J.on(W,"mouseleave",ee.mouseleaveEvent),r.colorMask!==!0&&J.on(W,"click",ee.clickEvent),J.on(W,"dblclick",ee.dblclickEvent),J.on(W,"paste",ee.pasteEvent),J.on(W,"dragdrop",ee.pasteEvent),J.on(W,"drop",ee.pasteEvent),J.on(W,"cut",ee.cutEvent),J.on(W,"complete",r.oncomplete),J.on(W,"incomplete",r.onincomplete),J.on(W,"cleared",r.oncleared),r.inputEventOnly!==!0&&(J.on(W,"keydown",ee.keydownEvent),J.on(W,"keypress",ee.keypressEvent)),J.on(W,"compositionstart",e.noop),J.on(W,"compositionupdate",e.noop),J.on(W,"compositionend",e.noop),J.on(W,"keyup",e.noop),J.on(W,"input",ee.inputFallBackEvent)),J.on(W,"setvalue",ee.setValueEvent),x(),""!==W.inputmask._valueGet()||r.clearMaskOnLostFocus===!1||document.activeElement===W)){var n=e.isFunction(r.onBeforeMask)?r.onBeforeMask(W.inputmask._valueGet(),r)||W.inputmask._valueGet():W.inputmask._valueGet();I(W,!0,!1,n.split(""));var o=b().slice();K=o.join(""),T(o)===!1&&r.clearIncomplete&&d(),r.clearMaskOnLostFocus&&document.activeElement!==W&&(f()===-1?o=[]:N(o)),O(W,o),document.activeElement===W&&D(W,C(f()))}}a=a||this.maskset,r=r||this.opts;var K,U,V,z,Q,W=this.el,q=this.isRTL,Z=!1,Y=!1,$=!1,X=!1,J={on:function(i,a,n){var o=function(i){if(void 0===this.inputmask&&"FORM"!==this.nodeName){var a=e.data(this,"_inputmask_opts");a?new t(a).mask(this):J.off(this)}else{if("setvalue"===i.type||!(this.disabled||this.readOnly&&!("keydown"===i.type&&i.ctrlKey&&67===i.keyCode||r.tabThrough===!1&&i.keyCode===t.keyCode.TAB))){switch(i.type){case"input":if(Y===!0)return Y=!1,i.preventDefault();break;case"keydown":Z=!1,Y=!1;break;case"keypress":if(Z===!0)return i.preventDefault();Z=!0;break;case"click":if(s||l){var o=this,u=arguments;return setTimeout(function(){n.apply(o,u)},0),!1}}var c=n.apply(this,arguments);return c===!1&&(i.preventDefault(),i.stopPropagation()),c}i.preventDefault()}};i.inputmask.events[a]=i.inputmask.events[a]||[],i.inputmask.events[a].push(o),e.inArray(a,["submit","reset"])!==-1?null!=i.form&&e(i.form).on(a,o):e(i).on(a,o)},off:function(t,i){if(t.inputmask&&t.inputmask.events){var a;i?(a=[],a[i]=t.inputmask.events[i]):a=t.inputmask.events,e.each(a,function(i,a){for(;a.length>0;){var n=a.pop();e.inArray(i,["submit","reset"])!==-1?null!=t.form&&e(t.form).off(i,n):e(t).off(i,n)}delete t.inputmask.events[i]})}}},ee={keydownEvent:function(i){function a(e){var t=document.createElement("input"),i="on"+e,a=i in t;return a||(t.setAttribute(i,"return;"),a="function"==typeof t[i]),t=null,a}var n=this,o=e(n),s=i.keyCode,u=D(n);if(s===t.keyCode.BACKSPACE||s===t.keyCode.DELETE||l&&s===t.keyCode.BACKSPACE_SAFARI||i.ctrlKey&&s===t.keyCode.X&&!a("cut"))i.preventDefault(),G(n,s,u),O(n,b(!0),p().p,i,n.inputmask._valueGet()!==b().join("")),n.inputmask._valueGet()===x().join("")?o.trigger("cleared"):T(b())===!0&&o.trigger("complete");else if(s===t.keyCode.END||s===t.keyCode.PAGE_DOWN){i.preventDefault();var c=C(f());r.insertMode||c!==p().maskLength||i.shiftKey||c--,D(n,i.shiftKey?u.begin:c,c,!0)}else s===t.keyCode.HOME&&!i.shiftKey||s===t.keyCode.PAGE_UP?(i.preventDefault(),D(n,0,i.shiftKey?u.begin:0,!0)):(r.undoOnEscape&&s===t.keyCode.ESCAPE||90===s&&i.ctrlKey)&&i.altKey!==!0?(I(n,!0,!1,K.split("")),o.trigger("click")):s!==t.keyCode.INSERT||i.shiftKey||i.ctrlKey?r.tabThrough===!0&&s===t.keyCode.TAB?(i.shiftKey===!0?(null===g(u.begin).match.fn&&(u.begin=C(u.begin)),u.end=R(u.begin,!0),u.begin=R(u.end,!0)):(u.begin=C(u.begin,!0),u.end=C(u.begin,!0),u.end<p().maskLength&&u.end--),u.begin<p().maskLength&&(i.preventDefault(),D(n,u.begin,u.end))):i.shiftKey||r.insertMode===!1&&(s===t.keyCode.RIGHT?setTimeout(function(){var e=D(n);D(n,e.begin)},0):s===t.keyCode.LEFT&&setTimeout(function(){var e=D(n);D(n,q?e.begin+1:e.begin-1)},0)):(r.insertMode=!r.insertMode,D(n,r.insertMode||u.begin!==p().maskLength?u.begin:u.begin-1));r.onKeyDown.call(this,i,b(),D(n).begin,r),$=e.inArray(s,r.ignorables)!==-1},keypressEvent:function(i,a,n,o,s){var l=this,u=e(l),c=i.which||i.charCode||i.keyCode;if(!(a===!0||i.ctrlKey&&i.altKey)&&(i.ctrlKey||i.metaKey||$))return c===t.keyCode.ENTER&&K!==b().join("")&&(K=b().join(""),
setTimeout(function(){u.trigger("change")},0)),!0;if(c){46===c&&i.shiftKey===!1&&","===r.radixPoint&&(c=44);var f,m=a?{begin:s,end:s}:D(l),h=String.fromCharCode(c);p().writeOutBuffer=!0;var v=A(m,h,o);if(v!==!1&&(d(!0),f=void 0!==v.caret?v.caret:a?v.pos+1:C(v.pos),p().p=f),n!==!1){var g=this;if(setTimeout(function(){r.onKeyValidation.call(g,c,v,r)},0),p().writeOutBuffer&&v!==!1){var y=b();O(l,y,r.numericInput&&void 0===v.caret?R(f):f,i,a!==!0),a!==!0&&setTimeout(function(){T(y)===!0&&u.trigger("complete")},0)}}if(i.preventDefault(),a)return v.forwardPosition=f,v}},pasteEvent:function(t){var i,a=this,n=t.originalEvent||t,o=e(a),s=a.inputmask._valueGet(!0),l=D(a);q&&(i=l.end,l.end=l.begin,l.begin=i);var u=s.substr(0,l.begin),c=s.substr(l.end,s.length);if(u===(q?x().reverse():x()).slice(0,l.begin).join("")&&(u=""),c===(q?x().reverse():x()).slice(l.end).join("")&&(c=""),q&&(i=u,u=c,c=i),window.clipboardData&&window.clipboardData.getData)s=u+window.clipboardData.getData("Text")+c;else{if(!n.clipboardData||!n.clipboardData.getData)return!0;s=u+n.clipboardData.getData("text/plain")+c}var p=s;if(e.isFunction(r.onBeforePaste)){if(p=r.onBeforePaste(s,r),p===!1)return t.preventDefault();p||(p=s)}return I(a,!1,!1,q?p.split("").reverse():p.toString().split("")),O(a,b(),C(f()),t,K!==b().join("")),T(b())===!0&&o.trigger("complete"),t.preventDefault()},inputFallBackEvent:function(i){var a=this,n=a.inputmask._valueGet();if(b().join("")!==n){var r=D(a);if(n=n.replace(new RegExp("("+t.escapeRegex(x().join(""))+")*"),""),s){var o=n.replace(b().join(""),"");if(1===o.length){var l=new e.Event("keypress");return l.which=o.charCodeAt(0),ee.keypressEvent.call(a,l,!0,!0,!1,p().validPositions[r.begin-1]?r.begin:r.begin-1),!1}}if(r.begin>n.length&&(D(a,n.length),r=D(a)),b().length-n.length!==1||n.charAt(r.begin)===b()[r.begin]||n.charAt(r.begin+1)===b()[r.begin]||E(r.begin)){for(var u=f()+1,c=x().join("");null===n.match(t.escapeRegex(c)+"$");)c=c.slice(1);n=n.replace(c,""),n=n.split(""),I(a,!0,!1,n,i,r.begin<u),T(b())===!0&&e(a).trigger("complete")}else i.keyCode=t.keyCode.BACKSPACE,ee.keydownEvent.call(a,i);i.preventDefault()}},setValueEvent:function(t){var i=this,a=i.inputmask._valueGet();I(i,!0,!1,(e.isFunction(r.onBeforeMask)?r.onBeforeMask(a,r)||a:a).split("")),K=b().join(""),(r.clearMaskOnLostFocus||r.clearIncomplete)&&i.inputmask._valueGet()===x().join("")&&i.inputmask._valueSet("")},focusEvent:function(e){var t=this,i=t.inputmask._valueGet();r.showMaskOnFocus&&(!r.showMaskOnHover||r.showMaskOnHover&&""===i)&&(t.inputmask._valueGet()!==b().join("")?O(t,b(),C(f())):X===!1&&D(t,C(f()))),r.positionCaretOnTab===!0&&ee.clickEvent.apply(t,[e,!0]),K=b().join("")},mouseleaveEvent:function(e){var t=this;if(X=!1,r.clearMaskOnLostFocus&&document.activeElement!==t){var i=b().slice(),a=t.inputmask._valueGet();a!==t.getAttribute("placeholder")&&""!==a&&(f()===-1&&a===x().join("")?i=[]:N(i),O(t,i))}},clickEvent:function(t,i){function a(t){if(""!==r.radixPoint){var i=p().validPositions;if(void 0===i[t]||i[t].input===_(t)){if(t<C(-1))return!0;var a=e.inArray(r.radixPoint,b());if(a!==-1){for(var n in i)if(a<n&&i[n].input!==_(n))return!1;return!0}}}return!1}var n=this;setTimeout(function(){if(document.activeElement===n){var t=D(n);if(i&&(t.begin=t.end),t.begin===t.end)switch(r.positionCaretOnClick){case"none":break;case"radixFocus":if(a(t.begin)){var o=e.inArray(r.radixPoint,b().join(""));D(n,r.numericInput?C(o):o);break}default:var s=t.begin,l=f(s,!0),u=C(l);if(s<u)D(n,E(s)||E(s-1)?s:C(s));else{var c=_(u);(""!==c&&b()[u]!==c&&g(u).match.optionalQuantifier!==!0||!E(u)&&g(u).match.def===c)&&(u=C(u)),D(n,u)}}}},0)},dblclickEvent:function(e){var t=this;setTimeout(function(){D(t,0,C(f()))},0)},cutEvent:function(i){var a=this,n=e(a),r=D(a),o=i.originalEvent||i,s=window.clipboardData||o.clipboardData,l=q?b().slice(r.end,r.begin):b().slice(r.begin,r.end);s.setData("text",q?l.reverse().join(""):l.join("")),document.execCommand&&document.execCommand("copy"),G(a,t.keyCode.DELETE,r),O(a,b(),p().p,i,K!==b().join("")),a.inputmask._valueGet()===x().join("")&&n.trigger("cleared")},blurEvent:function(t){var i=e(this),a=this;if(a.inputmask){var n=a.inputmask._valueGet(),o=b().slice();K!==o.join("")&&setTimeout(function(){i.trigger("change"),K=o.join("")},0),""!==n&&(r.clearMaskOnLostFocus&&(f()===-1&&n===x().join("")?o=[]:N(o)),T(o)===!1&&(setTimeout(function(){i.trigger("incomplete")},0),r.clearIncomplete&&(d(),o=r.clearMaskOnLostFocus?[]:x().slice())),O(a,o,void 0,t))}},mouseenterEvent:function(e){var t=this;X=!0,document.activeElement!==t&&r.showMaskOnHover&&t.inputmask._valueGet()!==b().join("")&&O(t,b())},submitEvent:function(e){K!==b().join("")&&U.trigger("change"),r.clearMaskOnLostFocus&&f()===-1&&W.inputmask._valueGet&&W.inputmask._valueGet()===x().join("")&&W.inputmask._valueSet(""),r.removeMaskOnSubmit&&(W.inputmask._valueSet(W.inputmask.unmaskedvalue(),!0),setTimeout(function(){O(W,b())},0))},resetEvent:function(e){setTimeout(function(){U.trigger("setvalue")},0)}};if(void 0!==i)switch(i.action){case"isComplete":return W=i.el,T(b());case"unmaskedvalue":return void 0!==W&&void 0===i.value||(Q=i.value,Q=(e.isFunction(r.onBeforeMask)?r.onBeforeMask(Q,r)||Q:Q).split(""),I(void 0,!1,!1,q?Q.reverse():Q),e.isFunction(r.onBeforeWrite)&&r.onBeforeWrite(void 0,b(),0,r)),j(W);case"mask":H(W);break;case"format":return Q=(e.isFunction(r.onBeforeMask)?r.onBeforeMask(i.value,r)||i.value:i.value).split(""),I(void 0,!1,!1,q?Q.reverse():Q),e.isFunction(r.onBeforeWrite)&&r.onBeforeWrite(void 0,b(),0,r),i.metadata?{value:q?b().slice().reverse().join(""):b().join(""),metadata:n.call(this,{action:"getmetadata"},a,r)}:q?b().slice().reverse().join(""):b().join("");case"isValid":i.value?(Q=i.value.split(""),I(void 0,!1,!0,q?Q.reverse():Q)):i.value=b().join("");for(var te=b(),ie=F(),ae=te.length-1;ae>ie&&!E(ae);ae--);return te.splice(ie,ae+1-ie),T(te)&&i.value===b().join("");case"getemptymask":return x().join("");case"remove":if(W){U=e(W),W.inputmask._valueSet(j(W)),J.off(W);var ne;Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?(ne=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(W),"value"),ne&&W.inputmask.__valueGet&&Object.defineProperty(W,"value",{get:W.inputmask.__valueGet,set:W.inputmask.__valueSet,configurable:!0})):document.__lookupGetter__&&W.__lookupGetter__("value")&&W.inputmask.__valueGet&&(W.__defineGetter__("value",W.inputmask.__valueGet),W.__defineSetter__("value",W.inputmask.__valueSet)),W.inputmask=void 0}return W;case"getmetadata":if(e.isArray(a.metadata)){var re=c(!0,0,!1).join("");return e.each(a.metadata,function(e,t){if(t.mask===re)return re=t,!1}),re}return a.metadata}}var r=navigator.userAgent,o=/mobile/i.test(r),s=/iemobile/i.test(r),l=/iphone/i.test(r)&&!s,u=/android/i.test(r)&&!s;return t.prototype={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:e.noop,onincomplete:e.noop,oncleared:e.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyDown:e.noop,onBeforeMask:null,onBeforePaste:function(t,i){return e.isFunction(i.onBeforeMask)?i.onBeforeMask(t,i):t},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:e.noop,skipOptionalPartCharacter:" ",numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",radixPointDefinitionSymbol:void 0,groupSeparator:"",keepStatic:null,positionCaretOnTab:!0,tabThrough:!1,supportsInputType:["text","tel","password"],definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",cardinality:1}},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:null,canClearPosition:e.noop,postValidation:null,staticDefinitionSymbol:void 0,jitMasking:!1,nullable:!0,inputEventOnly:!1,noValuePatching:!1,positionCaretOnClick:"lvp",casing:null,inputmode:"verbatim",colorMask:!1,androidHack:!1},masksCache:{},mask:function(r){function o(t,a,n,r){function o(e,i){i=void 0!==i?i:t.getAttribute(r+"-"+e),null!==i&&("string"==typeof i&&(0===e.indexOf("on")?i=window[i]:"false"===i?i=!1:"true"===i&&(i=!0)),n[e]=i)}var s,l,u,c,p=t.getAttribute(r);if(p&&""!==p&&(p=p.replace(new RegExp("'","g"),'"'),l=JSON.parse("{"+p+"}")),l){u=void 0;for(c in l)if("alias"===c.toLowerCase()){u=l[c];break}}o("alias",u),n.alias&&i(n.alias,n,a);for(s in a){if(l){u=void 0;for(c in l)if(c.toLowerCase()===s.toLowerCase()){u=l[c];break}}o(s,u)}return e.extend(!0,a,n),a}var s=this;return"string"==typeof r&&(r=document.getElementById(r)||document.querySelectorAll(r)),r=r.nodeName?[r]:r,e.each(r,function(i,r){var l=e.extend(!0,{},s.opts);o(r,l,e.extend(!0,{},s.userOptions),s.dataAttribute);var u=a(l,s.noMasksCache);void 0!==u&&(void 0!==r.inputmask&&r.inputmask.remove(),r.inputmask=new t,r.inputmask.opts=l,r.inputmask.noMasksCache=s.noMasksCache,r.inputmask.userOptions=e.extend(!0,{},s.userOptions),r.inputmask.el=r,r.inputmask.maskset=u,e.data(r,"_inputmask_opts",l),n.call(r.inputmask,{action:"mask"}))}),r&&r[0]?r[0].inputmask||this:this},option:function(t,i){return"string"==typeof t?this.opts[t]:"object"==typeof t?(e.extend(this.userOptions,t),this.el&&i!==!0&&this.mask(this.el),this):void 0},unmaskedvalue:function(e){return this.maskset=this.maskset||a(this.opts,this.noMasksCache),n.call(this,{action:"unmaskedvalue",value:e})},remove:function(){return n.call(this,{action:"remove"})},getemptymask:function(){return this.maskset=this.maskset||a(this.opts,this.noMasksCache),n.call(this,{action:"getemptymask"})},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return this.maskset=this.maskset||a(this.opts,this.noMasksCache),n.call(this,{action:"isComplete"})},getmetadata:function(){return this.maskset=this.maskset||a(this.opts,this.noMasksCache),n.call(this,{action:"getmetadata"})},isValid:function(e){return this.maskset=this.maskset||a(this.opts,this.noMasksCache),n.call(this,{action:"isValid",value:e})},format:function(e,t){return this.maskset=this.maskset||a(this.opts,this.noMasksCache),n.call(this,{action:"format",value:e,metadata:t})},analyseMask:function(t,i){function a(e,t,i,a){this.matches=[],this.openGroup=e||!1,this.isGroup=e||!1,this.isOptional=t||!1,this.isQuantifier=i||!1,this.isAlternator=a||!1,this.quantifier={min:1,max:1}}function n(t,a,n){var r=i.definitions[a];n=void 0!==n?n:t.matches.length;var o=t.matches[n-1];if(r&&!v){r.placeholder=e.isFunction(r.placeholder)?r.placeholder(i):r.placeholder;for(var s=r.prevalidator,l=s?s.length:0,u=1;u<r.cardinality;u++){var c=l>=u?s[u-1]:[],p=c.validator,d=c.cardinality;t.matches.splice(n++,0,{fn:p?"string"==typeof p?new RegExp(p):new function(){this.test=p}:new RegExp("."),cardinality:d?d:1,optionality:t.isOptional,newBlockMarker:void 0===o||o.def!==(r.definitionSymbol||a),casing:r.casing,def:r.definitionSymbol||a,placeholder:r.placeholder,nativeDef:a}),o=t.matches[n-1]}t.matches.splice(n++,0,{fn:r.validator?"string"==typeof r.validator?new RegExp(r.validator):new function(){this.test=r.validator}:new RegExp("."),cardinality:r.cardinality,optionality:t.isOptional,newBlockMarker:void 0===o||o.def!==(r.definitionSymbol||a),casing:r.casing,def:r.definitionSymbol||a,placeholder:r.placeholder,nativeDef:a})}else t.matches.splice(n++,0,{fn:null,cardinality:0,optionality:t.isOptional,newBlockMarker:void 0===o||o.def!==a,casing:null,def:i.staticDefinitionSymbol||a,placeholder:void 0!==i.staticDefinitionSymbol?a:void 0,nativeDef:a}),v=!1}function r(t){t&&t.matches&&e.each(t.matches,function(e,a){var o=t.matches[e+1];(void 0===o||void 0===o.matches||o.isQuantifier===!1)&&a&&a.isGroup&&(a.isGroup=!1,n(a,i.groupmarker.start,0),a.openGroup!==!0&&n(a,i.groupmarker.end)),r(a)})}function o(){if(y.length>0){if(p=y[y.length-1],n(p,u),p.isAlternator){d=y.pop();for(var e=0;e<d.matches.length;e++)d.matches[e].isGroup=!1;y.length>0?(p=y[y.length-1],p.matches.push(d)):g.matches.push(d)}}else n(g,u)}function s(e){function t(e){return e===i.optionalmarker.start?e=i.optionalmarker.end:e===i.optionalmarker.end?e=i.optionalmarker.start:e===i.groupmarker.start?e=i.groupmarker.end:e===i.groupmarker.end&&(e=i.groupmarker.start),e}e.matches=e.matches.reverse();for(var a in e.matches){var n=parseInt(a);if(e.matches[a].isQuantifier&&e.matches[n+1]&&e.matches[n+1].isGroup){var r=e.matches[a];e.matches.splice(a,1),e.matches.splice(n+1,0,r)}void 0!==e.matches[a].matches?e.matches[a]=s(e.matches[a]):e.matches[a]=t(e.matches[a])}return e}for(var l,u,c,p,d,f,m,h=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,v=!1,g=new a,y=[],k=[];l=h.exec(t);)if(u=l[0],v)o();else switch(u.charAt(0)){case i.escapeChar:v=!0;break;case i.optionalmarker.end:case i.groupmarker.end:if(c=y.pop(),c.openGroup=!1,void 0!==c)if(y.length>0){if(p=y[y.length-1],p.matches.push(c),p.isAlternator){d=y.pop();for(var x=0;x<d.matches.length;x++)d.matches[x].isGroup=!1;y.length>0?(p=y[y.length-1],p.matches.push(d)):g.matches.push(d)}}else g.matches.push(c);else o();break;case i.optionalmarker.start:y.push(new a(!1,!0));break;case i.groupmarker.start:y.push(new a(!0));break;case i.quantifiermarker.start:var b=new a(!1,!1,!0);u=u.replace(/[{}]/g,"");var P=u.split(","),w=isNaN(P[0])?P[0]:parseInt(P[0]),S=1===P.length?w:isNaN(P[1])?P[1]:parseInt(P[1]);if("*"!==S&&"+"!==S||(w="*"===S?0:1),b.quantifier={min:w,max:S},y.length>0){var A=y[y.length-1].matches;l=A.pop(),l.isGroup||(m=new a(!0),m.matches.push(l),l=m),A.push(l),A.push(b)}else l=g.matches.pop(),l.isGroup||(m=new a(!0),m.matches.push(l),l=m),g.matches.push(l),g.matches.push(b);break;case i.alternatormarker:y.length>0?(p=y[y.length-1],f=p.matches.pop()):f=g.matches.pop(),f.isAlternator?y.push(f):(d=new a(!1,!1,!1,!0),d.matches.push(f),y.push(d));break;default:o()}for(;y.length>0;)c=y.pop(),g.matches.push(c);return g.matches.length>0&&(r(g),k.push(g)),i.numericInput&&s(k[0]),k}},t.extendDefaults=function(i){e.extend(!0,t.prototype.defaults,i)},t.extendDefinitions=function(i){e.extend(!0,t.prototype.defaults.definitions,i)},t.extendAliases=function(i){e.extend(!0,t.prototype.defaults.aliases,i)},t.format=function(e,i,a){return t(i).format(e,a)},t.unmask=function(e,i){return t(i).unmaskedvalue(e)},t.isValid=function(e,i){return t(i).isValid(e)},t.remove=function(t){e.each(t,function(e,t){t.inputmask&&t.inputmask.remove()})},t.escapeRegex=function(e){var t=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];return e.replace(new RegExp("(\\"+t.join("|\\")+")","gim"),"\\$1")},t.keyCode={ALT:18,BACKSPACE:8,BACKSPACE_SAFARI:127,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91,X:88},window.Inputmask=t,t}(jQuery),function(e,t){return void 0===e.fn.inputmask&&(e.fn.inputmask=function(i,a){var n,r=this[0];if(void 0===a&&(a={}),"string"==typeof i)switch(i){case"unmaskedvalue":return r&&r.inputmask?r.inputmask.unmaskedvalue():e(r).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":return r&&r.inputmask?r.inputmask.getemptymask():"";case"hasMaskedValue":return!(!r||!r.inputmask)&&r.inputmask.hasMaskedValue();case"isComplete":return!r||!r.inputmask||r.inputmask.isComplete();case"getmetadata":return r&&r.inputmask?r.inputmask.getmetadata():void 0;case"setvalue":e(r).val(a),r&&void 0===r.inputmask&&e(r).triggerHandler("setvalue");break;case"option":if("string"!=typeof a)return this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(a)});if(r&&void 0!==r.inputmask)return r.inputmask.option(a);break;default:return a.alias=i,n=new t(a),this.each(function(){n.mask(this)})}else{if("object"==typeof i)return n=new t(i),void 0===i.mask&&void 0===i.alias?this.each(function(){return void 0!==this.inputmask?this.inputmask.option(i):void n.mask(this)}):this.each(function(){n.mask(this)});if(void 0===i)return this.each(function(){n=new t(a),n.mask(this)})}}),e.fn.inputmask}(jQuery,Inputmask),function(e,t){}(jQuery,Inputmask),function(e,t){function i(e){return isNaN(e)||29===new Date(e,2,0).getDate()}return t.extendAliases({"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+i+"[01])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|[12][0-9])"+i+"(0[1-9]|1[012]))|(30"+i+"(0[13-9]|1[012]))|(31"+i+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(e,t,i){if(isNaN(e))return!1;var a=parseInt(e.concat(t.toString().slice(e.length))),n=parseInt(e.concat(i.toString().slice(e.length)));return!isNaN(a)&&t<=a&&a<=i||!isNaN(n)&&t<=n&&n<=i},determinebaseyear:function(e,t,i){var a=(new Date).getFullYear();if(e>a)return e;if(t<a){for(var n=t.toString().slice(0,2),r=t.toString().slice(2,4);t<n+i;)n--;var o=n+r;return e>o?e:o}if(e<=a&&a<=t){for(var s=a.toString().slice(0,2);t<s+i;)s--;var l=s+i;return l<e?e:l}return a},onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val(s.getDate().toString()+(s.getMonth()+1).toString()+s.getFullYear().toString()),o.trigger("setvalue")}},getFrontValue:function(e,t,i){for(var a=0,n=0,r=0;r<e.length&&"2"!==e.charAt(r);r++){var o=i.definitions[e.charAt(r)];o?(a+=n,n=o.cardinality):n++}return t.join("").substr(a,n)},postValidation:function(e,t,a){var n,r,o=e.join("");return 0===a.mask.indexOf("y")?(r=o.substr(0,4),n=o.substr(4,11)):(r=o.substr(6,11),n=o.substr(0,6)),t&&(n!==a.leapday||i(r))},definitions:{1:{validator:function(e,t,i,a,n){var r=n.regex.val1.test(e);return a||r||e.charAt(1)!==n.separator&&"-./".indexOf(e.charAt(1))===-1||!(r=n.regex.val1.test("0"+e.charAt(0)))?r:(t.buffer[i-1]="0",{refreshFromBuffer:{start:i-1,end:i},pos:i,c:e.charAt(0)})},cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){var r=e;isNaN(t.buffer[i+1])||(r+=t.buffer[i+1]);var o=1===r.length?n.regex.val1pre.test(r):n.regex.val1.test(r);if(!a&&!o){if(o=n.regex.val1.test(e+"0"))return t.buffer[i]=e,t.buffer[++i]="0",{pos:i,c:"0"};if(o=n.regex.val1.test("0"+e))return t.buffer[i]="0",i++,{pos:i}}return o},cardinality:1}]},2:{validator:function(e,t,i,a,n){var r=n.getFrontValue(t.mask,t.buffer,n);r.indexOf(n.placeholder[0])!==-1&&(r="01"+n.separator);var o=n.regex.val2(n.separator).test(r+e);return a||o||e.charAt(1)!==n.separator&&"-./".indexOf(e.charAt(1))===-1||!(o=n.regex.val2(n.separator).test(r+"0"+e.charAt(0)))?o:(t.buffer[i-1]="0",{refreshFromBuffer:{start:i-1,end:i},pos:i,c:e.charAt(0)})},cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){isNaN(t.buffer[i+1])||(e+=t.buffer[i+1]);var r=n.getFrontValue(t.mask,t.buffer,n);r.indexOf(n.placeholder[0])!==-1&&(r="01"+n.separator);var o=1===e.length?n.regex.val2pre(n.separator).test(r+e):n.regex.val2(n.separator).test(r+e);return a||o||!(o=n.regex.val2(n.separator).test(r+"0"+e))?o:(t.buffer[i]="0",i++,{pos:i})},cardinality:1}]},y:{validator:function(e,t,i,a,n){return n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear)},cardinality:4,prevalidator:[{validator:function(e,t,i,a,n){var r=n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear);if(!a&&!r){var o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e+"0").toString().slice(0,1);if(r=n.isInYearRange(o+e,n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i++]=o.charAt(0),{pos:i};if(o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e+"0").toString().slice(0,2),r=n.isInYearRange(o+e,n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i++]=o.charAt(0),t.buffer[i++]=o.charAt(1),{pos:i}}return r},cardinality:1},{validator:function(e,t,i,a,n){var r=n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear);if(!a&&!r){var o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e).toString().slice(0,2);if(r=n.isInYearRange(e[0]+o[1]+e[1],n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i++]=o.charAt(1),{pos:i};if(o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e).toString().slice(0,2),r=n.isInYearRange(o+e,n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i-1]=o.charAt(0),t.buffer[i++]=o.charAt(1),t.buffer[i++]=e.charAt(0),{refreshFromBuffer:{start:i-3,end:i},pos:i}}return r},cardinality:2},{validator:function(e,t,i,a,n){return n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+i+"[0-3])|(02"+i+"[0-2])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+i+"30)|((0[13578]|1[02])"+i+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val((s.getMonth()+1).toString()+s.getDate().toString()+s.getFullYear().toString()),o.trigger("setvalue")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val(s.getFullYear().toString()+(s.getMonth()+1).toString()+s.getDate().toString()),o.trigger("setvalue")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(e,t,i,a,n){if("24"===n.hourFormat&&24===parseInt(e,10))return t.buffer[i-1]="0",t.buffer[i]="0",{refreshFromBuffer:{start:i-1,end:i},c:"0"};var r=n.regex.hrs.test(e);if(!a&&!r&&(e.charAt(1)===n.timeseparator||"-.:".indexOf(e.charAt(1))!==-1)&&(r=n.regex.hrs.test("0"+e.charAt(0))))return t.buffer[i-1]="0",t.buffer[i]=e.charAt(0),i++,{refreshFromBuffer:{start:i-2,end:i},pos:i,c:n.timeseparator};if(r&&"24"!==n.hourFormat&&n.regex.hrs24.test(e)){var o=parseInt(e,10);return 24===o?(t.buffer[i+5]="a",t.buffer[i+6]="m"):(t.buffer[i+5]="p",t.buffer[i+6]="m"),o-=12,o<10?(t.buffer[i]=o.toString(),t.buffer[i-1]="0"):(t.buffer[i]=o.toString().charAt(1),t.buffer[i-1]=o.toString().charAt(0)),{refreshFromBuffer:{start:i-1,end:i+6},c:t.buffer[i]}}return r},cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){var r=n.regex.hrspre.test(e);return a||r||!(r=n.regex.hrs.test("0"+e))?r:(t.buffer[i]="0",i++,{pos:i})},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){var r=n.regex.mspre.test(e);return a||r||!(r=n.regex.ms.test("0"+e))?r:(t.buffer[i]="0",i++,{pos:i})},cardinality:1}]},t:{validator:function(e,t,i,a,n){return n.regex.ampm.test(e+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"mm/dd/yyyy hh:mm xm":{mask:"1/2/y h:s t\\m",placeholder:"mm/dd/yyyy hh:mm xm",alias:"datetime12",regex:{val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+i+"[0-3])|(02"+i+"[0-2])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+i+"30)|((0[13578]|1[02])"+i+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val((s.getMonth()+1).toString()+s.getDate().toString()+s.getFullYear().toString()),o.trigger("setvalue")}}},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"},shamsi:{regex:{val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"[0-3])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"(0[1-9]|[12][0-9]))|((0[1-9]|1[012])"+i+"30)|((0[1-6])"+i+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},yearrange:{minyear:1300,maxyear:1499},mask:"y/1/2",leapday:"/12/30",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",clearIncomplete:!0}}),t}(jQuery,Inputmask),function(e,t){return t.extendDefinitions({A:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,casing:"upper"},"&":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,casing:"upper"},"#":{validator:"[0-9A-Fa-f]",cardinality:1,casing:"upper"}}),t.extendAliases({url:{definitions:{i:{validator:".",cardinality:1}},mask:"(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",insertMode:!1,autoUnmask:!1,inputmode:"url"},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(e,t,i,a,n){return i-1>-1&&"."!==t.buffer[i-1]?(e=t.buffer[i-1]+e,e=i-2>-1&&"."!==t.buffer[i-2]?t.buffer[i-2]+e:"0"+e):e="00"+e,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e)},cardinality:1}},onUnMask:function(e,t,i){return e},inputmode:"numeric"},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",greedy:!1,onBeforePaste:function(e,t){return e=e.toLowerCase(),e.replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"},"-":{validator:"[0-9A-Za-z-]",cardinality:1,casing:"lower"}},onUnMask:function(e,t,i){return e},inputmode:"email"},mac:{mask:"##:##:##:##:##:##"},vin:{mask:"V{13}9{4}",definitions:{V:{validator:"[A-HJ-NPR-Za-hj-npr-z\\d]",cardinality:1,casing:"upper"}},clearIncomplete:!0,autoUnmask:!0}}),t}(jQuery,Inputmask),function(e,t){return t.extendAliases({numeric:{mask:function(e){function i(t){for(var i="",a=0;a<t.length;a++)i+=e.definitions[t.charAt(a)]||e.optionalmarker.start===t.charAt(a)||e.optionalmarker.end===t.charAt(a)||e.quantifiermarker.start===t.charAt(a)||e.quantifiermarker.end===t.charAt(a)||e.groupmarker.start===t.charAt(a)||e.groupmarker.end===t.charAt(a)||e.alternatormarker===t.charAt(a)?"\\"+t.charAt(a):t.charAt(a);return i}if(0!==e.repeat&&isNaN(e.integerDigits)&&(e.integerDigits=e.repeat),e.repeat=0,e.groupSeparator===e.radixPoint&&("."===e.radixPoint?e.groupSeparator=",":","===e.radixPoint?e.groupSeparator=".":e.groupSeparator="")," "===e.groupSeparator&&(e.skipOptionalPartCharacter=void 0),e.autoGroup=e.autoGroup&&""!==e.groupSeparator,e.autoGroup&&("string"==typeof e.groupSize&&isFinite(e.groupSize)&&(e.groupSize=parseInt(e.groupSize)),isFinite(e.integerDigits))){var a=Math.floor(e.integerDigits/e.groupSize),n=e.integerDigits%e.groupSize;e.integerDigits=parseInt(e.integerDigits)+(0===n?a-1:a),e.integerDigits<1&&(e.integerDigits="*")}e.placeholder.length>1&&(e.placeholder=e.placeholder.charAt(0)),"radixFocus"===e.positionCaretOnClick&&""===e.placeholder&&e.integerOptional===!1&&(e.positionCaretOnClick="lvp"),e.definitions[";"]=e.definitions["~"],e.definitions[";"].definitionSymbol="~",e.numericInput===!0&&(e.positionCaretOnClick="radixFocus"===e.positionCaretOnClick?"lvp":e.positionCaretOnClick,e.digitsOptional=!1,isNaN(e.digits)&&(e.digits=2),e.decimalProtect=!1);var r="[+]";if(r+=i(e.prefix),r+=e.integerOptional===!0?"~{1,"+e.integerDigits+"}":"~{"+e.integerDigits+"}",void 0!==e.digits){e.decimalProtect&&(e.radixPointDefinitionSymbol=":");var o=e.digits.toString().split(",");isFinite(o[0]&&o[1]&&isFinite(o[1]))?r+=(e.decimalProtect?":":e.radixPoint)+";{"+e.digits+"}":(isNaN(e.digits)||parseInt(e.digits)>0)&&(r+=e.digitsOptional?"["+(e.decimalProtect?":":e.radixPoint)+";{1,"+e.digits+"}]":(e.decimalProtect?":":e.radixPoint)+";{"+e.digits+"}")}return r+=i(e.suffix),r+="[-]",e.greedy=!1,null!==e.min&&(e.min=e.min.toString().replace(new RegExp(t.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.min=e.min.replace(e.radixPoint,"."))),null!==e.max&&(e.max=e.max.toString().replace(new RegExp(t.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.max=e.max.replace(e.radixPoint,"."))),r},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,radixPoint:".",positionCaretOnClick:"radixFocus",groupSize:3,groupSeparator:"",autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",integerOptional:!0,prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:null,max:null,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,inputmode:"numeric",postFormat:function(i,a,n){n.numericInput===!0&&(i=i.reverse(),isFinite(a)&&(a=i.join("").length-a-1));var r,o;a=a>=i.length?i.length-1:a<0?0:a;var s=i[a],l=i.slice();s===n.groupSeparator&&(l.splice(a--,1),s=l[a]);var u=l.join("").match(new RegExp("^"+t.escapeRegex(n.negationSymbol.front)));u=null!==u&&1===u.length,a>(u?n.negationSymbol.front.length:0)+n.prefix.length&&a<l.length-n.suffix.length&&(l[a]="!");var c=l.join(""),p=l.join();if(u&&(c=c.replace(new RegExp("^"+t.escapeRegex(n.negationSymbol.front)),""),c=c.replace(new RegExp(t.escapeRegex(n.negationSymbol.back)+"$"),"")),c=c.replace(new RegExp(t.escapeRegex(n.suffix)+"$"),""),c=c.replace(new RegExp("^"+t.escapeRegex(n.prefix)),""),c.length>0&&n.autoGroup||c.indexOf(n.groupSeparator)!==-1){var d=t.escapeRegex(n.groupSeparator);c=c.replace(new RegExp(d,"g"),"");var f=c.split(s===n.radixPoint?"!":n.radixPoint);if(c=""===n.radixPoint?c:f[0],s!==n.negationSymbol.front&&(c=c.replace("!","?")),c.length>n.groupSize)for(var m=new RegExp("([-+]?[\\d?]+)([\\d?]{"+n.groupSize+"})");m.test(c)&&""!==n.groupSeparator;)c=c.replace(m,"$1"+n.groupSeparator+"$2"),c=c.replace(n.groupSeparator+n.groupSeparator,n.groupSeparator);c=c.replace("?","!"),""!==n.radixPoint&&f.length>1&&(c+=(s===n.radixPoint?"!":n.radixPoint)+f[1])}c=n.prefix+c+n.suffix,u&&(c=n.negationSymbol.front+c+n.negationSymbol.back);var h=p!==c.split("").join(),v=e.inArray("!",c);if(v===-1&&(v=a),h){for(i.length=c.length,r=0,o=c.length;r<o;r++)i[r]=c.charAt(r);i[v]=s}return v=n.numericInput&&isFinite(a)?i.join("").length-v-1:v,n.numericInput&&(i=i.reverse(),e.inArray(n.radixPoint,i)<v&&i.join("").length-n.suffix.length!==v&&(v-=1)),{pos:v,refreshFromBuffer:h,buffer:i,isNegative:u}},onBeforeWrite:function(i,a,n,r){var o;if(i&&("blur"===i.type||"checkval"===i.type||"keydown"===i.type)){var s=r.numericInput?a.slice().reverse().join(""):a.join(""),l=s.replace(r.prefix,"");l=l.replace(r.suffix,""),l=l.replace(new RegExp(t.escapeRegex(r.groupSeparator),"g"),""),","===r.radixPoint&&(l=l.replace(r.radixPoint,"."));var u=l.match(new RegExp("[-"+t.escapeRegex(r.negationSymbol.front)+"]","g"));if(u=null!==u&&1===u.length,l=l.replace(new RegExp("[-"+t.escapeRegex(r.negationSymbol.front)+"]","g"),""),
l=l.replace(new RegExp(t.escapeRegex(r.negationSymbol.back)+"$"),""),isNaN(r.placeholder)&&(l=l.replace(new RegExp(t.escapeRegex(r.placeholder),"g"),"")),l=l===r.negationSymbol.front?l+"0":l,""!==l&&isFinite(l)){var c=parseFloat(l),p=u?c*-1:c;if(null!==r.min&&isFinite(r.min)&&p<parseFloat(r.min)?(c=Math.abs(r.min),u=r.min<0,s=void 0):null!==r.max&&isFinite(r.max)&&p>parseFloat(r.max)&&(c=Math.abs(r.max),u=r.max<0,s=void 0),l=c.toString().replace(".",r.radixPoint).split(""),isFinite(r.digits)){var d=e.inArray(r.radixPoint,l),f=e.inArray(r.radixPoint,s);d===-1&&(l.push(r.radixPoint),d=l.length-1);for(var m=1;m<=r.digits;m++)r.digitsOptional||void 0!==l[d+m]&&l[d+m]!==r.placeholder.charAt(0)?f!==-1&&void 0!==s[f+m]&&(l[d+m]=l[d+m]||s[f+m]):l[d+m]="0";l[l.length-1]===r.radixPoint&&delete l[l.length-1]}if(c.toString()!==l&&c.toString()+"."!==l||u)return l=(r.prefix+l.join("")).split(""),!u||0===c&&"blur"===i.type||(l.unshift(r.negationSymbol.front),l.push(r.negationSymbol.back)),r.numericInput&&(l=l.reverse()),o=r.postFormat(l,r.numericInput?n:n-1,r),o.buffer&&(o.refreshFromBuffer=o.buffer.join("")!==a.join("")),o}}if(r.autoGroup)return o=r.postFormat(a,r.numericInput?n:n-1,r),o.caret=n<(o.isNegative?r.negationSymbol.front.length:0)+r.prefix.length||n>o.buffer.length-(o.isNegative?r.negationSymbol.back.length:0)?o.pos:o.pos+1,o},regex:{integerPart:function(e){return new RegExp("["+t.escapeRegex(e.negationSymbol.front)+"+]?\\d+")},integerNPart:function(e){return new RegExp("[\\d"+t.escapeRegex(e.groupSeparator)+t.escapeRegex(e.placeholder.charAt(0))+"]+")}},signHandler:function(e,t,i,a,n){if(!a&&n.allowMinus&&"-"===e||n.allowPlus&&"+"===e){var r=t.buffer.join("").match(n.regex.integerPart(n));if(r&&r[0].length>0)return t.buffer[r.index]===("-"===e?"+":n.negationSymbol.front)?"-"===e?""!==n.negationSymbol.back?{pos:0,c:n.negationSymbol.front,remove:0,caret:i,insert:{pos:t.buffer.length-1,c:n.negationSymbol.back}}:{pos:0,c:n.negationSymbol.front,remove:0,caret:i}:""!==n.negationSymbol.back?{pos:0,c:"+",remove:[0,t.buffer.length-1],caret:i}:{pos:0,c:"+",remove:0,caret:i}:t.buffer[0]===("-"===e?n.negationSymbol.front:"+")?"-"===e&&""!==n.negationSymbol.back?{remove:[0,t.buffer.length-1],caret:i-1}:{remove:0,caret:i-1}:"-"===e?""!==n.negationSymbol.back?{pos:0,c:n.negationSymbol.front,caret:i+1,insert:{pos:t.buffer.length,c:n.negationSymbol.back}}:{pos:0,c:n.negationSymbol.front,caret:i+1}:{pos:0,c:e,caret:i+1}}return!1},radixHandler:function(t,i,a,n,r){if(!n&&r.numericInput!==!0&&t===r.radixPoint&&void 0!==r.digits&&(isNaN(r.digits)||parseInt(r.digits)>0)){var o=e.inArray(r.radixPoint,i.buffer),s=i.buffer.join("").match(r.regex.integerPart(r));if(o!==-1&&i.validPositions[o])return i.validPositions[o-1]?{caret:o+1}:{pos:s.index,c:s[0],caret:o+1};if(!s||"0"===s[0]&&s.index+1!==a)return i.buffer[s?s.index:a]="0",{pos:(s?s.index:a)+1,c:r.radixPoint}}return!1},leadingZeroHandler:function(t,i,a,n,r,o){if(!n){var s=i.buffer.slice("");if(s.splice(0,r.prefix.length),s.splice(s.length-r.suffix.length,r.suffix.length),r.numericInput===!0){var s=s.reverse(),l=s[0];if("0"===l&&void 0===i.validPositions[a-1])return{pos:a,remove:s.length-1}}else{a-=r.prefix.length;var u=e.inArray(r.radixPoint,s),c=s.slice(0,u!==-1?u:void 0).join("").match(r.regex.integerNPart(r));if(c&&(u===-1||a<=u)){var p=u===-1?0:parseInt(s.slice(u+1).join(""));if(0===c[0].indexOf(""!==r.placeholder?r.placeholder.charAt(0):"0")&&(c.index+1===a||o!==!0&&0===p))return i.buffer.splice(c.index+r.prefix.length,1),{pos:c.index+r.prefix.length,remove:c.index+r.prefix.length};if("0"===t&&a<=c.index&&c[0]!==r.groupSeparator)return!1}}}return!0},definitions:{"~":{validator:function(i,a,n,r,o,s){var l=o.signHandler(i,a,n,r,o);if(!l&&(l=o.radixHandler(i,a,n,r,o),!l&&(l=r?new RegExp("[0-9"+t.escapeRegex(o.groupSeparator)+"]").test(i):new RegExp("[0-9]").test(i),l===!0&&(l=o.leadingZeroHandler(i,a,n,r,o,s),l===!0)))){var u=e.inArray(o.radixPoint,a.buffer);l=u!==-1&&(o.digitsOptional===!1||a.validPositions[n])&&o.numericInput!==!0&&n>u&&!r?{pos:n,remove:n}:{pos:n}}return l},cardinality:1},"+":{validator:function(e,t,i,a,n){var r=n.signHandler(e,t,i,a,n);return!r&&(a&&n.allowMinus&&e===n.negationSymbol.front||n.allowMinus&&"-"===e||n.allowPlus&&"+"===e)&&(r=!(!a&&"-"===e)||(""!==n.negationSymbol.back?{pos:i,c:"-"===e?n.negationSymbol.front:"+",caret:i+1,insert:{pos:t.buffer.length,c:n.negationSymbol.back}}:{pos:i,c:"-"===e?n.negationSymbol.front:"+",caret:i+1})),r},cardinality:1,placeholder:""},"-":{validator:function(e,t,i,a,n){var r=n.signHandler(e,t,i,a,n);return!r&&a&&n.allowMinus&&e===n.negationSymbol.back&&(r=!0),r},cardinality:1,placeholder:""},":":{validator:function(e,i,a,n,r){var o=r.signHandler(e,i,a,n,r);if(!o){var s="["+t.escapeRegex(r.radixPoint)+"]";o=new RegExp(s).test(e),o&&i.validPositions[a]&&i.validPositions[a].match.placeholder===r.radixPoint&&(o={caret:a+1})}return o},cardinality:1,placeholder:function(e){return e.radixPoint}}},onUnMask:function(e,i,a){if(""===i&&a.nullable===!0)return i;var n=e.replace(a.prefix,"");return n=n.replace(a.suffix,""),n=n.replace(new RegExp(t.escapeRegex(a.groupSeparator),"g"),""),a.unmaskAsNumber?(""!==a.radixPoint&&n.indexOf(a.radixPoint)!==-1&&(n=n.replace(t.escapeRegex.call(this,a.radixPoint),".")),Number(n)):n},isComplete:function(e,i){var a=e.join(""),n=e.slice();if(i.postFormat(n,0,i),n.join("")!==a)return!1;var r=a.replace(i.prefix,"");return r=r.replace(i.suffix,""),r=r.replace(new RegExp(t.escapeRegex(i.groupSeparator),"g"),""),","===i.radixPoint&&(r=r.replace(t.escapeRegex(i.radixPoint),".")),isFinite(r)},onBeforeMask:function(e,i){if(i.numericInput===!0&&(e=e.split("").reverse().join("")),""!==i.radixPoint&&isFinite(e)){var a=e.split("."),n=""!==i.groupSeparator?parseInt(i.groupSize):0;2===a.length&&(a[0].length>n||a[1].length>n)&&(e=e.toString().replace(".",i.radixPoint))}var r=e.match(/,/g),o=e.match(/\./g);if(o&&r?o.length>r.length?(e=e.replace(/\./g,""),e=e.replace(",",i.radixPoint)):r.length>o.length?(e=e.replace(/,/g,""),e=e.replace(".",i.radixPoint)):e=e.indexOf(".")<e.indexOf(",")?e.replace(/\./g,""):e=e.replace(/,/g,""):e=e.replace(new RegExp(t.escapeRegex(i.groupSeparator),"g"),""),0===i.digits&&(e.indexOf(".")!==-1?e=e.substring(0,e.indexOf(".")):e.indexOf(",")!==-1&&(e=e.substring(0,e.indexOf(",")))),""!==i.radixPoint&&isFinite(i.digits)&&e.indexOf(i.radixPoint)!==-1){var s=e.split(i.radixPoint),l=s[1].match(new RegExp("\\d*"))[0];if(parseInt(i.digits)<l.toString().length){var u=Math.pow(10,parseInt(i.digits));e=e.replace(t.escapeRegex(i.radixPoint),"."),e=Math.round(parseFloat(e)*u)/u,e=e.toString().replace(".",i.radixPoint)}}return i.numericInput===!0&&(e=e.split("").reverse().join("")),e.toString()},canClearPosition:function(e,t,i,a,n){var r=e.validPositions[t].input,o=r!==n.radixPoint||null!==e.validPositions[t].match.fn&&n.decimalProtect===!1||isFinite(r)||t===i||r===n.groupSeparator||r===n.negationSymbol.front||r===n.negationSymbol.back;return o},onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey)switch(i.keyCode){case t.keyCode.UP:o.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(r.step)),o.trigger("setvalue");break;case t.keyCode.DOWN:o.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(r.step)),o.trigger("setvalue")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowPlus:!1,allowMinus:!1}}),t}(jQuery,Inputmask),function(e,t){function i(e,t){var i=(e.mask||e).replace(/#/g,"9").replace(/\)/,"9").replace(/[+()#-]/g,""),a=(t.mask||t).replace(/#/g,"9").replace(/\)/,"9").replace(/[+()#-]/g,""),n=(e.mask||e).split("#")[0],r=(t.mask||t).split("#")[0];return 0===r.indexOf(n)?-1:0===n.indexOf(r)?1:i.localeCompare(a)}var a=t.prototype.analyseMask;return t.prototype.analyseMask=function(t,i){function n(e,i,a){i=i||"",a=a||o,""!==i&&(a[i]={});for(var r="",s=a[i]||a,l=e.length-1;l>=0;l--)t=e[l].mask||e[l],r=t.substr(0,1),s[r]=s[r]||[],s[r].unshift(t.substr(1)),e.splice(l,1);for(var u in s)s[u].length>500&&n(s[u].slice(),u,s)}function r(t){var a="",n=[];for(var o in t)e.isArray(t[o])?1===t[o].length?n.push(o+t[o]):n.push(o+i.groupmarker.start+t[o].join(i.groupmarker.end+i.alternatormarker+i.groupmarker.start)+i.groupmarker.end):n.push(o+r(t[o]));return a+=1===n.length?n[0]:i.groupmarker.start+n.join(i.groupmarker.end+i.alternatormarker+i.groupmarker.start)+i.groupmarker.end}var o={};i.phoneCodes&&i.phoneCodes.length>1e3&&(t=t.substr(1,t.length-2),n(t.split(i.groupmarker.end+i.alternatormarker+i.groupmarker.start)),t=r(o));var s=a.call(this,t,i);return s},t.extendAliases({abstractphone:{groupmarker:{start:"<",end:">"},countrycode:"",phoneCodes:[],mask:function(e){return e.definitions={"#":e.definitions[9]},e.phoneCodes.sort(i)},keepStatic:!0,onBeforeMask:function(e,t){var i=e.replace(/^0{1,2}/,"").replace(/[\s]/g,"");return(i.indexOf(t.countrycode)>1||i.indexOf(t.countrycode)===-1)&&(i="+"+t.countrycode+i),i},onUnMask:function(e,t,i){return t},inputmode:"tel"}}),t}(jQuery,Inputmask),function(e,t){return t.extendAliases({Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(e,t){return new RegExp(t.regex).test(e.join(""))},definitions:{r:{validator:function(t,i,a,n,r){function o(e,t){this.matches=[],this.isGroup=e||!1,this.isQuantifier=t||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function s(){var e,t,i=new o,a=[];for(r.regexTokens=[];e=r.tokenizer.exec(r.regex);)switch(t=e[0],t.charAt(0)){case"(":a.push(new o(!0));break;case")":c=a.pop(),a.length>0?a[a.length-1].matches.push(c):i.matches.push(c);break;case"{":case"+":case"*":var n=new o(!1,!0);t=t.replace(/[{}]/g,"");var s=t.split(","),l=isNaN(s[0])?s[0]:parseInt(s[0]),u=1===s.length?l:isNaN(s[1])?s[1]:parseInt(s[1]);if(n.quantifier={min:l,max:u},a.length>0){var p=a[a.length-1].matches;e=p.pop(),e.isGroup||(c=new o(!0),c.matches.push(e),e=c),p.push(e),p.push(n)}else e=i.matches.pop(),e.isGroup||(c=new o(!0),c.matches.push(e),e=c),i.matches.push(e),i.matches.push(n);break;default:a.length>0?a[a.length-1].matches.push(t):i.matches.push(t)}i.matches.length>0&&r.regexTokens.push(i)}function l(t,i){var a=!1;i&&(d+="(",m++);for(var n=0;n<t.matches.length;n++){var r=t.matches[n];if(r.isGroup===!0)a=l(r,!0);else if(r.isQuantifier===!0){var o=e.inArray(r,t.matches),s=t.matches[o-1],c=d;if(isNaN(r.quantifier.max)){for(;r.repeaterPart&&r.repeaterPart!==d&&r.repeaterPart.length>d.length&&!(a=l(s,!0)););a=a||l(s,!0),a&&(r.repeaterPart=d),d=c+r.quantifier.max}else{for(var p=0,f=r.quantifier.max-1;p<f&&!(a=l(s,!0));p++);d=c+"{"+r.quantifier.min+","+r.quantifier.max+"}"}}else if(void 0!==r.matches)for(var h=0;h<r.length&&!(a=l(r[h],i));h++);else{var v;if("["==r.charAt(0)){v=d,v+=r;for(var g=0;g<m;g++)v+=")";var y=new RegExp("^("+v+")$");a=y.test(u)}else for(var k=0,x=r.length;k<x;k++)if("\\"!==r.charAt(k)){v=d,v+=r.substr(0,k+1),v=v.replace(/\|$/,"");for(var g=0;g<m;g++)v+=")";var y=new RegExp("^("+v+")$");if(a=y.test(u))break}d+=r}if(a)break}return i&&(d+=")",m--),a}var u,c,p=i.buffer.slice(),d="",f=!1,m=0;null===r.regexTokens&&s(),p.splice(a,0,t),u=p.join("");for(var h=0;h<r.regexTokens.length;h++){var v=r.regexTokens[h];if(f=l(v,v.isGroup))break}return f},cardinality:1}}}}),t}(jQuery,Inputmask);
//# sourceMappingURL=jquery.inputmask.bundle.min.js.map
(function ($) {
    $.fn.autogrow = function () {
        this.filter('textarea').each(function () {
            var $this = $(this),
                minHeight = $this.height(),
                shadow = $('<div></div>').css({
                    position:   'absolute',
                    top: -10000,
                    left: -10000,
                    width: $(this).width(),
                    fontSize: $this.css('fontSize'),
                    fontFamily: $this.css('fontFamily'),
                    lineHeight: $this.css('lineHeight'),
//                    padding: $this.css('padding'),
//                    border: $this.css('border'),
                    resize: 'none'
                }).addClass('shadow').appendTo(document.body),
                update = function () {
                    var t = this;
                    setTimeout(function () {
                        var val = t.value.replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/&/g, '&amp;')
                                .replace(/\n/g, '<br/>&nbsp;');
    
                        if ($.trim(val) === '') {
                            val = 'a';
                        }
    
                        shadow.html(val);
                        $(t).css('height', Math.max(shadow[0].offsetHeight + 10, minHeight));
                    }, 0);
                };

            $this.css('overflow','hidden').change(update).keyup(update).keydown(update).focus(update);
            update.apply(this);
        });

        return this;
    };

}(jQuery));
function FE_F() {
    this.h = {};
    this.h['onload'] = [];
    this.h['onready'] = [];
    this.h['onresize'] = [];
    this.was_run = {};
}

/**
 * Добавляет функцию-слушателя к событию
 *
 * @param e - название события (можно указать несколько в виде массива)
 * @param code - код/функция слушателя
 * @param params - параметры, которые нужно передать в функцию-слушатель
 */
FE_F.prototype.add = function (e, code, params) {
    if ('undefined' === typeof params) {
        params = {};
    }
    if ('function' === typeof e.pop) {
        // eventName - is array
        for (var i = 0; i < e.length; i++) {
            this.add(e[i], code, params);
        }
        i = null;
    } else {
        if ('undefined' === typeof this.h[e]) {
            this.h[e] = [];
        }
        this.h[e].push({f: code, p: params});
    }
};

/**
 * Добавленный обработчик выполнится лишь один раз
 */
FE_F.prototype.one = function (e, code, params) {
    params = $.extend(params, {one: true});
    this.add(e, code, params);
};

/**
 * Запуск события
 *
 * @param eventName - название события
 * @param event - параметр, передаваемый прямо в функцию-слушатель
 * @param target - параметр, передаваемый прямо в функцию-слушатель
 */
FE_F.prototype.run = function (eventName, event, target) {
    var handler;

    if (!event) {
        event = {};
    }

    if (!this.h.hasOwnProperty(eventName)) {
        this.h[eventName] = [];
    }

    var i = 0;
    while (this.h[eventName].hasOwnProperty(i)) {
        handler = this.h[eventName][i];
        try {
            event.hook_index = i;
            event.event_name = eventName;
            event.event_params = handler.p;

            switch (typeof handler.f) {
                case 'function':
                    handler.f(event, target);
                    if (event.event_params != null && event.event_params.one) {
                        delete this.h[eventName][i];
                    }
                    break;
                case 'string':
                    eval(handler.f);
                    break;
            }
        } catch (ex) {
            if (window.console) {
                console.log(ex);
                console.log('[ Ошибка FE.run ] ' + ex.stack);
                if ('string' === typeof handler.f) {
                    console.log('Expression:', handler.f);
                }
            }
        }
        i++;
    }

    this.was_run[eventName] = true;
    handler = i = null;
};

FE_F.prototype.wasRun = function (event_name) {
    return this.was_run && ('undefined' !== typeof this.was_run[event_name]) && this.was_run[event_name];
};

FE_F.prototype.detach = function (event_name, hook_index) {
    if ("undefined" === typeof (this.h[event_name]) || "undefined" === typeof (this.h[event_name][hook_index])) {
        return;
    }

    this.h[event_name].splice(hook_index, 1);
};

/**
 * Запускает событие и после этого очищает список слушателей
 *
 * @param eventName
 * @param event
 * @param target
 */
FE_F.prototype.runAndClr = function (eventName, event, target) {
    this.run(eventName, event, target);
    this.clr(eventName);
};

/**
 * Очищает список слушателей события
 *
 * @param eventName
 */
FE_F.prototype.clr = function (eventName) {
    this.h[eventName] = [];
};

/**
 * Добавляет слушателя на событие onready
 *
 * @param f - код/функция слушателя
 */
FE_F.prototype.runOnReady = function (f) {
    if (this.wasRun('onready')) {
        try {
            switch (typeof f) {
                case 'function':
                    f.apply(this);
                    break;
                case 'string':
                    eval(f);
                    break;
            }
        } catch (ex) {
            if (window.console) {
                console.log(ex);
                console.log('[ Ошибка runOnReady ] ' + ex.stack);
                if ('string' == typeof f) {
                    console.log('Expression:', f);
                }
            }
        }
    } else {
        this.add('onready', f);
    }
};

/**
 * Добавляет слушателя на событие ready определенного объекта objectName
 *
 * @param objectName - название объекта, каким он представлен в window
 * @param f - код/функция слушателя
 */
FE_F.prototype.runOnObjectReady = function (objectName, f) {
    var obj = null,
        isDefined = null;

    if (-1 === objectName.indexOf('.')) {
        isDefined = ('undefined' !== typeof window[objectName]);
        if (isDefined) {
            obj = window[objectName];
        }
    } else {
        var e = objectName.split('.');
        isDefined = (e.length > 0 && 'undefined' !== typeof window[e[0]]);
        if (isDefined) {
            obj = window[e[0]];
            for (var i=1; i< e.length; i++) {
                isDefined = ('undefined' !== typeof obj[e[i]]);
                if (isDefined) {
                    obj = obj[e[i]];
                }
            }
        }
    }

    if (true === isDefined) {
        if ('function' === typeof obj.isReady) {
            if (obj.isReady()) {
                try {
                    switch (typeof f) {
                        case 'function':
                            f.apply(window[objectName]);
                            break;
                        case 'string':
                            eval(f);
                            break;
                    }
                } catch (e) {
                    if (window.console) {
                        console.log(e);
                        console.log('[ Ошибка FE.runOnObjectReady ] ' + e.stack);
                        if ('string' == typeof f) {
                            console.log('Expression: ', f);
                        }
                    }
                }
            } else {
                this.add(objectName + '/ready', f);
            }
        } else {
            window.console && console.error('Object ['+objectName+'] has no function isReady !!!');
        }
    } else {
        this.add(objectName + '/ready', f);
    }
};

// ---------------

window.FE = new FE_F();

$(document).ready(function (e) {
    FE.runAndClr('onready', e, this);
});

$(window).load(function (e) {
    FE.runAndClr('onload', e, this);
});

$(window).resize(function (e) {
    if (FE.resizeTimeout) {
        clearTimeout(FE.resizeTimeout);
    }
    FE.resizeTimeout = setTimeout("FE.run('onresize')", 20);
});