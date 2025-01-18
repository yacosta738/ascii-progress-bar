# ASCII Progress Bar Web Component

A customizable ASCII progress bar web component that's lightweight and easy to use.

## Installation

You can install the package using npm, yarn, or pnpm:

```bash
# npm
npm install @yacosta738/ascii-progress-bar

# yarn
yarn add @yacosta738/ascii-progress-bar

# pnpm
pnpm add @yacosta738/ascii-progress-bar
```

## Usage

### Basic Usage

```html
<!-- Import the web component -->
<script type="module">
  import '@yacosta738/ascii-progress-bar';
</script>

<!-- Use it in your HTML -->
<ascii-progress-bar progress="75"></ascii-progress-bar>
```

### Available Patterns

The component comes with several built-in patterns:

- `default`: □■ (default)
- `dots`: .o
- `stars`: *
- `hashes`: #
- `circles`: ◉
- `braille`: ⣀⣿
- `minimal`: ▱▰
- `blocks`: ▯▮

```html
<ascii-progress-bar progress="75" pattern="dots"></ascii-progress-bar>
```

### Custom Patterns

You can add your own patterns:

```javascript
import { AsciiProgressBar } from '@yacosta738/ascii-progress-bar';

AsciiProgressBar.addPattern('custom', {
  empty: '-',
  filled: '+',
  length: 15
});
```

### Attributes

| Attribute  | Type     | Default    | Description                    |
|------------|----------|------------|--------------------------------|
| progress   | number   | 0          | Progress value (0-100)        |
| pattern    | string   | 'default'  | Name of the pattern to use    |

## TypeScript Support

The package includes TypeScript definitions out of the box.

## License

MIT License
