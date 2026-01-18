import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../service/api.js"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import { useAuth } from "../context/context.jsx";
const Login = () => { 
  const { userdata } = useAuth();
  useEffect(() => {
    toast("Welcome To Orbit", { position: "top-left" ,autoClose:2000});
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    toast.loading("Loading...", { position: "top-left" })
    try {
      const req = await api.post("/auth/login", data);
      if (req.data.success) {
        await userdata();
        toast.dismiss();
         toast.success("Successfully logged-in", 
          {
            onClose: () => {
              navigate("/orbit/postpage");
            },
            autoClose:1500,
            position:"top-left"
        });
      } else {
        toast.dismiss();
        toast.warn("Something went wrong !", { position: "top-left" });
      }
    } catch (e) {
      toast.dismiss();
      toast.error("Something went wrong Please try again", { position: "top-left" })
    }
  };
  return (
    <div className='text-white bg-[url("assets/loginPage.jpg")] bg-cover h-screen bg-no-repeat  bg-center'>
      <div className="text-6xl backdrop-blur-2xl w-fit text-center mx-auto p-2 rounded-b-2xl">
        Welcome Back!
      </div>
      <form
        className="backdrop-blur-2xl p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-sm mx-auto mt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-5xl text-center mb-4">User Log-in</div>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.4 }}
        >
          <label className="block mb-1 font-medium">Username</label>
          <input
            className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-blue-500"
            {...register("username", {
              required: "Username is required",
            })}
            placeholder="Enter username"
            type="text"
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
            >
              {errors.username.message}
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "circOut", duration: 0.5, delay: 0.5 }}
        >
          <label className="block mb-1 font-medium">Password</label>
          <input
            className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter password"
            type="password"
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
              {" "}
              {errors.password.message}
            </motion.p>
          )}
          <div className="text-end ">

          <Link className="text-sm text-blue-500 duration-300 hover:text-blue-300 p-2 " to="/auth/forgotpassword">forgot password?</Link>
          </div>

        </motion.div>

        <motion.button
           
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "anticipate", delay: 0.6 }}
          className="bg-linear-to-br cursor-pointer hover:rounded-2xl hover:shadow-[0_0_5px_pink,0_0_5px_white_inset] to-[#898b0a] from-[#11cf5d] via-[#034725] font-bold text-white p-2 rounded-md hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Login
        </motion.button>
        <div className="text-center">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-blue-500 hover:text-blue-300 hover:underline underline-offset-4 duration-300"
          >
            Sign Up
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
