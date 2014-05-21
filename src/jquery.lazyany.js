/*!
 * @name jquery.lazyany
 * @description Permite o carregamento atrasado de qualquer elemento.
 * @author gpaes@uolinc.com
 * @version 0.1.3
 */
;(function($, window, document, undefined) {
  'use strict';

  var store = [], poll;

  /**
   * Verifica se o elemento está visível na
   * viewport do navegador.
   *
   * @param {DOMElement} el Elemento DOM que será verificado
   * @return {Boolean}
   */
  function isVisible(el, opts) {
    var coords = el.getBoundingClientRect(),
      topScroll = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
      offset = opts.offset;

    var c_top = (coords.top >= 0 && coords.left >= 0 && coords.top),
      viewport_height = (window.innerHeight || document.documentElement.clientHeight) + offset;

    return (c_top <= viewport_height) && (topScroll + coords.top + offset >= topScroll);
  }

  /**
   * Percorre todas as instâncias do `lazyany` em busca
   * de elementos visíveis.
   *
   * @param {Int} index Opcional. Index da instância. Quando uma instância
   *                    é criada, apenas os elementos dela são validados.
   */
  function run(index) {
    var instances = isNaN(index) === true ? store : [store[index]];

    for(var i = 0; i < instances.length; i++) {
      var instance = instances[i],
        $els = instance.$els;

      for(var e = 0; e < $els.size(); e++) {
        var el = $els[e];

        if(isVisible(el, instance) === true) {
          // elemento está ativo
          yeah(el, instance);
        }
      }
    }
  }

  /**
   * Executado para cada elemento ativo.
   * 
   * @param {DOMElement} el Elemento que está visível
   * @param {lazyany Instance} instance Configuração da instância
   */
  function yeah(el, instance) {
    instance.callback.call(instance.scope, el);

    // remove o elemento da lista, melhorando performance
    // quanto mais elementos forem sendo exibidos
    var els = $.grep(instance.$els, function(_el) {
      return _el !== el;
    });

    instance.$els = $(els);
  }

  /**
   * Remove os eventos registrados para um instância.
   */
  function destroy(instances) {
    for(var i = 0; i < instances.length; i++) {
      var instance = $(instances[i]).data('lazyany');
      for(var s = 0; s < store.length; s++) {
        if(instance === store[s]) {
          instance.$els.data('lazyany', null);
          store.splice(s, 1);
          break;
        }
      }
    }

    return true;
  }

  $.fn.lazyany = function() {
    var options = {}, callback;

    // destroy
    if('destroy' === arguments[0]) {
      destroy(this);
      return this;
    }

    for(var a = 0, t = arguments.length; a < t; a++) {
      if('function' === typeof arguments[a]) {
        callback = arguments[a];
      }

      if('object' === typeof arguments[a]) {
        options = arguments[a];
      }
    }

    if(callback && !options.plugin) {
      options.callback = callback;
    }

    if(options.plugin && $.fn.lazyany.plugins[options.plugin]) {
      options.callback = $.fn.lazyany.plugins[options.plugin];
    }

    options.$els = this;

    var opts = $.extend({}, $.fn.lazyany.defaults, options);

    run(store.push(opts) - 1);

    this.data('lazyany', opts);

    return this;
  };

  // plugins pré-carregados.
  $.fn.lazyany.plugins = {
    // Carregamento atrasado de imagens
    image: function(el) {
      var $el = $(el),
        src = $el.attr('data-original');

      if(src) {
        $el.attr('src', src);
      }
    }
  };

  // configurações padrões para cada instância
  $.fn.lazyany.defaults = {
    offset: 250,     // distância para começar a carregar o elemento antes de ser visível
    callback: $.noop // função que será executado quando o elemento for visível
  };

  /**
   * Procura por novos elementos quando houver scroll e resize
   * do window.
   *
   * Evento `onload` é necessário para navegador webkit do IOS, que no
   * reload automático não dispara evento `scroll`
   */
  $(window).on('scroll resize onload', function _run() {
    clearTimeout(poll);
    poll = setTimeout(run, 200);
  });

}(jQuery, window, document, undefined));
