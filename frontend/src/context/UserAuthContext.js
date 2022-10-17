/* eslint-disable react-hooks/exhaustive-deps */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { authentication } from "../configs/firebaseConfig";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(authentication, (currentuser) => {
  //     dispatch(
  //       createAccount({
  //         gmail: "",
  //         name: "NONAME",
  //         phone: currentuser.phoneNumber,
  //       })
  //     );
  //     setUser(currentuser);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

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
