import React from "react";
import PropTypes from "prop-types";

const IfAnyGranted = ({expected, actual, unauthorized = null, children}) => {
    actual = actual ? (Array.isArray(actual) ? actual : [actual]) : [];
    let found = expected.length <= 0;
    for (let i = 0; i < expected.length; i++) {
        if (actual.indexOf(expected[i]) !== -1) {
            found = true;
            break;
        }
    }
    if (found) {
        return <React.Fragment>
            {children}
        </React.Fragment>
    } else {
        return unauthorized;
    }
};

IfAnyGranted.propTypes = {
    expected: PropTypes.array.isRequired,     // The expected roles
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

export default IfAnyGranted;
