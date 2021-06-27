import { useEffect } from 'react';
import firebase from 'firebase';
import Router from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { auth } from '../services/firebase';

type UserProps = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: UserProps;
  signWithGoogle: () => Promise<void>;
};

type AuthContextProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  async function signWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await auth.signInWithPopup(provider);
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
        Router.push('/rooms/new');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
