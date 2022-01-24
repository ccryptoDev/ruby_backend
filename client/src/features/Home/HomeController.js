import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  getAccessToken,
  getPlaidLinkToken,
} from "../../store/actions/plaid.actions";
import { getFinancials, getCreditScores, updateDefaultAccountId, toggleAlerts, saveCreditScore } from "../../store/actions/user.actions";
import Loader from "../../shared/components/Loader";
import { Home } from "./components/Home";
import amplitude from 'amplitude-js';

const mapStateToProps = ({ plaid, user }) => {
  return {
    financials: user.financials,
    creditScores: user.creditScores,
    firstName: user.details.firstName,
    isLoadingFinancials: user.isLoadingFinancials,
    isLoadingCreditScores: user.isLoadingCreditScores,
    isLoadingLinkToken: plaid.isLoading,
    linkToken: plaid.linkToken,
    plaidAuthId: plaid.authId,
    token: user.token,
    userId: user.details.id,
    user: user,
    defaultAccountId: user.details.defaultAccountId
  };
};

export const HomeController = ({
  financials,
  creditScores,
  firstName,
  isLoadingFinancials,
  isLoadingCreditScores,
  isLoadingLinkToken,
  linkToken,
  onGetAccessToken,
  onGetFinancials,
  onGetCreditScores,
  onSaveCreditScore,
  onGetPlaidLinkToken,
  onToggleAlerts,
  onUpdateDefaultAccountId,
  plaidAuthId,
  token,
  userId,
  user,
  defaultAccountId,
}) => {
  var identify = new amplitude.Identify().set('email', user.details.email);
  amplitude.getInstance().setUserId(user.details.id)
  amplitude.getInstance().identify(identify);

  // TODO we want to show a modal (popup - https://www.figma.com/file/HmnyVeLGYF6QtL3mv3q48x/Sequin-Wireframe?node-id=424%3A2360)
  // if user has paid off their credit card by at least Sequin's suggested amount.
  // We can find out if a user has paid off their credit card but comparing the
  // financials array's 0th indexed object and 1st indexed object
  // (we can check either if financials[0].current_balance < financials[1].current_balance
  // or financials[0].last_payment_date is more recent than financials[1].last_payment_date).
  // If user paid off, then the completed task should get passed in isComplete of true to
  // render the correct status component at the top of the task

  // TODO use one or both of following endpoints to either check if user paid
  // off their credit card when they click "Pay Off Now" from "Tasks" section
  // /financials/:user_id/refresh
  // /financials/:user_id/refresh/:delay

  // const isUserToSeePlaidLink = false;  
  // NOTE: disabling for now, issue w/ link token
  const isUserToSeePlaidLink =
    !isLoadingFinancials && financials === undefined && token && !isLoadingCreditScores && creditScores === undefined;
    // linkToken = 'nil'
  React.useEffect(() => {
    onGetPlaidLinkToken({ token, userId });
    onGetFinancials({ token, userId });
    onGetCreditScores({ token, userId });
    
    if (isUserToSeePlaidLink) {
      onGetPlaidLinkToken({ token, userId });
    } else {
      onGetFinancials({ token, userId });
      onGetCreditScores({ token, userId });
    }
  }, [
    isUserToSeePlaidLink,
    onGetFinancials,
    onGetCreditScores,
    onGetPlaidLinkToken,
    token,
    userId,
    defaultAccountId,
  ]);

  const onPlaidSuccess = React.useCallback(
    (publicToken) => {
      onGetAccessToken({
        plaidAuthId,
        publicToken,
        token,
      }).then(() => {
        amplitude.getInstance().logEvent('SUCCESSFULLY_CONNECTED_PLAID');

        onGetFinancials({ token, userId });
        onGetCreditScores({ token, userId });
      });
    },
    [onGetAccessToken, onGetFinancials, plaidAuthId, token, userId],
  );

  // TODO sequins in backend support
  const numSequins = 0;
  const homeContent = React.useMemo(() => {
    if (isLoadingLinkToken || linkToken === undefined) {
      return <Loader />;
    }
    // if (isUserToSeePlaidLink) {
    //   return (
    //     <HomeWithoutFinancials
    //       firstName={firstName}
    //       isLoadingLinkToken={isLoadingLinkToken}
    //       linkToken={linkToken}
    //       numSequins={numSequins}
    //       onPlaidSuccess={onPlaidSuccess}
    //     />
    //   );
    // }
    // console.log("USER:", user)
    return (
      <Home
        financials={financials}
        creditScores={creditScores}
        token={token}
        userId={userId}
        user={user}
        defaultAccountId={defaultAccountId}
        firstName={firstName}
        numSequins={numSequins}
        onPlaidSuccess={onPlaidSuccess}
        onToggleAlerts={onToggleAlerts}
        onUpdateDefaultAccountId={onUpdateDefaultAccountId}
        linkToken={linkToken}
        onGetCreditScores={onGetCreditScores}
        onSaveCreditScore={onSaveCreditScore}
      />
    );
  }, [
    financials,
    creditScores,
    firstName,
    isLoadingLinkToken,
    isUserToSeePlaidLink,
    linkToken,
    numSequins,
    onPlaidSuccess,
    onToggleAlerts,
    onUpdateDefaultAccountId,
    defaultAccountId,
  ]);

  return (
    <>
      <Helmet>
        <title>Sequin</title>
      </Helmet>
      {homeContent}
    </>
  );
};

export default connect(mapStateToProps, {
  onGetAccessToken: getAccessToken,
  onGetFinancials: getFinancials,
  onGetCreditScores: getCreditScores,
  onGetPlaidLinkToken: getPlaidLinkToken,
  onToggleAlerts: toggleAlerts,
  onUpdateDefaultAccountId: updateDefaultAccountId,
  onSaveCreditScore: saveCreditScore,
})(HomeController);
