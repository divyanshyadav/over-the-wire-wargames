const { solve } = require("./utils/wargame");
const wargames = require("./wargames");

async function main() {
    for (let wargame of Object.values(wargames)) {
        await solve(wargame);
    }
}

main();
