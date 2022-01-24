import * as React from "react";
import { Col, Card, Row, Button, Dropdown, Modal } from "react-bootstrap";
import amplitude from 'amplitude-js';

import "./Home.scss";

export const CardInfo = ({
  isCardLinked,
  mrf,
  onBankRedirect,
  onOpenPlaidLink,
  allFinancials,
  token,
  onUpdateDefaultAccountId,
}) => {

  var uniq_account_ids = []
  var uniq_financials = []
  for (var i = 0; i < allFinancials.length; i ++){
    var financial = allFinancials[i]
    if (uniq_account_ids.includes(financial.accountId)) {
      // skip
    } else {
      uniq_account_ids = uniq_account_ids.concat(financial.accountId)
      uniq_financials = uniq_financials.concat(financial)
    }
  }

  const multiple_cards = (uniq_financials.length > 1) && isCardLinked

  const formatAccountInfo = (account) => {
    return account.accountName + " ••••"+account.mask
  }
  
  const formatDate = (datestr) => {
    const d = new Date(datestr)
    return d.toLocaleString('default', { month: 'long' }) + " " + d.getDate()
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        amplitude.getInstance().logEvent('SELECTED_DIFFERENT_CARD');
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const [value, setValue] = React.useState('');
  const [show, setShow] = React.useState(false);

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  
  return (
    <>
      <Modal className="cardInfoModal" show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title className="title">Why are we asking you to pay off?</Modal.Title>
        </Modal.Header>
        <Modal.Body>One of the biggest factors of your credit score is <b>utilization</b>. Utilization is your credit balance / your total credit line. The lower your utilization, the better. We aim for 10%. Sequin keeps your utilization low by recommending personalized micropayments. </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Got It
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="sectionWrapper cardInformation">
        <div>
          <h4 className="sectionTitle mt-4 ml-3">Your Personalized Credit Action<i className="ion ion-md-help-circle align-middle ml-2" onClick={(e) => {
              amplitude.getInstance().logEvent('OPENED_CREDIT_MODAL')
              setShow(true)
            }}></i></h4>
          <Col>
            <Card className="mb-4 section">
              <Card.Body className="align-items-center">
                <Row>
                  <Col xs={7}>
                    <span className="value">Sequin Recommended Payoff Amount Due Now</span><br />
                    <span className="grey">Payoff at <span style={{fontStyle: "italic"}}>least</span> the amount listed, but as much as you can.</span><br />
                    <span className="payoff">{isCardLinked && mrf.recommendedPayoff ? "$"+parseFloat(mrf.recommendedPayoff).toFixed(2) : "---"}</span>
                  </Col>
                  <Col className="text-right">
                  { !multiple_cards ?
                      <span className="header">{isCardLinked ? formatAccountInfo(mrf) : "---"}</span>
                      :
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                          <span className="header">{formatAccountInfo(mrf)}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                          { uniq_financials.map((financial) => (
                              <Dropdown.Item key={financial.accountId} as="button" onClick={(e) => {console.log(onUpdateDefaultAccountId, token); onUpdateDefaultAccountId({token: token, accountId: e.target.id})}} eventKey={financial.accountId}>
                                <span id={financial.accountId} className="header">{formatAccountInfo(financial)}</span>
                              </Dropdown.Item>
                          ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                  }
                  <br />  
                  <br />  
                  <br />  
                  {isCardLinked ? 
                    <Button onClick={onBankRedirect} className="cta" >
                      Pay Off Now
                    </Button>
                  :
                    <Button className="cta mt-3" onClick={onOpenPlaidLink}>
                      Enter Card Details*
                    </Button>
                  }                
                  </Col>
                </Row>
                {isCardLinked ? <></>
                  :
                  <Row>
                    <Col>
                      <p className="grey mt-2" style={{fontStyle: "italic"}}>*Sequin is an official VISA Inc. partner and uses 256-bit encryption for added security. Sequin does not share your personal information with unaffiliated third parties for their own marketing purposes.</p>
                    </Col>
                  </Row>
                }
                <hr></hr>
                <Row>
                  <Col>
                    <span className="header">Account Balance</span><br />
                    <span className="value">{isCardLinked && mrf.currentBalance ? "$"+parseFloat(mrf.currentBalance).toFixed(2) : "---"}</span>
                  </Col>
                  <Col>
                    <span className="header">Current Credit Line</span><br />
                    <span className="value">{isCardLinked && mrf.limit ? "$"+parseFloat(mrf.limit).toFixed(2) : "---"}</span>
                  </Col>
                  <Col>
                    <span className="header">Current Utilization</span><br />
                    <span className="value">{isCardLinked && mrf.utilization ? Math.round(mrf.utilization * 100) + "%" : "---"}</span>
                  </Col>
                  <Col>
                    <span className="header">Monthly Payment Date</span><br />
                    <span className="value">{isCardLinked && mrf.nextPaymentDueDate ? formatDate(mrf.nextPaymentDueDate) : "---"}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </>
  );
};