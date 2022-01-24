import React from "react";
import {render, fireEvent} from "@testing-library/react-native";

import {LoginScreen} from "../LoginScreen";
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