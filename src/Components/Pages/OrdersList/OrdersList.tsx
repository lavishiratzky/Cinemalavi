import axios from "axios";
import { OrderModel } from "../../../Models/OrderModel";
import store from "../../../Redux/Store";
import "./OrdersList.css";
import urlService from "../../../Services/UrlServices";
import { gotAllOrdersAction } from "../../../Redux/OrdersAppState";
import notifyService from "../../../Services/NotificationServices";
import { useEffect, useState } from "react";
import moment from 'moment'

function OrdersList(): JSX.Element {
    const [searchTerm,setSearchTerm]= useState<string>("")
    const tableHeaders = ["Order Id","Movie Date", "Movie Id", "Movie Name","Tickets", "User Id","F.Name","L.Name", "Email"];
    const[orders ,setOrders] = useState<OrderModel[]>(store.getState().ordersReducer.orders);
    useEffect(() => {
        if (orders.length ===0){
        axios.get<OrderModel[]>(urlService.urls.orders) 
        .then(res =>{setOrders(res.data);
        store.dispatch(gotAllOrdersAction(res.data))
            notifyService.success("Orders was collected!!")}
       )
        
       
        .catch(err => {console.log(err);
            notifyService.failure("Orders was Not collected!!")})
        }
    },[])
    return (
        <div className="OrdersList">
            
            <h1 className ="tableHead"><input type ="text" placeholder="Type a number of an Order" onChange={event=>{setSearchTerm(event.target.value)}}/></h1>
		<table>
            <thead className ="tableHead">
                <tr>
                {tableHeaders.map(str=> <th key = {str}>{str}</th>)}
                </tr>
                </thead>
            
                <tbody>

                    {orders.filter((val)=>{
                         if (searchTerm===""){
                            return store.dispatch
                        }
                        else if(val.orderId.toString().includes(searchTerm)){
                    return val
                }
               
                 return false;
            }).map(o =>
                        <tr key={'o'+o.orderId}>
                            <td>{o.orderId}  </td>
                            <td>{moment(o.movieDate).format('DD/MM/YYYY')}</td>
                            <td>{o.movieId}</td>
                            <td>{o.movieName}</td>
                            <td>{o.tickets}</td>
                            <td>{o.userId}</td>
                            <td>{o.userFirstName}</td>
                            <td>{o.userLastName}</td>
                            <td>{o.email}</td>
                           
                        </tr>
                    )}
                </tbody>
            
        </table>	
        </div>
    );
}

export default OrdersList;
