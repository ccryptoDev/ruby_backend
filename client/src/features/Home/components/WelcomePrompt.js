import * as React from "react";
import "./Home.scss";
import WelcomeLogo from "../../../shared/components/WelcomeLogo";

export const WelcomePrompt = ({ firstName, isCardLinked }) => {
  return (
    <div className="welcomeWrapper">
      <div>
        <h4>{`Welcome, ${firstName} 👋 `}</h4>
        <div className="text-big mt-1">
          {!isCardLinked ? (
            <span>
              Enter your credit card information below to receive Sequin Payoff
              alerts before your balance impacts your credit history.
              <br />
              <br />
              After you receive a Sequin Payoff alert, come back here to receive
              a personalized payoff amount, make your payoff, and track the
              impacts on your credit history!
            </span>
          ) : (
            <span>
              Welcome to Sequin!
              <br />
              <br />
              Welcome to Sequin! To get started, please enter your credit card
              information below to receive Sequin Payoff alerts before your
              balance impacts your credit history. Take a few deep breaths and
              let’s start crushing your credit goals!
              <br />
              <br />
              <span style={{ fontStyle: "italic" }}>
                *Sequin is an official VISA Inc. partner and uses 256-bit
                encryption for added security. Sequin does not share your
                personal information with unaffiliated third parties for their
                own marketing purposes.
              </span>
              <br />
              <br />
            </span>
          )}
        </div>
      </div>
      <div className="imgWrapper">
        <WelcomeLogo />
      </div>
    </div>
  );
};
