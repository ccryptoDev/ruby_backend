import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

import "../../../vendor/styles/pages/authentication.scss";
import "../../../shared/assets/styles/styles.scss";

import RegisterFormNew from './RegisterFormNew';
import RegisterDetailForm from './RegisterDetailForm';
import RegisterGoForm from './RegisterGoForm';

const RegisterForm = ({
  error,
  isRegistering,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ tab, setTab ] = useState(1);
  const [ showAlert, setShowAlert ] = useState(false);

  const onClickSubmit = () => {
    const data = { email, password, firstName, lastName, phoneNumber };
    onSubmit(data);
    if (error == undefined || error.length !== 0) {
      setShowAlert(true);
    } else {
      setTab(3);
    }
  }

  return (
    <div className="register-back">
      {showAlert && (
        <Alert
          variant="warning"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <div align="center">
            <p className="mb-0">{error}</p>
          </div>
        </Alert>
      )}
      {
        tab === 1 &&
          <RegisterFormNew
            isRegistering={isRegistering}
            setRegisterDetailForm={() => {
              setTab(2);
            }}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
      }
      {
        tab === 2 &&
          <RegisterDetailForm
            isRegistering={isRegistering}
            setFormNew={() => setTab(1)}
            setRegisterGoForm={() => onClickSubmit()}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
      }
      {
        tab === 3 &&
          <RegisterGoForm />
      }
    </div>
  );
};

export default RegisterForm;
