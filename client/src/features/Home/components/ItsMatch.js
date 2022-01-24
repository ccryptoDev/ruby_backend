import React from 'react';

import cardRed from "../../../shared/assets/images/card-red.png";
import cardDarkRed from "../../../shared/assets/images/card-darkred.png";
import cardDark from "../../../shared/assets/images/card-dark.png";
import userAvatar from "../../../shared/assets/images/user.png";
const Header = () => {
  return (
    <div className="itsmatch-header">
      <h3>✨ It’s a Match! ✨</h3>
      <p>Based on your current circumstances and credit card needs, the team<br/> at Sequin think these might be a good fit for you.</p>
    </div>
  )
}

const Card = () => {
  return (
    <div className="card-layout">
      <div>
        <img src={cardRed} />
        <button>
          Ready to Apply?
        </button>
      </div>
      <div>
        <h4>Card #1 Name</h4>
        <p>
          <span>The TLDR: </span> This is where “the skinny” would go with details about APR, etc.<br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/> tempor incididunt ut labore et dolore magna aliqua. 
        </p>
        <p>
          <span>Why We Think It’s a Match 💖 : </span> This is where “why we recommended this for<br/> you” would go. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br/> eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </p>
        <div className="details">
          <img src={userAvatar} />
          <p>
            “This card helped me reach my credit goals. Lorem Ipsum Lorem<br/> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/> tempor incididunt ut labore et dolore magna aliqua.<br /><br/>
            <span>- Sophia Mills, Age 24</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const ItsMatch = () => {
  const items = [ 1, 2, 3 ]
  return (
    <div className="itsmatch-layout m-t-40">
      <Header />
      <div className="cards-layout">
        { items.map((item, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  )
}

export default ItsMatch;