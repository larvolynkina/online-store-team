import './ProductsMainHeader.scss';
import ProductTotal from '../ProductTotal/ProductTotal';
import Search from '../Search/Search';

function ProductsMainHeader() {
  return (
    <div className="products-header">
      <ProductTotal />
      <Search />
    </div>
  );
}

export default ProductsMainHeader;
