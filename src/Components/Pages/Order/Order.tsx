import "./Order.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {  useState } from "react";
import notifyService from "../../../Services/NotificationServices";
import store, { RootState } from "../../../Redux/Store";
import urlService from "../../../Services/UrlServices";
import { OrderModel } from "../../../Models/OrderModel";
import { useNavigate } from "react-router-dom";
import { addedOrderAction } from "../../../Redux/OrdersAppState";
import { MovieModel } from "../../../Models/MovieModel";
import { useSelector } from "react-redux";



function Order(): JSX.Element {
    const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};//listens to changes in users.
    const  selectMovie =useSelector((state: RootState) => state.moviesReducer.selectedMovie);// if a movie was chosen in the home page 
    const navigate = useNavigate();
    const schema = yup.object().shape({

        movieDate:
            yup.date()
            .min(new Date(), "Order date cannot be before today")
            .required("Order date is required"),    
            tickets: 
            yup.number()
            .positive("Number of tickets must be a positive value")
            .integer("Number of tickets must be an integer")
            .min(0, "Number of tickets cannot be negative")
            .required("Number of tickets is required"),
        
        
    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<OrderModel>({ mode: "all", resolver: yupResolver(schema) });
        
    const sendDataToRemoteServer = (Order: OrderModel) => {
        Order.movieName =  selectMovie?.name||"" // Include movieName in the order object
        Order.movieId =selectMovie?.movieId||0;// Include movieId in the order object
        Order.userId= user.userId;//include user propertis in the order object 
        Order.email = user.email||("");
        Order.userFirstName = user.firstName||("");
        Order.userLastName = user.lastName||("");

        axios.post(urlService.urls.orders, Order)
        .then((res) => {
            notifyService.success('Added order Successfully');
            console.log(res.data);
            store.dispatch(addedOrderAction(res.data));
            console.log({Order})
           navigate('/Success');
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

                
                 {errors.tickets?.message ? <>  <span>{errors?.tickets?.message}</span> </> :   <>  <label htmlFor="tickets">tickets</label> </>}
                 <input {...register("tickets")}id="tickets" name="tickets" type="number"step="1" min={0} placeholder="tickets..." />
                  
               
  
                <button type="submit" disabled={!isValid}>Send</button>
            </form>
         
            
           
            
           
           
        </div>
    );
}

export default Order;
