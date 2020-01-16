import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Breadcrumb = ({ secondPage, currentPage }) => (
  <div className="breadcrumb">
    <ul>
      <li>
        <Link to="/">Relevel</Link>
      </li>
      {secondPage ? (
        <li>
          <Link to={`/${secondPage}`}>{secondPage}</Link>
        </li>
      ) : (
        ""
      )}
      <li>
        <span>{currentPage}</span>
      </li>
    </ul>
  </div>
);

Breadcrumb.propTypes = {
  secondPage: PropTypes.string,
  currentPage: PropTypes.string
};

export default Breadcrumb;
