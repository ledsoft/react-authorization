'use strict';

import React from 'react';

const IfAllGranted = (props) => {
    const expected = props.expected,
        actual = props.actual ? (Array.isArray(props.actual) ? props.actual : [props.actual]) : [];
    for (let i = 0; i < expected.length; i++) {
        if (actual.indexOf(expected[i]) === -1) {
            return props.unauthorized;
        }
    }
    return React.createElement(props.element, null, props.children);
};

IfAllGranted.propTypes = {
    expected: React.PropTypes.array.isRequired,     // The expected roles
    actual: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),     // The actual roles
    element: React.PropTypes.string,     // Type of element to render around the children, defaults to 'div'
    unauthorized: React.PropTypes.node  // Node to render if the actual roles do not match the expected
};

IfAllGranted.defaultProps = {
    element: 'div',
    unauthorized: null
};

export default IfAllGranted;
