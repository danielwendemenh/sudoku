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
          Start Game
        </button>
        <button
          onClick={resetGame}
          className="game-menu__button game-menu__button--reset"
        >
          Reset Game
        </button>
        <button
          onClick={checkGame}
          className="game-menu__button game-menu__button--check"
        >
          Check Game
        </button>
        <button
          onClick={quitGame}
          className="game-menu__button game-menu__button--quit"
        >
          Quit Game
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
