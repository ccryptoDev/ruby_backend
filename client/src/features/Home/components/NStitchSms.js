import * as React from "react";
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import img_stitch_mark from "../../../shared/assets/images/stitch_mark.png";

import { getMobile, sendCode } from '../../../store/actions/nstitch.action';

import "./NHome.scss";

const NStitchSms = ({
  uToken,
  isRegistering,
  setNStitchSms1,
  setNStitchQuiz,
  getMobile,
  sendCode
}) => {
  const handleSubmit = () => {
    getMobile({uToken}).then((res) => {
      let moToken = res.value.token;
      if (res.value) {
        sendCode({ moToken, uToken }).then((res) => {
          if (res.value) {
            setNStitchSms1();
          }
        })
      }
    })
  }
  return (
    <>
      <h1 className="card-title">Mobile Identity</h1>
      <div className="card-page mobile-action">
        <p className="stitch-sms-text">
          We will attempt to verify your identity by sending a text with a
          one-time code to your mobile phone number ending in XXXX.
          <br/>
        </p>
        <p className="card-content-text">
          Message and data rates may apply.
        </p>
        <Button
          variant="primary"
          className="cta send-btn m-t-40"
          onClick={() => handleSubmit()}
          disabled={isRegistering}
        >
          Send Text
        </Button>
        <Button
          variant="primary"
          className="cta send-btn m-t-12"
          onClick={() => setNStitchQuiz()}
          disabled={isRegistering}
        >
          Skip
        </Button>
        <div className="flex-center m-t-20">
          <span>Powered By</span>
          <img
            className="ml-3"
            src={img_stitch_mark}
            width="130"
            height="33"
          ></img>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ nstitch }) => {
  return {
    uToken: nstitch.details.uToken,
  }
}

export default connect(mapStateToProps, {
  getMobile,
  sendCode
})(NStitchSms)