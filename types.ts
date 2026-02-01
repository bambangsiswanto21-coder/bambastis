
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  category: 'Decomposition' | 'Pattern Recognition' | 'Abstraction' | 'Algorithm';
}

export enum PlayerId {
  Player1 = 1,
  Player2 = 2
}

export type GameStatus = 'START' | 'PLAYING' | 'FINISHED';
