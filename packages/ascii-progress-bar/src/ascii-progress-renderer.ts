import type { Pattern, Patterns } from "./types";

export const AsciiProgressRenderer = {
	patternsMap: new Map<string, Pattern>(),

	initializeDefaultPatterns() {
		if (AsciiProgressRenderer.patternsMap.size === 0) {
			const defaultPatterns: Patterns = {
				default: { empty: "□", filled: "■", length: 10 },
				dots: { empty: ".", filled: "o", length: 20 },
				stars: { empty: " ", filled: "*", length: 10 },
				hashes: { empty: " ", filled: "#", length: 10 },
				circles: { empty: "○", filled: "◉", length: 10 },
				braille: { empty: "⣀", filled: "⣿", length: 8 },
				minimal: { empty: "▱", filled: "▰", length: 5 },
				blocks: { empty: "▯", filled: "▮", length: 10 },
			};

			for (const [name, pattern] of Object.entries(defaultPatterns)) {
				AsciiProgressRenderer.patternsMap.set(name, pattern);
			}
		}
	},

	addPattern(name: string, pattern: Pattern): void {
		AsciiProgressRenderer.initializeDefaultPatterns();
		if (pattern.empty && pattern.filled && pattern.length) {
			AsciiProgressRenderer.patternsMap.set(name, pattern);
		}
	},

	render(
		progress: number,
		patternName = "default",
		showProgress = true,
		lengthOverride?: number,
	): string {
		AsciiProgressRenderer.initializeDefaultPatterns();
		const pattern =
			AsciiProgressRenderer.patternsMap.get(patternName) ||
			AsciiProgressRenderer.patternsMap.get("default");

		if (!pattern) {
			console.warn(`Pattern ${patternName} not found, using default`);
			return AsciiProgressRenderer.render(
				progress,
				"default",
				showProgress,
				lengthOverride,
			);
		}

		// Clamp progress between 0 and 100 and handle NaN
		const sanitizedProgress = Number.isNaN(progress)
			? 0
			: Math.min(100, Math.max(0, progress));

		const { empty, filled, length: patternLength } = pattern;
		const length = lengthOverride || patternLength;
		const filledCount = Math.round((sanitizedProgress / 100) * length);
		const emptyCount = length - filledCount;
		const progressText = showProgress
			? ` ${Math.round(sanitizedProgress)}%`
			: "";
		return `${filled.repeat(filledCount)}${empty.repeat(emptyCount)}${progressText}`;
	},

	getPattern(name: string): Pattern | undefined {
		AsciiProgressRenderer.initializeDefaultPatterns();
		return AsciiProgressRenderer.patternsMap.get(name);
	},
};
