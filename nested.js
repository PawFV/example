const ObjArr = [
  //   {
  //     objectid: 3155, // data: { id: 3155}
  //     name: 'Accesorios de tuberías', // => title
  //     objects: [
  //       {
  //         objectid: 3156,
  //         name: 'AP17_ATU_Arqueta Cuadrada',
  //         objects: [
  //           {
  //             objectid: 3158,
  //             name: 'AAcometida Agua_600x600',
  //             objects: [
  //               {
  //                 objectid: 3159,
  //                 name: 'AP17_ATU_Arqueta Cuadrada [977976]',
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  {
    objectid: 3155, // data: { id: 3155}
    name: 'Accesorios de tuberías', // => title
    objects: [
      {
        objectid: 3156,
        name: 'AP17_ATU_Arqueta Cuadrada',
        objects: [
          {
            objectid: 3158,
            name: 'AAcometida Agua_600x600',
          },
        ],
      },
    ],
  },
]

//
function shakeItBaby(partial, childrenProp) {
  console.log(partial)
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
const partial = ObjArr

const containsProp = (object, prop) => !(object[prop] || object['children'])

const testObj = partial
console.log(containsProp(testObj, 'objects'))

const obj = shakeItBaby(ObjArr, 'objects')
console.log(obj[0])
