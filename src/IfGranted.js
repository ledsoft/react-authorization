import React from 'react';
import PropTypes from 'prop-types';

const IfGranted = (props) => {
    const expected = props.expected,
        actual = props.actual ? (Array.isArray(props.actual) ? props.actual : [props.actual]) : [];

    if (actual.indexOf(expected) !== -1) {
        return <React.Fragment>
            {props.children}
        </React.Fragment>
    } else {
        return props.unauthorized;
    }
};

IfGranted.propTypes = {
    expected: PropTypes.string.isRequired,     // The expected role
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

IfGranted.defaultProps = {
    unauthorized: null
};

export default IfGranted;
