import React, { Component } from 'react';
import './Board.css';
import Square from "./Square";
import Modal from "./Modal";

import { connect } from 'react-redux';

class Board extends Component {

    state = {
        dice: 0,
        player_position: 0,
        log: [],
        modal: false
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
        }

        if (square.owner === null && square.cost != null) {
            this.props.onPayMoney(square.cost);
            this.addLogMessage("Player 1 paid " + square.cost + " for " + square.name);
            this.props.onAddOwner(square.id)
        }
    }

    openModal = () => {
        this.setState({modal: true})
    }

    closeModal = () => {
        this.setState({modal: false})
    }

    renderModal = (text) => {
        return <Modal close={this.closeModal} visible={this.state.modal} text={text} />
    }

  render() {

    const {squares} = this.props;

    const part1 = squares.slice(0,10);
    const part2 = squares.slice(10,20);
    const part3 = squares.slice(20,30);
    const part4 = squares.slice(30,40);

    return (
        <div className="Board">

        {this.renderModal()}

        <button className="roll_btn" onClick={this.openModal}>Modal</button>
{/*
        <button className="roll_btn" onClick={this.refreshPage}>Hraj znovu</button>

        
            <button className="roll_btn" onClick={this.deleteLog}>Smaž zprávy</button>
            {this.state.log.map(m => {
                return <p>{m}</p>
            })}
        */}

        <button className="roll_btn" onClick={this.rollDice}>Hoď kostkou</button>

            <div className="Board_container">
            <div className="Board_row">
                {part1.map(sq => { 
                return <Square 
                className="Board_square"
                operModal={this.openModal} 
                key={sq.id} 
                id={sq.id}
                name={sq.name} 
                isPlayer={sq.isPlayer}></Square> })}
            </div>
            <div className="Board_column_right">
                {part2.map(sq => { 
                return <Square 
                className="Board_square"
                operModal={this.openModal} 
                key={sq.id} 
                id={sq.id}
                name={sq.name} 
                isPlayer={sq.isPlayer}></Square> })}
            </div>
            <div className="Board_column">
                {part4.map(sq => { 
                return <Square 
                className="Board_square"
                operModal={this.openModal} 
                key={sq.id} 
                id={sq.id}
                name={sq.name} 
                isPlayer={sq.isPlayer}></Square> })}
            </div>
            <div className="Board_row_reverse">
                {part3.map(sq => { 
                return <Square 
                className="Board_square"
                operModal={this.openModal} 
                key={sq.id} 
                id={sq.id}
                name={sq.name} 
                isPlayer={sq.isPlayer}></Square> })}
            </div>
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
