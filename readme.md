## Circularr
Circular fixed size array

### Install
`npm i circularr`

### Usage
```js
import Circularr from 'circularr'

// Create from
const arrFrom = Circularr.from([1, 2, 3, 4, 5])

// Create new with fixed size
const arr = new Circular(3) // [undefined, undefined, undefined]

// fill using value
arr.fill(0)   // [0, 0, 0]

// shift in some values
arr.shift(16) // [0, 0, 16]
arr.shift(32) // [0, 16, 32]

// check contents
console.log(...arr) // undefined, 16, 32 
```

### Api
```ts
class Circularr<T> {

  // create Circularr
  constructor(length: number)
  static from<T>(source: T[]): Circularr<T>
  
  // property
  readonly length: number
  
  // iterable
  [Symbol.iterator](): IterableIterator<T>
  
  // methods
  fill(value: T): this
  shift(value: T): T
  unshift(value: T): T
}
```

#### Fill
`fill(value: T): this`

Fills the array using value, effectively resetting it. Returns `this`. 
```js
const circularr = new Circularr(3) // [undefined, undefined, undefined]

circularr.fill(0) // [0, 0, 0]
```

#### Shift
`shift(value: T): T`

`shift` method pushes the value to the end of the array, wherein the first value gets popped out and returned.
```js
const circularr = new Circularr(3).fill(0)

circularr.shift(8)   // [0, 0, 8] => 0
circularr.shift(16)  // [0, 8, 16] => 0
circularr.shift(32)  // [8, 16, 32] => 0
circularr.shift(64)  // [16, 32, 64] => 8
circularr.length     // 3
```
#### Unshift
`unshift(value: T): T`

`unshift` does the opposite. It pushes the value to the front, popping the last value out.
```js
const circularr = new Circularr(3).fill(0)

circularr.unshift(8)   // [8, 0, 0] => 0
circularr.unshift(16)  // [16, 8, 0] => 0
circularr.unshift(32)  // [32, 16, 8] => 0
circularr.unshift(64)  // [64, 32, 16] => 8
circularr.length       // 3
```

#### Iterable
`Circular` implements `iterable` protocol, so it can be used with any standard iterable syntax
```js
const circularr = Circularr.from([1, 2, 3])

// array destructuring
const [firstValue] = circularr

// destructuring copy
const copyToArray = [...circularr]

// for..of syntax
for (let value of circularr) {
  console.log(value)
}
```
