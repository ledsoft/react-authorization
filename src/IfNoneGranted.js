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
        return <React.Fragment>
            {props.children}
        </React.Fragment>;
    } else {
        return props.unauthorized;
    }
};

IfNoneGranted.propTypes = {
    expected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The expected roles
    actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),     // The actual roles
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

IfNoneGranted.defaultProps = {
    unauthorized: null
};

export default IfNoneGranted;
