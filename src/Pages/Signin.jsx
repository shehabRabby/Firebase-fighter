import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaFacebook } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import userImage from "../assets/user.jpg"; // Your uploaded image
import { Link } from "react-router";
import { IoEyeOff } from "react-icons/io5";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();




const Signin = () => {
   const [show,setShow] = useState(false); //state for hide password 
   const [user,setUser] = useState(null); //user set local storage



   const handleSignin =(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log("Signup function enter :",email,password );

    signInWithEmailAndPassword(auth,email,password)
    .then((res) => {
      console.log(res);
      setUser(res.user);
      toast.success("Sign in Successfull")
    })
    .catch((e) => {
      console.log(e)
      toast.error(error.message);
    })
   } 


   const handleSignout =()=>{
    signOut(auth)
    .then((res)=>{
      toast.success("SignOut Successfull");
      setUser(null);
    })
    .catch((e)=>{
      console.log(e);
      toast.error(e.message);
    })
   }


  //fgoogle sign in here 
   const handleGoogleSignIn =()=>{
    signInWithPopup(auth,googleProvider)
    .then((res)=>{
      setUser(res.user);
      toast.success("Google Sign In Successfull");
    })
    .catch((e)=>{
      console.log(e);
      toast.error(e.message);
    })
   }






 


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

          {user ? (
            <div className="text-center space-y-3">
              <img src={ user?.photoURL || logo} alt="" className="h-20 w-20 rounded-full mx-auto p-2" />
              <h2 className="text-xl font-semibold">{user?.displayName}</h2>
              <h2 className="text-white/80">{user?.email}</h2>
              <button className="btn border bg-gradient-to-r from-fuchsia-200 via-pink-500 to-purple-100 flex items-center gap-2  hover:bg-gray-100 w-full" onClick={handleSignout} >Sign Out</button>

            </div>

          ):(
            <form onSubmit={handleSignin} className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold text-center mb-4 text-white">Login</h2>
               {/* email  */}
               <div>
                 <label htmlFor="">Email</label>
                 <input type="email" name="email" placeholder="Email" className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-pink-500 text-black"/>
               </div>
   
               {/* password  */}
               <div className="relative">{/* password  */}
                 <label htmlFor="">Password</label>
                 <input type={show ? "text":"password"} name="password" placeholder="Enter Password" className="w-full p-3 rounded-md bg-white text-gray-400 focus:outline-none"/>
                 {/* eye icon*/}    
                 <span onClick={()=>{setShow(!show)}} className="absolute right-[8px] top-[40px] cursor-pointer">{show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}</span>
               </div>
   
               <div className="text-right">
                 <a className="text-sm text-white/80 hover:underline font-medium"> Forgot password?</a>
               </div>
   
               <button type="submit" className="btn bg-white/30 hover:bg-white/50 text-white font-semibold w-full mt-2">
                 Login
               </button>
   
               <div className="divider text-white">or</div>


               {/* google sign in button */}
               <button onClick={handleGoogleSignIn} className="btn border text-gray-700 flex items-center gap-2 hover:bg-gray-100 w-full">
                 <FcGoogle className="text-xl" /> Sign in with Google
               </button>
   
               <button className="btn border text-gray-700 flex items-center gap-2 hover:bg-gray-100 w-full">
                 <FaFacebook className="text-blue-600 text-xl" /> Sign in with Facebook
               </button>
   
               <p className="text-center text-sm text-white mt-3">
                 New user? <Link to="/signup" className="font-bold hover:underline">Sign Up</Link>
               </p>
          </form>
          )}


        </div>
      </div>
    </div>
  );
};

export default Signin;
