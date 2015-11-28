var gulp =        require('gulp');
var rename =      require('gulp-rename');
var sketch =      require('gulp-sketch');
var iconfont =    require('gulp-iconfont');
var minifyimg =   require('gulp-imagemin');
var consolidate = require('gulp-consolidate');

var filepaths = {
    sketchPath: 'sudofont.sketch',
    scssTemplatePath: 'templates/sudofont-template.scss',
    scssPath: 'build/scss/',
    fontPath: 'build/fonts/',
    relFontPath: '../fonts/'
};

// gulp font
gulp.task('font', function() {
	// Sketch file goes in
	gulp.src(filepaths.sketchPath)
		// Export each sketch artboard to svg
		.pipe(sketch({
			export: 'artboards',
			formats: 'svg'
		}))
		// Minify each svg image
		.pipe(minifyimg())
		// Build svgs into a font
		.pipe(iconfont({
			fontName: 'sudofont',
			fontHeight: 256, // (this is the Sketch artboard height)
			descent: 32,
			formats: ['ttf', 'eot', 'woff', 'woff2'],
		}))
		// When the font is done, make the .scss file
		.on('glyphs', function(glyphs, options) {
			gulp.src(filepaths.scssTemplatePath)
				.pipe(consolidate('lodash', {
					glyphs: glyphs,
					fontName: 'sudofont',
					fontPath: filepaths.relFontPath,
					className: 'sf'
				}))
				.pipe(rename({basename:'sudofont'}))
				.pipe(gulp.dest(filepaths.scssPath))
		})
		// Font comes out
		.pipe(gulp.dest(filepaths.fontPath))
});
