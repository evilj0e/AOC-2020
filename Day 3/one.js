/*
With the toboggan login problems resolved, you set off toward the airport.
While travel by toboggan might be easy, it's certainly not safe: there's 
very minimal steering and the area is covered in trees. You'll need to see 
which angles will take you near the fewest trees.

Due to the local geology, trees in this area only grow on exact integer 
coordinates in a grid. You make a map (your puzzle input) of the open 
squares (.) and trees (#) you can see.

Starting at the top-left corner of your map and following a slope of 
right 3 and down 1, how many trees would you encounter?

https://adventofcode.com/2020/day/3
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

const offsetX = 3;
const offsetY = 1;
const treeCount = getTreeCountBySteps(map, offsetX, offsetY);

console.log(treeCount);
