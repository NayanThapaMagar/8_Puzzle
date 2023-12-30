module.exports = async (req, res) => {
    function findBlank(state) {
        // Find the position of the blank (0) tile in the puzzle.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
        return null; // Blank tile not found.
    }

    function isMoveValid(row, col) {
        // Check if the move is within the puzzle boundaries.
        return row >= 0 && row < 3 && col >= 0 && col < 3;
    }

    function generateAllNextStates(currentState) {
        const blankPosition = findBlank(currentState);
        const nextStates = [];

        // Define all possible moves: up, down, left, right.
        const moves = ['up', 'down', 'left', 'right'];

        for (const move of moves) {
            const newRow = blankPosition.row + (move === 'up' ? -1 : move === 'down' ? 1 : 0);
            const newCol = blankPosition.col + (move === 'left' ? -1 : move === 'right' ? 1 : 0);

            if (isMoveValid(newRow, newCol)) {
                // Clone the current state to avoid modifying it.
                const nextState = JSON.parse(JSON.stringify(currentState));
                // Swap the blank tile with the adjacent tile.
                nextState[blankPosition.row][blankPosition.col] = nextState[newRow][newCol];
                nextState[newRow][newCol] = 0;
                nextStates.push(nextState);
            }
        }

        return nextStates;
    }

    // Example usage:
    const currentState = [
        [1, 2, 3],
        [0, 4, 5],
        [6, 7, 8]
    ];

    const allNextStates = generateAllNextStates(currentState);

    for (const nextState of allNextStates) {
        for (const row of nextState) {
            console.log(row.join(' '));
        }
        console.log('---');
    }


    return res.send(allNextStates);
};
