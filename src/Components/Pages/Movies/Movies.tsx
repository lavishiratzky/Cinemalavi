import "./Movies.css";
import { MovieModel } from "../../../Models/MovieModel";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import MovieCard from "../MovieCard/MovieCard";
import store from "../../../Redux/Store";
import urlService from "../../../Services/UrlServices";
import { gotAllMoviesAction } from "../../../Redux/MoviesAppState";
function Movies(): JSX.Element {
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies);
    const [selectedGenre, setSelectedGenre]= useState<string>("none")
    const [searchTerm,setSearchTerm]= useState<string>("")
    // const url ="https://raw.githubusercontent.com/Adiper84/moviesDB/main/moviesdb.txt"
    useEffect(() => {
        if (movies?.length ===0){
        axios.get<MovieModel[]>(urlService.urls.movies) 
        .then(res =>{setMovies(res.data);
        store.dispatch(gotAllMoviesAction(res.data))
            notifyService.success("Data was collected!!")}
       )
        
       
        .catch(err => {console.log(err);
            notifyService.failure("Data was Not collected!!")})
        }
    },[])
    const selectGenre =(event: React.ChangeEvent<HTMLSelectElement>) =>{
        const value =event.target.value;
        setSelectedGenre(value)
    }
    return (
        <div className="Movies">
            <h1>Welcome to Lavi Shiratzky's Movie APP! </h1>
            <h1><input type ="text" placeholder="Type a name of a movie" onChange={event=>{setSearchTerm(event.target.value)}}/></h1>
            <h1> <select onChange={selectGenre}>
            <option value="none">Filter by Genre</option>
            <option value="Action">Action</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Adventure">Adventure</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
        </select></h1>
            {movies.filter((val)=>{
                if (searchTerm===""){
                    return store.dispatch
                }
                else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
                if(val.genre===selectedGenre ) {
                    return true
                }
                else if(selectedGenre ==='none') {
                    return true
                }
            })
.map(m=><MovieCard key={'movie' + m.id} movie={m}/>)}
            {/* {movies.map(m =><MovieCard key={'movie'+ m.id} movie={m}/>)} */}
            {/* <p key={'movie'+ m.id}>{m.id},{m.name},{m.length_minutes} min,{m.genre} ,{m.director}, {m.description},{m.image}
             </p>)}
		 */}
        </div>
    );
}

export default Movies;
