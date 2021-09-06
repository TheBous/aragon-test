import React, { FC, useState } from "react";

import Form from "./atoms/Form";
import { useAuth } from "../../context/AuthContext";

import "./index.scss";

const LoginContainer: FC = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const { signup, signin } = useAuth();

  const registerUser = async (email: string, pwd: string): Promise<void> => {
    try {
      await signup(email, pwd);
    } catch (e) {
      console.error("error", e);
      setError(true);
    }
  };

  const loginUser = async (email: string, pwd: string): Promise<void> => {
    try {
      await signin(email, pwd);
    } catch (e) {
      console.error("error", e);
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

export default LoginContainer;
