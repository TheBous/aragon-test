import React, { FC } from "react";

import Router from "../Router";

import "../../../scss/index.scss";

const App: FC = (): JSX.Element => {
  
  return (
    <div data-testid="container">
      <Router />
    </div>
  );
};

export default App;
