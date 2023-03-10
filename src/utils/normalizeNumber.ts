export const normalizeNumber = (page: string | string[] | undefined) => {
  if (typeof page === "string") {
    return parseInt(page);
  } else if (Array.isArray(page)) {
    return parseInt(page.join(""));
  } else {
    return undefined;
  }
}