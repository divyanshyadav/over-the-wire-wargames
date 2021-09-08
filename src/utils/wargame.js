const LocalStorage = require('./local-storage');
const { exec, shell } = require('./ssh');

function solve({ name, host, port, levels } = {}) {
    const localStorage = new LocalStorage();
    let promise = Promise.resolve(levels[0].password);

    levels.forEach((level, index) => {
        const username = `${name}${index}`;
        promise = promise.then(flag => {
            console.log(level.username, flag, level.cmd);

            if (localStorage.has(username)) {
                return Promise.resolve(localStorage.get(username));
            }

            const config = {
                host,
                port,
                username,
                password: flag,
            };

            if (level.shell) return shell(config);

            return exec(level.cmd, config).then(flag => {
                localStorage.set(username, flag);
                return Promise.resolve(flag);
            });
        });
    });

    return promise.then(flag => console.log(flag));
}

module.exports = { solve };
