const gulp =        require("gulp");
const rename =      require("gulp-rename");
const sketch =      require("gulp-sketch");
const svgo =        require("gulp-svgo");
const iconfont =    require("gulp-iconfont");
const consolidate = require("gulp-consolidate");
const fs = require("fs");

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

gulp.task("font:svg", () => {
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
      const options = {
        className: font.className,
        fontName: font.name,
        fontPath: paths.fontCSS,
        glyphs: glyphs.map((glyph) => {
          return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
        })
      };

      gulp.src("src/templates/template.scss")
        .pipe(consolidate("lodash", options))
        .pipe(rename({ basename: font.name }))
        .pipe(gulp.dest("dist/scss/")) // set path to export your CSS

    })
    .pipe(gulp.dest(paths.fontOut));
});

gulp.task("font:scss", function() {
  // Read the JSOn from IcoMoon
  var font = JSON.parse(fs.readFileSync(filepaths.fontJSON, "utf8"));
  // Compile the template based on the data
  return gulp.src(filepaths.scssTemplatePath)
    .pipe(consolidate("lodash", {
      fontPath: filepaths.relFontPath,
      name: font.metadata.name,
      icons: font.iconSets[0].selection,
      prefix: font.preferences.fontPref.prefix,
      classSelector: font.preferences.fontPref.classSelector
    }))
    .pipe(rename({basename:font.metadata.name}))
    .pipe(gulp.dest(filepaths.scssPath))
});
