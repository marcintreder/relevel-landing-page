import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import twitter from "../../img/social/twitter.svg";
import facebook from "../../img/social/facebook.svg";
import instagram from "../../img/social/instagram.svg";

const CategoryList = ({ title, taglist }) => (
  <aside className="categorylist-aside">
    <div className="categorylist-wrapper">
    <h3 className="categorylist-header">{title}</h3>
    <ul className="categorylist-cat">
      {taglist.map((item, i) => (
        <li className="categorylist-cat--item" key={`categorylist${i}`}>
          <Link to={`/tags/${item.replace(/ /g, "-")}`}>{item}</Link>
        </li>
      ))}
    </ul>
    </div>
    <div className="categorylist-social">
      <h3 className="categorylist-header">Follow Us!</h3>
      <ul className="categorylist-social--list">
        <li className="categorylist-social--item">
          <a href="https://twitter.com/relevelapp" className="categorylist-social--logo categorylist-social--logo_twitter">
          </a>
        </li>
        <li className="categorylist-social--item">
          <a href="#" className="categorylist-social--logo categorylist-social--logo_instagram">
          </a>
        </li>
        <li className="categorylist-social--item">
          <a href="#" className="categorylist-social--logo categorylist-social--logo_facebook">
          </a>
        </li>
      </ul>
    </div>
  </aside>
);

CategoryList.propTypes = {
  title: PropTypes.string,
  taglist: PropTypes.array
};

export default CategoryList;
