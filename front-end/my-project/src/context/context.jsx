import { createContext, useContext, useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logout=async()=>{
    // const navigate=useNavigate();
    try {
      await api.get("/auth/logout");
    } catch (err) {
      console.log(err);
    }
  }
  const userdata = async () => {
    try {
      const req = await api.get("/auth/getuser");
      const data={
        _id:req.data._id,
        user: req.data.user,
        username: req.data.username,
        joined: req.data.createdAt,
        profilepic: req.data.profilePicture,
      }
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userdata();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser,userdata, loading ,logout,update:userdata}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context=useContext(AuthContext);
  return context;
};
