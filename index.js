'use strict'
const path = require('path')
const fs = require('fs')
const caller = require('./caller.js')
const libPaths = {}

if (process.__iarna_lib__) {
  module.exports = process.__iarna_lib__
  return
}

module.exports = process.__iarna_lib__ = function () {
  const paths = [].slice.call(arguments, 0)
  const dirname = path.dirname(caller())
  const packagepath = getPackageFolder(dirname)
  for (let p of paths) {
    const targetpath = path.resolve(dirname, p)
    addPath(packagepath, targetpath)
    const targetPackage = getPackageFolder(targetpath)
    if (targetPackage !== packagepath) addPath(targetPackage, targetpath)
  }
}

function addPath(pkg, path) {
  if (!libPaths[pkg]) {
    libPaths[pkg] = [path]
    return
  }
  libPaths[pkg] = [path].concat(libPaths[pkg].filter(p => p !== path))
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
  const [ dir ] = Object.keys(libPaths).filter(_ => /^(?:[^.]|$)/.test(path.relative(_, callerDir)))
  if (!dir) throw new Error('Could not find any library paths for the callsite: ' + callerDir)

  const oldPaths = module.paths
  module.paths = libPaths[dir]
  const result = module.require(toLoad)
  module.paths = oldPaths
  return result
}
