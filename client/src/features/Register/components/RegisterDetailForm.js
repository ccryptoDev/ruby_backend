import React, {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import Helper from "../../../shared/utils/utils";

import Logo from "../../../shared/components/Logo";
import img_visa from "../../../shared/assets/images/visa.png";
import img_plaid from "../../../shared/assets/images/plaid.png";
import img_ideo from "../../../shared/assets/images/ideo.png";
import img_check from "../../../shared/assets/images/check.png";
import img_key from "../../../shared/assets/images/key.png";

const RegisterDetailForm = ({
  isRegistering,
  setFormNew,
  setRegisterGoForm,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber
}) => {
  const [errorFirst, setErrorFirst] = useState(null);
  const [errorLast, setErrorLast] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);

  useEffect(() => {
    setErrorFirst(null);
    setErrorLast(null);
    setErrorPhone(null);
  }, [firstName, lastName, phoneNumber]);

  const handleSubmit = async () => {
    if (!valicationCheck()) return;
    setRegisterGoForm()
  }

  const valicationCheck = () => {
    if (firstName.length < 1) {
      setErrorFirst(`First name can't be empty`);
      return false;
    }
    if (lastName.length < 1) {
      setErrorLast(`Last name can't be empty`);
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
      <div className="register-logo mt-5 ml-5">
        <Logo color="black" />
      </div>
      <div className="authentication-wrapper authentication-2 position-fixed">
        <div className="row ">
          <div className="authentication-inner publicPage">
            <div className="header">
              <div className="title m-t-36">
                Welcome to Sequin! Just a Few More Quick Details from You.
              </div>
            </div>
            <form className="mt-5">
              <Form.Group>
                <Form.Label className="normal-label">First Name</Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  value={firstName}
                  isInvalid={Boolean(errorFirst)}
                />
                <Form.Control.Feedback type="invalid">
                  {errorFirst}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="normal-label">Last Name</Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  value={lastName}
                  isInvalid={Boolean(errorLast)}
                />
                <Form.Control.Feedback type="invalid">
                  {errorLast}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="normal-label">
                  Preferred Mobile Number
                </Form.Label>
                <Form.Control
                  className="form-input-font"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  type="tel"
                  maxLength="10"
                  value={phoneNumber}
                  isInvalid={errorPhone}
                />
                <Form.Control.Feedback type="invalid">
                  {errorPhone}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="flex-row-space m-t-22">
                <Button
                  variant="primary"
                  className="cta-outline col-5 mb-0 mt-0"
                  onClick={() => setFormNew()}
                  disabled={isRegistering}
                >
                  back
                </Button>
                <Button
                  variant="primary"
                  className="cta col-5 mt-0"
                  onClick={() => handleSubmit()}
                  disabled={isRegistering}
                >
                  Let's Go!
                </Button>
              </div>
              
            </form>{" "}
          </div>

          <div
            className="authentication-inner-right col-6 comment-page"
            style={{ paddingLeft: "60px" }}
          >
            <div className="header text-center m-t-22">
              Why is Sequin is asking for this information?
            </div>
            <div className="content">
              Your information allows us to securely retrieve your credit scores
              and provide personalized recommendations on how you can become a
              credit rockstar. We’ve partnered with the best to make sure your
              information is safe with us.
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <img src={img_visa} width="56" height="18" className="mr-2" alt="visa img"/>
              <img
                src={img_plaid}
                width="68"
                height="26"
                className="mx-2"
                alt="plaid img"
              />
              <img src={img_ideo} width="79" height="18" className="mx-2" alt="ideo img"/>
            </div>

            <div className="d-flex justify-content-start align-items-start mt-5">
              <div className="d-flex align-items-center">
                <div className="header mt-0">Information Security</div>
                <img src={img_key} width="13" height="19" className="mx-2" alt="key img" />
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-start mt-3">
              <img
                src={img_check}
                width="14"
                height="14"
                className="mt-1 mr-3"
                alt="check img"
              />
              <div className="content mt-0">
                Sequin uses 256-bit encryption to secure the transmission of
                your information on our platform.
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-start">
              <img
                src={img_check}
                width="14"
                height="14"
                className="mt-1 mr-3"
                alt="check img"
              />
              <div className="content mt-0">
                Sequin does not share your personal information with
                unaffiliated third parties for their own marketing purposes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterDetailForm;
