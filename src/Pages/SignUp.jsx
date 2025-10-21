import React from "react";
import { Link } from "react-router";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  
  const handleSignup=(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Signup function enter :",email,password );

    createUserWithEmailAndPassword(auth,email,password)
    .then((res) => {
      console.log(res);
      toast.success("Signup Successfull");
    })
    .catch((e) =>{
      console.log(e)
      toast.error(e.message)
    })









  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 p-4">
      <div className="flex flex-col lg:flex-row bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center text-center text-white p-10 lg:w-1/2 bg-gradient-to-r from-pink-500 to-purple-500">
          <div className="bg-white p-6 rounded-full mb-6">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User Icon" className="w-20 h-20"/>
          </div>
          <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2"> Welcome Back <span className="animate-wave">👋</span></h2>
          <p className="text-lg opacity-90 max-w-sm">Sign in to continue your journey. Manage your account and explore new features.</p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Sign Up</h2>
         
         {/* from  */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>{/* email  */}
              <input type="email" name="email" placeholder="Email" className="w-full p-3 rounded-md bg-white text-black focus:outline-none"/>
            </div>
            <div>{/* password  */}
              <input type="password" name="password" placeholder="Password" className="w-full p-3 rounded-md bg-white text-black focus:outline-none"/>
            </div>
            <div className="text-right">{/*Forget password  */}
              <a href="#" className="text-white text-sm hover:underline opacity-90">Forgot password?</a>
            </div>{/* signUp Button */}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition">
              Sign Up
            </button>
            <div className="flex items-center my-3">
              <hr className="flex-grow border-white/30" />
              <span className="text-white mx-2 text-sm">or</span>
              <hr className="flex-grow border-white/30" />
            </div>
            <p className="text-center text-white mt-4">Already have an account?{" "}<Link to="/signin" className="font-semibold hover:underline"> Sign In</Link></p>
          </form>
          


        </div>
      </div>
    </div>
    
  );
};

export default SignUp;
