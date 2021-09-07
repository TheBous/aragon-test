import React, { FC, useState } from "react";

import Form from "./atoms/Form";
import { useAuth } from "../../../../context/AuthContext";
import { useHistory } from "react-router-dom";

import "./index.scss";

const Login: FC = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const { signup, signin } = useAuth();
  const history = useHistory();

  const registerUser = async (email: string, pwd: string): Promise<void> => {
    try {
      await signup(email, pwd);
      history.push("/user");
    } catch (e) {
      setError(true);
    }
  };

  const loginUser = async (email: string, pwd: string): Promise<void> => {
    try {
      await signin(email, pwd);
      history.push("/user");
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="form-container">
      {error && <div>Error</div>}
      {!error && (
        <>
          <Form actionLabel="Register" onAction={registerUser} />
          <Form actionLabel="Login" onAction={loginUser} />
        </>
      )}
    </div>
  );
};

export default Login;
