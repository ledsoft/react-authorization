import React from 'react';
import PropTypes from 'prop-types';

const IfAuthorized = props => {
    return props.isAuthorized && props.isAuthorized() ?
        <React.Fragment>{props.children}</React.Fragment> : props.unauthorized;
};

IfAuthorized.propTypes = {
    isAuthorized: PropTypes.func.isRequired,    // Authorization function, should return boolean
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

IfAuthorized.defaultProps = {
    unauthorized: null
};

export default IfAuthorized;
