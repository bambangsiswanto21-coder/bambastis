
import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from './data/questions';
import { GameStatus, PlayerId } from './types';
import RacingTrack from './components/RacingTrack';
import PlayerControl from './components/PlayerControl';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>('START');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [locked1, setLocked1] = useState(false);
  const [locked2, setLocked2] = useState(false);
  const [isAnsweredByOther, setIsAnsweredByOther] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIdx];

  const handleStartGame = () => {
    setStatus('PLAYING');
    setScore1(0);
    setScore2(0);
    setCurrentIdx(0);
    setLocked1(false);
    setLocked2(false);
    setIsAnsweredByOther(false);
  };

  const nextQuestion = useCallback(() => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setLocked1(false);
      setLocked2(false);
      setIsAnsweredByOther(false);
    } else {
      setStatus('FINISHED');
    }
  }, [currentIdx, totalQuestions]);

  const handleAnswer = (playerId: 1 | 2, optionIndex: number) => {
    if (isAnsweredByOther) return;

    const isCorrect = optionIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      setIsAnsweredByOther(true);
      if (playerId === 1) {
        setScore1(prev => prev + 1);
      } else {
        setScore2(prev => prev + 1);
      }
      
      // Play a short sound if available or just visual transition
      setTimeout(nextQuestion, 1500);
    } else {
      if (playerId === 1) {
        setLocked1(true);
      } else {
        setLocked2(true);
      }
      
      // If both are locked, move to next question anyway
      // Use state checks effectively
    }
  };

  useEffect(() => {
    if (locked1 && locked2) {
      setIsAnsweredByOther(true);
      setTimeout(nextQuestion, 2000);
    }
  }, [locked1, locked2, nextQuestion]);

  if (status === 'START') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-white p-10 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bungee text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 drop-shadow-lg">
            RACING COMPUTATIONAL THINKING
          </h1>
          <p className="text-2xl text-zinc-400 font-bold uppercase tracking-widest">Informatika - Berpikir Komputasional</p>
        </div>

        <div className="grid grid-cols-2 gap-10 w-full max-w-4xl">
           <div className="bg-zinc-800 p-8 rounded-3xl border-4 border-red-500 text-center space-y-4">
              <div className="text-6xl text-red-500"><i className="fas fa-car"></i></div>
              <h3 className="text-2xl font-bungee">PEMAIN 1</h3>
              <p className="text-zinc-400">SISI KIRI</p>
           </div>
           <div className="bg-zinc-800 p-8 rounded-3xl border-4 border-blue-500 text-center space-y-4">
              <div className="text-6xl text-blue-500"><i className="fas fa-car"></i></div>
              <h3 className="text-2xl font-bungee">PEMAIN 2</h3>
              <p className="text-zinc-400">SISI KANAN</p>
           </div>
        </div>

        <button 
          onClick={handleStartGame}
          className="bg-green-500 hover:bg-green-400 text-zinc-900 font-bungee text-4xl px-16 py-8 rounded-full shadow-[0_10px_0_rgb(21,128,61)] active:translate-y-2 active:shadow-none transition-all"
        >
          MULAI BALAPAN!
        </button>
      </div>
    );
  }

  if (status === 'FINISHED') {
    const winner = score1 > score2 ? 'PEMAIN 1 (MERAH)' : score2 > score1 ? 'PEMAIN 2 (BIRU)' : 'SERI!';
    const winnerColor = score1 > score2 ? 'text-red-500' : score2 > score1 ? 'text-blue-500' : 'text-yellow-500';

    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 p-10">
        <div className="bg-zinc-900 p-12 rounded-[3rem] border-8 border-zinc-800 shadow-2xl text-center space-y-8 max-w-3xl w-full">
          <h2 className="text-5xl font-bungee text-zinc-500">HASIL AKHIR</h2>
          
          <div className="flex justify-around items-center">
            <div className="space-y-2">
              <div className="text-3xl font-bungee text-red-500">PEMAIN 1</div>
              <div className="text-8xl font-bungee">{score1}</div>
            </div>
            <div className="text-4xl font-bungee text-zinc-700">VS</div>
            <div className="space-y-2">
              <div className="text-3xl font-bungee text-blue-500">PEMAIN 2</div>
              <div className="text-8xl font-bungee">{score2}</div>
            </div>
          </div>

          <div className="py-8 bg-zinc-800 rounded-2xl">
            <h3 className="text-2xl font-bold text-zinc-400">PEMENANGNYA ADALAH:</h3>
            <div className={`text-6xl font-bungee mt-2 ${winnerColor} animate-bounce`}>
              {winner}
            </div>
          </div>

          <button 
            onClick={handleStartGame}
            className="bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bungee text-3xl px-12 py-6 rounded-full shadow-[0_8px_0_rgb(161,98,7)] active:translate-y-2 active:shadow-none transition-all"
          >
            MAIN LAGI
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      {/* Track Section */}
      <RacingTrack score1={score1} score2={score2} totalQuestions={totalQuestions} />

      {/* Middle Question Board */}
      <div className="flex-1 flex flex-col">
        <div className="bg-zinc-900 py-6 px-10 border-b-2 border-zinc-800 shadow-inner relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-zinc-900 px-6 py-2 rounded-full font-bungee text-xl shadow-lg z-20">
            SOAL {currentIdx + 1} / {totalQuestions}
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-zinc-500 font-bold tracking-widest text-sm mb-2">
               KATEGORI: {currentQuestion.category.toUpperCase()}
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              {currentQuestion.text}
            </h1>
          </div>
        </div>

        {/* Player Controls Section */}
        <div className="flex-1 flex overflow-hidden">
          <PlayerControl 
            playerNumber={1} 
            currentQuestion={currentQuestion} 
            onAnswer={handleAnswer} 
            isLocked={locked1}
            isAnsweredByOther={isAnsweredByOther}
            lastFeedback={null}
          />
          <PlayerControl 
            playerNumber={2} 
            currentQuestion={currentQuestion} 
            onAnswer={handleAnswer} 
            isLocked={locked2}
            isAnsweredByOther={isAnsweredByOther}
            lastFeedback={null}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-zinc-900 p-2 flex justify-center border-t border-zinc-800 text-xs text-zinc-500 uppercase font-bold tracking-widest">
         Racing Computational Thinking - Competitive Educational Game
      </div>
    </div>
  );
};

export default App;
