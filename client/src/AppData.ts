let count: number | null = null;
let totalScore: number | null = null;
let totalCompasScore: number | null = null;
let falsePositiveCount: number | null = null;
let falseNegativeCount: number | null = null;
let truePositiveCount: number | null = null;
let trueNegativeCount: number | null = null;

let trial1Score: number | null = null;
let trial2Score: number | null = null;
let score: number | null = null;

export const updateScore = (score: number, compasScore: number, detain: boolean, is_recid: boolean): void => {
  console.log(score, compasScore, detain, is_recid);
  count++;
  if (is_recid) {
    totalScore += score;
    totalCompasScore += compasScore;
    if (detain) {
      truePositiveCount++;
    } else {
      falseNegativeCount++;
    }
  } else {
    totalScore += (11 - score);
    totalCompasScore += (11 - compasScore);
    if (detain) {
      falsePositiveCount++;
    } else {
      trueNegativeCount++;
    }
  }
  console.log(count, totalScore, totalCompasScore, falsePositiveCount, falseNegativeCount, score, trial1Score, trial2Score, compasScore, detain, is_recid);
};

export const getScore = (): number | null => totalScore;
export const getCompasScore = (): number | null => totalCompasScore;
export const getFalsePositiveRate = (): number | null => falsePositiveCount;
export const getFalseNegativeRate = (): number | null => falseNegativeCount;
export const getTruePositiveRate = (): number | null => truePositiveCount;
export const getTrueNegativeRate = (): number | null => trueNegativeCount;

export const setTrial1Score = (score: number): void => {
    trial1Score = score;
};

export const setTrial2Score = (score: number): void => {
  trial2Score = score;
};

export const getTrialScore = (trial: number): number | null => {
  if (trial === 1) return trial1Score;
  if (trial === 2) return trial2Score;
  return null;
};

export const resetGame = (): void => {
  count = 0;
  totalScore = 0;
  totalCompasScore = 0;
  falsePositiveCount = 0;
  falseNegativeCount = 0;
  truePositiveCount = 0;
  trueNegativeCount = 0;
  trial1Score = 0;
  trial2Score = 0;
};
