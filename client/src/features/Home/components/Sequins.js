import * as React from "react";
import { Button, Col, Card, ProgressBar } from "react-bootstrap";
import { Sequins as SequinsSVG } from "../../../shared/Sequins";
import "./Home.scss";

export const Sequins = ({ isCardLinked, numSequins, onOpenPlaidLink }) => {
  return (
    <div className="sectionWrapper yourSequins">
      <h4 className="font-weight-bold mt-4 ml-3">Your Sequins</h4>
      <Col>
        <Card className="mb-4 section">
          <Card.Body className="align-items-center">
            <div className="styledSequins">
              <SequinsSVG />
            </div>
            <div className="title">You've Earned</div>
            <div className="emphasis">{`${numSequins} Sequins`}</div>
            <div className="progressBar">
              <ProgressBar now={numSequins} />{" "}
            </div>
            <div className="nextMilestone">
              1,000 more until your next donation!
            </div>
            {isCardLinked ? (
              <Button className="sequinsCta">Learn More</Button>
            ) : (
              <Button className="sequinsCta" onClick={onOpenPlaidLink}>
                Link Bank Account to Unlock Sequins
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
