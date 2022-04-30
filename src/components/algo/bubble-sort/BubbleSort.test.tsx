import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import BubbleSort from './BubbleSort';

test('renders learn react link', () => {
  render(<BubbleSort/>);
  const linkElement = screen.getByText(/Play/i);
  expect(linkElement).toBeInTheDocument();
});
