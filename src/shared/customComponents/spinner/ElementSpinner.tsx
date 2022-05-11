import React from "react";

import { Spin } from "antd";
import "./ElementSpinner.css";

interface IProps {
  children?: React.ReactNode;
  loading?: boolean;
  fixedToCentre?: boolean;
}

const ElementSpinner = ({
  children,
  loading,
  fixedToCentre = true,
}: IProps) => {
  return (
    <Spin
      className={fixedToCentre ? "element_spinner" : ""}
      size="large"
      spinning={loading}
    >
      {children}
    </Spin>
  );
};

export default ElementSpinner;
