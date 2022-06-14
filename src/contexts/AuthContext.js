import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const authentication = getAuth();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        setLoggedIn(true);
        window.localStorage.setItem("emailForSignIn", user.email);
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data());
      } else {
        console.log("There is no user..!");
      }
    });
  }, []);

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);

    authentication.signOut();
    localStorage.removeItem("emailForSignIn");
  };

  const values = { user, userId, loggedIn, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
