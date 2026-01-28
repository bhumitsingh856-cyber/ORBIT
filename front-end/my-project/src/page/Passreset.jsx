import React from "react";
import api from "../service/api.js"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {motion} from "framer-motion"
const Passreset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    toast.loading("Sending mail...", { position: "top-left" });
    try {
      const req = await api.post( "/auth/forgotpass", data );
      if (req.data.success) {
        toast.dismiss();
        toast.success(`${req.data.message}`, { position: "top-left" });
      } else {
        toast.warn(`${req.data.message}`, { position: "top-left" });
      }
    } catch (error) {
      toast.error("Something went wrong ! ");
    }
  };
  return (
    <div className=" bg-[url(./assets/reset.jpg)] bg-cover bg-bottom  text-white p-2 w-full h-screen ">
      <ToastContainer />
      <motion.form
      initial={{ opacity: 0,y:200 }}
      animate={{ opacity: 1,y:0 }}
      transition={{ duration: 0.5 }}
        className="mx-auto p-6 max-w-2xl rounded-2xl flex flex-col gap-4 backdrop-blur-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="sm:text-6xl text-4xl text-center">Forgot your Orbit password ?</h1>
        <h1 className="text-xl text-center">No Problem</h1>
        <span>
          <label>Username</label>
          <input
            className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-blue-500"
            {...register("username", {
              required: "username is required",
            })}
            placeholder="Enter username"
            type="text"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </span>
        <span>
          <label>Email</label>
          <input
            className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "email is required",
            })}
            placeholder="Enter email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </span>
        <button className="hover:scale-105 duration-300 hover:bg-amber-600 bg-yellow-500 text-2xl font-bold p-4 rounded-2xl">
          Verify
        </button>
      </motion.form>
    </div>
  );
};

export default Passreset;
