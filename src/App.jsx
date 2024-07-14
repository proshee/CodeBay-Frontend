import "./App.css";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Allbooks from "./pages/Allbooks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favorites from "./components/Profile/Favorites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings"
import Allorders from "./components/Profile/Allorders";
import AddBooks from "./pages/AddBooks";
import UpdateBook from "./pages/UpdateBook";


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.changeRole(localStorage.getItem("role")));
      dispatch(authActions.login());
    }
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/all-books" element={<Allbooks />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}>
          {role == "user" ? <Route index element = {<Favorites />} ></Route> : <Route index element = {<Allorders />} ></Route>}
          {role == "admin" && <Route path="add-book" element = {<AddBooks/>}></Route>}
          <Route path="orderHistory" element = {<UserOrderHistory/>} ></Route>
          <Route path="settings" element = {<Settings />} ></Route>
        </Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/update-book/:id" element={<UpdateBook />}></Route>
        <Route
          path="/view-book-details/:id"
          element={<ViewBookDetails />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
