import React from "react";
import TestComponent from "../environment/TestComponent";

import IfAllGranted from "../../src/IfAllGranted";
import {mount, shallow} from "enzyme";
import Unauthorized from "../environment/Unauthorized";

describe('IfAllGranted', () => {

    it('renders children if the actual roles contain all the expected ones', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children if the actual roles contain none of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = null;
        const component = shallow(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('does not render children if the actual roles contain only some of the expected ones', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER'];
        const component = shallow(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();

    });

    it('does not render children if the actual roles are undefined', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'];
        const component = shallow(<IfAllGranted expected={expected}>
            <TestComponent/>
        </IfAllGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders custom component when actual roles do not contain all expected', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = 'ROLE_USER';
        const component = shallow(<IfAllGranted expected={expected} actual={actual} unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfAllGranted>);

        expect(component.exists(TestComponent)).toBeFalsy();
        expect(component.exists(Unauthorized)).toBeTruthy();

    });

    it('renders child directly without any wrapper element if there is only one', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = mount(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
        </IfAllGranted>);

        // The root is a div - TestApp
        expect(root.getDOMNode().nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders children directly without any wrapper', () => {
        const expected = ['ROLE_USER', 'ROLE_ADMIN'],
            actual = ['ROLE_USER', 'ROLE_ADMIN'];
        const root = mount(<IfAllGranted expected={expected} actual={actual}>
            <TestComponent/>
            <TestComponent/>
        </IfAllGranted>);

        // The root is a div - TestApp
        expect(root.getDOMNode()[0].nodeName.toLowerCase()).toEqual('h1');
    });

    it('renders nothing when no children are passed to the component', () => {
        const expected = ['ROLE_USER'],
            actual = ['ROLE_USER'];
        const root = mount(<IfAllGranted expected={expected} actual={actual}/>);
        expect(root.children().length).toEqual(0);
    });
});
