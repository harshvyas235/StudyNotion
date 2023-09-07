import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { HOME } from "./pages/HOME";

function App() {
  return (

   <Routes>
   <Route path="/" element={<HOME/>} />
   </Routes>
  );
}

export default App;
