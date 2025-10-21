import React from 'react';
import logo from "../assets/logo.jpg";
import MyLink from './MyLink';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        // <div className='bg-slate-900 py-2 border-b border-b-slate-950'>
        //     <div className="flex items-center justify-between w-11/12 mx-auto">
        //         <figure>
        //             <img src={logo} className='w-[55px]' alt="" />
        //         </figure>
        //         <ul className='flex items-center gap-2 text-white'>
        //             <li><MyLink to={"/"}>Home</MyLink></li>
        //             <li><MyLink to={"/about"}>About Us</MyLink></li>
        //             <li><MyLink to={"/profile"}>Profile</MyLink></li>
        //         </ul>
        //         <button className='bg-purple-500 text-white px-4 py-2 rounded font-semibold'><Link to={"/signin"}>SignIn</Link></button>
        //     </div>
        // </div>
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
                     <li><MyLink to={"/profile"}>Profile</MyLink></li>
                 </ul>

                 {/* Sign In Button */}
                 <button className="hidden md:block bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform text-white px-5 py-2 rounded-lg font-semibold shadow-md">
                     <Link to={"/signin"}>Sign In</Link>
                 </button>

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
                 <div className="md:hidden bg-slate-800/90 backdrop-blur-md text-white flex flex-col items-center gap-3 py-4 animate-fadeIn">
                      <MyLink to={"/"} onClick={() => setOpen(false)}>Home</MyLink>
                      <MyLink to={"/about"} onClick={() => setOpen(false)}>About Us</MyLink>
                      <MyLink to={"/profile"} onClick={() => setOpen(false)}>Profile</MyLink>
                      <Link
                          to={"/signin"}
                          onClick={() => setOpen(false)}
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-2 rounded-lg font-semibold shadow-md"
                      >
                          Sign In
                      </Link>
                 </div>
              )}
        </div>
    )
}
export default Navbar;