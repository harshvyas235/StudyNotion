import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { HOME } from "./pages/HOME";
import { SignUP } from "./componenet/core/Auth/SignUP";
import { Navbar } from "./componenet/common/Navbar";
import { Login } from "./componenet/core/Auth/Login";
import { Resetpass } from "./componenet/core/Auth/Resetpass";
import { UpdatePassword } from "./componenet/core/Auth/UpdatePassword";
import { About } from "./pages/About";
import { Otp } from "./componenet/core/Auth/Otp";
import { OpenRoute } from "./componenet/core/Auth/OpenRoute";
import { Dashboard } from "./pages/Dashboard";
import { MyProfile } from "./componenet/core/Dashboard/MyProfile";
// import { updateResetPassword } from "./componenet/core/Auth/updateResetPassword";
function App() {
  return (
    <div>
       <Navbar/>

    <Routes>
   <Route path="/" element={<HOME/>} />

   <Route path="/signUp" element={
    <OpenRoute>
        <SignUP/>
    </OpenRoute>
  
   }/>


   <Route path="/login"   element={
   <OpenRoute>
    <Login/>
   </OpenRoute>
   
   }/>


   <Route path="/forgot-password" element={
   <OpenRoute>
     <Resetpass/>
   </OpenRoute>
   
   }/>
   <Route path="/update-password/:id" element={<UpdatePassword/>}/>
   <Route path="/about" element={<About/>}/>

   <Route path="/otp_verify" element={<Otp/>}/>

   <Route  element={<Dashboard/>}>
         <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
   </Route>
   

   






   </Routes>
    </div>
   
  );
}

export default App;
