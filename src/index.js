const { solve } = require("./utils/wargame");
const wargames = require("./config");

function main() {
    solve(wargames.bandit);
}

main();
