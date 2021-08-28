const { Client } = require("ssh2");
var readline = require("readline");

function exec(cmd, { host, port, username, password } = {}) {
    return new Promise((resolve, reject) => {
        const client = new Client();
        client
            .on("ready", () => {
                client.exec(cmd, (err, stream) => {
                    if (err) throw reject(err);
                    const buffer = [];
                    stream
                        .on("close", (code, signal) => {
                            client.end();
                            resolve(buffer.join("").trim());
                        })
                        .on("data", (data) => {
                            buffer.push(data);
                        })
                        .stderr.on("data", (data) => {
                            buffer.push(data);
                        });
                });
            })
            .connect({
                host,
                port,
                username,
                password,
            });
    });
}

const pipeStream = (stream, onClose) => {
    const readLine = readline.createInterface(process.stdin, process.stdout);

    stream
        .on("close", () => {
            onClose();
        })
        .on("data", (data) => {
            process.stdin.pause();
            process.stdout.write(data);
            process.stdin.resume();
        });

    readLine
        .on("line", (data) => {
            stream.write(data.trim() + "\n");
        })
        .on("SIGINT", () => {
            process.stdin.pause();
            process.stdout.write("\nEnding session\n");
            readline.close();
            onClose();
        });
};

function shell({ host, port, username, password } = {}) {
    return new Promise((resolve, reject) => {
        const client = new Client();
        client
            .on("ready", () => {
                client.shell((err, stream) => {
                    if (err) throw reject(err);
                    pipeStream(stream, () => {
                        client.end();
                        resolve();
                    });
                });
            })
            .connect({
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
