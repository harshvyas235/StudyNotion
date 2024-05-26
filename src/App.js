import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { HOME } from "./pages/HOME";
// import { SignUP } from "./componenet/core/Auth/SignUP";
import { Navbar } from "./componenet/common/Navbar";
import { Login } from "./componenet/core/Auth/Login";
import { Resetpass } from "./componenet/core/Auth/Resetpass";
import { UpdatePassword } from "./componenet/core/Auth/UpdatePassword";
// import { updateResetPassword } from "./componenet/core/Auth/updateResetPassword";
function App() {
  return (
    <div>
       <Navbar/>

    <Routes>
   <Route path="/" element={<HOME/>} />
   {/* <Route path="/signUp" element={<SignUP/>}/> */}
   <Route path="/login"   element={<Login/>}/>
   <Route path="/forgot-password" element={<Resetpass/>}/>
   <Route path="/update-password/:id" element={<UpdatePassword/>}/>

   </Routes>
    </div>
   
  );
}

export default App;
