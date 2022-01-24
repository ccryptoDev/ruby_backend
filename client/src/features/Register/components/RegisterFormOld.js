import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { Sequins } from "../../../shared/Sequins";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import Logo from "../../../shared/logo";

export const RegisterForm = ({
  email,
  error,
  firstName,
  isRegistering,
  lastName,
  onSubmit,
  password,
  phoneNumber,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setPhoneNumber,
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
              <div className="title">Welcome to the Sequin Beta!</div>
              <div className="subtitle">
                Sequin is a credit management application designed to help boost your credit score. Learn how it works <a style={{color: "#ff6c4b"}} href="https://www.youtube.com/watch?v=WVOZDKTG1mw">here</a>. Let’s get started by creating your login details.
              </div>
              <div className="subtitle" style={{fontSize: '14px'}}>
                At Sequin, we take security seriously. We are official VISA, Plaid, and IDEO partners. 
              </div>
            </div>
            <form className="my-4">
              <Form.Group>
                <Form.Label className="label">
                  What is your first name?
                </Form.Label>
                <Form.Control
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  value={firstName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">What is your last name?</Form.Label>
                <Form.Control
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  value={lastName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">
                  What's your preferred mobile number?
                </Form.Label>
                <Form.Control
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  type="tel"
                  value={phoneNumber}
                  isInvalid={error === "Invalid phone number"}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">
                  What's your email address?
                </Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  isInvalid={error === "Invalid email or password"}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">
                  Finally, pick a password.
                </Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
                  isInvalid={error === "Invalid email or password"}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                onClick={onSubmit}
                className="cta"
                disabled={isRegistering}
              >
                Let's get started
              </Button>
              <div className="text-muted small p-2 mt-4">
                {`By clicking "Let's get started", you agree to our `}
                <a
                  className="linkCopy"
                  href="https://www.sequincard.com/terms/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  terms of service
                </a>
                {` and `}
                <a
                  className="linkCopy"
                  href="https://www.sequincard.com/privacy/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  privacy policy
                </a>
                . We'll occasionally send you account related emails.
              </div>
            </form>
            <div className="text-center text-muted">
              Already have an account?{" "}
              <a href="/login" className="linkCopy">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
