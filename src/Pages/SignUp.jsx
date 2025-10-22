import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";

const SignUp = () => {

  const [show,setShow] = useState(false); //state for hide password 
  const {createUserWithEmailAndPasswordFunc,
         sendEmailVerificationFunc,
         updateProfileFunc} = useContext(AuthContext);


  
  const handleSignup=(e)=>{
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log("Signup function enter :",name,photo,email,password);
    

    //password validation use regex
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    // if(!passwordRegex.test(password)){
    //   toast.error("Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.");
    //   return;
    // }
      
    //create user here 
    createUserWithEmailAndPasswordFunc(email,password)
    .then((res) => {
      //update profile
      updateProfileFunc(displayName,photoURL)
      .then(()=>{
        //email verification
        sendEmailVerificationFunc()
        .then(()=>{
          console.log(res);
        toast.success("Signup Successfull, Check you email to validate your account");
        })
        .catch((e)=>{
        toast.error(e.message)
      })
      })
      .catch((e)=>{
        toast.error(e.message)
      })
      console.log(res);
      toast.success("Signup Successfull");
    })
    .catch((e) =>{
      console.log(e.code)
          if (!e.code) {
           toast.error("An unexpected error occurred.");
           return;
          }

         if (e.code === "auth/email-already-in-use") {
           toast.error("⚠️ This email is already registered. Try logging in instead.");
         } 
         else if (e.code === "auth/invalid-email") {
           toast.error("🚫 Invalid email format. Please check and try again.");
         } 
         else if (e.code === "auth/operation-not-allowed") {
           toast.error("❌ This authentication method is disabled. Contact support.");
         } 
         else if (e.code === "auth/weak-password") {
           toast.error("🔒 Password must be at least 6 characters long.");
         } 
         else if (e.code === "auth/missing-password") {
           toast.error("🔑 Please enter your password.");
         } 
         else if (e.code === "auth/user-disabled") {
           toast.error("🚷 This account has been disabled by an admin.");
         } 
         else if (e.code === "auth/user-not-found") {
           toast.error("😕 No account found with this email.");
         } 
         else if (e.code === "auth/wrong-password") {
           toast.error("❌ Incorrect password. Try again.");
         } 
         else if (e.code === "auth/too-many-requests") {
           toast.error("😤 Too many attempts. Try again later.");
         } 
         else if (e.code === "auth/network-request-failed") {
           toast.error("🌐 Network error. Please check your connection.");
         } 
         else if (e.code === "auth/internal-error") {
           toast.error("💥 Internal error. Please try again later.");
         } 
         else if (e.code === "auth/missing-email") {
           toast.error("📧 Email is required.");
         } 
         else if (e.code === "auth/invalid-credential") {
           toast.error("🚫 Invalid login credentials.");
         } 
         else if (e.code === "auth/popup-closed-by-user") {
           toast.error("👋 Sign-in popup closed before completion.");
         } 
         else {
           toast.error(`⚠️ ${e.message || "Something went wrong. Please try again."}`);
         }
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

             <div>{/* Name  */}
              <label htmlFor="">Name</label>
              <input type="text" name="name" placeholder="Enter name here" className="w-full p-3 rounded-md bg-white text-gray-400  focus:outline-none"/>
            </div>


             <div>{/* Profile Photo */}
              <label htmlFor="">Photo</label>
              <input type="text" name="photo" placeholder="Photo URL here" className="w-full p-3 rounded-md bg-white text-gray-400  focus:outline-none"/>
            </div>

            <div>{/* email  */}
              <label htmlFor="">Email</label>
              <input type="email" name="email" placeholder="Enter email here" className="w-full p-3 rounded-md bg-white text-gray-400  focus:outline-none"/>
            </div>


            <div className="relative">{/* password  */}
              <label htmlFor="">Password</label>
              <input type={show ? "text":"password"} name="password" placeholder="Enter Password" className="w-full p-3 rounded-md bg-white text-gray-400 focus:outline-none"/>
              {/* eye icon*/}    
              <span onClick={()=>{setShow(!show)}} className="absolute right-[8px] top-[40px] cursor-pointer">{show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}</span>
            </div>


            <div className="text-right">{/*Forget password  */}
              <a href="#" className="text-white text-sm hover:underline opacity-90">Forgot password?</a>
            </div>
            
            {/* signUp Button */}
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
