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

export interface IPopularResult {
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
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export const getMovies2 = async (): Promise<IGetMoviesResult> => {
  const reponse = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  );
  const json = await reponse.json();
  return json;
};

export const getPopular2 = async (): Promise<IPopularResult> => {
  const response = await fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`);
  const json = await response.json();
  return json;
};

export const popularAsyncFunction = async () => {
  const nowPlayingMovies = await getMovies2();
  const popularMovies = await getPopular2();

  /* const movies = Array.isArray(popularMovies)
    ? popularMovies
    : Array.from(popularMovies); */
  const filteredArray = popularMovies.results.filter((movie: IMovie) => {
    return !nowPlayingMovies.results.some((nowPlayingMovie: IMovie) => {
      return movie.id !== nowPlayingMovie.id;
    });
  });
  return filteredArray;
};

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
