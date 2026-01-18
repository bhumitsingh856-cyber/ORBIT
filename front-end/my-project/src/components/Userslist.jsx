import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context";
const Userslist = ({ show, setShow, what, title, handlefollow }) => {
  const { user } = useAuth();
  const navigate = useNavigate(); 
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } inset-0 bg-zinc-700/70 shadow-2xl fixed z-50 `}
    >
      <div className=" absolute right-0  backdrop-blur-3xl rounded-bl-4xl md:rounded-xl">
        <RxCross1
          onClick={() => setShow(!show)}
          className="text-6xl md:text-white text-zinc-700 cursor-pointer  m-2  rounded-full hover:scale-110 duration-150 text-shadow-2xs"
        ></RxCross1>
      </div>
      <div
        className={` bg-white z-30 rounded-2xl max-w-lg bg-linear-to-r from-sky-100 to-white mx-auto flex flex-col overflow-y-auto gap-1 h-screen p-4`}
      >
        <h1 className="text-center text-4xl ">{title}</h1>
        {what && what.length > 0 ? (
          what?.map((e) => (
            <div
              key={e._id}
              className="flex justify-between items-center rounded-xl p-2  shadow-2xl   hover:scale-99 duration-150 px-4"
            >
              <div className="flex gap-4">
                <img
                  className="md:h-15 border-2 border-white md:w-15 h-12 w-12  rounded-full object-cover"
                  src={e.profilePicture.url}
                  alt=""
                />
                <div className="">
                  <h1
                    onClick={() => {
                      setShow(!show);
                      navigate(`/orbit/profile/${e.username}`);
                    }}
                    className="md:text-2xl cursor-pointer text-xl"
                  >
                    {e.username}
                  </h1>
                  <h1 className="text-xs md:text-[16px]">{e.user}</h1>
                </div>
              </div>
              <button
                onClick={() => {
                  setShow(!show);
                  navigate(`/orbit/profile/${e.username}`);
                }}
                className="bg-linear-to-r from-teal-500 to-black text-white hover:scale-105 border-gray-400 border duration-300 shadow-2xl   font-bold cursor-pointer rounded-4xl px-4 py-3 text-xs md:text-xl h-fit"
              >
                View profile
              </button>
              {/* {e.username!==user.username ?
              <button
               onClick={()=>handlefollow(e._id)}
                className="bg-zinc-700 text-white font-bold rounded-4xl px-4 py-3 text-xs md:text-xl h-fit"
                >
                 {e.followers && e.followers.includes(user._id) ? "Unfollow" : "Follow"} 
              </button>
              : " "
          } */}
            </div>
          ))
        ) : (
          <div className="text-2xl text-center p-4 ">No {title} yet</div>
        )}
      </div>
    </div>
  );
};

export default Userslist;
