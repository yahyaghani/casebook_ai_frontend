// @flow
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { UserContext } from "../App";
import DashboardCard from "../shared/DashboardCard";

function DashboardView() {
  const { state, dispatch } = useContext(UserContext);

  return (
    <div
      className="dashboard-view bg-dark p-5 text-center"
      style={{ width: "100%" }}
    >
      <Row>
        <Col lg={3} md={4} xs={12} sm={12}>
          <DashboardCard
            title={"Revenue"}
            icon={"mdi-currency-usd"}
            footerText={"11% revenue growth"}
            number={34234}
            color={"success"}
          />
        </Col>
        <Col lg={3} md={4} xs={12} sm={12}>
          <DashboardCard
            title={"Sales"}
            icon={"mdi-sale"}
            footerText={"15% sales increase"}
            number={34234}
            color={"danger"}
          />
        </Col>
        <Col lg={3} md={4} xs={12} sm={12}>
          <DashboardCard
            title={"Customers"}
            icon={"mdi-account"}
            footerText={"22% customer growth"}
            number={34234}
            color={"warning"}
          />
        </Col>
        <Col lg={3} md={4} xs={12} sm={12}>
          <DashboardCard
            title={"Stats"}
            icon={"mdi-elevation-rise"}
            footerText={"17% overall growth"}
            number={34234}
            color={"success"}
          />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardView;
