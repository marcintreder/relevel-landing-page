import React from "react";
import PropTypes from "prop-types";

const Input = ({ placeholder, kind, type, onChangeFunction, name }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`input-transparent ${kind === "white" ? "input-transparent__white" : "input-transparent__purple"}`}
    onChange={(e) => onChangeFunction(e)}
    name={name}
  />
);

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "number",
    "date",
    "image",
    "email",
    "password",
    "tel",
    "time",
    "url",
    "week",
    "search"
  ]),
  placeholder: PropTypes.string,
  kind: PropTypes.oneOf(["white", "purple"]),
  onChangeFunction: PropTypes.func,
  name: PropTypes.string
};

export default Input;
