import * as React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import {Flatlist,Text} from 'react-native'
import AddEvent from "../src/screens/ProviderScreens/ProvCalendarScreen/AddEvent"

import { render, fireEvent } from '@testing-library/react-native';

test('fire changeText event', () => {
  const onEventMock = jest.fn();
  const { getByPlaceholderText } = render(
    // MyComponent renders TextInput which has a placeholder 'Enter details'
    // and with `onChangeText` bound to handleChangeText
    <MyComponent handleChangeText={onEventMock} />
  );

  fireEvent(getByPlaceholderText('change'), 'onChangeText', 'ab');
  expect(onEventMock).toHaveBeenCalledWith('ab');
});