import repeatImg from './repeat.svg';

export function Repeat({ repeat }) {
  return (
    <button className="repeatButton" onClick={repeat}>
      <img src={repeatImg} alt="repeat"></img>
    </button>
  );
}
