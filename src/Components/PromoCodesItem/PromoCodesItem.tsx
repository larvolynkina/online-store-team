import './index.scss';
import { TPromoCodesItem } from '../../types';

export default function PromoCodesItem(
  { promocode, discountPercentage, removePromocode }: TPromoCodesItem,
) {
  return (
    <li className="codes-list__item codes-item">
      <p className="codes-item__title">{`${promocode} - ${discountPercentage}%`}</p>
      <button className="codes-item__btn" type="button" onClick={removePromocode}>Remove</button>
    </li>
  );
}
