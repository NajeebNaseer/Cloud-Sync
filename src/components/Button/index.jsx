import React from "react";

// import { classNames } from '../../utils';
import "./styles.css";

const Button = ({ children, processing, isExtension, ...props }) => (
  <div className="sc__button-container">
    <button
      {...props}
      className={("sc__button", isExtension && "sc__button-extension")}
    >
      {children}
    </button>
    <div
      className={
        ("sc__button-progress", processing && "sc__button-progress-processing")
      }
    />
  </div>
);

export default Button;
