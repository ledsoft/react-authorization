import React from "react";
import {mount, shallow} from "enzyme";

import TestComponent from "../environment/TestComponent";
import IfGranted from "../../src/IfGranted";
import Unauthorized from "../environment/Unauthorized";

describe('IfAnyGranted', () => {

    it('does not render children if the actual roles do not contain the expected one', () => {
        const expected = 'ROLE_ADMIN',
            actual = ['ROLE_USER'];
        const component = shallow(<IfGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders children if the actual roles contain the expected one', () => {
        const expected = 'ROLE_ADMIN',
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfGranted>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children if the actual roles are undefined', () => {
        const expected = 'ROLE_ADMIN';
        const component = shallow(<IfGranted expected={expected}>
            <TestComponent/>
        </IfGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders custom component when actual roles do not contain the expected', () => {
        const expected = 'ROLE_ADMIN',
            actual = 'ROLE_USER';
        const component = shallow(<IfGranted expected={expected} actual={actual} unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfGranted>);

        expect(component.exists(Unauthorized)).toBeTruthy();
        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders child directly without any wrapper element if there is only one', () => {
        const expected = 'ROLE_ADMIN',
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = mount(<IfGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfGranted>);
        // The root is a div - TestApp
        expect(root.getDOMNode().nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders children directly without any wrapper element', () => {
        const expected = 'ROLE_USER',
            actual = ['ROLE_USER'];
        const root = mount(<IfGranted expected={expected} actual={actual}>
            <TestComponent/>
            <TestComponent/>
        </IfGranted>);
        // The root is a div - TestApp
        expect(root.getDOMNode()[0].nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders nothing when no children are passed to the component', () => {
        const expected = 'ROLE_USER',
            actual = ['ROLE_USER'];
        const root = mount(<IfGranted expected={expected} actual={actual}/>);
        expect(root.children().length).toEqual(0);
    });
});
