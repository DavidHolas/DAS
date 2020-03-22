  const initialState = {
        dice: 0,
        money: 20000,
        players: [
        {id: 98, name: "David", money: 40000, position: 0},
        {id: 99, name: "Ivetka", money: 100, position: 0}],

        squares: [
            {
                id: 0,
                name:"Start",
                isPlayer: true,
                cost: -4000
            },
            {
                id: 1,
                name:"Furioso", 
                isPlayer: false,
                cost: 500
            },
            {
                id: 2, 
                name:"Finance", 
                isPlayer: false,
                cost: null
            },
            {
                id: 3, 
                name:"Trenér", 
                isPlayer: false,
                cost: 4000
            },
            {
                id: 4,
                name:"Japan",
                isPlayer: false,
                cost: 1000
            },
            {
                id: 5,
                name:"Neklan", 
                isPlayer: false,
                cost: 1500
            },
            {
                id: 6, 
                name:"Náhoda", 
                isPlayer: false,
                cost: null
            },
            {
                id: 7, 
                name:"Trenér", 
                isPlayer: false,
                cost: 4000
            },
            {
                id: 8, 
                name:"Narcius", 
                isPlayer: false,
                cost: 2500
            },
            {
                id: 9, 
                name:"Napoli", 
                isPlayer: false,
                cost: 10000
            },
            {
                id: 10, 
                name:"Distanc", 
                isPlayer: false,
                cost: null
            }]
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