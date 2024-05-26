import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import{Provider} from "react-redux"
// import {configureStore} from "@reduxjs/toolkit"
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./Reducer";
import { Toaster } from "react-hot-toast";



const store = configureStore({
  reducer:rootReducer
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
 <React.StrictMode >
<Provider store={store}>
<BrowserRouter>
   
   <App />
    
   <Toaster/>

 
 </BrowserRouter>
</Provider>


 
  </React.StrictMode>
  </div>
 
);
