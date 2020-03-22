import React, { Component } from 'react';
import './App.css';
import Board from './Board';

/*
const player = [
  {
    name: "Ivetka",
    money: 40000,
    position: 0
  }
];

const squares = [
  {
    isPlayer: false
    isHorse: false,
    isFCard: false,
    isCCard: false,
    isTrainer: false
  }
];

const finances_cards = [];

const coincidence_cards = [];
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
