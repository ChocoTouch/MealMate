import { render, screen } from '@testing-library/react';
import App from './App';

test('renders correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/Concepteur/i);
  expect(linkElement).toBeInTheDocument();
});
