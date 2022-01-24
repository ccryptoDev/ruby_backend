import * as React from "react";
import { Button } from "react-bootstrap";
import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";

import "./NHome.scss";
import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";
import { connect } from "react-redux";
import { 
  getQuiz,
  verifyQuiz,
  efxConfig
} from '../../../store/actions/nstitch.action';

import { 
  efxOauthToken, 
  efxScoreLastest
} from "../../../store/actions/efxApi.action";

const NStitchQuiz = ({
  uToken,
  qTransactionKey,
  qzId,
  getQuiz,
  verifyQuiz,
  efxConfig,
  efxOauthToken, 
  efxScoreLastest,
  isRegistering,
  setNStitchWelcome
}) => {
  const selectionItemsInfo = [
    "Independent Dealers Advantage",
    "Nationcredit Corp",
    "Onynx Acceptance Corp",
    "The Toroto-Dominion Bank"
  ]
  const [ itemSelected, setItemSelected ] = React.useState([
    0, 0, 0, 0
  ]);
  const [ noneSelected, setNoneSelected ] = React.useState(0);

  const onClickItem = (index) => {
    let selectedItems = itemSelected;
    selectedItems[index] = selectedItems[index] === 1 ? 0 : 1;
    setItemSelected([...selectedItems]);
    setNoneSelected(0);
  }

  const onClickNone = () => {
    setItemSelected([0, 0, 0, 0]);
    setNoneSelected(1);
  }

  const handleSubmit = () => {
    getQuiz({
      uToken
    }).then((res) => {
      if (res.value) {
        verifyQuiz({
          uToken,
          qTransactionKey,
          qzId,
          // answers
        }).then((res) => {
          let response = res.value;
          if (response) {
            if (response.idpass === false) {
              return
            }  else {
              // already id pass true
              efxConfig({uToken}).then(res => {
                let efxApiKey = res.value.id;
                let efxAssertion = res.value.secret;
                if (efxAssertion && efxAssertion) {
                  efxOauthToken({
                    efxApiKey,
                    efxAssertion
                  }).then(res => {
                    let efxToken = res.value.access_token;
                    if (efxToken) {
                      efxScoreLastest({efxToken}).then(res => {
                        if (res.value) {
                          setNStitchWelcome();
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }

  return (
    <>
      <h3 className="card-title mb-0">Identity Quiz</h3>
      <div className="card-page mt-4">
        <p className="card-content-text">
          Your credit file indicates you may have an auto loan lease, opened  
          in or around July 2011.
        </p>
        <p className="card-content-text">
          Who is the Credit Provider for this account?
        </p>
        <div className="input-quiz">
          {
            itemSelected.map((item, index) => (
              <div
                key={index}
                className={
                  item === 1 ? 'active' : ''
                }
                onClick={() => onClickItem(index)}
              >
                {selectionItemsInfo[index]}
              </div>
            ))
          }
          <div
            className={ noneSelected === 0 ? 'none-above' : 'active none-above' }
            onClick={onClickNone}
          >
            None of Above
          </div>
        </div>
      </div>
      <div className="action">
        <Button
          variant="primary"
          className="cta col-5"
          onClick={() => handleSubmit()}
          disabled={isRegistering}
        >
          Continue
        </Button>
        <PoweredBy />
      </div>
    </>
  );
};

const mapStateToProps = ({ nstitch }) => {
  return {
    uToken: nstitch.details.uToken,
    qTransactionKey: nstitch.details.qTransactionKey,
    qzId: nstitch.details.qzId,
  }
}

export default connect(mapStateToProps, {
  getQuiz,
  verifyQuiz,
  efxConfig,
  efxOauthToken, 
  efxScoreLastest
})(NStitchQuiz)