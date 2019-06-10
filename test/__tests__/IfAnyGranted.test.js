import React from 'react';
import {mount, shallow} from "enzyme";

import TestComponent from "../environment/TestComponent";
import IfAnyGranted from "../../src/IfAnyGranted";
import Unauthorized from "../environment/Unauthorized";

describe('IfAnyGranted', () => {

    it('renders children if the actual roles contain all of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children if the actual roles contain none of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = null;
        const component = shallow(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders children if the actual roles contain at least one of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER'];
        const component = shallow(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children if the actual roles are undefined', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfAnyGranted expected={expected}>
            <TestComponent/>
        </IfAnyGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders custom component when actual roles do not contain any of the expected', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = null;
        const component = shallow(<IfAnyGranted expected={expected} actual={actual} unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfAnyGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
        expect(component.exists(Unauthorized)).toBeTruthy();
    });

    it('renders child directly without any wrapper element if there is only one', () => {
        const expected = ['ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = mount(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAnyGranted>);
        // The root is a div - TestApp
        expect(root.getDOMNode().nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders children directly without any wrapper element', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const root = mount(<IfAnyGranted expected={expected} actual={actual}>
            <TestComponent/>
            <TestComponent/>
        </IfAnyGranted>);
        // The root is a div - TestApp
        expect(root.getDOMNode()[0].nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders nothing when no children are passed to the component', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const root = mount(<IfAnyGranted expected={expected} actual={actual}/>);
        expect(root.children().length).toEqual(0);
    });
});
