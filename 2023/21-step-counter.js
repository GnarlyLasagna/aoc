const testInput = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`


function stepCounter(input){

input = input.split("\n")

let start
const walls = input.reduce((m, l, y) => l.split('').reduce((mm, c, x) => {
  if (c === '#') mm.add(`${x}/${y}`)
  if (c === 'S') start = [x, y]
  return mm
}, m), new Set())

const maxSteps = 64

const visited = new Map()
const toExplore = [[0, ...start]]

const n = [[-1, 0], [1, 0], [0, -1], [0, 1]]

while (toExplore.length > 0) {
  const [d, x, y] = toExplore.shift()

  if (d > maxSteps) continue

  const s = `${x}/${y}`

  if (walls.has(s) || visited.get(s) !== undefined) continue

  visited.set(s, d)

  toExplore.push(...n.map(([nx, ny]) => [d+1, x+nx, y+ny]))
}

console.log([...visited].filter(([_, d]) => d%2 == 0).length)
}

function stepCounterTwo(input){


input = input.split("\n")

let start
const walls = input.reduce((m, l, y) => l.split('').reduce((mm, c, x) => {
  if (c === '#') mm.add(`${x}/${y}`)
  if (c === 'S') start = [x, y]
  return mm
}, m), new Set())

const l = input.length
const n = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const exploreSquare = (ss, sx, sy, maxSteps) => {
  const visited = new Map()
  const toExplore = [[ss, sx, sy]]

  while (toExplore.length > 0) {
    const [d, x, y] = toExplore.shift()

    if (d > maxSteps) continue

    const s = `${x}/${y}`

    const sNorm = `${(l+(x%l))%l}/${(l+(y%l))%l}`

    if (walls.has(sNorm) || visited.get(s) !== undefined) continue

    visited.set(s, d)

    toExplore.push(...n.map(([nx, ny]) => [d+1, x+nx, y+ny]))
  }

  return visited
}

const steps = 26501365

const x1 = steps % l
const x2 = x1 + l
const x3 = x2 + l

const r1 = exploreSquare(x1 % 2, start[0], start[1], x1+1)
const r2 = exploreSquare(x2 % 2, start[0], start[1], x2+1)
const r3 = exploreSquare(x3 % 2, start[0], start[1], x3+1)

const [y1,y2,y3] = [r1, r2, r3].map(r => [...r].filter(([_, d]) => d % 2 == 0).length)

const a = y1
const b = y2-y1
const c = y3-y2

const x = (steps-65) / l

console.log(a + b*x + ((x*(x-1))/2)*(c-b))}

const realInput = `...................................................................................................................................
...#.......#.##......#.#........#.........#...........................#.......#.....#.#.....#.#.#.......###....#...#..........#..#.
..#..............#.#..#........#........##.##.#.......#..#...............#..#......#.##.....#..#.........#......#......#......#.##.
....#........##....#.....##.....#.##...#....#.#.###.......................#...#...#.#..........#...#........#.............#.....#..
.....#.......###....#...............#.....#...#...#...##.#................#.......##...#..........#...#.......##..#........#.....#.
..........#............................#............#.#.................................#.......#............##............#.#.....
.............#............###.#.#...............#....#.............#.......#.##.....##..#..#............##..........##.............
...............#.#............#...#..#..#.##..#....#...........#..................##......#.#......#.#.#..........#.....#.#...#..#.
..........##.#..#...#.......##.........#.............#.............###...................#.......#...#.#.#.....#####.........##....
....#....#...#..#.....#..##.....#....#.........#..###.............#.#...........#.............#.##........#.#.#....#...##......##..
.......#.....#..#.#...........##.......##..#..#............##..#......#.......................#.......#.....#.#....................
.#..#...#.......#....#......#..#.#..........................#..##...................##.....#.........#.#........#........#...##....
..#...#.#..#...#.#......#....#...........#...#...........#..#.#.#....##..........#.#....#.......##.#....#.....##..........#.....#..
.....#..#...........#.##.#............#.#.##.............#.....##.................#............#..##.....#...........##............
.....#.#....##....#............#......#...#............#....#.......#.#....#........#......#...#........#....#.............#.......
.....#........#.........##.#...#...#.#..#..#..............................#.........#.....................#.#..#..#.#........#..#..
.##.....#..#..........##..#.#........#.#.....#........#............#...#.....#..................#.#.........#...#.....#....###..#..
...............##.....#.#.....#.....##..#..................###...............#.............#.......#....#...............#......#...
...#......#.#.............#..#.......#...#..............#.........#....#....#.......................#...#.......#..#...##......#.#.
..........#..#....#.#....#..#...#....##...#.......#..#.........##...#.#.##....#................#.....#.....#.........#.............
...#..#..#...#..#..#.....................#............#............#####....#..#.........#....#....#..#.............#.#......#.#.#.
......#....#....#.##.......#..##..#................#.....#..#.#................##.........#..##..##...........#..#.................
.....#.#..#......#......#....##...#............##...#.#.#......#.......#.......#..#.........#...#..#.....##...#.....#....#.........
....#..#...#..#...........#..#.#..#...#.............#.#....#...##...........#.#...##........#.....#...#.....#.#...#......#..#.#....
.....#.#...#...#.#...##...#........###.............#..#...##....#............................#..#.........##.......#.....#....#....
........#.##...................##......................#...#.....................#...................#..##.#....#....#.#....##...#.
.####.....#.......#........#..........................................#........#.#.#...........#........#..#....#......#....#..#...
.....#......#..###..#..##.....#.........................#..#...#....#.#.........#..#..................#..##........#....###...##.#.
........#....#......###...#......#..............#......#.....#....#.....#.....#....##........................#.........#..#........
........##..#........#........##.............##.##...#..#.......#.#.......#..##......#...............##..#...#.##...#..#......#....
........##..#..#..##.#..................##......#.#.......##...#......#....###...#.........................#.....#..#..#.#.........
............#......###.#......#............#..#..#...#.........#..#.....#.#...##......#.................#..........#....#.....#....
..#.....##.#.......##........#.......#...#..#.......#......##.#....#.......#..........#....#..............#..#...##...#.#......#.#.
..............#..###......##............#....#.....##.##......##................#..##....................#.......#.##..........#...
............#.#.......##............#........#.##....#..#.........##.#....##.#........#....##...............#............##.##..#..
..#..#..#...#...#....#.#...................###...#....#........##.........#..##......#....#................................#..#....
.#...............##................#.#.......#........#.....#.....###..#.##....##............###.........#....#....................
...................#..#...........#..#.#..............#..#...............#.#.#.........##.........#...........#...####....#..#...#.
..#...#........#.......#........#.....#..##.........##.#......##........#......#.#..#...#........#..........#..........#...#.......
..#....#.#.##.#....##...........#.#..##.....##...##..#...##....#....#....#....###...#...#.........##..................#.#....##..#.
.##........#...#...##........#..#...#.....#.#....###....##.#........#..#.......#.........#...#....#...............#..##....#.....#.
.....#.......#....#..........###.....#..#..........#..#.......##..#......................##..##...............#.#....#..##..##..#..
.#......#...#...#..#.............#.#....#........#......##............####.#.........#.................#..............#..#.#....#..
............#.#.#.............#..........#........##..##....#...............................#.#..#.....................##..##...#..
................................#........#........#.....##....#....#.......#......................#..........................##....
...##.###...#...........#..#.......#.....#................#.#..#......#...#....#..#......#....##......#..##........#..##.#.........
.#.........#...................#.....#.##.##.#.#.......#....#..#...#........##.##..#....##...##...#..#.............##.....#........
....#.......#.#........#.##...#.........#......##.....#....##..##...#......#..#.........#..##......##.#..............##..#....#..#.
.#.......#................#....##......#...#....#.#......#.#..#...............###.........#.##.............###..........###....#...
............#...........#...#......#.#..##......#..##..........#........#...##.........#...#.............#..............#..#.......
.#...#..##.............#........#..###........##................#...##..#......#...#.......#.#.........................##....#.....
.......##..........#......##....#............#..##.......##....##...#.......#...#........##..#.#...##........................#...#.
..#....#...............##...#...#.#.#.....#.#....#...#.........#..#.......#..#..#....#......##...#....##.....#..#.........#......#.
.#..#......................#..#.#....#..#.##..#......###.......................#........#.#....#........#..#....#..................
....#..............................#...##...............#...................#..#...##.#..#.....##......#...##................####..
................................#......#....#...#..#......#.....#..........#..#...##......#............#.....##....#........##.....
...............#...........#........#.#........#.#.#...#..#....#.......#..###..........#.#.#.#......#..#.......#..##.#.............
....................#.#....#.....#........##...#.......#....###.#.........#......#......##.#..#..#...................#.........##..
.#.....................#.........##......#........##..................#..................##..#.........##.#............#...........
............#...##.#..#................#........#......#...................#.#....##...#.#.....#.#.......#..#.....#.....#..........
.................#..............#..#......#......#.........#......#.#..#...#.#....................#...#.....#........#..#........#.
............#.........#....#.......##..#.#...##.....#...##...........#............#..#.#.............#.........#.........#.........
........#.............#......##..#.............#........#....#.##.#....#......#..........#....#....#......#....#.......#...........
............#.#...#..#.......#....#.....##....................#.........###....#.#........#...##.......#....#..##...#.......#......
.........#...#........#...........#......#....#..#...#..........#..............#....#............#..#......#..#...#..#....#........
.................................................................S.................................................................
.........#.###....#........#..##........#.##.#......#.............#..........#.#.#.......#...#..#...#...#....#......#..............
......#..#.....#.......#...##.###...........#..#...#.#.#..................###...#..#......##.#.##......#.......#..##.#......#......
............#........#......#....#...#.#....#....#......#...........#.......##..#......#...#.....#.......##.........#...#..........
...............#...........##.....#...#........#..#...#...........#..#..##....#.................##..#.....##..#.#......#.#.........
.........#....##..#...#.....#.....#.......#.#....#.........##..#.....##....#...#......#............#.......#....#....#...#.......#.
.......................#.#...#....#.#.....##......#............#.....#.#...##........##.....#...##.......##.#......................
..................##..#.#........#...#.#.....#.##........##..#.......###..##......#..........#........#....#..#.#...##.#.......#...
............#..............####...#..#..###.#.##....#.#.##...........#.......##......#.#............#.#........................#...
.#..............#.........#......#.......##...#.......................#.......#........#.......#........#.....#....#...............
...............#......#........#...............#........#..##......###...#.......................#....##.........#.##..........#.#.
...#..##.......#.#...#......#.....#.#...........#..##.###.#...............#.#........#............######.##.#...#..............#...
....##...............#.....##....#.#.....................###..#...#.#...#.#...#.##............##...#..#.#........##.......##.......
....#.#.#............#..#......###............#.#.####............#...###.........#.#...#.....#.##....#..........#.......#...###...
......#.#.#.............#...#....#....#.####.......#.....###........#......#.##......##..#..##.......#..#....##............#.#.....
..##.......#..........#....###.......#.###............#.....##....#....#.#...#.........#........#.......#..#.#.............#...##..
.........#.............#....##.........#....###.......#.....#...#.....#.#...#.#.#.....#....#...........###..#...........#.....#....
.#...#....#.##.........#...##....#..##.#....#.....##..#.#...............#.#...#...#.#.......#.#.#........#..#......................
.......##.#...............#...............#......#..#...##....#...#...#..#.......#.............#......#................#....###..#.
.....#.................#.............#.##.#..#...##.......#.....#........#..#.....#.......#........#..#...#...........#...#.....#..
..#.#....#.#.#..........#.#......#......................##.#.#.#....#....#....#...............#..#.#.................#......#......
...#.......#.....#........#....##...##.....#....##.....#....#..............#......#.....#.....#......#..##.............#.#.....###.
.#..............#.........#..........#..#.....##..##..#...#.......#.##......#...........##.......................#....#..#.........
....###..........................#...#...#..###.#...#...............#...##...#...#.##...#..#...#.#...#...........#.............#...
.................##...........##.......#......#..#..................#.................#....#..#....#.#.............#.##..#....##.#.
..#....#......#.#..................#...#..#........#.....#....#...##......#...###...........#..#..#..........#.............#.......
.#...#..#.##.#...#............#..#..#.#.....#.#..#..#.........##........#.......##.#.......#.....#.#........##..#............#.....
.##...###........#.#..............#...........#....#.##.......#.....##.........#..##.....#..#.................#.##...#...##......#.
...#....#............#.#.........##.###.#.......#..##......##......#####.......#.............#.............#.#.#..#...#..#.....#.#.
...#.###.....##..................#.###......#..#.#.#.#....#..#....#........##.#...#...#..#.....##.......................#.....#..#.
.......##.#..###.........................#..........#...#...#..#.....#.......#.#.....##...#....#.............#....##..#.##.#.......
.#.......#......#.##.................#.....#..#.............##....##.....#..#.#...........##.............#...##...........#........
....#.........##.#..#.................##...#.#.......#.......#.....#....#.....#.#.........#..#........#......#..........#.#........
.#..#...#......#..##.....#..............##.###.......#..#.........##...............#.....#...#........#.........#....#.............
....................#..#....................#....#..#....#..........#....#.....#.........#..#.................#.........#........#.
....................................................#..........#....#..##....##........#............#.........#....#...#.........#.
..#.........#.......#..#..................#.#....#.#..........#..................#..#..#...................#..#....................
..##...#...##....#...#..........##.........................#.#....###.....#.....#....#...........#..#.............#....##....#...#.
....#..#...#.....##...#..#...................#...#.........#.#..#...#............................#.........#..............##.#.....
.......#.......##.#.......#.....................#.....#............####.#.....#....#...............#.#....#......#.#...#...#.......
........#.......#...#.##..#........................#...#...##..........#...#......##..#.......##.....#..#..........................
.....#...#.....#..#.........###..#..............#..#......#.##..........#..##.##.................#...#.##.............#.#.....#..#.
..##..#............###...#..#....#..#.#.......#.......#.##....#.........#.#.#..................#.#...#.#......#.#.#................
...........#.#...............#.....##.................##.#...##.......#.##..#..................##....#.#....#....##.#.....#.....#..
.........#........#...............................#.#..#..#.........##....#..#.#...........#..##.....#..###.......#..#.#.#..#...#..
...........#......#.#.#.......#...#.....##..........#.....#...........##.##...#...........##.#.....#.#..##.#.#......#.......#...#..
..#....##....#....#.........#...#......................#...............#.......#...........#....#........##..#.##.....#.....##.....
....#........#......#....##......#.........#.......#.#......##.....#..##......#.........#...##....#..#..................#......#...
.........#...#..............................................###...........#............#..#......#....#..#...........#.#...........
..#....#.#.#.#.#.............#.#.......#...................#..........#.......................##.#.#..#.#..#...#.......#...........
..................#......#.#....####..###.....................#....#.#....#...........#.#.#....#.........#.##...............#......
.........##.#.#.........#..........#.......###..................#....#.....#..........##..#.#....#.....#..#.......#...#.....#......
.............####.........#...................#..........#.#.#....###....##........#.#..#....#..#..#............##........##.......
........##.#.#..#...........##.#.....##......#.#............##..#..##...................#.#...#..##...####.#..#...........##.#.....
..........#.............##...................#..#..........#.#......#...................#....#.....#..#...#...#.#.............#.#..
......##..#..#.#.#....#..#..#.....##.#..#....#.....#..........#....................#..............#......##.......#.......#..##.#..
.......#.#...#.#..##.#........#.#.#.......#.....##.##...........#.............#...........#....##.#.#.....#.#..........#........#..
..#....#....#..........#...#..........#.#....##......#.......#.#...#.................##..........#.#..##..#..............#....#....
.....................#............#......#..........##...............................#.#.#.#............#...#.....#.....#....#.....
........#..#........#.......................#.....#....#...............................#...............#.#.##...#...#..#.....###...
....#..#.#...#...........#.....#......#......#....#...##....................##........................#.##.....#......#.#......#...
.......#.#.....#......#....#.....#.....#............................................#....#...#...#.....#.#.#............###.#.#....
......#.#.......##...#...#...#.....###..####...#........#.#................#.................#............#.....#..................
...........##..............##...............##..........#..#..............##....#...#...#.##........#......#....#.##.#....#....###.
....#..#.#......#..#.#.........#.....#......#..###.....#.#.......................#.....#......#....#..##....#....#....#.#.#........
...................................................................................................................................`

stepCounter(realInput)
stepCounterTwo(realInput)
