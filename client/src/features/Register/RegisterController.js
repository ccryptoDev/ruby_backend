import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import { register } from "./../../store/actions/user.actions";
import amplitude from "amplitude-js";

const mapStateToProps = ({ user }) => ({
  isRegistering: user.isLoading,
  error: user.error,
});

export const RegisterController = ({ error, isRegistering, onRegister }) => {

  const history = useHistory();

  const handleSubmit = (data) => {
    onRegister(data).then((res) => {
      console.log("onreg res:", res);
      if (!res?.value?.error) {
        var identify = new amplitude.Identify().set(
          "email",
          res.value.user.email,
        );
        identify.setOnce("REGISTER_TIME", res.value.user.created_at);
        amplitude.getInstance().setUserId(res.value.user.id);
        amplitude.getInstance().identify(identify);

        amplitude.getInstance().logEvent("CREATED_ACCOUNT");

        history.push("/home");
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>Register - Sequin</title>
      </Helmet>
      <RegisterForm
        error={error}
        isRegistering={isRegistering}
        onSubmit={(data) => handleSubmit(data)}
      />
    </>
  );
};

export default connect(mapStateToProps, {
  onRegister: register,
})(RegisterController);
