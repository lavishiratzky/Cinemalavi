import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UsersModel } from "../../../Models/UsersModel";
import urlService from "../../../Services/UrlServices";
import axios from "axios";
import notifyService from "../../../Services/NotificationServices";
import { addedUserAction } from "../../../Redux/UsersAppState";
import store from "../../../Redux/Store";

function Register(): JSX.Element {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("first name is required"),
        lastName:
            yup.string()
                .required("Last name is required"),
        email:
            yup.string()
                .email("Invalid Email format")
                .required("Email is required"),
        idNumber:
             yup.string()
            .required("ID number is required"),
        passWord:
            yup.string()
                .length(4,"Password must be  4 characters")
                .required("Password is required"),
        confirm:
            yup.string()
                .required("Confirm password is required")
                .oneOf([yup.ref('passWord')], 'Your passwords does not match.')
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<UsersModel>({ mode: "all", resolver: yupResolver(schema) });

        const sendDataToRemoteServer= (user:UsersModel) =>{
            axios.post(urlService.urls.users , user )
            .then(res => {
                const user:UsersModel=res.data||{}
                store.dispatch(addedUserAction(user))
  
            console.log("Sending to remote server");
            notifyService.success("Data was sent!!");
              navigate ('/movies'); 
            })
            .catch(err => console.log(err));
         }; 

    return (
        <div className="Register">
				<h1>This is Register</h1>      
<form onSubmit={handleSubmit(sendDataToRemoteServer)}>

{errors?.firstName && <span>{errors.firstName.message}</span>}
<input {...register("firstName")} type="text" placeholder="First Name..."/>

{errors?.lastName &&<span>{errors.lastName.message}</span>}
<input {...register("lastName")} type="text" placeholder="Last Name..." /> 

{errors?.email&&<span>{errors.email.message}</span>}
<input {...register("email")} type="email" placeholder="Email..." /> 

{errors?.idNumber&&<span>{errors.idNumber.message}</span>}
<input {...register("idNumber")} type="idNumber" placeholder="Id Number..." /> 


 {errors?.passWord&&<span>{errors.passWord.message}</span>}
<input {...register("passWord")} type="password" placeholder="password..." /> 

{errors?.confirm&&<span>{errors.confirm.message}</span>}
<input {...register("confirm")} type="password" placeholder="Confirm password" />

<button  type ="submit" disabled={!isValid}>Send</button>
            </form>	
        </div>
  );
};

 export default Register;
