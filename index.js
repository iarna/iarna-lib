'use strict'
const path = require('path')
const fs = require('fs')
const caller = require('./caller.js')
const libPaths = {}

if (process.__iarna_lib__)
  module.exports = process.__iarna_lib__
  return
}

module.exports = process.__iarna_lib__ = function () {
  const paths = [].slice.call(arguments, 0)
  const dirname = path.dirname(module.parent.filename)
  const packagepath = getPackageFolder(dirname)
  for (let p of paths) {
    const targetpath = path.resolve(dirname, p)
    if (!libPaths[packagepath]) libPaths[packagepath] = []
    libPaths[packagepath].unshift(targetpath)
    if (path.relative(packagepath, targetpath)[0] == '.') {
      if (!libPaths[targetpath]) libPaths[targetpath] = []
      libPaths[targetpath].unshift(targetpath)
    }
  }
}

function getPackageFolder (current, top) {
  try {
    fs.statSync(path.join(current, 'node_modules'))
    return current
  } catch (ex) {}
  try {
    fs.statSync(path.join(current, 'index.js'))
    return current
  } catch (ex) {}
  const upone = path.resolve(current, '..')
  if (!top) top = current
  if (upone === current) return top

  return getPackageFolder(upone, top)
}

global.use = function use (toLoad) {
  const callerDir = path.dirname(caller())
  for (let dir of Object.keys(libPaths)) {
    if (/^(?:[^.]|$)/.test(path.relative(dir, callerDir))) {
      const oldPaths = module.paths
      module.paths = libPaths[dir]
      const result = module.require(toLoad)
      module.paths = oldPaths
      return result
    }
  }

  throw new Error('Could not find any library paths for the callsite: ' + callerDir)  
}
