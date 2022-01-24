import * as React from "react";
import { Col, Card, Button, Form } from "react-bootstrap";
import "./Home.scss";

export const ActionTile = ({
  tileHeader,
  description,
  ctaCopy,
  ctaOnClick,
  ctaProps,
  eventName,
}) => {
  return (
    <Col xs={12} md={4}>
      <Card className="mb-4 weeklyTask section">
        <Card.Body className="align-items-center">
          <div className="tileHeader">{tileHeader}</div>
          <div className="description">{description}</div>
            <Button className="cta" onClick={() => ctaOnClick(ctaProps, eventName)}>
              {ctaCopy}
            </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
