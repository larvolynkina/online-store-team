import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RootRouter from '../../../App/RootRouter';

test('Error page test', () => {
  render(
    <MemoryRouter initialEntries={['/dsdfsf']}>
      <RootRouter />
    </MemoryRouter>,
  );
  expect(screen.getByText(/404/)).toBeInTheDocument();
  const linkGoToMain = screen.getByText(/Go to main page/i);
  expect(linkGoToMain).toBeInTheDocument();
  userEvent.click(linkGoToMain);
  expect(screen.queryByText(/404/)).toBeNull();
  screen.debug();
});
