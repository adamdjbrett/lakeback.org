import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import yaml from "js-yaml";
import markdownIt from 'markdown-it';
import markdownItAnchor from "markdown-it-anchor";
import pluginFilters from "./_config/filters.js";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import pluginTOC from 'eleventy-plugin-toc';
import CleanCSS from "clean-css";
import { stripHtml } from "string-strip-html";
export default async function(eleventyConfig) {
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		// Explicitly copy favicon to root for https://lakeback.org/favicon.ico
		.addPassthroughCopy({
			"public/img/favicon/favicon.ico": "favicon.ico"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});
	eleventyConfig.on("eleventy.after", () => {
		const pagefindBin = path.join(
			process.cwd(),
			"node_modules",
			".bin",
			process.platform === "win32" ? "pagefind.cmd" : "pagefind"
		);

		if (!existsSync(pagefindBin)) {
			console.warn("[11ty] Skipping Pagefind: local binary not found.");
			return;
		}

		try {
			execFileSync(pagefindBin, ["--site", "_site", "--glob", "**/*.html"], { stdio: "inherit" });
		} catch (error) {
			console.warn("[11ty] Pagefind indexing failed; continuing build.");
		}
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(IdAttributePlugin, {
		slugify: (text) => {
		  const slug = eleventyConfig.getFilter("slugify")(text);
		  return `print-${slug}`;
		}
	  });
	  eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: ".",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});
	eleventyConfig.addPlugin(IdAttributePlugin, {
		slugify: (text) => {
		  const slug = eleventyConfig.getFilter("slugify")(text);
		  return `print-${slug}`;
		}
	  });
	  eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h2', 'h3', 'h4', 'h5'],
		  id: 'toci', 
		  class: 'list-group',
		ul: true,
		flat: false,
		wrapper: 'div'
	  });
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "Feed",
				order: 4
			}
		},
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Blog Title",
			subtitle: "This is a longer description about your blog.",
			base: "https://example.com/",
			author: {
				name: "Your Name"
			}
		}
	});

  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  eleventyConfig.addFilter("md", function(content) {
    return md.render(content);
  });

  eleventyConfig.addShortcode("ctaButton", function(href, text) {
    return `<a class="btn btn-cta" href="${href}">${text}</a>`;
  });

	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(IdAttributePlugin, {
	});
	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});
};
export const config = {
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: {
		input: "content",
		includes: "../_includes",
		data: "../_data",
		output: "_site"
	},

};
