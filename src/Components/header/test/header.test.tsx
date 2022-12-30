import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../index';

test('renders header', () => {
  render(<Header
    headerCartCount={1}
    headerCartSum={500}
  />, { wrapper: BrowserRouter });
  const logoText = screen.getByText(/Online Store/i);
  expect(logoText).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText(/500/)).toBeInTheDocument();
});
