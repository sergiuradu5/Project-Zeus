export const trimText = (text: string, limit: number = 40) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
