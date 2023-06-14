import { MovieModel } from "../../../Models/MovieModel";
import test  from "../../../Assets/Images/test.jpg"
import "./MovieCard.css";
interface MovieCardProps{
    movie:MovieModel
}
function MovieCard(props:MovieCardProps): JSX.Element {
    return (
        <div className="MovieCard">
            <p>Id number: {props.movie.movieId}</p>
            <p>"{props.movie.name}"</p>
            <p>Director: {props.movie.director}</p>
            <p>Genre: {props.movie.genre}</p>
            <p>Length: {props.movie.lengthMinutes} min.</p>
            <img src={props.movie.image} alt="image" />
        </div>
        
    );
}

export default MovieCard;
