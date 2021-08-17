import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PublicRoutesComponent from "./guards/PublicRoutes";
import "./styles.scss";
import Pusher from "pusher-js";
import PrivateRoutes from "./guards/PrivateRoutes";

const HomePage = React.lazy(() => import("./pages/home/Home"));
const RegisterPage = React.lazy(() => import("./pages/register/Register"));
const LoginPage = React.lazy(() => import("./pages/login/Login.page"));
const ProfilePage = React.lazy(() => import("./pages/profile/Profile"));
const EditProfilePage = React.lazy(
  () => import("./pages/edit-profile/EditProfile")
);
const UpdatePhotoPage = React.lazy(
  () => import("./pages/upload-photo/UploadPhoto")
);

const SearchPage = React.lazy(() => import("./pages/search-page/SearchPage"));

const pusher = new Pusher("7a1ea605dc1a765a5bc1", {
  cluster: "us2",
});

export const channel = pusher.subscribe("my-gallery");

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Suspense fallback="loading">
            <HomePage />
          </Suspense>
        </Route>
        <Route exact path="/search/:text">
          <Suspense fallback="loading">
            <SearchPage />
          </Suspense>
        </Route>
        <PublicRoutesComponent Component={RegisterPage} path="/register" />
        <PublicRoutesComponent Component={LoginPage} path="/login" />
        <PrivateRoutes Component={ProfilePage} path="/profile" />
        <PrivateRoutes Component={EditProfilePage} path="/edit-profile/:id" />
        <PrivateRoutes Component={UpdatePhotoPage} path="/upload-photo" />
        <Redirect exact from="/" to="/home" />
        <Redirect exact from="/**" to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
