import * as React from "react";
import "./NHome.scss";
import WelcomeLogo from "../../../shared/components/WelcomeLogo";

export const WelcomePrompt = ({}) => {
  return (
    <div className="welcome-wrapper">
      <div>
        <h4 className="welcome-title">{`Welcome, Sophia 👋 `}</h4>
        <div className="text-big m-t-14">
          <p className="welcome-content">
            Enter your credit card information below to receive Sequin Payoff
            alerts before your balance impacts your credit history.
            <br/>
            <br/>
            After you receive a Sequin Payoff alert, come back here to receive a
            personalized payoff amount, make your payoff, and track the impacts
            on your credit history!
          </p>
        </div>
      </div>
      <div className="imgWrapper">
        <WelcomeLogo />
      </div>
    </div>
  );
};
