import Square from "./Square";
import React from "react";

export default function Board(props) {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        winCell={props.winCell.includes(i)}
      />
    );
  };

  return (
    <div>
      {(() => {
        let src = [];
        for (let i = 0; i < 3; i++) {
          let child = [];
          for (let j = 0; j < 3; j++) child.push(renderSquare(i * 3 + j));
          src.push(<div className="board-row">{child}</div>);
        }
        return src;
      })()}
    </div>
  );
}
