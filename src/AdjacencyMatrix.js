const Node = data => ({
  type: 'node',
  data
})

const range = (length, data) => Array.from({ length }, _ => data)
const AdjacencyMatrix = () => {
  const _edges = []
  const _nodes = []
  const addNode = data => (
    (n = Node(data)), _nodes.push(n), addNewNodeInMatrix(), n
  )
  const nodeIdx = n => _nodes.indexOf(n)
  const addNewNodeInMatrix = () => (
    _edges.length === 0
      ? _edges.push([0])
      : (_edges.forEach(e => e.push(0)),
        _edges.push(range(_edges.length + 1, 0))),
    self
  )
  const isEdgeBtw = (src, dest) =>
    _edges[nodeIdx(src)][nodeIdx(dest)] ? true : false
  const addEdge = (src, dest) => (
    (_edges[nodeIdx(src)][nodeIdx(dest)] = 1), self
  )

  const self = {
    addNode,
    addEdge,
    isEdgeBtw,
    get edges() {
      return _edges
    }
  }

  return self
}
