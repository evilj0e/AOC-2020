/*
Suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. 
The password policy indicates the lowest and highest number of 
times a given letter must appear for the password to be valid. 
For example, 1-3 a means that the password must contain a at 
least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, 
cdefg, is not; it contains no instances of b, but needs at 
least 1. The first and third passwords are valid: they contain 
one a or nine c, both within the limits of their respective 
policies.

How many passwords are valid according to their policies?

https://adventofcode.com/2020/day/2
*/

const lines = require('./index');

const getPartsLine = line => {
    const [, min, max, letter, password] = line.match(/(\d+)-(\d+) (\S): (\S+)/);

    return {
        min, max, letter, password
    }
}

const isPasswordValid = ({ min, max, letter, password }) => {
    const count = password
        .split('')
        .filter(l => l === letter).length;

    return count >= min && count <= max;
};

const findMatches = lines =>
    lines.reduce(
        (count, line) => count + isPasswordValid(getPartsLine(line)),
        0
    );

console.log(findMatches(lines));