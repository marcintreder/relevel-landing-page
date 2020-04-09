import React, { useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import Input from "../Input/Input";
import Button from "../Button/Button";
import logo from "../../img/logo_white.svg";
import FormMessage from "../FormMessage/FormMessage";
import Terms from "../Terms/Terms";

const Footer = props => {
  const {
    data: {
      markdownRemark: {
        frontmatter: {
          footer: { latest: articles }
        }
      }
    }
  } = props;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showMsg, setShowMsg] = useState("");

  // Time set for visibility of validation messages
  const msgTime = 8000;

  const handleSubmit = e => {
    e.preventDefault();
    addToMailchimp(email)
      .then(data => {
        if (data.result === "error") {
          setError(data.msg);
          setShowMsg(true);

          // Message will disappear after a time set in msgTime
          setTimeout(() => {
            setShowMsg(false);
          }, msgTime);
        } else if (data.result === "success") {
          setSuccess(data.msg);
          setShowMsg(true);

          // Message will disappear after a time set in msgTime
          setTimeout(() => {
            setShowMsg(false);
          }, msgTime);
        }
      })
      .catch(error => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        console.log(error);
      });

      trackCustomEvent({
        category: "CTA",
        action: "Submit",
        label: "Form Footer CTA",
        value: 100
      })
  };

  const handleEmailChange = event => {
    setEmail(event.currentTarget.value);
  };

  const setValidationMsg = () => {
    if (error !== "" && showMsg) {
      return <FormMessage kind="error" message={error} />;
    } else if (success !== "" && showMsg) {
      return <FormMessage kind="success" message={success} />;
    } else {
      return null;
    }
  };
  return (
    <footer className="footer">
      <div className="content">
        <div className="container footer-container">
          <div className="footer-latest-container">
            <h3 className="footer-header">Latest Articles on Relevel Blog</h3>
            <ul className="footer-latest-list">
              {articles.map((item, i) => {
                return (
                  <li
                    className="footer-latest-list_item"
                    key={"latestitem" + i}
                  >
                    <a
                      href={item.url}
                      className="footer-latest-item_link"
                      key={"latestlink" + i}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-what-container">
            <h3 className="footer-header">What is Relevel?</h3>
            <div className="footer-what-description">
              Relevel is the fitness app on the mission to eliminate pain caused
              by the sedentary lifestyle. Professional training plans, easy
              daily routines and fun exercises, will take the away the aches
              caused by sitting in front of the computer too much.
            </div>
            <form className="footer-form" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="email"
                placeholder="Your email address"
                kind="white"
                onChangeFunction={handleEmailChange}
              />
              <Button
                label="Get early access"
                kind="white"
                dots
                type="submit"
              />
            </form>
            <Terms white />
            {setValidationMsg()}
          </div>
          <div className="footer-navigation-container">
            <h3 className="footer-header">Navigation</h3>
            <ul className="footer-latest-list">
              <li className="footer-latest-list_item">
                <Link to="/" className="footer-latest-item_link">
                  Homepage
                </Link>
              </li>
              <li className="footer-latest-list_item">
                <Link to="/blog" className="footer-latest-item_link">
                  Blog
                </Link>
              </li>
              <li className="footer-latest-list_item">
                <Link to="/about" className="footer-latest-item_link">
                  About Relevel
                </Link>
              </li>
              <li className="footer-latest-list_item">
                <Link
                  to="/policies/privacy-policy"
                  className="footer-latest-item_link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-latest-list_item">
                <Link
                  to="/policies/terms-of-service"
                  className="footer-latest-item_link"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-what-container">
            <div className="footer-what-trademarks">
              <div className="footer-logo">
              <img
                src={logo}
                alt="Relevel"
                style={{ height: "24px" }}
              />
              </div>
              {"© Relevel " + new Date().getFullYear()}. 
              Apple and the Apple logo are trademarks of Apple Inc., registered
              in the U.S. and other countries. Mac App Store is a service mark
              of Apple Inc. Google Play and the Google Play logo are trademarks
              of Google Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query Footer {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            footer {
              latest {
                title
                url
              }
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
);
