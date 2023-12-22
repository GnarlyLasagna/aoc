const testInput = ``

function propagation(input){


input =
  input.split("\n")
  .reduce((o, l) => {
    const p = l.split(' -> ')
    const isBC = p[0] === 'broadcaster'
    o[isBC ? p[0] : p[0].slice(1)] = {
      type: isBC ? p[0] : p[0].at(0),
      connections: p[1].split(', '),
    }
    o[isBC ? p[0] : p[0].slice(1)].state = o[isBC ? p[0] : p[0].slice(1)].type == '%' ? 0 : {}
    return o
  }, {})

Object.entries(input).forEach(([k, {connections}]) => {
  connections.forEach(dest => {
    if (dest == 'output' || !input[dest]) return
    if (!input[dest].inputs) input[dest].inputs = []
    input[dest].inputs.push(k)
    if (input[dest].type === '&') input[dest].state[k] = 0
  })
})

const o = {
  0: 0,
  1: 0
}

let i = 0
const toProcess = []

while (i < 1001) {
  if (toProcess.length == 0) {
    i++
    toProcess.push(['broadcaster', 0, 'button'])
    continue
  }

  const [m, freq, from] = toProcess.shift()

  o[freq] = o[freq] + 1

  if (m === 'output' || !input[m]) {
    continue
  }

  const mod = input[m]

  if (mod.type === 'broadcaster') {
    toProcess.push(...mod.connections.map(c => [c, freq, m]))
    continue
  }

  if (mod.type === '%' && freq == 0) {
    mod.state = 1-mod.state
    toProcess.push(...mod.connections.map(c => [c, mod.state, m]))
    continue
  }

  if (mod.type === '&') {
    mod.state[from] = freq
    const allHigh = mod.inputs.every(c => mod.state[c] == 1)
    toProcess.push(...mod.connections.map(c => [c, allHigh ? 0 : 1, m]))
    continue
  }
}

console.log(o[0] * o[1])
}

function propagationTwo(input){

const getInput = () => {
  const i = input
  .split("\n")
  .reduce((o, l) => {
    const p = l.split(' -> ')
    const isBC = p[0] === 'broadcaster'
    o[isBC ? p[0] : p[0].slice(1)] = {
      type: isBC ? p[0] : p[0].at(0),
      connections: p[1].split(', '),
    }
    o[isBC ? p[0] : p[0].slice(1)].state = o[isBC ? p[0] : p[0].slice(1)].type == '%' ? 0 : {}
    return o
  }, {})

  i.rx = {connections: []}

  Object.entries(i).forEach(([k, {connections}]) => {
    connections.forEach(dest => {
      if (dest == 'output' || !i[dest]) return
      if (!i[dest].inputs) i[dest].inputs = []
      i[dest].inputs.push(k)
      if (i[dest].type === '&') i[dest].state[k] = 0
    })
  })

  return i
}

console.log(getInput().broadcaster.connections.reduce((p, sNode) => {
  let input = getInput()

  let i = 0
  let toProcess = []
  let mC = 0

  const eNode = input['rx'].inputs[0]

  while (true) {
    if (toProcess.length == 0) {
      i++
      toProcess.push(['broadcaster', 0, 'button'])
      continue
    }

    const [m, freq, from] = toProcess.shift()

    if (m === eNode) {
      if (freq == 1) {
        break
      }
      continue
    }

    const mod = input[m]

    if (mod.type === 'broadcaster') {
      toProcess.push([sNode, freq, m])
      continue
    }

    if (mod.type === '%' && freq == 0) {
      mod.state = 1-mod.state
      toProcess.push(...mod.connections.map(c => [c, mod.state, m]))
      continue
    }

    if (mod.type === '&') {
      mod.state[from] = freq
      const allHigh = mod.inputs.every(c => mod.state[c] == 1)
      toProcess.push(...mod.connections.map(c => [c, allHigh ? 0 : 1, m]))
      continue
    }
  }

  //technically lcm
  return p * i
}, 1))
}

const realInput = `%nd -> fs
%ql -> qz
%gz -> vv
%lg -> zx, lx
%tr -> sd
%vn -> ql, qz
%kg -> xz
%sj -> gs
&bq -> rx
%hf -> xm
%vv -> mq, db
%gf -> fn, lx
%zt -> sk
%bm -> lx, cp
%cp -> lx, gb
%gs -> gq, qz
%sp -> db, jh
%bh -> kr, db
%xb -> qz, vn
%fx -> qf
%gq -> qz, xb
%xp -> zn, sd
%hl -> tr, sd
%sk -> nd
%mh -> xs, sd
&qz -> nd, sj, sk, gp, gc, vh, zt
&vg -> bq
%sh -> pz
%jh -> kg
&kp -> bq
%gp -> zt
&gc -> bq
%xf -> xp
%cv -> sd, hl
&db -> kg, sp, kp, fx, jh, gz
%kr -> db
%xz -> zs, db
%fs -> qz, sj
%xm -> kh, lx
%qf -> db, gz
%fn -> bm
%kh -> lx, gf
%vh -> qz, gp
%mq -> bh, db
%zn -> cv
%sv -> xf, sd
%lh -> lx
%dl -> lh, lx
%zx -> lx, hf
%pz -> sd, cn
%cn -> sd, sv
%xs -> sh
%gb -> lx, dl
&tx -> bq
&sd -> mh, tx, sh, xf, zn, xs
&lx -> fn, hf, vg, lg
%zs -> db, fx
broadcaster -> vh, sp, lg, mh`

propagation(realInput)
propagationTwo(realInput)
