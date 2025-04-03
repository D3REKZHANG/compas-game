// Local variables for score, false positive rate, and false negative rate
let count: number | null = null;
let totalScore: number | null = null;
let totalCompasScore: number | null = null;
let falsePositiveCount: number | null = null;
let falseNegativeCount: number | null = null;
let truePositiveCount: number | null = null;
let trueNegativeCount: number | null = null;

// Functions to update these local variables
export const updateScore = (score: number, compasScore: number, detain: boolean, is_recid: boolean): void => {
  console.log(score,compasScore,detain, is_recid)
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
  console.log(count, totalScore, totalCompasScore, falsePositiveCount, falseNegativeCount, score,compasScore,detain, is_recid)
};

// Functions to get the current values of these variables
export const getScore = (): number | null => totalScore;
export const getCompasScore = (): number | null => totalCompasScore;
export const getFalsePositiveRate = (): number | null => falsePositiveCount;
export const getFalseNegativeRate = (): number | null => falseNegativeCount;
export const getTruePositiveRate = (): number | null => truePositiveCount;
export const getTrueNegativeRate = (): number | null => trueNegativeCount;

// Reset function to initialize scores to 0
export const resetGame = (): void => {
  count = 0;
  totalScore = 0;
  totalCompasScore = 0;
  falsePositiveCount = 0;
  falseNegativeCount = 0;
  truePositiveCount = 0;
  trueNegativeCount = 0;
};