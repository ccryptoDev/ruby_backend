import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { Sequins } from "../../../shared/components/Sequins";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import Logo from "../../../shared/components/Logo";
import img_visa from "../../../shared/assets/images/visa.png";
import img_plaid from "../../../shared/assets/images/plaid.png";
import img_ideo from "../../../shared/assets/images/ideo.png";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  onRegister,
  isLoggingIn,
  error,
  errors,
  corrects,
}) => {
  return (
    <div className="login-back">
      <div className="login-logo pt-5 ml-5">
        <Logo color="black" />
      </div>
      <div className="authentication-wrapper authentication-2 px-4 position-fixed">
        <div className="authentication-inner py-5">
          <div className="publicPage">
            <div className="logoWrapper">
              <Sequins />
            </div>
            <div className="header">
              <div className="title">Welcome back to Sequin!</div>
              <div className="subtitle">
                Log in to continue your credit journey.
              </div>
            </div>
            <form className="my-3">
              <Form.Group className="pt-3">
                <Form.Label className="label">Email</Form.Label>
                <Form.Control className="form-input-font"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  isValid={!!corrects.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">Password</Form.Label>
                <Form.Control className="form-input-font"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
                  isValid={!!corrects.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <Form.Label>
                  <a
                    href="/password_resets/new"
                    className="d-block linkCopy font-14"
                  >
                    Forgot password?
                  </a>
                </Form.Label>
              </Form.Group>
              <Button
                variant="primary"
                className="cta"
                onClick={onSubmit}
                disabled={isLoggingIn}
              >
                Login
              </Button>
              <Button
                variant="primary"
                className="cta-outline"
                onClick={onRegister}
              >
                Don’t Have An Account? Sign Up
              </Button>
            </form>
            <div className="text-center text-muted font-16">Powered by:</div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <img src={img_visa} width="56" height="18" className="mx-2"></img>
              <img
                src={img_plaid}
                width="68"
                height="26"
                className="mx-2"
              ></img>
              <img src={img_ideo} width="79" height="18" className="mx-2"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
