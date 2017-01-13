'use strict';

import React from 'react';
import TestUtils from "react-addons-test-utils";
import Environment from "../environment/Environment";
import TestComponent from "../environment/TestComponent";

import IfAllGranted from "../../src/IfAllGranted";

describe('IfAllGranted', () => {

    it('renders children if the actual roles contain all the expected ones', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        const comp = TestUtils.findRenderedComponentWithType(component, TestComponent);
        expect(comp).toBeDefined();
        expect(comp).not.toBeNull();
    });

    it('does not render children if the actual roles contain none of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = null;
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('does not render children if the actual roles contain only some of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('does not render children if the actual roles are undefined', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = Environment.render(<IfAllGranted expected={expected}>
            <TestComponent/>
        </IfAllGranted>);

        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('renders custom element around the children', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual} element='span'>
            <TestComponent/>
        </IfAllGranted>);

        const comp = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
        expect(comp).toBeDefined();
        expect(comp).not.toBeNull();
    });

    it('renders custom component when actual roles do not contain all expected', () => {
        const Unauthorized = React.createClass({
                render: function () {
                    return <div>Unauthorized!</div>;
                }
            }), expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = 'ROLE_USER';
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual} unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfAllGranted>);

        const result = TestUtils.findRenderedComponentWithType(component, Unauthorized);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });
});
