import { Link } from 'react-router-dom';
import './index.scss';

function Error() {
  return (
    <div className="error">
      <h1>Page not found (404)</h1>
      <Link className="error__link" to="/">Go to main page</Link>
    </div>
  );
}

export default Error;
