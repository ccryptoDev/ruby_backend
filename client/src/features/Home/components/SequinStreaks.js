import * as React from "react";
import { Col, Card } from "react-bootstrap";
import "./Home.scss";

export const SequinStreaks = () => {
  return (
    <div className="sectionWrapper">
      <h4 className="font-weight-bold mt-4 ml-3">Your Sequin Streaks</h4>
      <Col>
        <Card className="mb-4 section">
          <Card.Body className="align-items-center">
            <div>(coming soon)</div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
