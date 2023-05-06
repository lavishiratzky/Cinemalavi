import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginModel } from "../../../Models/LoginModel";
import notifyService from "../../../Services/NotificationServices";
function Login(): JSX.Element {
    const schema = yup.object().shape({
        email:
        yup.string()
        .email("Invalid Email format")
        .required("Email is required!"),
    password:
       yup.string()
       .length(4,"Password must be at least 4 characters")
       .required(notifyService.failure),
    confirm:
        yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref('password')]) 
    })
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendDataToRemoteServer= (Login:LoginModel) =>{
            console.log("Sending to remote server");
        }   
    return (
        <div className="Login">
			<h1>This is Login</h1>      
<form onSubmit={handleSubmit(sendDataToRemoteServer)}>


{errors?.email&&<span>{errors.email.message}</span>}
<input {...register ("email")} type="email" placeholder="Email..."/>

{errors?.password&&<span>{errors.password.message}</span>}
<input {...register ("password")} type="password" placeholder="password..." name="password"/>

{errors?.confirm&&<span>{errors.confirm.message}</span>}
<input {...register ("confirm")} type="password" placeholder="Confirm password" name="Confirm"/>
<button  type ="submit" disabled={!isValid}>Send</button>
            </form>
        </div>
    );
}

export default Login;
