import "./EditMovie.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MovieModel } from "../../../Models/MovieModel";
import { useState } from "react";
import urlService from "../../../Services/UrlServices";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import store from "../../../Redux/Store";
import { updatedMovieACtion } from "../../../Redux/MoviesAppState";
import notifyService from "../../../Services/NotificationServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";



function EditMovie(): JSX.Element {
    const movies = useSelector((state: RootState) => state.moviesReducer.movies)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState<MovieModel | undefined>();  
    const schema = yup.object().shape({
        // Director:
        //    yup.string()

        //   .required("Director is required"),
        //  Genre:
        //  yup.string()
        //     .required("Genre is required"),
        // Length_Minutes:
        //    yup.number()
        //   .moreThan(1),
        // //   .required("Length is required"),
      //  Description:
      //     yup.string()
      //          .min(3, 'Description must be at least 3 characters')
      //          .max(30, 'Description must be at most 30 characters'),
               // .required("Description is required"),
         Image:
        yup.string(),
          //.typeError('you must enter a direction to a picture form the web')
     });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<MovieModel>({ mode: "all", resolver: yupResolver(schema) });
        
        const sendDataToRemoteServer = (movie: MovieModel) => {
         
            axios.put(urlService.urls.movies + "/" + selectedMovie?.movieId , movie)
                .then(res => {
                 
                    store.dispatch(updatedMovieACtion(res.data));
                    notifyService.success('Updated Movie Successfully');
                    console.log(res.data);
                    navigate('/movies');
                })
                .catch(err => {
                  console.log(movie)
                    console.log(err);
                    notifyService.failure('Unable to Update movie : ' + err);
                });
        }
    return (
        <div className="EditMovie">
          <h1>This is Edit</h1>
      <select
  id="movieId"
  name="movieId"
  value={selectedMovie?.movieId || ''}
  onChange={e => {
    const selectedMovieId = Number(e.target.value);
    const movie = movies.find(m => m.movieId === selectedMovieId);
    setSelectedMovie(movie);
  }}
>
  <option value="" style={{ color: 'gray' }}>Movie Name</option>
  {movies.map((m) => (
    <option key={m.movieId} value={m.movieId}>{m.name}</option>
  ))}
</select>
 <form onSubmit={handleSubmit(sendDataToRemoteServer)}>

{errors?.director && <span>{errors.director.message}</span>}
<input {...register("director")} type="text" placeholder="director..." name="director" defaultValue={selectedMovie?.director} />

{ errors.genre?.message ?   
                    <> <span>{errors?.genre?.message}</span></> :
                    <> <label htmlFor="genre">Genre</label> </>
                }
                 <select
                    {...register("genre")} id="genre"  name="genre" >
                    <option value={selectedMovie?.genre} disabled={true} selected style={{ color: "gray" }} defaultValue={selectedMovie?.genre}>Movie Genre...</option>
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
                </select>  
{errors?. length_Minutes && <span>{errors.length_Minutes.message}</span>}
<input {...register("length_Minutes")} type="text" placeholder="length..." name="lengthMinutes" defaultValue={selectedMovie?.length_Minutes}/>

{errors?.description && <span>{errors.description.message}</span>}
<input  {...register("description")} type="text" placeholder="description..." name="description"defaultValue={selectedMovie?.description} />

 {errors?.image && <span>{errors.image.message}</span>}
<input  {...register("image")} type="text" placeholder="enter a direction to an image from the web" name="image"defaultValue={selectedMovie?.image} />


<button disabled={!isValid}>Submit</button>
</form>


        </div>
    );
}

export default EditMovie;
