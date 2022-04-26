import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const Nav = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div class="h-20 bg-blue-500 flex items-center justify-between opacity-75 ">
      {/* <div class=" ml-8">
        <Link to="/">
          <img src={logo} class="h-14" alt="" />
        </Link>
      </div> */}
      <Link to="/">
        <button class="h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline ml-6">
          Home
        </button>
      </Link>

      <Link to="/leaderboard">
        <button class="h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline ml-6">
          Leaderboard
        </button>
      </Link>

      {isLoggedIn ? (
        <div class="flex  flex-row mr-10">
          <Link to={`/profile/${user.username}`} class="flex">
            <h2 class="flex text-lg ml-2 mr-4 mt-2 text-white">{user.name}</h2>
          </Link>
          <button
            onClick={handleLogout}
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline ml-6"
          >
            Logout
          </button>
        </div>
      ) : (
        <div class="flex flex-row mr-10">
          <Link to="/login">
            <button class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6">
              SignUp
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
