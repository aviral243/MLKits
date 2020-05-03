const outputs = [];

const onScoreUpdate = (dropPosition, bounciness, size, bucketLabel) => {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
};

const runAnalysis = () => {
  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  _.range(1, 15).forEach((k) => {
    const accuracy = _.chain(testSet)
      .filter((testPoint) => {
        return knn(trainingSet, testPoint[0], k) === testPoint[3];
      })
      .size()
      .divide(testSetSize)
      .value();

    console.log(accuracy);
  });
};

const knn = (data, point, k) => {
  return _.chain(data)
    .map((row) => [distance(row[0], point), row[3]])
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
};

const distance = (pointA, pointB) => {
  return Math.abs(pointA - pointB);
};

const splitDataset = (data, testCount) => {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
};
