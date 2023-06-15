import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/LoginModel";
import notifyService from "../../../Services/NotificationServices";
import axios from "axios";
import urlService from "../../../Services/UrlServices";
import store from "../../../Redux/Store";
import { gotSingleUserAction } from "../../../Redux/UsersAppState";
import { useNavigate } from "react-router-dom";
import { UsersModel } from "../../../Models/UsersModel";


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
            axios.get(urlService.urls.users+"/"+Login.email+"/"+Login.password )
            .then(res => {
                const user:UsersModel=res.data
                store.dispatch(gotSingleUserAction(user))
            console.log("Sending to remote server");
            notifyService.success("Data was sent!!");
              navigate ('/order'); 
            })
            .catch(err => console.log(err));
         }; 
 
    return (
        <div className="Login">
			<h1>This is Login</h1>      
<form onSubmit={handleSubmit(sendDataToRemoteServer)}>


{errors?.email&&<span>{errors.email.message}</span>}
<input {...register ("email")} type="email" placeholder="Email..."/>

{errors?.password&&<span>{errors.password.message}</span>}
<input {...register ("password")} type="password" placeholder="password..." name="password"/>


<button  type ="submit" disabled={!isValid}>Send</button>
            </form>
        </div>
    );
}

export default Login;
