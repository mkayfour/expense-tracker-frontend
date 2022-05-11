import React from "react";

import { Layout, Spin } from "antd";

const AntSpinner = () => {
  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "90vh",
        backgroundColor: "white",
      }}
    >
      <Spin />
    </Layout>
  );
};

export default AntSpinner;
