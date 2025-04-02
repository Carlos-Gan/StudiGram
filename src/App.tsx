import { Routes, Route } from "react-router-dom";

import "./globals.css";
import SignInForm from "./__auth/forms/SignInForm";
import SignUpForm from "./__auth/forms/SignUpForm";
import Home from "./__root/pages/Home";
import AuthLayout from "./__auth/AuthLayout";
import RootLayout from "./__root/RootLayout";
import { Toaster } from "@/components/ui/sonner"
import Explore from "./__root/pages/Explore";
import Saved from "./__root/pages/Saved";
import AllUsers from "./__root/pages/AllUsers";
import CreatePost from "./__root/pages/CreatePost";
import EditPost from "./__root/pages/EditPost";
import PostDetails from "./__root/pages/PostDetails";
import Profile from "./__root/pages/Profile";
import UpdateProfile from "./__root/pages/UpdateProfile";
import AllTeachers from "./__root/pages/AllTeachers";
import ProfileTeacher from "./__root/pages/ProfileTeacher";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Rutas publicas */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/all-teachers" element={<AllTeachers />} />
          <Route path="/teacher/:id" element={<ProfileTeacher />} />
        </Route>
      </Routes>

      {/* Toast notifications */}
      <Toaster />
    </main>
  );
};

export default App;
