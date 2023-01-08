import { render, screen } from '@testing-library/react';
import CartCountButton from '../CartCountButton';
import plusCircle from '../../../assets/icons/plusCircle.svg';

const className = 'control__btn control__btn_decrease';
const src: string = plusCircle;
const onClick: () => void = jest.fn();

test('Count button renders', () => {
  render(
    <CartCountButton
      className={className}
      src={src}
      onClick={onClick}
    />,
  );
  expect(screen.getByRole('img')).toBeInTheDocument();
});
