import React, { useEffect } from "react";
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
    const newBoard = generateSudokuBoard(Math.ceil(Math.random() * 3));
    const Game = { id: Games.length + 1, board: newBoard };
    setBoard(newBoard);
    setGames([...Games, Game]);
    setCurrentGame(Game);
    setIsOpenMenu(false);
    localStorage.setItem("Games", JSON.stringify([...Games, Game]));
  };

  function generateSudokuBoard(level) {
    if (level < 1 || level > 10)
      throw new Error("Level must be between 1 and 10");

    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    function isValid(board, row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
      }

      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false;
        }
      }

      return true;
    }

    function fillBoard(board) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            const numbers = [...Array(9).keys()]
              .map((n) => n + 1)
              .sort(() => Math.random() - 0.5);
            for (let num of numbers) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (fillBoard(board)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    fillBoard(board);

    function removeNumbers(board, level) {
      let attempts = level * 5 + 20;
      while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
          board[row][col] = 0;
          attempts--;
        }
      }
    }

    removeNumbers(board, level);
    return board;
  }

  const resetGame = () => {
    if (!currentGame) return;
    setBoard(currentGame?.board);
  };

  const quitGame = () => {
    setCurrentGame(null);
    setGames((prev) => prev.filter((game) => game.id !== currentGame.id));
    setIsOpenMenu(true);
  };

  const handleBoardUpdate = (value) => {
    // check if the cell is not editable
    if (
      currentGame.board[selectedCell.rowIndex][selectedCell.cellIndex] !== 0
    ) {
      return;
    }

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

  const checkGame = () => {
    // check if error in the board
    const isBoardError = board.some((row) =>
      row.some((cell) => {
        if (cell === 0) {
          return false;
        }
        return row.indexOf(cell) !== row.lastIndexOf(cell);
      })
    );
    if (isBoardError) {
      alert("Error in the board");
    } else {
      alert("No error in the board");
    }
  };

  useEffect(() => {
    setGames(JSON.parse(localStorage.getItem("Games")) || []);
  }, []);

  const resume = () => {
    const pastGames = JSON.parse(localStorage.getItem("Games")) || [];
    const lastGame = pastGames[pastGames.length - 1];
    if (!lastGame) {
      return;
    }
    setCurrentGame(lastGame);
    setBoard(lastGame.board);
    setIsOpenMenu(false);
  };
  return (
    <div className="App">
      {isOpenMenu && (
        <GameMenu
          startGame={startGame}
          resume={resume}
          checkGame={checkGame}
          quitGame={quitGame}
        />
      )}
      {currentGame && (
        <div className="Game-screen">
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
        </div>
      )}
    </div>
  );
}

export default App;
