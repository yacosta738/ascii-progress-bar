import { AsciiProgressRenderer } from './ascii-progress-renderer.js';

// Console log examples
console.log('Console Demo:');
console.log('Default pattern:', AsciiProgressRenderer.render(75, 'default'));
console.log('Braille pattern:', AsciiProgressRenderer.render(80, 'braille'));
console.log('Minimal pattern:', AsciiProgressRenderer.render(50, 'minimal'));
console.log('Blocks pattern:', AsciiProgressRenderer.render(60, 'blocks'));
