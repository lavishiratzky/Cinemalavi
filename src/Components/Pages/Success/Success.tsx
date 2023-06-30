import "./Success.css";
import store, { RootState } from "../../../Redux/Store";
import { OrderModel } from "../../../Models/OrderModel";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {  removeSelectedMovie } from "../../../Redux/MoviesAppState"; // Update the import statement

function Success(): JSX.Element {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.ordersReducer.orders.slice(-1)[0]) || {};

  // Dispatch the deleteSelectMovieAction to remove the selected movie
  dispatch( removeSelectedMovie());

  return (
    <div className="Success">
      <h1>Your order Details</h1>
      <p>Order Number: {order.orderId}</p>
      <p>Movie Name: {order.movieName}</p>
      <p>Movie Date: {moment(order.movieDate).format('DD/MM/YYYY')}</p>
      <p>Tickets Number: {order.tickets}</p>
      <p>User First Name: {order.userFirstName}</p>
      <p>User Last Name: {order.userLastName}</p>
      <p>User Email: {order.email}</p>
    </div>
  );
}

export default Success;
