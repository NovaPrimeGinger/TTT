const game = {
    xTurn: true,
    //switches turns//
    xState: [],
    //state of player x//
    oState: [],
    //state of player o//
    winningCombo: [
        //Across
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        //Down
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
    //defines what combinations win//
}
//object holding game essentials//

let currentPlayer = 'X';

const statusDisplay = document.querySelector('.game--status');

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

statusDisplay.innerHTML = currentPlayerTurn();
//displays X turn first


document.addEventListener('click', event => {
    
    const target = event.target
    const isCell = target.classList.contains('grid-cell')
    const isDisabled = target.classList.contains('disabled')

    if (isCell && !isDisabled) {
        const cellValue = target.dataset.value

        game.xTurn === true
            ? game.xState.push(cellValue)
            : game.oState.push(cellValue)

        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o')

        game.xTurn = !game.xTurn

        // If all cells are disabled, then its draw
        if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) {
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'Draw!'
        }

        handlePlayerChange();
        //handles switching turns

        game.winningCombo.forEach(winningState => {
            const xWins = winningState.every(state => game.xState.includes(state))
            const oWins = winningState.every(state => game.oState.includes(state))

            if (xWins || oWins) {
                document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'))
                document.querySelector('.game-over').classList.add('visible')
                document.querySelector('.game-over-text').textContent = xWins
                    ? 'X wins!'
                    : 'O wins!'
            }
        })
    }
})

//UGHHHHH I have tried so many different ways to get bootstrap alerts to appear
//I've been working on this so long I cant see straight I'm just going to turn it in and take the loss :'(
document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('.game-over').classList.remove('visible')
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('disabled', 'x', 'o')
    })

    game.xTurn = true
    game.xState = []
    game.oState = []
})