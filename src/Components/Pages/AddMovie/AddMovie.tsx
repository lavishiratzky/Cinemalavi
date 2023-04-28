import "./AddMovie.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MovieModel } from "../../../Models/MovieModel";
import { useState } from "react";
import urlService from "../../../Services/UrlServices";
import axios from "axios";
import store from "../../../Redux/Store";
import { addedMovieAction } from "../../../Redux/MoviesAppState";
import notifyService from "../../../Services/NotificationServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function AddMovie(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    const handleChangeImage = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const schema = yup.object().shape({
        id:
            yup.string()
                .required("Id is required"),
         name:
            yup.string()
                .required("Title is required"),
        director:
            yup.string()
                .required("Director is required"),
        genre:
            yup.string()
                .required("Genre is required"),
        length_minutes:
            yup.number()
                .moreThan(1)
                .typeError('Length Must be more than 1 min.')
                .required("Length is required"),
        description:
            yup.string()
                .min(3, 'Description must be at least 3 characters')
                .max(30, 'Description must be at most 30 characters')
                .required("Description is required"),
        // image:
        //     yup.mixed()
        //         .test('required', "You need to provide a file", (value) => {
        //             return value && value.length
        //         })
        //         .test("fileSize", "The file is too large", (value, context) => {
        //             return value && value[0] && value[0].size <= 200000;
        //         })
        //         .test("type", "We only support png", function (value) {
        //             return value && value[0] && value[0].type === "image/png";
        //         })



    });
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<MovieModel>({ mode: "all", resolver: yupResolver(schema) });
        
        const sendDataToRemoteServer = (movie: MovieModel) => {

            // axios.get(urlService.urls.tasks)
            axios.post(urlService.urls.movies, movie)
                .then(res => {
                    notifyService.success('Added Movie Successfully');
                    console.log(res.data);
                    // store.dispatch(addedTaskAction(res.data));
                    dispatch(addedMovieAction(res.data));
                    // Navigate to previous screen
                    navigate('/movies');
                })
                .catch(err => {
                    console.log(err);
                    notifyService.failure('Unable to Add movie : ' + err);
                });
        }
    return (
        <div className="AddMovie">
            <form onSubmit={handleSubmit(sendDataToRemoteServer)}>

            {errors?.id && <span>{errors.id.message}</span>}
                <input {...register("id")} type="text" placeholder="Id..." name="id" />

                {errors?.name && <span>{errors.name.message}</span>}
                <input {...register("name")} type="text" placeholder="name..." name="name" />

                {errors?.director && <span>{errors.director.message}</span>}
                <input {...register("director")} type="text" placeholder="director..." name="director" />

                {
                    errors.genre?.message ?
                        <>
                            <span>{errors?.genre?.message}</span>
                        </> :
                        <>
                            <label htmlFor="genre">Genre</label>
                        </>
                }
                {/* change the select to movie genre options */}
                <select
                    {...register("genre")}
                    id="genre"
                    name="genre" >
                    <option value="" disabled={true} selected style={{ color: "gray" }}>Movie Genre...</option>
                    <option value="DRAMA">Drama</option>
                    <option value="CRIME">Crime</option>
                    <option value="ACTION">Action</option>
                    <option value="ADVENTURE">Adventure</option>
                    <option value="SCI-FI">Science-Fiction</option>
                    <option value="FANTASY">Fantasy</option>
                    <option value="ROMANCE">Romance</option>
                    <option value="HISTORY">History</option>
                </select>
                {errors?.length_minutes && <span>{errors.length_minutes.message}</span>}
                <input {...register("length_minutes")} type="text" placeholder="length..." name="length_minutes" />

                {errors?.description && <span>{errors.description.message}</span>}
                <input  {...register("description")} type="text" placeholder="description..." name="description" />

                {
                    errors.image?.message ?
                        <>
                            <span>{errors?.image?.message}</span>
                        </> :
                        <>
                            <label htmlFor="image">Image</label>
                        </>
                }
                <input
                    {...register("image", { onChange: (e) => { handleChangeImage(e) } })}
                    id="image"
                    name="image"
                    type="file"
                    placeholder="movie Image..." />
                <div className="wrap-box">
                    {image ? <img src={image} alt=""></img> : 'no image yet!'}

                </div>


                <button disabled={!isValid}>Submit</button>
            </form>
        </div>
    );
}

export default AddMovie
