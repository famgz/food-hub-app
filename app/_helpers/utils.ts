export function convertToPlainObject(item: any) {
  return JSON.parse(JSON.stringify(item));
}
