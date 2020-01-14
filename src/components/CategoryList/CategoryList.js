import React from "react";
import PropTypes from "prop-types";

const CategoryList = ({ title, taglist }) => (
  <aside className="categorylist-aside">
    <h3>{title}</h3>
    <ul className="categorylist-cat">
      {taglist.map(item => (
        <li className="categorylist-cat--item">{item}</li>
      ))}
    </ul>
    <h3>Follow Us!</h3>
  </aside>
);

CategoryList.propTypes = {
  title: PropTypes.string,
  taglist: PropTypes.array
};

export default CategoryList;
