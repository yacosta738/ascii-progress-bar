// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService()
  },
  integrations: [
    starlight({
      title: "ASCII Progress Bar",
      social: {
        github: "https://github.com/yacosta738/ascii-progress-bar",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Installation Guide", slug: "guides/installation" },
          ],
        },
        {
          label: "Examples",
          items: [
            { label: "All Examples", slug: "examples/all" },
            { label: "Console Example", slug: "examples/console" },
            { label: "Web Example", slug: "examples/web-component" },
			{ label: "Customization", items:[
				{ label: "Custom Characters", slug: "examples/chars" },
			] },
          ],
        }
      ],
    }),
  ],
});
