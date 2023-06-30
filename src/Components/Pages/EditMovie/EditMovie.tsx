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




function EditMovie(): JSX.Element {
    const movies = useSelector((state: RootState) => state.moviesReducer.movies)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedMovie = useSelector(
      (state: RootState) => state.moviesReducer.selectedMovie||null
    );
   
    
    const schema = yup.object().shape({
      director:
         yup.string()
         
          .required("Director is required"),
     genre:
         yup.string()
         .required("Genre is required"),
     length_Minutes:
         yup.number()
             .moreThan(1)
             .typeError('Length Must be more than 1 min.')
             .required("Length is required"),
      description:
          yup.string()
             .min(3, 'Description must be at least 3 characters')
             .max(30, 'Description must be at most 30 characters')
             .required("Description is required"),
      image:
      yup.string()
     .typeError('you must enter a direction to a picture form the web')
     .required("Description is required")
     


 });


    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<MovieModel>({  mode: "all", resolver: yupResolver(schema) });
        

        const sendDataToRemoteServer = (movie: MovieModel) => {
         
            axios.put(urlService.urls.movies + "/" + selectedMovie?.movieId , movie)
            .then(res => {
                   dispatch(updatedMovieACtion(res.data));
                    notifyService.success(' Successfully Updated Movie');
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
 
 <form onSubmit={handleSubmit(sendDataToRemoteServer)}>

{errors?.director && <span>{errors.director.message}</span>}
<input {...register("director")} type="text" placeholder="director..." name="director" defaultValue={selectedMovie?.director} />

{ errors.genre?.message ?   
                    <> <span>{errors?.genre?.message}</span></> :
                    <> <label htmlFor="genre">Genre</label> </>
                }
                 <select
                    {...register("genre")} id="genre"  name="genre" >
                    <option value={selectedMovie?.genre} disabled={true} selected style={{ color: "gray" }} defaultValue={selectedMovie?.genre}>{selectedMovie?.genre}</option>
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
<input {...register("length_Minutes")} type="text" placeholder="length..." name="length_Minutes" defaultValue={selectedMovie?.length_Minutes}/>

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
