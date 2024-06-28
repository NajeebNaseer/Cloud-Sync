import React from "react";
import LOGO from "./LogoNew.png";

function Header({ userName, userImage }) {
  let name = userName || localStorage.getItem("name");


  return (
    <div className="bg-white text-gray-800 px-4 sm:px-5 flex justify-between items-center">
      <img src={LOGO} alt="Logo" className=" h-8  sm:h-16 w-auto" />
      <div
        title="90 Days Recheck Plan"
        className="hidden md:block text-xl sm:text-2xl md:text-4xl text-gray-800 font-bold truncate max-w-[40%]"
      >
        90 Days Recheck Plan
      </div>

      <div className="flex items-center space-x-3">
        <h1 className="text-base sm:text-lg capitalize font-bold truncate max-w-[100px] sm:max-w-none">
          {name}
        </h1>

        {userImage ? (
          <img
            src={userImage}
            alt="User"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#00c19c] flex items-center justify-center">
            <span className="text-lg sm:text-xl font-semibold capitalize text-white">
              {name ? name[0] : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
