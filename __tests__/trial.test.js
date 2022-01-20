import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
//unit test to see if button renders properly
it(`renders correctly`, () => {
  const tree = renderer.create(<Button>Login</Button>);
  expect(tree).toMatchSnapshot();
});

//testing flatlist component
it('renders the flatlist component', () =>{
  const tree = renderer.create(
    <Flatlist
    data = {['item1', 'item2', 'item3']}
    keyExtractor = {item => item}
    renderItem = {(item)=> <text>{item}</text>}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
} )


