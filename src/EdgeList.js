const throwE = msg => {
  throw new Error(msg)
}

const nodesNumberError = (n, op) =>
  throwE(
    `Can not ${op}. An edge must have 2 nodes only, you provided ${n} nodes`
  )

const handleNodesNumErr = (op, f) => (...nodes) =>
  nodes.length === 2 ? f(...nodes) : nodesNumberError(nodes.length, op)

const isTuple = ([a, b]) => ([a2, b2]) => a2 === a && b2 === b

const isNotTuple = tuple => tupleToCheck => !isTuple(tuple)(tupleToCheck)

const withoutTuple = (tuple, arr) => arr.filter(isNotTuple(tuple))

const EdgeList = () => {
  let _edges = []

  const addEdge = handleNodesNumErr(
    'add edge',
    (...nodes) => (_edges.push(nodes), newEdgeList)
  )

  const removeEdge = handleNodesNumErr(
    'remove edge',
    (...nodes) => ((_edges = withoutTuple(nodes, _edges)), newEdgeList)
  )

  const hasEdge = handleNodesNumErr('check if edge have node', (...nodes) =>
    _edges.some(isTuple(nodes))
  )

  const newEdgeList = {
    addEdge,
    hasEdge,
    removeEdge
  }

  return newEdgeList
}
