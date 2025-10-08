import { useState } from "react";
import useAuthStore from "../store/UseAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const formData = new FormData();
    formData.append("profilePic", file);

    await updateProfile(formData);

  };

  return (
    <div>
      <div className="mx-auto max-w-2xl p-4 py-8">
        <div className="rounded-2xl border border-black/5 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/40 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover ring-2 ring-white/60 dark:ring-white/10"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer transition-all duration-200 shadow-sm ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : "hover:scale-105"
                } bg-gray-900 text-white dark:bg-white dark:text-gray-900`}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="rounded-lg border border-black/5 bg-white/60 px-4 py-2.5 dark:border-white/10 dark:bg-gray-800/40">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="rounded-lg border border-black/5 bg-white/60 px-4 py-2.5 dark:border-white/10 dark:bg-gray-800/40">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-black/5 p-6 dark:border-white/10">
            <h2 className="mb-4 text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-black/5 py-2 dark:border-white/10">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-600 dark:text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
