jquery.lazyany
==============

Permite o carregamento atrasado de qualquer elemento.

## Exemplos

    $('p').lazyany(function(el) {
      $(el).css({ backgroundColor: 'green' });
    });

    $('footer').lazyany(function(el) {
      $(el).slideDown();
    });
    
    // Usando plugin de lazyload de imagem
    // <img data-original="http://gustavopaes.net/exemplo.jpg" class="lazyload">
    $('img.lazyload').lazyany({
      offset: 100,
      plugin: 'image'
    });
