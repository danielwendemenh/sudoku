import React from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import GameMenu from "./components/GameMenu";
import InGameMenu from "./components/InGameMenu";

function App() {
  const [Games, setGames] = React.useState([]);
  const [currentGame, setCurrentGame] = React.useState(null);
  const [selectedCell, setSelectedCell] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isOpenMenu, setIsOpenMenu] = React.useState(true);
  const [board, setBoard] = React.useState([]);

  const startGame = () => {
    const newBoard = generateSudokuBoard();
    const Game = { id: Games.length + 1, board: newBoard };
    setBoard(newBoard);
    setGames([...Games, Game]);
    setCurrentGame(Game);
    setIsOpenMenu(false);
  };

  const generateSudokuBoard = () => {
    const newBoard = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    );
    return newBoard;
  };
  const resetGame = () => {
    setBoard(currentGame.board);
  };

  const checkGame = () => {
    console.log("Check Game");
  };

  const quitGame = () => {
    setCurrentGame(null);
    setGames((prev) => prev.filter((game) => game.id !== currentGame.id));
    setIsOpenMenu(true);
  };
  const handleBoardUpdate = (value) => {
    setBoard((prev) => {
      const newBoard = prev.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (
            cellIndex === selectedCell?.cellIndex &&
            rowIndex === selectedCell?.rowIndex
          ) {
            return value;
          }
          return cell;
        })
      );
      return newBoard;
    });
  };
  return (
    <div className="App">
      {isOpenMenu && (
        <GameMenu
          startGame={startGame}
          resetGame={resetGame}
          checkGame={checkGame}
          quitGame={quitGame}
        />
      )}
      {currentGame && (
        <>
          <InGameMenu
            resetGame={resetGame}
            checkGame={checkGame}
            quitGame={quitGame}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
          <GameBoard
            setSelectedCell={setSelectedCell}
            selectedCell={selectedCell}
            board={board}
            handleBoardUpdate={handleBoardUpdate}
          />
        </>
      )}
    </div>
  );
}

export default App;
