import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { updateUser } from "../features/user/userSlice";
import toast from "react-hot-toast";

export default function ProfileModal({ setShowEdit }) {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const user = useSelector((state) => state.user.value);
  const [editForm, setEditForm] = useState({
    username: user.username,
    full_name: user.full_name,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();

      const {
        full_name,
        username,
        bio,
        location,
        profile_picture,
        cover_photo,
      } = editForm;

      userData.append("username", username);
      userData.append("full_name", full_name);
      userData.append("bio", bio);
      userData.append("location", location);
      if (profile_picture) userData.append("profile", profile_picture);
      if (cover_photo) userData.append("cover", cover_photo);

      const token = await getToken();
      await dispatch(updateUser({ userData, token })).unwrap(); // .unwrap() extracts the actual payload and throws if the thunk was rejected
      setShowEdit(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 text-white backdrop-blur-sm">
      {/* Modal box */}
      <form
        onSubmit={(e) =>
          toast.promise(handleSaveProfile(e), { loading: "Saving..." })
        }
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg text-gray-900 h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Cover + Profile */}
          <div className="relative w-full mb-12">
            {/* Cover Photo */}
            <input
              type="file"
              hidden
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  cover_photo: e.target.files?.[0],
                })
              }
              accept="image/*"
              id="cover_photo"
            />
            <div className="group/cover relative">
              {editForm.cover_photo || user.cover_photo ? (
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo || null
                  }
                  alt="cover photo"
                  className="w-full h-32 sm:h-40 rounded-xl object-cover"
                />
              ) : (
                <div className="w-full h-32 sm:h-40 rounded-xl bg-linear-to-r from-blue-200 via-blue-400 to-blue-600"></div>
              )}

              <label
                htmlFor="cover_photo"
                className="absolute flex justify-center items-center h-8 w-8 top-2 right-2 bg-black/30 rounded-full cursor-pointer"
              >
                <Pencil className="w-4 h-4 text-white" />
              </label>
            </div>

            {/* Profile Picture */}
            <label
              htmlFor="profile_picture"
              className="absolute -bottom-8 left-6 group/profile cursor-pointer"
            >
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profile_picture: e.target.files?.[0],
                  })
                }
                accept="image/*"
                id="profile_picture"
              />
              <div className="relative">
                <img
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture
                  }
                  alt="profile picture"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="absolute hidden group-hover/profile:flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </div>
            </label>
          </div>

          {/* Inputs */}
          {[
            {
              id: "full_name",
              label: "Name",
              value: editForm.full_name,
              placeholder: "Enter your full name",
            },
            {
              id: "username",
              label: "Username",
              value: editForm.username,
              placeholder: "Enter a username",
            },
            {
              id: "location",
              label: "Location",
              value: editForm.location,
              placeholder: "Enter your location",
            },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                value={field.value}
                onChange={(e) =>
                  setEditForm({ ...editForm, [field.id]: e.target.value })
                }
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              rows={3}
              id="bio"
              placeholder="Please enter a short bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              className="w-full p-2.5 border border-gray-200 rounded-lg resize-none text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowEdit(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium 
            hover:bg-gray-100 active:scale-95 transition-all duration-200 
            shadow-sm hover:shadow cursor-pointer text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 
            text-white font-medium shadow-md hover:shadow-lg 
            hover:from-blue-600 hover:to-blue-800 active:scale-95 
            transition-all duration-200 cursor-pointer text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
