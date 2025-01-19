import { AsciiProgressRenderer } from './ascii-progress-renderer';
import { Pattern } from './types';

export class AsciiProgressBar extends HTMLElement {
  private progress: number;
  private pattern: string;

  static register(tagName?: string): void {
    if ("customElements" in window && !customElements.get(tagName || "ascii-progress-bar")) {
      customElements.define(tagName || "ascii-progress-bar", AsciiProgressBar);
    }
  }

  static addPattern(name: string, pattern: Pattern): void {
    AsciiProgressRenderer.addPattern(name, pattern);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.progress = parseFloat(this.getAttribute('progress') || '0');
    this.pattern = this.getAttribute('pattern') || 'default';
  }

  connectedCallback(): void {
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['progress', 'pattern'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      if (name === 'progress') {
        this.progress = parseFloat(newValue);
      } else if (name === 'pattern') {
        this.pattern = newValue;
      }
      this.render();
    }
  }

  public render(): void {
    const bar = AsciiProgressRenderer.render(this.progress, this.pattern);
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `<pre>${bar}</pre>`;
    }
  }
}

// Register the web component
AsciiProgressBar.register();
