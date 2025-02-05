<!-- sudoku game react implementation -->

# System Design for Sudoku Game Core Features

This document outlines the system design for the core features of the Sudoku game built using React. The focus is on the architecture, components, and interactions required to implement the core gameplay, including the game board, difficulty levels, input methods, validation, hints, and timer.

---

## 1. **High-Level Architecture**

The system will follow a **client-side architecture** with React as the frontend framework. All core features will be implemented on the client side, with optional backend integration for advanced features like saving progress or leaderboards.

### Key Components:

1. **UI Layer**: React components for rendering the game board, buttons, and other UI elements.
2. **State Management**: React Context API or Redux for managing game state (e.g., board data, timer, hints).
3. **Game Logic**: JavaScript modules for Sudoku generation, validation, and solving.
4. **Local Storage**: Optional for saving game progress.

---

## 2. **Core Features and System Design**

### 2.1 **Game Board**

#### Requirements:

- Render a 9x9 grid with 3x3 subgrids.
- Pre-fill cells based on the selected difficulty level.
- Allow users to input numbers into empty cells.

#### Design:

- **Component**: `SudokuBoard`
  - Renders the 9x9 grid using a nested loop.
  - Each cell is a `div` or `input` element with a unique `key` (e.g., `row-col`).
- **State**:
  - `boardData`: A 2D array representing the Sudoku grid.
    - Pre-filled cells contain numbers (1-9).
    - Empty cells are represented by `null` or `0`.
  - `initialBoard`: A copy of the initial board to differentiate between pre-filled and user-filled cells.
- **Props**:
  - `difficulty`: Determines the number of pre-filled cells.

#### Flow:

1. On game start, generate a Sudoku puzzle based on the selected difficulty.
2. Render the `boardData` array into the grid.
3. Allow users to input numbers into empty cells.

---

### 2.2 **Difficulty Levels**

#### Requirements:

- Provide three difficulty levels: Easy, Medium, Hard.
- Adjust the number of pre-filled cells based on the selected difficulty.

#### Design:

- **Component**: `DifficultySelector`
  - A dropdown or button group to select difficulty.
- **State**:
  - `difficulty`: Stores the selected difficulty level.
- **Logic**:
  - Use a Sudoku generator library (e.g., `sudoku.js`) to create puzzles with varying numbers of pre-filled cells:
    - Easy: 40-50 cells.
    - Medium: 30-40 cells.
    - Hard: 20-30 cells.

#### Flow:

1. User selects a difficulty level.
2. Generate a Sudoku puzzle with the appropriate number of pre-filled cells.
3. Update the `boardData` and `initialBoard` state.

---

### 2.3 **Input Methods**

#### Requirements:

- Allow users to input numbers using a keyboard (desktop) or an on-screen number pad (mobile).

#### Design:

- **Component**: `NumberInput`
  - For desktop: Listen for keyboard events (numbers 1-9).
  - For mobile: Render an on-screen number pad with buttons (1-9).
- **State**:
  - `selectedCell`: Tracks the currently selected cell (e.g., `{ row, col }`).
- **Logic**:
  - Update the `boardData` array when a valid number is entered.

#### Flow:

1. User clicks/taps on an empty cell to select it.
2. User inputs a number using the keyboard or on-screen number pad.
3. Update the `boardData` array and re-render the grid.

---

### 2.4 **Validation**

#### Requirements:

- Validate the Sudoku grid in real-time.
- Highlight conflicting cells in red.

#### Design:

- **Component**: `SudokuBoard`
  - Add a `conflicts` state to track conflicting cells.
- **Logic**:
  - After each input, check for conflicts in the row, column, and 3x3 subgrid.
  - Update the `conflicts` state with the positions of conflicting cells.
- **UI**:
  - Highlight conflicting cells with a red border or background.

#### Flow:

1. User inputs a number.
2. Validate the grid for conflicts.
3. Update the `conflicts` state and re-render the grid with highlights.

---

### 2.5 **Hints**

#### Requirements:

- Provide a random correct number for an empty cell when requested.
- Limit the number of hints per game (e.g., 3 hints).

#### Design:

- **Component**: `HintButton`
  - A button to request a hint.
- **State**:
  - `hintsRemaining`: Tracks the number of hints left.
- **Logic**:
  - Use a Sudoku solver to find the correct number for a random empty cell.
  - Update the `boardData` array with the correct number.
  - Decrement `hintsRemaining`.

#### Flow:

1. User clicks the "Hint" button.
2. Find a random empty cell and its correct number.
3. Update the `boardData` array and `hintsRemaining` state.

---

### 2.6 **Timer**

#### Requirements:

- Track the time taken to complete the puzzle.
- Display the timer in a user-friendly format (e.g., MM:SS).

#### Design:

- **Component**: `Timer`
  - Displays the elapsed time.
- **State**:
  - `startTime`: Stores the timestamp when the game starts.
  - `elapsedTime`: Tracks the total time elapsed.
- **Logic**:
  - Use `setInterval` to update the `elapsedTime` every second.
  - Format the time as `MM:SS`.

#### Flow:

1. Start the timer when the game begins.
2. Update the timer display every second.
3. Stop the timer when the puzzle is solved.

---

## 3. **Data Flow Diagram**

+-------------------+ +-------------------+ +-------------------+
| Difficulty Select | ----> | Sudoku Generator | ----> | Sudoku Board |
+-------------------+ +-------------------+ +-------------------+
| |
v v
+-------------------+ +-------------------+ +-------------------+
| Number Input | <---> | Validation Logic | <---> | Hint System |
+-------------------+ +-------------------+ +-------------------+
|
v
+-------------------+
| Timer |
+-------------------+

---

## 4. **State Management**

### 4.1 **Global State (React Context API or Redux)**

- `boardData`: 2D array representing the Sudoku grid.
- `initialBoard`: Copy of the initial board for reference.
- `difficulty`: Selected difficulty level.
- `conflicts`: Array of conflicting cell positions.
- `hintsRemaining`: Number of hints left.
- `startTime` and `elapsedTime`: Timer state.

### 4.2 **Component State**

- `selectedCell`: Currently selected cell for input.

---

## 5. **Tech Stack**

- **Frontend**: React, React Context API/Redux, CSS-in-JS (styled-components).
- **Sudoku Logic**: `sudoku.js` library or custom implementation.
- **Testing**: Jest and React Testing Library.
- **Build Tool**: Vite or Create React App.

---

## 6. **Next Steps**

1. Implement the Sudoku generator and solver logic.
2. Build the core React components (`SudokuBoard`, `DifficultySelector`, `Timer`, etc.).
3. Integrate state management for seamless data flow.
4. Test and refine the UI/UX for responsiveness and accessibility.

---

This system design provides a clear roadmap for implementing the core features of the Sudoku game in React. By following this design, the development team can ensure a modular, maintainable, and scalable codebase.
