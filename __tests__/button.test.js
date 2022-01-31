import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import{fireEvent} from "@testing-library/react-native"

//unit test to see if button renders properly
it(`renders correctly`, () => {
  const tree = renderer.create(<Button>Login</Button>);
  expect(tree).toMatchSnapshot();
});



//testing user inputs email and password and then it logs in


