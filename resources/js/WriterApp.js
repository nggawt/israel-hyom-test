import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthRoutes from "./pages/auth/AuthRoutes";
import PersistLogin from "./pages/auth/PersistLogin";
import PublicRoutes from "./pages/auth/PublicRoutes";
import NotFound from "./components/NotFound";

import WriterComponent from "./pages/writers/WriterComponent";
import CreateWriter from "./pages/writers/CreateWriter";
import EditWriter from "./pages/writers/EditWriter";
import ViewWriter from "./pages/writers/ViewWriter";
import WriterShareComponent from "./pages/writers/WriterShareComponent";

import PostShareComponent from "./pages/posts/PostShareComponent";
import PostComponent from "./pages/posts/PostComponent";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import ViewPost from "./pages/posts/ViewPost";

function WriterApp() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<AuthRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/writers" element={<WriterShareComponent />}>
              <Route index element={<WriterComponent />} />
              <Route path="new-writer" element={<CreateWriter />} />
              <Route
                path=":writerId/edit-writer"
                element={<EditWriter />}
              />
              <Route path=":writerId" element={<ViewWriter />} />
            </Route>
            <Route path="/Posts" element={<PostShareComponent />}>
              <Route index element={<PostComponent />} />
              <Route path="new-Post" element={<CreatePost />} />
              <Route
                path=":PostId/edit-Post"
                element={<EditPost />}
              />
              <Route path=":PostId" element={<ViewPost />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<Layout />}>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default WriterApp;
