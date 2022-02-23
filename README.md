
To sort one array, change `ARRAY_SIZE` in `exec.js`

To run one sort, `node exec.js`

To benchmark, `node benchmark.js` — it will crash after 18,000,000 or so.
Set `VERBOSE` to false before benchmarking. Feel free to change parameters like `length`

The shuffle function has been improved and implements a Fisher-Yates shuffle, which is O(n). I have left the original shuffle in as a monument to ... something. Growth? Naivete? 

Set `VERBOSE` flag in `merge-sort.js`

TODO: maybe I should figure out how to pass flags at runtime.

hit me up with questions, commments, or suggestions.

ps: putting output in the repo is generally bad practice, but this is for fun.
You can make your own output file by running
`node exec.js > FILENAME`
it will make a new file if FILENAME does not exist, otherwise overwrite.


## TODO:
I should pass the verbose flag to the function itself. Then I can run verbose in exec and not verbose in benchmark!
