const { Client } = require('ssh2');
const readline = require('readline');

function exec(cmd, { host, port, username, password } = {}) {
    return new Promise((resolve, reject) => {
        const client = new Client();
        client
            .on('ready', () => {
                client.exec(cmd, (err, stream) => {
                    if (err) throw reject(err);
                    const buffer = [];
                    stream
                        .on('close', (code, signal) => {
                            client.end();
                            resolve(buffer.join('').trim());
                        })
                        .on('data', data => {
                            buffer.push(data);
                        })
                        .stderr.on('data', data => {
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

function shell({ host, port, username, password } = {}) {
    return new Promise((resolve, reject) => {
        const client = new Client();
        client
            .on('ready', () => {
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

function pipeStream(stream, onClose) {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    let lastCmd = '';
    stream
        .on('close', () => {
            onClose();
        })
        .on('readable', function () {
            const buffer = [];
            while ((chunk = this.read())) {
                buffer.push(chunk.toString());
            }

            const data = buffer.join('');
            if (data.trim() === lastCmd.trim()) return;
            process.stdin.pause();
            process.stdout.write(data);
            process.stdin.resume();
        });

    readLine
        .on('line', data => {
            const cmd = data;
            stream.write(cmd + '\n');
            lastCmd = cmd;
        })
        .on('SIGINT', () => {
            process.stdin.pause();
            process.stdout.write('\nEnding session\n');
            readline.close();
            onClose();
        });
}

module.exports = {
    exec,
    shell,
};
