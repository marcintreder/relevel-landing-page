import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import Input from "../Input/Input";
import Button from "../Button/Button";
import FormMessage from "../FormMessage/FormMessage";
import Terms from "../Terms/Terms";

const Hero = ({
  image,
  title,
  titleDefault,
  signupForm,
  subheading,
  imageAlt,
  imageTitle,
  readOnLink,
  eyeBrow,
  linkedHeader
}) => {
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
        setError(true);
      });

    trackCustomEvent({
      category: "CTA",
      action: "Submit",
      label: "Form Homepage Hero CTA",
      value: 100
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
    <div className="section hero-modified">
      <div className="container hero-container">
        <div
          className="hero-image"
          role="img"
          aria-label={imageAlt}
          alt={imageAlt}
          title={imageTitle}
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`
          }}
        ></div>
        <div className="column hero-text">
          {eyeBrow ? <small className="hero-eyebrow">{eyeBrow}</small> : ""}
          {titleDefault ? (
            <h1 className="hero-h1">
              Healthy Body in <br />
              the Desk-Bound World.
            </h1>
          ) : !linkedHeader ? (
            <h1 className="hero-h1">{title}</h1>
          ) : (
            <Link to={linkedHeader} className="hero-h1-link">
              <h1 className="hero-h1">{title}</h1>
            </Link>
          )}
          {!readOnLink ? (
            <h3 className="hero-h3">{subheading}</h3>
          ) : (
            <>
            <h3 className="hero-h3">
              <p>{subheading}</p>
            </h3>
            <Link to={readOnLink} className="hero-read-link">Read more</Link>
            </>
          )}
          {signupForm ? (
            <>
              <form className="hero-form" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="email"
                  kind="purple"
                  placeholder="Your email address"
                  onChangeFunction={handleEmailChange}
                />
                <Button label="Get early access" kind="purple" type="submit" />
              </form>
              <Terms className="hero-terms" />
              {setValidationMsg()}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  image: PropTypes.object,
  imageTitle: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  titleDefault: PropTypes.bool,
  subheading: PropTypes.string,
  signupForm: PropTypes.bool,
  nonFormCTA: PropTypes.string,
  readOnLink: PropTypes.string,
  eyeBrow: PropTypes.string,
  linkedHeader: PropTypes.string
};

Hero.defaultProps = {
  signupForm: true,
  readOnDesc: false,
  linkedHeader: false
};

export default Hero;
