import React from "react";
import Navbar from "../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { CiChat1 } from "react-icons/ci";
import api from "../service/api.js";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Createpostpage = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (caption.trim() == "") {
      return toast.warn("Post is empty..");
    }
    toast.loading("Creating post...", { position: "top-left" });
    const formdata = new FormData();
    if (video) {
      formdata.append("video", video);
    } else {
      image.forEach((image) => formdata.append("image", image));

      setLoad(true);
    }
    formdata.append("caption", caption);
    try {
      const req = await api.post("/orbit/createpost", formdata);
      toast.dismiss();
      if (req.data.success) {
        toast.success(`${req.data.message}`, {
          onClose: () => {
            navigate("/orbit/postpage");
          },
          position: "top-left",
          autoClose: 2000,
        });
        setCaption("");
        setVideo(null);
        setImage([]);
      } else {
        toast.dismiss();
        toast.error(`${req.data.message}`, {
          position: "top-left",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast.dismiss();
      toast.error("Something went wrong !", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <div className="p-2 col-span-2 shadow-2xl rounded-2xl ">
        <div className="text-3xl md:text-4xl flex gap-2 items-center justify-center  ">
          <h1 className="font-bold bg-clip-text text-transparent bg-linear-to-r from-[#0040ff]  via-[#ff00c3] to-[#00ffdd] ">Create a new post</h1>
          <span>
            <CiChat1 className="ml-2 text-orange-500 " />
          </span>
        </div>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="p-6 w-full flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className=" md:max-w-xs  flex hover:scale-95 duration-300 bg-blue-100 hover:shadow-2xl rounded-2xl items-center max-w-sm aspect-square justify-center border-2 border-dashed ">
              <FaPlus className="text-6xl text-gray-700" />
              <input
                className="hidden"
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  if (files.length === 1 && files[0].type.startsWith("video")) {
                    // Single video case
                    setVideo(files[0]);
                    setImage([]); // clear images
                  } else {
                    // Multiple images case

                    setImage((prev) => [...prev, ...files]);
                    setVideo(null); // clear video
                  }
                }}
              />
            </label>
            <div className="p-2 flex gap-2 w-fit flex-wrap">
              {image.length > 0 &&
                image.map((file, index) => (
                  <div key={index} className="w-25 relative md:w-40">
                    <button
                      onClick={() => {
                        setImage((prev) => prev.filter((f) => f !== file));
                      }}
                      type="button"
                      className="cursor-pointer w-full h-fit"
                    >
                      <MdCancel className="absolute  right-0 text-4xl hover:scale-110 duration-300 bg-white rounded-full" />
                    </button>
                    <img src={URL.createObjectURL(file)} alt="" />
                  </div>
                ))}
              {video && (
                <div className="w-40 relative">
                  <button
                    onClick={() => setVideo(null)}
                    type="button"
                    className="cursor-pointer w-full h-fit"
                  >
                    <MdCancel className="absolute right-0 text-4xl hover:scale-110 duration-300 z-10 bg-white rounded-full" />
                  </button>
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-32 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <textarea
            id="post"
            name="post"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Type content here..."
            className="resize-none border-2 focus:border-2   focus:scale-102 bg-linear-to-br from-white to-teal-50 via-gray-100 focus:rounded-xl focus:border-blue-500 duration-300 focus:shadow-2xl  rounded-[7px] text-black  p-3 w-full h-32 outline-none border-zinc-500 "
          />
          <button
            disabled={load}
            type="submit"
            className={`${
              load ? "pointer-events-none bg-gray-500" : "  from-yellow-500  to-red-500 via-orange-500"
            }  cursor-pointer flex hover:shadow-2xl items-center justify-center bg-linear-to-r text-black hover:scale-102 duration-300 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400`}
          >
            Submit Post
            <IoIosSend className="text-xl ml-2 " />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createpostpage;
