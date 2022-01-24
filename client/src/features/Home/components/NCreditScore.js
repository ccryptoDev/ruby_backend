import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";

import { 
  directLogin, 
  directNewUser, 
  directUserRegister, 
  preauthToken, 
  efxConfig 
} from "../../../store/actions/nstitch.action";

import { 
  efxOauthToken, 
  efxScoreLastest 
} from "../../../store/actions/efxApi.action";

import Helper from "../../../shared/utils/utils";
import eyeIcon from "../../../shared/assets/images/eye-icon.png";
import PoweredBy from "../../../shared/components/PoweredBy/PoweredBy";

import "./NHome.scss";

const NCreditScore = ({
  email,
  password,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  isRegistering,
  token,
  directLogin,
  directNewUser,
  directUserRegister,
  preauthToken,
  efxConfig,
  efxOauthToken,
  efxScoreLastest,
  setNStitchQuestion,
  setNStitchIdentity,
  setNStitchWelcome
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorpassword] = useState(null);
  const [errorFirst, setErrorFirst] = useState(null);
  const [errorLast, setErrorLast] = useState(null);

  useEffect(() => {
    setErrorEmail(null);
    setErrorpassword(null);
    setErrorFirst(null);
    setErrorLast(null);
  }, [email, password, firstName, lastName ]);

  const handleSubmit = () => {
    let data = {
      email: 'test+151@test.com',
      password,
      firstName,
      lastName,
      token
    }
    // if (!validationCheck()) return;
    directLogin(data).then((res) => {
      var response = JSON.parse(res.value.response);
      var nstitchUserInfo = res.value.nstitch;
      let dToken = response.token;
      if (nstitchUserInfo) {
        if (nstitchUserInfo.nstitch_user_id) {
          let userId = nstitchUserInfo.nstitch_user_id;
          directNewUser({
            dToken,
            userId,
            token
          }).then(res => {
            let response = res.value;
            let paToken = response.token;
            let userId = response.userId;
            if (paToken && userId) {
              preauthToken({  
                token,
                paToken,
                userId
              }).then(res => {
                let response = res.value;
                let uToken = response.token;
                if (response) {
                  if (response.idpass === false) {
                    setNStitchIdentity();
                  } else {
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
      } else if (!nstitchUserInfo) {
        directUserRegister({
          firstName: 'Donald',
          lastName: 'Grupp',
          email: 'test+151@test.com',
          token,
          dToken
        }).then(res => {
          let response = res.value;
          let paToken = response.token;
          if(response.token && response.userId) {
            preauthToken({  
              token,
              paToken,
              userId: response.userId
            }).then(res => {
              let response = res.value;
              let uToken = response.token;
              if (response) {
                if (response.idpass === false) {
                  setNStitchQuestion();
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
    });
  }

  const validationCheck = () => {
    if (email.length < 1) {
      setErrorEmail(`Email can't be empty`);
      return false;
    } else {
      if (!Helper.validateEmail(email)) {
        setErrorEmail("Email is invalid");
        return false;
      }
    }
    if (password.length < 1) {
      setErrorpassword(`Password can't be empty`);
      return false
    } else if (password.length < 6) {
      setErrorpassword("Password length should be 6 at least");
      return false;
    }
    if (firstName.length < 1) {
      setErrorFirst(`First name can't be empty`);
      return false;
    }
    if (lastName.length < 1) {
      setErrorLast(`Last name can't be empty`);
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="flex-row">
        <span className="card-title">Check your Credit Score</span>
      </div>
      <span className="card-content-text mr-4 m-t-18">
        Create an account to get free check ups on your credit score at no
        cost.
      </span>

      <div className="card-page m-t-28">
        <form>
          <Form.Group>
            <Form.Label className="stitch-label mb-0">Email</Form.Label>
            <Form.Control
              className="input-font-style m-t-12"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              value={email}
              isInvalid={Boolean(errorEmail)}
            />
            <Form.Control.Feedback type="invalid">
              {errorEmail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="stitch-label mb-0">
              Create a Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                className="input-font-style m-t-12 p-r-55"
                onChange={(e) => setPassword(e.target.value)}
                required
                type={showPassword ? "test" : "password"}
                placeholder="******"
                value={password}
                isInvalid={Boolean(errorPassword)}
              />
              <InputGroup.Append style={{zIndex: 3}}>
                <img
                  src={eyeIcon}
                  className="eye-icon"
                  alt="eye icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                {errorPassword}
              </Form.Control.Feedback>
            </InputGroup>
            
          </Form.Group>
          <Form.Group>
            <Form.Label className="stitch-label mb-0">First Name</Form.Label>
            <Form.Control
              className="input-font-style m-t-12"
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Name"
              value={firstName}
              isInvalid={Boolean(errorFirst)}
            />
            <Form.Control.Feedback type="invalid">
              {errorFirst}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="stitch-label mb-0">Last Name</Form.Label>
            <Form.Control
              className="input-font-style m-t-12"
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Name"
              value={lastName}
              isInvalid={Boolean(errorLast)}
            />
            <Form.Control.Feedback type="invalid">
              {errorLast}
            </Form.Control.Feedback>
          </Form.Group>
          
        </form>
      </div>
      <div className="action mt-4">
        <Button
          variant="primary"
          className="cta col-5"
          onClick={() => handleSubmit()}
          disabled={isRegistering}
        >
          Next
        </Button>
        <PoweredBy />
      </div>
    </>
  );
};

const mapStateToProps = ({ user, nstitch }) => {
  return {
    token: user.token,
  }
}

export default connect(mapStateToProps, {
  directLogin,
  directNewUser,
  directUserRegister,
  preauthToken,
  efxConfig,
  efxOauthToken,
  efxScoreLastest
})(NCreditScore);