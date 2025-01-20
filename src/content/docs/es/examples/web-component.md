---
title: Ejemplos de Componente Web
description: Una colección de ejemplos para ayudarte a comenzar con Ascii Progress Bar como Componente Web.
i18nReady: true
banner:
  content: |
    Esta librería está en beta y en desarrollo activo. Por favor, reporta cualquier problema o sugerencia en <a href="https://github.com/yacosta738/ascii-progress-bar/issues" target="_blank">GitHub</a>.
---

ASCII Progress Bar puede utilizarse como un Componente Web en tus aplicaciones HTML. Aquí hay varios ejemplos que muestran diferentes formas de integrarlo.

## Instalación Básica

Primero, importa y registra el componente web:

```html
<script type="module">
  import { AsciiProgressBar } from '@yacosta738/ascii-progress-bar/browser';
  AsciiProgressBar.register();
</script>
```

## Barra de Progreso Estática Simple

El uso más básico es con un valor de progreso estático:

```html
<ascii-progress-bar progress="75" pattern="default"></ascii-progress-bar>
```

## Diferentes Patrones

El componente soporta varios patrones incorporados:

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

## Actualizaciones Dinámicas de Progreso

Puedes actualizar el progreso dinámicamente usando JavaScript:

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

## Ejemplos del Mundo Real

### Seguimiento del Progreso del Año

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

### Progreso de Desplazamiento de Página

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

### Temporizador de Cuenta Regresiva

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

## Estilización

El componente utiliza Shadow DOM y se renderiza dentro de una etiqueta `<pre>`. Puedes estilizar el contenedor:

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

## Patrones Personalizados

Puedes agregar patrones personalizados programáticamente:

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

## Soporte de Navegadores

El componente web funciona en todos los navegadores modernos que soportan Custom Elements v1. Para navegadores antiguos, considera usar un polyfill.

## Consejos

1. Siempre establece tanto los atributos `progress` como `pattern` para un comportamiento consistente
2. Los valores de progreso deben estar entre 0 y 100
3. Los patrones inválidos se revertirán al patrón predeterminado
4. El componente se actualiza automáticamente cuando los atributos cambian
5. Usa `pattern="minimal"` para una visualización más compacta
