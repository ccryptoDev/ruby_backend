import React, { useState } from "react";
import { Alert } from "react-bootstrap";

import { CardInfo } from "./NCreditCard";
import NCreditScore from "./NCreditScore";
import { NStitchQuestion } from "./NStitchQuestion";
import { NStitchIdentity } from "./NStitchIdentity";
import NStitchAddress from "./NStitchAddress";
import NStitchSms from "./NStitchSms";
import NStitchVerifyCode from "./NStitchVerifyCode";
import NStitchQuiz from "./NStitchQuiz";
import { NStitchWelcome } from "./NStitchWelcome";
import NStitchScore from "./NStitchScore";

const Nstitch = ({}) => {

  const [ tab, setTab ] = useState(0);
  // const [ showAlert, setShowAlert ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ selectedQeustion, setSelectedQeustion ] = useState('');
  const [ answer, setAnswer ] = useState('');
  // const [ checkedQuestion, setCheckedQuestion ] = useState('');
  const [ securityNum, setSecurityNum ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ street, setStreet ] = useState('');
  const [ state, setState ] = useState('');
  const [ city, setCity ] = useState('');
  const [ zipCode, setZipCode ] = useState('');
  // const [ selectedQuiz, setSelectedQuiz ] = useState('');

  return (
    <div className="flex-row-space m-t-26">
      <div className="credit-card-container">
        <CardInfo />
      </div>
      <div className="credit-card-container">
        {
          tab == 0 &&
            <NCreditScore
              email={email}
              password={password}
              firstName={firstName}
              lastName={lastName}
              setEmail={setEmail}
              setPassword={setPassword}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setNStitchQuestion={() => setTab(1)}
              setNStitchIdentity={() => setTab(2)}
              setNStitchWelcome={() => setTab(7)}
            />
        }
        {
          tab == 1 &&
            <NStitchQuestion
              selectedQeustion={selectedQeustion}
              answer={answer}
              setSelectedQeustion={setSelectedQeustion}
              setAnswer={setAnswer}
              isRegistering={false}
              setNStitchIdentity={() => setTab(2)}
            />
        }
        {
          tab == 2 && 
            <NStitchIdentity
              securityNum={securityNum}
              setSecurityNum={setSecurityNum}
              birthday={birthday}
              setBirthday={setBirthday}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setNStitchQuestion={() => setTab(1)}
              setNStitchAddress={() => setTab(3)}
            />
        }
        {
          tab == 3 &&
            <NStitchAddress
              ssn={securityNum}
              dob={birthday}
              mobile={phoneNumber}
              street={street}
              state={state}
              city={city}
              zipCode={zipCode}
              setStreet={setStreet}
              setState={setState}
              setCity={setCity}
              setZipCode={setZipCode}
              isRegistering={false}
              setNStitchIdentity={() => setTab(2)}
              setNStitchSms={() => setTab(4)}
              setNStitchWelcome={() => setTab(7)}
            />
        }
        {
          tab == 4 && 
            <NStitchSms
              isRegistering={false}
              setNStitchSms1={() => setTab(5)}
              setNStitchQuiz={() => setTab(6)}
            />
        }
        {
          tab == 5 && 
            <NStitchVerifyCode
              isRegistering={false}
              setNStitchQuiz={() => setTab(6)}
              setNStitchWelcome={() => setTab(7)}
            />
        }
        {
          tab == 6 && 
            <NStitchQuiz
              setNStitchWelcome={() => setTab(7)}
            />
        }
        {
          tab == 7 &&
            <NStitchWelcome
              setNStitchScore={() => setTab(8)}
            />
        }
        {
          tab == 8 &&
            <NStitchScore
            />
        }
      </div>
    </div>
  )
}

export default Nstitch;