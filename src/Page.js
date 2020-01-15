import React, { Component } from 'react';
import Chess from 'chess.js'; 
import Chessboard from 'chessboardjsx';

import './index.css'
import elvis from "./elvis.png";
import lebronJames from "./kingJames.png";

class Page extends Component {
  
  state = { fen: 'start' };

  componentDidMount() {
    this.game = new Chess();
  }

  randomMove = () => {
    let moves = this.game.moves();
    if (
      this.game.game_over() === true ||
      this.game.in_draw() === true ||
      moves.length === 0
    ) {
      return;
    }
    const index = Math.floor(Math.random() * moves.length);
    this.game.move(moves[index]);
    this.setState({ fen: this.game.fen() });
  };
  
  step = ({ sourceSquare, targetSquare, piece }) => {
    if (this.game.move(`${sourceSquare}${targetSquare}`, { sloppy: true })) {
      this.setState({ fen: this.game.fen() });
      setTimeout(this.randomMove, 1000)
    }
  }
  
  reset = () => {
    this.game.reset()
    this.setState({ fen: 'start' }) 
  }

  render() {
    const { fen } = this.state;
    return (
      <div>
        {this.game && this.game.game_over() && <h1>Game Over</h1>}
        {this.game && this.game.in_checkmate() && <h2>Checkmate</h2>}
        {this.game &&this.game.in_stalemate() && <h2>Stalemate</h2>}
        <Chessboard
          width={400}
          id="chess"
          onDrop={this.step}
          position={fen}
          transitionDuration={400}
          boardStyle={{
            borderRadius: '7px',
            boxShadow: `0 7px 17px rgba(0, 0, 0, 0.4)`
          }}
          pieces={{
            wK: ({ squareWidth, isDragging }) => (
              <img
                style={{
                  width: isDragging ? squareWidth * 1.75 : squareWidth,
                  height: isDragging ? squareWidth * 1.75 : squareWidth
                }}
                src={elvis}
                alt={'elvis'}
              />
            ),
            bK: ({ squareWidth, isDragging }) => (
              <img
                style={{
                  width: isDragging ? squareWidth * 1.75 : squareWidth,
                  height: isDragging ? squareWidth * 1.75 : squareWidth
                }}
                src={lebronJames}
                alt={'lebron james'}
              />
            )
          }}
        />
        <h3 className="reload" onClick={this.reset}>Reload Game</h3>
      </div>)
  }
}

export default Page
