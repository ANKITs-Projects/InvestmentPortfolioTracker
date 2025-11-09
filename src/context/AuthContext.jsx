import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUserAssets, getUserData } from "../firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userAssets, setUserAssets] = useState(null);
  const [loading, setLoading] = useState(true);


    const refreshUserData = async () => {
    if (user) {
      setLoading(true)
      const data = await getUserData(user.uid);
      setUserData(data);
      const assets = await getUserAssets(user.uid)
      setUserAssets(assets)
      setLoading(false)
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setUserAssets(null)
      localStorage.removeItem("user");
    } catch (err) {
      console.log("Error logging out: ", err);
    }
  };

  // Listen to Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const data = await getUserData(firebaseUser.uid);  // ✅ send UID
        setUserData(data);
        const assets = await getUserAssets(firebaseUser.uid)
        setUserAssets(assets)
      } else {
        setUser(null);
        setUserData(null);
        setUserAssets(null)
      }
      setLoading(false);
    });

    return unsubscribe;
  },[]);

  return (
    <AuthContext.Provider value={{ user, userData, logout, loading, refreshUserData, userAssets }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
