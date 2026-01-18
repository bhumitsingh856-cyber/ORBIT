import React from "react";
import {lazy,Suspense} from "react"
const Tdmodel=lazy(()=>import( "../components/Tdmodel"))
import { motion } from "framer-motion"; 
const Home = () => {
  return (
    <div id="font" className="w-fit">
      <Suspense>
      <Tdmodel></Tdmodel>
      </Suspense>
      <div className="flex  flex-col ">
        <motion.div
          initial={{ x: -200, y: -200, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{}}
          className="flex backdrop-blur-[5px]  rounded-br-[200px]"
        >
          <div>
            <motion.h1
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              whileHover={{
                x: [0, -5, 5, -2, 2, 0],
                y: [0, -5, 5, -2, 2, , 0],
                transition: { duration: 0.4 },
              }}
              transition={{ delay: 1, ease: "easeInOut" }}
              className="text-[15em]  text-transparent bg-clip-text  bg-linear-to-r from-red-500  via-[#ffc800] to-[#ff0000]"
            >
              ()
            </motion.h1>
          </div>
          <div>
            <div className="flex">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                whileHover={{
                  x: [0, -5, 5, -2, 2, 0],
                  y: [0, -5, 5, -2, 2, , 0],
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-[200px] text-transparent bg-clip-text  bg-linear-to-r from-yellow-500  via-[#ff0000] to-[#fbff00]"
              >
                R
              </motion.h1>
              <motion.h1
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                whileHover={{
                  x: [0, -5, 5, -2, 2, 0],
                  y: [0, -5, 5, -2, 2, , 0],
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-[200px] text-transparent bg-clip-text  bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd]"
              >
                B
              </motion.h1>
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                whileHover={{
                  x: [0, -5, 5, -2, 2, 0],
                  y: [0, -5, 5, -2, 2, , 0],
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-[200px] text-transparent bg-clip-text  bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd]"
              >
                I
              </motion.h1>
              <motion.h1
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                whileHover={{
                  x: [0, -5, 5, -2, 2, 0],
                  y: [0, -5, 5, -2, 2, , 0],
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-[200px] text-transparent bg-clip-text  bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd]"
              >
                T
              </motion.h1>
            </div>
            <div className="text-center text-xl mt-[-50px] ">
              <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  x: [0, -5, 5, -2, 2, 0],
                  y: [0, -5, 5, -2, 2, , 0],
                }}
                transition={{ delay: 1, duration: 0.4, ease: "easeInOut" }}
                className=" text-transparent bg-clip-text bg-linear-to-r font-bold from-[#ff6600] via-[#00ffbb] to-[#0d00ff]"
              >
                Connect Beyond Limits
              </motion.h1>
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center">
          <motion.a
             
            className="before:absolute before:  before:left-0 before:w-0 hover:before:w-full before:h-full before:bottom-0  before:bg-linear-to-r before:duration-300 rounded-[5px] before:from-red-500  before:via-[#ffea00] before:to-[#00ffdd] before:rounded-[5px] backdrop-blur-[5px]  mt-4  hover:scale-105 duration-300 font-bold  to-red  shadow-[0_0_10px_orange] hover:shadow-[0_0_50px_yellow]    w-fit text-white p-6 text-4xl  "
            href="/auth/login"
          >
            <h1
              whileHover={{
                x: [0, -5, 5, -2, 2, 0],
                y: [0, -5, 5, -2, 2, , 0],
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="z-10 relative"
            >
              Start Your Orbit
            </h1>
            
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Home;
