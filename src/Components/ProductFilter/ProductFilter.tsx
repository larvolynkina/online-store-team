import ProductFilterCheckbox from '../ProductFilterCheckbox/ProductFilterCheckbox';
import './ProductFilter.scss';

type ProductFilterProps = {
  name: string;
  list: string[];
};

function ProductFilter({ name, list }: ProductFilterProps) {
  return (
    <>
      <h2 className="filter__title">{name}</h2>
      <div className="filter">
        {list.map((item: string) => (
          <ProductFilterCheckbox
            key={item}
            item={item}
            name={name}
          />
        ))}
      </div>
      <span className="filter__line" />
    </>

  );
}

export default ProductFilter;
