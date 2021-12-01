// 新建三种状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise{
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor && executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 储存状态的常量，初始值是pending
  status = PENDING

  // resolve 和reject 为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例

  // 成功之后的值
  value = null

  // 失败的原因
  reason = null

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待中才可以修改状态
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value

      // 判断成功回调是否存在，如果存在就调用
      // this.onFulfilledCallback && this.onFulfilledCallback(value)
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待中才可以修改状态
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason

      // 判断失败回调是否存在，如果存在就调用
      // this.onRejectedCallback && this.onRejectedCallback(reason)
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(value)
      }
    }
  }

  // 储存成功回调函数
  onFulfilledCallback = []

  // 储存失败回调函数
  onRejectedCallback = []

  then(onFulfilled, onRejected) {
    // 如果不传，就是用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    // 为了链式i盗用这里直接创建一个MyPromise, 并在后面return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            // onFulfilled(this.val)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        // onRejected(this.reason)
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        // 因为不知道后面状态的变化情况，所以将陈工回调和失败回调储存起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallback.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallback.push(() => {
          try {
            const x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
    return promise2
  }

  // resolve 静态方法
  static resolve (paramter) {
    if (paramter instanceof MyPromise)
      return paramter

      return new MyPromise(resolve => {
        resolve(paramter)
      })
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resove, reject) => {
      reject(reason)
    })
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected form promise #<Promise>'))
  }
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return resolve(x)
    }
    let then
    try {
      then = x.then
    } catch (error) {
      return reject(error)
    }

    // 如果then是函数
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } catch (errror) {
        if (called) return
        reject(error)
      }
    } else {
      resove(x)
    }
  } else {
    resolve(x)
  }
  // if (x instanceof MyPromise) {
  //   x.then(resolve, reject)
  // } else {
  //   resolve(x)
  // }
}

module.exports = MyPromise