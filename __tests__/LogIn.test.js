import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import LoginScreen from "../src/screens/LoginScreen/LoginScreen";
import { it } from "jest-circus";
it("renders default elements", () => {
    const { getAllByText, getByPlaceholderText } = render(<Login />);
    getByPlaceholderText("E-mail");
    getByPlaceholderText("Password");
});

it('shows the email address is badly formatted', () => {
    const { getByTetID,getByText } = render(<Login />);
    fireEvent.press(getByTestId("Login.testButton"));
    getByText("Error: The email address is badly formatted.")
});
jest.mock('react-native-keyboard-aware-scroll-view', () => {
        const KeyboardAwareScrollView = ({ children }) => children;
        return { KeyboardAwareScrollView };
});

