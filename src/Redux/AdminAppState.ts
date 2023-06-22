import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AdminModel } from '../Models/AdminModel';

interface AdminState{
    admins: AdminModel[]
}

const initialState: AdminState ={
    admins:[],
};

export enum ActionType {
 GOT_ALL_ADMINS = "GOT_ALL_ADMINS",
GOT_SINGLE_ADMIN = "GOT_SINGLE_ADMIN",
  ADDED_ADMIN = "ADDED_ADMIN",
  UPDATED_ADMIN = "UPDATED_ADMIN",
  DELETED_ADMIN = "DELETED_ADMIN",
  REMOVED_ADMIN = "REMOVED_ADMIN",
  SET_ADMIN="SET_ADMIN"
}
const adminsSlice = createSlice({
    name: "admins",
    initialState,
    reducers: {
      gotAllAdminsAction(state, action: PayloadAction<AdminModel[]>) {
        state.admins = action.payload;
      },
      gotSingleAdminAction(state, action: PayloadAction<AdminModel>) {
        state.admins.push(action.payload);
      },
      addedAdminAction(state, action: PayloadAction<AdminModel>) {
        state.admins.push(action.payload);
      },
      updatedAdminACtion(state, action: PayloadAction<AdminModel>) {
        const idx = state.admins.findIndex(

          (admin) => admin.adminId=== action.payload.adminId
        );
        state.admins[idx] = action.payload;
      },
      deletedAdminAction(state, action: PayloadAction<number>) {

        state.admins = state.admins.filter((admin) =>admin.adminId!== action.payload);
      },
      removeAdmins(state) {
        state.admins = [];
      }
    },
  })
  export const {
    gotAllAdminsAction,
    gotSingleAdminAction,
    addedAdminAction,
    updatedAdminACtion,
    deletedAdminAction,
    removeAdmins,
    
    
  } = adminsSlice.actions;
  
  export const adminsReducer =adminsSlice.reducer;