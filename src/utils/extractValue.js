export function parseLookup(object) {
  const objectKeys = Object.keys(object);
  for (const propName of objectKeys) {
    if (typeof object[propName] === 'object' && object[propName].hasOwnProperty('lookupname')) {
      object[propName] = object[propName].lookupvalue;
    }
  }
  return object;
}
