import React from "react";
import PropTypes from "prop-types";

const FormMessage = (props) => {
    const createContent = () => ({__html: props.message})

    return (
        <span 
            role="status"
            aria-live="polite"
            className={`form-msg ${props.kind === "error" ? 'form-msg__error' : 'form-msg__success'}`}
            dangerouslySetInnerHTML={createContent()}>
        </span>
    )
}

FormMessage.propTypes = {
    message: PropTypes.string,
    kind: PropTypes.oneOf(["error", "success"])
}

export default FormMessage