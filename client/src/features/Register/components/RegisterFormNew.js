import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Sequins } from "../../../shared/components/Sequins";
import Helper from "../../../shared/utils/utils";

import Logo from "../../../shared/components/Logo";
import img_visa from "../../../shared/assets/images/visa.png";
import img_plaid from "../../../shared/assets/images/plaid.png";
import img_ideo from "../../../shared/assets/images/ideo.png";
import img_visa_color from "../../../shared/assets/images/visa_color.png";
import img_graph from "../../../shared/assets/images/graph.png";
import img_calendar from "../../../shared/assets/images/calendar.png";

const RegisterFormNew = ({
  isRegistering,
  setRegisterDetailForm,
  email,
  password,
  setEmail,
  setPassword
}) => {
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorpassword] = useState(null);

  useEffect(() => {
    setErrorEmail(null);
    setErrorpassword(null);
  }, [email, password]);

  const handleSubmit = () => {
    if (!validationCheck()) return;
    setRegisterDetailForm();
  }

  const validationCheck = () => {
    if (email.length < 1) {
      setErrorEmail(`Email can't be empty`);
      return false;
    } else {
      if (!Helper.validateEmail(email)) {
        setErrorEmail("Email is invalid");
        return false;
      }
    }
    if (password.length < 1) {
      setErrorpassword(`Password can't be empty`);
      return false
    } else if (password.length < 6) {
      setErrorpassword("Password length should be 6 at least");
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="register-logo mt-5 ml-5">
        <Logo color="black" />
      </div>
      <div className="authentication-wrapper authentication-2 position-fixed px-4">
        <div className="row ">
          <div className="authentication-inner py-5 publicPage">
            <div className="logoWrapper">
              <Sequins />
            </div>
            <div className="header">
              <div className="title">Welcome to the Sequin Beta!</div>
              <div className="subtitle">
                Create a Sequin account to get personalized credit building
                suggestions to reach your full credit potential.
              </div>
            </div>
            <form className="my-0">
              <Form.Group>
                <Form.Label className="label">Email</Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  isInvalid={Boolean(errorEmail)}
                />
                <Form.Control.Feedback type="invalid">
                  {errorEmail}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">Create Password</Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
                  isInvalid={Boolean(errorPassword)}
                />
                <Form.Control.Feedback type="invalid">
                  {errorPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                className="cta"
                onClick={() => handleSubmit()}
                disabled={isRegistering}
              >
                Create Profile
              </Button>
              <a
                className="cta-outline btn btn-primary"
                href="/home"
              >
                Sign In
              </a>
            </form>
            <div className="text-center text-muted font-16 mt-2">
              Powered by:
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <img src={img_visa} width="56" height="18" className="mx-2" alt="visa img" />
              <img
                src={img_plaid}
                width="68"
                height="26"
                className="mx-2"
                alt="plaid img"
              />
              <img src={img_ideo} width="79" height="18" className="mx-2" alt="ideo img" /> 
            </div>
          </div>

          <div
            className="authentication-inner-right col-6 comment-page"
            style={{ maxWidth: "510px" }}
          >
            <div className="header d-flex justify-content-center">
              <p>Sequin is on a mission to get women the credit we deserve.</p>
            </div>
            <div className="ml-3">
              <div className="d-flex justify-content-start mt-3">
                <div className="rounded-circle circle d-flex justify-content-center align-items-center">
                  <img
                    src={img_visa_color}
                    width="36"
                    height="20"
                    className="mx-2"
                    alt="visa color img"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <div className="title">
                    Get personalized credit recommendations.
                  </div>
                  <div className="content">
                    As an official VISA partner, we securely analyze your credit
                    behavior to give you personalized suggestions to get your
                    best credit score.
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <div className="rounded-circle circle d-flex justify-content-center align-items-center">
                  <img
                    src={img_graph}
                    width="22"
                    height="22"
                    className="mx-2"
                    alt="graph img"
                  />
                </div>
                <div className="flex-1 ml-3">
                  <div className="title">
                    Reach your credit score potential.
                  </div>
                  <div className="content pr-3">
                    At any point in the month, you should be using a small
                    portion of your credit limit. We let you know when to pay
                    off and how much.
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-start mt-4">
                <div className="rounded-circle circle d-flex justify-content-center align-items-center">
                  <img
                    src={img_calendar}
                    width="22"
                    height="22"
                    className="mx-2"
                    alt="calendar img"
                  />
                </div>
                <div className="flex-1 ml-3">
                  <div className="title">Never miss a payment again.</div>
                  <div className="content pr-3">
                    We’ve got your back with smart reminders on key payment
                    dates so you don’t make avoidable credit mistakes. Join
                    thousands of women in the 800+ credit score club!
                  </div>
                </div>
              </div>
            </div>
            <div className="footer d-flex justify-content-center">
              <p className="mb-0">Join thousands of women on the path to financial freedom.</p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterFormNew;
