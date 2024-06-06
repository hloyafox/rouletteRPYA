export function Form({ submit, changeName, changeType, changeScope }) {
  return (
    <div className="row">
      <form className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Название"
            onChange={changeName}
          ></input>
          <label className="col" htmlFor="inputName">
            Название
          </label>
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            id="inputType"
            placeholder="Тип"
            onChange={changeType}
          ></input>
          <label className="col" htmlFor="inputType">
            Тип
          </label>
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            id="inputType"
            placeholder="Количество"
            onChange={changeScope}
          ></input>
          <label className="col" htmlFor="inputType">
            Количество
          </label>
        </div>
        <div className="col">
          <button className="btn btn-primary mb-3" onClick={submit}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
