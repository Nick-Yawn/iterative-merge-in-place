const DEBUG = false;

const mergeSort = (arr, verbose = false) => {

  let queue = new Array(arr.length * 2);    
  let queueIndex = 0; // using shift is expensive, so we're gonna fake the queue (again).
  
  // the strange thing is, this queue setup crashes at 5592406 iterations,
  // no matter if doing it forward or backward.
  // This is some kind of optimization bug in Chromium.
  let i = arr.length - 1;
  let j = 0;
  try{
    while( i >= 0 ){
      queue[2*i] = i;
      queue[2*i + 1] = i;
      i--;
      j++;
    }
  } catch (e) {
    console.log( i, j, e);
  }

  // does this setup look familiar? we're traversing and collapsing a tree of index-pairs.
  //  Maybe there is a better way.
  while( true ){
    if (DEBUG) console.log( "queue:" + queue.slice(queueIndex).join(',') );
    if (DEBUG) console.log( arr.join(' ') );

    // these two values represent the start and end indices of our first subarray. always already sorted
    let firstUnqueuedIndex = queue[queueIndex++];
    let secondUnqueuedIndex = queue[queueIndex++]; // x++ increments AFTER the return.

    if( firstUnqueuedIndex === 0 && secondUnqueuedIndex === arr.length - 1 ) break; // if the subarray is the whole array, done! 
 
    // ditto 37 but for the next subarray.
    let nextFirstUnqueuedIndex = queue[queueIndex++]; 
    let nextSecondUnqueuedIndex = queue[queueIndex++]; 
 
    //sort! 
    if( secondUnqueuedIndex + 1 !== nextFirstUnqueuedIndex ){ //if not adjacent, requeue first subarray
      queue.push(firstUnqueuedIndex, secondUnqueuedIndex);
      queueIndex -= 2;
      //back up! try again. swap order
      //console.log( "queue:" + queue.slice(queueIndex).join(',') );
      //console.log("restacking");
    } else { // sort, push new subarray indices
      
      // now for in-place sorting between subarrays
      let sortingIndex = 0;
      let nextSortingIndex = 0;

      // I don't like this but don't know how else to do this part
      // it's possible to override all the first subarrays values
      // so how else can I keep track of them?
      // oh well, it's O(n)  
      // could do this with a for loop in order to use fixed subarrays in memory.
      let sub = arr.slice(firstUnqueuedIndex, secondUnqueuedIndex + 1);
      let nextSub = arr.slice(nextFirstUnqueuedIndex, nextSecondUnqueuedIndex + 1);

      if (DEBUG) console.log("sub:\t", sub, "\n", "nextSub:", nextSub);     
      if (verbose) printArr(arr, firstUnqueuedIndex, secondUnqueuedIndex, nextFirstUnqueuedIndex, nextSecondUnqueuedIndex);

      let insertionIndex = firstUnqueuedIndex;

      let subHasEls = true;
      let nextSubHasEls = true;

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
      if (verbose) printArr(arr, firstUnqueuedIndex, secondUnqueuedIndex, nextFirstUnqueuedIndex, nextSecondUnqueuedIndex, true);

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
