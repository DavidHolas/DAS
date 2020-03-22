import React, { Component } from 'react';
import './Board.css';
import Square from "./Square";

import { connect } from 'react-redux';

class Board extends Component {

    state = {
        dice: 0,
        player_position: 0
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
        const position_old = this.state.player_position;
        const position_new = position_old + distance;
        const { squares } = this.props;

        this.setState({ player_position: position_new });
        this.props.onToggleIsPlayer(position_old);
        this.props.onToggleIsPlayer(position_new);

        if (squares[position_new].cost != null) {
            this.props.onPayMoney(squares[position_new].cost);
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
      onPayMoney: (cost) => dispatch({type: 'PAY_MONEY', cost})
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
