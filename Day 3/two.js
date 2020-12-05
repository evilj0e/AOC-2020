/*
Time to check the rest of the slopes - you need to minimize the probability
of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of 
the following slopes, you start at the top-left corner and traverse 
the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.

What do you get if you multiply together the number of trees 
encountered on each of the listed slopes?

https://adventofcode.com/2020/day/3#part2
*/

const map = require('./input');

const getTreeCountBySteps = (map, offsetX, offsetY) => {
    let counter = 0;
    const position = { x: 0, y: 0 };
    
    const maxX = map[0].length;
    const maxY = map.length;

    while (position.y < maxY) {
        if (map[position.y][position.x] === '#') {
            counter++;
        }

        position.x = (position.x + offsetX) % maxX;
        position.y = position.y + offsetY;
    }

    return counter;
}

const traverse = (map, offsets) => {
    return offsets
        .reduce(
            (result, offset) => 
                result * getTreeCountBySteps(map, offset.x, offset.y),
                1
        );
}
const offsets = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
];

console.log(traverse(map, offsets));
