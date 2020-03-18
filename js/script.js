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
})

function search() {
    var query = $('#query').val();
    resetSearch();

    var api_key = 'b493320b6020648e92f5a77b43f9e0f7';
    var urlMovie = 'https://api.themoviedb.org/3/search/movie';
    var urlSeries = 'https://api.themoviedb.org/3/search/tv';

    getData(query, api_key, urlMovie);

}

function resetSearch() {
    $('.films').html('');
    $('#query').val('');
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
            console.log(data.results);
            for (var i = 0; i < risultati.length; i++) {
                $(this).each(function () {
                    console.log(risultati[i].title);
                    console.log(risultati[i].original_title);
                    console.log(risultati[i].original_language);
                    console.log(risultati[i].vote_average);
                });

            }
        },
        error: function (error) {
            alert('ATTENZIONE!! Scrivi il titolo che cerchi!')
        }
    });
}

function printStar(num) {
    var num = Math.ceil(num / 2);
    var star= '';
    for (var i = 1; i <= 5; i++) {
        if(i <= num){
            star == '<i class="fas fa-star"></i>';
        }else {
            star == '<i class="far fa-star"></i>';
        }
    }
    return star
}











});
