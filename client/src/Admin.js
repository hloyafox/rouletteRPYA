import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from './Form';
import { NotExist } from './NotExist';
import './Admin.css';

export default function Admin() {
  const [allCard, setAllCard] = useState([]);
  const [endCard, setEndCard] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState(0);
  const [scope, setScope] = useState(0);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeType(e) {
    setType(+e.target.value);
  }

  function handleChangeScope(e) {
    setScope(+e.target.value);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin`)
      .then(response => {
        setAllCard(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3001/admin/end`)
      .then(response => {
        setEndCard(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleSubmit() {
    axios
      .post(`http://localhost:3001/admin/add`, {
        name: name,
        type: type,
        exsist: 1,
        scope: scope,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const items = allCard.map(card => (
    <tr key={card.id}>
      <td>{card.name}</td>
      <td>{card.type}</td>
      <td>{card.count}</td>
    </tr>
  ));

  const itemsEnd = endCard.map(end => (
    <li key={end.id} className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {end.name}, тип: {end.type}
        </div>
      </div>
      <span className="badge text-bg-secondary rounded-pill">Было: {end.count}</span>
    </li>
  ));

  return (
    <div className="container-fluid">
      <div className="row m-2">
        <h2>Добавить карту</h2>
        <Form
          changeName={handleChangeName}
          changeType={handleChangeType}
          submit={handleSubmit}
          changeScope={handleChangeScope}
        />
      </div>
      <div className="row m-2">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>Количество</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>

      <div className="row m-2">
        <NotExist endItems={itemsEnd} />
      </div>
    </div>
  );
}
