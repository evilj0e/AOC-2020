/*
The automatic passport scanners are slow because they're having trouble detecting
which passports have all required fields. The expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)

Passport data is validated in batch files (your puzzle input). Each passport is 
represented as a sequence of key:value pairs separated by spaces or newlines. 
Passports are separated by blank lines.

The first passport is valid - all eight fields are present. The second passport is 
invalid - it is missing hgt (the Height field).

The third passport is interesting; the only missing field is cid, so it looks like 
data from North Pole Credentials, not a passport at all! Surely, nobody would mind 
if you made the system temporarily ignore missing cid fields. Treat this "passport" 
as valid.

The fourth passport is missing two fields, cid and byr. Missing cid is fine, but 
missing any other field is not, so this passport is invalid.

According to the above rules, your improved system would report 2 valid passports.

Count the number of valid passports - those that have all required fields. Treat cid 
as optional. In your batch file, how many passports are valid?

https://adventofcode.com/2020/day/4
*/

const data = require('./index');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const getCountOfValidPassportsFromData = (data, requiredFields) => {
    const pairs = getPairsFromData(data);
    const passports = getPassportsFromPairs(pairs);

    return passports
        .reduce(
            (count, passport) =>
                count + isPassportValid(passport, requiredFields),
            0
        );
}

const getPairsFromData = (data) => data
    .split('\n')
    .reduce((acc, line) => {
        line.split(' ').map(pair => {
            acc.push(pair.split(':'))
        })

        return acc;
    }, []);

const getPassportsFromPairs = (pairs) => {
    const passports = [];
    let passport = {};

    for (let i = 0; i <= pairs.length; i++) {
        const pair = pairs[i];

        if (pair && pair[0]) {
            passport[pair[0]] = pair[1];
        } else {
            passports.push(passport);
            passport = {};
        }
    }

    return passports;
};

const isPassportValid = (passport, requiredFields) => {
    const fieldsToCheck = [...requiredFields];
    let isValid = true;

    while(isValid && fieldsToCheck.length) {
        const key = fieldsToCheck.pop();

        if (!passport[key]) {
            isValid = false;
        }
    }

    return isValid;
};

console.log(getCountOfValidPassportsFromData(data, requiredFields));
