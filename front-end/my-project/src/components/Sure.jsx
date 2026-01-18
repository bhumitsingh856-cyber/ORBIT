import React ,{useState} from "react";
import { useNavigate} from "react-router-dom";

const Sure = ({ cnf, showcnf ,setShowcnf ,title}) => { 
  const navigate=useNavigate() 
  return (
    <div className={` ${showcnf ? "flex" : "hidden"} bg-zinc-700/70 inset-0 fixed z-[60]  justify-center`}>
      <div className="flex  justify-center flex-col md:p-8 p-4 rounded-b-4xl mt-1 border-2 border-white text-white backdrop-blur-2xl h-fit items-center gap-8">
        <h1 className="md:text-6xl text-5xl text-center">Are you sure?</h1>
        <h1 className="text-xl">{title}</h1>
        <div className="flex w-full justify-between gap-4">
          <button
           onClick={async()=>{await cnf();  navigate("/auth/login")}}
            className="bg-linear-to-br shadow-[0_0_5px_black] from-green-500  to-green-900 w-full  rounded-xl hover:scale-95 duration-300 text-white p-4"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setShowcnf(false)
            }}
            className={` bg-linear-to-bl shadow-[0_0_5px_black] from-red-500 to-red-900 w-full   rounded-xl hover:scale-95 duration-300 text-white p-4`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sure;
