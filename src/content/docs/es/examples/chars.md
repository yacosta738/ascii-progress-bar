---
title: Caracteres Personalizados
description: Personaliza los caracteres utilizados en la barra de progreso.
i18nReady: true
banner:
  content: |
    Esta librería está en beta y en desarrollo activo. Por favor, reporta cualquier problema o sugerencia en <a href="https://github.com/yacosta738/ascii-progress-bar/issues" target="_blank">GitHub</a>.
---

ASCII Progress Bar te permite personalizar los caracteres utilizados para renderizar la barra de progreso. Esto puede ser útil si deseas que el estilo de la barra de progreso coincida con el diseño de tu aplicación.

## Patrones Predefinidos

A continuación se muestran los patrones incorporados que puedes usar:

| Patrón   | Vacío  | Lleno  | Longitud | Descripción                        |
|----------|--------|--------|----------|-----------------------------------|
| Default  | □      | ■      | 10       | Estilo clásico basado en bloques  |
| Dots     | .      | o      | 20       | Minimalista, ideal para loaders   |
| Stars    | (espacio)| *    | 10       | Divertido e informal              |
| Hashes   | (espacio)| #    | 10       | Común en herramientas de terminal |
| Circles  | ○        | ◉    | 10       | Estilo moderno circular           |
| Braille  | ⣀     | ⣿      | 8        | Compacto, impacto visual denso    |
| Minimal  | ▱      | ▰      | 5        | Barra de progreso muy corta y limpia|
| Blocks   | ▯      | ▮      | 10       | Estilo limpio basado en bloques   |

## Patrones Personalizados

Puedes crear tus propios patrones usando el método `addPattern`. Un patrón consiste en tres propiedades:

- `empty`: El carácter usado para la porción vacía
- `filled`: El carácter usado para la porción llena
- `length`: La longitud total de la barra de progreso

Aquí te mostramos cómo crear y usar un patrón personalizado:

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

Resultado:

Esto renderizará una barra de progreso como:
`⇒⇒⇒⇒⇒⇒⇒⇒⇒⇒→→→→→ 75%`