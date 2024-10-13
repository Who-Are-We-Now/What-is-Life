const fs = require('fs');
const esbuild = require("esbuild");
const htmlmin = require("html-minifier");

const markdownIt = require("markdown-it");
const markdownItBracketedSpans = require('markdown-it-bracketed-spans');
const markdownItAttrs = require('markdown-it-attrs')
const markdownItFootnote = require("markdown-it-footnote");

const figures = require("./src/_data/figures.json");
const figures_x = require("./src/_data/xfade.json");
const maps = require("./src/_data/maps.json");
const audio = require("./src/_data/audio.json");
const thumbnails = require("./src/_data/toc.json"); //read in thumbnail info file
const plots = require("./src/_data/plots.json"); //read in plots metadata file

const NOT_FOUND_PATH = "./docs/page-not-found/index.html";


// Add within your config module
const md = new markdownIt({
	html: true,
	linkify: true,
	typographer: true,
	quotes: '“”‘’'
});

const markdownLib = md.use(markdownItBracketedSpans).use(markdownItAttrs).use(markdownItFootnote);
markdownLib.renderer.rules.footnote_caption = (tokens, idx) => {
	let n = Number(tokens[idx].meta.id + 1).toString();
	if (tokens[idx].meta.subId > 0) {
		n += ":" + tokens[idx].meta.subId;
	}
	return n;
};

markdownLib.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
	var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
	var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
	var refid = id;

	if (tokens[idx].meta.subId > 0) {
		refid += ':' + tokens[idx].meta.subId;
	}

	return `<span id="ft-${refid}" class="reference">
						<sup class="footnote-ref">${caption}</sup>
					</span>`
}

markdownLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
	var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
	if (tokens[idx].meta.subId > 0) {
		id += ':' + tokens[idx].meta.subId;
	}
	/* ↩ with escape code to prevent display as Apple Emoji on iOS */
	return '';
}

