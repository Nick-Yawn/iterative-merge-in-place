To run one sort, `node exec.js`

To set the size of array to be sorted, change `ARRAY_SIZE` in `exec.js`

To benchmark, `node benchmark.js` — it will crash after 18,000,000 or so. Alternatively, press `<Ctrl-c>` to stop the process.
It runs on powers of 10 — try other loops!


`exec.js` runs in `verbose` mode, while `benchmark.js` does not. Try them both!


The shuffle function has been improved and implements a Fisher-Yates shuffle, which is O(n). I have left the original shuffle in as a monument to ... something. Growth? Naivete? 


Send me your questions, comments, or suggestions!


ps: putting output in the repo is generally bad practice, but this is for fun, and for easy reference.
You can make your own output file by running
`node exec.js > FILENAME`
it will make a new file if FILENAME does not exist, otherwise will overwrite.

