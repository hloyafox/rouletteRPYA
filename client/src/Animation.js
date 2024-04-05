import './Animation.css';
import { Repeat } from './Repeat';

export function Animation({ name }) {
  function handleRepeat() {
    window.location.reload();
  }
  return (
    <div className="anim hidden">
      <div className="circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="big">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="tri"></div>
      <div className="squ">
        <div></div>
      </div>
      <div className="end">
        <div className="p">
          <h1>{name}</h1>
        </div>
      </div>
      <div>
        <Repeat repeat={handleRepeat} />
      </div>
    </div>
  );
}
