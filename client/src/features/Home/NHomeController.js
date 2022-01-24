import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  getAccessToken,
  getPlaidLinkToken,
} from "../../store/actions/plaid.actions";
import {
  getFinancials,
  getCreditScores,
  updateDefaultAccountId,
  toggleAlerts,
  saveCreditScore,
} from "../../store/actions/user.actions";
import Loader from "../../shared/components/Loader";
import { Home } from "./components/NHome";
import amplitude from "amplitude-js";

export const HomeController = ({}) => {
  return (
    <>
      <Helmet>
        <title>Sequin</title>
      </Helmet>
      <Home />
    </>
  );
};

export default HomeController;
