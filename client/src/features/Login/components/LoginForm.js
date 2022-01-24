import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { Sequins } from "../../../shared/components/Sequins";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import Logo from "../../../shared/components/Logo";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  isLoggingIn,
  error,
}) => {
  return (
    <>
      <div className="mt-5 ml-5">
        <Logo color="black" />
      </div>
      <div className="authentication-wrapper authentication-2 px-4">
        <div className="authentication-inner py-5">
          <div className="publicPage">
            <div className="logoWrapper">
              <Sequins />
            </div>
            <div className="header">
              <div className="title">Welcome back to Sequin.</div>
              <div className="subtitle">
                Log in to continue your credit journey.
              </div>
            </div>
            <form className="my-5">
              <Form.Group>
                <Form.Label className="label">Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex justify-content-between align-items-end">
                  <div className="label">Password</div>
                  <a
                    href="/password_resets/new"
                    className="d-block linkCopy font-14"
                  >
                    Forgot password?
                  </a>
                </Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
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
                  onClick={onSubmit}
                  disabled={isLoggingIn}
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="text-center text-muted">
              Don't have an account yet?{" "}
              <a href="/register" className="linkCopy">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
