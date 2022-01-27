
To sort one array, change `ARRAY_SIZE` in `exec.js`

To run one sort, `node exec.js`

To benchmark, `node benchmark.js` — it will crash after 18,000,000 or so.
Set `VERBOSE` to false before benchmarking. Feel free to change parameters like `length`

Also, the shuffle in exec is like shuffling a deck of cards. Not super close to truly random.
This is not nearly as optimized as it could be, so the benchmark is not very useful.
However, it does demonstrate that this is pretty quick. It seems to crash out at the limit because of the initial queue creation.

Set `VERBOSE` flag in `merge-sort.js`


hit me up with questions, commments, or suggestions.

ps: putting output in the repo is generally bad practice, but this is for fun.
You can make your own output file by running
`node exec.js > FILENAME`
it will make a new file if FILENAME does not exist, or overwrite it.
