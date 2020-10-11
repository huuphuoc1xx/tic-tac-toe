import React from 'react'
import { calculateWinner } from '../helper/hepler';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), stepLocate: [] }],
      xIsNext: true,
      stepNum: 0,
      winner: null,
      winCell: [],
      reverse: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.state.winner || squares[i])
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    calculateWinner(squares, this.setWinner);
    this.setState({
      history: history.concat([
        {
          squares,
          stepLocate: [(i - i % 3) / 3, i % 3]
        }
      ]),
      stepNum: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  setWinner = (winCell, winner) => { this.setState({ winCell, winner }) }

  jumpTo(step) {
    this.setState({
      stepNum: step,
      xIsNext: (step % 2) === 0,
      winCell: [],
      winner: null
    });
    const history = this.state.history.slice(0, step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(squares)
    calculateWinner(squares,this.setWinner);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move (${step.stepLocate[0]},${step.stepLocate[1]}) ` :
        'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNum === move ? "back-btn bold-btn" : "back-btn"}>{desc}</button>
        </li>
      );
    });


    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            winCell={this.state.winCell}
            onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{this.state.stepNum === 9 && !this.state.winner ?
            `Draw` :
            this.state.winner ?
              `Winner:${this.state.winner}` :
              `Next player: ${this.state.xIsNext ? 'X' : 'O'}`}</div>
          <button onClick={() => { this.setState({ reverse: !this.state.reverse }) }}>Reverse step</button>
          <ol
            reversed={this.state.reverse}
            className={this.state.reverse ? "reverse-list" : ""} >{moves}</ol>
        </div>
      </div>
    );
  }
}