const temporary = require("temporary");
const gutil     = require("gulp-util");
const fs        = require("fs");
const path      = require("path");
const recursive = require("recursive-readdir");
const rimraf    = require("rimraf");
//const vinyl     = require("vinyl");

module.exports = function(svgDir, unicode_to_key_mappings) {
    // temp dir
    const tempDir = new temporary.Dir();
    // for each unicode_to_key_mapping (prefix, svg name) copy svg to tempDir/u{prefix}-{svg name}.svg
    for (let unicode_to_key_mapping of unicode_to_key_mappings) {
        const prefix = unicode_to_key_mapping[0];
        const svgName = unicode_to_key_mapping[1];
        const svgPath = path.join(svgDir, svgName + ".svg");
        const tempPath = path.join(tempDir.path, "u" + prefix + "-" + svgName + ".svg");
        fs.copyFileSync(svgPath, tempPath);
    }
    
    recursive(tempDir.path, (err, files) => {
        let output;
        if (err) throw err;
        for (let file of files) {
            absPath = file;
            relPath = path.relative(tempDir.path, absPath);
            debugger;
            f = new gutil.File({
                cwd: tempDir.path,
                base: file.base,
                path: path.join(file.base, relPath)
            });
            data = fs.readFileSync(absPath);
            data = new Buffer(data.toString());
            f.contents = data;
            output.push(f);
        }
        rimraf(tempDir.path, (err) => {
            if (err) throw err;
        });

        return output;
    }).then((output) => {
        return output;
        });
};