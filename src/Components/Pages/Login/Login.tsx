import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/LoginModel";
import notifyService from "../../../Services/NotificationServices";
import axios from "axios";
import urlService from "../../../Services/UrlServices";
import store from "../../../Redux/Store";
import { addedUserAction, gotSingleUserAction } from "../../../Redux/UsersAppState";
import { useNavigate } from "react-router-dom";
import { UsersModel } from "../../../Models/UsersModel";
import { useState } from "react";


function Login(): JSX.Element {
    const navigate = useNavigate();
    const schema = yup.object().shape({
    email:
        yup.string()
        .email("Invalid Email format")
        .required("Email is required!"),
    password:
       yup.string()
       .length(4,"Password must be exactly 4 characters")
       .required(notifyService.failure),
   
    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

        const sendDataToRemoteServer= (Login:LoginModel) =>{
            axios.post(urlService.urls.users+"/validate_user",Login)
            .then(res => {
                const user:UsersModel=res.data||{}
                store.dispatch(addedUserAction(user))
                console.log(user)
            console.log("Sending to remote server");
            notifyService.success("Lets order a Movie!");
              navigate ('/order'); 
            })
            .catch(err =>{console.log(err)
                notifyService.failure("You need to register before");
                navigate ('/register');
        });
           
         }; 
 
    return (
        <div className="Login">
			<h1>This is Login</h1>      
<form onSubmit={handleSubmit(sendDataToRemoteServer)}>


{errors?.email&&<span>{errors.email.message}</span>}
<input {...register ("email")} type="email" placeholder="Email..." defaultValue={"lavi.shiratzky@gmail.com"}/>

{errors?.password&&<span>{errors.password.message}</span>}
<input {...register ("password")} type="password" placeholder="password..." name="password" defaultValue={"1234"}/>


<button  type ="submit" disabled={!isValid}>Send</button>
            </form>
        </div>
    );
}

export default Login;
