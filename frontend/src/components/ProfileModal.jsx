import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

export default function ProfileModal({ setShowEdit }) {
  const user = dummyUserData;
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
  };

  return (
    <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 text-white backdrop-blur-sm overflow-y-scroll no-scrollbar">
      <div className="w-full max-w-2xl p-2 mx-auto text-gray-900">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <form onSubmit={handleSaveProfile} className="space-y-4">
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
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo
                  }
                  alt="cover photo"
                  className="w-full h-32 md:h-40 rounded-lg object-cover"
                />
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
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute hidden group-hover/profile:flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                </div>
              </label>
            </div>

            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setEditForm({ ...editForm, full_name: e.target.value })
                }
                value={editForm.full_name}
                type="text"
                id="full_name"
                placeholder="Please enter your full name"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                value={editForm.username}
                type="text"
                id="username"
                placeholder="Please enter a username"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                rows={3}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                value={editForm.bio}
                id="bio"
                placeholder="Please enter a short bio"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                value={editForm.location}
                type="text"
                id="location"
                placeholder="Please enter your location"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              {/* Cancel button */}
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium 
                hover:bg-gray-50 active:scale-95 transition-all duration-200 
                shadow-sm hover:shadow cursor-pointer"
              >
                Cancel
              </button>

              {/* Save button */}
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 
                text-white font-medium shadow-md hover:shadow-lg 
                hover:from-blue-600 hover:to-blue-800 active:scale-95 
                transition-all duration-200 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
