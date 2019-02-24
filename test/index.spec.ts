import { expect } from 'chai'
import Circularr from '../src/index'

describe('[ Circularr ]', () => {

  describe('[ constructor ]', () => {
    it('should work', () => {
      const arr = new Circularr(3)

      expect(Array.from(arr)).deep.eq([undefined, undefined, undefined])
    })
  })

  describe('[ from ]', () => {
    it('should work', () => {
      const arr = Circularr.from([1, 2, 3])

      expect(Array.from(arr)).deep.eq([1, 2, 3])
    })
  })

  describe('[ length ]', () => {
    it('should work', () => {
      const arr = Circularr.from([1, 2, 3])

      expect(arr.length).eq(3)
    })
  })

  describe('[ fill ]', () => {
    it('should work', () => {
      const arr = new Circularr<number>(3)
      arr.fill(42)

      expect(Array.from(arr)).deep.eq([42, 42, 42])
    })
  })

  describe('[ clear ]', () => {
    it('should work', () => {
      const arr = new Circularr<number>(3)

      arr.fill(42)
      arr.clear()

      expect(Array.from(arr)).deep.eq([undefined, undefined, undefined])
    })
  })

  describe('[ shift ]', () => {
    it('should work', () => {
      const arr = new Circularr(3).fill(0)
      const res0 = arr.shift(42)
      expect(Array.from(arr)).deep.eq([0, 0, 42])
      expect(res0).eq(0)

      const res1 = arr.shift(16)
      expect(Array.from(arr)).deep.eq([0, 42, 16])
      expect(res1).eq(0)

      const res2 = arr.shift(32)
      expect(Array.from(arr)).deep.eq([42, 16, 32])
      expect(res2).eq(0)

      const res3 = arr.shift(64)
      expect(Array.from(arr)).deep.eq([16, 32, 64])
      expect(res3).eq(42)
    })
  })

  describe('unshift', () => {
    it('should work', () => {
      const arr = new Circularr(3).fill(0)
      const res0 = arr.unshift(42)
      expect(Array.from(arr)).deep.eq([42, 0, 0])
      expect(res0).eq(0)

      const res1 = arr.unshift(16)
      expect(Array.from(arr)).deep.eq([16, 42, 0])
      expect(res1).eq(0)

      const res2 = arr.unshift(32)
      expect(Array.from(arr)).deep.eq([32, 16, 42])
      expect(res2).eq(0)

      const res3 = arr.unshift(64)
      expect(Array.from(arr)).deep.eq([64, 32, 16])
      expect(res3).eq(42)
    })
  })

  describe('[ slice ]', () => {
    it('should work with no values', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice()

      expect(Array.from(res)).deep.eq([1, 2, 3, 4, 5])
    })

    it('should work with positive value', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(2)

      expect(Array.from(res)).deep.eq([3, 4, 5])
    })

    it('should work with positive value overflow', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(10)

      expect(Array.from(res)).deep.eq([])
    })

    it('should work with negative values', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(-2)

      expect(Array.from(res)).deep.eq([4, 5])
    })

    it('should work with negative value overflow', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(-10)

      expect(Array.from(res)).deep.eq([1, 2, 3, 4, 5])
    })

    it('should work with range', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(1, 4)

      expect(Array.from(res)).deep.eq([2, 3, 4])
    })

    it('should work with range overflow', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(1, 10)

      expect(Array.from(res)).deep.eq([2, 3, 4, 5])
    })

    it('should work with range order mismatch', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(4, 1)

      expect(Array.from(res)).deep.eq([])
    })

    it('should work with range end negative', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(1, -2)

      expect(Array.from(res)).deep.eq([2, 3])
    })

    it('should work with range end negative overflow', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(1, -10)

      expect(Array.from(res)).deep.eq([])
    })

    it('should work with range begin negative', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(-3, 4)

      expect(Array.from(res)).deep.eq([3, 4])
    })

    it('should work with range negative', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(-3, -1)

      expect(Array.from(res)).deep.eq([3, 4])
    })

    it('should work with range negative mismatch', () => {
      const arr = Circularr.from([0, 0, 1, 2, 3])
      arr.shift(4)
      arr.shift(5)
      const res = arr.slice(-1, -3)

      expect(Array.from(res)).deep.eq([])
    })
  })

  describe('[ trim ]', () => {
    it('should work with shift', () => {
      const arr = new Circularr<number>(5)
      arr.shift(4)
      arr.shift(5)
      const res = arr.trim()

      expect(Array.from(res)).deep.eq([4, 5])
    })

    it('should work with unshift', () => {
      const arr = new Circularr<number>(5)
      arr.unshift(4)
      arr.unshift(5)
      const res = arr.trim()

      expect(Array.from(res)).deep.eq([5, 4])
    })

    it('should work with both shift and unshift', () => {
      const arr = new Circularr<number>(5)
      arr.shift(3)
      arr.shift(4)
      arr.unshift(5)
      const res = arr.trim()

      expect(Array.from(res)).deep.eq([5, undefined, undefined, undefined, 3])
    })

    it('should work with from array', () => {
      const arr = Circularr.from([1, 2, 3])
      const res = arr.trim()

      expect(Array.from(res)).deep.eq([1, 2, 3])
    })

    it('should work with filled array', () => {
      const arr = new Circularr<number>(3).fill(0)
      const res = arr.trim()

      expect(Array.from(res)).deep.eq([0, 0, 0])
    })
  })
})
