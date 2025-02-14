import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

  eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });
	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

// tambahan
  eleventyConfig.addCollection("authors", function(collectionApi) {
    const allPosts = collectionApi.getAll();
    const authors = new Set();
    allPosts.forEach(post => {
      if (post.data.authors) {
        post.data.authors.forEach(author => authors.add(author));
      }
    });
    
    // Ambil data authors dari file JSON
    const authorsData = allPosts[0].data.authors || [];

    const result = Array.from(authors).map(authorKey => {
      const authorData = authorsData.find(a => a.key === authorKey);
      if (!authorData) {
        console.warn(`Warning: No data found for author with key "${authorKey}"`);
        return null;
      }
      return {
        key: authorKey,
        ...authorData
      };
    }).filter(Boolean); // Remove null entries

    console.log("Final authors collection:", result);
    return result;
  });

  // Tambahkan filter untuk mendapatkan author berdasarkan key
  eleventyConfig.addFilter("getAuthor", (authors, key) => {
    if (!authors || !Array.isArray(authors)) {
      console.log("Authors data is not an array:", authors);
      return null;
    }
    return authors.find(author => author.key === key);
  });

  // Tambahkan filter untuk mendapatkan posts berdasarkan author
  eleventyConfig.addFilter("getPostsByAuthor", (posts, authorKey) => {
    if (!posts || !Array.isArray(posts)) {
      return [];
    }
    return posts.filter(post => {
      if (!post.data.authors) return false;
      return post.data.authors.includes(authorKey);
    });
  });


// tambahan

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts", "timelines"].indexOf(tag) === -1);
	});

};
