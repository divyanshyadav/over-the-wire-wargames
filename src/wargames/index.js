const fs = require("fs");
const path = require("path");

// importing all the file in current dir
module.exports = fs.readdirSync(__dirname).reduce((acc, file) => {
    if (file === "index.js") return acc;

    const wargame = file.slice(0, file.length - 3);

    return {
        ...acc,
        [wargame]: require(path.join(__dirname, file)),
    };
}, {});
