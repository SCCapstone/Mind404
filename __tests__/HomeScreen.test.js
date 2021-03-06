import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import{fireEvent} from "@testing-library/react-native"
import HomeScreen from "../src/screens/HomeScreen"

describe('homeScreen', () => {
    it('shows date correct', () =>{
        const DateObject = {
            day: 1,
            month: '11',
            Year: '2022',
        };
        const result = DisplayDate(DateObject);
        const expected = 'January 11, 2022';

        expect(result).toEqual(expected);

    });
});