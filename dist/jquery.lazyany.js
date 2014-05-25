/*!
 * @name jquery.lazyany
 * @description Permite o carregamento atrasado de qualquer elemento.
 * @author gpaes@uolinc.com
 * @version 0.1.3
 */
!function(n,t,a){"use strict";function e(n,e){var l=n.getBoundingClientRect(),r=(t.pageYOffset||a.scrollTop||0)-(a.clientTop||0),i=e.offset,o=l.top>=0&&l.left>=0&&l.top,u=(t.innerHeight||a.documentElement.clientHeight)+i;return u>=o&&r+l.top+i>=r}function l(n){for(var t=isNaN(n)===!0?u:[u[n]],a=0;a<t.length;a++)for(var l=t[a],i=l.$els,o=0;o<i.size();o++){var s=i[o];e(s,l)===!0&&r(s,l)}}function r(t,a){a.callback.call(a.scope,t);var e=n.grep(a.$els,function(n){return n!==t});a.$els=n(e)}function i(t){for(var a=0;a<t.length;a++)for(var e=n(t[a]).data("lazyany"),l=0;l<u.length;l++)if(e===u[l]){e.$els.data("lazyany",null),u.splice(l,1);break}return!0}var o,u=[];n.fn.lazyany=function(){var t,a={};if("destroy"===arguments[0])return i(this),this;for(var e=0,r=arguments.length;r>e;e++)"function"==typeof arguments[e]&&(t=arguments[e]),"object"==typeof arguments[e]&&(a=arguments[e]);t&&!a.plugin&&(a.callback=t),a.plugin&&n.fn.lazyany.plugins[a.plugin]&&(a.callback=n.fn.lazyany.plugins[a.plugin]),a.$els=this;var o=n.extend({},n.fn.lazyany.defaults,a);return l(u.push(o)-1),this.data("lazyany",o),this},n.fn.lazyany.plugins={image:function(t){var a=n(t),e=a.attr("data-original");e&&a.attr("src",e)}},n.fn.lazyany.defaults={offset:250,callback:n.noop},n(t).on("scroll resize onload",function(){clearTimeout(o),o=setTimeout(l,200)})}(jQuery,window,document,void 0);