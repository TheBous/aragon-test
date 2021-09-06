import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { IRoute } from "../../index.d";

const Outer: FC<IRoute> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
};

export default Outer;
