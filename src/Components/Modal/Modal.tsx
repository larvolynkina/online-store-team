import FormGroupCard from '../FormGroupCard/FormGroupCard';
import FormGroupPersonal from '../FormGroupPersonal/FormGroupPersonal';
import './index.scss';

export default function Modal() {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__content">
          <form action="" className="modal__form form">
            <FormGroupPersonal />
            <FormGroupCard />
          </form>
        </div>
      </div>
    </div>
  );
}
