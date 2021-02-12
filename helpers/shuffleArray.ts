const randomPosition = (array: Array<any>): number => {
  return Math.floor(Math.random() * array.length);
};

export const shuffleArray = (source: Array<any>): Array<any> => {
  let result = [];
  const sourcePositions = [...Array(source.length)].map((_, i) => i);

  while (sourcePositions.length > 0) {
    const positionToPull = randomPosition(sourcePositions);
    result.push(source[sourcePositions[positionToPull]]);
    sourcePositions.splice(positionToPull, 1);
  }

  return result;
};
