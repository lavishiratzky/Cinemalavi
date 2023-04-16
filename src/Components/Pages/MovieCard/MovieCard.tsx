import { Root2 } from "../../../Models/MovieModel";
import "./MovieCard.css";
interface MovieCardProps{
    movie:Root2
}
function MovieCard(props:MovieCardProps): JSX.Element {
    return (
        <div className="MovieCard">
            <p>Id number: {props.movie.id}</p>
            <p>"{props.movie.name}"</p>
            <p>Director: {props.movie.director}</p>
            <p>Genre: {props.movie.genre}</p>
            <p>Length: {props.movie.length_minutes} min.</p>
            <img src={props.movie.image} alt="image" />
			
        </div>
    );
}

export default MovieCard;
