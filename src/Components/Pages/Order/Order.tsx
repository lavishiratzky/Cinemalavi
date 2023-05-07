import "./Order.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import MovieCard from "../MovieCard/MovieCard";
import store from "../../../Redux/Store";
import urlService from "../../../Services/UrlServices";
import { OrderModel } from "../../../Models/OrderModel";
import { Navigate, useNavigate } from "react-router-dom";
import { addedOrderAction } from "../../../Redux/OrdersAppState";
import { MovieModel } from "../../../Models/MovieModel";


function Order(): JSX.Element {
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        orderDate:
            yup.string()
                .required("Order date is required"),
        movieName:
            yup.string()
                .required("Movie name  is required"),
        tickets:
            yup.number()
                .required("Number of tickets is required"),
        UserFirstName:
            yup.string()
                .required("First name name is required"),
        userFamilyName:
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
        axios.post(urlService.urls.orders)
        .then(res => {
            notifyService.success('Added order Successfully');
            console.log(res.data);
            store.dispatch(addedOrderAction(res.data));
           navigate(-1);
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
                    errors.OrderDate?.message ?
                        <>
                            <span>{errors?.OrderDate?.message}</span>
                        </> :
                        <>
                            {/* <label htmlFor="orderDate">Order Date</label> */}
                        </>
                }
                <input
                    {...register("OrderDate")}
                    id="orderDate"
                    name="orderDate"
                    type="date"
                    placeholder="Order Date..." />
{/* have to bring the name of the movies available from store */}
                     {/* {errors?.MovieName && <span>{errors.MovieName.message}</span>}
                     <select
                    {...register("MovieName")}
                    id="MovieName"
                    name="MovieName">
                    <option value="" disabled={true} selected style={{ color: 'gray' }}>Movie Name</option>
                    <option value="{movies.map(m=> key={'movie' + m.id} movie={m})}"></option>
                    </select> */}
                    {errors.tickets?.message ?
                        <>
                            <span>{errors?.tickets?.message}</span>
                        </> :
                        <>
                            {/* <label htmlFor="tickets">tickets</label> */}
                        </>
                }
                <input
                    {...register("tickets")}
                    id="tickets"
                    name="tickets"
                    type="number"
                    step="1"
                    placeholder="tickets..." />


                {errors?.UserFirstName && <span>{errors.UserFirstName.message}</span>}
                <input {...register("UserFirstName")} type="text" placeholder="First Name..." />

                {errors?.UserFamilyName && <span>{errors.UserFamilyName.message}</span>}
                <input {...register("UserFamilyName")} type="text" placeholder="Last Name..." />

                {errors?.email && <span>{errors.email.message}</span>}
                <input {...register("email")} type="email" placeholder="Email..." />

{/* button is not working yet */}
                <button type="submit" disabled={!isValid}>Send</button>
            </form>
        </div>
    );
}

export default Order;
