const Cache = require("./cache");
const { exec, shell } = require("./ssh");

function solve({ host, port, levels } = {}) {
    const cache = new Cache();
    let promise = Promise.resolve(levels[0].password);

    levels.forEach((level) => {
        promise = promise.then((flag) => {
            console.log(level.username, flag, level.cmd);

            if (cache.has(level.username)) {
                return Promise.resolve(cache.get(level.username));
            }

            const config = {
                host,
                port,
                username: level.username,
                password: flag,
            };

            if (level.shell) return shell(config);

            return exec(level.cmd, config).then((flag) => {
                cache.set(level.username, flag);
                return Promise.resolve(flag);
            });
        });
    });

    return promise.then((flag) => console.log(flag));
}

module.exports = { solve };
