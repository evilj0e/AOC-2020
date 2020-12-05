/*
The line is moving more quickly now, but you overhear airport security talking 
about how passports with invalid data are getting through. Better add some 
data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules 
about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.

Count the number of valid passports - those that have all required fields and 
valid values. Continue to treat cid as optional. In your batch file, how many 
passports are valid?

https://adventofcode.com/2020/day/4
*/

const data = require('./index');

const inRange = (value, min, max) =>
    value >= min && value <= max;

const isDigits = (value, length) => 
    (new RegExp(`^\\d{${length}}$`)).test(value);

const rules = [
    {
        key: 'byr',
        check: value =>
            isDigits(value, 4) &&
            inRange(+value, 1920, 2002)
    },
    {
        key: 'iyr',
        check: value => 
            isDigits(value, 4) &&
            inRange(+value, 2010, 2020)
    },
    {
        key: 'eyr',
        check: value => 
            isDigits(value, 4) &&
            inRange(+value, 2020, 2030)
    },
    {
        key: 'hgt',
        check: value => {
            if (value) {
                const matched = value.match(/^(\d+)(cm|in)$/);

                if (matched) {
                    const [, height, dimension] = matched;

                    if (dimension === 'cm') {
                        return inRange(+height, 150, 193);
                    }

                    if (dimension === 'in') {
                        return inRange(+height, 59, 76);
                    }
                }
            }

            return false;
        }
    },
    {
        key: 'hcl',
        check: value => /^#[0-9a-f]{6}$/.test(value)
    },
    {
        key: 'ecl',
        check: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    },
    {
        key: 'pid',
        check: value => isDigits(value, 9)
    }
];

const getCountOfValidPassportsFromData = (data, rules) => {
    const pairs = getPairsFromData(data);
    const passports = getPassportsFromPairs(pairs);

    return passports
        .reduce(
            (count, passport) =>
                count + isPassportValid(passport, rules),
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

const isPassportValid = (passport, rules) => {
    return rules
    .reduce(
        (isValid, { key, check }) =>
            isValid && check(passport[key]),
        true
    );
};

console.log(getCountOfValidPassportsFromData(data, rules));
