import "./AdminLogin.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/LoginModel";
import notifyService from "../../../Services/NotificationServices";
import axios from "axios";
import urlService from "../../../Services/UrlServices";
import store, { RootState } from "../../../Redux/Store";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useSelector } from "react-redux";
import { AdminModel } from "../../../Models/AdminModel";
import { addedAdminAction } from "../../../Redux/AdminAppState";



function AdminLogin(): JSX.Element {
    const admin = useSelector((state: RootState) => state.adminsReducer.admins.slice(-1)[0]) || {};
    const navigate = useNavigate();
    const schema = yup.object().shape({
    email:
        yup.string()
        .email("Invalid Email format")
        .required("Email is required!"),
    password:
       yup.string()
       .length(4,"Password must be exactly 4 characters")
       .required("password is required"),
   
    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

        const sendDataToRemoteServer= (Login:LoginModel) =>{
            axios.post(urlService.urls.admins +"/validate_admin",Login)
            .then(res => {
                const admin:AdminModel=res.data||{}
                store.dispatch(addedAdminAction(admin))
                console.log(admin)
            console.log("Sending to remote server");
            notifyService.success("You are  Admin!");
          navigate("/movies")
            })
            .catch(err =>{console.log(err)
                notifyService.failure("You are not admin");
              
        });
           
         }; 
 


    return (
        <div className="AdminLogin">
				<h1> Admins Login</h1>      
<form onSubmit={handleSubmit(sendDataToRemoteServer)}>


{errors?.email&&<span>{errors.email.message}</span>}
<input {...register ("email")} type="email" placeholder="Email..."/>

{errors?.password&&<span>{errors.password.message}</span>}
<input {...register ("password")} type="password" placeholder="password..." name="password" />


<button  type ="submit" disabled={!isValid}>Send</button>
            </form>

        </div>
    );
}

export default AdminLogin;
