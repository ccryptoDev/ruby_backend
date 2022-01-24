import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { Sequins } from "../../../shared/components/Sequins";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import Logo from "../../../shared/components/Logo";

const UpdateForm = ({
  error,
  isUpdating,
  onReset,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) => {
  return (
    <>
      <div className="mt-5 ml-5">
        <Logo color="black" />
      </div>
      <div className="authentication-wrapper authentication-2 px-4">
        <div className="authentication-inner-right py-5">
          <div className="publicPage">
            <div className="logoWrapper">
              <Sequins />
            </div>
            <div className="header">
              <div className="title">Reset Password.</div>
              <div className="subtitle">
                Enter new password of your account.
              </div>
            </div>
            <form className="my-5">
              <Form.Group>
                <Form.Label className="d-flex justify-content-between align-items-end">
                  <div className="label">New Password</div>
                </Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
                  isInvalid={!!error}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex justify-content-between align-items-end">
                  <div className="label">New Password Confirmation</div>
                </Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  type="password"
                  value={confirmPassword}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center m-0">
                <Button
                  variant="primary"
                  className="cta"
                  onClick={onReset}
                  disabled={isUpdating}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
