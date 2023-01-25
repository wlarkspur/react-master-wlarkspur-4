import { Url, UrlObject } from "url";

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
interface IDetails {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
interface IGenres {
  id: number;
  name: string;
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
  movieId: string;
}

export interface IGetDetails {
  backdrop_path: string;
  belongs_to_collection: IDetails;
  genres: IGenres[];
  homepages: string;
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  tagline: string;
  vote_average: number;
}

export interface IGetSearch {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_result: number;
}

//Movies - NowPlaying
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
//https://api.themoviedb.org/3/movie/popular?api_key=30a18278aa32c27de99875e2b7b41efe&language=kr-KR&page=1
// Movies - popular
export function getPopular() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export const getUpcoming = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`
  );
  const json = await response.json();

  return json;
};
// ----------------------------------------------------------------------

export const getDetails = async (movieId: number | undefined) => {
  if (!movieId) {
    return null;
  }
  const reponse = await fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`
  );
  const json = reponse.json();
  return json;
};

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