module.exports = function (eleventyConfig) {

	eleventyConfig.addPassthroughCopy('./src/assets');
	eleventyConfig.setBrowserSyncConfig({
		files: './docs/assets/css/*.css',
		//404
		callbacks: {
			ready: function (err, bs) {

				bs.addMiddleware("*", (req, res) => {
					if (!fs.existsSync(NOT_FOUND_PATH)) {
						throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
					}

					const content_404 = fs.readFileSync(NOT_FOUND_PATH);
					// Add 404 http status code in request header.
					res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			}
		}
	});

	//markdown processing
	eleventyConfig.setLibrary('md', markdownLib);
	eleventyConfig.addFilter("markdown", (content) => {
		return md.renderInline(content);
	});

	// SHORTCODES

	eleventyConfig.addPairedShortcode('chapter', function (content, id) {
		//append to figures column
		return `<div id="${id}" class="chapter">
					${content}
				</div>`;
	});


	eleventyConfig.addPairedShortcode('chapter_opener', function (content) {
		//append to figures column
		return `<div class="chapter-opener">
					${content}
				</div>`;
	});


	// figure
	eleventyConfig.addPairedShortcode('img', function (content, id) {
		let img = figures[id];
		let contents = splitContent(content);

		try {
			if (img) {
				//append to figures column
				return `<div class="img-wrapper figarea" id="${id}">
							<div class="text-img ${id}-text">${contents[0]}</div>
							<div class="figure image ${img.indent} " id="${id}-fig">
								<figure class="${img.size}" id="${id}-img">
									<img src="/assets/images/${img.chapter}/${img.file_web[0]}" alt="${img.alt}" title="${img.alt}" id="${img.file_web[0]}"/>
									<figcaption>${img.caption}</figcaption>
								</figure>
							</div>
							<div class="text-img ${id}-text">${contents[1]}</div>
						</div>`;

			}
		} catch (error) {
			console.error(error);
		}
	});

	

	//figure: image crossfade
	eleventyConfig.addPairedShortcode('img_x', function (content, id) {
		let img_x = figures_x[id];
		let images = '';
		if (img_x) {
			img_x.input_imgs.forEach((img_x_object, i) => {

				const id = Object.keys(img_x_object)[0];
				const fileWebs = img_x_object[id].file_web;
				const alt = img_x_object[id].alt;
				const size = img_x_object[id].size;
				const caption = img_x_object[id].caption;

				fileWebs.forEach((fileWeb, j) => {
					// render each file_web image
					let xfadeindex;
					if (img_x.type === 'multi_caption') { // Multi-caption, with multiple image IDs
						xfadeindex = i;
					} else {
						// Single-caption, with many images under single ID
						xfadeindex = j;
					}
					images += `<figure class="${id} ${size}" data-xfadeindex="${xfadeindex}"><img src="/assets/images/${img_x.chapter}/${fileWeb}" alt="${alt}" title="${alt}">
							<figcaption>${caption}</figcaption></figure>`;
				});
			});

			let contents = splitContent(content);
			return `<div class="xfade-wrapper figarea" id="${id}">
						<div class="text-img text-crossfade ${id}-text">${contents[0]}</div>
						<div class="figure image crossfade ${img_x.type}" id="${id}-fig" data-active-fade="0">
						<div class="xfade-images">${images}</div>
						</div>
						<div class="text-img text-crossfade ${id}-text">${contents[1]}</div>
					</div>`;
		}
	});

	//map: side column maps 
	eleventyConfig.addPairedShortcode('map', function (content, id) {
		let embed = fs.readFileSync(`./src/assets/maps/${id}/index.html`);
		let map = maps[id];
		let maptype = maps[id].type;
		let contents = splitContent(content);
		try {
			if (map) {
				if (maptype == 'plot') {
					return `<div class="map-inline-wrapper figarea" id="${id}">
								<div class="text-img text-map ${id}-text">${contents[0]}</div>
								<div class="figure map" id="${id}-fig">
									<figure class="map-static map-${map.type}" id="${id}-map">
										<figcaption class="plot-header">
											<div class="plot-no">${map.plot_number}</div>
											<div class="plot-title">${map.caption} <span class="plot-axis-label">${map.axes_label}</span></div>
										</figcaption>${embed}</figure>
								</div>
								<div class="text-img text-map ${id}-text">${contents[1]}</div>
							</div>`;
				} else {
					return `<div class="map-inline-wrapper figarea" id="${id}">
								<div class="text-img text-map ${id}-text">${contents[0]}</div>
								<div class="figure map" id="${id}-fig">
									<figure class="map-static map-${map.type}" id="${id}-map">${embed}<figcaption>${map.caption}<span class="label">${map.axes_label}</span></figcaption></figure>
								</div>
								<div class="text-img text-map ${id}-text">${contents[1]}</div>
							</div>`;
				}
			}
		} catch (error) {
			console.error(error);
		}
	});

	//map_f: full-bleed crossfade maps
	eleventyConfig.addPairedShortcode('map_f', function (content, id) {
		let embed = fs.readFileSync(`./src/assets/maps/${id}/index.html`);
		let contents = splitContent(content);
		return `<div class="map-full-wrapper figarea fullbleed" id="${id}">
					<div class="text-img text-crossfade text-media ${id}-text">${contents[0]}</div>
					<div class="figure image map crossfade multi_caption" id="${id}-fig" data-active-fade="0">
					<div class="xfade-images">${embed}</div>
					</div>
					<div class="text-img text-crossfade text-media ${id}-text">${contents[1]}</div>
				</div>`;
	});


	//media: asset with custom code: darkmode transition, svg animation, etc
	eleventyConfig.addPairedShortcode('media', function (content, id) {
		let embed = fs.readFileSync(`./src/assets/media/${id}/index.html`);
		let img = figures[id];
		let contents = splitContent(content);
		return `<div class="media-wrapper figarea" id="${id}">
					<div class="text-img text-media ${id}-text">${contents[0]}</div>
					<div class="figure image media" id="${id}-fig">
						<figure class="media" id="${id}-media">${embed}<figcaption>${img.caption}</figcaption></figure>
					</div>
					<div class="text-img text-media ${id}-text">${contents[1]}</div>
				</div>`;

	});

	//media: full-bleed 
	eleventyConfig.addPairedShortcode('media_f', function (content, id) {
		let embed = fs.readFileSync(`./src/assets/media/${id}/index.html`);
		let contents = splitContent(content);
		return `<div class="media-wrapper figarea fullbleed" id="${id}">
					<div class="text-img text-media ${id}-text">${contents[0]}</div>
					<div class="figure image media-full" id="${id}-fig">
						<figure class="media" id="${id}-media">${embed}</figure>
					</div>
					<div class="text-img text-media ${id}-text">${contents[1]}</div>
				</div>`;
	});

	//audio
	eleventyConfig.addPairedShortcode('audio', function (content, id) {
		let audioclip = audio[id];
		let img = figures[id];
		let contents = splitContent(content);
		try {
			if (audioclip) {
				//append to figures column
				if (img) {
					return `<div class="audio-wrapper figarea" id="${id}">
							<div class="text-img" id="${id}-text">${contents[0]}</div>
							<div class="figure image audio single ${img.size}" id="${id}-fig">
							<figure id="${id}-audio">
							<img src="/assets/images/${img.chapter}/${img.file_web[0]}" alt="${img.alt}" title="${img.alt}" id="${img.file_web[0]}"/>
							<audio controls><source src="/assets/audio/${audioclip.file[0]}" type="audio/mpeg"></audio><figcaption>${img.caption}</figcaption></figure></div>
							<div class="text-img" id="${id}-text">${contents[1]}</div>
						</div>`;
				} else {
					return `<div class="audio-wrapper figarea" id="${id}">
							<div class="text-img" id="${id}-text">${contents[0]}</div>
							<div class="figure image audio" id="${id}-fig"><figure id="${id}-audio"><audio controls><source src="/assets/audio/${audioclip.file[0]}" type="audio/mpeg"></audio><figcaption>${audioclip.caption}</figcaption></figure>		</div>
							<div class="text-img" id="${id}-text">${contents[1]}</div>
						</div>`;
				}
			}
		} catch (error) {
			console.error(error);
		}
	});

	// link formula
	eleventyConfig.addPairedShortcode('link', function (content, url) {
		return `<a class="link_internal" href="/${url}">${content}</a>`;
	});


	eleventyConfig.addPairedShortcode('plot', function (content, id) {
		let plot_meta = plots[id];
		let xaxislabel = "";
		if (plot_meta) {
			// let plot_data = responses[id];
			let format = plot_meta.format;
			let axeslabel = "";
			if (typeof plot_meta.axes_label !== "undefined") {
				axeslabel = plot_meta.axes_label;
			}
			//split content for mobile rendering
			let contents = splitContent(content);
			let plotHTML = `<div class="plot-wrapper figarea" id="${id}" data-format="${format}">
								<div class="text-plot ${id}-text">${contents[0]}</div>
								<div class="figure chart" id="${id}-fig">
									<figure class="plot" id="${id}-plot" data-stops="" data-highlight="false">
										<div class="plot-info">
											<figcaption class="plot-header">
												<div class="plot-no">${plot_meta.plot_number}</div>
												<div class="plot-title">${plot_meta.title}</div>
												<div class="label-headers"></div>
												<div class="plot-axis-label">${axeslabel}</div>
											</figcaption>
											<div class="plot-controls">
												<button class="plot-binupdate" title="Adjust bins">↔</button>
												<button class="plot-data-dl"><a href="/assets/data/${id}.json" target="_blank" download="WhoAreWeNow_${id}.json" title="Download data">↓</a></button>
											</div>
										</div>
										<div class="plot-content"></div>
										<div class="plot-footer"><div class="xaxis-label"></div><div class="plot-labels"></div></div>
										<div class="plot-tips">											
											<div class="bin-tip"></div>
											<div class="plot-tip" data-series="0"></div>
											<div class="series-tip"></div>
										</div>
									</figure>
								</div>
								<div class="text-plot ${id}-text">${contents[1]}</div> 
							</div>`;

			if (format == "Bars") {
				let stops = '';
				//don’t do a 2-column setup for Bar charts
				plotHTML = `<div class="plot-wrapper figarea fullbleed" id="${id}" data-format="${format}">
								<div class="text-plot ${id}-text">${contents[0]}</div> 
								<div class="figure chart" id="${id}-fig">                  
									<figure class="plot" id="${id}-plot" data-stops="${stops}">
										<div class="plot-info">
											<figcaption class="plot-header">
											<div class="plot-no">${plot_meta.plot_number}</div>
											<div class="plot-title">${plot_meta.title}</div>
											<div class="label-headers"></div>
											<div class="plot-axis-label">${axeslabel}</div>
											</figcaption>
											<div class="plot-controls">
											<button class="plot-data-dl"><a href="/assets/data/${id}.json" target="_blank" download="WhoAreWeNow_${id}.json" title="Download data">↓</a></button>
											</div>
										</div>
										<div class="plot-content"></div>										
										<div class="plot-footer">
											<div class="plot-labels"></div>
										</div>
									</figure>
								</div>
								<div class="text-plot ${id}-text">${contents[1]}</div> 
							</div>`;
			}
			return plotHTML;
		}
	});

	eleventyConfig.addFilter('getChapterByNumber', function (collection, number) {
		let article;
		collection.forEach(item => {
			if (item.data.chapter == number) {
				article = item;
			};
		});
		return article;
	});


	//custom collections
	eleventyConfig.addCollection("toc", collection => {
		const articles = collection.getFilteredByTag("article")
			.sort((a, b) => {
				let chapterA = a.data.chapter === null ? 22 : Number(a.data.chapter);
				let chapterB = b.data.chapter === null ? 22 : Number(b.data.chapter);
				return chapterA - chapterB;
			});
		return articles;
	});




	// chapter + thumbnail

	eleventyConfig.addFilter('getChapterImages', (key) => {
		//filter figures by chapter
		let figuresArray = [];

		for (const id in thumbnails) {
			// fig = figures[id];
			thumbnail = thumbnails[id];
			if (thumbnail.chapter == key) {
				if (thumbnail) {
					figureData = { id: id, url: thumbnail["file_web"], thwidth: thumbnail["thumbnail_width"], xfade_id: thumbnail["xfade_name"], shortcode: thumbnail["shortcode"] }
					figuresArray.push(figureData);
					// console.log('id: ' + id + ', ' + thumbnail["thumbnail_width"]);
				}
			}

		}
		return figuresArray;

	});

	eleventyConfig.on("eleventy.before", async () => {
		await esbuild.build({
			entryPoints: ["./src/assets/js/script.js"],
			bundle: true,
			outdir: "docs/assets/js",
			entryNames: "bundle-[name]",
			minify: true,
			// platform: "node"
			platform: "browser" // updated to browser to handle bundle-script.js error
		});
	});


	eleventyConfig.addTransform("htmlmin", function (content) {
		if (this.inputPath.endsWith(".md") && this.page) {
			if (this.page.outputFileExtension == "html") {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true
				});
				return minified;
			}
		}
		return content;
	});


	return {
		dir: {
			input: "src",
			output: "docs",
			includes: "_layouts"
		}
	}



};

//HELPERS
function splitContent(content) {
	//split content for mobile rendering so that
	//HTML has the appropriate structure
	let contents = [];
	if (content.includes('~')) {
		contents = content.split('~');
	} else {
		contents[0] = content;
		contents[1] = "";
	}
	return contents;
}





