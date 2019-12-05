// 类型整合
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]
// 判断原始类型和引用类型
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}
// 获取克隆对象的类型
function getType(target) {
  return Object.prototype.toString.call(target)
}
// 初始化要克隆的对象
function getInit(target) {
    const Ctor = target.constructor
    return new Ctor()
}
// loadsh使用的遍历迭代器
function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}
// 克隆其他不可遍历类型
function cloneOtherType(targe, type) {
  const Ctor = targe.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    default:
      return null
  }
}
// 克隆Symbol
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}
// 克隆正则
function cloneReg(targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}
function deepClone(value, map=new WeakMap()) {
  let cloneValue, type
  // 判断引用数据类型
  if (!isObject(value)) {
    return value
  }

  // 初始化
  const type = getType(value)
  if (deepTag.includes(type)) {
    cloneValue = getInit(value)
  } else {
    return cloneOtherType(value, type) 
  }
  // 防止循环引用
  if (map.get(value)) {
      return map.get(value)
  }
  map.set(value, cloneValue)

  // 克隆set
  if (type === setTag) {
    value.forEach(value => {
      cloneValue.add(deepClone(value,map))
    })
    return cloneValue
  }

  // 克隆map
  if (type === mapTag) {
    value.forEach((value, key) => {
      cloneValue.set(key, deepClone(value,map))
    })
    return cloneValue
  }

  // 克隆对象和数组
  const props = type === arrayTag ? undefined : Object.keys(value)
  arrayEach(props || value, (value, key) => {
      if (props) {
          key = value
      }
      cloneValue[key] = deepClone(value[key], map)
  })
  return cloneValue
}

export default deepClone