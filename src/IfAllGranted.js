import React from "react";
import PropTypes from "prop-types";

const IfAllGranted = (props) => {
    const expected = props.expected,
        actual = props.actual ? (Array.isArray(props.actual) ? props.actual : [props.actual]) : [];
    for (let i = 0; i < expected.length; i++) {
        if (actual.indexOf(expected[i]) === -1) {
            return props.unauthorized;
        }
    }
    if (!Array.isArray(props.children)) {
        return props.children ? props.children : null;
    }
    return <React.Fragment>
        {props.children}
    </React.Fragment>;
};

IfAllGranted.propTypes = {
    expected: PropTypes.array.isRequired,     // The expected roles
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match the expected
};

IfAllGranted.defaultProps = {
    unauthorized: null
};

export default IfAllGranted;
