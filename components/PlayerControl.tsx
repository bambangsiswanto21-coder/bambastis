
import React from 'react';
import { Question } from '../types';

interface PlayerControlProps {
  playerNumber: 1 | 2;
  currentQuestion: Question;
  onAnswer: (player: 1 | 2, optionIndex: number) => void;
  isLocked: boolean;
  isAnsweredByOther: boolean;
  lastFeedback: 'correct' | 'wrong' | null;
}

const PlayerControl: React.FC<PlayerControlProps> = ({ 
  playerNumber, 
  currentQuestion, 
  onAnswer, 
  isLocked,
  isAnsweredByOther,
  lastFeedback
}) => {
  const colorClass = playerNumber === 1 ? 'red' : 'blue';
  
  return (
    <div className={`flex-1 flex flex-col p-6 space-y-6 ${playerNumber === 1 ? 'border-r-2' : ''} border-zinc-800`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bungee ${playerNumber === 1 ? 'text-red-500' : 'text-blue-500'}`}>
          PEMAIN {playerNumber}
        </h2>
        <div className="flex space-x-2">
            {isLocked && (
                <span className="bg-red-900/50 text-red-300 px-3 py-1 rounded-full text-sm font-bold border border-red-500/50 animate-pulse">
                   TERKUNCI!
                </span>
            )}
            {isAnsweredByOther && (
                <span className="bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-sm font-bold">
                   SOAL SELESAI
                </span>
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            disabled={isLocked || isAnsweredByOther}
            onClick={() => onAnswer(playerNumber, index)}
            className={`
              relative text-2xl font-bold rounded-2xl p-6 transition-all active:scale-95 shadow-lg flex items-center justify-center text-center
              ${isLocked || isAnsweredByOther 
                ? 'bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed' 
                : playerNumber === 1 
                  ? 'bg-red-600 hover:bg-red-500 border-b-8 border-red-800 active:border-b-0' 
                  : 'bg-blue-600 hover:bg-blue-500 border-b-8 border-blue-800 active:border-b-0'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerControl;
