import { useRef } from "react";
import useScript from "../../hooks/useScript";

export default function GoogleLogin({
  onGoogleSignIn = (response) => {},
  text = "signin_with",
}) {
  const googleSignInButton = useRef(null);
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      {
        theme: "filled_blue",
        type: "standard",
        size: "large",
        shape: "circular",
        logo_alignment: "center",
        width: "100vw",
      } // customization attributes
    );
  });

  return <div ref={googleSignInButton}></div>;
}

// import React from "react";
// import { signInWithGoogle } from "../../services/firebase";
// export default function GoogleLogin() {
//   return (
//       <div className="login-buttons">
//         <button className="login-provider-button" onClick={signInWithGoogle}>
//         <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
//         <span> Continue with Google</span>
//        </button>
//       </div>
//   );
// }
