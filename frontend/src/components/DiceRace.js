import React, { useState } from 'react';

export default function DiceRace() {
  const trackLength = 30; 
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);

  const rollDice = () => {
    if (winner || rolling) return;

    setRolling(true);

    // dice roll animation for 0.5 sec
    const animationSteps = 5;
    let step = 0;
    const interval = setInterval(() => {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      setLastRoll(diceRoll);
      step++;
      if (step >= animationSteps) {
        clearInterval(interval);
        updatePosition(diceRoll);
        setRolling(false);
      }
    }, 100);
  };

  const updatePosition = (dice) => {
    let newPos;
    if (turn === 1) {
      newPos = Math.min(player1 + dice, trackLength - 1);
      setPlayer1(newPos);
      if (newPos === trackLength - 1) setWinner('Player 1');
      setTurn(2);
    } else {
      newPos = Math.min(player2 + dice, trackLength - 1);
      setPlayer2(newPos);
      if (newPos === trackLength - 1) setWinner('Player 2');
      setTurn(1);
    }
  };

  const resetGame = () => {
    setPlayer1(0);
    setPlayer2(0);
    setTurn(1);
    setWinner(null);
    setLastRoll(null);
    setRolling(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Dice Race</h2>

      {winner && (
        <h2 style={{
          color: '#ff0',
          textShadow: '2px 2px 8px #f00, -2px -2px 8px #00f',
          animation: 'blink 0.5s linear infinite'
        }}>
          {winner} Wins!
        </h2>
      )}

      {!winner && (
        <h3>{rolling ? 'Rolling...' : lastRoll ? `Rolled: ${lastRoll}` : `Player ${turn}'s turn`}</h3>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${trackLength}, 30px)`,
          justifyContent: 'center',
          gap: '3px',
          margin: '20px auto',
          overflowX: 'auto',
          padding: '10px'
        }}
      >
        {Array(trackLength).fill(0).map((_, index) => (
          <div
            key={index}
            style={{
              width: '30px',
              height: '30px',
              border: '2px solid #333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              backgroundColor: '#eee'
            }}
          >
            {player1 === index && (
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#f88',
                position: 'absolute',
                top: '3px',
                left: '3px'
              }} />
            )}
            {player2 === index && (
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#88f',
                position: 'absolute',
                bottom: '3px',
                right: '3px'
              }} />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={rollDice}
        disabled={rolling || winner}
        style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
      >
        Roll Dice
      </button>
      <button
        onClick={resetGame}
        style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
      >
        Reset
      </button>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
}
