module.exports = {
    name: 'bandit',
    host: 'bandit.labs.overthewire.org',
    port: 2220,
    levels: [
        { password: 'bandit0', cmd: 'cat readme' },
        { cmd: 'cat /home/bandit1/-' },
        { cmd: 'cat spaces\\ in\\ this\\ filename' },
        { cmd: 'cat inhere/.hidden' },
        { cmd: 'cat /home/bandit4/inhere/-file07' },
        {
            cmd: 'find . -type f -size 1033c -exec cat {} \\;',
        },
        {
            cmd: 'find / -type f -user bandit7 -group bandit6 -size 33c -exec cat {} \\; 2>/dev/null',
        },
        {
            cmd: 'cat data.txt | grep millionth | cut -b 11-',
        },
        {
            cmd: 'sort data.txt | uniq -u',
        },
        {
            cmd: "strings data.txt | grep '&=' | cut -b 13-",
        },
        {
            cmd: 'cat data.txt | base64 -d | cut -b 17-',
        },
        {
            cmd: "cat data.txt | tr '[a-zA-Z]' '[n-za-mN-ZA-M]' | cut -b 17-",
        },
        {
            cmd: `
                temp_dir=$(mktemp -d);
                cp data.txt $temp_dir;
                cd $temp_dir;
                xxd -r data.txt > cmp.gz;
                gzip -d cmp.gz;
                mv cmp cmp.bz2;
                bzip2 -d cmp.bz2;
                mv cmp cmp.gz;
                gzip -d cmp.gz;
                tar -xf cmp;
                tar -xf data5.bin;
                mv data6.bin data6.bz2;
                bzip2 -d data6.bz2;
                tar -xf data6;
                mv data8.bin data8.gz;
                gzip -d data8.gz;
                cat data8 | cut -b 17-;
            `,
        },
        {
            cmd: '',
            shell: true,
        },
    ],
};
