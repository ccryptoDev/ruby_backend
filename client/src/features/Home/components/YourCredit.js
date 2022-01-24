import React from 'react';
import userCard from "../../../shared/assets/images/user-card.svg";
import userIcon from "../../../shared/assets/images/user-icon.svg";
import userEmail from "../../../shared/assets/images/user-email.svg";

const YourCredit = () => {
  return (
    <div className="flex-row-space m-t-30">
      <div className="credit-layout">
        <h3>Credit Card Matchmaking Quiz</h3>
        <p>Take Sequin’s Credit Card Matchmaking Quiz<br/> about your current state of your financial<br/> journey to receive a personalized credit card<br/> recommendation from the experts here at<br/> Sequin.</p>
        <img src={userCard} alt="user card"/>
        <button>Take the Quiz</button>
      </div>
      <div className="credit-layout">
        <h3>Credit Score Stuck?</h3>
        <p>Schedule a personalized 1:1 session to chat with<br/> a Sequin credit expert to get create a strong<br/> credit plan and to get all your concerns and<br/> questions answered. Or, email our support<br/> team at help@sequincard.com</p>
        <div>
          <img src={userIcon} alt="user info"/>
          <img src={userEmail} alt="user info"/>
        </div>
        <button>Schedule</button>
      </div>
    </div>
  )
}

export default YourCredit;