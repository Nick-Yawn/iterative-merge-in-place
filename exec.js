const mergeSort = require('./merge-sort');

const ARRAY_LENGTH = 15;
const MIN_CARDS = 0; // per shuffle step
const MAX_CARDS = 3; // per shuffle step

const isSorted = array => {
  for( let i = 0; i < array.length - 1; i++ ){
    if( array[i] + 1 !== array[i+1] ) return false;
  }
  return true;
}

// writing a good shuffle algorithm is OUTSIDE THE SCOPE OF THIS PROJECT. lol
const shuffle = array => { // it's not random, but it's good enough
  let halfIndex = Math.floor( array.length / 2 );
  for( let i = 0; i < 4; i++ ){
    //console.log(`shuffling ${i}`);
    let firstHalf = array.slice( 0, halfIndex );
    let secondHalf = array.slice( halfIndex );
    
    // first and second half will be treated as queue, 
    // inserting 1-2 "cards" from each, alternating
    // however, shift is slow — O(n) — so we fake the queue.
    let firstIndex = 0;
    let secondIndex = 0;
    let indexActual = 0;
  
    while( firstIndex < firstHalf.length || secondIndex < secondHalf.length){
      let numCards;
      let distanceToEnd;

      if( firstIndex < firstHalf.length ){
        numCards = Math.floor(Math.random() * (MAX_CARDS - MIN_CARDS + 1) + MIN_CARDS); // could put this in a helper function
        distanceToEnd = firstHalf.length - firstIndex;
        for( let i = 0; i < (numCards < distanceToEnd ? numCards : distanceToEnd ) ; i++ ){
          array[indexActual++] = firstHalf[firstIndex++]; // ++ increments AFTER returning the value. to increment before, use ++x
        }
      }

      if( secondIndex < secondHalf.length ){ // could actually put both of these halves into a helper function.... but may be more trouble than it's worth
        numCards = Math.floor(Math.random() * (MAX_CARDS - MIN_CARDS + 1) + MIN_CARDS);
        distanceToEnd = secondHalf.length - secondIndex;
        for( let i = 0; i < (numCards < distanceToEnd ? numCards : distanceToEnd ) ; i++ ){
          array[indexActual++] = secondHalf[secondIndex++];
        }
      }
    } 

    // swap first card and random other card in the middle
    let arrayLength = array.length
    let swapIndex = Math.floor(Math.random() * (arrayLength * .75 - arrayLength * .25 + 1) + arrayLength * .25);
    let temp = array[0];
    array[0] = array[swapIndex];
    array[swapIndex] = temp;      // yes, I can use destructuring, but being able to swap WITHOUT destructuring is important.
  }
}
// make array
let arr = new Array(ARRAY_LENGTH);

//fill array
for( let i = 0; i < arr.length; i++ ){
  arr[i] = i;
}

//shuffle array
shuffle(arr);

//print array
console.log( "SORT START" );
console.log( arr.join(',') );


mergeSort(arr);

console.log( arr.join(',') );

console.log( `isSorted: ${isSorted(arr)}`);

module.exports = shuffle;
