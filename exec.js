const mergeSort = require('./merge-sort');
const shuffle = require('./shuffle');

const ARRAY_LENGTH = 15;

const isSorted = array => {
  for( let i = 0; i < array.length - 1; i++ ){
    if( array[i] + 1 !== array[i+1] ) return false;
  }
  return true;
}

// make array
let arr = new Array(ARRAY_LENGTH);

//fill array
for( let i = 0; i < arr.length; i++ ){
  arr[i] = i;
}

//shuffle array

console.time(`shuffling ${ARRAY_LENGTH}`);//
shuffle(arr);
console.timeEnd(`shuffling ${ARRAY_LENGTH}`);

//print array
console.log( "SORT START" );
console.log( arr.join(' ') );


mergeSort(arr, true); // second argument is verbosity


console.log( `isSorted: ${isSorted(arr)}`);

module.exports = shuffle;
