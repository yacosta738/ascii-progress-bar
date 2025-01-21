---
title: Custom Characters
description: Customize the characters used in the progress bar.
banner:
  content: |
    This library is in beta and under active development. Please report any issues or suggestions on <a href="https://github.com/yacosta738/ascii-progress-bar/issues" target="_blank">GitHub</a>.
---

The ASCII Progress Bar allows you to customize the characters used to render the progress bar. This can be useful if you want to match the style of the progress bar with your application's design.

## Predefined Patterns

Below are the built-in patterns you can use:

| Pattern  | Empty | Filled | Length | Description                       |
|----------|-------|--------|--------|-----------------------------------|
| Default  | □     | ■      | 10     | Classic block-based style.        |
| Dots     | .     | o      | 20     | Minimalistic, ideal for loaders.  |
| Stars    | (space)| *     | 10     | Fun and informal.                 |
| Hashes   | (space)| #     | 10     | Common in terminal tools.         |
| Circles  | ○      | ◉     | 10     | Circular, modern style.           |
| Braille  | ⣀    | ⣿     | 8      | Compact, dense visual impact.     |
| Minimal  | ▱     | ▰      | 5      | Very short, clean progress bar.   |
| Blocks   | ▯     | ▮      | 10     | Clean block-based style.          |

## Custom Patterns

You can create your own custom patterns using the `addPattern` method. A pattern consists of three properties:

- `empty`: The character used for the unfilled portion
- `filled`: The character used for the filled portion
- `length`: The total length of the progress bar

Here's how to create and use a custom pattern:

```html
<script>
  import { AsciiProgressBar } from '@yacosta738/ascii-progress-bar';
  // Create a custom pattern using arrows
  customElements.whenDefined('ascii-progress-bar').then(() => {
        // Arrows pattern
        AsciiProgressBar.addPattern('arrows', {
          empty: '→',
          filled: '⇒',
          length: 15
        });
      });
</script>

<!-- Use the custom pattern -->
<ascii-progress-bar progress="75" pattern="arrows"></ascii-progress-bar>
```

Output:

This will render a progress bar like:
`⇒⇒⇒⇒⇒⇒⇒⇒⇒⇒→→→→→ 75%`