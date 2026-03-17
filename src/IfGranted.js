import React from 'react';
import PropTypes from 'prop-types';

const IfGranted = ({expected, actual, unauthorized = null, children}) => {
    actual = actual ? (Array.isArray(actual) ? actual : [actual]) : [];

    if (actual.indexOf(expected) !== -1) {
        return <React.Fragment>
            {children}
        </React.Fragment>
    } else {
        return unauthorized;
    }
};

IfGranted.propTypes = {
    expected: PropTypes.string.isRequired,     // The expected role
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

export default IfGranted;
