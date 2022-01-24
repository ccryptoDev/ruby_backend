import React from "react";
import { connect } from "react-redux";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import ArcProgress from "react-arc-progress";

import "./NHome.scss";

const NStitchScore = ({
  details,
  efxScore
}) => {
  const progressInfo = (efxScore - 500)/1000;
  const progress = progressInfo;
  const text = `${efxScore}`;
  const arcProgress = {
    arcStart: -250,
    arcEnd: 70,
    thickness: 20,
    className: "progress-container",
    size: 250,
    textStyle: {
      y: 90,
      size: "49px",
      color: "#1E2A46",
      font: "Circular Std Book",
    },
    emptyColor: "rgba(170, 174, 185, 0.3)",
    fillColor: "#F59B87",
  };

  return (
    <>
      <div>
        <span className="card-title">Your Credit Score - Equifax</span>
      </div>
        
      <div className="arc-layout">
        <span>500</span>
        <span>550</span>
        <span>600</span>
        <span>650</span>
        <span>750</span>
        <span>✨800✨<br/>Club</span>
        <span>850</span>
        <div className="action-text">YOU’RE ON FIRE 🔥</div>
        <ArcProgress
          {...arcProgress}
          progress={progress}
          text={text}
          observer={(current) => {
            const { percentage, currentText } = current;
            console.log("observer:", percentage, currentText);
          }}
          animationEnd={({ progress, text }) => {
            console.log("animationEnd", progress, text);
          }}
        ></ArcProgress>
      </div>
      <small className="text-description">
        The text VantageScore 3.0 is known as an “educational score” and
        may differ from the Fico Score used to determine credit
        availability
      </small>
      <div className="m-t-32 border-line">
          <div className="d-flex">
            <div className="d-flex flex-column col-6 p-0">
              <span className="card-label-text">Last Update:</span>
              <span className="card-value-text mt-2">January 13, 2020</span>
            </div>
            <div className="d-flex flex-column col-6 p-0">
              <span className="card-label-text">Next Update:</span>
              <span className="card-value-text mt-2">February 13, 2020</span>
            </div>
          </div>
          <div className="d-flex m-t-30">
            <div className="d-flex flex-column col-6 p-0">
              <span className="card-label-text">Vantage Score*</span>
              <span className="card-value-text mt-2">3.0</span>
            </div>
            <div className="d-flex flex-column col-6 p-0">
              <span className="card-label-text">Taken From</span>
              <span className="card-value-text mt-2">Equifax</span>
            </div>
          </div>
        </div>
    </>
  );
};

const mapStateToProps = ({ efxApi }) => {
  return {
    efxScore: efxApi.details.efxScore
  }
}

export default connect(mapStateToProps, {
})(NStitchScore)