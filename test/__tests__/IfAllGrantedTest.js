import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
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

    it('renders custom component when actual roles do not contain all expected', () => {
        class Unauthorized extends React.Component {
            render() {
                return <div>Unauthorized!</div>;
            }
        }

        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = 'ROLE_USER';
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual}
                                                           unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfAllGranted>);

        const result = TestUtils.findRenderedComponentWithType(component, Unauthorized);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        const comps = TestUtils.scryRenderedComponentsWithType(component, TestComponent);
        expect(comps.length).toEqual(0);
    });

    it('renders child directly without any wrapper element if there is only one', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = Environment.render(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);
        const element = ReactDOM.findDOMNode(root);
        // The root is a div - TestApp
        expect(element.firstChild.nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders children directly without any wrapper', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = Environment.render(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
            <TestComponent/>
        </IfAllGranted>);
        const element = ReactDOM.findDOMNode(root);
        // The root is a div - TestApp
        expect(element.firstChild.nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders nothing when no children are passed to the component', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const component = Environment.render(<IfAllGranted expected={expected} actual={actual}/>);
        const element = ReactDOM.findDOMNode(component);
        expect(element.children.length).toEqual(0);
    });
});
