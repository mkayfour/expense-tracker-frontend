import React from "react";

import { Col, Row } from "antd";

const AppTitle = () => {
  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0",
        marginTop: "10vh",
      }}
    >
      <Col span={24} xs={24} sm={20} md={20} xl={10} xxl={10}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
      </Col>
    </Row>
  );
};

export default AppTitle;
