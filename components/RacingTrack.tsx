
import React from 'react';

interface RacingTrackProps {
  score1: number;
  score2: number;
  totalQuestions: number;
}

const RacingTrack: React.FC<RacingTrackProps> = ({ score1, score2, totalQuestions }) => {
  const getProgress = (score: number) => (score / totalQuestions) * 100;

  return (
    <div className="w-full bg-zinc-800 p-4 border-b-4 border-zinc-700 shadow-xl">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Lane 1 */}
        <div className="relative h-16 bg-zinc-900 rounded-full overflow-hidden flex items-center border border-zinc-700">
           <div className="absolute left-0 h-full w-2 bg-red-500 z-10"></div>
           <div className="absolute right-0 h-full w-8 bg-zinc-700 flex items-center justify-center font-bold text-xs border-l border-zinc-600">FINISH</div>
           <div 
             className="absolute transition-all duration-700 ease-out h-full flex items-center justify-end px-4"
             style={{ left: `${getProgress(score1)}%`, transform: 'translateX(-100%)' }}
           >
              <div className="text-red-500 text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                <i className="fas fa-car-side"></i>
              </div>
           </div>
        </div>

        {/* Lane 2 */}
        <div className="relative h-16 bg-zinc-900 rounded-full overflow-hidden flex items-center border border-zinc-700">
           <div className="absolute left-0 h-full w-2 bg-blue-500 z-10"></div>
           <div className="absolute right-0 h-full w-8 bg-zinc-700 flex items-center justify-center font-bold text-xs border-l border-zinc-600">FINISH</div>
           <div 
             className="absolute transition-all duration-700 ease-out h-full flex items-center justify-end px-4"
             style={{ left: `${getProgress(score2)}%`, transform: 'translateX(-100%)' }}
           >
              <div className="text-blue-500 text-4xl drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                <i className="fas fa-car-side"></i>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RacingTrack;
