import "./Order.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import MovieCard from "../MovieCard/MovieCard";
import store, { RootState } from "../../../Redux/Store";
import urlService from "../../../Services/UrlServices";
import { OrderModel } from "../../../Models/OrderModel";
import { Navigate, useNavigate } from "react-router-dom";
import { addedOrderAction } from "../../../Redux/OrdersAppState";
import { MovieModel } from "../../../Models/MovieModel";
import { useSelector } from "react-redux";
import { gotSingleUserAction } from "../../../Redux/UsersAppState";



function Order(): JSX.Element {
//  const user =useSelector((state:RootState)=>state.usersReducer.users.)
    const[selectedMovie, setSelectedMovie] =useState<string>();
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies);
    const navigate = useNavigate();
    const schema = yup.object().shape({

        movieDate:
            yup.date()
            .min(new Date(), "Order date cannot be before today")
            .required("Order date is required"),
                
         movieName:
             yup.string()
            .required(),
            tickets: yup
            .number()
            .positive("Number of tickets must be a positive value")
            .required("Number of tickets is required"),
        userFirstName:
            yup.string()
                .required("First name name is required"),
        userLastName:
            yup.string()
                .required("family name name is required"),
        email:
            yup.string()
                .email("Invalid Email format")
                .required("Email is required!"),

    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<OrderModel>({ mode: "all", resolver: yupResolver(schema) });
        
    const sendDataToRemoteServer = (Order: OrderModel) => {
        axios.post(urlService.urls.orders, Order)

        .then(res => {
            notifyService.success('Added order Successfully');
            console.log(res.data);
            store.dispatch(addedOrderAction(res.data));
           navigate('/order');
        })
        .catch(err => {
            console.log(err);
            notifyService.failure('Unable to Add order : ' + err);
        });
    }

    return (
        <div className="Order">
            <form onSubmit={handleSubmit(sendDataToRemoteServer)}>
            {
                    errors.movieDate?.message ?
                        <>
                            <span>{errors?.movieDate?.message}</span>
                        </> :
                        <>
                            <label htmlFor="movieDate">Movie Date</label>
                        </>
                }
                <input
                    {...register("movieDate")}
                    id="movieDate"
                    name="movieDate"
                    type="date"
                    placeholder="Order Date..." />

{errors?.movieName && <span>{errors.movieName.message}</span>}
    <select
        {...register("movieName")}
        id="movieName"
        name="movieName"
        value={selectedMovie}
        onChange={e => setSelectedMovie(e.target.value)}
    >

                        <option value="" selected style={{ color: 'gray' }}>Movie Name</option>
                        {movies.map((m)=>(<option key={m.name} value={m.name}>{m.name}</option>))}
                    </select>

                    {errors.tickets?.message ?
                        <>
                            <span>{errors?.tickets?.message}</span>
                        </> :
                        <>
                            <label htmlFor="tickets">tickets</label>
                        </>
                }
                <input
                    {...register("tickets")}
                    id="tickets"
                    name="tickets"
                    type="number"
                    step="1"
                    placeholder="tickets..." />


{errors?.userFirstName && <span>{errors.userFirstName.message}</span>}
                <input {...register("userFirstName")} type="text" placeholder="First Name..." />

                {errors?.userLastName && <span>{errors.userLastName.message}</span>}
                <input {...register("userLastName")} type="text" placeholder="Last Name..." />

                {errors?.email && <span>{errors.email.message}</span>}
                <input {...register("email")} type="email" placeholder="Email..." />

                <button type="submit" disabled={!isValid}>Send</button>
            </form>
        </div>
    );
}

export default Order;
