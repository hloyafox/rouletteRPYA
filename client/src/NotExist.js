export function NotExist({ endItems }) {
  return (
    <div className="mt-3">
      <h2> Карты, которые кончились:</h2>
      <ul className="list-group">{endItems}</ul>
    </div>
  );
}
