import React from "react";
import PropTypes from "prop-types";

const IfNoneGranted = ({expected, actual, unauthorized = null, children}) => {
    expected = expected ? (Array.isArray(expected) ? expected : [expected]) : [];
    actual = actual ? (Array.isArray(actual) ? actual : [actual]) : [];
    let found = false;
    for (let i = 0; i < expected.length; i++) {
        if (actual.indexOf(expected[i]) !== -1) {
            found = true;
            break;
        }
    }
    if (!found && actual.length !== 0) {
        return <React.Fragment>
            {children}
        </React.Fragment>;
    } else {
        return unauthorized;
    }
};

IfNoneGranted.propTypes = {
    expected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The expected roles
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

export default IfNoneGranted;
