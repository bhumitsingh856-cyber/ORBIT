import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import api from "../service/api.js"
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Newpass = () => {
  const navigate = useNavigate();
  const { username, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const req = await api.post("/auth/setnewpass",{ password: data.password, username, token });
      if (req.data.success) {
        toast.success("Password changed successfully", {
          onClose: () => {
            navigate("/auth/login");
          },
          position: "top-left",
          autoClose: 2500,
        });
      }
      else {
        toast.warn(`${req.data.message}`, { position: "top-left" });
      }
    } catch (error) {
      toast.error("Something went wrong ! ");
    }
  };
  return (
    <div className=" bg-[url(./assets/forgot.jpg)] bg-cover bg-bottom  text-white p-2 w-full h-screen ">
      <ToastContainer />
      <motion.form
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto p-6 backdrop-blur-2xl max-w-2xl rounded-2xl flex flex-col gap-4  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="sm:text-6xl text-4xl text-center">
          Create new Password
        </h1>

        <span>
          <label className="block mb-1 font-medium">
            Create a new Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter a strong Password"
            type="password"
            className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <motion.p
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{
                duration: 0.5,
                repeat: 1, // how many times to repeat
                repeatType: "loop", // or "reverse" or "mirror"
              }}
              className="text-red-500 text-sm"
            >
              {errors.password.message}
            </motion.p>
          )}
        </span>
        <button className="hover:scale-105 duration-300 hover:bg-amber-600 bg-yellow-500 text-2xl font-bold p-4 rounded-2xl">
          Change Password
        </button>
      </motion.form>
    </div>
  );
};

export default Newpass;
