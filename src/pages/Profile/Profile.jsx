import React, { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { ProfileCard } from "../../components/profile/ProfileCard";
import { Card } from "../../components/Card";
import { EditProfileModal } from "../../components/profile/EditProfileModal";

export const Profile = () => {
  const { userData, logout } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  if (!userData) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading profile...</p>
    );
  }

  const profile = userData.profile;
  const assets = userData.assets || [];

  const totalInvested = assets.reduce(
    (acc, a) => acc + Number(a.buyPrice) * Number(a.qty || 0),
    0
  );
  const totalAssets = assets.length;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Profile
        </h1>

        <ProfileCard profile={profile} />

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card title="Total Assets" value={totalAssets} />
          <Card
            title="Total Invested"
            value={`$${totalInvested.toLocaleString()}`}
          />
          <Card
            title="Member Since"
            value={new Date(
              profile.createdAt.seconds * 1000
            ).toLocaleDateString()}
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
      {isEditOpen && <EditProfileModal onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};
