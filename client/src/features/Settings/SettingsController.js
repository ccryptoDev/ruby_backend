import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Settings } from "./components/Settings";

const mapStateToProps = ({ user }) => {
  // TODO handle when user selects primary credit card
  const latestFinancialData = (user.financials || [])[0] ?? {};
  return {
    creditLimit: latestFinancialData.limit,
    utilization: latestFinancialData.utilization * 100 ?? 10,
    userDetails: user.details,
  };
};

export const SettingsController = ({
  creditLimit,
  userDetails,
  utilization,
}) => {
  // TODO
  const onSave = undefined;
  const onUpdateUtilization = undefined;
  // TODO utilization from the backend is card utilization so what we want to
  // initialize as utilizationValue is a utilization percentage between
  // 0-30% that the user configured in their settings for their specific
  // Sequin account. We need backend support to do this but it's unknown if this is a p0
  // so I'm just leaving this here unfinished.
  const [utilizationValue, setUtilizationValue] = React.useState(utilization);

  // TODO allow users to toggle text notifications
  // Backend endpoints: /users/alerts/enable and /users/alerts/disable

  return (
    <>
      <Helmet>
        <title>Settings - Sequin</title>
      </Helmet>
      <Settings
        creditLimit={creditLimit}
        onSubmit={onSave}
        onUpdateUtilization={onUpdateUtilization}
        setUtilizationValue={setUtilizationValue}
        userDetails={userDetails}
        utilizationValue={utilizationValue}
      />
    </>
  );
};

export default connect(mapStateToProps)(SettingsController);
