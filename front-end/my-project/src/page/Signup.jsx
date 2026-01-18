import React from "react";
import api from "../service/api.js"
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer ,toast} from "react-toastify";
// import "./font.css"
const Signup = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data)=>{
    toast.loading("Creating new user...", { position: "top-left" });
      try{
        const req=await api.post("/auth/signup",data)
        const reqdata=req.data;
        if(reqdata.success){
          toast.dismiss();
          toast.success("User created successfully",{onClose:()=>{
            navigate("/auth/login");
          },position:"top-left"
        })
        }
        if(!reqdata.success && reqdata.message==="User already exists"){
          toast.dismiss();
          toast.warn("User already exist");
        }
      }catch(e){
        toast.dismiss();
        toast.error("Something went wrong...Please try again")
      }
  };
  return (
    <motion.div id="font"
      initial={{ opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-black bg-[url('/src/assets/signup.jpg')] bg-center bg-no-repeat bg-cover p-3 h-screen flex flex-col md:justify-center items-center"
    >
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circInOut" }}
        className="backdrop-blur-3xl p-8 rounded-lg text-white w-full md:w-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl mb-4  text-center">User Sign-Up</h2>
        {/* Name Field */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.4 }}
          className="mb-4"
        >
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Enter name"
            type="text"
            className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
          />
          {errors.name && (
            <motion.p
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{
                duration: 0.5,
                repeat: 1, // how many times to repeat
                repeatType: "loop", // or "reverse" or "mirror"
              }}
              className="text-red-500 text-sm"
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>
        {/* Username Field */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.5 }}
          className="mb-4"
        >
          <label className="block mb-1 font-medium">Username</label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            placeholder="Enter Username"
            type="text"
             className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
          />
          {errors.username && (
            <motion.p
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{
                duration: 0.5,
                repeat: 1, // how many times to repeat
                repeatType: "loop", // or "reverse" or "mirror"
              }}
              className="text-red-500 text-sm"
            >{errors.username.message}</motion.p>
          )}
        </motion.div>
        {/* Age Field */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.6 }}
          className="mb-4"
        >
          <label className="block mb-1 font-medium">Age</label>
          <input
            {...register("age", {
              required: "Age is required",
              min: {
                value: 18,
                message: "Age must be at least 18",
              },
              max: {
                value: 120,
                message: "Please enter a valid age",
              },
            })}
            placeholder="Enter Age"
            type="number"
             className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
          />
          {errors.age && (
           <motion.p
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{
                duration: 0.5,
                repeat: 1, // how many times to repeat
                repeatType: "loop", // or "reverse" or "mirror"
              }}
              className="text-red-500 text-sm"
            >{errors.age.message}</motion.p>
          )}
        </motion.div>
        {/* Email Field */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.7 }}
          className="mb-4"
        >
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            type="email"
             className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <motion.p
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{
                duration: 0.5,
                repeat: 1, // how many times to repeat
                repeatType: "loop", // or "reverse" or "mirror"
              }}
              className="text-red-500 text-sm"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>
        {/* Password Field */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.8 }}
          className="mb-6"
        >
          <label className="block mb-1 font-medium">Password</label>
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
            >{errors.password.message}</motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.8 }}
        >
          <input
            type="submit"
            value="Sign Up"
            className="w-full cursor:pointer hover:scale-105 duration-300 hover:shadow-[0_0_5px_pink,0_0_5px_white_inset] hover:rounded-2xl  bg-linear-to-br from-orange-600 to-gray-600 hover:from-gray-700 hover:to-orange-700 font-bold py-2 px-4 rounded cursor-pointer"
          />
        </motion.div>
      </motion.form>
      <ToastContainer/>
    </motion.div>
  );

};
export default Signup;
