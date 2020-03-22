import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import addToMailchimp from "gatsby-plugin-mailchimp";
import Input from "../Input/Input";
import Button from "../Button/Button";
import logo from "../../img/logo_white.svg";
import FormMessage from "../FormMessage/FormMessage";

const Footer = (props) => {
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
                Relevel is the fitness app on the mission to eliminate pain
                caused by the sedentary lifestyle. Professional training plans,
                easy daily routines and fun exercises, will take the away the
                aches caused by sitting in front of the computer too much.
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
              {setValidationMsg()}
            </div>
          </div>
        </div>
        <div className="content has-text-centered footer-logo">
          <img
            src={logo}
            alt="Relevel"
            style={{ width: "124px", height: "28px" }}
          />
          <div className="footer-copyrights">
            {"© Relevel " + new Date().getFullYear()}
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
