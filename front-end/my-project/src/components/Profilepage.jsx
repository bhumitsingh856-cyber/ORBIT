import React, { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import Posts from "./Posts";
import { useAuth } from "../context/context";
import { useNavigate } from "react-router-dom";
import Userslist from "./Userslist";
import { FaEdit } from "react-icons/fa";
import nopost from "../assets/nopost.svg";
const Profilepage = ({
  data,
  post,
  setPost,
  handledelete,
  handlelike,
  handlefollow,
  followers,
  getfollowers,
  getfollowings,
  followings,
  handlemessage,
}) => {
  useEffect(() => {
    getfollowers(data?.username);
    getfollowings(data?.username);
  }, [data?.username, data?.followers]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [what, setWhat] = useState({});
  const [title, setTitle] = useState("");
  return (
    <div className="flex flex-col w-full gap-4 ">
      <Userslist
        show={show}
        what={what}
        setShow={setShow}
        title={title}
        handlefollow={handlefollow}
      ></Userslist>
      <div>
        <div
          style={{ backgroundImage: `url(${data?.profilePicture.url})` }}
          className={`text-white bg-center bg-blur rounded-b-xl md:mt-0.5 shadow-2xl p-2`}
        >
          <div className="flex backdrop-blur-3xl p-1 rounded-b-xl flex-col ">
            <div className="flex md:gap-10 gap-5 ">
              <img
                className=" w-25 border-2 h-25 md:w-30 md:h-30 object-cover rounded-full"
                src={data?.profilePicture.url}
                alt="Profilepage"
              />
              <div className="flex flex-col gap-2 w-full md:gap-3">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h1 className="mg:text-4xl text-2xl">{data?.user}</h1>
                    <h3 className="text-xl text-gray-300">{data?.username}</h3>
                  </div>
                  <div className="p-2 text-xs text-end px-4">
                    <h1>
                      Joined -
                      {new Date(data?.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </h1>
                    {/* <h1  >Age - {data?.age}</h1> */}
                  </div>
                </div>
                <div className="flex text-xs font-semibold md:text-[15px] gap-6">
                  <button className="cursor-pointer hover:scale-105 duration-150">
                    <span>
                      {post?.length}
                      <h1>Posts</h1>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setWhat(followers);
                      setTitle("Followers");
                      setShow(true);
                    }}
                    className="cursor-pointer hover:scale-105 duration-150"
                  >
                    <span>
                      {data?.followers.length}
                      <h1>Followers</h1>
                    </span>
                  </button>
                  <button
                    className="cursor-pointer hover:scale-105 duration-150"
                    onClick={() => {
                      setWhat(followings);
                      setTitle("Followings");
                      setShow(true);
                    }}
                  >
                    <span>
                      {data?.followings.length}
                      <h1>Followings</h1>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 text-xs  font-light md:text-[15px]">
              <h1 className=" ">Bio </h1>
              <pre className="whitespace-pre-wrap">{data?.bio}</pre>
            </div>
            {data?.username !== user.username ? (
              <div className="flex gap-8">
                <button
                  onClick={() => handlefollow(data?._id)}
                  className={`cursor-pointer ${
                    data?.followers.includes(user._id)
                      ? " from-yellow-950  to-black text-white"
                      : "from-red-300 to-teal-200 via-yellow-200 text-black bg-white"
                  } bg-linear-to-r hover:scale-101 duration-300 rounded-xl w-full p-2`}
                >
                  {data?.followers.includes(user._id) ? (
                    <h1>Unfollow</h1>
                  ) : (
                    <h1>Follow</h1>
                  )}
                </button>
                <button
                  onClick={() =>{ handlemessage(data._id); navigate("/orbit/messages")}}
                  className="bg-linear-to-r cursor-pointer hover:scale-101 duration-300 from-yellow-950  to-black text-white    rounded-xl w-full p-2"
                >
                  Message
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() =>
                    navigate("/orbit/editprofilepage", { state: { data } })
                  }
                  className="flex items-center justify-center gap-2 bg-linear-to-r from-white font-bold  to-teal-900 via-teal-500 cursor-pointer hover:scale-98 duration-300 text-black rounded-xl w-full p-2"
                >
                  Edit Profilepage <FaEdit></FaEdit>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="font-bold text-xl text-center">Posts</div>
      </div>
      <div className="flex flex-col ">
        {post?.length > 0 ? (
          post?.map((posts) => (
            <Posts
              key={posts._id}
              data={posts}
              setPosts={setPost}
              deletepost={handledelete}
              likepost={handlelike}
            ></Posts>
          ))
        ) : (
          <img src={nopost} alt="" />
        )}
      </div>
    </div>
  );
};

export default Profilepage;
