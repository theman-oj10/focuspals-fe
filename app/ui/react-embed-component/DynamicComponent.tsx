'use client';
import React, { useState } from 'react';

const SimpleGame = () => {
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(Math.floor(Math.random() * 10));
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (numGuess === target) {
      setScore(score + 1);
      setMessage('Correct! New number generated.');
      setTarget(Math.floor(Math.random() * 10));
    } else {
      setMessage('Try again!');
    }
    setGuess("");
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Guess the Number (0-9)</h1>
      <p className="mb-2">Score: {score}</p>
      <input
        className="border p-1 mr-2"
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-2 py-1" onClick={handleGuess}>Guess</button>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default SimpleGame;