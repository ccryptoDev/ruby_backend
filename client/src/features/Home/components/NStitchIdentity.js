import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Helper from "../../../shared/utils/utils";
import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";

import "./NHome.scss";

export const NStitchIdentity = ({
  securityNum,
  setSecurityNum,
  birthday,
  setBirthday,
  phoneNumber,
  setPhoneNumber,
  isRegistering,
  setNStitchAddress,
  setNStitchQuestion
}) => {
  const [errorSecurityNum, setErrorSecurityNum] = useState(null);
  const [errorBirthday, setErrorBirthday] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);

  useEffect(() => {
    setErrorSecurityNum(null);
    setErrorBirthday(null);
    setErrorPhone(null);
  }, [securityNum, birthday, phoneNumber ]);

  const handleSubmit = () => {
    // if (!validationCheck()) return;
    setNStitchAddress();
  }

  const validationCheck = () => {
    if (securityNum.length < 1) {
      setErrorSecurityNum(`Social security number can't be empty`);
      return false;
    } else {
      if (!Helper.validateSSN(securityNum)) {
        setErrorSecurityNum(`Social security number is invalid`);
        return false;
      }
    }
    if (birthday.length < 1 || !isNaN(birthday)) {
      setErrorBirthday(`Birthday can't be empty`);
      return false;
    }
    if (phoneNumber.length < 1) {
      setErrorPhone(`Mobile number can't be empty`);
      return false;
    } else {
      if (!Helper.validatePhoneNumber(phoneNumber)) {
        setErrorPhone(`Mobile number is invalid`);
        return false;
      }
    }
    return true;
  }

  return (
    <>
      <div>
        <span className="card-title">Identity</span>
      </div>
      <div 
        className="stitch-back mt-3"
        onClick={() => setNStitchQuestion()}
      >
        Back
      </div>
      <div className="card-page mt-4">
        <form>
          <Form.Group>
            <Form.Label className="stitch-label">
              Social Security Number
            </Form.Label>
            <Form.Control
              className="input-font-style m-t-12"
              onChange={(e) => setSecurityNum(e.target.value)}
              required
              placeholder="SSN"
              value={securityNum}
              isInvalid={Boolean(errorSecurityNum)}
            />
            <Form.Control.Feedback type="invalid">
              {errorSecurityNum}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="stitch-label">
              Date of Birth (00/00/0000)
            </Form.Label>
            <Form.Control
              type="date"
              className="input-font-style m-t-12"
              onChange={(e) => setBirthday(e.target.value)}
              required
              placeholder="Date Here"
              value={birthday}
              isInvalid={Boolean(errorBirthday)}
            />
            <Form.Control.Feedback type="invalid">
              {errorBirthday}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="stitch-label">Phone Number</Form.Label>
            <Form.Control
              className="input-font-style m-t-12"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Phone"
              value={phoneNumber}
              maxLength="10"
              isInvalid={Boolean(errorPhone)}
            />
            <Form.Control.Feedback type="invalid">
              {errorPhone}
            </Form.Control.Feedback>
          </Form.Group>
        </form>
      </div>
      <div className="action">
            <Button
              variant="primary"
              className="cta col-5"
              onClick={() => handleSubmit()}
              disabled={isRegistering}
            >
              Next
            </Button>
            <PoweredBy />
          </div>
    </>
  );
};