import React, { Component } from 'react';
import './Board.css';
import Square from "./Square";

import { connect } from 'react-redux';

class Board extends Component {

    state = {
        dice: 0,
        player_position: 0,
        log: [],
        test: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]
    }

    renderPart1 = () => {
        const row = this.state.test.slice(0,10);
        row.map(s => { return <Square className="Board_square" id={s} name="test" />});
    }

    renderPart2 = () => {
        const row = this.state.test.slice(10,20);
        row.map(s => { return <Square className="Board_square" name="test" />});
    }

    renderPart3 = () => {
        const row = this.state.test.slice(20,30);
        row.map(s => { return <Square className="Board_square" name="test" />});
    }

    renderPart4 = () => {
        const row = this.state.test.slice(30,39);
        row.map(s => { return <Square className="Board_square" name="test" />});
    }

    addLogMessage = (message) => {
        this.setState({
            log: [...this.state.log, message]
          })
    }

    deleteLog = () => {
        this.setState({log: []});
    }

    refreshPage = () => {
        window.location.reload();
    }

    rollDice = () => {
        const roll = Math.ceil(Math.random() * 6)
        this.setState( {dice: roll} );
        this.movePlayer(roll);
    }

    movePlayer = (distance) => {
        const { squares } = this.props;
        const position_old = this.state.player_position;
        const roundFinished = position_old + distance >= squares.length;
        const position_new = roundFinished ? (position_old + distance) - squares.length : position_old + distance;
        const square = squares[position_new];

        this.setState({ player_position: position_new });
        this.props.onToggleIsPlayer(position_old);
        this.props.onToggleIsPlayer(position_new);
        if(roundFinished) {
            this.props.onPayMoney(-4000);
            this.addLogMessage("Player 1 got 4000 for completing round");
            this.roundFinished = false;
        }

        if (square.owner === null && square.cost != null) {
            this.props.onPayMoney(square.cost);
            this.addLogMessage("Player 1 paid " + square.cost + " for " + square.name);
            this.props.onAddOwner(square.id)
        }
    }

  render() {
    return (
        <div className="Board">

          <p className="Board_diceCount">{this.state.dice}</p>
          <button className="roll_btn" onClick={this.rollDice}>Hoď kostkou</button>
          <button className="roll_btn" onClick={this.refreshPage}>Hraj znovu</button>
          
          <div className="Board_row">
            {this.props.squares ? this.props.squares.map(sq => { 
            return <Square 
                className="Board_square" 
                key={sq.id} 
                id={sq.id}
                name={sq.name} 
                isPlayer={sq.isPlayer}></Square> }) : <p>Nemáš hrací plochu</p>}
          </div>

            <p className="Board_diceCount">{this.props.money}</p>

            <button className="roll_btn" onClick={this.deleteLog}>Smaž zprávy</button>
            {this.state.log.map(m => {
                return <p>{m}</p>
            })}

            <div className="Board_row">
                {this.renderPart1}
                {this.renderPart2}
                {this.renderPart3}
                {this.renderPart4}
            </div>
            

        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      players: state.players,
      squares: state.squares,
      money: state.money
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      onAddPlayer: () => dispatch({type: 'ADD_PLAYER'}),
      onRemovePlayer: (id) => dispatch({type: 'REMOVE_PLAYER', id}),
      onMovePlayer: (id, distance) => dispatch({type: 'MOVE', id, distance}),
      onToggleIsPlayer: (id) => dispatch({type: 'TOGGLE_ISPLAYER', id}),
      onPayMoney: (cost) => dispatch({type: 'PAY_MONEY', cost}),
      onAddOwner: (id) => dispatch({type: 'ADD_OWNER', id})
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
