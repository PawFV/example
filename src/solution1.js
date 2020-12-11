import objArr from './objArr'
import util from 'util'
function shakeItBaby(partial, childrenProp) {
  const result = partial.map((rootObject) => {
    shakeIt(rootObject, childrenProp)
    return rootObject
  })
  return result
}

function shakeIt(rootObject, childrenProp) {
  rootObject.isLeaf = containsProp(rootObject, childrenProp)

  rootObject['title'] = rootObject['name']
  delete rootObject['name']
  rootObject['data'] = { id: rootObject['objectid'] }
  delete rootObject['objectid']
  rootObject['children'] = rootObject['objects']
  delete rootObject['objects']
  if (!rootObject.isLeaf) {
    shakeItBaby(rootObject['children'])
  }

  return rootObject
}

const containsProp = (object, prop) => !(object[prop] || object['children'])

const res = shakeItBaby(objArr, 'objects')
console.log(util.inspect(res, false, null, true /* enable colors */))
