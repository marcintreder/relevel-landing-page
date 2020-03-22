import React, { useState } from "react";
import PropTypes from "prop-types";
import addToMailchimp from "gatsby-plugin-mailchimp";
import Button from "../Button/Button";
import Input from "../Input/Input";
import FormMessage from "../FormMessage/FormMessage";

const ComingSoon = ({
  image,
  title,
  description,
  imageAlt,
  imageTitle,
  ...props
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
        console.log(error)
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
    <section className="section">
      <div className="container comingsoon-container">
        <div className="comingsoon-text-container">
          <h2 className="comingsoon-header">{title}</h2>
          <div className="comingsoon-description">{description}</div>
          <form className="comingsoon-form" onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="email"
              placeholder="Your email address" 
              kind="purple"
              onChangeFunction={handleEmailChange} 
            />
            <Button kind="purple" label="Get early access" type="submit" />
          </form>
          {setValidationMsg()}
        </div>
        <div
          className="comingsoon-image"
          role="img"
          aria-label={imageAlt}
          alt={imageAlt}
          title={imageTitle}
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
      </div>
    </section>
  );
};

ComingSoon.propTypes = {
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ComingSoon;
