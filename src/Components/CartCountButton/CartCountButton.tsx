type TCountButton = {
  className: string;
  onClick: () => void;
  children: string
}
export default function CartCountButton({ className, onClick, children }: TCountButton) {
  return (
    <button className={className} type="button" onClick={onClick}>{children}</button>
  );
}
