import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersListModel } from "../Models/OrdersListModel";

interface MoviesState{
   orders: OrdersListModel[]
}

const initialState: MoviesState ={
    orders:[],
};

export enum ActionType {
 GOT_ALL_ORDERS = "GOT_ALL_ORDERS",
GOT_SINGLE_ORDER = "GOT_SINGLE_ORDER",
  ADDED_ORDER = "ADDED_ORDER",
  UPDATED_ORDER = "UPDATED_ORDER",
  DELETED_ORDER = "DELETED_ORDER",
  REMOVED_ORDERS = "REMOVED_ORDERS",
}
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      gotAllOrdersAction(state, action: PayloadAction<OrdersListModel[]>) {
        state.orders = action.payload;
      },
      gotSingleOrderAction(state, action: PayloadAction<OrdersListModel>) {
        state.orders.push(action.payload);
      },
      addedOrderAction(state, action: PayloadAction<OrdersListModel>) {
        state.orders.push(action.payload);
      },
      updatedOrderACtion(state, action: PayloadAction<OrdersListModel>) {
        const idx = state.orders.findIndex(
          (order) => order.OrderID === action.payload.OrderID
        );
        state.orders[idx] = action.payload;
      },
      deletedOrderAction(state, action: PayloadAction<number>) {
        state.orders = state.orders.filter((order) => order.OrderID !== action.payload);
      },
      removeOrders(state) {
        state.orders = [];
      },
    },
  });
  export const {
    gotAllOrdersAction,
    gotSingleOrderAction,
    addedOrderAction,
    updatedOrderACtion,
    deletedOrderAction,
    removeOrders,
  } = ordersSlice.actions;
  
  export const ordersReducer = ordersSlice.reducer;