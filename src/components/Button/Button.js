import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, kind, dots }) => (
  <button
    className={`button-primary ${kind === "white" ? "button-primary__white" : "button-primary__purple"}`}
  >{label}</button>
);

Button.propTypes = {
  label: PropTypes.string,
  kind: PropTypes.oneOf(["white", "purple"]),
  dots: PropTypes.bool
};

export default Button;
