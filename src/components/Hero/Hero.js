import React, { useState } from "react";
import PropTypes from "prop-types";
import addToMailchimp from 'gatsby-plugin-mailchimp';
import Input from "../Input/Input"
import Button from "../Button/Button"

const Hero = ({ image, title, subheading, imageAlt, imageTitle }) => {

  const [email, setEmail] = useState('');

  console.log(email)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    addToMailchimp(email)
      .then((data) => {
        console.log(data)
        alert(data.result);
      })
      .catch((error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        console.log(error)
      });
  };

  const handleEmailChange = (event) => {
    console.log(event)
    setEmail(event.currentTarget.value);
  };


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
          <input 
            type="text"
            name="email" 
            className="input-transparent input-transparent__purple"
            placeholder="Your email address"
            onChange={handleEmailChange}
            />
          <Button label="Get early Access" kind="purple" type="submit" />
        </form>
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