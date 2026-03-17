import React from "react";
import PropTypes from "prop-types";

const IfAllGranted = ({expected, actual, unauthorized = null, children}) => {
    actual = actual ? (Array.isArray(actual) ? actual : [actual]) : [];
    for (let i = 0; i < expected.length; i++) {
        if (actual.indexOf(expected[i]) === -1) {
            return unauthorized;
        }
    }
    return <React.Fragment>
        {children}
    </React.Fragment>;
};

IfAllGranted.propTypes = {
    expected: PropTypes.array.isRequired,     // The expected roles
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match the expected
};

export default IfAllGranted;
