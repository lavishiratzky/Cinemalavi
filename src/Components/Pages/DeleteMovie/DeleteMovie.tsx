import "./DeleteMovie.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MovieModel } from "../../../Models/MovieModel";
import axios from "axios";
import urlService from "../../../Services/UrlServices";
import store from "../../../Redux/Store";
import notifyService from "../../../Services/NotificationServices";
import { useNavigate } from "react-router-dom";
import { deletedMovieAction } from "../../../Redux/MoviesAppState";
import { useState } from "react";

function DeleteMovie(): JSX.Element {
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies);
    const [selectedMovie, setSelectedMovie] = useState<number | undefined>(0);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        movieId:
        yup.number()
        .required("Movie name is required")

    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
    useForm<MovieModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendDataToRemoteServer = () => {
        if (selectedMovie) {
          axios
            .delete(urlService.urls.movies + "/" + selectedMovie)
            .then(res => {
              store.dispatch(deletedMovieAction(res.data));
              notifyService.success('A movie was deleted!');
              console.log(res.data);
              navigate('/movies');
            })
            .catch(err => {
              console.log(err);
              notifyService.failure('Unable to delete movie: ' + err);
            });
        }
      };
      
    return (
        <div className="DeleteMovie">
            <h1>Choose a movie to delete</h1>
            <form onSubmit={handleSubmit(sendDataToRemoteServer)}>
            
            <select
            {...register("movieId")}
             
  id="movieId"
  name="movieId"
  value={selectedMovie ||(0)} 
  onChange={e => setSelectedMovie(Number(e.target.value))}
>
  <option value="" style={{ color: 'gray' }}>Movie Name</option>
  {movies.map((m) => (
    <option key={m.movieId} value={m.movieId}>{m.name}</option>
  ))}
</select>
<p>{selectedMovie}</p>
<button type="submit" disabled={!isValid}>Send</button>
            </form>
        </div>
    );
}

export default DeleteMovie;