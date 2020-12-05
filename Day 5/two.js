/*
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing 
boarding pass in your list. However, there's a catch: some of the seats at 
the very front and back of the plane don't exist on this aircraft, so 
they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 
and -1 from yours will be in your list.

What is the ID of your seat?

https://adventofcode.com/2020/day/5#part2
*/

const tickets = require('./index');

const getGroups = ticket => [
    ticket.substr(0, 7),
    ticket.substr(7, 3)
];

const getValueFromGroup = group => {
    let start = 0;
    let end = 2 ** group.length;

    for (let i = 0; i < group.length; i++) {
        const command = group[i];
        const middle = (start + end) / 2;

        switch (command) {
            case 'F':
            case 'L':
                end = middle;
                continue;
            case 'B':
            case 'R':
                start = middle;
        }
    }

    return start;
}

const getSeatIdByTicket = ticket => {
    const [row, column] = getGroups(ticket);
    
    return getValueFromGroup(row) * 8 + getValueFromGroup(column);
}

const getIdsFromTickets = tickets => tickets.map(getSeatIdByTicket);

const getMySeatIdFromTickets = tickets => {
    const ids = getIdsFromTickets(tickets).sort();

    for (let index = 0; index < ids.length - 1; index++) {
        if (ids[index + 1] - ids[index] === 2) {
            return ids[index] + 1;
        }
    }
}

console.log(getMySeatIdFromTickets(tickets));
