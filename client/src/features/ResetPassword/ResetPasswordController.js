import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { ResetForm } from "./components/ResetForm";
import { resetPasswordCreate } from "../../store/actions/user.actions";
import Logo from "../../shared/components/Logo";

const mapStateToProps = ({ user }) => ({
  isUpdating: user.isLoading,
  error: user.error,
});

export const ResetPasswordController = ({
  error,
  isUpdating,
  onResetPasswordCreate,
}) => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const onReset = React.useCallback(() => {
    onResetPasswordCreate({ email }).then((res) => {
      console.log("onlog res:", res);

      if (!res?.value?.error) {
        setShowAlert(true);
      }
    });
  }, [email, history, onResetPasswordCreate]);

  return (
    <>
      <div className="mt-5 ml-5">
        <Logo color="black" />
      </div>

      <Helmet>
        <title>Password reset - Sequin</title>
      </Helmet>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <div align="center">
            <p className="mb-0">
              Your Reset Password email has been sent! (Please check your Spam
              folder if you haven't received it)
            </p>
          </div>
        </Alert>
      )}
      <ResetForm
        email={email}
        error={error}
        isUpdating={isUpdating}
        onReset={onReset}
        setEmail={setEmail}
      />
    </>
  );
};

export default connect(mapStateToProps, {
  onResetPasswordCreate: resetPasswordCreate,
})(ResetPasswordController);
