import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import{fireEvent} from "@testing-library/react-native"
import LoginScreen from "../src/screens/LoginScreen/LoginScreen"
import { it } from "jest-circus";

it("should change state is email is entered",() =>{
    const instanceOf = renderer.create(<LoginScreen/>).getInstance();
    instanceOf.useState("adam@mgmail.com");
    expect(instanceOf.state.email).toEqual("adam@gmail.com");
});