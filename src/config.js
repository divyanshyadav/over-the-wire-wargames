module.exports = {
    bandit: {
        host: "bandit.labs.overthewire.org",
        port: 2220,
        levels: [
            { username: "bandit0", password: "bandit0", cmd: "cat readme" },
            { username: "bandit1", cmd: "cat /home/bandit1/-" },
            { username: "bandit2", cmd: "cat spaces\\ in\\ this\\ filename" },
            { username: "bandit3", cmd: "cat inhere/.hidden" },
            { username: "bandit4", cmd: "cat /home/bandit4/inhere/-file07" },
            { username: "bandit5", cmd: "", shell: true },
        ],
    },
};
