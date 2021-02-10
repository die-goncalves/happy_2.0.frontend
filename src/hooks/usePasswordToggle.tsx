import React, { useState } from "react";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? (
    <IoIosEye
      className="use-eye"
      color="#37c77f"
      onClick={() => setVisibility((visible) => !visible)}
    />
  ) : (
    <IoMdEyeOff
      className="use-eye"
      color="rgba(143, 167, 179, 1)"
      onClick={() => setVisibility((visible) => !visible)}
    />
  );
  const InputType = visible ? "text" : "password";

  return { InputType, Icon };
};

export default usePasswordToggle;
