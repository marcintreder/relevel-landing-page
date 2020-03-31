import React from "react";
import { Link } from "gatsby";

const Terms = props => (<small className={`terms ${props.className}`}>
By signing-up you fully consent to our <Link to="/policies/privacy-policy">Privacy Policy</Link> & <Link to="/policies/terms-of-service">Terms of Service</Link>.
</small>)

export default Terms