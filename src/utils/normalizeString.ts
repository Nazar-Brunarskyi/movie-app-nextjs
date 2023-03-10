export const normalizeString = (str: string | string[] | undefined) => {
  if (typeof str === "string") {
    return str;
  } else if (Array.isArray(str)) {
    return str.join(" ");
  } else {
    return undefined;
  }
}