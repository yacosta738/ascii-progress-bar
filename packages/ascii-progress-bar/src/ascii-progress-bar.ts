import { AsciiProgressRenderer } from "./ascii-progress-renderer";
import type { Pattern } from "./types";

export class AsciiProgressBar extends HTMLElement {
	private progress: number;
	private pattern: string;
	private showProgress: boolean;
	private length: number | undefined;
	private preElement: HTMLPreElement | null = null;

	static register(tagName?: string): void {
		if (
			"customElements" in window &&
			!customElements.get(tagName || "ascii-progress-bar")
		) {
			customElements.define(tagName || "ascii-progress-bar", AsciiProgressBar);
		}
	}

	static addPattern(name: string, pattern: Pattern): void {
		AsciiProgressRenderer.addPattern(name, pattern);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.progress = this.parseProgress(this.getAttribute("progress"));
		this.pattern = this.getAttribute("pattern") || "default";
		this.showProgress = this.parseBoolean(this.getAttribute("show-progress"), true);
		const lengthAttr = this.getAttribute("length");
		this.length = lengthAttr ? Number.parseInt(lengthAttr, 10) : undefined;
	}

	private parseProgress(value: string | null): number {
		if (value === null) return 0;
		const parsed = Number.parseFloat(value);
		return Number.isNaN(parsed) ? 0 : parsed;
	}

	private parseBoolean(value: string | null, defaultValue: boolean): boolean {
		if (value === null) return defaultValue;
		return value !== "false";
	}

	connectedCallback(): void {
		this.setupStyles();
		this.setupAria();
		this.render();
	}

	private setupStyles(): void {
		if (this.shadowRoot && !this.shadowRoot.querySelector('style')) {
			const style = document.createElement('style');
			style.textContent = `
				:host {
					display: block;
					font-family: monospace;
				}
				pre {
					margin: 0;
					white-space: pre-wrap;
					word-break: break-all;
				}
			`;
			this.shadowRoot.appendChild(style);
		}
	}

	private setupAria(): void {
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'progressbar');
		}
		if (!this.hasAttribute('aria-valuemin')) {
			this.setAttribute('aria-valuemin', '0');
		}
		if (!this.hasAttribute('aria-valuemax')) {
			this.setAttribute('aria-valuemax', '100');
		}
	}

	static get observedAttributes(): string[] {
		return ["progress", "pattern", "show-progress", "length"];
	}

	attributeChangedCallback(
		name: string,
		oldValue: string,
		newValue: string,
	): void {
		if (oldValue !== newValue) {
			if (name === "progress") {
				this.progress = this.parseProgress(newValue);
			} else if (name === "pattern") {
				this.pattern = newValue || "default";
			} else if (name === "show-progress") {
				this.showProgress = this.parseBoolean(newValue, true);
			} else if (name === "length") {
				this.length = newValue ? Number.parseInt(newValue, 10) : undefined;
			}
			this.render();
		}
	}

	public render(): void {
		const bar = AsciiProgressRenderer.render(this.progress, this.pattern, this.showProgress, this.length);
		if (this.shadowRoot) {
			if (!this.preElement) {
				this.preElement = document.createElement('pre');
				this.shadowRoot.appendChild(this.preElement);
			}
			this.preElement.textContent = bar;

			// Update ARIA valuenow
			const sanitizedProgress = Number.isNaN(this.progress) ? 0 : Math.min(100, Math.max(0, Math.round(this.progress)));
			this.setAttribute('aria-valuenow', sanitizedProgress.toString());
		}
	}
}

// Register the web component
AsciiProgressBar.register();
