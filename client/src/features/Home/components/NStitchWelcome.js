import * as React from "react";
import { Button } from "react-bootstrap";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";
import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";

import "./NHome.scss";

export const NStitchWelcome = ({
  isRegistering,
  setNStitchScore
}) => {

  return (
    <>
      <h1 className="card-title">Welcome 👋</h1>
      <div className="card-page m-t-20">
        <p className="card-content-text">
          Thanks for signing up with us. You have signed <br/> up successfully.
        </p>

        <p className="card-content-text m-t-10">
          You can now view your credit score for free <br/> with no additional
          costs or affect on your credit <br/> score.
        </p>
      </div>
      <div className="action">
        <Button
          variant="primary"
          className="cta"
          onClick={() => setNStitchScore()}
          disabled={isRegistering}
        >
          View My Score
        </Button>
        <PoweredBy />
      </div>
    </>
  );
};
