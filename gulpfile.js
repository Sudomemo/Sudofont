var gulp =        require('gulp');
var rename =      require('gulp-rename');
var sketch =      require('gulp-sketch');
var minifyimg =   require('gulp-imagemin');
var consolidate = require('gulp-consolidate');
var fs = require('fs');

var filepaths = {
  fontJSON: 'sudofont.json',
  sketchPath: 'sudofont.sketch',
  scssTemplatePath: 'templates/template.scss',
  scssPath: 'build/scss/',
  svgPath: 'build/svg/',
  fontPath: 'build/fonts/',
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
    .pipe(minifyimg())
    // Export to svg
    .pipe(gulp.dest(filepaths.svgPath))
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

