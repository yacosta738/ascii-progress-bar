---
title: Web Component Examples
description: A collection of examples to help you get started with Ascii Progress Bar as a Web Component.
banner:
  content: |
    This library is in beta and under active development. Please report any issues or suggestions on <a href="https://github.com/yacosta738/ascii-progress-bar/issues" target="_blank">GitHub</a>.
---

# Web Component Usage

The ASCII Progress Bar can be used as a Web Component in your HTML applications. Here are several examples showing different ways to integrate it.

## Basic Installation

First, import and register the web component:

```html
<script type="module">
  import { AsciiProgressBar } from '@yacosta738/ascii-progress-bar/browser';
  AsciiProgressBar.register();
</script>
```

## Simple Static Progress Bar

The most basic usage is with a static progress value:

```html
<ascii-progress-bar progress="75" pattern="default"></ascii-progress-bar>
```

## Different Patterns

The component supports various built-in patterns:

```html
<!-- Default pattern -->
<ascii-progress-bar progress="75" pattern="default"></ascii-progress-bar>

<!-- Dots pattern -->
<ascii-progress-bar progress="60" pattern="dots"></ascii-progress-bar>

<!-- Stars pattern -->
<ascii-progress-bar progress="40" pattern="stars"></ascii-progress-bar>

<!-- Hashes pattern -->
<ascii-progress-bar progress="50" pattern="hashes"></ascii-progress-bar>

<!-- Braille pattern -->
<ascii-progress-bar progress="80" pattern="braille"></ascii-progress-bar>

<!-- Minimal pattern -->
<ascii-progress-bar progress="50" pattern="minimal"></ascii-progress-bar>

<!-- Blocks pattern -->
<ascii-progress-bar progress="60" pattern="blocks"></ascii-progress-bar>
```

## Dynamic Progress Updates

You can update the progress dynamically using JavaScript:

```javascript
// Get the element
const progressBar = document.querySelector('ascii-progress-bar');

// Update progress
progressBar.setAttribute('progress', '75');

// Dynamic counter example
let progress = 0;
setInterval(() => {
  progress = (progress + 1) % 101;
  progressBar.setAttribute('progress', progress);
}, 100);
```

## Real-World Examples

### Year Progress Tracker

```html
<ascii-progress-bar id="year-progress" pattern="default"></ascii-progress-bar>

<script>
function updateYearProgress() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const progress = ((now - start) / (end - start)) * 100;
  document.getElementById('year-progress')
    .setAttribute('progress', progress.toFixed(2));
}

updateYearProgress();
setInterval(updateYearProgress, 60 * 60 * 1000); // Update hourly
</script>
```

### Page Scroll Progress

```html
<ascii-progress-bar id="scroll-progress" pattern="blocks"></ascii-progress-bar>

<script>
function updateScrollProgress() {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / windowHeight) * 100;
  document.getElementById('scroll-progress')
    .setAttribute('progress', progress.toFixed(2));
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();
</script>
```

### Countdown Timer

```html
<ascii-progress-bar id="countdown" pattern="minimal"></ascii-progress-bar>

<script>
const totalTime = 60; // 60 seconds
let remainingTime = totalTime;

function updateCountdown() {
  const progress = ((totalTime - remainingTime) / totalTime) * 100;
  document.getElementById('countdown')
    .setAttribute('progress', progress.toFixed(2));
  if (remainingTime > 0) remainingTime--;
}

setInterval(updateCountdown, 1000);
</script>
```

## Styling

The component uses Shadow DOM and renders inside a `<pre>` tag. You can style the container:

```html
<style>
  ascii-progress-bar {
    display: block;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
  }
</style>
```

## Custom Patterns

You can add custom patterns programmatically:

```javascript
import { AsciiProgressBar } from '@yacosta738/ascii-progress-bar/browser';

// Add custom pattern
AsciiProgressBar.addPattern('custom', {
  empty: '○',
  filled: '●',
  length: 15
});

// Use custom pattern
<ascii-progress-bar progress="70" pattern="custom"></ascii-progress-bar>
```

## Browser Support

The web component works in all modern browsers that support Custom Elements v1. For older browsers, consider using a polyfill.

## Tips

1. Always set both `progress` and `pattern` attributes for consistent behavior
2. Progress values should be between 0 and 100
3. Invalid patterns will fall back to the default pattern
4. The component automatically updates when attributes change
5. Use `pattern="minimal"` for a more compact display
