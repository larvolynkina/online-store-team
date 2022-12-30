import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Search from '../Search';

describe('search component', () => {
  it('renders search input', () => {
    render(<Search />, { wrapper: MemoryRouter });
    const searchInput: HTMLInputElement = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it('check search value and clear button', () => {
    render(<Search />, { wrapper: MemoryRouter });
    const searchInput: HTMLInputElement = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput.value).toBe('');
    const clearButton = screen.getByLabelText('Clear search field');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).not.toHaveClass('search__clearBtn_active');
    userEvent.type(searchInput, 'apple');
    expect(searchInput.value).toBe('apple');
    expect(clearButton).toHaveClass('search__clearBtn_active');
    userEvent.click(clearButton);
    expect(searchInput.value).toBe('');
    expect(clearButton).not.toHaveClass('search__clearBtn_active');
  });

  it('search snapshot', () => {
    const search = render(<Search />, { wrapper: MemoryRouter });
    expect(search).toMatchSnapshot();
  });
});
