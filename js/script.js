//api.key
//b493320b6020648e92f5a77b43f9e0f7

$(document).ready(function () {

$('.slide').hide();    //attivazione sezione "utente"
$('.nav-left i').click(function () {
    $('.slide').toggle();
});

$('#button').click(function () {  //al click avvio funzione ricerca film/serie
    search();
});
$('#query').keyup(function (event) {  //alla pressione del tasto Enter avvio funzione ricerca film/serie
  if(event.keyCode == 13) {
    search();
  }
});

// === FUNZIONI === //

// funzione ricerca film/serie
function search() {
    var query = $('#query').val();
    resetSearch();

    var api_key = 'b493320b6020648e92f5a77b43f9e0f7';
    var urlMovie = 'https://api.themoviedb.org/3/search/movie';
    var urlSeries = 'https://api.themoviedb.org/3/search/tv';

    var typeMovie = 'film';
    var typeSeries = 'tvshow';

    getData(query, api_key, urlMovie, typeMovie);      // prendo i dati dalla funzione getData (se film)
    getData(query, api_key, urlSeries, typeSeries);   // prendo i dati dalla funzione getData (se serie tv)

};

// funzione reset su nuova ricerca film/serie
function resetSearch() {
    $('.films').empty();
    $('#query').val('');
    $('.slide').hide();
};

// funzione per prendere i dati necessari dall'API
function getData(ricerca, api_key, url, type) {
    $.ajax({
        url: url,
        method: 'GET',
        data: {
            api_key: api_key,
            query: ricerca,
            language: 'it-IT'
        },
        success: function (data) {
                var results = data.results;
                printResult(type, results);
        },
        error: function (error) {
            alert('ATTENZIONE!! Scrivi il titolo che cerchi!');
        }
    });
};

// funzione stampa risultati (a seconda se film o serie tv)
function printResult (type, results) {
    var source = $('#film-template').html();
    var template = Handlebars.compile(source);

    var title;
    var originalTitle;
    for (var i = 0; i < results.length; i++) {
        var thisResult = results[i];
        if (type == 'film') {  //se è un film prendi le chiavi dall'API dei film
            title = thisResult.title;
            originalTitle = thisResult.original_title;
        }else if (type == 'tvshow') // se è una serie tv prendi le chiavi dall'API delle serie tv
            title = thisResult.name;
            originalTitle = thisResult.original_name;

        //selezione copertina film o serie tv + check se non presente
        var poster;
        var posterImg = thisResult.poster_path;
        var urlImg = 'https://image.tmdb.org/t/p/w342'

        if (posterImg == null) {
            poster = 'img/noImage.png'
        } else {
            poster = urlImg + posterImg
        }

        //selezione trama del film / serie tv e check se non disponibile
        var overview;
        var overviewText = thisResult.overview;
        if (overviewText == "") {
            overview = 'non disponibile'
        }else{
            overview = overviewText;
        };

        var context = {  //definizione delle chiavi da dare ad handlebars
            title: title,
            originalTitle: originalTitle,
            original_language: printFlag (thisResult.original_language),
            vote_average: printStar(thisResult.vote_average),
            overview: overview,
            poster: poster
        };
        var html = template(context);
        $('.films').append(html);
    }
};

// funzione crea stella voto
function printStar (num) {
    num = Math.ceil(num / 2);
    var star= '';
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            star += '<i class="fas fa-star"></i>';
        }else {
            star += '<i class="far fa-star"></i>';
        }
    }
    return star
};

// funzione stampa bandiera lingua
function printFlag (string) {
  var availableLang = ['en','it','es','fr','de','ru','ja', 'tr','zh', 'pt', 'cs'];
  if (availableLang.includes(string)) {
    string = 'img/' + string + '.svg';
} else if (string == 'xx'){
    string = 'img/nolang.jpg';
}
  return string;
};


});
