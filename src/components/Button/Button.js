import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, kind }) => (
  <button
    className={`button-primary ${kind === "white" ? "button-primary__white" : "button-primary__purple"}`}
  >{label}</button>
);

Button.propTypes = {
  label: PropTypes.string,
  kind: PropTypes.oneOf(["white", "purple"]),
};

export default Button;
