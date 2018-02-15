import React from 'react';
import Square from './square.jsx';

class Board extends React.Component {

  renderSquare(i, highlight) {
    return (
      <Square key={i}
        highlight = {highlight}
        value = { this.props.squares[i] }
        onClick = { () => this.props.onClick(i) }
       />
   );
  }

  render() {

    let board = [];

    for(let i=0; i<3; i++) {
      let children = [];

      for(let j=0; j<3; j++) {
        let idx = i*3 + j;
        if (this.props.winningSquares && this.props.winningSquares.indexOf(idx) != -1) {
          children.push(this.renderSquare(idx, true));
        } else {
          children.push(this.renderSquare(idx, false));
        }
      }

      board.push(<div key={i} className="board-row">{children}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}

export default Board;
