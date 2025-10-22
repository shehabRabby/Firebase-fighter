import React, { useContext } from 'react';
import logo from "../assets/logo.jpg";
import MyLink from './MyLink';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';

const Navbar = () => {

    const {user,signOutUserFunc,setUser,loading,setLoading} = useContext(AuthContext); //context api er maddhone data neya
    // console.log(user)


     //email sign out here
       const handleSignout =()=>{
        signOutUserFunc()
        .then((res)=>{
          toast.success("SignOut Successfull");
          setUser(null);
        })
        .catch((e)=>{
          console.log(e);
          toast.error(e.message);
        })
       }


    return (

        <div className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 border-b border-slate-800 shadow-md">
             <div className="flex items-center justify-between w-11/12 mx-auto py-3">
                 {/* Logo */}
                 <figure>
                     <img src={logo} className="w-[55px] rounded-full" alt="Logo" />
                 </figure>

                 {/* Desktop Menu */}
                 <ul className="hidden md:flex items-center gap-5 text-white font-medium">
                     <li><MyLink to={"/"}>Home</MyLink></li>
                     <li><MyLink to={"/about"}>About Us</MyLink></li>
                     { user && <li><MyLink to={"/profile"}>Profile</MyLink></li>}
                 </ul>


                {loading ? (<BounceLoader color="#e74c3c" />): user ?  (
                // <div className="text-center space-y-3">
                //    {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
                //    {/* For TSX uncomment the commented types below */}
                //    <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
                //      <img src={ user?.photoURL || logo} alt="" className="h-15 w-15 rounded-full mx-auto p-2 bg-white" />
                //    </button>

                //    <div className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                //      popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }>
                        
                //     <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                //     <h2 className="text-black">{user?.email}</h2>
                //     <button onClick={handleSignout}  className=" btn border bg-gradient-to-r from-fuchsia-200 via-pink-500 to-purple-100 flex items-center gap-2  hover:bg-gray-100 w-full" >
                //       Sign Out
                //    </button>
                //    </div> 
                // </div>
                <div className="text-center space-y-3 relative">
                    {/* Profile Button */}
                    <button
                      className="relative group transition-all duration-300"
                      popoverTarget="user-popover"
                      style={{ anchorName: "--user-anchor" }}
                    >
                      <div className="p-[3px] rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500">
                        <img
                          src={user?.photoURL || logo}
                          alt="User Avatar"
                          className="h-16 w-16 rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </button>
                  
                    {/* Dropdown Menu */}
                    <div className="dropdown menu  p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 text-gray-800 space-y-3" popover="auto" id="user-popover" style={{ positionAnchor: "--user-anchor" }}>
                      <div className="text-center space-y-1">
                        <h2 className="text-lg font-bold text-gray-900">{user?.displayName}</h2>
                        <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                      </div>
                  
                      <button
                        onClick={handleSignout}
                        className="mt-3 w-full py-2 rounded-lg font-medium bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300 shadow-sm"
                      >
                        Sign Out
                      </button>
                    </div>
                </div>
                ) : (
                 <button className="hidden md:block bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform text-white px-5 py-2 rounded-lg font-semibold shadow-md">
                    <Link to={"/signin"}>Sign In</Link>
                 </button>
                )
       
                }


                 

                 {/* Mobile Menu Button */}
                 <button
                     className="md:hidden text-white text-3xl"
                     onClick={() => setOpen(!open)}
                 >
                     {open ? "✕" : "☰"}
                 </button>
             </div>
              {/* Mobile Dropdown */}
              {open && (
                  <div className="md:hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700/95 backdrop-blur-md text-white flex flex-col items-center gap-4 py-6 rounded-b-2xl shadow-lg animate-slideDown border-t border-slate-600">
                    <MyLink
                      to={"/"}
                      onClick={() => setOpen(false)}
                      className="hover:text-fuchsia-400 transition-all duration-300 text-lg font-medium"
                    >
                      Home
                    </MyLink>
                  
                    <MyLink
                      to={"/about"}
                      onClick={() => setOpen(false)}
                      className="hover:text-fuchsia-400 transition-all duration-300 text-lg font-medium"
                    >
                      About Us
                    </MyLink>
                  
                    <MyLink
                      to={"/profile"}
                      onClick={() => setOpen(false)}
                      className="hover:text-fuchsia-400 transition-all duration-300 text-lg font-medium"
                    >
                      Profile
                    </MyLink>
                  
                    <Link
                      to={"/signin"}
                      onClick={() => setOpen(false)}
                      className="mt-2 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-fuchsia-400/30 hover:scale-105 transition-transform duration-300"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
        </div>
    )
}
export default Navbar;