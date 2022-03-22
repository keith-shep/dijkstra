const { describe, expect, test } = require('@jest/globals')

const modules = require('./getShortestPath')

const { parseInput, buildAdjacencyList, getShortestPath } = modules

describe('parse input', () => {
  test('parse input - nodes', () => {
    const results = parseInput('AB5, BC3, CE6, ED2, DA8')
    const nodes = results[0]
    // const edges = results[1]

    expect(nodes).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E']))
  })

  test('parse input - edges', () => {
    const results = parseInput('AB5, BC3, CE6, ED2, DA8')
    // const nodes = results[0]
    const edges = results[1]

    expect(edges).toEqual(
      expect.arrayContaining([
        ['A', 'B', 5],
        ['B', 'C', 3],
        ['C', 'E', 6],
        ['E', 'D', 2],
        ['D', 'A', 8]
      ])
    )
  })
})

describe('build adjacency list', () => {
  test('build adjacency list', () => {
    const nodes = ['A', 'B', 'C', 'D', 'E']
    const edges = [
      ['A', 'B', 5],
      ['B', 'C', 3],
      ['C', 'E', 6],
      ['E', 'D', 2],
      ['D', 'A', 8]
    ]

    const results = buildAdjacencyList(nodes, edges)

    expect(results.A).toEqual([{ B: 5 }])
    expect(results.B).toEqual([{ C: 3 }])
    expect(results.C).toEqual([{ E: 6 }])
    expect(results.D).toEqual([{ A: 8 }])
    expect(results.E).toEqual([{ D: 2 }])
  })
})

describe('get shortest path', () => {
  test('get shortest path', () => {
    const adjacencyList = {
      A: [{ B: 5 }],
      B: [{ C: 3 }],
      C: [{ E: 6 }],
      D: [{ A: 8 }],
      E: [{ D: 2 }]
    }

    const nodes = ['A', 'B', 'C', 'D', 'E']

    expect(getShortestPath(adjacencyList, 'A', 'B', nodes)).toEqual([5, 'AB'])
    expect(getShortestPath(adjacencyList, 'A', 'C', nodes)).toEqual([8, 'ABC'])
    expect(getShortestPath(adjacencyList, 'A', 'D', nodes)).toEqual([
      16,
      'ABCED'
    ])
    expect(getShortestPath(adjacencyList, 'A', 'E', nodes)).toEqual([
      14,
      'ABCE'
    ])
    expect(getShortestPath(adjacencyList, 'A', 'A', nodes)).toEqual([0, 'A'])
  })
})
