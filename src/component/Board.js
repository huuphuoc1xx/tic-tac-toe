import Square from "./Square";
import React from 'react';

export default class Board extends React.Component {


  renderSquare(i) {
    return <Square
      value={this.props.squares[i]} onClick={() => this.props.onClick(i)}
      winCell={this.props.winCell.includes(i)} />;
  }
  render() {

    return (
      <div>
        {(() => {
          let src = [];
          for (let i = 0; i < 3; i++) {
            let child = [];
            for (let j = 0; j < 3; j++)
              child.push(this.renderSquare(i * 3 + j))
          src.push(<div className="board-row">{child}</div>);
          }
          return src;
        })()}
      </div>
    );
  }
}