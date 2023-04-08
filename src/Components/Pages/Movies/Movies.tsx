import "./Movies.css";
import { Root2 } from "../../../Models/MovieModel";
import axios from "axios";
import { useEffect, useState } from "react";
function Movies(): JSX.Element {
    const[Movies,setMovies] = useState<Root2[]>([]);
    const url ="https://restcountries.com/v2/all "
    useEffect(() => {
        axios.get<Root2[]>(url)
        .then(res =>{setMovies(res.data)})
        .catch(err => {console.log(err)})
    },[])
    return (
        <div className="Movies">
            <h1>These are the movies available</h1>
            {Movies.map(m =><p key={'movie'+ m.name}>{m.name},{m.capital},{m.population},{m.flag}</p>)}
		
        </div>
    );
}

export default Movies;
