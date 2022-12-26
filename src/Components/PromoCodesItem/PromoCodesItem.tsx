import './index.scss';
import { TPromoCodesItem } from '../../types';

export default function PromoCodesItem(
  { promocode, discountPercentage, removePromocode }: TPromoCodesItem,
) {
  return (
    <li className="applied-codes__item">
      <p className="applied-codes__title">{`${promocode} - ${discountPercentage}%`}</p>
      <button className="applied-codes__btn" type="button" onClick={removePromocode}>Remove</button>
    </li>
  );
}
