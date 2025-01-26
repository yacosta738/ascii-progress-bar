import { AsciiProgressRenderer } from "./ascii-progress-renderer";
import type { Pattern } from "./types";

export class AsciiProgressBar extends HTMLElement {
	private progress: number;
	private pattern: string;
	private showProgress: boolean;

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
		this.progress = Number.parseFloat(this.getAttribute("progress") || "0");
		this.pattern = this.getAttribute("pattern") || "default";
		this.showProgress = this.getAttribute("show-progress") !== "false";
	}

	connectedCallback(): void {
		this.render();
	}

	static get observedAttributes(): string[] {
		return ["progress", "pattern", "show-progress"];
	}

	attributeChangedCallback(
		name: string,
		oldValue: string,
		newValue: string,
	): void {
		if (oldValue !== newValue) {
			if (name === "progress") {
				this.progress = Number.parseFloat(newValue);
			} else if (name === "pattern") {
				this.pattern = newValue;
			} else if (name === "show-progress") {
				this.showProgress = newValue !== "false";
			}
			this.render();
		}
	}

	public render(): void {
		const bar = AsciiProgressRenderer.render(this.progress, this.pattern, this.showProgress);
		if (this.shadowRoot) {
			const pre = document.createElement('pre');
			pre.textContent = bar;
			this.shadowRoot.appendChild(pre);
		}
	}
}

// Register the web component
AsciiProgressBar.register();
