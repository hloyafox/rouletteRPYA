import './Button.css';

export function Button({ onButtonClick }) {
  return (
    <button className="button" onClick={onButtonClick}>
      Испытай удачу
    </button>
  );
}
