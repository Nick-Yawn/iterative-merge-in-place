import mergeSort from './merge-sort';
import shuffle from './shuffle';

for( let i = 1; i < 9; i++ ){
  let length = 10 ** i
  let array = new Array( length );

  for( let i = 0; i < array.length; i++ ){
    array[i] = i;
  }
  let str2 = `shuffling ${stringFormat(length)}`
  //console.time(str2);
  shuffle(array);
  //console.timeEnd(str2);

  let str = `sorting ${stringFormat(length)}`;
  console.time(str);
  mergeSort(array);
  console.timeEnd(str);
  console.log('---');
}

//assumes int
function stringFormat(int: number): string {
  let chars = int.toString().split('');
  let newChars = [];
  let counter = 0;
  for( let i = chars.length - 1; i >= 0; i-- ){
    if( counter !== 0 && counter % 3 === 0 ) newChars.unshift(',');
    newChars.unshift(chars[i]);
    counter++;
  }
  return newChars.join('');
}
