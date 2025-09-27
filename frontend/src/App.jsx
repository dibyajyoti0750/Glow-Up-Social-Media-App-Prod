import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import { useUser } from "@clerk/clerk-react";

export default function App() {
  const { user } = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Home />} />
          <Route path="inbox" element={<Messages />} />
          <Route path="inbox/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}
