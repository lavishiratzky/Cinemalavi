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
    const user = useSelector((state: RootState) => state.usersReducer.users.slice(-1)[0]) || {};
    const [selectedMovie, setSelectedMovie] = useState<MovieModel | undefined>();    
    const[movies,setMovies] = useState<MovieModel[]>(store.getState().moviesReducer.movies);
    const  selectMovie =useSelector((state: RootState) => state.moviesReducer.selectedMovie);
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
        Order.movieName = selectedMovie?.name || selectMovie?.name||"" // Include movieName in the order object
        Order.movieId = selectedMovie?.movieId || selectMovie?.movieId||0;
        Order.userId= user.userId;
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
            

            {selectMovie?.movieId ? (<></>) : (<><select
  id="movieId"
  name="movieId"
  value={selectedMovie?.movieId || ''}
  onChange={e => {
    const selectedMovieId = Number(e.target.value);
    const movie = movies.find(m => m.movieId === selectedMovieId);
    setSelectedMovie(movie);
  }}
>
  <option value="" style={{ color: 'gray' }}>Movie Name</option>
  {movies.map((m) => (
    <option key={m.movieId} value={m.movieId}>{m.name}</option>
  ))}
</select>
</>)}
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

                   <p>{selectMovie?.name}</p>
                 {errors.tickets?.message ? <>  <span>{errors?.tickets?.message}</span> </> :   <>  <label htmlFor="tickets">tickets</label> </>}
                 <input {...register("tickets")}id="tickets" name="tickets" type="number"step="1" min={0} placeholder="tickets..." />
                  
                {/* {errors?.userFirstName && <span>{errors.userFirstName.message}</span>}
                <input {...register("userFirstName")} type="hidden" placeholder="First Name..." defaultValue={user?.firstName}/>

                {errors?.userLastName && <span>{errors.userLastName.message}</span>}
                <input {...register("userLastName")}type="hidden" placeholder="Last Name..."defaultValue={user?.lastName} />
 
                {errors?.email && <span>{errors.email.message}</span>}
                <input {...register("email")} type="hidden" placeholder=" Email..."defaultValue={user?.email} /> 

                {errors?.userId && <span>{errors.userId.message}</span>}
                <input {...register("userId")}  type="hidden" placeholder=" userId.."defaultValue={user?.userId} /> */}
  
                <button type="submit" disabled={!isValid}>Send</button>
            </form>
            {/* <p>{selectedMovie?.name}</p>
            <p>{selectedMovie?.movieId}</p>
            <p>{user.email}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.userId}</p> */}
            
           
            
           
           
        </div>
    );
}

export default Order;
