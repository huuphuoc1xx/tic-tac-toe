import React, {  useState } from "react";
import { calculateWinner } from "../helper/hepler";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), stepLocate: [] },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNum, setStepNum] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winCell, setWinCell] = useState([]);
  const [reverse, setReverse] = useState(false);

  const handleClick = (i) => {
    const h = history.slice(0, stepNum + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    calculateWinner(squares, (winCell,winner) => {
      setWinner(winner);
      setWinCell(winCell);
    });
    setHistory(
      h.concat([
        {
          squares,
          stepLocate: [(i - (i % 3)) / 3, i % 3],
        },
      ])
    );
    setStepNum(h.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNum(step);
    setXIsNext(step % 2 === 0);
    setWinCell([]);
    setWinner(null);
    const h = history.slice(0, step + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();
    calculateWinner(squares, (winCell,winner) => {
      setWinner(winner);
      setWinCell(winCell);
    });
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move (${step.stepLocate[0]},${step.stepLocate[1]}) `
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={stepNum === move ? "back-btn bold-btn" : "back-btn"}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNum].squares}
          winCell={winCell}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>
          {stepNum === 9 && !winner
            ? `Draw`
            : winner
            ? `Winner:${winner}`
            : `Next player: ${xIsNext ? "X" : "O"}`}
        </div>
        <button
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse step
        </button>
        <ol reversed={reverse} className={reverse ? "reverse-list" : ""}>
          {moves}
        </ol>
      </div>
    </div>
  );
}
