import FormGroupPersonal from '../FormGroupPersonal/FormGroupPersonal';
import './index.scss';

export default function Modal() {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__content">
          <form action="" className="modal__form form">
            <FormGroupPersonal />
            <div className="form__group" />
          </form>
        </div>
      </div>
    </div>
  );
}
