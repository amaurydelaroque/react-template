import App from './index';
import { render, screen } from '@testing-library/react';

test('renders learn React and Typescript link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  const linkElement2 = screen.getByText(/learn typescript/i);

  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});
