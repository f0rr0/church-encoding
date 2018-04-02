<h3 align="center">
  <img align="center" src="assets/church.png" alt="Church logo" width=200
  />
</h3>
<p align="center">
Church encodings for JavaScript primitives
</p>
<p align="center">
  <a href="https://travis-ci.org/f0rr0/church-encoding">
    <img
      src="https://img.shields.io/travis/f0rr0/church-encoding.svg?style=flat"
      alt="travis"
      height="20"
    >
  </a>
  <a href="https://codecov.io/gh/f0rr0/church-encoding">
    <img
      src="https://img.shields.io/codecov/c/github/f0rr0/church-encoding.svg?style=flat"
      alt="codecov"
      height="20"
    >
  </a>
  <a href="https://www.npmjs.com/package/@f0rr0/church-encoding">
    <img
      src="https://img.shields.io/npm/v/@f0rr0/church-encoding.svg?style=flat"
      alt="npm version"
      height="20"
    >
  </a>
  <a href="https://david-dm.org/f0rr0/church-encoding">
    <img
      src="https://david-dm.org/f0rr0/church-encoding/status.svg?style=flat"
      alt="dependencies"
      height="20"
    >
  </a>
  <a href="https://david-dm.org/f0rr0/church-encoding?type=dev">
    <img
      src="https://david-dm.org/f0rr0/church-encoding/dev-status.svg?style=flat"
      alt="dev dependencies"
      height="20"
    >
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img
      src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat"
      alt="semantic-release"
      height="20"
    >
  </a>
  <a href="https://github.com/prettier/prettier">
    <img
      src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"
      alt="code style: prettier"
      height="20"
    >
  </a>
  <a href="https://greenkeeper.io/">
    <img
      src="https://badges.greenkeeper.io/f0rr0/church-encoding.svg?style=flat"
      alt="Greenkeeper badge"
    >
  </a>
  <a href="https://twitter.com/f0rr0">
    <img
      src="https://img.shields.io/twitter/url/https/twitter.com/f0rr0.svg?style=social&label=Follow%20%40f0rr0"
      alt="Twitter URL"
    >
  </a>
</p>

# church-encoding

This is a thought exercise in functional programming to represent most of the javascript primitives using only lambdas (anonymous functions). It's not intended to be used for anything else besides that.

## Motivation

I was informally introduced to this idea by watching [this talk](https://www.youtube.com/watch?v=XrNdvWqxBvA) by [John Hughes](http://www.cse.chalmers.se/~rjmh/) which is based on [his paper](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf). [This talk](https://www.youtube.com/watch?v=IOiZatlZtGU) by [Philip Walder](http://www.philip-walder.com/) brilliantly explains this in a more historical context. The [SICP book](https://mitpress.mit.edu/sicp/full-text/book/book.html) also introduced me to using lambdas and recursive constructs to define operations on lists. There are many more comprehensive implementations in typed functional languages but I wanted to see how far I could go without a formal type system and combinators. Ultimately, on a more philosophical note, this exercise sufficiently proves that:

> Mathematics is not invented. It is discovered.

## Install

```
npm install @f0rr0/church-encoding@latest
```
or if you're using `yarn`
```
yarn add @f0rr0/church-encoding@latest
```

## Usage
There are 3 different builds in `commonjs`, `umd` and `esmodule` format, should you choose to have a preference or environment constraints. Normally, modern tools will automatically pick the `esmodule` build which enables tree-shaking.
```js
  import {
    cons,
    emptyList,
    zero,
    inc,
    map,
    mul,
    decodeInteger,
    decodeList
  } from '@f0rr0/church-encoding';

  const one = inc(zero);
  const two = inc(one);
  const list = cons(zero, cons(one, cons(two, emptyList)));
  
  const listOfNative = map(decodeInteger, list);
  console.log(decodeList(listOfNative)); // [0, 1, 2]
  
  const doubleList = map(i => mul(two, i), list);
  
  const doubleListOfNative = map(decodeInteger, doubleList);
  console.log(decodeList(doubleListOfNative)); // [0, 2, 4]
```
## API

The API is organized into five parts which progressively build on each other. However, since everything is a function, they are not namespaced into separate exports. The function names pretty much sum up what they do.

1.  [Boolean](#boolean)
2.  [List](#list)
3.  [Natural Number](#natural-number)
4.  [Integer](#integer)
5.  [Decode](#decode)

### Boolean

* T
* F
* IF
* AND
* OR
* NOT

### List

* emptyList
* cons
* head
* tail
* isEmpty
* map
* filter
* nth
* length

### Natural Number

* zeroNat
* isZeroNat
* incNat
* decNat
* addNat
* subNat
* isEqualNat
* mulNat
* expNat
* isLessThanNat
* isLessThanEqualNat
* isGreaterThanNat
* isGreaterThanEqualNat
* divNat
* modNat

### Integer

* pair
* first
* second
* zero
* isZero
* inc
* dec
* normalize
* abs
* negate
* add
* sub
* isEqual
* mul
* exp
* isNegative
* isLessThan
* isLessThanEqual
* isGreaterThan
* isGreaterThanEqual

### Decode

* decodeBool
* decodeList
* decodeNat
* decodeInteger

### Limitations

I still have to work on implementing rational numbers so that integer division can work. There are no `throw` or `Error` statements in the codebase since I strived to only use lambdas. Therefore, you need to be careful to not do mathematically impossible stuff e.g. divide a natural number by `zeroNat`, or else you'd be presented with a cryptic error.
