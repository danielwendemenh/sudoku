import React, { useEffect, useState } from "react";

const InGameMenu = ({ resetGame, checkGame, quitGame }) => {
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const timeLeft = `${Math.floor(timer / 60)}:${timer % 60}`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="game-menu">
      <h1 className="game-menu__title">Sudoku</h1>
      <div className="game-menu__buttons">
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("Pause");
            setIsPaused((prev) => !prev);
          }}
          className="game-menu__button game-menu__button--start"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={resetGame}
          className="game-menu__button game-menu__button--reset"
        >
          Reset
        </button>
        <button
          onClick={checkGame}
          className="game-menu__button game-menu__button--check"
        >
          Check
        </button>
        <button
          onClick={quitGame}
          className="game-menu__button game-menu__button--quit"
        >
          Quit
        </button>
        <div className="game-menu__timer">{timeLeft}</div>
      </div>
    </div>
  );
};

export default InGameMenu;
