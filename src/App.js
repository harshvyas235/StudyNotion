import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { HOME } from "./pages/HOME";
import { SignUP } from "./componenet/core/SignUp/SignUP";
import { Navbar } from "./componenet/common/Navbar";
import { Login } from "./componenet/core/Auth/Login";
function App() {
  return (
    <div>
       <Navbar/>

    <Routes>
   <Route path="/" element={<HOME/>} />
   <Route path="/signUp" element={<SignUP/>}/>
   <Route path="/login"   element={<Login/>}/>
   </Routes>
    </div>
   
  );
}

export default App;
