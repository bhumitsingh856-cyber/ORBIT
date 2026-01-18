import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../context/context";
import { MdLogout } from "react-icons/md";
import Sure from "./Sure";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [title, setTitle] = useState("");
  const [showcnf, setShowcnf] = useState(false);
  return (
    <>
      <div className="fixed bg-linear-to-r from-[#0040ff]  via-[#ff00c3] to-[#00ffdd] pb-1 z-50 md:hidden w-full top-0">
         <Sure  cnf={logout} showcnf={showcnf} setShowcnf={setShowcnf} title={title}></Sure>
        <nav className=" text-3xl bg-white  list-none flex items-center justify-between px-1 ">
          <li className="flex items-center">
            <img
              className="w-7 h-7 object-cover   rounded-full"
              src="/src/assets/orbit.png"
              alt=""
            />
            <span className=" font-bold items-center  text-transparent bg-clip-text  bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd]">
              RBIT
            </span>
          </li>
          <li className="text-xl">{user.username}</li>
          <div
            onClick={() => {
              setTitle("Log-Out");
              setShowcnf(!showcnf);
            }}
            className="flex  p-2 font-bold items-center text-[15px]"
          >
            Log-out
            <MdLogout className="text-2xl" />
          </div>
        </nav>
      </div>
      <div className="fixed z-50 bg-linear-to-r from-[#0040ff]  via-[#ff00c3] pt-1 rounded-2xl to-[#00ffdd] bottom-0 md:hidden w-full">
        <nav className="bg-white  text-3xl rounded-t-2xl p-2 list-none flex justify-evenly ">
          <li className="cursor-pointer">
            <Link to="/orbit/postpage">
              <FaHome />
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/orbit/searchpage">
              <CiSearch />
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/orbit/createpost">
              <IoIosAddCircleOutline />
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/orbit/messages">
              <IoIosChatboxes />
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/orbit/userprofilepage">
              <img
                className="h-6 object-cover rounded-full w-6"
                src={user?.profilepic.url}
                alt="dp"
              />
            </Link>
          </li>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
