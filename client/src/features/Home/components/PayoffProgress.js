import * as React from "react";
import { Col, Card, Row } from "react-bootstrap";
import "./Home.scss";

export const PayoffProgress = ({financials}) => {
  var payoffs = []
  var totalPayoffs = 0
  // if (financials.length) {
  //   payoffs = financials.filter(f => f.isPayoff)
  //   totalPayoffs = payoffs.reduce(function(prev, cur) {
  //     return prev + parseFloat(cur.lastPaymentAmount)
  //   }, 0.0)
  // }

  const formatDate = (datestr) => {
    const d = new Date(datestr)
    return d.getMonth() + 1+ "/" + d.getDate()+ "/" + d.getUTCFullYear() % 100
  }

  return (
    <div className="sectionWrapper payoffs">
      <h4 className="sectionTitle mt-4 ml-3">Your Sequin Payoff History:</h4>
      <Col>
        <Card className="mb-4 section">
          <Card.Body className="align-items-center">
            <Row>
              <Col className="header" xs={4}>
                Date of<br />Payment
              </Col>
              <Col className="header text-right" xs={4}>
                Amount Paid Off
              </Col>
              <Col className="header text-right" xs={4}>
                Utilization at Payment
              </Col>
            </Row>
            <hr />
            {
              payoffs.length == 0 ? 
              <Row className="payoff-text text-center">
                <Col>No payoffs found yet!</Col>
              </Row>
              :
              payoffs.map((payoff, index) => (
                <div key={index}>
                  <Row>
                    <Col className="payoff-text" xs={4}>
                      {formatDate(payoff.updatedAt)}
                    </Col>
                    <Col className="payoff-text text-right" xs={4}>
                      {"$"+parseFloat(payoff.lastPaymentAmount).toFixed(2)}
                    </Col>
                    <Col className="payoff-text text-right" xs={4}>
                      {Math.round(payoff.utilization * 100) + "%"}
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}
              {
                payoffs.length == 0 ? <></>
                :
                <Row style={{fontSize: '16px', marginLeft: '10px'}}><span className="grey mr-1">Total Paid: </span> <span className="purple">{"$"+(totalPayoffs).toFixed(2)}</span></Row>
              }
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
