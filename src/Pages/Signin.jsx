import React, { use, useContext, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaFacebook, FaGit } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import userImage from "../assets/user.jpg"; // Your uploaded image
import { Link, useLocation, useNavigate } from "react-router";
import { IoEyeOff } from "react-icons/io5";
import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { BsGithub } from "react-icons/bs";
import { AuthContext } from "../Context/AuthContext";


const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();



const Signin = () => {
   const [show,setShow] = useState(false); //state for hide password 
   const emailRef = useRef(null) // useRef hook for hold email reference
   const {
    signInWithEmailAndPasswordFunc,
    signInWithEmailPopupFunc,
    signInWithGithubPopupFunc,
    signOutUserFunc,
    sendPasswordResetEmailFunc,
    setUser,
    user,
    setLoading} = useContext(AuthContext)
    


    //location
    const location = useLocation();
    const from = location.state || "/";
    const navigate = useNavigate();


    if(user){
      navigate('/')
      return;
    }



  //email sign Out here
   const handleSignin =(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log("Signup function enter :",email,password );

    signInWithEmailAndPasswordFunc(email,password)
    .then((res) => {
      setLoading(false);
      //email verified
      if(!res.user.emailVerified){
        toast.error("Your Email is not verified")
        return;
      }
      console.log(res);
      setUser(res.user);
      toast.success("Sign in Successfull")
      navigate(from)
    })
    .catch((e) => {
      console.log(e)
      toast.error(error.message);
    })
   } 



  //email sign out here
  //  const handleSignout =()=>{
  //   signOutUserFunc()
  //   .then((res)=>{
  //     // setLoading(false);
  //     toast.success("SignOut Successfull");
  //     navigate(from)
  //     setUser(null);
  //   })
  //   .catch((e)=>{
  //     console.log(e);
  //     toast.error(e.message);
  //   })
  //  }

  //google sign in here 
  
  
  
  const handleGoogleSignIn =()=>{
    signInWithEmailPopupFunc(auth,googleProvider)
    .then((res)=>{
      setLoading(false);
      setUser(res.user);
      navigate(from)
      toast.success("Google Sign In Successfull");
    })
    .catch((e)=>{
      console.log(e);
      toast.error(e.message);
    })
   }

   //Github Signin Here
   const handleGithubSignIn = () =>{
    signInWithGithubPopupFunc(auth,gitHubProvider)
    .then((res)=>{
      setLoading(false);
      setUser(res.user);
      navigate(from)
      toast.success("Github Sign In Successfull");
    })
    .catch((e)=>{
      console.log(e);
      toast.error(e.message);
    })
   }

   //forget password function
   const handleForgetPassword =()=>{
    const email = emailRef.current.value;
    sendPasswordResetEmailFunc(email)
    .then((res)=>{
      setLoading(false);
      toast.success("Check your email to reset password")
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

            <form onSubmit={handleSignin} className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold text-center mb-4 text-white">SignIn</h2>
               {/* email  */}
               <div>
                 <label htmlFor="">Email</label>
                 <input ref={emailRef} type="email" name="email" placeholder="Email" className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-pink-500 text-black"/>
               </div>
   
               {/* password  */}
               <div className="relative">{/* password  */}
                 <label htmlFor="">Password</label>
                 <input type={show ? "text":"password"} name="password" placeholder="Enter Password" className="w-full p-3 rounded-md bg-white text-gray-400 focus:outline-none"/>
                 {/* eye icon*/}    
                 <span onClick={()=>{setShow(!show)}} className="absolute right-[8px] top-[40px] cursor-pointer">{show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}</span>
               </div>
   
                {/* forget password */}
               <button type="button" onClick={handleForgetPassword} className="text-sm text-white/80 hover:underline font-medium cursor-pointer">
                 Forgot password?
               </button>
   
               <button type="submit" className="btn bg-white/30 hover:bg-white/50 text-white font-semibold w-full mt-2">
                 Login
               </button>
   
               <div className="divider text-white">or</div>


               {/* google sign in button */}
               <button onClick={handleGoogleSignIn} className="btn border text-gray-700 flex items-center gap-2 hover:bg-gray-100 w-full">
                 <FcGoogle className="text-xl" /> Sign in with Google
               </button>

               {/* Github sign in button */}
               <button onClick={handleGithubSignIn} className="btn border text-gray-700 flex items-center gap-2 hover:bg-gray-100 w-full">
                 <BsGithub className="text-xl" /> Continue with Github
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
