import * as React from "react";
import { Col, Card, Button } from "react-bootstrap";
import "./Home.scss";

export const WeeklyTask = ({
  title,
  emphasis,
  description,
  isComplete,
  numSequinsToEarn,
  ctaCopy,
  ctaOnClick,
}) => {
  return (
    <Col>
      <Card className="mb-4 weeklyTask section">
        <Card.Body className="align-items-center">
          {/* {isComplete ? (
            <i className="status complete fas fa-check"></i>
          ) : (
            <div className="status incomplete" />
          )} */}
          <div className="title">{title}</div>
          <div className="emphasis">{emphasis}</div>
          <div className="description">{description}</div>
          {/* <div className="text-small mb-3 sequins">
              {`Earn ${numSequinsToEarn} Sequins`}
            </div> */}
          {isComplete ? (
            <Button className="cta completed">Completed</Button>
          ) : (
            <Button className="cta" onClick={ctaOnClick}>
              {ctaCopy}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};
