let count: number = 0;
let totalScore: number = 0;
let totalCompasScore: number = 0;
let falsePositiveCount: number = 0;
let falseNegativeCount: number = 0;
let truePositiveCount: number = 0;
let trueNegativeCount: number = 0;

let trial1Score: number = 0;
let trial2Score: number = 0;

export const updateScore = (
  score: number,
  compasScore: number,
  detain: boolean,
  is_recid: boolean,
  timeoutSkip: boolean = false
): void => {
  console.log(score, compasScore, detain, is_recid, timeoutSkip);
  count++;
  if (!timeoutSkip) {
    if (is_recid) {
      if (detain) {
        truePositiveCount++;
      } else {
        falseNegativeCount++;
      }
    } else {
      if (detain) {
        falsePositiveCount++;
      } else {
        trueNegativeCount++;
      }
    }
  }

  if (!timeoutSkip) {
    if (is_recid) {
      totalScore += score;
    } else {
      totalScore += (11 - score);
    }
  }
  
  if (is_recid) {
    totalCompasScore += compasScore;
  } else {
    totalCompasScore += (11 - compasScore);
  }
  

  console.log(
    count,
    totalScore,
    totalCompasScore,
    falsePositiveCount,
    falseNegativeCount,
    score,
    trial1Score,
    trial2Score,
    compasScore,
    detain,
    is_recid
  );
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
