const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  if (array.length === 0) {
    return 0;
  }
  const getSum = (sum, item) => {
    return sum + item;
  };
  return array.reduce(getSum, 0) / array.length;
};

module.exports = { reverse, average };
