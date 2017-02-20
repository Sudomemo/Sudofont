var gulp =        require('gulp');
var rename =      require('gulp-rename');
var sketch =      require('gulp-sketch');
var svgo =        require('gulp-svgo');
var iconfont =    require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var fs = require('fs');

var filepaths = {
  fontJSON: 'src/sudofont.json',
  sketchPath: 'src/sudofont.sketch',
  scssTemplatePath: 'src/templates/template.scss',
  scssPath: 'dist/scss/',
  svgPath: 'dist/svg/',
  fontPath: 'dist/fonts/',
  relFontPath: '../fonts/'
};

gulp.task('font:svg', function() {
  // Sketch file goes in
  gulp.src(filepaths.sketchPath)
    // Export each sketch artboard to svg
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    // Minify each svg image
    .pipe(svgo())
    // Export to svg
    .pipe(gulp.dest(filepaths.svgPath))
    .pipe(iconfont({
      fontName: 'sudofont', // required
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
      //timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('font:scss', function() {
  // Read the JSOn from IcoMoon
  var font = JSON.parse(fs.readFileSync(filepaths.fontJSON, 'utf8'));
  // Compile the template based on the data
  return gulp.src(filepaths.scssTemplatePath)
    .pipe(consolidate('lodash', {
      fontPath: filepaths.relFontPath,
      name: font.metadata.name,
      icons: font.iconSets[0].selection,
      prefix: font.preferences.fontPref.prefix,
      classSelector: font.preferences.fontPref.classSelector
    }))
    .pipe(rename({basename:font.metadata.name}))
    .pipe(gulp.dest(filepaths.scssPath))
});
