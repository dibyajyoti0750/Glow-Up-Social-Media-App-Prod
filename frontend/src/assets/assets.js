import logo from "./love.png";
import sample_cover from "./pexels-suissounet-2101187.jpg";
import sample_profile from "./profile.png";
import sponsored_img from "./sponsored.png";
import send from "./send.png";

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
  send,
};

export const menuItemsData = [
  { to: "/", label: "Home", Icon: HouseHeart },
  { to: "/inbox", label: "Messages", Icon: MessageCircleHeart },
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
  bio: "Coffee enthusiast | Avid reader | Always chasing new experiences and good conversations",
};

const dummyUserData3 = {
  ...dummyUserData,
  _id: "user_3",
  username: "andrew_smith",
  full_name: "Andrew Smith",
  profile_picture:
    "https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg",
  bio: "Part-time dreamer, full-time explorer | Making life a little brighter one day at a time | Sarcasm included",
  is_verified: false,
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
      "You should spend 100% of discretionary income and time on learning how to earn more until you have the income you want. Then, do whatever you want. \n\nFastest results come from wanting less. Second fastest come from learning more.",
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

  {
    _id: "70f6309e-7a44-4165-9ea0-fd6a1fbaa01e",
    user: dummyUserData,
    content: "",
    media_url:
      "https://images.pexels.com/photos/1115105/pexels-photo-1115105.jpeg",
    media_type: "image",
    background_color: "#A0C4FF",
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },

  {
    _id: "4b278aa3-8d3b-4fd3-bed5-cb5850c8e4d4",
    user: dummyUserData2,
    content: "",
    media_url:
      "https://videos.pexels.com/video-files/8928582/8928582-uhd_2560_1440_25fps.mp4",
    media_type: "video",
    background_color: "#BDB2FF",
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },

  {
    _id: "c74781b5-61a1-4b73-bbc2-18b63c343065",
    user: dummyUserData3,
    content: "",
    media_url:
      "https://videos.pexels.com/video-files/4763826/4763826-uhd_2732_1440_24fps.mp4",
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
      "Chasing dreams, one line of code at a time ✨ \n#CodeLife #DreamBig",
    image_urls: [
      "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg",
    ],
    post_type: "text_with_image",
    likes_count: ["0900da2c-10fe-4645-a429-0ac7af6739f5", "user_2", "user_3"],
    createdAt: "2025-09-26T05:15:06.958Z",
    updatedAt: "2025-09-26T05:15:06.958Z",
  },

  {
    _id: "876314b3-d71c-46a0-b880-c0c05df788e1",
    user: dummyUserData2,
    content:
      "Sometimes the smallest steps make the biggest changes 💫 \n#KeepGoing",
    image_urls: [],
    post_type: "text",
    likes_count: [],
    createdAt: "2025-09-26T06:18:06.958Z",
    updatedAt: "2025-09-26T06:18:06.958Z",
  },

  {
    _id: "e0ed3d92-922c-4af6-b6e7-5faed9fd2dde",
    user: dummyUserData3,
    content: "Together we achieve more 💪 \n#TeamworkMakesTheDreamWork",
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
    text: "I've seen your profile",
    message_type: "text",
    media_url: "",
    seen: true,
    createdAt: "2025-09-26T08:06:14.436Z",
    updatedAt: "2025-09-26T08:06:14.436Z",
  },
  {
    _id: "6878cc3c17a54e4d3748012f",
    from_user_id: dummyUserData2,
    to_user_id: dummyUserData3,
    text: "This is a Samsung Tablet",
    message_type: "text",
    media_url: "",
    createdAt: "2025-09-26T08:06:14.436Z",
    updatedAt: "2025-09-26T08:06:14.436Z",
    seen: true,
  },
  {
    _id: "686fb66c7f0dcbff63b239e7",
    from_user_id: dummyUserData3,
    to_user_id: dummyUserData,
    text: "how are you",
    message_type: "text",
    media_url: "",
    createdAt: "2025-09-26T08:06:14.436Z",
    updatedAt: "2025-09-26T08:06:14.436Z",
    seen: false,
  },
];

export const dummyMessagesData = [
  {
    _id: "6878cc3217a54e4d37480122",
    from_user_id: "0900da2c-10fe-4645-a429-0ac7af6739f5",
    to_user_id: "user_2",
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
    from_user_id: "0900da2c-10fe-4645-a429-0ac7af6739f5",
    to_user_id: "user_2",
    text: "This is a Samsung Tablet and I am thrilled to tell you that I bought this from flipkart big billion days",
    message_type: "text",
    media_url: "",
    createdAt: "2025-07-17T10:11:08.437Z",
    updatedAt: "2025-07-25T10:43:50.346Z",
    seen: true,
  },
  {
    _id: "68835ffc6e4b42b685069def",
    from_user_id: "user_2",
    to_user_id: "0900da2c-10fe-4645-a429-0ac7af6739f5",
    text: "Wow, congrats 🎉😊 \nIs this tablet any good for regular use?",
    message_type: "text",
    media_url: "",
    seen: false,
    createdAt: "2025-07-25T10:44:12.753Z",
    updatedAt: "2025-07-25T10:44:12.753Z",
  },
  {
    _id: "6878cc2817a54e4d3748010c",
    from_user_id: "0900da2c-10fe-4645-a429-0ac7af6739f5",
    to_user_id: "user_2",
    text: "Yes, you can purchase it from flipkart",
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

export const dummyFollowersData = [
  dummyUserData,
  dummyUserData2,
  dummyUserData3,
];

export const dummyFollowingData = [dummyUserData2, dummyUserData3];

export const dummyPendingConnectionsData = [dummyUserData, dummyUserData2];
