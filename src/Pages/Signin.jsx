import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import userImage from "../assets/user.jpg"; // Your uploaded image
import { Link } from "react-router";

const Signin = () => {


  return (
    <div className="min-h-screen bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600 flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
        
        {/* Left Section with Image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-white/20">
          <img
            src={userImage}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-white mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-center text-white/90">
            Sign in to continue your journey. Manage your account and explore new features.
          </p>
        </div>

        {/* Right Section (Login Card) */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-gradient-to-br from-fuchsia-500 via-pink-400 to-purple-400 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">
            Login
          </h2>

          <form className="flex flex-col gap-3">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-pink-500 text-black"
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-pink-500 text-black"
            />

            <div className="text-right">
              <a className="text-sm text-white/80 hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn bg-white/30 hover:bg-white/50 text-white font-semibold w-full mt-2"
            >
              Login
            </button>

            <div className="divider text-white">or</div>

            <button className="btn border text-gray-700 flex items-center gap-2 hover:bg-gray-100 w-full">
              <FcGoogle className="text-xl" /> Sign in with Google
            </button>

            <button className="btn border text-gray-700 flex items-center gap-2 hover:bg-gray-100 w-full">
              <FaFacebook className="text-blue-600 text-xl" /> Sign in with Facebook
            </button>

            <p className="text-center text-sm text-white mt-3">
              New user? <Link to="/signup" className="font-bold hover:underline">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
