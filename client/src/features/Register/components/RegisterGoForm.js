import * as React from "react";

import Logo from "../../../shared/components/Logo";

const RegisterGoForm = ({
  handleSubmit,
}) => {
  return (
    <>
      <div className="register-logo mt-5 ml-5">
        <Logo color="black" />
      </div>
      <div className="authentication-wrapper authentication-2 position-fixed">
        <div
          className="authentication-inner-right publicPage"
          style={{ maxWidth: "420px" }}
        >
          <div className="header">
            <div className="title font-22 pt-4">
              <span role="img" aria-label="spark">✨</span> We’re so happy to have you.<span role="img" aria-label="spark">✨</span>
            </div>
            <div className="subtitle pt-3">
              Thanks for creating an account with Sequin. Get ready to crush
              your credit goals. <span role="img" aria-label="muscle">💪</span>
            </div>
          </div>
          <form className="pb-4 m-t-40">
            <div className="d-flex justify-content-center">
              <a
                className="cta btn btn-primary col-7"
                href="/home"
              >
                Let’s Get To It!
              </a>
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
};

export default RegisterGoForm;
