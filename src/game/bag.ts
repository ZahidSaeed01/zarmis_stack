import { PIECE_IDS, type PieceId } from '@/constants/game';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** 7-bag randomizer. */
export function createBag() {
  let bag: PieceId[] = [];

  const refill = () => {
    bag = shuffle(PIECE_IDS);
  };

  const next = (): PieceId => {
    if (bag.length === 0) refill();
    return bag.pop()!;
  };

  return { next };
}
