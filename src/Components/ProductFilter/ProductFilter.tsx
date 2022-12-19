import ProductFilterCheckbox from '../ProductFilterCheckbox/ProductFilterCheckbox';

type ProductFilterProps = {
  name: string;
  list: string[];
};

function ProductFilter({ name, list }: ProductFilterProps) {
  return (
    <div className="filter">
      <h2 className="filter__title">{name}</h2>
      {list.map((item: string) => (
        <ProductFilterCheckbox
          key={item}
          item={item}
          name={name}
        />
      ))}
    </div>
  );
}

export default ProductFilter;
