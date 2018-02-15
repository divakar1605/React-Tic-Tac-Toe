import React from 'react';

function Square(props) {
  let style;
  if(props.highlight) {
    style = {
      backgroundColor: 'green'
    }
  } else {
    style = {
      brackgroundColor: 'white'
    }
  }
  return (
    <button style = {style} className="square" onClick = { props.onClick }>
      { props.value }
    </button>
  );
}

export default Square;
