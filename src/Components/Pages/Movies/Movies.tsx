import "./Movies.css";
import { MovieModel } from "../../../Models/MovieModel";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import MovieCard from "../MovieCard/MovieCard";
import store, { RootState } from "../../../Redux/Store";
import urlService from "../../../Services/UrlServices";
import { gotAllMoviesAction  } from "../../../Redux/MoviesAppState";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Movies(): JSX.Element {
const dispatch=useDispatch()
    const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};// last user
    const admin = useSelector((state: RootState) => state.adminsReducer.admins.slice(-1)[0]) || {};
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies); // movies  in store 
    const [selectedGenre, setSelectedGenre]= useState<string>("none")
    const [searchTerm,setSearchTerm]= useState<string>("")
    const bestsellers= movies.slice(0,3)
    useEffect(() => {
       if (movies?.length ===0){
        axios.get<MovieModel[]>(urlService.urls.movies) 
        .then(res =>{setMovies(res.data);
         dispatch(gotAllMoviesAction(res.data))
            notifyService.success("Wellcome to Cinema Lavi!")}
       )
        
       
        .catch(err => {console.log(err);
            notifyService.failure("Unable to show movies:" + err)})
       }
    },[movies])
    const selectGenre =(event: React.ChangeEvent<HTMLSelectElement>) =>{
        const value =event.target.value;
        console.log({event,value});
        setSelectedGenre(value);
    }
    
    return (
        <div className="Movies">
          {admin&&admin.adminId ? <h1>Click on a movie Edit</h1> : <h1>Click on a movie to Order</h1>}

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
         <h1>Best Sellers</h1>
         {bestsellers.map(m=><MovieCard key={'movie' + m.movieId} movie={m}/>)}
        <h1> Click on a Movie to Order</h1>
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


            
		
        </div>
);
}
export default Movies;





