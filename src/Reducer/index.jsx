import {combineReducers} from "@reduxjs/toolkit";

import authSlice from "../Slice/authSlice";
import profileSlice from "../Slice/profileSlice";
import cartSlice from "../Slice/cartSlice";

const rootReducer  = combineReducers({
    auth:authSlice,
    profile:profileSlice,
    cart :cartSlice
})

export default rootReducer