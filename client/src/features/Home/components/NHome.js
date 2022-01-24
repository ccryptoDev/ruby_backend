import * as React from "react";
// import { CreditCheck } from "./CreditCheck";
// import { CreditScore } from "./CreditScore";

import { PayoffProgress } from "./PayoffProgress";
import { ActionTile } from "./ActionTile";
import { FormTile } from "./FormTile";
import { GetReminded } from "./GetReminded";
import { WelcomePrompt } from "./NWelcomePrompt";
import "./NHome.scss";
import {
  refreshFinancials,
  saveCreditScore,
  saveReferral,
} from "../../../store/actions/user.actions";
import { getInstitutionMatchesForCard } from "../helpers";
import { usePlaidLink } from "react-plaid-link";
import LogRocket from "logrocket";
import amplitude from "amplitude-js";
import Nstitch from './NStitch';
import TrackProgress from './TrackProgress';
import YourCredit from './YourCredit';
import Community from './Community';
import ItsMatch  from './ItsMatch';

import img_question from "../../../shared/assets/images/question.png";
import img_visa from "../../../shared/assets/images/visa.svg";
import img_plaid from "../../../shared/assets/images/plaid.svg";
import img_ideo from "../../../shared/assets/images/ideo.svg";

export const Home = ({}) => {

  return (
    <>
      <div className="main-wrapper">
        <div className="main-container">
          <WelcomePrompt />
          <div className="m-t-34">
            <div                  
              className="d-flex align-items-center"
            >
              <span className="step-title">
                Step 1: Take Sequin’s Personalized Credit Boosting Action
              </span>
              <img
                className="m-l-14"
                src={img_question}
                width="32"
                height="32"
              ></img>
            </div>
            <div className="flex-row-center m-t-12">
              <img src={img_visa} width="46" height="13" />
              <img
                className="m-l-14"
                src={img_plaid}
                width="49.57"
                height="19"                  
              />
              <img
                className="m-l-14"
                src={img_ideo}
                width="57.57"
                height="13"
              />
              <span className="step-text m-l-18">
                Your credit is safe with us. Sequin is a certified Visa partner,
                and secures your data with 256-bit encryption.
              </span>
            </div>
          </div>
          <Nstitch />
          <h3 className="m-t-40 mb-0">Step 2: Track your Progress</h3>
          <TrackProgress />
          <h3 className="m-t-40 mb-0">Step 3: Level Up Your Credit</h3>
          <YourCredit />
          <h3 className="m-t-40 mb-0">Step 4: Join Sequin’s Community of Financial Feminists</h3>
          <Community />

          <ItsMatch />
        </div>
      </div>
    </>
  );
};

export default Home;
