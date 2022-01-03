import seedrandom from "seedrandom";

type prng = ReturnType<seedrandom>;

export function shuffle<T>(random: prng, array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random.double() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function sample<T>(random: prng, array: T[], size: number): T[] {
  const indices = shuffle(random, Array.from(array.keys()));
  const result = [];
  for (let i = 0; i < size && i < indices.length; i++) {
    result.push(array[indices[i]]);
  }
  return result;
}
