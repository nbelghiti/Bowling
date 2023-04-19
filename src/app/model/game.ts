export interface  Game {
  pinCount: number;
  frameNumber: number;
  rollNumber: number;
  gameover: boolean;
  frameScore: {
    [key: number]: string[];
  };
  totalScore: number[];
  runningTotal: number[];
  bonus: {
    [key: number]: string;
  };
  bonusNextFrame: {
    [key: number]: string;
  };
}