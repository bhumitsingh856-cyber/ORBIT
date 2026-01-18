import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/context.jsx";
import api from "../service/api.js";
import { useNavigate } from "react-router-dom";
const Editprofilepage = () => {
  const { state } = useLocation();
  const { user, setUser ,update} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const onSubmit = async (data) => {
    toast.loading("Updating Profile", {
      position: "top-left",
      autoClose: 1500,
    });
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    if (image) {
      formdata.append("image", image);
    }
    try {
      const req = await api.put(`/orbit/editprofilepage/${user._id}`, formdata);
      if (req.data.success) {
        await update();
        toast.dismiss();
        toast.success(req.data.message, {
          onClose: () => {
            navigate("/orbit/userprofilepage")
          },
          autoClose: 1500,
          position: "top-left",
        });
      } else {
        toast.dismiss();
        toast.error(req.data.message, {
          position: "top-left",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Internal server error");
    }
  };
  return (
    <div className="p-2 shadow-2xl ">
      <h1 className="text-4xl text-center">Edit Your Profile</h1>
      <div className="">
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circInOut" }}
          className="p-4  rounded-lg  "
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div>
            {/* Name Field */}
            <div className="flex justify-center">
              <label className="relative flex justify-center  w-fit rounded-full items-center">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
                <img
                  src={image ? URL.createObjectURL(image) : state.data.profilePicture.url}
                  className="object-cover h-30 md:h-50 md:max-w-50 max-w-30 rounded-full "
                  alt="profile picture"
                />
                <CiCamera className="text-6xl text-white  absolute"></CiCamera>
              </label>
            </div>
            <div className="md:flex w-full gap-4 ">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ ease: "circOut", duration: 0.5, delay: 0.4 }}
                className="mb-4 w-full"
              >
                <label className="block mb-1 font-medium">Name</label>
                <input
                  {...register("name", {
                    value: state.data.user,
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
                className="mb-4 w-full"
              >
                <label className="block mb-1 font-medium">Username</label>
                <input
                  {...register("username", {
                    value: state.data.username,
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
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </motion.div>
            </div>
            {/* Age Field */}
            <div className="flex gap-4">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ ease: "circOut", duration: 0.5, delay: 0.6 }}
                className="mb-4"
              >
                <label className="block mb-1 font-medium">Age</label>
                <input
                  {...register("age", {
                    value: state.data.age,
                    required: "Age is required",
                    min: {
                      value: 12,
                      message: "Age must be at least 12",
                    },
                    max: {
                      value: 100,
                      message: "Please enter a valtid age",
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
                  >
                    {errors.age.message}
                  </motion.p>
                )}
              </motion.div>
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ ease: "circOut", duration: 0.5, delay: 0.6 }}
                className="mb-4"
              >
                <label className="block mb-1 font-medium">Gender</label>
                <select
                  {...register("Gender")}
                  className="border w-full focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
                  name="Gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </motion.div>
            </div>
            {/* Email Field */}
            {/* <motion.div
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
            </motion.div> */}
            {/* Bio Field */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ ease: "circOut", duration: 0.5, delay: 0.8 }}
              className="mb-6"
            >
              <label className="block mb-1 font-medium">Bio</label>
              <textarea
                {...register("Bio", {
                  value: state.data.bio,
                  maxLength: {
                    value: 200,
                    message: "Bio must be less than 200 characters",
                  },
                })}
                placeholder="Enter Your Bio"
                type="text"
                rows="6"
                className="border resize-none w-full  focus:scale-105 border-gray-300 p-2 rounded-md focus:outline-none hover:rounded-2xl duration-300 focus:ring-2 focus:ring-green-500"
              />
              {errors.Bio && (
                <motion.p
                  animate={{ x: [0, -6, 6, -6, 6, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: 1, // how many times to repeat
                    repeatType: "loop", // or "reverse" or "mirror"
                  }}
                  className="text-red-500 text-sm"
                >
                  {errors.Bio.message}
                </motion.p>
              )}
            </motion.div>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ ease: "circOut", duration: 0.5, delay: 0.8 }}
            >
              <input
                type="submit"
                value="Update"
                className="w-full cursor:pointer hover:scale-105 duration-300 hover:shadow-[0_0_5px_pink,0_0_5px_white_inset] hover:rounded-2xl  bg-linear-to-br from-orange-600 to-gray-600 hover:from-gray-700 hover:to-orange-700 font-bold py-2 px-4 rounded cursor-pointer"
              />
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Editprofilepage;
