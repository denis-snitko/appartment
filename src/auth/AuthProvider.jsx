import { createContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('accessToken') || null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const signIn = (newUser, cb) => {
    signInWithEmailAndPassword(firebaseAuth, newUser.email, newUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);

        localStorage.setItem('accessToken', user.accessToken);
      })
      .then(() => cb())
      .catch((error) => {
        setError(error.message);
      });
  };

  const signOut = (cb) => {
    firebaseAuth.signOut();
    setUser(null);
    localStorage.removeItem('accessToken');
    cb();
  };

  const value = {
    user,
    error,
    signIn,
    signOut,
  };

  useEffect(() => {
    setError(null);

    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        navigate('/login');
      }
    });
  }, [navigate, user, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
