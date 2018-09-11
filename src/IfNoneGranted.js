import React from "react";
import PropTypes from "prop-types";

const IfNoneGranted = (props) => {
    const expected = props.expected ? (Array.isArray(props.expected) ? props.expected : [props.expected]) : [],
        actual = props.actual ? (Array.isArray(props.actual) ? props.actual : [props.actual]) : [];
    let found = false;
    for (let i = 0; i < expected.length; i++) {
        if (actual.indexOf(expected[i]) !== -1) {
            found = true;
            break;
        }
    }
    if (!found && actual.length !== 0) {
        if (!Array.isArray(props.children)) {
            return props.children ? props.children : null;
        }
        return React.createElement(props.element, null, props.children);
    } else {
        return props.unauthorized;
    }
};

IfNoneGranted.propTypes = {
    expected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The expected roles
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    element: PropTypes.string,     // Type of element to render around the children, defaults to 'div'
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

IfNoneGranted.defaultProps = {
    element: 'div',
    unauthorized: null
};

export default IfNoneGranted;
