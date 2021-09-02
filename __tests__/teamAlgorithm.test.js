import teamAlgorithm from '../lib/utils/teams.js';

const simulations = [
  {
    description: '4 groups, 13 voters',
    pitches: ['A', 'B', 'C', 'D'],
    preferences: [
      ['A', 'B', 'C', 'D'],
      ['A', 'B', 'C', 'D'],
      ['A', 'B', 'C', 'D'],
      ['A', 'C', 'B', 'D'],
      ['A', 'C', 'B', 'D'],
      ['A', 'C', 'D', 'B'],
      ['A', 'D', 'C', 'B'],
      ['B', 'C', 'D', 'A'],
      ['B', 'C', 'A', 'D'],
      ['B', 'D', 'A', 'C'],
      ['D', 'A', 'C', 'B'],
      ['D', 'A', 'B', 'C'],
      ['D', 'C', 'B', 'A']
    ],
    G: 4
  },
  {
    description: '5 groups, 20 voters',
    pitches: ['A', 'B', 'C', 'D', 'E'],
    preferences: [
      ['A', 'B', 'C', 'D', 'E'],
      ['A', 'B', 'C', 'D', 'E'],
      ['A', 'B', 'C', 'E', 'D'],
      ['A', 'C', 'E', 'B', 'D'],
      ['A', 'C', 'E', 'B', 'D'],
      ['A', 'C', 'E', 'D', 'B'],
      ['A', 'D', 'C', 'B', 'E'],
      ['A', 'D', 'E', 'C', 'B'],
      ['A', 'E', 'B', 'C', 'D'],
      ['A', 'E', 'C', 'D', 'B'],
      ['A', 'E', 'D', 'C', 'B'],
      ['B', 'E', 'C', 'A', 'D'],
      ['B', 'E', 'D', 'A', 'C'],
      ['D', 'A', 'B', 'C', 'E'],
      ['D', 'C', 'B', 'A', 'E'],
      ['D', 'C', 'B', 'E', 'A'],
      ['E', 'A', 'B', 'D', 'C'],
      ['E', 'B', 'A', 'C', 'D'],
      ['E', 'C', 'B', 'D', 'A'],
      ['E', 'D', 'A', 'B', 'C']
    ],
    G: 5
  },
  {
    description: '4 groups, 35 voters',
    pitches: ['hare', 'ibex', 'joey', 'kiwi'],
    preferences: [
      [ 'joey', 'hare', 'ibex', 'kiwi' ],
      [ 'joey', 'kiwi', 'hare', 'ibex' ],
      [ 'ibex', 'joey', 'hare', 'kiwi' ],
      [ 'kiwi', 'ibex', 'hare', 'joey' ],
      [ 'hare', 'kiwi', 'ibex', 'joey' ],
      [ 'hare', 'ibex', 'kiwi', 'joey' ],
      [ 'kiwi', 'hare', 'ibex', 'joey' ],
      [ 'kiwi', 'ibex', 'hare', 'joey' ],
      [ 'kiwi', 'ibex', 'joey', 'hare' ],
      [ 'hare', 'kiwi', 'ibex', 'joey' ],
      [ 'hare', 'kiwi', 'joey', 'ibex' ],
      [ 'ibex', 'joey', 'kiwi', 'hare' ],
      [ 'hare', 'kiwi', 'joey', 'ibex' ],
      [ 'ibex', 'kiwi', 'hare', 'joey' ],
      [ 'hare', 'joey', 'ibex', 'kiwi' ],
      [ 'kiwi', 'joey', 'ibex', 'hare' ],
      [ 'kiwi', 'joey', 'hare', 'ibex' ],
      [ 'kiwi', 'ibex', 'hare', 'joey' ],
      [ 'joey', 'kiwi', 'ibex', 'hare' ],
      [ 'joey', 'kiwi', 'hare', 'ibex' ],
      [ 'joey', 'ibex', 'kiwi', 'hare' ],
      [ 'joey', 'ibex', 'kiwi', 'hare' ],
      [ 'kiwi', 'hare', 'joey', 'ibex' ],
      [ 'joey', 'hare', 'kiwi', 'ibex' ],
      [ 'hare', 'ibex', 'joey', 'kiwi' ],
      [ 'joey', 'kiwi', 'hare', 'ibex' ],
      [ 'hare', 'kiwi', 'joey', 'ibex' ],
      [ 'joey', 'kiwi', 'hare', 'ibex' ],
      [ 'ibex', 'hare', 'joey', 'kiwi' ],
      [ 'hare', 'kiwi', 'joey', 'ibex' ],
      [ 'kiwi', 'ibex', 'joey', 'hare' ],
      [ 'ibex', 'joey', 'kiwi', 'hare' ],
      [ 'joey', 'ibex', 'kiwi', 'hare' ],
      [ 'kiwi', 'ibex', 'hare', 'joey' ],
      [ 'joey', 'hare', 'ibex', 'kiwi' ]
    ],
    G: 4 
  },
  {
    description: '5 of 7 groups, 45 voters',
    pitches: ['ant', 'bat', 'cat', 'dog', 'emu', 'fox', 'gar'],
    preferences: [
      ['ant', 'emu', 'cat', 'gar', 'dog', 'bat', 'fox'],
      ['ant', 'emu', 'dog', 'cat', 'gar', 'fox', 'bat'],
      ['bat', 'ant', 'dog', 'gar', 'cat', 'fox', 'emu'],
      ['bat', 'cat', 'emu', 'gar', 'fox', 'dog', 'ant'],
      ['bat', 'cat', 'gar', 'fox', 'ant', 'emu', 'dog'],
      ['bat', 'dog', 'ant', 'gar', 'emu', 'cat', 'fox'],
      ['bat', 'emu', 'cat', 'dog', 'gar', 'fox', 'ant'],
      ['bat', 'emu', 'cat', 'gar', 'fox', 'ant', 'dog'],
      ['bat', 'fox', 'gar', 'emu', 'ant', 'cat', 'dog'],
      ['bat', 'gar', 'dog', 'cat', 'emu', 'ant', 'fox'],
      ['cat', 'ant', 'bat', 'emu', 'dog', 'fox', 'gar'],
      ['cat', 'ant', 'fox', 'bat', 'dog', 'gar', 'emu'],
      ['cat', 'ant', 'fox', 'dog', 'gar', 'bat', 'emu'],
      ['cat', 'ant', 'gar', 'emu', 'bat', 'fox', 'dog'],
      ['cat', 'ant', 'gar', 'emu', 'dog', 'fox', 'bat'],
      ['cat', 'dog', 'emu', 'fox', 'gar', 'bat', 'ant'],
      ['cat', 'emu', 'fox', 'bat', 'ant', 'dog', 'gar'],
      ['cat', 'fox', 'emu', 'ant', 'gar', 'bat', 'dog'],
      ['cat', 'fox', 'emu', 'ant', 'gar', 'dog', 'bat'],
      ['dog', 'ant', 'bat', 'cat', 'gar', 'fox', 'emu'],
      ['dog', 'bat', 'ant', 'cat', 'gar', 'fox', 'emu'],
      ['dog', 'cat', 'emu', 'bat', 'gar', 'ant', 'fox'],
      ['dog', 'fox', 'emu', 'cat', 'ant', 'bat', 'gar'],
      ['dog', 'gar', 'ant', 'bat', 'cat', 'emu', 'fox'],
      ['dog', 'gar', 'ant', 'bat', 'cat', 'emu', 'fox'],
      ['dog', 'gar', 'ant', 'emu', 'bat', 'cat', 'fox'],
      ['emu', 'ant', 'dog', 'fox', 'bat', 'gar', 'cat'],
      ['emu', 'bat', 'cat', 'ant', 'fox', 'gar', 'dog'],
      ['emu', 'cat', 'ant', 'gar', 'fox', 'dog', 'bat'],
      ['emu', 'dog', 'fox', 'bat', 'ant', 'gar', 'cat'],
      ['emu', 'fox', 'dog', 'gar', 'bat', 'ant', 'cat'],
      ['emu', 'gar', 'ant', 'fox', 'dog', 'bat', 'cat'],
      ['emu', 'gar', 'dog', 'bat', 'cat', 'fox', 'ant'],
      ['fox', 'bat', 'cat', 'gar', 'emu', 'dog', 'ant'],
      ['fox', 'cat', 'ant', 'gar', 'bat', 'emu', 'dog'],
      ['fox', 'cat', 'dog', 'gar', 'ant', 'bat', 'emu'],
      ['fox', 'cat', 'gar', 'bat', 'ant', 'dog', 'emu'],
      ['fox', 'dog', 'emu', 'bat', 'gar', 'ant', 'cat'],
      ['fox', 'emu', 'bat', 'cat', 'ant', 'dog', 'gar'],
      ['fox', 'emu', 'bat', 'dog', 'ant', 'gar', 'cat'],
      ['fox', 'emu', 'gar', 'bat', 'dog', 'cat', 'ant'],
      ['gar', 'bat', 'cat', 'ant', 'dog', 'emu', 'fox'],
      ['gar', 'cat', 'ant', 'fox', 'dog', 'bat', 'emu'],
      ['gar', 'cat', 'bat', 'ant', 'dog', 'fox', 'emu'],
      ['gar', 'dog', 'ant', 'emu', 'bat', 'cat', 'fox']
    ],
    G: 5
  },
  {
    description: '4 of 5 groups, 15 voters with incomplete and duplicates',
    pitches: ['A', 'B', 'C', 'D', 'E'],
    preferences: [
      ['A', 'B', 'C', 'D', 'E'],
      ['A', 'D', 'C', 'E', 'B'],
      ['E', 'C', 'E', 'D', 'B'],
      ['A', 'B', 'C', 'D'],
      ['A', 'C', 'B', 'D'],
      ['A', 'C', 'B', 'D'],
      ['B', 'E', 'A', 'C'],
      ['D', 'A', 'C', 'B'],
      ['D', 'C', 'A', 'B'],
      ['D', 'C', 'B', 'A'],
      ['E', 'C', 'B', 'A'],
      ['A', 'B', 'C'],
      ['D', 'B', 'C'],
      ['B', 'D'],
      ['E']
    ],
    G: 4
  }
];

describe('test simulations', () => {
  test('test that none of the teams are too long', () => {
    for (let i = 0; i < simulations.length; i++) {
      const data = simulations[i];
    
      const results = teamAlgorithm(data, { raw: false, loud: true });

      const maxTeamSize = Math.floor(data.preferences.length / data.G) + 1;

      expect(Object.values(results).some(team => team.length > maxTeamSize)).toBe(false);
      expect(Object.values(results).every(team => team.length >= maxTeamSize - 1)).toBe(true);
    }
  });
});
