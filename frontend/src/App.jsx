import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function App() {
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        console.log(token);
      } catch (err) {
        console.log(err);
      }
    };

    fetchToken();
  }, [getToken]);

  return (
    <>
      <Toaster />
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
