import React from "react";
import api from "../service/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
function createStory({ show, setShow, getstory }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState([]);
  const [load, setLoad] = useState(false);
  const onSubmit = async (data) => {
    setLoad(true);
    if (data.caption.length === 0 && file.length === 0) {
      toast.warn("Story is empty..", { position: "top-left", autoClose: 1500 });
      setLoad(false);
      return;
    }
    toast.loading("Creating story...", { position: "top-left" });
    const formdata = new FormData();
    if (file.length > 0) {
      file.forEach((e) => formdata.append("image", e));
    }
    formdata.append("caption", data.caption);
    try {
      const req = await api.post("/orbit/createstory", formdata);
      if (req.data.success) {
        toast.dismiss();
        toast.success(req.data.message, {
          position: "top-left",
          autoClose: 1500,
        });
        setShow(!show);
        setLoad(false);
        getstory();
        setCaption("");
        setFile([]);
      }
    } catch (error) {
      toast.error("Internal Server Error", { position: "top-left" });
    }
  };
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } bg-zinc-800/80 flex z-50 text-white justify-center p-2 fixed inset-0`}
    >
      <div className="w-2xl">
        <div className="flex justify-between items-center">
          <h1 className="md:text-5xl font-bold text-4xl p-4">Create Story</h1>
          <RxCross1
            onClick={() => setShow(!show)}
            className="text-3xl  hover:scale-120 duration-300 hover:animate-spin"
          ></RxCross1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="w-full flex flex-col gap-6 p-6 rounded-2xl shadow-2xl bg-linear-to-b from-teal-600 to-black"
        >
          {/* Upload Section */}
          <div className="flex flex-col">
            <label className=" flex hover:scale-95 duration-300 bg-blue-100 hover:shadow-2xl rounded-2xl items-center h-32 justify-center border-2 border-dashed ">
              <h1 className="text-[100px]  font-extralight text-gray-700">
                +{" "}
              </h1>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                name="image"
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    setFile((prev) => [...prev, ...files]);
                  }
                }}
              />
            </label>
            <div className="p-2 flex gap-2 w-fit flex-wrap">
              {file !== "" &&
                file.map((file) => (
                  <div key={Date.now()} className="w-20 relative md:w-40">
                    <button
                      onClick={() => {
                        setFile((prev) =>
                          prev.filter((f) => f.name !== file.name)
                        );
                      }}
                      type="button"
                      className="cursor-pointer text-black w-full h-fit"
                    >
                      <MdCancel className="absolute  right-0 text-4xl hover:scale-110 duration-300 bg-white rounded-full" />
                    </button>
                    <img src={URL.createObjectURL(file)} alt="" />
                  </div>
                ))}
            </div>
            {/* Caption Section */}
            <div className="flex flex-col w-full">
              <label className="text-xl text-white font-semibold   mb-2">
                Caption
              </label>
              <textarea
                id="post"
                name="post"
                {...register("caption", {
                  maxLength: {
                    value: 500,
                    message: "Caption must be less than 500 characters",
                  },
                })}
                placeholder="Type content here..."
                className="resize-none w-full h-32 p-3 rounded-lg border-4 border-white bg-linear-to-br outline-none text-black to-sky-200 from-white focus:bg-zinc-200 hover:scale-101  focus:border-purple-500 focus:shadow-xl   duration-300"
              />

              {errors.caption && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.caption.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={load}
            className={`${
              load && "bg-zinc-500 hover:bg-zinc-700 cursor-none"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default createStory;
