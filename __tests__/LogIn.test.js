import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import renderer from "react-test-renderer";
import LoginScreen from "../src/screens/LoginScreen/LoginScreen";
import { it } from "jest-circus";
describe('renders default elements', () => {
it("renders default elements", () => {
    const a = { getAllByText, getByPlaceholderText } = render(<Login />);
    getByPlaceholderText("E-mail");
    getByPlaceholderText("Password");
    expect(a).toMatchSnapshot();
})

});
describe('shows the email address is badly formatted', () => {
it('shows the email address is badly formatted', () => {
    const b = { getByTetID,getByText } = render(<Login />);
    fireEvent.press(getByTestId("Login.testButton"));
    getByText("Error: The email address is badly formatted.")
    expect(b).toMatchSnapshot();
})
});

jest.mock('react-native-keyboard-aware-scroll-view', () => {
        const KeyboardAwareScrollView = ({ children }) => children;
        return { KeyboardAwareScrollView };
});

