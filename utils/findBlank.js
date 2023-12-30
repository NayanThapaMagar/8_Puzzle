// Helper function to find the position of the blank (0) tile
module.exports = async function (state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === 0) {
                return { row: i, col: j };
            }
        }
    }
    return null;
};
