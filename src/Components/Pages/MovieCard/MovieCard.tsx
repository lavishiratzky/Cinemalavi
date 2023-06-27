import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MovieModel } from "../../../Models/MovieModel";
import "./MovieCard.css";
import store, { RootState } from "../../../Redux/Store";
import {selectMovieAction} from "../../../Redux/MoviesAppState"
import { moviesReducer } from "../../../Redux/MoviesAppState";import { start } from "repl";
interface MovieCardProps{
    movie:MovieModel
}

function MovieCard(props: MovieCardProps): JSX.Element {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};

  const MovieCardHandler = () => {
    store.dispatch(selectMovieAction(props.movie));
    console.log(user)
    if (user&&user.userId) {
      navigate("/order");
    } else {
      navigate("/login");
    }
  };


    return (
        <div className="MovieCard" onClick={MovieCardHandler}>
            <p>Id number: {props.movie.movieId}</p>
            <p>"{props.movie.name}"</p>
            <p>Director: {props.movie.director}</p>
            <p>Genre: {props.movie.genre}</p>
            <img src={props.movie.image} alt="image" />
        </div>
        
    );
}

export default MovieCard;
