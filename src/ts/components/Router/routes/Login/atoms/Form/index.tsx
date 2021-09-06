import React, { FC, useState } from "react";
import Input from "../Input";
import { isEmailValid } from "../../../../../../helpers/validators";

import "./index.scss";

import { IFormProps } from "./index.d";

const Form: FC<IFormProps> = ({ onAction, actionLabel }): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (updatedEmail: string): void => {
    setEmail(updatedEmail);
  };

  const onPwdChange = (updatedPwd: string): void => {
    setPassword(updatedPwd);
  };

  return (
    <div className="form">
      <div className="__fields">
        <Input
          placeholder="Email"
          onInputChange={onEmailChange}
          hasError={!isEmailValid(email)}
          type="text"
        />
        <Input
          placeholder="Password"
          onInputChange={onPwdChange}
          hasError={!password}
          type="password"
        />
      </div>
      <div className="__action">
        <button onClick={() => onAction(email, password)}>{actionLabel}</button>
      </div>
    </div>
  );
};

export default Form;
