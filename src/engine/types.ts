export type TileSetter = {
  id: number,
  z?: number,
  object?: number,
} | number;

export type OptionalTileSetter = TileSetter | 0 | null | undefined;
