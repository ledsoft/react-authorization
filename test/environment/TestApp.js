'use strict';

import React from 'react';

export default class TestApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            {this.props.children}
        </div>;
    }
}
