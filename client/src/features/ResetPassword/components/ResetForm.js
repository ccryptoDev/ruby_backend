import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { Sequins } from "../../../shared/components/Sequins";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";

export const ResetForm = ({ email, error, isUpdating, onReset, setEmail }) => {
  return (
    <div className="authentication-wrapper authentication-2 px-4">
      <div className="authentication-inner-right py-5">
        <div className="publicPage">
          <div className="logoWrapper">
            <Sequins />
          </div>
          <div className="header">
            <div className="title">Forgot Password.</div>
            <div className="subtitle">
              Enter your email address, and we will send you a link to reset
              your password.
            </div>
          </div>
          <Form.Group>
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="form-input-font"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="cta" onClick={onReset} disabled={isUpdating}>
            Send password reset email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
