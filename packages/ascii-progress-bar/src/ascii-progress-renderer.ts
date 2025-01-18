import { Pattern, Patterns } from './types';

export class AsciiProgressRenderer {
  static patterns: Patterns = {
    default: { empty: '□', filled: '■', length: 10 },
    dots: { empty: '.', filled: 'o', length: 20 },
    stars: { empty: ' ', filled: '*', length: 10 },
    hashes: { empty: ' ', filled: '#', length: 10 },
    circles: { empty: ' ', filled: '◉', length: 10 },
    braille: { empty: '⣀', filled: '⣿', length: 8 },
    minimal: { empty: '▱', filled: '▰', length: 5 },
    blocks: { empty: '▯', filled: '▮', length: 10 }
  };

  static addPattern(name: string, pattern: Pattern): void {
    if (pattern.empty && pattern.filled && pattern.length) {
      this.patterns[name] = pattern;
    }
  }

  static render(progress: number, patternName: string = 'default'): string {
    const { empty, filled, length } = this.patterns[patternName] || this.patterns['default'];
    const filledCount = Math.round((progress / 100) * length);
    const emptyCount = length - filledCount;
    return `${filled.repeat(filledCount)}${empty.repeat(emptyCount)} ${progress}%`;
  }
}
