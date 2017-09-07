import React from 'react';
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import Environment from "../environment/Environment";
import TestComponent from "../environment/TestComponent";

import IfAnyGranted from "../../src/IfAnyGranted";

describe('IfAnyGranted', () => {

    it('renders children if the actual roles contain all of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);

        const comp = TestUtils.findRenderedComponentWithType(component, TestComponent);
        expect(comp).toBeDefined();
        expect(comp).not.toBeNull();
    });

    it('does not render children if the actual roles contain none of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = null;
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);

        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('renders children if the actual roles contain at least one of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);

        const comp = TestUtils.findRenderedComponentWithType(component, TestComponent);
        expect(comp).toBeDefined();
        expect(comp).not.toBeNull();
    });

    it('does not render children if the actual roles are undefined', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = Environment.render(<IfAnyGranted expected={expected}>
            <TestComponent/>
        </IfAnyGranted>);

        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('renders custom component when actual roles do not contain any of the expected', () => {
        class Unauthorized extends React.Component {
            render() {
                return <div>Unauthorized!</div>;
            }
        }

        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = null;
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual}
                                                           unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfAnyGranted>);

        const result = TestUtils.findRenderedComponentWithType(component, Unauthorized);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('renders child directly without any wrapper element if there is only one', () => {
        const expected = ['ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = Environment.render(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);
        const element = ReactDOM.findDOMNode(root);
        // The root is a div - TestApp
        expect(element.firstChild.nodeName.toLowerCase()).toEqual('h1');
    });

    it('wraps children in a div element if there are multiple', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
            <TestComponent/>
        </IfAnyGranted>);
        const element = ReactDOM.findDOMNode(component);
        // The root is a div - TestApp
        expect(element.firstChild.nodeName.toLowerCase()).toEqual('div');
    });

    it('renders custom element around the children', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual} element='span'>
            <TestComponent/>
            <TestComponent/>
        </IfAnyGranted>);

        const comp = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
        expect(comp).toBeDefined();
        expect(comp).not.toBeNull();
    });

    it('renders nothing when no children are passed to the component', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAnyGranted expected={expected} actual={actual}/>);
        const element = ReactDOM.findDOMNode(component);
        expect(element.children.length).toEqual(0);
    });
});
