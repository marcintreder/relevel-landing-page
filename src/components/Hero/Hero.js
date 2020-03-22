import React, { useState } from "react";
import PropTypes from "prop-types";
import addToMailchimp from 'gatsby-plugin-mailchimp';
import Input from "../Input/Input"
import Button from "../Button/Button"
import FormMessage from "../FormMessage/FormMessage"

const Hero = ({ image, title, subheading, imageAlt, imageTitle }) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showMsg, setShowMsg] = useState('');

  // Time set for visibility of validation messages
  const msgTime = 8000;

  const handleSubmit = (e) => {
    e.preventDefault();
    addToMailchimp(email)
      .then((data) => {
        if(data.result === "error") {
          setError(data.msg)
          setShowMsg(true)

          // Message will disappear after a time set in msgTime
          setTimeout(() => {
            setShowMsg(false)
          }, msgTime)
        }
        else if(data.result === "success") {
          setSuccess(data.msg)
          setShowMsg(true)

          // Message will disappear after a time set in msgTime
          setTimeout(() => {
            setShowMsg(false)
          }, msgTime)
        }
      })
      .catch((error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        setError(true)
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const setValidationMsg = () => {
    if (error !== '' && showMsg) {
      return (
        <FormMessage kind="error" message={error} />
      )
    }
    else if (success !== '' && showMsg) {
      return (
      <FormMessage kind="success" message={success} />
      )
    }
    else {
      return null
    }

  }


  return (
  <div className="hero-modified">
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
        <h1 className="hero-h1">{title}</h1>
        <h3 className="hero-h3">{subheading}</h3>
        <form className="hero-form" onSubmit={handleSubmit}>
          <Input 
            type="text"
            name="email" 
            className="input-transparent input-transparent__purple"
            placeholder="Your email address"
            onChangeFunction={handleEmailChange}
          />
          <Button label="Get early Access" kind="purple" type="submit" />
        </form>
        {setValidationMsg()}
      </div>
    </div>
  </div>)
};

Hero.propTypes = {
    image: PropTypes.object,
    imageTitle: PropTypes.string,
    imageAlt: PropTypes.string,
    title: PropTypes.string,
    subheading: PropTypes.string
}

export default Hero