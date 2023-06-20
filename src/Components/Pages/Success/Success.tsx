import "./Success.css";
import store, { RootState } from "../../../Redux/Store";
import { OrderModel } from "../../../Models/OrderModel";
import { useSelector } from "react-redux";
function Success(): JSX.Element {
    const order = useSelector((state: RootState) => state.ordersReducer.orders.slice(-1)[0]) || {};

    return (
        <div className="Success">
			<h1>Your order Details</h1>
            <p>Order Number: {order.orderId}</p>
            <p>Movie Name: {order.movieName}</p>
                 <p>Movie Id: {order.movieId}</p>
                 <p>Movie Date: {order.movieDate}</p>
                 <p>Ticket Number: {order.tickets}</p>
                 <p>User First Name: {order.userFirstName}</p>
                 <p>User Last Name: {order.userLastName}</p>
                 <p>User Email: {order.email}</p>
  


        </div>
    );
}

export default Success;
