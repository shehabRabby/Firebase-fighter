import React, { use, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  //for email user create
  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  //popup google
  const signInWithEmailPopupFunc = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  //popup github
  const signInWithGithubPopupFunc = () => {
    setLoading(true)
    return signInWithPopup(auth, gitHubProvider);
  };

  //sign out
  const signOutUserFunc = () => {
    setLoading(true)
    return signOut(auth);
  };

  //forget password
  const sendPasswordResetEmailFunc = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email);
  };

  //update profile
  const updateProfileFunc = (displayName, photoURL) => {
    setLoading(true)
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  //send email verification
  const sendEmailVerificationFunc = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser);
  };

  const authInfo = {
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
    loading,
    setLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
    //   console.log(currUser);
      setUser(currUser);
      setLoading(false);
    });
    
    return ()=>{
        unsubscribe();
    }
  },[]);


  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
