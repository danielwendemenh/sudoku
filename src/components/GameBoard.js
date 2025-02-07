import React, { useEffect } from "react";
import "./GameBoard.scss";

const GameBoard = ({
  board,
  selectedCell,
  setSelectedCell,
  handleBoardUpdate,
}) => {
  // The GameBoard component should render a div element with the text "GameBoard".  sudoku board

  const handleCellClick = (cellIndex, rowIndex) => {
    setSelectedCell({ cellIndex, rowIndex });
  };

  useEffect(() => {
    document.addEventListener("keydown", arrowKeysHandler);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", arrowKeysHandler);
    };
  }, [selectedCell]);

  const arrowKeysHandler = (e) => {
    if (selectedCell) {
      if (e.key === "ArrowUp") {
        if (selectedCell.rowIndex === 0) return;
        setSelectedCell({
          cellIndex: selectedCell.cellIndex,
          rowIndex: selectedCell.rowIndex - 1,
        });
      }

      if (e.key === "ArrowDown") {
        if (selectedCell.rowIndex === 8) return;
        setSelectedCell({
          cellIndex: selectedCell.cellIndex,
          rowIndex: selectedCell.rowIndex + 1,
        });
      }

      if (e.key === "ArrowLeft") {
        if (selectedCell.cellIndex === 0) return;
        setSelectedCell({
          cellIndex: selectedCell.cellIndex - 1,
          rowIndex: selectedCell.rowIndex,
        });
      }

      if (e.key === "ArrowRight") {
        if (selectedCell.cellIndex === 8) return;
        setSelectedCell({
          cellIndex: selectedCell.cellIndex + 1,
          rowIndex: selectedCell.rowIndex,
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    // handle updating the board with the new value
    if (e.key === "1") {
      handleBoardUpdate(1);
    }
    if (e.key === "2") {
      handleBoardUpdate(2);
    }
    if (e.key === "3") {
      handleBoardUpdate(3);
    }
    if (e.key === "4") {
      handleBoardUpdate(4);
    }
    if (e.key === "5") {
      handleBoardUpdate(5);
    }
    if (e.key === "6") {
      handleBoardUpdate(6);
    }
    if (e.key === "7") {
      handleBoardUpdate(7);
    }
    if (e.key === "8") {
      handleBoardUpdate(8);
    }
    if (e.key === "9") {
      handleBoardUpdate(9);
    }
    if (e.key === "Backspace") {
      handleBoardUpdate(0);
    }
  };

  return (
    <div className="sudoku-game-board">
      {board?.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row?.map((cell, cellIndex) => (
            <div
              onClick={() => handleCellClick(cellIndex, rowIndex)}
              key={cellIndex}
              className={`cell ${
                (selectedCell?.rowIndex === rowIndex &&
                  selectedCell?.cellIndex === cellIndex) ||
                (row[cellIndex] ===
                  board?.[selectedCell?.rowIndex]?.[selectedCell?.cellIndex] &&
                  board?.[selectedCell?.rowIndex]?.[selectedCell?.cellIndex] !==
                    0)
                  ? "cell-Selected"
                  : ""
              }`}
            >
              {cell === 0 ? "" : cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
