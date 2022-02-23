const shuffle = array => {
  const length = array.length;
  let temp;
  let index;
  for( let i = 0; i < length - 1; i++ ) {
    index = Math.floor( Math.random() * (length - i - 1) + i + 1);
    temp = array[index];
    array[index] = array[i];
    array[i] = temp;
  }
}

module.exports = shuffle;
