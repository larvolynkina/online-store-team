import './index.scss';
import FormGroupCard from '../FormGroupCard/FormGroupCard';
import FormGroupPersonal from '../FormGroupPersonal/FormGroupPersonal';
import useInput from '../../Hooks/useInput';
import { IInput } from '../../types';

export default function ModalForm() {
  const cardNumber: IInput = useInput('', 'credit-card__input', { isEmpty: true, isCardNumber: false });
  const cardCvv: IInput = useInput('', 'credit-card__input', { isEmpty: true, isCvv: false });
  const cardValid: IInput = useInput('', 'credit-card__input', { isEmpty: true, isValid: false });
  const name: IInput = useInput('', 'personal__input', { isEmpty: true, isName: false });
  const phone: IInput = useInput('', 'personal__input', { isEmpty: true, isPhone: false });
  const address: IInput = useInput('', 'personal__input', { isEmpty: true, isAddress: false });
  const email: IInput = useInput('', 'personal__input', { isEmpty: true, isEmail: false });

  return (
    <form action="" className="modal__form form">
      <FormGroupPersonal
        name={name}
        phone={phone}
        address={address}
        email={email}
      />
      <FormGroupCard
        cardNumber={cardNumber}
        cardCvv={cardCvv}
        cardValid={cardValid}
      />
      <button
        type="submit"
        onClick={(e) => e.preventDefault()}
      >
        confirm
      </button>
    </form>
  );
}
