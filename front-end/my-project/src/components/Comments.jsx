import React from "react";
import { useAuth } from "../context/context";
import api from "../service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
const Comments = ({ show, setShow, comments, _id, setPosts }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const postComment = async (postId) => {
    if (!comment.trim()) return;

    try {
      const res = await api.post(`/orbit/posts/comment/${postId}`, { comment });

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, comments: res.data.comments } : post
        )
      );

      setComment("");
    } catch (err) {
      console.error(err);
    }
  };
  const deletecomment = async (commentid) => {
    console.log(commentid)
    try {
      const res = await api.delete(
        `/orbit/posts/deletecomment/${_id}/${commentid}`
      );
      setPosts((prev) =>
        prev.map((post) =>
          post._id === _id ? { ...post, comments: res.data.comments } : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  function timeAgo(date) {
    const diff = Date.now() - new Date(date);
    const min = Math.floor(diff / 60000);
    if (min < 1) return "just now";
    if (min < 60) return `${min} min ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hr ago`;
    const day = Math.floor(hr / 24);
    return `${day} day ago`;
  }

  return (
    <div
      className={`${
        show ? "bg-black/80" : "hidden"
      } fixed inset-0 h-screen z-50 w-full `}
    >
      <div className="max-w-lg bg-white  relative h-screen p-4 mx-auto rounded-xl ">
        <button
          onClick={() => setShow(false)}
          className="absolute right-0 top-0 text-4xl hover:animate-spin pr-2"
        >
          x
        </button>
        <h1 className="text-2xl font-semibold text-center">Comments</h1>
        <div className="overflow-y-auto flex flex-col gap-2 h-screen pb-30">
          {/* card */}
          {comments?.map((e) => (
            <div key={e._id} className=" rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 object-cover rounded-full"
                  src={e.user.profilePicture?.url}
                  alt="profilepic"
                />
                <div
                  onClick={() => navigate(`/orbit/profile/${e.user.username}`)}
                  className="flex w-full cursor-pointer  flex-col gap-0.5"
                >
                  <h1>
                    {e.user.username} 
                    {e.user.username === user.username && (
                      <small className=" text-gray-500">(you)</small>
                    )}
                  </h1>
                  <h1 className="text-xs text-gray-600">{e.user.user}</h1>
                </div>
                <h1 className="text-sm w-full text-end">{timeAgo(e.createdAt)}</h1>
                {e.user.username === user.username && (
                  <button onDoubleClick={() => deletecomment(e._id)}>
                    <MdDelete className="hover:animate-pulse hover:scale-110 duration-300 text-xl"/>
                  </button>
                )}
              </div>
              <div className="p-2">{e.content}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 bg-white sticky bottom-0 py-2 items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user?.profilepic.url}
            alt=""
          />
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write comment here"
            className="border-2 w-full focus:scale-102 focus:outline-none focus:ring-2 ring-blue-500 duration-300 border-gray-400  outline-0 rounded-4xl p-2"
          />
          <button
            onClick={() => postComment(_id)}
            className=" rounded-full p-2 bg-linear-to-r shadow-[0_0_5px_black] from-green-500  to-black hover:scale-95 duration-300 text-white "
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
