import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();




const AuthProvider = ({children}) => {

    const [user,setUser]= useState(null);


    //for email user create
    const createUserWithEmailAndPasswordFunc = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    
    //sign in 
    const signInWithEmailAndPasswordFunc = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    //popup google
    const signInWithEmailPopupFunc = () =>{
        return signInWithPopup(auth,googleProvider)
    }

    //popup github
    const signInWithGithubPopupFunc = () =>{
        return signInWithPopup(auth,gitHubProvider)
    }

    //sign out
    const signOutUserFunc = ()=>{
        return signOut(auth)
    }

    //forget password
    const  sendPasswordResetEmailFunc = (email) =>{
        return  sendPasswordResetEmail(auth,email);
    }

    //update profile
    const updateProfileFunc =(displayName,photoURL)=>{
        return updateProfile(auth.currentUser, {displayName,photoURL,})
    }

    //send email verification 
    const sendEmailVerificationFunc = ()=>{
        return sendEmailVerification(auth.currentUser);
    }

    const authInfo ={
        user,
        setUser,
        createUserWithEmailAndPasswordFunc,
        signInWithEmailAndPasswordFunc,
        signInWithEmailPopupFunc,
        signInWithGithubPopupFunc,
        signOutUserFunc,
        sendPasswordResetEmailFunc,
        updateProfileFunc,
        sendEmailVerificationFunc,
        
    }
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
