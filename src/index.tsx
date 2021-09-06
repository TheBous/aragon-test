import React from "react";
import ReactDOM from "react-dom";
import { Contract, ethers } from "ethers";

import App from "./ts/components/App";
import { AuthProvider } from "./ts/context/AuthContext";

console.error(ethers);

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("app")
);
