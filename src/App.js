import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import ProductDetail from "./page/ProductDetail";
import Navbar from "./component/Nabar";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";

function App() {
  // //true면 로그인 false면 로그인 안됨
  // const [authenticate, setAuthenticate] = useState(false);
  const authenticate = useSelector((state) => state.auth.authenticate);

  useEffect(() => {
    console.log("authenticate", authenticate);
  }, [authenticate]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<PrivateRoute />} />
      </Routes>
    </div>
  );
}

export default App;
