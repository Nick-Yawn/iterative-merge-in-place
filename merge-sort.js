const DEBUG = false;
const VERBOSE = true;

const mergeSort = arr => {
  // are you ready for an adventure?

  let queue = new Array(arr.length * 2);    
  let queueIndex = 0; // using shift is expensive, so we're gonna fake the queue (again).
  
  let firstUnqueuedIndex;       // declaring loop variables up here saves program from
  let secondUnqueuedIndex;      //    doing extra memory management. not sure if it makes a difference
                                // JS is not the language to care about such low-level optimizing
  let nextFirstUnqueuedIndex;   // ...probably
  let nextSecondUnqueueIndex;   
  let sortingIndex;
  let nextSortingIndex;
  let insertionIndex;
  let sub = new Array(arr.length);
  let nextSub = new Array(arr.length);
  let subHasEls;
  let nextSubHasEls;

  for( let i = 0; i < arr.length; i++ ){
    queue[2*i] = i;
    queue[2*i + 1] = i;
  }
  // these subarrays are 'sorted'

  // does this setup look familiar? we're traversing and collapsing a tree of index-pairs.
  //  Maybe there is a better way.
  while( true ){
    if (DEBUG) console.log( "queue:" + queue.slice(queueIndex).join(',') );
    if (DEBUG) console.log( arr.join(' ') );

    // these two values represent the start and end indices of our first subarray. always already sorted
    firstUnqueuedIndex = queue[queueIndex++];
    secondUnqueuedIndex = queue[queueIndex++]; // x++ increments AFTER the return.

    if( firstUnqueuedIndex === 0 && secondUnqueuedIndex === arr.length - 1 ) break; // if the subarray is the whole array, done! 
 
    // ditto 37 but for the next subarray.
    nextFirstUnqueuedIndex = queue[queueIndex++]; 
    nextSecondUnqueuedIndex = queue[queueIndex++]; 
 
    //sort! 
    if( secondUnqueuedIndex + 1 !== nextFirstUnqueuedIndex ){ //if not adjacent, requeue first subarray
      queue.push(firstUnqueuedIndex, secondUnqueuedIndex);
      queueIndex -= 2;
      //back up! try again. swap order
      //console.log( "queue:" + queue.slice(queueIndex).join(',') );
      //console.log("restacking");
    } else { // sort, push new subarray indices
      
      // now for in-place sorting between subarrays
      sortingIndex = 0;
      nextSortingIndex = 0;

      // I don't like this but don't know how else to do this part
      // it's possible to override all the first subarrays values
      // so how else can I keep track of them?
      // oh well, it's O(n)  
      // could do this with a for loop in order to use fixed subarrays in memory.
      // UPDATE: I did the optimizing. Runtime for 10,000,000 went from 3966ms > 2723ms. Wow!
      sub = arr.slice(firstUnqueuedIndex, secondUnqueuedIndex + 1);
    /*  for( let i = 0; i < secondUnqueuedIndex - firstUnqueuedIndex + 1; i++ ){
        sub[i] = arr[firstUnqueuedIndex + i];
      }*/ 
      nextSub = arr.slice(nextFirstUnqueuedIndex, nextSecondUnqueuedIndex + 1);
     /* for( let i = 0; i < nextSecondUnqueuedIndex - nextFirstUnqueuedIndex + 1; i++ ){
        nextSub[i] = arr[nextFirstUnqueuedIndex + 1];
      }*/

      if (DEBUG) console.log("sub:\t", sub, "\n", "nextSub:", nextSub);     
      if (VERBOSE) printArr(arr, firstUnqueuedIndex, secondUnqueuedIndex, nextFirstUnqueuedIndex, nextSecondUnqueuedIndex);

      insertionIndex = firstUnqueuedIndex;

      subHasEls = true;
      nextSubHasEls = true;

      while( subHasEls || nextSubHasEls ){
        if( !subHasEls ){ // only nextSubHasEls
           arr[insertionIndex++] = nextSub[nextSortingIndex++];
        } else if( !nextSubHasEls ) { //vice versa
          arr[insertionIndex++] = sub[sortingIndex++];
        } else {
          if( sub[sortingIndex] < nextSub[nextSortingIndex] ){
            arr[insertionIndex++] = sub[sortingIndex++];
          } else {
            arr[insertionIndex++] = nextSub[nextSortingIndex++];
          }
        } 
        
        subHasEls =  firstUnqueuedIndex + sortingIndex <= secondUnqueuedIndex;
        nextSubHasEls = nextFirstUnqueuedIndex + nextSortingIndex <= nextSecondUnqueuedIndex; 
      } 
      if (VERBOSE) printArr(arr, firstUnqueuedIndex, secondUnqueuedIndex, nextFirstUnqueuedIndex, nextSecondUnqueuedIndex, true);

      queue.push(firstUnqueuedIndex, nextSecondUnqueuedIndex);
    }

  }
}

const printArr = (arr, firstIndex, secondIndex, nextFirstIndex, nextSecondIndex, sorted = false) => {
  let value, string, base;
  console.log(
    ( arr.slice(0, firstIndex).length ? 
    arr.slice(0, firstIndex).map( n => {
      string = ' ';
      base = 10;
      while( n >= base ){
        string += ' ';
        base *= 10;
      }
      return string;
    }).join(' ') + ' ' : '' )
    + arr.slice(firstIndex, secondIndex + 1).join(' ') 
    + (sorted ? ' ' : '|') + arr.slice(nextFirstIndex, nextSecondIndex + 1).join(' '));
}

module.exports = mergeSort;
