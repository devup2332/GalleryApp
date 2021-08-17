import React, { Suspense } from "react";
import { Redirect, Route } from "react-router";
import { PrivateRoutesProps } from "../models/Props/PrivateRoutesProps";

const PrivateRoutes = ({ Component, path }: PrivateRoutesProps) => {
  const token = localStorage.getItem("t1ks1ehn");
  if (token) {
    return (
      <Route path={path}>
        <Suspense fallback="Loading">
          <Component />
        </Suspense>
      </Route>
    );
  }

  return <Redirect to="/login" />;
};

export default PrivateRoutes;
