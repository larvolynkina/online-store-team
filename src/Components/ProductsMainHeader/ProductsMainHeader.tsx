import './ProductsMainHeader.scss';
import ProductTotal from '../ProductTotal/ProductTotal';
import Search from '../Search/Search';
import SortSelect from '../SortSelect/SortSelect';
import ChangeViewButtons from '../ChangeViewButtons/ChangeViewButtons';

function ProductsMainHeader() {
  return (
    <div className="products-header">
      <div className="products-header-block">
        <ProductTotal />
        <SortSelect />
      </div>
      <div className="products-header-block">
        <Search />
        <ChangeViewButtons />
      </div>
    </div>
  );
}

export default ProductsMainHeader;
