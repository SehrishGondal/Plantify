import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

test('HomeScreen renders correctly', () => {
  const screen = render(<HomeScreen />);
  expect(screen).toBeTruthy();
});
