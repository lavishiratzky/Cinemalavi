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
import { useNavigate } from "react-router-dom";


function Order(): JSX.Element {
    const schema = yup.object().shape({
        orderid:
            yup.number(),
        orderdate:
            yup.string()
                .required("Order date is required"), 
        movieid:
            yup.number(),
        moviename:
            yup.string()
                .required("Movie name  is required"),
        tickets:
            yup.number() 
            .required("Number of tickets is required"),
            Userid:
            yup.number(),
         userfirstname:
            yup.string()
                .required("First name name is required"), 
        userfamilyname:
            yup.string()
                .required("family name name is required"), 
        email:
            yup.string()
                .email("Invalid Email format")
                .required("Email is required!"),
       
    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<OrderModel>({ mode: "all", resolver: yupResolver(schema) });
        const sendDataToRemoteServer= (Order:OrderModel) =>{axios.post(urlService.urls.movies)
            .then(res => {
                notifyService.success('Added Movie Successfully');
                console.log(res.data);
                // store.dispatch(addedTaskAction(res.data));
                // Navigate to previous screen
                // navigate('/movies');
            })
            .catch(err => {
                console.log(err);
                notifyService.failure('Unable to Add movie : ' + err);
            });}
             
    return (
        <div className="Order">
			
        </div>
    );
}

export default Order;
