import { useSearchParams } from 'react-router-dom';
import FilterButton from '../FilterButton/FilterButton';

function FilterResetButton() {
  const [searchParams, setSearchParams] = useSearchParams();
  function resetAllFilters(): void {
    if (searchParams.toString()) {
      setSearchParams('');
    }
  }

  return (
    <FilterButton text="Reset Filters" modifier="reset" onClick={() => resetAllFilters()} />
  );
}

export default FilterResetButton;
