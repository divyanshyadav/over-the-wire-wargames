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
            },
            {
                username: "bandit8",
                cmd: "sort data.txt | uniq -u",
            },
            {
                username: "bandit9",
                cmd: "strings data.txt | grep '&=' | cut -b 13-",
            },
            {
                username: "bandit10",
                cmd: "cat data.txt | base64 -d | cut -b 17-",
            },
            {
                username: "bandit11",
                cmd: "cat data.txt | tr '[a-zA-Z]' '[n-za-mN-ZA-M]' | cut -b 17-",
            },
            {
                username: "bandit12",
                cmd: "cat data.txt | tr '[a-z]' '[n-za-m]' | cut -b 16-",
                shell: true,
            },
        ],
    },
};
