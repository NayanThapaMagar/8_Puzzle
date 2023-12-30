// Helper function to find the position of the blank (0) tile
module.exports = async function (visitedNodesByLevel, goalState, solutionPath) {

    const statesAreEqual = require("../utils/statesAreEqual")

    console.log("solutionPath", solutionPath);

    for (const [level, nodes] of visitedNodesByLevel) {
        console.log(`Level ${level}:`); 
        for (const node of nodes) {
            if (await statesAreEqual(node.state, goalState)) {
                console.log(node.state, "-> Goal State");
            } else {
                console.log(node.state);
            }
        }
    }
};
