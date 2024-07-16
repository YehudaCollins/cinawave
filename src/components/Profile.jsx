// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logOut } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import '../style/profile-page.css'

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div className="profile-page">
      {user ? (
        <div className="profile-info">
          <h2>Welcome, {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in with Google to access your profile.</p>
          <button onClick={handleSignIn}>Login with Google</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
