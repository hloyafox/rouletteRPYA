import './Animation.css';

export function Animation({ name }) {
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
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}
