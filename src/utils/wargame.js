const { exec, shell } = require("./ssh");

function crack({ host, port, levels } = {}) {
    let promise = Promise.resolve(levels[0].password);

    levels.forEach((level) => {
        promise = promise.then((flag) => {
            console.log(level.username, flag, level.cmd);
            const config = {
                host,
                port,
                username: level.username,
                password: flag,
            };

            if (level.shell) return shell(config);
            return exec(level.cmd, config);
        });
    });

    promise.then((flag) => console.log(flag));
}

module.exports = { crack };
