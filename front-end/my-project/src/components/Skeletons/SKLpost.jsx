import React, { useState, useRef } from "react";

function SKLpost() {
  return (
    <div className="rounded-xl flex flex-col  gap-2 p-4 h-100  md:h-120 shadow-2xl">
      {/* upper */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className=" w-10 bg-gray-200 h-10 rounded-full "></div>
          <div className="flex flex-col gap-2">
            <h1 className="w-30 rounded-2xl h-2 bg-gray-200"></h1>
            <h1 className="w-25 h-2 rounded-2xl bg-gray-200"></h1>
          </div>
        </div>
        <h1 className="h-5 w-20 rounded-2xl bg-gray-200"></h1>
      </div>
      {/* middle */}
      <div className="h-100 w-full bg-gray-200 rounded-xl"></div>
      {/* lower */}
      <div className="flex justify-between">
        <div  className="flex gap-2">
            <h1 className="h-7 w-7 rounded-full  bg-gray-200"></h1>
            <h1 className="h-7 w-7 rounded-full  bg-gray-200"></h1>
        </div>
        <div className="flex gap-2">
            <h1 className="h-7 w-7 rounded-full bg-gray-200"></h1>
            <h1 className="h-7 w-7 rounded-full bg-gray-200"></h1>
        </div>
      </div>
      <h1 className="w-20 h-4 bg-gray-200 rounded-2xl"></h1>
      <h1 className="w-full h-4 bg-gray-200 rounded-2xl"></h1>
    </div>
  );
}

export default SKLpost;
