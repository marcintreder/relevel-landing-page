import React from "react";
import { Link } from "gatsby";
import CookieConsent from "react-cookie-consent";
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
    let isBlog = false;
    let isAbout = false;

    if (typeof window !== "undefined") {
      const currentPageURL = window.location.href;
      isBlog = currentPageURL.indexOf("blog") > 0 ? true : false;
      isAbout = currentPageURL.indexOf("about") > 0 ? true : false;
    }

    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <CookieConsent
          disableStyles={true}
          buttonClasses="button-primary button-primary__white cookies-button"
          containerClasses="cookies-container"
          contentClasses="cookies-content" 
        >
          We use cookies to improve performance and enhance your experience. By
          using our website you agree to our use of cookies in accordance with
          our <Link to="/policies/privacy-policy">privacy policy</Link>.
        </CookieConsent>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo" title="Logo">
              <img src={logo} alt="Relevel" style={{ width: "88px" }} />
            </Link>
          </div>
          {/* Hamburger menu */}
          <div
            role="button"
            className={`navbar-burger burger ${this.state.navBarActiveClass}`}
            data-target="navMenu"
            tabIndex="0"
            onClick={() => this.toggleHamburger()}
            onKeyDown={() => this.toggleHamburger()}
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
              <ul className="navbar-social">
                <li>
                  <a href="https://twitter.com/relevelapp">
                    <i
                      className="navbar-social--twitter"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/relevelapp">
                    <i
                      className="navbar-social--instagram"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="https://pinterest.com/relevelapp">
                    <i
                      className="navbar-social--pinterest"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
              </ul>
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
