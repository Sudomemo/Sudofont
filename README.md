<h1>Sudofont</h1>
This is just a modified version of <a href="https://github.com/cognitom/symbols-for-sketch">symbols-for-sketch</a> for use on a new project.<br><br>
What I've done:<br>
&bull; gulpfile.js now (lazily) generates a timestamp and then passes that to the CSS template (for easy version control). <br>
&bull; I've also filled in the FontHeight and descent values so that gulp-iconfont will align the icons nicely. <br>
&bull; fontawesome-style.css has been modified to be up-to-date with the most recent Font Awesome release, and I've also added the '-stack' classes.<br>
&bull; One of the things we needed was support for the Nintendo DSi's special characters (range 0xE000 to 0xF8FF), which can be used in system usernames. So, I have made sure that they can be inserted using their proper character codes directly into the HTML with something like this: <br>
<code>&lt;i class="sf ds"&gt; &amp;#xE000; &amp;#xE001; &amp;#xE002; &amp;#xE003; &lt;/i&gt;</code> <br>
&bull; And obviously, the .sketch file is the icon font itself. <br><br>
Nothing amazing, I know. This is what we needed, though.
