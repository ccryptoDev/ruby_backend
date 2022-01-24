import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginForm from "./components/LoginFormNew";
import { login } from "../../store/actions/user.actions";
import amplitude from "amplitude-js";
import Helper from "../../shared/utils/utils";
import { Alert } from "react-bootstrap";

const mapStateToProps = ({ user }) => ({
  isLoggingIn: user.isLoading,
  error: user.error,
});

export const LoginController = ({ error, isLoggingIn, onLogin }) => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [corrects, setCorrects] = React.useState({});
  const [showAlert, setShowAlert] = React.useState(false);

  const onSubmit = React.useCallback(() => {
    let validationErrors = {};
    let validationCorrects = {};

    setShowAlert(false);
    if (email.length < 1) {
      validationErrors.email = "Email can't be empty";
    } else {
      if (!Helper.validateEmail(email)) {
        validationErrors.email = "Email is invalid";
      } else {
        validationCorrects.email = "valid";
      }
    }
    if (password.length < 1) {
      validationErrors.password = "Password can't be empty";
    } else if (password.length < 6) {
      validationErrors.password = "Password length should be 6 at least";
    } else {
      validationCorrects.password = "valid";
    }
    setErrors(validationErrors);
    setCorrects(validationCorrects);
    if (Object.keys(validationErrors).length > 0) return;

    onLogin({ email, password }).then((res) => {
      console.log("onlog res:", res);

      if (!res?.value?.error) {
        history.push("/home");
        var identify = new amplitude.Identify().set(
          "email",
          res.value.user.email,
        );
        amplitude.getInstance().setUserId(res.value.user.id);
        amplitude.getInstance().identify(identify);

        amplitude.getInstance().logEvent("LOGGED_IN");
      } else {
        setShowAlert(true);
      }
    });
  }, [email, history, onLogin, password, errors, corrects]);

  const onRegister = () => {
    history.push("/register");
  };

  return (
    <>
      <Helmet>
        <title>Login - Sequin</title>
      </Helmet>
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
      <LoginForm
        email={email}        
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}        
        onSubmit={onSubmit}
        onRegister={onRegister}
        isLoggingIn={isLoggingIn}
        error={error}
        errors={errors}
        corrects={corrects}
      />
    </>
  );
};

export default connect(mapStateToProps, {
  onLogin: login,
})(LoginController);
