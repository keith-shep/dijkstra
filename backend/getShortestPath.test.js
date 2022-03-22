const { describe, expect, test } = require('@jest/globals')
const modules = require('./getShortestPath')
const { parseInput, buildAdjacencyList, getShortestPath } = modules

describe('test case 1: AB5, BC3, CE6, ED2, DA8', () => {
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
})

describe('test case 2: AB2, AC3, BA2, BC15, BD2, CA3, CB15, CE13, DB2, DE9, EC13, ED9', () => {
  describe('parse input', () => {
    test('parse input - nodes', () => {
      const results = parseInput('AB2, AC3, BA2, BC15, BD2, CA3, CB15, CE13, DB2, DE9, EC13, ED9')
      const nodes = results[0]
      // const edges = results[1]

      expect(nodes).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E']))
    })

    test('parse input - edges', () => {
      const results = parseInput('AB2, AC3, BA2, BC15, BD2, CA3, CB15, CE13, DB2, DE9, EC13, ED9')
      // const nodes = results[0]
      const edges = results[1]

      expect(edges).toEqual(
        expect.arrayContaining([
          ['A', 'B', 2],
          ['A', 'C', 3],
          ['B', 'A', 2],
          ['B', 'C', 15],
          ['B', 'D', 2],
          ['C', 'A', 3],
          ['C', 'B', 15],
          ['C', 'E', 13],
          ['D', 'B', 2],
          ['D', 'E', 9],
          ['E', 'C', 13],
          ['E', 'D', 9]
        ])
      )
    })
  })

  describe('build adjacency list', () => {
    test('build adjacency list', () => {
      const nodes = ['A', 'B', 'C', 'D', 'E']
      const edges = [
        ['A', 'B', 2],
        ['A', 'C', 3],
        ['B', 'A', 2],
        ['B', 'C', 15],
        ['B', 'D', 2],
        ['C', 'A', 3],
        ['C', 'B', 15],
        ['C', 'E', 13],
        ['D', 'B', 2],
        ['D', 'E', 9],
        ['E', 'C', 13],
        ['E', 'D', 9]
      ]

      const results = buildAdjacencyList(nodes, edges)

      expect(results.A).toEqual([{ B: 2 }, { C: 3 }])
      expect(results.B).toEqual([{ A: 2 }, { C: 15 }, { D: 2 }])
      expect(results.C).toEqual([{ A: 3 }, { B: 15 }, { E: 13 }])
      expect(results.D).toEqual([{ B: 2 }, { E: 9 }])
      expect(results.E).toEqual([{ C: 13 }, { D: 9 }])
    })
  })

  describe('get shortest path', () => {
    test('get shortest path', () => {
      const adjacencyList = {
        A: [{ B: 2 }, { C: 3 }],
        B: [{ A: 2 }, { C: 15 }, { D: 2 }],
        C: [{ A: 3 }, { B: 15 }, { E: 13 }],
        D: [{ B: 2 }, { E: 9 }],
        E: [{ C: 13 }, { D: 9 }]
      }

      const nodes = ['A', 'B', 'C', 'D', 'E']

      expect(getShortestPath(adjacencyList, 'A', 'B', nodes)).toEqual([2, 'AB'])
      expect(getShortestPath(adjacencyList, 'A', 'C', nodes)).toEqual([3, 'AC'])
      expect(getShortestPath(adjacencyList, 'A', 'D', nodes)).toEqual([
        4,
        'ABD'
      ])
      expect(getShortestPath(adjacencyList, 'A', 'E', nodes)).toEqual([
        13,
        'ABDE'
      ])
      expect(getShortestPath(adjacencyList, 'A', 'A', nodes)).toEqual([0, 'A'])
    })
  })
})
