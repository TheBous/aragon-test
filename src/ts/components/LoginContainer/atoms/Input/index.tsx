import React, { FC, FormEvent } from "react";
import cx from "classnames";

import { IInputProps } from "./index.d";

import "./index.scss";

const Input: FC<IInputProps> = ({
  onInputChange,
  hasError,
  ...props
}): JSX.Element => {
  const detachEventAndSend = (e: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    onInputChange(value);
  };

  return (
    <input
      className={cx("custom-input", {
        "--error": hasError,
      })}
      type="text"
      onChange={detachEventAndSend}
      {...props}
    />
  );
};

export default Input;
