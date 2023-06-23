import "./Movies.css";
import { MovieModel } from "../../../Models/MovieModel";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import MovieCard from "../MovieCard/MovieCard";
import store, { RootState } from "../../../Redux/Store";
import urlService from "../../../Services/UrlServices";
import { gotAllMoviesAction } from "../../../Redux/MoviesAppState";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Movies(): JSX.Element {


    const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies);
    const [selectedGenre, setSelectedGenre]= useState<string>("none")
    const [searchTerm,setSearchTerm]= useState<string>("")
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
        console.log({event,value});
        setSelectedGenre(value);
    }
    
    return (
        <div className="Movies">
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
             <option value="Comedy">Comedy</option>
         </select></h1> 
            
 {movies
 .filter((val)=>{
                 if(val.name?.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
                else if (searchTerm===""){
                    return store.dispatch
                }
                return false;
            })
            .filter((val)=>{
                if(val.genre?.toLowerCase().split(',').map(v=>v.trim()).includes(selectedGenre.toLowerCase()) ) {
                    return true
                }
                else if(selectedGenre ==='none') {
                    return true
                }
             return false;
              })
              .map(m=><MovieCard key={'movie' + m.movieId} movie={m}/>)}
{/* TO SHOW ONLY THE FIRST 5 USE THIS BEFORE MAP .slice(0,5) */}
 {/* }).map(m=><MovieCard key={'movie' + m.id} movie={m}/>)}     */}

            
		
        </div>
);
}
export default Movies;
