import logo from "./love.png";
import sample_cover from "./pexels-suissounet-2101187.jpg";
import sample_profile from "./profile.png";
import sponsored_img from "./sponsored.png";

import {
  HouseHeart,
  MessageCircleHeart,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";

export const assets = {
  logo,
  sample_cover,
  sample_profile,
  sponsored_img,
};

export const menuItemsData = [
  { to: "/", label: "Home", Icon: HouseHeart },
  { to: "/inbox", label: "Inbox", Icon: MessageCircleHeart },
  { to: "/connections", label: "Connections", Icon: UsersRound },
  { to: "/explore", label: "Explore", Icon: Search },
  { to: "/profile", label: "Profile", Icon: UserRound },
];

export const dummyUserData = {
  _id: "0900da2c-10fe-4645-a429-0ac7af6739f5",
  email: "user@example.com",
  full_name: "Giga Chad",
  username: "giga_chad",
  bio: "MERN Stack Developer | Building digital experiences | Documenting my journey in tech",
  profile_picture: sample_profile,
  cover_photo: sample_cover,
  location: "New Delhi, India",
  followers: ["user_2", "user_3"],
  following: ["user_2", "user_3"],
  connections: ["user_2", "user_3"],
  posts: [],
  is_verified: true,
  createdAt: "2025-09-26T11:30:50.015Z",
  updatedAt: "2025-09-26T11:30:50.015Z",
};

const dummyUserData2 = {
  ...dummyUserData,
  _id: "user_2",
  username: "john_mark_peter",
  full_name: "John Mark Peter",
  profile_picture:
    "https://images.pexels.com/photos/27897903/pexels-photo-27897903.jpeg",
};

const dummyUserData3 = {
  ...dummyUserData,
  _id: "user_2",
  username: "andrew_smith",
  full_name: "Andrew Smith",
  profile_picture:
    "https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg",
};

export const dummyStoriesData = [
  {
    _id: "70f6309e-7a44-4165-9ea0-fd6a1fbaa01e",
    user: dummyUserData,
    content:
      "Progress isn't loud—it's the quiet hours no one sees that build the future everyone notices.",
    media_url: "",
    media_type: "text",
    background_color: "#A0C4FF",
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },

  {
    _id: "4b278aa3-8d3b-4fd3-bed5-cb5850c8e4d4",
    user: dummyUserData2,
    content:
      "Progress isn't loud—it's the quiet hours no one sees that build the future everyone notices.",
    media_url: "",
    media_type: "text",
    background_color: "#BDB2FF",
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },

  {
    _id: "c74781b5-61a1-4b73-bbc2-18b63c343065",
    user: dummyUserData3,
    content: "",
    media_url:
      "https://videos.pexels.com/video-files/855633/855633-hd_1920_1080_25fps.mp4",
    media_type: "video",
    background_color: "#FF9CEE",
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },
];

export const dummyPostsData = [
  {
    _id: "fa17ef9e-ab1e-4d17-9b7b-ea65ec6179ac",
    user: dummyUserData,
    content:
      "Chasing dreams, one line of code at a time ✨ #CodeLife #DreamBig",
    image_urls: [
      "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg",
    ],
    post_type: "text_with_image",
    likes_count: [],
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },

  {
    _id: "876314b3-d71c-46a0-b880-c0c05df788e1",
    user: dummyUserData2,
    content:
      "Sometimes the smallest steps make the biggest changes 💫 #KeepGoing",
    image_urls: [],
    post_type: "text",
    likes_count: [],
    createdAt: "2025-09-26T06:18:06.958Z",
    updatedAt: "2025-09-26T06:18:06.958Z",
  },

  {
    _id: "e0ed3d92-922c-4af6-b6e7-5faed9fd2dde",
    user: dummyUserData3,
    content: "Together we achieve more 💪 #TeamworkMakesTheDreamWork",
    image_urls: [
      "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg",
      "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
    ],
    post_type: "text_with_image",
    likes_count: [],
    createdAt: "2025-09-26T06:22:06.958Z",
    updatedAt: "2025-09-26T06:22:06.958Z",
  },
];

export const dummyRecentMessagesData = [
  {
    _id: "68833af618623d2de81b5381",
    from_user_id: dummyUserData,
    to_user_id: dummyUserData2,
    text: "I seen your profile",
    message_type: "text",
    media_url: "",
    seen: true,
    createdAt: "2025-07-25T08:06:14.436Z",
    updatedAt: "2025-07-25T08:47:47.768Z",
  },
  {
    _id: "6878cc3c17a54e4d3748012f",
    from_user_id: dummyUserData2,
    to_user_id: dummyUserData3,
    text: "This is a Samsung Tablet",
    message_type: "text",
    media_url: "",
    createdAt: "2025-07-17T10:11:08.437Z",
    updatedAt: "2025-07-25T08:07:11.893Z",
    seen: true,
  },
  {
    _id: "686fb66c7f0dcbff63b239e7",
    from_user_id: dummyUserData3,
    to_user_id: dummyUserData,
    text: "how are you",
    message_type: "text",
    media_url: "",
    createdAt: "2025-07-10T12:47:40.510Z",
    updatedAt: "2025-07-10T12:47:40.510Z",
    seen: false,
  },
];

export const dummyMessagesData = [
  {
    _id: "6878cc3217a54e4d37480122",
    from_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    to_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    text: "",
    message_type: "image",
    media_url:
      "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
    createdAt: "2025-07-17T10:10:58.524Z",
    updatedAt: "2025-07-25T10:43:50.346Z",
    seen: true,
  },
  {
    _id: "6878cc3c17a54e4d3748012f",
    from_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    to_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    text: "This is a Samsung Tablet",
    message_type: "text",
    media_url: "",
    createdAt: "2025-07-17T10:11:08.437Z",
    updatedAt: "2025-07-25T10:43:50.346Z",
    seen: true,
  },
  {
    _id: "68835ffc6e4b42b685069def",
    from_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    to_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    text: "yeah, this tablet is good",
    message_type: "text",
    media_url: "",
    seen: false,
    createdAt: "2025-07-25T10:44:12.753Z",
    updatedAt: "2025-07-25T10:44:12.753Z",
  },
  {
    _id: "6878cc2817a54e4d3748010c",
    from_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    to_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    text: "you can purchase it from amazon",
    message_type: "text",
    media_url: "",
    createdAt: "2025-08-17T10:10:48.956Z",
    updatedAt: "2025-08-25T10:43:50.346Z",
    seen: true,
  },
];

export const dummyConnectionsData = [
  dummyUserData,
  dummyUserData2,
  dummyUserData3,
];

export const dummyFollowersData = [dummyUserData2, dummyUserData3];

export const dummyFollowingData = [dummyUserData2, dummyUserData3];

export const dummyPendingConnectionsData = [dummyUserData];
