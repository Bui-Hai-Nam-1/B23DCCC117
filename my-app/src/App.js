import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bgColor, setBgColor] = useState('white');
  const [history, setHistory] = useState([]);
  const [isAutoChanging, setIsAutoChanging] = useState(false);
  const colors = ['red', 'green', 'blue'];

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
    setHistory((prev) => [...prev, randomColor]); // Thêm màu mới nhất vào cuối danh sách
  };

  const toggleAutoChange = () => {
    setIsAutoChanging(!isAutoChanging);
  };

  const undoLastColor = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1)); // Xóa màu cuối cùng
      setBgColor(history[history.length - 2]);
    }
  };

  useEffect(() => {
    let interval;
    if (isAutoChanging) {
      interval = setInterval(changeColor, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoChanging]);

  return (
    <div className="App">
      <div className="controls">
        <h1 className="title">Random Color</h1>
        <button onClick={changeColor} style={{ fontSize: '18px', marginRight: '10px' }}>
          Change Color
        </button>
        <button onClick={toggleAutoChange} style={{ fontSize: '18px', marginRight: '10px' }}>
          {isAutoChanging ? 'Stop Auto Change' : 'Start Auto Change'}
        </button>
        <button onClick={undoLastColor} style={{ fontSize: '18px' }}>
          Undo
        </button>
      </div>
      <div className="color-container">
        <div className="color-box" style={{ backgroundColor: bgColor }}>
          <p>Current Color: {bgColor}</p>
        </div>
        <div className="history-container">
          <h3>Color History:</h3>
          <ul>
            {history.map((color, index) => (
              <li key={index} className="color-item">
                <div className="color-preview" style={{ backgroundColor: color }}></div>
                {color}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
