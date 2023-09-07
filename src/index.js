import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
 <React.StrictMode >
  <BrowserRouter>
   
    <App />
  
  </BrowserRouter>
  </React.StrictMode>
  </div>
 
);
