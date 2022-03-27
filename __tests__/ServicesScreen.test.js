import * as React from "react";
import ServicesScreen from "./../src/screens/clientScreens/ServicesScreen/ServicesScreen";
import { render } from "@testing-library/jest-native";
import{fireEvent} from "@testing-library/react-native";

// test('renders correctly', () => {
//     const tree = renderer.create(<ServicesScreen />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

it("renders default elements", () => {
    const { getAllByText } = render(<ServicesScreen />);
    expect(getAllByText("Services").length).toBe(1);
});
