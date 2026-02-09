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

	it("should have ARIA attributes", () => {
		const element = document.createElement("ascii-progress-bar");
		document.body.appendChild(element);

		expect(element.getAttribute("role")).toBe("progressbar");
		expect(element.getAttribute("aria-valuemin")).toBe("0");
		expect(element.getAttribute("aria-valuemax")).toBe("100");
	});

	it("should update aria-valuenow when progress changes", () => {
		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("progress", "50");
		document.body.appendChild(element);

		expect(element.getAttribute("aria-valuenow")).toBe("50");

		element.setAttribute("progress", "75");
		expect(element.getAttribute("aria-valuenow")).toBe("75");
	});

	it("should clamp aria-valuenow between 0 and 100", () => {
		const element = document.createElement("ascii-progress-bar");

		element.setAttribute("progress", "150");
		document.body.appendChild(element);
		expect(element.getAttribute("aria-valuenow")).toBe("100");

		element.setAttribute("progress", "-50");
		expect(element.getAttribute("aria-valuenow")).toBe("0");
	});

	it("should handle NaN progress gracefully", () => {
		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("progress", "invalid");
		document.body.appendChild(element);

		expect(element.getAttribute("aria-valuenow")).toBe("0");
		const pre = element.shadowRoot?.querySelector("pre");
		expect(pre?.textContent).toContain("0%");
	});

	it("should update progress when attribute changes", () => {
		const element = document.createElement("ascii-progress-bar");
		document.body.appendChild(element);

		element.setAttribute("progress", "50");

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		expect(pre?.textContent).toContain("50%");
	});

	it("should allow overriding length via attribute", () => {
		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("progress", "50");
		element.setAttribute("length", "20");
		document.body.appendChild(element);

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		// Default pattern 'default' has length 10. Override to 20 should double the characters.
		// progress 50% of 20 is 10 filled characters.
		expect(pre?.textContent).toBe("■■■■■■■■■■□□□□□□□□□□ 50%");
	});

	it("should update pattern when attribute changes", () => {
		const element = document.createElement("ascii-progress-bar");
		document.body.appendChild(element);

		element.setAttribute("pattern", "dots");

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
		["false", false],
		["random", true],
	])("should handle show-progress value '%s' correctly", (value, shouldShow) => {
		const element = document.createElement("ascii-progress-bar");
		element.setAttribute("progress", "50");
		if (value !== "") {
			element.setAttribute("show-progress", value);
		}
		document.body.appendChild(element);

		const shadow = element.shadowRoot;
		const pre = shadow?.querySelector("pre");
		const expected = shouldShow ? "■■■■■□□□□□ 50%" : "■■■■■□□□□□";
		expect(pre?.textContent).toBe(expected);
	});
});
