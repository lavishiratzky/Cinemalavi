import axios from "axios";
import { OrderModel } from "../../../Models/OrderModel";
import store from "../../../Redux/Store";
import "./OrdersList.css";
import urlService from "../../../Services/UrlServices";
import { gotAllOrdersAction } from "../../../Redux/OrdersAppState";
import notifyService from "../../../Services/NotificationServices";
import { useEffect, useState } from "react";

function OrdersList(): JSX.Element {
    const [searchTerm,setSearchTerm]= useState<string>("")
    const tableHeaders = ["Order Id","Order Date", "Movie Id", "Movie Name","Tickets", "User Id","User Fname","User Lname", "Email"];
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
                        else if(val.OrderID.toString().includes(searchTerm)){
                    return val
                }
               
                 return false;
            }).map(o =>
                        <tr key={'o'+o.OrderID}>
                            <td>{o.OrderID}  </td>
                            <td>{o.OrderDate}</td>
                            <td>{o.MovieID}</td>
                            <td>{o.MovieName}</td>
                            <td>{o.tickets}</td>
                            <td>{o.UserID}</td>
                            <td>{o.UserFirstName}</td>
                            <td>{o.UserFamilyName}</td>
                            <td>{o.email}</td>
                            {/* <td>
                                <img src={o.image} alt={o.name} />
                            </td>
                            */}
                        </tr>
                    )}
                </tbody>
            
        </table>	
        </div>
    );
}

export default OrdersList;
