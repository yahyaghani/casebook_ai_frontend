import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";

function ActionCard({ onHelpClick }) {
    return (
        <Card className="dashboard-card">
            <CardBody>
                <Row>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">🏠 Accelerate construction</Button>
                    </Col>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">📑 Amend a contract</Button>
                    </Col>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">✏️ Appoint a sales agent</Button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">🏷️ Appoint exclusive distributor</Button>
                    </Col>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">🖨️ Appoint franchise licensee</Button>
                    </Col>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">📃 Assign copyright in music</Button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">🙍 Back-to-back subcontract</Button>
                    </Col>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">🖋️ Collaborate with partners</Button>
                    </Col>
                    <Col lg={4} md={6} xs={12} sm={12}>
                        <Button className="action-button">💼 Commission music</Button>
                    </Col>
                </Row>
                <Row className="mt-4 justify-content-center">
                    <Button className="important-button" onClick={onHelpClick}>Help me with a new case</Button>
                </Row>
            </CardBody>
        </Card>
    );
}

export default ActionCard;
