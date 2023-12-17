import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup"
import { Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast"
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
}

export default App;
