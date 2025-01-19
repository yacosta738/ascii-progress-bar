import { Pattern, Patterns } from './types';

export class AsciiProgressRenderer {
  private static patternsMap = new Map<string, Pattern>();
  
  private static initializeDefaultPatterns() {
    if (this.patternsMap.size === 0) {
      const defaultPatterns: Patterns = {
        default: { empty: '□', filled: '■', length: 10 },
        dots: { empty: '.', filled: 'o', length: 20 },
        stars: { empty: ' ', filled: '*', length: 10 },
        hashes: { empty: ' ', filled: '#', length: 10 },
        circles: { empty: ' ', filled: '◉', length: 10 },
        braille: { empty: '⣀', filled: '⣿', length: 8 },
        minimal: { empty: '▱', filled: '▰', length: 5 },
        blocks: { empty: '▯', filled: '▮', length: 10 }
      };

      Object.entries(defaultPatterns).forEach(([name, pattern]) => {
        this.patternsMap.set(name, pattern);
      });
    }
  }

  static addPattern(name: string, pattern: Pattern): void {
    this.initializeDefaultPatterns();
    if (pattern.empty && pattern.filled && pattern.length) {
      this.patternsMap.set(name, pattern);
    }
  }

  static render(progress: number, patternName: string = 'default'): string {
    this.initializeDefaultPatterns();
    const pattern = this.patternsMap.get(patternName) || this.patternsMap.get('default');
    if (!pattern) {
      console.warn(`Pattern ${patternName} not found, using default`);
      return this.render(progress, 'default');
    }
    
    const { empty, filled, length } = pattern;
    const filledCount = Math.round((progress / 100) * length);
    const emptyCount = length - filledCount;
    return `${filled.repeat(filledCount)}${empty.repeat(emptyCount)} ${progress}%`;
  }

  static getPattern(name: string): Pattern | undefined {
    this.initializeDefaultPatterns();
    return this.patternsMap.get(name);
  }
}
