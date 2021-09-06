import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginContainer from "../LoginContainer";
import Inner from "./atoms/Inner";
import Outer from "./atoms/Outer";

const RpslsRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Inner path="/" exact component={LoginContainer} />
        <Outer path="/signup" component={LoginContainer} />
      </Switch>
    </Router>
  );
};

export default RpslsRouter;
