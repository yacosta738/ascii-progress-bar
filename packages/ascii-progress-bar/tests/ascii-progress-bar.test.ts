import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AsciiProgressBar } from "../src/ascii-progress-bar";
import type { Pattern } from "../src/types";

describe("AsciiProgressBar", () => {
	beforeEach(() => {
		// Register the component before each test
		AsciiProgressBar.register();
	});

	afterEach(() => {
		// Clean up the DOM after each test
		document.body.innerHTML = "";
	});

	it("should register as a custom element", () => {
		expect(customElements.get("ascii-progress-bar")).toBeDefined();
	});

	it("should render with default values", () => {
		const element = document.createElement("ascii-progress-bar");
		document.body.appendChild(element);

		const shadow = element.shadowRoot;
		expect(shadow).toBeDefined();
		expect(shadow?.querySelector("pre")).toBeDefined();
	});

	it("should update progress when attribute changes", () => {
		const element = document.createElement("ascii-progress-bar");
		document.body.appendChild(element);

		element.setAttribute("progress", "50");

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		expect(pre?.textContent).toBeTruthy();
	});

	it("should update pattern when attribute changes", () => {
		const element = document.createElement("ascii-progress-bar");
		document.body.appendChild(element);

		element.setAttribute("pattern", "custom");

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		expect(pre?.textContent).toBeTruthy();
	});

	it("should allow adding custom patterns", () => {
		const customPattern: Pattern = {
			empty: "-",
			filled: "+",
			length: 10,
		};

		AsciiProgressBar.addPattern("custom-test", customPattern);

		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("pattern", "custom-test");
		document.body.appendChild(element);

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		expect(pre?.textContent).toBeTruthy();
	});

	it("should not re-register component with same tag name", () => {
		// Attempting to register again should not throw
		expect(() => AsciiProgressBar.register()).not.toThrow();
	});

	it("should show progress percentage by default", () => {
		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("progress", "50");
		document.body.appendChild(element);

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		expect(pre?.textContent).toBe("■■■■■□□□□□ 50%");
	});

	it.each([
		["", true],
		["true", true],
		["false", false]
	])("should handle show-progress value %s correctly", (value, shouldShow) => {
		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("progress", "50");
		if (value !== "") {
			element.setAttribute("show-progress", value);
		}
		document.body.appendChild(element);

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		const actual = pre?.textContent;
		const expected = shouldShow ? "■■■■■□□□□□ 50%" : "■■■■■□□□□□";
		expect(pre?.textContent).toBe(shouldShow ? "■■■■■□□□□□ 50%" : "■■■■■□□□□□");
	});
});
