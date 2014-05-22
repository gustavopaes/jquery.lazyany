jquery.lazyany
==============

Permite o carregamento atrasado de qualquer elemento.

## Exemplos

    $('p').lazyany(function(el) {
      $(el).css({ backgroundColor: 'green' });
    });

    // Faz ajax apenas quando o módulo estiver para ser exibido
    // (300px abaixo do viewport)
    $('.noticias').lazyany({
      offset: 300,
      callback: function(el) {
        $.ajax({
          url: 'news.php',
          success: function(news) { $(el).html(news) }
        });
      }
    });


    // Usando plugin de lazyload de imagem
    // <img data-original="http://gustavopaes.net/exemplo.jpg" class="lazyload">
    $('img.lazyload').lazyany({
      offset: 100,
      plugin: 'image'
    });
