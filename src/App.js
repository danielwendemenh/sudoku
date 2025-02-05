import React from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import GameMenu from "./components/GameMenu";

function App() {
  const [Games, setGames] = React.useState([]);
  const [currentGame, setCurrentGame] = React.useState(null);

  const startGame = () => {
    const board = generateSudokuBoard();
    const Game = { id: Games.length + 1, board };

    setGames([...Games, Game]);
    setCurrentGame(Game);
  };

  const generateSudokuBoard = () => {
    const newBoard = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    );
    return newBoard;
  };
  const resetGame = () => {
    setGames([]);
  };

  const checkGame = () => {
    console.log("Check Game");
  };

  const quitGame = () => {
    console.log("Quit Game");
  };
  return (
    <div className="App">
      <GameMenu
        startGame={startGame}
        resetGame={resetGame}
        checkGame={checkGame}
        quitGame={quitGame}
      />
      {currentGame && <GameBoard board={currentGame?.board} />}
    </div>
  );
}

export default App;
