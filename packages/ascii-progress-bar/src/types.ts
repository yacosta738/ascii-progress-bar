export interface Pattern {
  empty: string;
  filled: string;
  length: number;
}

export interface Patterns {
  [key: string]: Pattern;
}

export interface Colors {
  bar?: string;
  head?: string;
  percent?: string;
  text?: string;
}

export interface CustomChars {
  incomplete?: string;
  complete?: string;
  head?: string;
  animated?: string[];
}

export interface ProgressOptions {
  width: number;
  showPercent: boolean;
  align: 'left' | 'center' | 'right';
  chars: CustomChars;
  colors: Colors;
  animated: boolean;
  fps: number;
  pattern?: string;
}