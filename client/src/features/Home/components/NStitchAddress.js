import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";

import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";
import { 
  userIdentify,
  efxConfig
} from '../../../store/actions/nstitch.action';

import { 
  efxOauthToken, 
  efxScoreLastest 
} from "../../../store/actions/efxApi.action";

import "./NHome.scss";

const NStitchAddress = ({
  dob,
  mobile,
  ssn,
  street,
  state,
  city,
  zipCode,
  setStreet,
  setState,
  setCity,
  setZipCode,
  isRegistering,
  setNStitchSms,
  uToken,
  setNStitchIdentity,
  setNStitchWelcome,
  userIdentify,
  efxConfig,
  efxOauthToken,
  efxScoreLastest
}) => {
  const [errorStreet, setErrorStreet] = useState(null);
  const [errorSatus, setErrorSatus] = useState(null);
  const [errorCity, setErrorCity] = useState(null);
  const [errorZipCode, setErrorZipCode] = useState(null);

  useEffect(() => {
    setErrorStreet(null);
    setErrorSatus(null);
    setErrorCity(null);
    setErrorZipCode(null);
  }, [ street, state, city, zipCode ]);

  const handleSubmit = () => {
    // if (!validationCheck()) return;
    userIdentify({
      dob: '1972-07-02',
      mobile: '0000000000',
      ssn: '666296598',
      street1: '6939 W GEORGE ST',
      street2: '101',
      city: 'BOTHELL',
      state: 'WA',
      zip: '98011',
      uToken
    }).then(res => {
      let response = res.value;
      if (response) {
        if (response.idpass === false) {
          setNStitchSms();
        } else {
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
    })
  }

  const validationCheck = () => {
    if (street.length < 1) {
      setErrorStreet(`Street can't be empty`);
      return false;
    }
    if (state.length < 1) {
      setErrorSatus(`State can't be empty`);
      return false;
    }
    if (city.length < 1) {
      setErrorCity(`City can't be empty`);
      return false;
    }
    if (zipCode.length < 1 || isNaN(zipCode)) {
      setErrorZipCode(`Zip code can't be empty`);
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
      <div
        className="stitch-back"
        onClick={() => setNStitchIdentity()}  
      >
        Back
      </div>
      <div className="card-page m-t-14">
        <form>
          <Form.Group className="m-b-14">
            <Form.Label className="stitch-label mb-0">Street Address</Form.Label>
            <Form.Control
              className="input-font-style m-t-10"
              onChange={(e) => setStreet(e.target.value)}
              required
              placeholder="Address Here"
              value={street}
              isInvalid={Boolean(errorStreet)}
            />
            <Form.Control.Feedback type="invalid">
              {errorStreet}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="m-b-14">
            <Form.Label className="stitch-label mb-0">State</Form.Label>
            <Form.Control
              className="input-font-style m-t-10"
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="State"
              value={state}
              isInvalid={Boolean(errorSatus)}
            />
            <Form.Control.Feedback type="invalid">
              {errorSatus}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mr-2 m-b-14">
              <Form.Label className="stitch-label mb-0">City</Form.Label>
              <Form.Control
                className="input-font-style m-t-10"
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
                value={city}
                isInvalid={Boolean(errorCity)}
              />
              <Form.Control.Feedback type="invalid">
                {errorCity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="ml-2 m-b-14">
              <Form.Label className="stitch-label mb-0">Zip Code</Form.Label>
              <Form.Control
                className="input-font-style m-t-10"
                onChange={(e) => setZipCode(e.target.value)}
                required
                placeholder="Zip Code"
                value={zipCode}
                isInvalid={Boolean(errorZipCode)}
              />
              <Form.Control.Feedback type="invalid">
                {errorZipCode}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              onClick={(e) => setChecked(e.target.checked)}
              checked={checked}
              className="form-check-input stitch-form-check"
            />
            <span
              className="form-check-label m-t-2"
              style={{ fontSize: "12px" }}
            >
              You understand that by clicking “Continue”, you are explicitly
              agreeing to and providing “written instructions” to
              StitchCredit under the Fair Credit Reporting Act to obtain my
              credit information from one or more of the three nationwide
              credit reporting agencies. Third-party sources, including your
              mobile carrier may be used to verify your identity. You
              authorize StitchCredit to obtain such information for you to
              confirm your identity, and, for as long as you are a member of
              StitchCredit, to provide you with your credit information. You
              may elect to terminate your account and this authorization at
              any time.
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
            Next
          </Button>
          <PoweredBy />
        </div>
    </>
  );
};

function mapStateToProps({ nstitch }) {
  return {
    uToken: nstitch.details.uToken
  }
}

export default connect(mapStateToProps, {
  userIdentify,
  efxConfig,
  efxOauthToken, 
  efxScoreLastest
})(NStitchAddress);