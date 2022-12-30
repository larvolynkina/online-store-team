import { TCountButton } from '../../types';
import './index.scss';

export default function CartCountButton({ className, onClick, src }: TCountButton) {
  return (
    <button className={className} type="button" onClick={onClick}>
      <img src={src} alt="count button" className="control__btn-img" />
    </button>
  );
}
