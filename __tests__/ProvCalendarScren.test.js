import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import{fireEvent} from "@testing-library/react-native"
import AddEvent from "../src/screens/providerScreens/ProvCalendarScreen/AddEvent"
import { it } from "jest-circus";




it(`renders correctly`, () => {
    const tree = renderer.create(<Button>+ Add Event</Button>);
    expect(tree).toMatchSnapshot();
  });