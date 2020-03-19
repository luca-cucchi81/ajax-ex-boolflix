//api.key
//b493320b6020648e92f5a77b43f9e0f7

$(document).ready(function () {


$('#button').click(function () {
    search();
});
$('#query').keyup(function (event) {
  if(event.which == 13) {
    search();
  }
});

function search() {
    var query = $('#query').val();
    resetSearch();

    var api_key = 'b493320b6020648e92f5a77b43f9e0f7';
    var urlMovie = 'https://api.themoviedb.org/3/search/movie';
    var urlSeries = 'https://api.themoviedb.org/3/search/tv';

    var typeMovie = 'film';
    var typeSeries = 'tvshow';

    getData(query, api_key, urlMovie, typeMovie, '.films');
    getData(query, api_key, urlSeries, typeSeries, '.serie');

};

// funzione reset
function resetSearch() {
    $('.films').html('');
    $('.serie').html('');
    $('#query').val('');
};

function getData(ricerca, api_key, url, type, div) {
    $.ajax({
        url: url,
        method: 'GET',
        data: {
            api_key: api_key,
            query: ricerca,
            language: 'it-IT'
        },
        success: function (data) {
            if(data.total_results > 0) {
              var results = data.results;
              printResult(type, results);
            }
        },
        error: function (error) {
            alert('ATTENZIONE!! Scrivi il titolo che cerchi!')
        }
    });
};

// funzione stampa risultati
function printResult (type, results) {
    var source = $('#film-template').html();
    var template = Handlebars.compile(source);

    var title;
    var originalTitle;
    for (var i = 0; i < results.length; i++) {
        var thisResult = results[i];
        if (type == 'film') {
            title = thisResult.title;
            originalTitle = thisResult.original_title;
        }else if (type == 'tvshow')
            title = thisResult.name;
            originalTitle = thisResult.original_name;


        var poster;
        var posterImg = thisResult.poster_path;
        var urlImg = 'https://image.tmdb.org/t/p/w342'

        if (posterImg == null) {
            poster = 'img/noImage.png'
        } else {
            poster = urlImg + posterImg
        }

        var context = {
            title: title,
            originalTitle: originalTitle,
            original_language: printFlag (thisResult.original_language),
            vote_average: printStar(thisResult.vote_average),
            overview: thisResult.overview,
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
}
  return string;
};


});
