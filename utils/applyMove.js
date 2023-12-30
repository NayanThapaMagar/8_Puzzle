// Helper function to apply a move and generate the next state
module.exports = async function (state, blankPosition, move) {
    const { row, col } = blankPosition;
    const newState = JSON.parse(JSON.stringify(state));

    if (move === 'up') {
        newState[row][col] = newState[row - 1][col];
        newState[row - 1][col] = 0;
    } else if (move === 'down') {
        newState[row][col] = newState[row + 1][col];
        newState[row + 1][col] = 0;
    } else if (move === 'left') {
        newState[row][col] = newState[row][col - 1];
        newState[row][col - 1] = 0;
    } else if (move === 'right') {
        newState[row][col] = newState[row][col + 1];
        newState[row][col + 1] = 0;
    }

    return newState;
};
