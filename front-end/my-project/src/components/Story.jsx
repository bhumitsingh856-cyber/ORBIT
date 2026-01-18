import React, { useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import api from "../service/api.js";
import { useAuth } from "../context/context.jsx";
import timeAgo from "../service/timeago.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom"; 
const Story = ({ data , getstory}) => {
  const progressContent = useRef(null);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(data.viewers);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handledelete = async () => {
    try {
      const req = await api.delete(`/orbit/deletestory/${data._id}`);
      if (req.data.success) {
        toast.success(`${req.data.message}`, { position: "top-left" , autoClose:1500 });
        setShow(false);
        getstory();
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, { position: "top-left" , autoClose:1500 });
    }
  };
  const storyView = async () => {
    const req = await api.post(`/orbit/storyview/${data?._id}`, {
      user: user._id,
    });
    setView(req.data.views);
  };
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressContent.current) {
      progressContent.current.style.width = `${(1 - progress) * 100}%`;
    }
  };
  const onSlideChange = () => {
    if (progressContent.current) {
      progressContent.current.style.width = "0%";
    }
  };
  return (
    <div className="shrink-0 text-white">
      <img
        onClick={() => {
          storyView();
          setShow(!show);
        }}
        className={`${
          view.includes(user._id) ? " border-gray-500" : "border-blue-500"
        } md:h-20 md:w-20 border-4  h-15 w-15 rounded-full object-cover`}
        src={data?.user.profilePicture.url}
        alt=""
      />
      {/* main */}
      <div
        className={`${
          show ? "fixed inset-0 z-50" : "hidden"
        }   bg-black/80  w-full `}
      >
        <div className={`p-2 flex items-center h-screen justify-center`}>
          <div className="max-w-2xl w-full min-h-1/4 p-2 bg-linear-to-b from-teal-800 to-zinc-950 rounded-lg shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between">
              <div
                onClick={() =>
                  navigate(`/orbit/profile/${data?.user.username}`)
                }
                className="cursor-pointer flex items-center gap-2"
              >
                <img
                  className="h-10 border-2 border-white w-10 rounded-full object-cover"
                  src={data?.user.profilePicture.url}
                  alt=""
                />
                <h1 className="text-2xl">{data?.user.username}</h1>
                <h1 className="text-xs text-gray-300 flex items-center ">
                  {timeAgo(data?.createdAt)}
                </h1>
              </div>
              <RxCross1
                onClick={() => setShow(!show)}
                className="text-3xl hover:scale-120 duration-300 hover:animate-spin"
              ></RxCross1>
            </div>
            <div
              className={`${
                data?.length > 1 ? "block" : "hidden"
              }  autoplay-progress h-1 bg-linear-to-r  from-[#0040ff]  via-[#ff00c3] to-[#00ffdd] rounded-full transition-all duration-100`}
              style={{ width: "0%" }}
              ref={progressContent}
            ></div>
            <div>
              {show && (
                <Swiper
                  spaceBetween={30}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  onAutoplayTimeLeft={onAutoplayTimeLeft}
                  onSlideChange={onSlideChange}
                >
                  {data?.image.map((e) => (
                    <SwiperSlide key={e._id}>
                      <img
                        key={e._id}
                        className="w-full h-full object-cover"
                        src={e.url}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="text-center md:text-xl text-xl">
              {data?.caption}
            </div>
            {data?.user._id === user._id && (
              <div className="flex justify-end">
                <button
                  onDoubleClick={handledelete}
                  className="text-2xl hover:scale-110 duration-300"
                >
                  {" "}
                  <MdDelete></MdDelete>{" "}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
