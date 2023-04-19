import "./Movies.css";
import { MovieModel } from "../../../Models/MovieModel";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import MovieCard from "../MovieCard/MovieCard";
function Movies(): JSX.Element {
    const[movies,setMovies] = useState<MovieModel[]>([]);
    const url ="https://raw.githubusercontent.com/Adiper84/moviesDB/main/moviesdb.txt"
    useEffect(() => {
        axios.get<MovieModel[]>(url)
        .then(res =>{setMovies(res.data) ;
            notifyService.success("Data was collected!!")}
       )
        
       
        .catch(err => {console.log(err);
            notifyService.failure("Data was Not collected!!")})
    },[])
    return (
        <div className="Movies">
            <h1>These are the movies available</h1>
           
            {movies.map(m =><MovieCard key={'movie'+ m.id} movie={m}/>)}
            {/* <p key={'movie'+ m.id}>{m.id},{m.name},{m.length_minutes} min,{m.genre} ,{m.director}, {m.description},{m.image}
             </p>)}
		 */}
        </div>
    );
}

export default Movies;
