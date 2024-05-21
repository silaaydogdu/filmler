let slideIndex = 1;

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

async function getMovieAll(){
  const response =  await fetch('movie.json')
  const movies = await response.json();
  let movieContent = '';
  const movieListContent = $('#movieListContent')
  movies.map(movie => {

    console.log(movie);
    $('#slider').prepend(`<img class="mySlides" src="${movie.Poster}" style="height: 500px;width: 100%">`)



      movieContent +=` <div class="movie">


              <div class="movie-image"> <span class="play"><span class="name">${movie.Title}</span></span> <a href="https://www.imdb.com/title/${movie.imdbID}/"><img src="${movie.Poster}" alt="" /></a> </div>
 <div class="movie-name">${movie.Title}</div>
            </div>`;



  });
  movieListContent.html(movieContent);

}

getMovieAll();
async function SearchMovie(query) {
  const response = await fetch('/movie.json')
  const movies = await response.json();
  let movieContent = '';
  const movieListContent = $('#movieListContent')
  movies.map(movie => {

    console.log(movie);
    if (movie.Title.toLowerCase().includes(query.toLowerCase())) {
      movieContent += ` <div class="movie">


              <div class="movie-image"> <span class="play"><span class="name">${movie.Title}</span></span> <a href="https://www.imdb.com/title/${movie.imdbID}/"><img src="${movie.Poster}" alt="" /></a> </div>
 <div class="movie-name">${movie.Title}</div>
            </div>`;
    }
  });
  if(movieContent === ''){
    movieContent = 'Film Bulunamadı';
  }
  movieListContent.html(movieContent);
}
async function getCategoryMovie(query) {
  const response = await fetch('/movie.json')
  const movies = await response.json();
  let movieContent = '';
  const movieListContent = $('#movieListContent')
  movies.map(movie => {

    console.log(movie);
    if (movie.category.toLowerCase().includes(query.toLowerCase())) {
      movieContent += ` <div class="movie">


              <div class="movie-image"> <span class="play"><span class="name">${movie.Title}</span></span> <a href="https://www.imdb.com/title/${movie.imdbID}/"><img src="${movie.Poster}" alt="" /></a> </div>
 <div class="movie-name">${movie.Title}</div>
            </div>`;
    }
  });
  if(movieContent === ''){
    movieContent = 'Film Bulunamadı';
  }
  movieListContent.html(movieContent);
}
async function setClock() {
  let date = new Date();
    let clock = $('#clock');       
    clock.html(date.toLocaleTimeString());
}
async function getIMDB() {
  const MovieList = $('#movieListContent');
  MovieList.html(`
  <iframe style="width:640px; height:480px;"   src="https://www.youtube.com/embed/H98GuTO1OZM?si=TEps87UZbQWRztXL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`)


}

$(document).ready(function () {
  $("#search-field").on('input', function () {
    SearchMovie($(this).val());
  });
    setInterval(setClock, 1000);
    setTimeout(function () {
      showDivs(slideIndex);
    }, 1000);
});