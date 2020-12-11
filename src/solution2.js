import objArr from './objArr'
import util from 'util'
const shakeItBaby = (categories) => categories.map((rootObject) => shakeIt(rootObject))

function shakeIt(rootObject) {
  let mutatedObj = {
    isLeaf: containsProp(rootObject, 'objects'),
    data: { id: rootObject.objectid },
    title: rootObject.name,
    children: null,
  }

  !mutatedObj.isLeaf ? (mutatedObj.children = rootObject.objects) : delete mutatedObj.children

  if (!mutatedObj.isLeaf) shakeItBaby(mutatedObj.children)

  return mutatedObj
}

const containsProp = (object, prop) => !(object[prop] || object['children'])

const obj = shakeItBaby(objArr)
console.log(util.inspect(obj, false, null, true /* enable colors */))
