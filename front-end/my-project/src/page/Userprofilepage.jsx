import React from "react";
import Profilepage from "../components/Profilepage";
import api from "../service/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/context";
import { useParams } from "react-router-dom";
const Userprofilepage = () => {
  const { user } = useAuth();
  const params = useParams();
  const [userdata, setUserdata] = useState([]);
  const [userpost, setUserpost] = useState([]);
  const [followers,setFollowers]=useState([])
  const [followings,setFollowings]=useState([])
  const getfollowers=async(username)=>{
    try {
      const req=await api.get(`/orbit/getfollowers/${username}`) 
      if(req.data.success){
        setFollowers(req.data.user.followers);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const getfollowings=async(username)=>{
    try {
      const req=await api.get(`/orbit/getfollowings/${username}`)
      if(req.data.success){
        setFollowings(req.data.user.followings);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  const data = async () => {
    if (params.username) {
      const req = await api.get(`/orbit/getprofile/${params.username}`);
      setUserdata(req.data.user);
      setUserpost(req.data.post.reverse());
    } else {
      try {
        const req = await api.get("/orbit/getprofile");
        setUserdata(req.data.user);
        setUserpost(req.data.post.reverse());
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlefollow = async (id) => {
    try {
      const req = await api.put(`/orbit/getprofile/follow/${id}`,{who:user._id});
      const {followers} = req.data;
      
      if (req.data.success) { 
        setUserdata(prev=>({...prev,followers:followers}))
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handledelete = async (id) => {
    const req = await api.delete(`/orbit/deletepost/${id}`);
    if (req.data.success) {
      toast.success(`${req.data.message}`);
      setUserpost(userpost.filter((post) => post._id !== id));
    } else {
      toast.error(`${req.data.message}`);
    }
  };
  const handlelike = async (id) => {
    const req = await api.get(`/orbit/likepost/${id}`);
    const { likes } = req.data;
    if (req.data.success) {
      setUserpost(
        userpost.map((post) => (post._id === id ? { ...post, likes } : post))
      );
    }
  };
  const handlemessage = async (id) => {
    try{
      const req=await api.get(`/orbit/message/${id}`);
      console.log(req.data);
    }
    catch(err){
      console.log(err);
    }

  };
  useEffect(() => {
    data();
  }, [params.username]);
  return (
    <div className="max-w-3xl col-span-2">
      {userdata?.user && (
        <Profilepage
          handlemessage={handlemessage}
          data={userdata}
          handledelete={handledelete}
          handlelike={handlelike}
          handlefollow={handlefollow}
          post={userpost}
          setPost={setUserpost}
          getfollowers={getfollowers}
          getfollowings={getfollowings}
          followers={followers}
          followings={followings}
        />
      )}
    </div>
  );
};

export default Userprofilepage;
