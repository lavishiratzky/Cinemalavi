import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieModel } from "../Models/MovieModel";

interface MoviesState{
    movies: MovieModel[];
    selectedMovie: MovieModel | null;

}

const initialState: MoviesState ={
    movies:[],
    selectedMovie: null,
    
};

export enum ActionType {
 GOT_ALL_MOVIES = "GOT_ALL_MOVIES",
GOT_SINGLE_MOVIE = "GOT_SINGLE_MOVIE",
  ADDED_MOVIE = "ADDED_MOVIE",
  UPDATED_MOVIE = "UPDATED_MOVIE",
  DELETED_MOVIE = "DELETED_MOVIE",
  REMOVED_MOVIES = "REMOVED_MOVIES",
  SELECT_MOVIE = "SELECT_MOVIE",
}
const moviesSlice = createSlice({
    name: "movies",

    initialState,
    reducers: {
      gotAllMoviesAction(state, action: PayloadAction<MovieModel[]>) {
        state.movies = action.payload;
      },
      gotSingleMovieAction(state, action: PayloadAction<MovieModel>) {
        state.movies.push(action.payload);
      },
      addedMovieAction(state, action: PayloadAction<MovieModel>) {
        state.movies.push(action.payload);
      },
      updatedMovieACtion(state, action: PayloadAction<MovieModel>) {
        const idx = state.movies.findIndex(
          (movie) => movie.movieId=== action.payload.movieId
        );
        state.movies[idx] = action.payload;
      },
      deletedMovieAction(state, action: PayloadAction<number>) {
        
        state.movies = state.movies.filter((movie) => movie.movieId !== action.payload);
      },
      removeMovies(state) {
        state.movies = [];
      },
      selectMovieAction(state, action: PayloadAction<MovieModel>) {
        state.selectedMovie = action.payload;
      },
    },
  });
  export const {
    gotAllMoviesAction,
    gotSingleMovieAction,
    addedMovieAction,
    updatedMovieACtion,
    deletedMovieAction,
    removeMovies,
    selectMovieAction,
  } = moviesSlice.actions;
  
  export const moviesReducer = moviesSlice.reducer;