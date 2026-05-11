import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMovieResponse {
  results: Movie[];
  total_pages: number;
}

const token = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(
  query: string,
  page: number
): Promise<FetchMovieResponse> {
  const response = await axios.get<FetchMovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}