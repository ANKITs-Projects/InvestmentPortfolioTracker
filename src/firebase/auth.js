import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc } from "firebase/firestore";

export const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store user profile in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    createdAt: new Date()
  });

  return user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};
