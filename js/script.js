//api.key
//b493320b6020648e92f5a77b43f9e0f7

$(document).ready(function () {

$('button').click(function () {
    search();
});

function search() {
    var query = $('#query').val();
    var api_key = 'b493320b6020648e92f5a77b43f9e0f7';
    var urlMovie = 'https://api.themoviedb.org/3/search/movie';

    getData(query, api_key, urlMovie)
}

function getData(ricerca, api_key, url) {
    $.ajax({
        url: url,
        method: 'GET',
        data: {
            api_key: api_key,
            query: ricerca,
            language: 'it-IT'
        },
        success: function (data) {
            var risultati = data.results;
            for (var i = 0; i < risultati.length; i++) {
                for (var key in risultati[i]) {
                    console.log(risultati[i].title);
                    console.log(risultati[i].original_title);
                    console.log(risultati[i].original_language);
                    console.log(risultati[i].vote_average);
                }
            }
        },
        error: function (error) {
            alert('ATTENZIONE ERRORE!!')
        }
    });
}
















});
