/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { authentication } from "../configs/firebaseConfig";
import { Role } from "../helpers/role";
import { useDispatch } from "react-redux";
import { setAccountProfile } from "../redux/slices/accountSlice";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(authentication, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(authentication, email, password);
  }
  function logOut() {
    return signOut(authentication);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(authentication, googleAuthProvider);
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      authentication
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(authentication, number, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (currentuser) => {
      currentuser.role = Role.User;
      dispatch(setAccountProfile(currentuser));
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
