import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieModel } from "../Models/MovieModel";
import { UsersModel } from '../Models/UsersModel';

interface UserState{
    users: UsersModel[]
}

const initialState: UserState ={
    users:[],
};

export enum ActionType {
 GOT_ALL_USERS = "GOT_ALL_USERS",
GOT_SINGLE_USER = "GOT_SINGLE_USER",
  ADDED_USER = "ADDED_USER",
  UPDATED_USER = "UPDATED_USER",
  DELETED_USER = "DELETED_USER",
  REMOVED_USER = "REMOVED_USER",
  SET_USER="SET_USER"
}
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      gotAllUsersAction(state, action: PayloadAction<UsersModel[]>) {
        state.users = action.payload;
      },
      gotSingleUserAction(state, action: PayloadAction<UsersModel>) {
        state.users.push(action.payload);
      },
      addedUserAction(state, action: PayloadAction<UsersModel>) {
        state.users.push(action.payload);
      },
      updatedUserACtion(state, action: PayloadAction<UsersModel>) {
        const idx = state.users.findIndex(
          // (movie) => movie.id === action.payload.id
          (user) => user.userId=== action.payload.userId
        );
        state.users[idx] = action.payload;
      },
      deletedUserAction(state, action: PayloadAction<number>) {
        // state.movies = state.movies.filter((movie) => movie.id !== action.payload);
        state.users = state.users.filter((user) => user.userId !== action.payload);
      },
      removeUsers(state) {
        state.users = [];
      }
    },
  })
  export const {
    gotAllUsersAction,
    gotSingleUserAction,
    addedUserAction,
    updatedUserACtion,
    deletedUserAction,
    removeUsers,
    
    
  } = usersSlice.actions;
  
  export const usersReducer =usersSlice.reducer;