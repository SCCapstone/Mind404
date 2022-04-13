import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import{fireEvent} from "@testing-library/react-native"
import HomeScreen from "../src/screens/HomeScreen"

describe('homeScreen', () => {
    it('shows date correct', () =>{
        const displayDate = {
            day: '08',
            month: '11',
            Year: '22',
        };
        const result = HomeScreen(displayDate);
        const expected = '08/11/22';

        expect(result).toEqual(expected);

    });
});