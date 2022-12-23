import './ProductsMainHeader.scss';
import ProductTotal from '../ProductTotal/ProductTotal';
import Search from '../Search/Search';
import SortSelect from '../SortSelect/SortSelect';

function ProductsMainHeader() {
  return (
    <div className="products-header">
      <SortSelect />
      <ProductTotal />
      <Search />
    </div>
  );
}

export default ProductsMainHeader;
