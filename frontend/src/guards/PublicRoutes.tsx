import React, { Suspense } from "react";
import { Redirect, Route } from "react-router";
import { PublicRoutesProps } from "../models/Props/PublicRoutesProps";

const PublicRoutesComponent = ({ Component, path }: PublicRoutesProps) => {
  const token = localStorage.getItem("t1ks1ehn");
  if (!token) {
    return (
      <Route exact path={path}>
        <Suspense fallback="loading">
          <Component />
        </Suspense>
      </Route>
    );
  }

  return <Redirect to="/home" />;
};

export default PublicRoutesComponent;
