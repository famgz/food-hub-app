export function plainify(item: any) {
  return JSON.parse(JSON.stringify(item));
}
