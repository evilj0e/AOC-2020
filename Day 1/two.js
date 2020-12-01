/*
The Elves in accounting are thankful for your help; one of them even 
offers you a starfish coin they had left over from a past vacation. 
They offer you a second one if you can find three numbers in your expense 
report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 
are 979, 366, and 675. Multiplying them together produces the answer, 
241861950.

In your expense report, what is the product of the three entries 
that sum to 2020?

https://adventofcode.com/2020/day/1#part2
*/

import { input } from './input';

const target = 2020;

export const lookup = (arr) => {
    const filteredArr = arr.filter(item => item < 2020);

    console.log(filteredArr);

    const map = {};

    for (let item of arr) {
        const difference = target - item;

        if (map[item]) {
            return item * difference;
        }

        map[difference] = true;
    }
}

console.log(lookup(input));
