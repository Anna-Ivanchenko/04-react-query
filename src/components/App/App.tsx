import css from "./App.module.css";

import { useState } from "react";
import toast, { Toaster,} from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";



export default function App() {  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [isError, setIsError] =
    useState<boolean>(false);
  
  const [selectedMovie, setSelectedMovie] =
  useState<Movie | null>(null);
    
  const openModal = (movie: Movie): void => {
    setSelectedMovie(movie);
  };
  const closeModal = (): void => {
    setSelectedMovie(null);
  };
  
  const handleSearch = async (
    newQuery: string
  ): Promise<void> => {
    setIsLoading(true);
    setIsError(false);
      setMovies([]);     
    
    try {
      const data =
        await fetchMovies(newQuery);
      if (data.length === 0) {
        toast.error(
          "No movies found for your request."
        );
      }  
      setMovies(data);
    } catch {
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} /> 
      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={openModal}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
        />
      )}

      <Toaster position="top-center" />
    </div>          
  );
}