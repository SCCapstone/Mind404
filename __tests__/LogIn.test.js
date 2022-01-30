import * as React from "react";
import HomeScreen from "../src/screens/clientScreens/HomeScreen/HomeScreen";
import {render} from "@testing-library/react-native"

it("renders",() => {
    render(<HomeScreen/>);
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

