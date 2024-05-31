import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";

function ActionCard({ onHelpClick }) {
    return (
        <Card className="dashboard-card">
            <CardBody>
                <Row>
                    <Col lg={3} md={6} xs={12} sm={12}>
                        <Button className="action-button">📄 Pleadings</Button>
                    </Col>
                    <Col lg={3} md={6} xs={12} sm={12}>
                        <Button className="action-button">🔍 Discovery</Button>
                    </Col>
                    <Col lg={3} md={6} xs={12} sm={12}>
                        <Button className="action-button">⚖️ Trial</Button>
                    </Col>
                    <Col lg={3} md={6} xs={12} sm={12}>
                        <Button className="action-button">📜 Appeal</Button>
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
