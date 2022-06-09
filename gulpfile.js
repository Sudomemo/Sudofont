"use strict";

const gulp = require("gulp");
const rename = require("gulp-rename");
const svgo = require("gulp-svgo");
const iconfont = require("gulp-iconfont");
const consolidate = require("gulp-consolidate");
const fs = require("fs");
const svgLoader = require("./src/sudofont-svg-loader");

let paths = {
  svgIn: "src/svg/",
  scssTemplate: "src/templates/template.scss",
  scssOut: "dist/scss/",
  svgOut: "dist/svg/",
  fontOut: "dist/fonts/",
  fontCSS: "../fonts/",
};

let font = {
  name: "sudofont",
  formats: ["ttf", "eot", "woff", "woff2", "svg"],
  className: "sf",
};

function getUnicodeRange(array) {
  var ranges = [],
    rstart,
    rend;
  for (var i = 0; i < array.length; i++) {
    rstart = array[i];
    rend = rstart;
    while (array[i + 1] - array[i] == 1) {
      rend = array[i + 1];
      i++;
    }
    let starthex = rstart.toString(16).toUpperCase();
    let endhex = rend.toString(16).toUpperCase();
    ranges.push(
      rstart == rend ? "U+" + starthex + "" : "U+" + starthex + "-" + endhex
    );
  }
  return ranges.join(", ");
}

gulp.task("build", () => {
  // read src/unicode_to_key_mappings.json
  let unicode_to_key_mappings = Object.entries(
    JSON.parse(fs.readFileSync("./src/unicode_to_key_mappings.json"))
  );
  // run svgLoader through gulp
  let vinylFiles = svgLoader(paths.svgIn, unicode_to_key_mappings);

  let stream = gulp.src(".");

  for (let vinylFile of vinylFiles) {
    stream.write(vinylFile);
  }

  debugger;

  stream
      // Minify each svg image
      // todo: svgo is breaking the build
      //.pipe(svgo())
      // Export to svg
      .pipe(gulp.dest(paths.svgOut))
      .pipe(
        iconfont({
          fontName: font.name,
          prependUnicode: true,
          formats: font.formats,
          fontHeight: 240,
          descent: 40,
        })
      )
      .on("glyphs", (glyphs) => {
        glyphs = glyphs
          .map((glyph) => {
            let codepoint = glyph.unicode[0].codePointAt(0);
            return {
              name: glyph.name,
              codepoint: codepoint,
            };
          })
          .sort((a, b) => {
            return a.codepoint - b.codepoint;
          });

        let codepoints = glyphs.map((glyph) => {
          return glyph.codepoint;
        });

        const options = {
          className: font.className,
          fontName: font.name,
          fontPath: paths.fontCSS,
          unicodeRange: getUnicodeRange(codepoints),
          glyphs: glyphs,
        };

        gulp
          .src("src/templates/template.scss")
          .pipe(consolidate("lodash", options))
          .pipe(rename({ basename: font.name }))
          .pipe(gulp.dest("dist/scss/"));

        gulp
          .src("src/templates/template.css")
          .pipe(consolidate("lodash", options))
          .pipe(rename({ basename: font.name }))
          .pipe(gulp.dest("dist/css/"));

        gulp
          .src("src/templates/template.html")
          .pipe(consolidate("lodash", options))
          .pipe(rename({ basename: "test" }))
          .pipe(gulp.dest("dist"));
      })
      .pipe(gulp.dest(paths.fontOut))
  
});
