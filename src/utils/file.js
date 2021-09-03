const fs = require("fs");
const path = require("path");

// require all the file from a dir expect index.js
function requireAllFiles(dir, expect = ["index.js"]) {
    return fs.readdirSync(dir).reduce((acc, file) => {
        if (expect.includes(file)) return acc;

        const fileName = file.slice(0, file.length - 3);

        return {
            ...acc,
            [fileName]: require(path.join(dir, file)),
        };
    }, {});
}

module.exports = {
    requireAllFiles,
};
