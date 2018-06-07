const throwE = msg => {
  throw new Error(msg)
}
const isTuple = ([a, b]) => ([a2, b2]) => a2 === a && b2 === b

const isNotTuple = tuple => tupleToCheck => !isTuple(tuple)(tupleToCheck)

const withoutTuple = (tuple, arr) => arr.filter(isNotTuple(tuple))

const spreadEach = (a, f) => a.forEach(d => f(...d))

module.exports = {
  throwE,
  isTuple,
  isNotTuple,
  withoutTuple,
  spreadEach
}
