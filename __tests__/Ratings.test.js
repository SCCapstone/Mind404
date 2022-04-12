import { describe, it } from 'jest-circus';
import React from 'react';
import renderer from 'react-test-renderer'

import {Rating} from "./../components/Ratings"

describe('<Ratings />', () => {
    it('has 1 child', () =>{
        const tree = renderer.create(<Ratings reviews={[{
                description: "I don't really respect the outfit.",
                firstName: "Kevin",
                lastName: "Prince",
                rating: 1.5
        }]} size={30}/>).toJSON();
        expect(tree.length).toBe(1);

    })
})