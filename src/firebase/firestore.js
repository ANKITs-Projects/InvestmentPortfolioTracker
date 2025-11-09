import axios from "axios";
import { db, auth } from "./config";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

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

export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  const assetsRef = collection(db, "users", uid, "assets");
  const assetsSnap = await getDocs(assetsRef);

  return {
    profile: userSnap.exists() ? userSnap.data() : null,
    assets: assetsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
  };
};

export const getUserAssets = async (uid) => {
  
  const assetsSnap = await getDocs(collection(db, "users", uid, "assets"));
  const assets = assetsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch live prices for crypto assets (via Binance)
  const updatedAssets = await Promise.all(
    assets.map(async (asset) => {
      let currentPrice = asset.buyPrice;
      try {
        if (asset.type === "crypto") {
          const res = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${asset.symbol}`
          );
          currentPrice = parseFloat(res.data.price);
        }
        const currentValue = currentPrice * asset.qty;
        const totalInvested = asset.buyPrice * asset.qty;
        const profitLoss = (currentValue - totalInvested).toFixed(2);
        const profitPercent = ((profitLoss / totalInvested) * 100).toFixed(2);

        
        return {
          ...asset,
          currentPrice,
          currentValue,
          profitLoss,
          profitPercent,
        };
      } catch (err) {
        console.error("Error fetching price for", asset.symbol, err);
        return asset;
      }
    })
  );

  return updatedAssets;
};


export const updateProfile = async (uid, profileData) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, profileData);
}
export const updateAssets = async (uid, assetsData) => {

  const userRef = doc(db, "users", uid,"assets", assetsData.id);
  await updateDoc(userRef, assetsData);
}



export const deleteAsset = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const assetRef = doc(db, "users", user.uid, "assets", id);
  await deleteDoc(assetRef);
};