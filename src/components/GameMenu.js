import React from "react";
import "./GameMenu.scss";

const GameMenu = ({ startGame, resetGame, checkGame, quitGame }) => {
  return (
    <div className="game-menu">
      <h1 className="game-menu__title">Sudoku</h1>
      <div className="game-menu__buttons">
        <button
          onClick={startGame}
          className="game-menu__button game-menu__button--start"
        >
          Start New Game
        </button>
        <button
          onClick={resetGame}
          className="game-menu__button game-menu__button--reset"
        >
          Resume Game
        </button>
        <button
          onClick={checkGame}
          className="game-menu__button game-menu__button--check"
        >
          Lead Board
        </button>
        <button
          onClick={quitGame}
          className="game-menu__button game-menu__button--quit"
        >
          Quit
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
