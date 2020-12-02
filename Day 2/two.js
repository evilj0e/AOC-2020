/*
Each policy actually describes two positions in the password, 
where 1 means the first character, 2 means the second character,
and so on. (Be careful; Toboggan Corporate Policies have no 
concept of "index zero"!) Exactly one of these positions must 
contain the given letter. Other occurrences of the letter are 
irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

How many passwords are valid according to the new interpretation 
of the policies?

https://adventofcode.com/2020/day/2#part2
*/

const lines = require('./index');

const getPartsLine = line => {
    const [, min, max, letter, password] = line.match(/(\d+)-(\d+) (\S): (\S+)/);

    return {
        min, max, letter, password
    }
}

const isPasswordValid = ({ min, max, letter, password }) => {
    if (
        (password[min - 1] === letter && password[max - 1] !== letter) ||
        (password[min - 1] !== letter && password[max - 1] === letter)
    ) {
        return true;
    }

    return false
};

const findMatches = lines =>
    lines.reduce(
        (count, line) => count + isPasswordValid(getPartsLine(line)),
        0
    );

console.log(findMatches(lines));