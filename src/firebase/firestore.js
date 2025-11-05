import { db, auth } from "./config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addAsset = async (asset) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const assetRef = collection(db, "users", user.uid, "assets");
  await addDoc(assetRef, asset);
};

export const getAssets = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const assetRef = collection(db, "users", user.uid, "assets");
  const snapshot = await getDocs(assetRef);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
