import "./Movies.css";
import { Root } from "../../../Models/MovieModel";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
function Movies(): JSX.Element {
    const[movies,setMovies] = useState<Root[]>([]);
    const url ="https://raw.githubusercontent.com/Adiper84/moviesDB/main/moviesdb.txt"
    useEffect(() => {
        axios.get<Root[]>(url)
        .then(res =>{setMovies(res.data) ;
            notifyService.success("Data was collected!!")}
       )
        
       
        .catch(err => {console.log(err);
            notifyService.failure("Data was Not collected!!")})
    },[])
    return (
        <div className="Movies">
            <h1>These are the movies available</h1>
           
            {movies.map(m =><p key={'movie'+ m.id}>{m.id},{m.title},{m.userId},{m.completed}</p>)}
		
        </div>
    );
}

export default Movies;
