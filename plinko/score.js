const outputs = [];

const onScoreUpdate = (dropPosition, bounciness, size, bucketLabel) => {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
};

const runAnalysis = () => {
  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  _.range(1, 20).forEach((k) => {
    const accuracy = _.chain(testSet)
      .filter((testPoint) => {
        return knn(trainingSet, _.initial(testPoint), k) === testPoint[3];
      })
      .size()
      .divide(testSetSize)
      .value();

    console.log("For K = ", k, ": ", accuracy);
  });
};

const knn = (data, point, k) => {
  // point has label already removed

  return _.chain(data)
    .map((row) => {
      return [
        distance(_.initial(row), point)
        _.last(row)
      ]
    })
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
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
};

const splitDataset = (data, testCount) => {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
};
