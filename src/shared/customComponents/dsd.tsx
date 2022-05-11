import React from "react";

import { Input } from "antd";

export default function CustomInput(props: any) {
  const { validationError } = props;
  return (
    <>
      <p>{validationError}</p>
      <Input {...props} />
    </>
  );
}

<CustomInput maxLength={34} validationError="123" />;
