import { Button } from './Button';
import { Animation } from './Animation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Wheel.css';
import useSound from 'use-sound';
import music from './d.mp3';

export default function Wheel() {
  const [nameCard, setNameCard] = useState(null);
  const [data, setData] = useState([]);
  const [play] = useSound(music);
  const resources = [
    {
      id: 1,
      name: 'Осколки ромашки:   10 шт',
    },
    {
      id: 2,
      name: 'Осколки ромашки:   20 шт',
    },
  ];

  function changeExsist(id, cardName) {
    axios
      .post(`http://localhost:3001/cards/change/${id}`, { id: id, name: cardName, exsist: 0 })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    let type = randomNumber(1, 4);

    if (type !== 3) {
      axios
        .get(`http://localhost:3001/cards/${type}`)
        .then(response => {
          if (response.data.length > 0) {
            setData(response.data);
          } else {
            setData(resources);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setData(resources);
    }
  }, []);

  // Function to generate random number
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function handleClick() {
    let anim = document.querySelector('.anim');
    let random = randomNumber(0, data.length - 1);
    setNameCard(data[random].name);
    anim.classList.remove('hidden');
    if (data[random].type) {
      let id = data[random].id;
      changeExsist(id, data[random].name);
    }
    if (data[random].name === 'РЕКЛАМА') {
      play();
    }
  }

  return (
    <div className="container-fluid">
      <Button onButtonClick={handleClick} />
      <Animation name={nameCard} />
    </div>
  );
}
