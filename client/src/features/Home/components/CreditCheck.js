import * as React from "react";
import { Col, Card } from "react-bootstrap";
import "./Home.scss";

export const CreditCheck = () => {
  return (
    <div id="credit-check" name="credit-check" className="sectionWrapper">
      <h4 className="sectionTitle mt-4 ml-3">Get Your Credit Score (Free)</h4>
      <p style={{fontSize: '14px', marginLeft: '16px'}}>Checking your credit score will not affect your credit.</p>
      <Col>
        <Card className="mb-4 section">
          <Card.Body className="align-items-center">
            <div className="iframeWrapper">
              <iframe
                title="Stitch Credit"
                src="https://efx-wgt.stitchcredit.com/api/users/start?key=60afbfc4-da0b-4e07-8e14-a2961ec80f5e"
                width="100%"
                height="100%"
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
