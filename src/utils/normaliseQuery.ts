export function normaliseQuery(query: string) {
  return query
    .split(' ')
    .filter(Boolean)
    .join(' ')
    .replaceAll(' ', '%20')
    .trim();
}