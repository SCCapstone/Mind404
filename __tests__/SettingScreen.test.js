import * as React from "react";
import SettingsScreen from "../src/screens/clientScreens/SettingsScreen/SettingsScreen";
import {render} from "@testing-library/react-native";
import{fireEvent} from "@testing-library/react-native";

//behavior test 
it("renders",() => {
    const{getByTestId} = render(<SettingsScreen/>);
    const button = getByTestId("dostuff.Button");
    fireEvent.press(button);
    expect(console.log("button pressed"))
});
/*
describe('renders default elements', () => {
it("renders default elements", () => {
    const a = { getAllByText, getByPlaceholderText } = render(<LoginScreen />);
    getByPlaceholderText("E-mail");
    getByPlaceholderText("Password");
    expect(a).toMatchSnapshot();
})

});


 describe('shows the email address is badly formatted', () => {
it('shows the email address is badly formatted', () => {
    const b = { getByTestID,getByText } = render(<LoginScreen />);
    fireEvent.press(getByTestId("Login.testButton"));
    getByText("Error: The email address is badly formatted.")
    expect(b).toMatchSnapshot();
})
});

*/
jest.mock('react-native-keyboard-aware-scroll-view', () => {
        const KeyboardAwareScrollView = ({ children }) => children;
        return { KeyboardAwareScrollView };

});
jest.mock('expo-status-bar', () => {
    const expostatusbar = ({ children }) => children;
    return { expostatusbar };
});
jest.mock('react-native-maps', () => {
    const Mapview = ({ children }) => children;
    return { Mapview };
});
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
    const MaterialCommunityIcons = ({ children }) => children;
    return { MaterialCommunityIcons };
});

