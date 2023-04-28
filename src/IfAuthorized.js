import React from 'react';
import PropTypes from 'prop-types';

const IfAuthorized = props => {
    if (typeof props.isAuthorized === "function") {
        return props.isAuthorized() ? <React.Fragment>{props.children}</React.Fragment> : props.unauthorized;
    }
    return props.isAuthorized === true ? <React.Fragment>{props.children}</React.Fragment> : props.unauthorized;
};

IfAuthorized.propTypes = {
    isAuthorized: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),    // Either an authorization function returning boolean or directly boolean
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

IfAuthorized.defaultProps = {
    unauthorized: null
};

export default IfAuthorized;
