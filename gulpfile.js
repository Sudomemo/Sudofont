const gulp =        require("gulp");
const rename =      require("gulp-rename");
const sketch =      require("gulp-sketch");
const svgo =        require("gulp-svgo");
const iconfont =    require("gulp-iconfont");
const consolidate = require("gulp-consolidate");
const fs = require("fs");
var _ = require('lodash');

let paths = {
  sketch: "src/sudofont.sketch",
  scssTemplate: "src/templates/template.scss",
  scssOut: "dist/scss/",
  svgOut: "dist/svg/",
  fontOut: "dist/fonts/",
  fontCSS: "../fonts/"
};

let font = {
  name: "sudofont",
  formats: ["ttf", "eot", "woff", "woff2", "svg"],
  className: "sf",
};

gulp.task("build", () => {
  // Sketch file goes in
  gulp.src(paths.sketch)
    // Export each sketch artboard to svg
    .pipe(sketch({
      export: "artboards",
      formats: "svg"
    }))
    // Minify each svg image
    .pipe(svgo())

    // Export to svg
    .pipe(gulp.dest(paths.svgOut))
    .pipe(iconfont({
      fontName: font.name,
      prependUnicode: true,
      formats: font.formats,
      fontHeight: 240,
      descent: 40,
    }))
    .on("glyphs", (glyphs) => {

      glyphs = glyphs.map((glyph) => {
        let codepoint = glyph.unicode[0].charCodeAt(0);
        return {
          name: glyph.name,
          codepoint: codepoint,
        }
      });

      let unicodeRange = glyphs.reduce((stack, glyph) => {
        // get the codepoint for the current item
        let codepoint = glyph.codepoint;
        // let most recent segment in the stack
        let segment = _.last(stack);
        let segmentIndex = _.lastIndexOf(stack, segment);
        // get the start and end values of the segment, if present
        let segmentStart = _.first(segment);
        let segmentEnd = _.last(segment);
        // if the segment has no start value, then we just push the current codepoint to it
        if (!segmentStart) {
          stack[segmentIndex].push(codepoint);
        }
        // if there's no segment end, and the current codepoint is just one value above the segment start, add it to the segment
        else if ((!segmentEnd) && (codepoint === segmentStart + 1)) {
          stack[segmentIndex].push(codepoint);
        }
        // same as the above, but if the IS already a segment end, we wanna replace it
        else if ((segmentEnd) && (codepoint === segmentEnd + 1)) {
          stack[segmentIndex][1] = codepoint;
        }
        // if the codepoint is more than 1 value above the segment end, start a new segment
        else if (codepoint > segmentEnd + 1) {
          stack.push([codepoint]);
        }
        return stack;
      }, [[]])
      // at this point, the result will be an array of range segments, like:
      // [[53340, 53360], [53365, 53370], [53370]]
      // loop through each segment
      .map((segment) => {
        // start the segment with "U+"
        return "U+" + segment.map((codepoint) => {
          // convert each segment codepoint to hex
          return codepoint.toString(16).toUpperCase()
        // convert the segment to a string, joining the segment start / end codepoints with "-"
        }).join("-");
      // covert the segment stack to a string, joining each segment with ", "
      }).join(", ")

      const options = {
        className: font.className,
        fontName: font.name,
        fontPath: paths.fontCSS,
        unicodeRange: unicodeRange,
        glyphs: glyphs
      };

      gulp.src("src/templates/template.scss")
        .pipe(consolidate("lodash", options))
        .pipe(rename({ basename: font.name }))
        .pipe(gulp.dest("dist/scss/"))

      gulp.src("src/templates/template.css")
        .pipe(consolidate("lodash", options))
        .pipe(rename({ basename: font.name }))
        .pipe(gulp.dest("dist/css/"))

      gulp.src("src/templates/template.html")
        .pipe(consolidate("lodash", options))
        .pipe(rename({ basename: "test" }))
        .pipe(gulp.dest("dist"))

    })
    .pipe(gulp.dest(paths.fontOut));
});
