import React from 'react';

import slackIcon from "../../../shared/assets/images/slack-icon.svg";

const Commnunity = () => {
  return (
    <div className="flex-row-space m-t-30">
      <div className="community-layout">
        <h3>Join the Community</h3>
        <p>Join our community of financial feminists for events, credit content, and tips on how you can up your credit game.</p>
        <button className="join-btn">
          <span>Join the Slack</span>
          <img src={slackIcon} alt="slack icon"/>
        </button>
      </div>
      <div className="community-layout">
        <h3>Better Together <span role="img" aria-label="muscle">💪</span></h3>
        <p>We’d love if you could take a moment to invite your friends to join you along your credit journey by entering their email below.</p>
        <input type="text" placeholder="Enter email"/>
        <button className="invite-btn">Send Invite</button>
      </div>
      <div className="community-layout p-r-32">
        <h3>Give Us Feedback</h3>
        <p>At Sequin, we’re on a mission to do the best we can to jumpstart your path to the best credit possible. We would appreciate any and all feedback on where we can improve.</p>
        <button className="feedback-btn">Feedback Form</button>
      </div>
    </div>
  )
}

export default Commnunity;