'use strict';

import React from 'react';

const IfGranted = (props) => {
    const expected = props.expected,
        actual = props.actual ? (Array.isArray(props.actual) ? props.actual : [props.actual]) : [];

    if (actual.indexOf(expected) !== -1) {
        return React.createElement(props.element, null, props.children);
    } else {
        return props.unauthorized;
    }
};

IfGranted.propTypes = {
    expected: React.PropTypes.string.isRequired,     // The expected role
    actual: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),     // The actual roles
    element: React.PropTypes.string,     // Type of element to render around the children, defaults to 'div'
    unauthorized: React.PropTypes.node  // Node to render if the actual roles do not match any the expected
};

IfGranted.defaultProps = {
    element: 'div',
    unauthorized: null
};

export default IfGranted;
