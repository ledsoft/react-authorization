import React from "react";
import {mount, shallow} from "enzyme";

import TestComponent from "../environment/TestComponent";
import IfAuthorized from "../../src/IfAuthorized";
import Unauthorized from "../environment/Unauthorized";

describe('IfAuthorized', () => {

    it('renders children if the authorization function returns true', () => {
        const isAuthorized = () => true;
        const component = shallow(<IfAuthorized isAuthorized={isAuthorized}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children if the authorization function returns false', () => {
        const isAuthorized = () => false;
        const component = shallow(<IfAuthorized isAuthorized={isAuthorized}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it("does not render children if the authorization function returns null", () => {
        const isAuthorized = () => null;
        const component = shallow(<IfAuthorized isAuthorized={isAuthorized}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it("does not render children if the authorization function returns undefined", () => {
        const isAuthorized = () => undefined;
        const component = shallow(<IfAuthorized isAuthorized={isAuthorized}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('renders custom component if the authorization function returns false', () => {
        const isAuthorized = () => false;
        const component = shallow(<IfAuthorized isAuthorized={isAuthorized} unauthorized={<Unauthorized/>}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeFalsy();
        expect(component.exists(Unauthorized)).toBeTruthy();
    });

    it('renders nothing when no children are passed to the component', () => {
        const isAuthorized = () => true;
        const root = mount(<IfAuthorized isAuthorized={isAuthorized}/>);
        expect(root.children().length).toEqual(0);
    });

    it('renders children when true is passed as isAuthorized prop value', () => {
        const component = shallow(<IfAuthorized isAuthorized={true}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeTruthy();
    });

    it('does not render children when false is passed as isAuthorized prop value', () => {
        const component = shallow(<IfAuthorized isAuthorized={false}>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });

    it('does not render children when nothing is passed as isAuthorized prop value', () => {
        const component = shallow(<IfAuthorized>
            <TestComponent/>
        </IfAuthorized>);

        expect(component.exists(TestComponent)).toBeFalsy();
    });
});
