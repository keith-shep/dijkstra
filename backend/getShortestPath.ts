// This script is an implementation of Dijkstra's Algorithm.
//
// There are 3 main functions:
//
// 1 parseInput takes in a string ie "AB2, CD3, EF7" and turns them into nodes and edges
// 2 buildAdjacencyList takes in the nodes and edges and builds an adjacency list to operate the algo on
// 3 getShortestPath runs Dijkstra's algo and returns the shortest path as well as it's distance
type node = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type edge = [node, node, number]
type adjacencyList = Partial<{ [key in node]: pathDetails[] }>
type pathDetails = Partial<Record<node, number>>


const parseInput = (input: string) => {
  const nodes: node[] = []
  const edges: edge[] = []
  // Parse string input into edges and nodes
  const elements = input.split(', ')
  elements.forEach(element => {
    // Extract locations and cost
    const fromLocation: node = element[0] as node
    const toLocation: node = element[1] as node
    const cost = parseInt(element.substr(2))

    // Create edge and push into edges array
    const edge: edge = [fromLocation, toLocation, cost]
    edges.push(edge)

    // Create and push node into nodes array if unique
    if (!nodes.includes(fromLocation)) {
      nodes.push(fromLocation)
    } else if (!nodes.includes(toLocation)) {
      nodes.push(toLocation)
    }
  })
  return [nodes, edges]
}

// -------------------------------------------//

const buildAdjacencyList = (nodes: node[], edges: edge[]) => {
  const adjacencyList: adjacencyList = {}

  // Add nodes to adjacency list
  nodes.forEach((node: node) => {
    adjacencyList[node] = []
  })

  // Add edges to adjacency list
  edges.forEach((edge: edge) => {
    const origin: node = edge[0]
    const destination: node = edge[1]
    const cost: number = edge[2]

    const pathDetails: pathDetails = {}
    pathDetails[destination] = cost
    adjacencyList[origin]?.push(pathDetails)
  })

  return adjacencyList
}

// //-------------------------------------------//
const getShortestPath = (adjacencyList: adjacencyList, queryFrom: node, queryTo: node, nodes: node[]) => {
  const queue = [...nodes]
  const shortestPathList = {}

  // init queue
  queue.forEach((node: node) => {
    const nodeDetails = { cost: Infinity, previousNode: 'None' }
    shortestPathList[node] = nodeDetails
  })

  shortestPathList[queryFrom].cost = 0

  // Processes one iteration of short paths, and returns the next reccomended node to process
  const relaxNode = (startNode: node) => {
    // Checking if empty queue, ie condition to stop recursion
    if (queue.length === 0) {
      return
    }

    const startDistance = shortestPathList[startNode].cost

    // Start with the cost of direct neighbors first
    adjacencyList[startNode].forEach(neighbor => {
      const key = Object.keys(neighbor)[0]
      const value = Object.values(neighbor)[0]

      // Update shortest path list if there is a smaller cost
      if (shortestPathList[key].cost > value + startDistance) {
        shortestPathList[key].cost = value + startDistance
        shortestPathList[key].previousNode = startNode
      }
    })

    // Remove node from queue / mark as resolved
    const index = queue.indexOf(startNode)
    queue.splice(index, 1)

    // Return next most promising key (least cost that's not visited yet)
    // Temp array to find intersection between queue and shortestPathList
    const arr = []
    queue.forEach(key => {
      if (key in shortestPathList) {
        arr.push(shortestPathList[key].cost)
      }
    })
    const minCost = Math.min(...arr)

    let promisingKey

    for (const path in shortestPathList) {
      if (shortestPathList[path].cost === minCost && path !== startNode) {
        promisingKey = path
      }
    }

    // Recursive function
    relaxNode(promisingKey)
  }
  // Kick off first recursive call
  relaxNode(queryFrom)

  // Build shortest path
  const pathArr = []
  let current = queryTo

  while (current !== queryFrom) {
    pathArr.push(current)
    current = shortestPathList[current].previousNode
  }
  pathArr.push(current)

  // Return results

  const path = pathArr.reverse().join('')
  const distance = shortestPathList[queryTo].cost

  return [distance, path]
}

module.exports = { parseInput, buildAdjacencyList, getShortestPath }
