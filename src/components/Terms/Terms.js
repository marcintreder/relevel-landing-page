import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Terms = props => (<small className={`terms ${props.className} ${props.white ? 'terms--white' : ''}`}>
By signing-up you fully consent to our <Link to="/policies/privacy-policy">Privacy Policy</Link> & <Link to="/policies/terms-of-service">Terms of Service</Link>.
</small>)

Terms.propTypes = {
    white: PropTypes.bool
}

export default Terms