'use strict'
const test = require('tap').test
const requireInject = require('require-inject')

test('singleton', t => {
  const p = {}
  const aa = requireInject('../index.js', {process: p})
  const bb = requireInject('../index.js', {process: p})
  t.ok(aa === bb, 'separate loads get exactly the same object')
  t.done()
})

test('paths', t => {
  const p = {}
  const aa = requireInject('../index.js', {process: p})
  const bb = requireInject('../index.js', {process: p})
  t.ok(aa === bb, 'separate loads get exactly the same object')
  t.done()
})
