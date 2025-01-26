import { AsciiProgressRenderer } from "@yacosta738/ascii-progress-bar";

// Helper function to simulate delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Static demo
console.log("\nStatic demonstrations:");
console.log("Default:  ", AsciiProgressRenderer.render(75, "default"));
console.log("Dots:     ", AsciiProgressRenderer.render(60, "dots"));
console.log("Stars:    ", AsciiProgressRenderer.render(40, "stars"));
console.log("Braille:  ", AsciiProgressRenderer.render(80, "braille"));
console.log("Minimal:  ", AsciiProgressRenderer.render(50, "minimal"));
console.log("Blocks:   ", AsciiProgressRenderer.render(65, "blocks"));

// Animated demo
async function animateProgress() {
	console.log("\nAnimated demo:");
	for (let i = 0; i <= 100; i += 5) {
		// Clear previous line
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		// Render the bar
		process.stdout.write(AsciiProgressRenderer.render(i, "blocks"));
		await sleep(200);
	}
	console.log("\n");
}

// Run animated demo
animateProgress();
