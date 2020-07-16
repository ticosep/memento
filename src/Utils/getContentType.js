export function getContentType(str) {
  // Regex to find what is the content to be showed
  const regex = /image|video?/gi;
  const [match] = str.match(regex);

  return match;
}
