import * as React from "react";
import { Col, Card, Row, Button, Dropdown, Modal } from "react-bootstrap";

import DropDownTmpl from '../../../shared/components/DropDown/DropDown';
import Table from '../../../shared/components/Table/Table.scss';
import ToggleButton, { ControlledToggleButton } from "../../../shared/components/ToggleButton/ToggleButton";

import img_information from "../../../shared/assets/images/information.png";
import payoffImgge from "../../../shared/assets/images/payoff.png";

import "./NHome.scss";

export const CardInfo = ({}) => {
  const itemsInfo = [
    {
      id: 1,
      name: 'Summary View',
    },
    {
      id: 2,
      name: 'Chase •••• 1234',
    },
    {
      id: 3,
      name: 'Discover •••• 5678',
    },
    {
      id: 4,
      name: 'PNC •••• 1234',
    }
  ];
  
  const PayOffModal = ({closePayoffModal}) => {
    const modalRef = React.useRef(null);

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closePayoffModal();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [modalRef]);
  

    return (
      <div className="custom-modal payoff-modal">
        <div className="modal-bg" />
        <div className="modal-layout" ref={modalRef}>
          <h4>YOU GO, GIRL! 🍾</h4>
          <img src={payoffImgge} />
          <h3>Sequin Payoff Complete</h3>
          <p>Look at you, making your weekly micropayments to get a banging credit score. Keep up the good work. You’ve earned 10 Sequins.</p>
          <button
            onClick={() => closePayoffModal()}
          >
            Hello Yeah!
          </button>
        </div>
      </div>
    )
  }

  const BankNotModal = ({closeBankNotModal}) => {
    const modalRef = React.useRef(null);

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeBankNotModal();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [modalRef]);
    return (
      <div className="custom-modal bank-modal">
        <div className="modal-bg" />
        <div className="modal-layout" ref={modalRef}>
          <h3>Bank Not Supported</h3>
          <p>To get the most out of Sequin, you’ll need a credit card our partner, Plaid, supports to start boosting your credit score. Take our credit card matchmaking quiz here, created by the experts at Sequin.</p>
          <button
            onClick={() => closeBankNotModal()}
          >
            Got It!
          </button>
        </div>
      </div>
    )
  }

  const LinkedCard = ({primaryPrice}) => {
    return (
      <>
        <div className="d-flex justify-content-center mt-3">
          <span className="no-card">{primaryPrice ? primaryPrice : '$123.40'}</span>
        </div>
        <div>
          <Button
            className="button-inactive mt-3"
            onClick={() => setPayoffModal(true)}
          >
            Pay Off Now
          </Button>
          { payoff &&
            <PayOffModal closePayoffModal={() => setPayoffModal(false)}/>
          }
          <Button 
            className="button-active mt-2"
            onClick={() => setBankNotModal(true)}
          >
            <span className="button-text">+ Add Credit Card</span>
          </Button>
          { banknotmodal &&
            <BankNotModal closeBankNotModal={() => setBankNotModal(false)}/>
          }
        </div>
        <div className="d-flex align-items-center mt-4">
          <img src={img_information} width="18" height="18"></img>
          <span className="card-help-text ml-3">
            My bank isn’t supported. Help!
          </span>
        </div>
        <hr />
        <div className="flex-row-center mt-5">
          <div className="flex-column-center col-6 pl-0">
            <span className="card-label-text">Account Balance</span>
            <span className="card-value-text mt-2">---</span>
          </div>
          <div className="flex-column-center">
            <span className="card-label-text">Current Credit Line</span>
            <span className="card-value-text mt-2">---</span>
          </div>
        </div>
        <div className="flex-row-center mt-4">
          <div className="flex-column-center col-6 pl-0">
            <span className="card-label-text">Current Utilization</span>
            <span className="card-value-text mt-2">---</span>
          </div>
          <div className="flex-column-center">
            <span className="card-label-text">Monthly Payment Date</span>
            <span className="card-value-text mt-2">---</span>
          </div>
        </div>
      </>
    )
  }

  const CardDetail = () => {
    const tableTitleInfo = [
      "Credit Card", "Utilization", "Payoff Amount"
    ]
    const tableRowInfo = [
      {
        cardInfo: "Chase •••• 1234",
        percent: 10,
        price: 120.34,
        paynow: "pay now"
      },
      {
        cardInfo: "Chase •••• 1234",
        percent: 10,
        price: 120.34,
        paynow: "pay now"
      },
      {
        cardInfo: "Chase •••• 1234",
        percent: 10,
        price: 120.34,
        paynow: "pay now"
      },
      {
        cardInfo: "Chase •••• 1234",
        percent: 10,
        price: 120.34,
        paynow: "pay now"
      },
      {
        cardInfo: "Chase •••• 1234",
        percent: 10,
        price: 120.34,
        paynow: "pay now"
      },
    ]
    
    return (
      <>
        <div className="table-layout linked-card">
          <div className="sub-title">
            {
              tableTitleInfo.map((item, index) => {
                  return <span key={index}>{item}</span>
              })
            }
          </div>
          <div className="details linked-card">
            {
              tableRowInfo.map((item, index) => {
                return (
                  <div key={index} className="details-row">
                    <div>{item.cardInfo}</div>
                    <div>${item.percent}</div>
                    <div>{item.price}%</div>
                    <div className={item.paynow}>{item.paynow}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="total-paid">
          <p>Total Payoff Amount:</p>
          <span>$1,234.56</span>
        </div>
        <div className="check-group">
          <p>Receive Credit Boosting Text Alerts</p>
          <ToggleButton
            name="textEnabled"
          />
        </div>
        <div className="check-group">
          <p>Receive Alerts about Sequin Events & Tips</p>
          <ToggleButton
            name="eventEnabled"
          />
        </div>
        <small>Standard Messaging Rates Will Apply</small>
        <button>+ Add Another Card</button>
      </>
    )
  }

  const [ payoff, setPayoffModal ] = React.useState(false);
  const [ banknotmodal, setBankNotModal ] = React.useState(false);
  const [ cardDetail, setCardDetail ] = React.useState(0);
  return (
    <>
      <h3 className="card-title">Sequin Payoff Amount</h3>
      <div className="flex-row-space mt-4">
        <div className="card-subtitle m-0">Your Linked Cards</div>
        <DropDownTmpl 
          items={itemsInfo}
          size="wd-45 card-option"
          textInfo="------"
          getSelectedCategory={(index) => setCardDetail(index+1)}
        />
      </div>
      { cardDetail == 0 &&
        <LinkedCard primaryPrice={"-----"}/>
      }
      { cardDetail == 1 &&
        <CardDetail />
      }
      { cardDetail == 2 &&
        <LinkedCard />
      }
      { cardDetail == 3 &&
        <LinkedCard />
      }
      { cardDetail == 4 &&
        <LinkedCard />
      }
    </>
  );
};
