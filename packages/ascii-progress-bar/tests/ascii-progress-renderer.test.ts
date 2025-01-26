import { beforeEach, describe, expect, it } from "vitest";
import { AsciiProgressRenderer } from "../src/ascii-progress-renderer";
import type { Pattern } from "../src/types";

describe("AsciiProgressRenderer", () => {
	beforeEach(() => {
		// Reset patterns map before each test
		AsciiProgressRenderer.patternsMap.clear();
	});

	it("should initialize default patterns", () => {
		AsciiProgressRenderer.render(50);
		expect(AsciiProgressRenderer.patternsMap.size).toBeGreaterThan(0);
	});

	it("should add a new pattern", () => {
		const newPattern: Pattern = { empty: "-", filled: "=", length: 10 };
		AsciiProgressRenderer.addPattern("custom", newPattern);
		expect(AsciiProgressRenderer.patternsMap.get("custom")).toEqual(newPattern);
	});

	it("should render progress with default pattern", () => {
		const result = AsciiProgressRenderer.render(50);
		expect(result).toBe("■■■■■□□□□□ 50%");
	});

	it("should render progress with custom pattern", () => {
		const newPattern: Pattern = { empty: "-", filled: "=", length: 10 };
		AsciiProgressRenderer.addPattern("custom", newPattern);
		const result = AsciiProgressRenderer.render(50, "custom");
		expect(result).toBe("=====----- 50%");
	});

	it("should return undefined for non-existent pattern", () => {
		const pattern = AsciiProgressRenderer.getPattern("non-existent");
		expect(pattern).toBeUndefined();
	});
});
