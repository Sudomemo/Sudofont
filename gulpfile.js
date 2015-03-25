var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
function getTimestamp(){
	var date = new Date();
	var minute = date.getMinutes();
	var hour = date.getHours();
	var day = date.getDate();
	var month = date.getMonth()+1;
	var year = date.getFullYear();
	if(minute<10) { minute='0'+minute }
	if(hour<10) { hour='0'+hour }
	if(day<10) { day='0'+day }
	if(month<10) { month='0'+month } 
	return month+'/'+day+'/'+year+', '+hour+':'+minute;
};
var timeStamp = getTimestamp();
var fontName = 'sudofont'; // set name of your symbol font

gulp.task('symbols', function(){
  gulp.src("symbol-font-16px.sketch") // you can also choose "symbol-font-16px.sketch"
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
		timeStamp: timeStamp,
		fontPath: '../fonts/', // set path to font (from your CSS file if relative)
		className: 'sf' // set class name in your CSS
    }))
    .pipe(rename({ basename:fontName }))
    .pipe(gulp.dest('dist/css/')); // set path to export your CSS
  })
  .pipe(gulp.dest('dist/fonts/')); // set path to export your fonts
});