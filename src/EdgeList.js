const { isTuple, withoutTuple, spreadEach, throwE } = require('./utils')

const nodesNumberError = (n, op) =>
  throwE(
    `Can not ${op}. An edge must have 2 nodes only, you provided ${n} nodes`
  )

const handleNodesNumErr = (op, f) => (...nodes) =>
  nodes.length === 2 ? f(...nodes) : nodesNumberError(nodes.length, op)

const EdgeList = () => {
  let _edges = []

  const addEdge = handleNodesNumErr(
    'add edge',
    (...nodes) => (
      hasEdge(...nodes)
        ? throwE('Can not add edge already existing')
        : _edges.push(nodes),
      newEdgeList
    )
  )

  const removeEdge = handleNodesNumErr(
    'remove edge',
    (...nodes) => (
      !hasEdge(...nodes)
        ? throwE('Can not remove edge which does not exist')
        : (_edges = withoutTuple(nodes, _edges)),
      newEdgeList
    )
  )

  const hasEdge = handleNodesNumErr('check if edge have node', (...nodes) =>
    _edges.some(isTuple(nodes))
  )

  const addManyEdges = (...edges) => (spreadEach(edges, addEdge), newEdgeList)

  const removeManyEdges = (...edges) => (
    spreadEach(edges, removeEdge), newEdgeList
  )

  const getAll = () => _edges

  const newEdgeList = {
    addEdge,
    addManyEdges,
    hasEdge,
    removeEdge,
    removeManyEdges,
    getAll
  }

  return newEdgeList
}

module.exports = EdgeList
