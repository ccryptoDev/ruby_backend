import * as React from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Helper from "../../../shared/utils/utils";

import "./Settings.scss";

export const Settings = ({
  creditLimit,
  onSubmit,
  onUpdateUtilization,
  setUtilizationValue,
  userDetails,
  utilizationValue,
}) => {
  // TODO styling

  return (
    <>
      <h4 className="font-weight-bold py-3 mb-4">Settings</h4>
      <div className="settingsWrapper">
        Personal Details
        {/* NOTE: Disabled Tabs for MVP */}
        {/* <Tabs defaultActiveKey="personalDetails" id="uncontrolled-tab-example">
          <Tab eventKey="personalDetails" title="Personal Details"> */}
            <div className="tabContent">
              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      defaultValue={userDetails.email}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPhoneNumber">
                  <Form.Label column sm={2}>
                    Phone number
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="tel"
                      defaultValue={userDetails.phoneNumber}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="New Password" />
                  </Col>
                </Form.Group>
                <Button type="submit" onSubmit={onSubmit}>
                  Save
                </Button>
              </Form>
            </div>
          {/* </Tab> */}
          {/* <Tab eventKey="cardInfo" title="Card Information">
            <div className="tabContent">TODO: Need designs</div>
          </Tab>
          <Tab eventKey="creditRegimen" title="Credit Regimen">
            <div className="tabContent">
              <div>
                At Sequin, we understand that everyone has different payment and
                credit capabilities. If you feel like your regimen is too tough
                to nail every week, or too easy, please tweak it below. Sequin
                recommends setting it to{" "}
                <span className="emphasizedCopy">10%</span> if possible, and to{" "}
                <i className="emphasizedCopy">not exceed 30%</i>.
              </div>
              <div className="creditRegimenSteps">
                <Row>
                  <Col className="step">
                    <Form>
                      <Form.Group controlId="formUtilization">
                        <div className="stepTitle">
                          Step 1: Set your Utilization Level
                        </div>
                        <div className="updatedValue">{`${utilizationValue}%`}</div>
                        <div className="stepCopy">of your credit line</div>
                        <Form.Control
                          type="range"
                          value={utilizationValue}
                          min={0}
                          max={30}
                          step={1}
                          onChange={(e) => setUtilizationValue(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <div className="stepTitle">
                      Step 2: OK your Payment Amount
                    </div>
                    <div className="updatedValue">
                      {`${Helper.formatToDollar(
                        (utilizationValue / 100) * creditLimit,
                      )} / ${Helper.formatToDollar(creditLimit)}`}
                    </div>
                    <div className="stepCopy">is your weekly payment</div>
                  </Col>
                </Row>
              </div>
              <Button type="submit" onSubmit={onUpdateUtilization}>
                Save
              </Button>
            </div>
          </Tab>
        </Tabs> */}
      </div>
    </>
  );
};

export default Settings;
