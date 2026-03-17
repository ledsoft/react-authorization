import React from 'react';
import PropTypes from 'prop-types';

const IfAuthorized = ({isAuthorized, unauthorized = null, children}) => {
    if (typeof isAuthorized === "function") {
        return isAuthorized() ? <React.Fragment>{children}</React.Fragment> : unauthorized;
    }
    return isAuthorized === true ? <React.Fragment>{children}</React.Fragment> : unauthorized;
};

IfAuthorized.propTypes = {
    isAuthorized: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),    // Either an authorization function returning boolean or directly boolean
    unauthorized: PropTypes.node  // Node to render if the actual roles do not match any the expected
};

export default IfAuthorized;
