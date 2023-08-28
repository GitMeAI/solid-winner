// 11ty Plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

// Helper packages
const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "njk", 
    "html",
    "liquid"  // or any other template formats you're using
  ]);

  
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventySass);

  // Passthrough
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");

  // Shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

 
  
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md");
});


  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      class: "tdbc-anchor",
      space: false,
      symbol: "",  // Set the symbol to an empty string to hide the default "#"

    }),
    level: [1, 2, 3],
    slugify: (str) =>
      slugify(str, {
        lower: true,
        strict: true,
        remove: /["]/g,
      }),
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts",
    },
  };
};








// // 11ty Plugins
// const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const pluginRss = require("@11ty/eleventy-plugin-rss");
// const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

// // Helper packages
// const slugify = require("slugify");
// const markdownIt = require("markdown-it");
// const markdownItAnchor = require("markdown-it-anchor");

// module.exports = function (eleventyConfig) {
//   eleventyConfig.addPlugin(syntaxHighlight);
//   eleventyConfig.addPlugin(pluginRss);
//   eleventyConfig.addPlugin(eleventySass);

//   eleventyConfig.addPassthroughCopy("./src/fonts");
//   eleventyConfig.addPassthroughCopy("./src/img");
//   eleventyConfig.addPassthroughCopy("./src/favicon.png");

//   eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

//   // Adding a new collection for articles
//   // eleventyConfig.addCollection("articles", function(collectionApi) {
//   //   return collectionApi.getFilteredByGlob("src/articles/*.md");
//   // });
//   module.exports = function(eleventyConfig) {
//     eleventyConfig.addCollection("articles", function(collectionApi) {
//       return collectionApi.getFilteredByGlob("**/*.md").sort((a, b) => {
//         return new Date(b.data.publishDate) - new Date(a.data.publishDate);
//       });
//     });
//   };
  

//   /* Markdown Overrides */
//   let markdownLibrary = markdownIt({
//     html: true,
//   }).use(markdownItAnchor, {
//     permalink: markdownItAnchor.permalink.ariaHidden({
//       class: "tdbc-anchor",
//       space: false,
//     }),
//     level: [1, 2, 3],
//     slugify: (str) =>
//       slugify(str, {
//         lower: true,
//         strict: true,
//         remove: /["]/g,
//       }),
//   });
//   eleventyConfig.setLibrary("md", markdownLibrary);

//   return {
//     dir: {
//       input: "src",
//       output: "public",
//       layouts: "_layouts",
//     },
//   };
// };
