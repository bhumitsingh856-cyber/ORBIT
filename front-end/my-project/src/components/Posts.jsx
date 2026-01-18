import React, { useState, useRef } from "react";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdOutlineComment } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAuth } from "../context/context";
import { useNavigate } from "react-router-dom";
import formatDate from "../service/dateformater";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import Comments from "./Comments";
import { Pagination, Navigation } from "swiper/modules";
const Posts = ({ data, deletepost, likepost, setPosts }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleedit = async () => {
    navigate(`/orbit/editpost/${data._id}`, {
      state: { _id: data._id, caption: data.content, image: data.image },
    });
  };
  return (
    <>
      <Comments
        show={show}
        setShow={setShow}
        comments={data.comments}
        _id={data._id}
        setPosts={setPosts} // ✅ PASSED HERE
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.1 } }}
        viewport={{ once: true }}
        className={`${
          data?.user._id === user?._id
            ? "bg-linear-to-b from-white to-blue-50"
            : "border-zinc-300 "
        } mb-2 hover:scale-99 border-b-2 shadow-2xl duration-300  rounded-2xl border-gray-200 `}
      >
        <div className="  flex flex-col gap-2 p-2 md:p-4  ">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <img
                loading="lazy"
                className=" w-7 object-cover h-7 md:w-10 md:h-10 rounded-full "
                src={data.user.profilePicture.url}
                alt="Profile"
              />
              <div className="flex flex-col">
                <button
                  onClick={() =>
                    navigate(`/orbit/profile/${data.user.username}`)
                  }
                  className="text-l cursor-pointer hover:scale-105 duration-300 md:text-xl"
                >
                  {data.user.username}
                  {data.user.username === user.username && (
                    <span className="pl-2 font-light text-sm text-zinc-500">
                      (You)
                    </span>
                  )}
                </button>

                <span className="text-gray-500 text-xs md:text-[15px]">
                  {data.user.user}
                </span>
              </div>
            </div>
            <span className="text-[12px] md:text-[17px]">
              {formatDate(data.createdAt)}
            </span>
          </div>
          <div>
            {data.video && (
              <motion.video
                onViewportLeave={() => ref.current.pause()}
                ref={ref}
                loading="lazy"
                controls
                loop
                className=" rounded-xl mx-auto max-h-130   "
                src={data.video.url}
                alt="post video"
              ></motion.video>
            )}
            <Swiper
              pagination={{
                type: "bullets",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper "
            >
              {data.image.length !== 0 &&
                data.image.map((data) => (
                  <SwiperSlide id={data._id}>
                    <img
                      loading="lazy"
                      className=" rounded-xl mx-auto max-h-130 "
                      src={data.url}
                      alt="post image"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="flex text-3xl justify-between  gap-5">
            <div className="flex gap-5">
              <button
                onClick={() => {
                  likepost(data._id);
                }}
                className=" p-2 cursor-pointer hover:animate-bounce hover:scale-105 duration-300 rounded-xl"
              >
                {data.likes.includes(user?._id) ? (
                  <BiSolidDislike className=" text-red-700 " />
                ) : (
                  <BiSolidLike className="text-green-700" />
                )}
              </button>
              <button
                onClick={() => setShow(true)}
                className="p-2  cursor-pointer rounded-xl "
              >
                <MdOutlineComment />
              </button>
            </div>
            {data.user._id === user?._id && (
              <div className="flex gap-5">
                <button
                  onClick={handleedit}
                  className="p-2 cursor-pointer hover:scale-105 rounded-xl "
                >
                  <AiFillEdit />
                </button>
                <button
                  className="cursor-pointer hover:animate-pulse hover:scale-105 duration-300"
                  onDoubleClick={() => deletepost(data._id)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="font-bold text-xs">{data.likes.length} Likes</div>
          <div className="">
            <div
              className={`
             ${more ? "h-fit min-h-23 " : "line-clamp-3 max-h-23"}
             ${data.content === " " && "hidden"}
             duration-300 text-sm p-2 wrap-break-word md:text-lg  overflow-hidden`}
            >
              <span className="font-bold">{data?.user.username}</span> -
              {data.content}
            </div>
            <button
              className={` ${
                data.content.length > 200 ? "flex" : "hidden"
              } justify-end w-full cursor-pointer text-gray-500 font-bold`}
              onClick={() => setMore(!more)}
            >
              {more ? "Less" : "More"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Posts;
