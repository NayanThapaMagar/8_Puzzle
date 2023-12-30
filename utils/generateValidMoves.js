// Helper function to generate valid moves
module.exports = async function (blankPosition) {
    const { row, col } = blankPosition;
    const moves = [];

    if (row > 0) moves.push('up');
    if (row < 2) moves.push('down');
    if (col > 0) moves.push('left');
    if (col < 2) moves.push('right');

    return moves;
};
