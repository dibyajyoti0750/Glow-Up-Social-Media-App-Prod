import { Calendar, MapPin, PenBox, Verified } from "lucide-react";
import moment from "moment";

export default function UserProfileInfo({
  user,
  posts,
  profileId,
  setShowEdit,
}) {
  return (
    <div className="relative py-2 px-6 md:px-8 bg-white">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="h-32 w-32 border-4 border-white shadow-xl absolute -top-16 rounded-full overflow-hidden">
          <img
            src={user.profile_picture}
            alt="profile picture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full pt-16 md:pt-0 md:pl-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">
                {user.username}
              </h1>
              {user.is_verified && (
                <Verified className="w-5 h-5 text-sky-600" />
              )}
            </div>

            {/* Edit button if user is in his own profile */}
            {!profileId && (
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer"
              >
                Edit profile
              </button>
            )}
          </div>

          <div className="flex items-center gap-6 my-4">
            {[
              { label: "posts", value: posts.length },
              { label: "followers", value: user.followers.length },
              { label: "following", value: user.following.length },
            ].map((item) => (
              <div key={item.label}>
                <span className="sm:text-xl font-medium text-gray-900">
                  {item.value}
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    {item.label}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="my-4 text-sm">
            <p className="font-medium">{user.full_name}</p>
            <p className="text-gray-800 text-sm max-w-md">{user.bio}</p>
          </div>

          <div className="flex items-center gap-5 text-sm text-gray-500 mt-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {user.location ? user.location : "Add location"}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined
              <span className="font-medium">
                {moment(user.createdAt).fromNow()}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
