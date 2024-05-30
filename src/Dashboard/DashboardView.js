import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import DashboardCard from "../shared/DashboardCard";
import MultiFileUpload from "./MultiFileUpload";
import ActionCard from "./ActionCard";
import { IoArrowBackCircle } from "react-icons/io5";

function DashboardView() {
    const [showUpload, setShowUpload] = useState(false);

    const handleHelpClick = () => {
        setShowUpload(true);
    };

    const handleBackClick = () => {
        setShowUpload(false);
    };

    return (
        <div className="dashboard-view bg-dark3 p-5 text-center" style={{ width: "100%" }}>
            <Row>
                <Col lg={3} md={4} xs={12} sm={12}>
                    <DashboardCard title={"Cases"} icon={"mdi-case-sensitive-alt"} footerText={""} number={7} color={"success"} />
                </Col>
                <Col lg={3} md={4} xs={12} sm={12}>
                    <DashboardCard title={"Statute"} icon={"mdi-scale-balance"} footerText={""} number={3} color={"danger"} />
                </Col>
                <Col lg={3} md={4} xs={12} sm={12}>
                    <DashboardCard title={"Community"} icon={"mdi-account"} footerText={""} number={3} color={"warning"} />
                </Col>
                <Col lg={3} md={4} xs={12} sm={12}>
                    <DashboardCard title={"Caselaw"} icon={"mdi-note-outline"} footerText={""} number={12} color={"success"} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={12}>
                    {showUpload && (
                        <div className="d-flex justify-content-start mb-2">
                            <button className="back-button" onClick={handleBackClick}>
                                <IoArrowBackCircle size={30} />
                            </button>
                        </div>
                    )}
                    {!showUpload && <ActionCard onHelpClick={handleHelpClick} />}
                    {showUpload && <MultiFileUpload />}
                </Col>
            </Row>
        </div>
    );
}

export default DashboardView;
