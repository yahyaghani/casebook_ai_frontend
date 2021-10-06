// @flow
import React from "react";
import { Col, Row } from "react-bootstrap";
import DashboardCard from "../shared/DashboardCard";

function DashboardView() {
	return (
		<div
			className="dashboard-view bg-dark2 p-5 text-center"
			style={{ width: "100%" }}
		>
			<Row>
				<Col lg={3} md={4} xs={12} sm={12}>
					<DashboardCard
						title={"Cases"}
						icon={"mdi-currency-usd"}
						footerText={""}
						number={0}
						color={"success"}
					/>
				</Col>
				<Col lg={3} md={4} xs={12} sm={12}>
					<DashboardCard
						title={"Laws"}
						icon={"mdi-sale"}
						footerText={""}
						number={0}
						color={"danger"}
					/>
				</Col>
				<Col lg={3} md={4} xs={12} sm={12}>
					<DashboardCard
						title={"Community"}
						icon={"mdi-account"}
						footerText={""}
						number={0}
						color={"warning"}
					/>
				</Col>
				<Col lg={3} md={4} xs={12} sm={12}>
					<DashboardCard
						title={"Caselaw"}
						icon={"mdi-elevation-rise"}
						footerText={""}
						number={0}
						color={"success"}
					/>
				</Col>
			</Row>
		</div>
	);
}

export default DashboardView;
