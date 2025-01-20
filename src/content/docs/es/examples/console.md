---
title: Ejemplos en Consola
description: Una colección de ejemplos para ayudarte a comenzar con Ascii Progress Bar en la consola.
i18nReady: true
banner:
  content: |
    Esta librería está en beta y en desarrollo activo. Por favor, reporta cualquier problema o sugerencia en <a href="https://github.com/yacosta738/ascii-progress-bar/issues" target="_blank">GitHub</a>.
---

ASCII Progress Bar puede ser utilizado en aplicaciones de consola Node.js. Aquí hay varios ejemplos que muestran diferentes formas de usarlo.

## Uso Básico

La forma más simple de usar la barra de progreso es importar `AsciiProgressRenderer` y llamar a su método render:

```javascript
import { AsciiProgressRenderer } from '@yacosta738/ascii-progress-bar';

console.log(AsciiProgressRenderer.render(75, 'default')); // ■■■■■■■□□□ 75%
```

## Patrones Disponibles

La librería viene con varios patrones incorporados:

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

## Barra de Progreso Animada

Aquí hay un ejemplo de cómo crear una barra de progreso animada en la consola:

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

## Patrones Personalizados

Puedes crear tus propios patrones usando el método `addPattern`:

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

## Consejos para Uso en Consola

- Usa `process.stdout.clearLine()` y `process.stdout.cursorTo(0)` para animaciones suaves
- Para actualizaciones en tiempo real, considera usar `\r` para volver al inicio de la línea
- El valor del progreso debe estar entre 0 y 100
- Si se especifica un patrón inválido, se utilizará el patrón predeterminado

## Error Handling

The renderer handles invalid inputs gracefully:

```javascript
// Invalid progress (>100) falls back to 100%
console.log(AsciiProgressRenderer.render(150, 'default')); // ■■■■■■■■■■ 100%

// Invalid pattern falls back to default
console.log(AsciiProgressRenderer.render(50, 'invalid')); // ■■■■■□□□□□ 50%
```
