import React, { useState, useEffect, lazy, Suspense } from "react";
const Posts = lazy(() => import("../components/Posts"));
import api from "../service/api";
import { toast } from "react-toastify";
import Story from "../components/Story.jsx";
import { motion } from "motion/react";
import CreateStory from "../components/CreateStory.jsx";
import SKLpost from "../components/Skeletons/SKLpost.jsx";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import nopost from "../assets/nopost.png";
import { useAuth } from "../context/context";
const PostPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [story, setStory] = useState([]);
  const [show, setShow] = useState(false);
  const handledelete = async (id) => {
    const req = await api.delete(`/orbit/deletepost/${id}`);
    if (req.data.success) {
      toast.success(`${req.data.message}`);
      setPosts(posts.filter((post) => post._id !== id));
    } else {
      toast.error(`${req.data.message}`);
    }
  };
  const handlelike = async (id) => {
    const req = await api.get(`/orbit/likepost/${id}`);
    const { likes } = req.data;
    if (req.data.success) {
      setPosts(
        posts.map((post) => (post._id === id ? { ...post, likes } : post))
      );
    }
  };
  const data = async () => {
    toast.loading("Fetching Posts...");
    try {
      const req = await api.get("/orbit/getposts");
      toast.dismiss();
      setPosts(req.data);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch Posts");
    }
  };
  const getstory = async () => {
    try {
      const req = await api.get("/orbit/getstory");
      setStory(req.data);
      if (req.data.success) {
        setStory(req.data.stories);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data();
    getstory();
  }, []);
  return (
    <div>
      <div className="flex gap-2 p-2 overflow-x-auto">
        <div className="relative" onClick={() => setShow(!show)}>
          <img
            className="md:h-20 border-4 hover:scale-98 duration-100 md:w-20 h-15 w-15 rounded-full object-cover"
            src={user.profilepic.url}
            alt=""
          />
          <h1 className="absolute text-4xl bg-black/30 w-full flex items-center justify-center font-extralight h-full rounded-full text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            +
          </h1>
        </div>
        <CreateStory
          show={show}
          setShow={setShow}
          getstory={getstory}
        ></CreateStory>

        {story?.length > 0 &&
          story?.map((e) => <Story key={e._id} getstory={getstory} data={e}></Story>)}
      </div>
      {posts?.length > 0 ? (
        posts?.map((post) => (
          <Suspense
            key={post._id}
            fallback={
              <div>
                <SKLpost></SKLpost>
              </div>
            }
          >
            <Posts
              data={post}
              setPosts={setPosts}
              deletepost={handledelete}
              likepost={handlelike}
            ></Posts>
          </Suspense>
        ))
      ) : (
        <img className="mx-auto" src={nopost} alt="" />
      )}
    </div>
  );
};

export default PostPage;
