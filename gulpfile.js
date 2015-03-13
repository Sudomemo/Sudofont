var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
function getDate(){
	var date = new Date();
	var dd = date.getDate();
	var mm = date.getMonth()+1;
	var yyyy = date.getFullYear();
	if(dd<10) { dd='0'+dd }
	if(mm<10) { mm='0'+mm } 
	return mm+'/'+dd+'/'+yyyy;
};
var fontName = 'sudofont';

gulp.task('symbols', function(){
  gulp.src("symbol-font-16px.sketch")
  .pipe(sketch({
    export: 'artboards',
    formats: 'svg'
  }))
  .pipe(iconfont({ fontName: fontName }))
  .on('codepoints', function(codepoints) {
    gulp.src('templates/fontawesome-style.css')
    .pipe(consolidate('lodash', {
		glyphs: codepoints,
		fontName: fontName,
		timeStamp: getDate(),
		fontPath: '../fonts/',
		className: 'sf'
    }))
    .pipe(rename({ basename:fontName }))
    .pipe(gulp.dest('dist/css/'));
  })
  .pipe(gulp.dest('dist/fonts/'));
});