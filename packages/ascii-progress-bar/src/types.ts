
export interface Pattern {
  empty: string;
  filled: string;
  length: number;
}

export interface Patterns {
  [key: string]: Pattern;
}