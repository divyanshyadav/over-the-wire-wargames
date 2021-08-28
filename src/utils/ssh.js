const { Client } = require("ssh2");

function exec(cmd, { host, port, username, password } = {}) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on("ready", () => {
            conn.exec(cmd, (err, stream) => {
                if (err) throw err;
                const buffer = [];
                stream
                    .on("close", (code, signal) => {
                        conn.end();
                        resolve(buffer.join("").trim());
                    })
                    .on("data", (data) => {
                        buffer.push(data);
                    })
                    .stderr.on("data", (data) => {
                        buffer.push(data);
                    });
            });
        }).connect({
            host,
            port,
            username,
            password,
        });
    });
}

function shell({ host, port, username, password } = {}) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on("ready", () => {
            conn.shell((err, stream) => {
                if (err) throw err;

                let skipNext = false;
                stream
                    .on("close", () => {
                        conn.end();
                        resolve();
                    })
                    .on("data", (data) => {
                        if (skipNext) {
                            return (skipNext = false);
                        }
                        console.log(data.toString().trim());
                    });

                const stdinListener = (data) => {
                    skipNext = true;
                    stream.stdin.write(data);
                };

                process.stdin.on("data", stdinListener);
            });
        }).connect({
            host,
            port,
            username,
            password,
        });
    });
}

module.exports = {
    exec,
    shell,
};
