import React from "react";
import { Link } from "gatsby";
import logo from "../../img/logo.svg";
import { graphql, StaticQuery } from "gatsby";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
            });
      }
    );
  };

  render() {
    const currentPageURL = window.location.href;
    const isBlog = currentPageURL.indexOf("blog") > 0 ? true : false;
    const isAbout = currentPageURL.indexOf("about") > 0 ? true : false;
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item navbar-logo" title="Logo">
              <img src={logo} alt="Relvel" style={{ width: "88px" }} />
            </Link>
          </div>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${this.state.navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => this.toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>

          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-links-container">
              <Link
                className={`navbar-item ${isBlog ? `navbar-item-active` : ``}`}
                to="/blog"
              >
                Blog
              </Link>
              <Link
                className={`navbar-item ${isAbout ? `navbar-item-active` : ``}`}
                to="/about"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query SITE_METADATA_NAV {
        sitePage {
          path
        }
      }
    `}
    render={data => <Navbar data={data} />}
  />
);
