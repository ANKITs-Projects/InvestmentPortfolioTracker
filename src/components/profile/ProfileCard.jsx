import React from "react";
import { UserCircle } from "lucide-react";

export const ProfileCard = ({ profile }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-100 rounded-lg p-6 shadow-sm">
      <div className="flex-shrink-0">
        {profile.photoURL ? (
          <img
            src={profile.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <UserCircle className="w-24 h-24 text-gray-400" />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-gray-500">{profile.email}</p>
      </div>
    </div>
  );
};

