import React from "react";
import Navbar from "../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import api from "../service/api.js";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const Editpost = () => {
  const { state } = useLocation();
  console.log(state.image);

  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [caption, setCaption] = useState(state?.caption || "");
  const [file, setFile] = useState(
    (state?.image.length > 0 && state?.image[0].url) || ""
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (caption.trim() == "") {
      return toast.warn("Post is empty..");
    }
    toast.loading("Updating post...", { position: "top-left" });
    setLoad(true);
    try {
      const req = await api.put(`/orbit/editpost/${state?._id}`, {
        caption: caption,
      });
      toast.dismiss();
      if (req.data.success) {
        toast.success(req.data.message, {
          onClose: () => {
            navigate("/orbit/postpage");
          },
          position: "top-left",
          autoClose: 2000,
        });
        setCaption("");
        // setFile(null);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(req.data.message, {
        position: "top-left",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <div className="max-w-3xl p-2 col-span-2 shadow-lg">
        <label className="text-3xl md:text-4xl flex gap-2 items-center justify-center  ">
          Edit your Post
          <FaMessage className="ml-2" />
        </label>
        <form
          onSubmit={handleSubmit}
          className=" p-6 max-w-3xl w-full   flex flex-col gap-4"
        >
          {/* <div className="flex">
            <label className="max-w-1/2 md:max-w-xs flex hover:scale-95 duration-300 bg-blue-100 rounded-2xl items-center justify-center w-full aspect-square border-2 border-dashed  ">
              <FaPlus className="text-6xl text-gray-700" />
              <input
                className="hidden"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="p-2 flex relative flex-wrap">
              {file && (
                <div className="w-25  md:w-40">
                  <button
                    onClick={() => {
                      setFile(null);
                    }}
                    type="button"
                    className="cursor-pointer "
                  >
                    <MdCancel className="absolute right-0 text-3xl hover:scale-110 duration-300 bg-white rounded-full" />
                  </button>
                  <img src={file || URL.createObjectURL(file)} alt="" />
                </div>
              )}
            </div>
          </div> */}
          {file ? (
            <img
              className="rounded-2xl"
              src={file || URL.createObjectURL(file)}
              alt=""
            />
          ) : (
            <img
              className="w-2xl mx-auto rounded-2xl"
              src="/src/assets/noimage.jpg"
              alt="No image available"
            />
          )}
          <textarea
            id="post"
            name="post"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Type content here..."
            className="resize-none border-2 focus:border-2 focus:scale-102 focus:border-green-500 duration-300 focus:shadow-lg   rounded-xl text-black  p-3 w-full h-32 outline-none   "
          />
          <button
            disabled={load}
            type="submit"
            className={`${
              load ? "pointer-events-none bg-gray-500" : " bg-yellow-500"
            }  cursor-pointer flex items-center justify-center text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 `}
          >
            Update Post
            <IoIosSend className="text-xl ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editpost;
