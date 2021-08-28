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
            {
                username: "bandit5",
                cmd: "find . -type f -size 1033c -exec cat {} \\;",
            },
            {
                username: "bandit6",
                cmd: "find / -type f -user bandit7 -group bandit6 -size 33c -exec cat {} \\; 2>/dev/null",
            },
            {
                username: "bandit7",
                cmd: "cat data.txt | grep millionth | cut -b 11-",
                // shell: true,
            },
            {
                username: "bandit8",
                // cmd: "cat data.txt | grep millionth | cut -b 11-",
                shell: true,
            },
        ],
    },
};
