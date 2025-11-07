import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Tic Tac Toe</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridTemplateRows: 'repeat(3, 100px)',
          gap: '5px',
          justifyContent: 'center',
          margin: '20px auto'
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              backgroundColor: '#f0f0f0',
              cursor: 'pointer',
              border: '2px solid #333'
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner ? <h3>Winner: {winner}</h3> : <h3>Next Player: {isXNext ? 'X' : 'O'}</h3>}
      <button
        onClick={() => setBoard(Array(9).fill(null))}
        style={{ marginTop: '20px', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
      >
        Reset
      </button>
    </div>
  );
}

// Helper function to calculate winner
function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}
