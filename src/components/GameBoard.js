import React, { use, useEffect } from "react";
import "./GameBoard.scss";

const GameBoard = ({ board }) => {
  // The GameBoard component should render a div element with the text "GameBoard".  sudoku board
  const [sudokuBoard, setSudokuBoard] = React.useState([]);
  const [selectedCell, setSelectedCell] = React.useState(null);

  const handleCellClick = (cellIndex, rowIndex) => {
    setSelectedCell({ cellIndex, rowIndex });
  };

  useEffect(() => {
    // generate a sudoku board based on a rand deficutly range from 0 to 10
    setSudokuBoard(board);
  }, []);

  return (
    <div className="sudoku-game-board">
      {sudokuBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              onClick={() => handleCellClick(cellIndex, rowIndex)}
              key={cellIndex}
              className={`cell ${
                selectedCell?.rowIndex === rowIndex &&
                selectedCell?.cellIndex === cellIndex
                  ? "cell-Selected"
                  : ""
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
