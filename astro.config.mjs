// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	site: "https://yacosta738.github.io",
	base: "ascii-progress-bar",
	image: {
		service: passthroughImageService(),
	},
	integrations: [
		starlight({
			title: "ASCII Progress Bar",
			defaultLocale: "root",
			locales: {
				root: {
					label: "English",
					lang: "en",
				},
				// Spanish docs in `src/content/docs/es/`
				es: {
					label: "Español",
				},
			},
			social: {
				github: "https://github.com/yacosta738/ascii-progress-bar",
			},
			sidebar: [
				{
					label: "Guides",
					translations: {
						es: "Guías",
					},
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Installation Guide",
							translations: {
								es: "Guía de Instalación",
							},
							slug: "guides/installation",
						},
					],
				},
				{
					label: "Examples",
					translations: {
						es: "Ejemplos",
					},
					items: [
						{
							label: "All Examples",
							translations: {
								es: "Todos los Ejemplos",
							},
							slug: "examples/all",
						},
						{
							label: "Console Example",
							translations: {
								es: "Ejemplo en Consola",
							},
							slug: "examples/console",
						},
						{
							label: "Web Example",
							translations: {
								es: "Ejemplo Web",
							},
							slug: "examples/web-component",
						},
						{
							label: "Customization",
							translations: {
								es: "Personalización",
							},
							items: [
								{
									label: "Custom Characters",
									translations: {
										es: "Caracteres Personalizados",
									},
									slug: "examples/chars",
								},
							],
						},
					],
				},
			],
		}),
	],
});
