import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UpdateForm from "./components/UpdateForm";
import { resetPasswordUpdate } from "../../store/actions/user.actions";

const mapStateToProps = ({ user }) => ({
  isUpdating: user.isLoading,
  error: user.error,
});

export const UpdatePasswordController = ({
  error,
  isUpdating,
  onResetPasswordUpdate,
}) => {
  const history = useHistory();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { digest } = useParams();

  const onReset = React.useCallback(() => {
    onResetPasswordUpdate({ password, confirmPassword, digest }).then((res) => {
      console.log("onlog res:", res);

      if (!res?.value?.error) {
        history.push("/login");
      }
    });
  }, [history, onResetPasswordUpdate, password, confirmPassword, digest]);

  return (
    <>
      <Helmet>
        <title>Password reset - Sequin</title>
      </Helmet>
      <UpdateForm
        error={error}
        isUpdating={isUpdating}
        onReset={onReset}
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </>
  );
};

export default connect(mapStateToProps, {
  onResetPasswordUpdate: resetPasswordUpdate,
})(UpdatePasswordController);
