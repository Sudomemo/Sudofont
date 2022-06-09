const fs        = require("fs");
const path      = require("path");
const vinyl     = require("vinyl");

module.exports = function(svgDir, unicode_to_key_mappings) {
    let output = [];
    let used_glyph_names = [];
    // for each unicode_to_key_mapping (prefix, svg name) copy svg to tempDir/u{prefix}-{svg name}.svg
    for (let unicode_to_key_mapping of unicode_to_key_mappings) {
        const prefix = unicode_to_key_mapping[0];
        const svgName = unicode_to_key_mapping[1];

        let outputSvgName = svgName;

        // if the glyph has already been used, suffix the name with a number
        while (used_glyph_names.includes(outputSvgName)) {
            // console.log(`glyph ${outputSvgName} already used, suffixing with a number`);
            let suffix = 1;
            while (used_glyph_names.includes(outputSvgName + "-" + suffix)) {
                suffix++;
            }
            outputSvgName = outputSvgName + "-" + suffix;
        }

        used_glyph_names.push(outputSvgName);

        const svgFilename = `u${prefix}-${outputSvgName}.svg`;
        const svgPath = path.join(svgDir, svgName + ".svg");

        // vinyl
        let svg = new vinyl({
            cwd: '/',
            base: '/compiled_svg/',
            path: '/compiled_svg/' + svgFilename,
            contents: fs.readFileSync(svgPath)
        });

        output.push(svg);    
    }

    return output;
}