import React from "react";
import ReactDOM from "react-dom";

import App from "./ts/components/App";
import { AuthProvider } from "./ts/context/AuthContext";

ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  document.getElementById("app")
);
