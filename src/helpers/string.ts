
export function toTitleCase(str: string) {
  // Convert the string to lowercase first for consistency
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}
