import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { CreditCheck } from "./CreditCheck";
import { CardInfo } from "./CardInfo";
import { CreditScore } from "./CreditScore";
import { PayoffProgress } from "./PayoffProgress";
import { ActionTile } from "./ActionTile";
import { FormTile } from "./FormTile";
import { GetReminded } from "./GetReminded";
import { WeeklyTask } from "./WeeklyTask";
import { WelcomePrompt } from "./WelcomePrompt";
import { refreshFinancials, saveCreditScore, saveReferral } from "../../../store/actions/user.actions";
import { getInstitutionMatchesForCard } from "../helpers";
import { usePlaidLink } from "react-plaid-link";
import LogRocket from 'logrocket';
import amplitude from 'amplitude-js';

// TODO: Fill in Links
const SCHEDULE_LINK = "https://calendly.com/team-sequin/feedback";
const FEEDBACK_LINK = "https://forms.gle/GyUgMwJDrqJ1P86s8";
const TWITTER_LINK = "https://twitter.com/intent/tweet?button_hashtag=Sequin&ref_src=twsrc%5Etfw";

export const Home = ({ financials = [], creditScores = [], firstName, numSequins, onPlaidSuccess, onToggleAlerts, onUpdateDefaultAccountId, linkToken, token, userId, user, defaultAccountId, onGetCreditScores, onSaveCreditScore}) => {
  // TODO what if user connected Plaid but they don't have any credit cards?
  // We need designs for such a state because they wouldn't have a "payoff date" for a debit card
  
  if (!defaultAccountId && financials.length > 0) {
    defaultAccountId = financials[0].accountId
  }

  if (process.env.NODE_ENV === "production") {
    LogRocket.identify(user.details.id, {
      name: `${user.details.firstName} ${user.details.lastName}`,
      email: user.details.email,
    
      // Add your own custom user variables here, ie:
      // subscriptionType: 'pro'
    });
  }

  var allFinancials = financials
  console.log("financials:", financials, defaultAccountId)
  var financials = financials.filter(financial => financial.accountId == defaultAccountId)

  const mostRecentFinancials = financials[0];
  const DELAY_IN_MINS = 15; // 15 minutes
  const isCardLinked = mostRecentFinancials !== undefined


  console.log("MRF:", mostRecentFinancials, linkToken, defaultAccountId)
  console.log("CS:", creditScores)
  console.log("user deets:", user.details)

  const { open: onOpenPlaidLink } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
  });

  function onBankRedirect() {
    const accountName = mostRecentFinancials.accountName;
    const institution = getInstitutionMatchesForCard(accountName);
    console.log("on back redirect", accountName, institution)
    if (institution.length === 0) return; // TODO error message
    const bankLink = institution[0].url;
    refreshFinancials({token, userId, delay: DELAY_IN_MINS});
    goToLink(bankLink, undefined);
    amplitude.getInstance().logEvent('REDIRECTED_TO_BANK', {'institution': institution});
  }

  function goToLink(link, eventName) {
    if (eventName) {
      console.log("firing event:", eventName)
      amplitude.getInstance().logEvent(eventName);
    }

    window.open(link, "_blank");
  }

  // TODO 
  function logCreditScore(score) {
    amplitude.getInstance().logEvent('LOG_CREDIT_SCORE', {'score': score});
    onSaveCreditScore({token, score})
  }

  // TODO
  function registerReferral(email) {
    amplitude.getInstance().logEvent('INVITED_FRIEND', {'invite': email});
    saveReferral({token, email})
  }

  const formTiles = [
    {
      key: "1",
      tileHeader: "2. Track Your Progress",
      type: "track",
      formType: "text",
      formPlaceholderText: "Enter Score Here",
      ctaCopy: "Log Credit Score",
      ctaOnClick: logCreditScore,
    },
    {
      key: "2",
      tileHeader: "3. Invite  a Friend",
      type: "invite",
      formType: undefined,
      formPlaceholderText: "Enter Email Here",
      ctaCopy: "Send Invite",
      ctaOnClick: registerReferral,
    },
  ]

  const continueJourneyTiles = [
    {
      key: "1",
      tileHeader: "Need Help?",
      description: "Schedule a 1:1 session with a Sequin credit expert to get create a strong credit plan and to get all your concerns and questions answered.",
      field: undefined,
      ctaCopy: "Schedule",
      ctaOnClick: goToLink,
      ctaProps: SCHEDULE_LINK,
      eventName: "CLICK_SCHEDULE",
    },
    {
      key: "2",
      tileHeader: "Give Us Feedback",
      description: "At Sequin, we’re on a mission to do the best we can to jumpstart your path to the best credit possible. We would appreciate any and all feedback on where we can improve.",
      field: undefined,
      ctaCopy: "Feedback Form",
      ctaOnClick: goToLink,
      ctaProps: FEEDBACK_LINK,
      eventName: "CLICK_FEEDBACK",
    },
    {
      key: "3",
      tileHeader: "Tell Your Friends",
      description: "We want to build a community of strong, financial feminists. We would 💕 if you could take a moment to tweet about your experience with Sequin on your social account.",
      field: undefined,
      ctaCopy: "Tweet About Us",
      ctaOnClick: goToLink,
      ctaProps: TWITTER_LINK,
      eventName: "CLICK_TWITTER",
    },
  ];

  return (
    <>
      <WelcomePrompt firstName={firstName} isCardLinked={isCardLinked} />
      <Row>
        <CardInfo
          isCardLinked={isCardLinked}
          mrf={mostRecentFinancials}
          onBankRedirect={onBankRedirect}
          onOpenPlaidLink={onOpenPlaidLink}
          onUpdateDefaultAccountId={onUpdateDefaultAccountId}
          allFinancials={allFinancials}
          token={token}/>
      </Row>
      <Row>
        <h4 className="sectionTitle mt-4 ml-3">Become a Credit Rockstar:</h4>
      </Row>
      <Row>
        <GetReminded onToggleAlerts={onToggleAlerts} user={user} token={token}/>
        {formTiles.map((task) => (
          <FormTile
            key={task.key}
            tileHeader={task.tileHeader}
            type={task.type}
            formType={task.formType}
            formPlaceholderText={task.formPlaceholderText}
            ctaCopy={task.ctaCopy}
            ctaOnClick={task.ctaOnClick}
          />
        ))}
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <CreditScore creditScores={creditScores} />
        </Col>
        <Col xs={12} md={6}>
          <PayoffProgress
            financials={financials}
          />
        </Col>
      </Row>
      <Row>
        <h4 className="sectionTitle mt-4 ml-3">Want more Sequin?</h4>
      </Row>
      <Row>
        {continueJourneyTiles.map((task) => (
          <ActionTile
            key={task.key}
            tileHeader={task.tileHeader}
            description={task.description}
            field={task.field}
            ctaCopy={task.ctaCopy}
            ctaOnClick={task.ctaOnClick}
            ctaProps={task.ctaProps}
            eventName={task.eventName}
          />
        ))}
      </Row>
      <Row id="row-cc">
        <CreditCheck />
      </Row>
    </>
  );
};

export default Home;