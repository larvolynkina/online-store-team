import './FilterButton.scss';

interface FilterButtonProps {
    text: string,
    modifier: string;
    onClick: () => void;
}

function FilterButton({ text, modifier, onClick }: FilterButtonProps) {
  const className = `filterButton filterButton_${modifier}`;

  return (
    <button onClick={onClick} type="button" className={className}>{text}</button>
  );
}

export default FilterButton;
