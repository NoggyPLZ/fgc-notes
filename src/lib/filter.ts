import profanityFilter from "./profanityFilter.json";

const profanityFilterSet = new Set(
  profanityFilter.map((word) => word.toLowerCase())
);

export function containsProfanity(text: string): boolean {
  const lowerText = text.toLowerCase().split(/\W+/);
  return lowerText.some((word) => profanityFilterSet.has(word));
}
