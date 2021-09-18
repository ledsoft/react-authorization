import { configure } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new EnzymeAdapter() });