import React from 'react';
import { Link } from 'react-router-dom';
import tttImg from '../assets/tictactoe.png';
import ludoImg from '../assets/ludo.png';
import diceImg from '../assets/dicerace.png';
import dinoImg from '../assets/dino.png';

export default function Home() {
  const games = [
    { name: 'Tic Tac Toe', path: '/tictactoe', desc: 'Classic 2-player game', img: tttImg },
    { name: 'Ludo', path: '/ludo', desc: 'Linear Ludo race', img: ludoImg },
    { name: 'Dice Race', path: '/dicerace', desc: 'Race to target score', img: diceImg },
    { name: 'Dino Runner', path: '/dinogame', desc: 'Endless runner jump game', img: dinoImg }
  ];

  return (
    <div className="game">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
        {games.map((g, i) => (
          <Link key={i} to={g.path} style={{
            display:'block',
            background:'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
            borderRadius:'16px',
            textAlign:'center',
            width:'180px',
            color:'#222',
            fontWeight:'600',
            boxShadow:'0 8px 20px rgba(0,0,0,0.2)',
            textDecoration:'none',
            transition:'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
          >
            <img src={g.img} alt={g.name} style={{
              width:'100%',
              height:'120px',
              objectFit:'cover',
              borderTopLeftRadius:'16px',
              borderTopRightRadius:'16px'
            }} />
            <h3 style={{margin:'8px 0 4px 0'}}>{g.name}</h3>
            <p style={{fontSize:'14px', margin:'0 0 12px 0'}}>{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
