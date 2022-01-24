import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";

import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";

import "./NHome.scss";
import { connect } from "react-redux";
import { 
  verifyCode,
  renewCode,
  efxConfig
} from '../../../store/actions/nstitch.action';

import { 
  efxOauthToken, 
  efxScoreLastest 
} from "../../../store/actions/efxApi.action";

const NStitchVerifyCode = ({
  uToken,
  mTransactionKey,
  passcode,
  verifyCode,
  efxConfig,
  efxOauthToken,
  efxScoreLastest,
  isRegistering,
  setNStitchQuiz,
  setNStitchWelcome
}) => {
  const [errorVCode, setErrorVCode] = useState(null);
  const [ vCode, setVCode] = useState('');

  useEffect(() => {
    setErrorVCode(null);
  }, [ vCode ]);

  const handleSubmit = () => {
    // if (!validationCheck()) return;
    verifyCode({
      uToken,
      mTransactionKey,
      passcode
    }).then((res) => {
      let response = res.value;
      // if (vCode === passcode) {
        if (response) {
          if (response.idpass === false) {
            setErrorVCode('Invaild verify code');
          }  else {
            // already id pass true
            efxConfig({uToken}).then(res => {
              let efxApiKey = res.value.id;
              let efxAssertion = res.value.secret;
              if (efxAssertion && efxAssertion) {
                efxOauthToken({
                  efxApiKey,
                  efxAssertion
                }).then(res => {
                  let efxToken = res.value.access_token;
                  if (efxToken) {
                    efxScoreLastest({efxToken}).then(res => {
                      if (res.value) {
                        setNStitchWelcome();
                      }
                    })
                  }
                })
              }
            })
          }
        }
      // } else {
      //  setErrorVCode('Invaild verify code');
      // }
    })
  }

  const sendNewCode = () => {
    renewCode({
      uToken,
      mTransactionKey
    }).then((res) => {
      console.log(res.value)
    })
  }

  const validationCheck = () => {
    if (vCode.length < 1 || isNaN(vCode)) {
      setErrorVCode(`Verify code can't be empty`);
      return false;
    }
    return true;
  }

  return (
    <>
      <h1 className="card-title">Mobile Identity</h1>
      <div className="card-page mobile-identity">
        <p className="stitch-sms-text">
          Verification Code
        </p>
        <Form.Group className="m-b-14">
          <Form.Label className="stitch-label mb-0">Street Address</Form.Label>
          <Form.Control
            className="input-font-style m-t-10"
            onChange={(e) => setVCode(e.target.value)}
            required
            placeholder="Address Here"
            value={vCode}
            isInvalid={Boolean(errorVCode)}
          />
          <Form.Control.Feedback type="invalid">
            {errorVCode}
          </Form.Control.Feedback>
        </Form.Group>
        <p className="get-it">
          Didn't get it?
          <span
            onClick={() => sendNewCode()}
          >
            Send a New Code
          </span>
        </p>
        <div className="action w-100">
          <Button
            variant="primary"
            className="cta wd-40"
            onClick={() => handleSubmit()}
            disabled={isRegistering}
          >
            Next
          </Button>
          <Button
            variant="primary"
            className="cta wd-40 m-l-10"
            onClick={() => setNStitchQuiz()}
          >
            Skip
          </Button>
          <PoweredBy />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ nstitch }) => {
  console.log(nstitch);
  return {
    uToken: nstitch.details.uToken,
    mTransactionKey: nstitch.details.mTransactionKey,
    passcode: nstitch.details.passcode
  }
}

export default connect(mapStateToProps, {
  verifyCode,
  renewCode,
  efxConfig,
  efxOauthToken,
  efxScoreLastest
})(NStitchVerifyCode)