import "./Contact_us.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactUsModel } from "../../../Models/ContactUs";
function Contact_us(): JSX.Element {
    const schema = yup.object().shape({
        firstName:
            yup.string()
            .required("first name is required",),
        lastName:
            yup.string()
                .required("Last name is required"),
        subject:
            yup.string()
                .required("Subject name is required"),
        content:
            yup.string()
            .max(20,"content can contain up to 20 characters")
            .required("Content is required"),      
    })
    
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
    useForm<ContactUsModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendDataToRemoteServer= (Login:ContactUsModel) =>{
        console.log("Sending to remote server");
    }  
    return (
        <div className="Contact_us">
						<h1>This is Contact us</h1>      
<form onSubmit={handleSubmit(sendDataToRemoteServer)}>

{errors?.firstName && <span>{errors.firstName.message}</span>}
<input {...register("firstName")} type="text" placeholder="First Name..."/>

{errors?.lastName &&<span>{errors.lastName.message}</span>}
<input {...register("lastName")} type="text" placeholder="Last Name..." />

{errors?.subject && <span>{errors.subject.message}</span>}
<input {...register("subject")} type="text" placeholder="subject..."/>

{errors?.content &&<span>{errors.content.message}</span>}
<input {...register("content")} type="text" placeholder="content..." />

<button  type ="submit" disabled={!isValid}>Send</button>

</form>	
        </div>
    );
}

export default Contact_us;
