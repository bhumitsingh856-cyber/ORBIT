import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import socket from "../socket.js";
import { useEffect } from "react";
import { useAuth } from "../context/context.jsx";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });
    if (user?._id) socket.emit("username", user._id);
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log(user);
    if (!user._id) {
      navigate("/auth/login");
    }
  }, [user, navigate]);
  return (
    <div className="md:grid grid-cols-none md:grid-cols-3">
      <div className="flex justify-center col-span-1">
        <Sidebar></Sidebar>
        <Navbar></Navbar>
      </div>
      <div className="max-w-3xl flex flex-col md:pb-0 md:pt-0 pt-10 pb-12 gap-10 col-span-2">
        <Outlet></Outlet>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Layout;
