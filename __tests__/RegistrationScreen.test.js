import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import{fireEvent} from "@testing-library/react-native"
import RegistrationScreen from "../src/screens/RegistrationScreen"

describe('RegistrationScreen', () => {
    it('shows outputed date correctly', () =>{
        const DateObject = {
            day: 1,
            month: 11,
            Year: 22,
        };
        const result = isValidDate(DateObject);
        const expected = true;

        expect(result).toEqual(expected);

    });
});