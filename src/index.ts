class Circularr <T> {
  data: T[]
  index = 0

  constructor (length: number) {
    this.data = new Array<T>(length)
  }

  static from <T> (source: T[]): Circularr<T> {
    const c = new Circularr<T>(source.length)
    for (let i = 0; i < source.length; ++i) {
      c.data[i] = source[i]
    }
    return c
  }

  get length (): number {
    return this.data.length
  }

  * [Symbol.iterator] () {
    for (let i = 0; i < this.data.length; ++i) {
      yield this.data[(i + this.index) % this.data.length]
    }
  }

  fill (value: T): this {
    for (let i = 0; i < this.data.length; ++i) {
      this.data[i] = value
    }
    this.index = 0
    return this
  }

  clear (): this {
    this.data = new Array<T>(this.data.length)
    this.index = 0
    return this
  }

  shift (value: T): T {
    const returnValue = this.data[this.index]
    this.data[this.index] = value
    this.index = (this.index + 1) % this.data.length
    return returnValue
  }

  unshift (value: T): T {
    this.index = (this.index + this.data.length - 1) % this.data.length
    const returnValue = this.data[this.index]
    this.data[this.index] = value
    return returnValue
  }
}

export default Circularr
