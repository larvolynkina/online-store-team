import { useState } from 'react';
import FilterButton from '../FilterButton/FilterButton';

function FilterCopyButton() {
  const [text, setText] = useState('copy link');

  function copyCurrentLink(): void {
    const currentUrl: string = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => { setText('Copied'); setTimeout(() => { setText('copy link'); }, 500); })
      .catch(() => { setText('Error'); setTimeout(() => { setText('copy link'); }, 500); });
  }

  return (
    <FilterButton text={text} modifier="copy" onClick={() => copyCurrentLink()} />
  );
}

export default FilterCopyButton;
