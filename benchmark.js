const shuffle = require('./exec.js');
const mergeSort = require('./merge-sort.js');

for( let i = 1; i < 9; i++ ){
  let length = 10 ** i
  let array = new Array( length );

  for( let i = 0; i < array.length; i++ ){
    array[i] = i;
  }
  let str2 = `shuffling ${length}`
  console.time(str2);
  shuffle(array);
  console.timeEnd(str2);

  let str = `sorting ${length}`;
  console.time(str);
  mergeSort(array);
  console.timeEnd(str);
  console.log('---');
}
