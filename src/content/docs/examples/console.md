---
title: Console Examples
description: A collection of examples to help you get started with Ascii Progress Bar in the console.
banner:
  content: |
    This library is in beta and under active development. Please report any issues or suggestions on <a href="https://github.com/yacosta738/ascii-progress-bar/issues" target="_blank">GitHub</a>.
---

# Console Usage Examples

The ASCII Progress Bar can be used in Node.js console applications. Here are several examples showing different ways to use it.

## Basic Usage

The simplest way to use the progress bar is to import the `AsciiProgressRenderer` and call its render method:

```javascript
import { AsciiProgressRenderer } from '@yacosta738/ascii-progress-bar';

console.log(AsciiProgressRenderer.render(75, 'default')); // ■■■■■■■□□□ 75%
```

## Available Patterns

The library comes with several built-in patterns:

```javascript
// Default pattern
console.log(AsciiProgressRenderer.render(75, 'default')); // ■■■■■■■□□□ 75%

// Dots pattern
console.log(AsciiProgressRenderer.render(60, 'dots'));    // oooooooooo..........  60%

// Stars pattern
console.log(AsciiProgressRenderer.render(40, 'stars'));   // ****      40%

// Hashes pattern
console.log(AsciiProgressRenderer.render(50, 'hashes'));  // #####      50%

// Braille pattern
console.log(AsciiProgressRenderer.render(80, 'braille')); // ⣿⣿⣿⣿⣿⣿⣀⣀ 80%

// Minimal pattern
console.log(AsciiProgressRenderer.render(50, 'minimal')); // ▰▰▱▱▱ 50%

// Blocks pattern
console.log(AsciiProgressRenderer.render(60, 'blocks'));  // ▮▮▮▮▮▮▯▯▯▯ 60%
```

## Animated Progress Bar

Here's an example of how to create an animated progress bar in the console:

```javascript
import { AsciiProgressRenderer } from '@yacosta738/ascii-progress-bar';

// Helper function to simulate delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function animateProgress() {
  for (let i = 0; i <= 100; i += 5) {
    // Clear previous line
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    // Render the bar
    process.stdout.write(AsciiProgressRenderer.render(i, 'blocks'));
    await sleep(200);
  }
  console.log('\n');
}

animateProgress();
```

## Custom Patterns

You can create your own patterns using the `addPattern` method:

```javascript
import { AsciiProgressRenderer } from '@yacosta738/ascii-progress-bar';

// Add custom pattern
AsciiProgressRenderer.addPattern('custom', {
  empty: '○',
  filled: '●',
  length: 15
});

// Use custom pattern
console.log(AsciiProgressRenderer.render(70, 'custom')); // ●●●●●●●●●●○○○○○ 70%
```

## Tips for Console Usage

- Use `process.stdout.clearLine()` and `process.stdout.cursorTo(0)` for smooth animations
- For real-time progress updates, consider using `\r` to return to the start of the line
- The progress value should be between 0 and 100
- If an invalid pattern is specified, it will fall back to the default pattern

## Error Handling

The renderer handles invalid inputs gracefully:

```javascript
// Invalid progress (>100) falls back to 100%
console.log(AsciiProgressRenderer.render(150, 'default')); // ■■■■■■■■■■ 100%

// Invalid pattern falls back to default
console.log(AsciiProgressRenderer.render(50, 'invalid')); // ■■■■■□□□□□ 50%
```
