import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestApp from '../environment/TestApp';

export default class Environment {

    static render(component) {
        return TestUtils.renderIntoDocument(<TestApp>{component}</TestApp>);
    }
}
