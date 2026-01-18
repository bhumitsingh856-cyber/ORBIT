import React from "react";
import { lazy, Suspense } from "react";
import { RingLoader } from "react-spinners";
const Layout = lazy(() => import("./components/Layout.jsx"));
const Signup = lazy(() => import("./page/Signup.jsx"));
const Home = lazy(() => import("./page/Home.jsx"));
const Login = lazy(() => import("./page/Login.jsx"));
const Passreset = lazy(() => import("./page/Passreset.jsx"));
const Newpass = lazy(() => import("./page/Newpass.jsx"));
const PostPage = lazy(() => import("./page/PostPage.jsx"));
const Userprofilepage = lazy(() => import("./page/Userprofilepage.jsx"));
const Messages = lazy(() => import("./page/Messages.jsx"));
const Createpostpage = lazy(() => import("./page/Createpostpage.jsx"));
const Editpost = lazy(() => import("./page/Editpost.jsx"));
const Editprofilepage = lazy(() => import("./page/Editprofilepage.jsx"));
const Search = lazy(() => import("./page/Search.jsx"));
const Chats = lazy(() => import("./page/Chats.jsx"));
const Aichat = lazy(() => import("./page/Aichat.jsx"));
const SearchSKL = lazy(() => import("./components/Skeletons/SearchSKL.jsx"));
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/a",
      element: <SearchSKL />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/signup",
      element: <Signup />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/forgotpassword",
      element: <Passreset />,
    },
    {
      path: "/auth/setnewpass/:username/:token",
      element: <Newpass />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/orbit/postpage",
              element: <PostPage />,
            },
            {
              path: "/orbit/userprofilepage",
              element: <Userprofilepage />,
            },
            {
              path: "/orbit/profile/:username",
              element: <Userprofilepage />,
            },
            {
              path: "/orbit/searchpage",
              element: (
                <Suspense fallback={<SearchSKL />}>
                  <Search />
                </Suspense>
              ),
            },
            {
              path: "/orbit/createpost",
              element: <Createpostpage />,
            },
            {
              path: "/orbit/messages",
              element: <Messages />,
            },
            {
              path: "/orbit/chats/:username",
              element: <Chats />,
            },
            {
              path: "/orbit/editpost/:id",
              element: <Editpost />,
            },
            {
              path: "/orbit/editprofilepage",
              element: <Editprofilepage></Editprofilepage>,
            },
            {
              path: "/orbit/orbitAI",
              element: <Aichat></Aichat>,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      <Suspense
        fallback={
          <div className="w-full flex h-screen justify-center items-center">
            <RingLoader className="md:scale-400 scale-200" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};
export default App;
