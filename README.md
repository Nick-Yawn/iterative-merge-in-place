Executing non-compiled Typescript files requires `ts-node`

You can install ts-node globally with
```
npm i -g ts-node
```

or use `npx`:
```
npx ts-node exec.ts
```


To run one sort, `ts-node exec.ts`

To set the size of array to be sorted, change `ARRAY_SIZE` in `exec.ts`

To benchmark, `node benchmark.ts` — it will crash after 18,000,000 or so. Alternatively, press `<Ctrl-c>` to stop the process.
It runs on powers of 10 — try other loops!


`exec.ts` runs in `verbose` mode, while `benchmark.ts` does not. Try them both!


The shuffle function implements a Fisher-Yates shuffle, which is O(n).


ps: putting output in the repo is generally bad practice, but this is for fun, and for easy reference.
You can make your own output file by running
`ts-node exec.ts > FILENAME`

it will make a new file if FILENAME does not exist, otherwise will overwrite.

