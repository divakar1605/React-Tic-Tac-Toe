import React from 'react';
import Board from './components/board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          curRow: -1,
          curCol: -1
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      showMovesAsc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const curRow = Math.floor(i/3) + 1;
    const curCol = i%3 + 1;

    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{
        squares: squares,
        curRow: curRow,
        curCol: curCol
      }]),
      stepNumber : history.length,
      xIsNext : !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) == 0
    });
  }

  reverseMoveOrder() {
    this.setState({
      showMovesAsc: !this.state.showMovesAsc
    });
  }

  renderMoves(history) {

    const moves = history.map( (step, move) => {
      const description = move ?
        'Go to move #' + move + ' (' + step.curRow + ',' + step.curCol + ')':
        'Go to game start';
      if(move == this.state.stepNumber) {
        return (
          <li key = { move }>
            <button onClick = { () => this.jumpTo(move) }><b>{ description }</b></button>
          </li>
        );
      } else {
        return (
          <li key = { move }>
            <button onClick = { () => this.jumpTo(move) }>{ description }</button>
          </li>
        );
      }

    });

    return moves;

  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winnerData = calculateWinner(current.squares);
    const winner = winnerData ? winnerData.player : null;
    const winningSquares = winnerData ? winnerData.squares : null;

    const moves = this.renderMoves(history);

    if(!this.state.showMovesAsc) {
      moves.reverse();
    }

    let status = winner ?
    'Winner: ' + winner :
    'Next player: ' + ( this.state.xIsNext ? 'X' : 'O' );

    if(!winner && this.state.stepNumber == 9)
      status = 'DRAW!';

    let moveOrderText = this.state.showMovesAsc ?
    'Show Moves Descending' :
    'Show Moves Ascending';

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winningSquares = {winningSquares}
            squares = {current.squares}
            onClick= { (i) => this.handleClick(i) }
            />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <div>
            <button onClick = {() => this.reverseMoveOrder()}>{moveOrderText}</button>
          </div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        squares: lines[i]
      };
    }
  }

  return null;
}

export default App;
