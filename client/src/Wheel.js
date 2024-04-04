import { Button } from './Button';
import { Animation } from './Animation';
import { useState } from 'react';
import './Wheel.css';

export default function Wheel() {
  const [nameCard, setNameCard] = useState(null);
  const data = [
    {
      id: 1,
      name: 'Очень длинное название на русском языке дизоксирибонуклеиновое',
      count: 10,
    },
    {
      id: 2,
      name: 'Очень длинное название на русском языке дизоксирибонуклеиновое2',
      count: 5,
    },
    {
      id: 3,
      name: 'Очень длинное название на русском языке дизоксирибонуклеиновое3',
      count: 10,
    },
    {
      id: 4,
      name: 'Очень длинное название на русском языке дизоксирибонуклеиновое4',
      count: 5,
    },
  ];

  const listItems = data.map(data => (
    <div key={data.id} id={data.id} className="card col-2 hidden">
      {data.name}
    </div>
  ));

  // Function to generate random number
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function handleClick() {
    let anim = document.querySelector('.anim');
    let random = randomNumber(0, listItems.length - 1);
    setNameCard(data[random].name);
    let count = data[random].count;
    data[random].count = count - 1;
    console.log(data[random].count);
    anim.classList.remove('hidden');
  }

  return (
    <div className="container-fluid">
      <Button onButtonClick={handleClick} />
      <Animation name={nameCard} />
    </div>
  );
}
