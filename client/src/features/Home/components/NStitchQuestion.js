import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";

import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";

import DropDownTmpl from '../../../shared/components/DropDown/DropDown';
import "./NHome.scss";

export const NStitchQuestion = ({
  selectedQeustion,
  answer,
  setSelectedQeustion,
  setAnswer,
  isRegistering,
  setNStitchIdentity
}) => {
  const itemsInfo = [
    {
      id: 1,
      name: 'View 1',
    },
    {
      id: 2,
      name: 'View 2',
    },
    {
      id: 3,
      name: 'View 3',
    },
    {
      id: 4,
      name: 'View 4',
    },
    {
      id: 5,
      name: 'View 5',
    }
  ];
  const [errorAnswer, setErrorAnswer] = useState(null);
  const [errorQuestion, setErrorQuestion] = useState(null);
  // const dropdownInputRef = useRef(null);
  useEffect(() => {
    setErrorQuestion(null);
    setErrorAnswer(null);
  }, [ selectedQeustion, answer ]);

  const handleSubmit = () => {
    // if (!validationCheck() ) return;
    setNStitchIdentity();
  }

  // if (selectedQeustion > 0 ) {
  //   (dropdownInputRef.current) = ' ';
  // }
  const validationCheck = () => {
    // if (Boolean(dropdownInputRef.current) == false) {
    //   setErrorQuestion(`Question can't be empty`);
    //   return false;
    // }
    if (answer.length < 1) {
      setErrorAnswer(`Answer can't be empty`);
      return false;
    }
    return true;
  }
  
  const [checked, setChecked] = useState(null);
  if ( checked !== true ) {
    isRegistering = true;
  }
  return (
    <>
      <div className="card-page mt-4">
        <form>
          <Form.Group>
            <Form.Label className="stitch-label">
              Security Question
            </Form.Label>
            <DropDownTmpl
              items={itemsInfo}
              size="wd-100 question-dropdown m-t-12"
              textInfo="Select a Question"
              getSelectedCategory={(index) => setSelectedQeustion(index)}
              // ref={dropdownInputRef}
            />
            <p className="invalid-feedback d-block mb-0">
              {errorQuestion}
            </p>
          </Form.Group>
          <Form.Group>
            <Form.Label className="stitch-label m-t-18 mb-0">
              Security Question Answer
            </Form.Label>
            <Form.Control
              className="input-font-style stitch-form-input border-credit m-t-12"
              onChange={(e) => setAnswer(e.target.value)}
              required
              placeholder="Type answer here"
              value={answer}
              isInvalid={Boolean(errorAnswer)}
            />
            <Form.Control.Feedback type="invalid">
              {errorAnswer}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="form-check">
            <input
              type="checkbox"
              onClick={(e) => setChecked(e.target.checked)}
              checked={checked}
              className="form-check-input stitch-form-check mr-0"
            />
            <span className="form-check-label">
              By clicking "Register” and creating an account you accept
              StitchCredit’s Terms of Use and Privacy Policy. StitchCredit
              does not maintain critical personal data, much less sell or
              otherwise disclose your personal information to anyone else.
              You may opt- out of email correspondence, except confirmation
              Emails, which often contain important information about your
              account.
            </span>
          </div>
        </form>
      </div>
      <div className="action">
          <Button
            variant="primary"
            className="cta col-5"
            onClick={() => handleSubmit()}
            // disabled={isRegistering}
          >
            Register
          </Button>
          <PoweredBy />
        </div>
    </>
  );
};
