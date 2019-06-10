import React from 'react';
import {mount, shallow} from "enzyme";

import TestComponent from "../environment/TestComponent";
import IfNoneGranted from "../../src/IfNoneGranted";
import Unauthorized from "../environment/Unauthorized";

describe('IfNoneGranted', () => {

    it('renders children if the actual roles do not contain any of the expected ones', () => {
        const expected = ['ROLE_GUEST'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfNoneGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfNoneGranted>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children if the actual roles contain all of the expected roles', () => {
        const expected = ['ROLE_GUEST', 'ROLE_USER'],
            actual = ['ROLE_USER', 'ROLE_GUEST'];
        const component = shallow(<IfNoneGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfNoneGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('does not render children if the actual roles contain one of the expected roles', () => {
        const expected = ['ROLE_GUEST', 'ROLE_USER'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfNoneGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfNoneGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('does not render children if the actual roles are undefined', () => {
        const expected = ['ROLE_USER', 'ROLE_GUEST'];
        const component = shallow(<IfNoneGranted expected={expected}>
            <TestComponent/>
        </IfNoneGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders custom component when actual roles contain one of the expected', () => {
        const expected = ['ROLE_USER', 'ROLE_GUEST'],
            actual = ['ROLE_USER'];
        const component = shallow(<IfNoneGranted expected={expected} actual={actual} unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfNoneGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
        expect(component.exists(Unauthorized)).toBeTruthy();
    });

    it('renders child directly without any wrapper element if there is only one', () => {
        const expected = ['ROLE_GUEST'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = mount(<IfNoneGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfNoneGranted>);
        // The root is a div - TestApp
        expect(root.getDOMNode().nodeName.toLowerCase()).toEqual('h1');
    });

    it('render children directly without any wrapper element', () => {
        const expected = ['ROLE_GUEST'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = mount(<IfNoneGranted expected={expected} actual={actual}>
            <TestComponent/>
            <TestComponent/>
        </IfNoneGranted>);
        // The root is a div - TestApp
        expect(component.getDOMNode()[0].nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders nothing when no children are passed to the component', () => {
        const expected = ['ROLE_GUEST'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = mount(<IfNoneGranted expected={expected} actual={actual}/>);
        expect(component.children().length).toEqual(0);
    });
});
