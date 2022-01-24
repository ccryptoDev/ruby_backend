import * as React from "react";
import { Col, Card, Button, Form, Row } from "react-bootstrap";
import ToggleButton from "../../../shared/components/ToggleButton/ToggleButton"
import "./Home.scss";
import amplitude from 'amplitude-js';

export const GetReminded = ({
  onToggleAlerts,
  user,
  token
}) => {
  var [enableAlerts, setEnableAlerts] = React.useState(user.details.enableAlerts)

  function onCheck(e) {
    setEnableAlerts(e.target.checked)
    onToggleAlerts({token: token, enableAlerts: e.target.checked})
    amplitude.getInstance().logEvent('TOGGLE_ALERTS', {'enabled': e.target.checked});
  }

  return (
    <Col xs={12} md={4}>
      <Card className="mb-4 weeklyTask section">
        <Card.Body className="align-items-center">
          <div className="tileHeader">1. Sequin Payoff Alerts</div>
          <div className="description">
            We got your back. By signing up for Sequin Payoff Alerts, you’ll receive the following text messages:
            <br />
            <b>• Credit Utilization</b> When your balance is high to avoid red flags
            <br />
            <b>• Monthly Payment</b> When your bill is due so you never miss a payment
            <br />
            <b>• Confirmation</b> That your payment has been completed
          </div>
          <hr />
          <Row className="switch-row">
            <Col xs={11}><div className="toggleTitle">Receive Sequin Payoff Alerts</div></Col>
            <Col xs={1}><Form.Check checked={enableAlerts} onChange={onCheck} aria-label="option 1"/></Col>
            {/* <ToggleButton className="reminderToggle" Name='Remind Me' /> */}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
