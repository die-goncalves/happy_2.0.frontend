import React, { useState } from "react";
import { RiCheckboxBlankFill, RiCheckboxFill } from "react-icons/ri";

const useCustomCheckbox = () => {
  const [check, setCheck] = useState(false);

  const CheckBox = check ? (
    <RiCheckboxFill
      className="use-checkbox"
      color="#37c77f"
      onClick={() => setCheck((check) => !check)}
    />
  ) : (
    <RiCheckboxBlankFill
      className="use-checkbox"
      color="#F5F8FA"
      onClick={() => setCheck((check) => !check)}
    />
  );
  return { check, CheckBox };
};

export default useCustomCheckbox;
