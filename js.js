const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_APT =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//첫화면에 영화 목록 띄우기
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  //http 서버전송 후 res반환하고 json 형식으로 응답 전송

  console.log(data.results);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    
    movieEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${title}"/>

    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByrate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
    <h3>overview</h3>
    ${overview}
    </div>`;

    main.appendChild(movieEl); //자식요소로 적용
  });
}

function getClassByrate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

//검색기능
form.addEventListener("submit", (e) => {
  e.preventDefault(); //초기값

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_APT + searchTerm);
    search.value = "";
  } else {
    window.location.reload(); //처음화면으로 돌아가기
  }
});
