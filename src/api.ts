/* const API_KEY = "30a18278aa32c27de99875e2b7b41efe"; */
const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;
const REGION_KR = "kr-KR";
interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearch {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_result: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
//https://api.themoviedb.org/3/movie/popular?api_key=30a18278aa32c27de99875e2b7b41efe&language=kr-KR&page=1
export function getPopular() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${REGION_KR}&page=1`
  ).then((response) => response.json());
}

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
