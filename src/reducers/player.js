  import squaresArray from "../Squares";
  
  const initialState = {
        dice: 0,
        money: 20000,
        players: [
        {id: 98, name: "David", money: 40000, position: 0},
        {id: 99, name: "Ivetka", money: 100, position: 0}],
        squares: squaresArray
};

let idCount = 0;

const reducer = (state = initialState, action) => {

    switch( action.type ) {
        case 'TOGGLE_ISPLAYER':
            return { ...state,
                    squares: state.squares.map(square => {
                        if (square.id === action.id) {
                        return { ...square, isPlayer: !square.isPlayer };
                    }
                return square;
            })};
        case 'PAY_MONEY':
            return {
                ...state,
                money: state.money - action.cost
        }
        case 'ADD_OWNER':
            return { ...state,
                squares: state.squares.map(square => {
                    if (square.id === action.id) {
                    return { ...square, owner: "Player1" };
                }
            return square;
        })};
        case 'ADD_PLAYER':
            return {
                ...state,
                players: state.players.concat({id: idCount, name: action.name, money: 40000, position: 0})
        }
        case 'REMOVE_PLAYER':
            return {
                ...state,
                players: state.players.filter(player => player.id !== action.playerId)
            };
        case 'MOVE': 
            return state.players.map(player => {
            if (player.id === action.playerId) {
                return { ...player, position: state.position + action.distance };
        }
            return player;
        });
    
        default: return state        
    }
}

export default reducer;