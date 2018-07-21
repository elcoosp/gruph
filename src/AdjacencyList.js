//@ts-check
const delegate = p => (...args) => Object.assign(Object.create(p), ...args)
const pushOnBoth = (...xxs) => x => xxs.forEach(xs => xs.push(x))

const AdjacencyList = {
  getAllNodes() {
    return this.graph.keys()
  },

  countNodes() {
    return this.graph.size
  },

  addNode(node) {
    if (this.graph.get(node)) throw new Error('Node already in the graph')
    this.graph.set(node, [])
    return this
  },

  addNodesIfNone(...nodes) {
    for (const n of nodes)
      this.graph.get(n) === undefined && this.graph.set(n, [])
    return this
  },

  addEdge(from, to) {
    this.addNodesIfNone(from, to)
    this.graph.get(from).push(to)
    this.graph.get(to).push(from)
    return this
  },

  BFSGen: function*(start) {
    const visited = []
    const queue = [start]

    while (queue.length)
      for (const n of this.graph.get(queue.shift()))
        !visited.includes(n) && (pushOnBoth(visited, queue)(n), yield n)
  },

  BFSToArr(start) {
    return this.BFSMap(start)
  },

  BFSEach(start, func) {
    for (const n of this.BFSGen(start)) func(n)
    return this
  },

  BFSMap(start, func = x => x) {
    const mappedNodes = []
    for (const n of this.BFSGen(start)) mappedNodes.push(func(n))
    return mappedNodes
  }
}
const AdjacencyListFactory = delegate(AdjacencyList)
export default AdjacencyListFactory
