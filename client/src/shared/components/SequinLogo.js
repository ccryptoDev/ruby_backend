import * as React from "react";
import Logo from "../shared/logo";

export const SequinLogo = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="ui-w-100">
        <div className="w-100 position-relative">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default SequinLogo;
