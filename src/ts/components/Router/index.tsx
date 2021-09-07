import React, { FC } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import Login from "./routes/Login";
import User from "./routes/User/index";
import Inner from "./atoms/Inner";
import Outer from "./atoms/Outer";

const RpslsRouter: FC = () => {
  console.error("herehere");
  return (
    <Router>
      <Switch>
        <Outer path="/" exact component={Login} />
        <Outer path="/sign" component={Login} />
        <Inner path="/user" component={User} />
      </Switch>
    </Router>
  );
};

export default RpslsRouter;
