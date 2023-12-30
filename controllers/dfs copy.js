module.exports = async (req, res) => {

    class PuzzleNode {
        constructor(state, parent = null, action = null) {
            this.state = state; // The state of the puzzle (a 2D array)
            this.parent = parent; // Reference to the parent node
            this.action = action; // The action that led to this state ('up', 'down', 'left', 'right')
            this.level = parent ? parent.level + 1 : 0; // Level of the node
        }
    }

    const applyMove = require("../utils/applyMove")
    const findBlank = require("../utils/findBlank")
    const generateValidMoves = require("../utils/generateValidMoves")
    const statesAreEqual = require("../utils/statesAreEqual")
    const printNodesByLevel = require("../utils/printNodesByLevel")


    // DFS function to solve the 8-puzzle and print nodes by level
    async function solvePuzzleDFS(initialState, goalState, visitedNodesByLevelDFS) {
        const stack = [new PuzzleNode(initialState)];

        while (stack.length > 0) {
            const currentNode = stack.pop();

            // Add the current node to the visited nodes at its level
            if (!visitedNodesByLevelDFS.has(currentNode.level)) {
                visitedNodesByLevelDFS.set(currentNode.level, []);
            }
            visitedNodesByLevelDFS.get(currentNode.level).push(currentNode);

            // Check if the current state matches the goal state
            if (await statesAreEqual(currentNode.state, goalState)) {
                // Found a solution, backtrack to get the path
                const path = [];
                let current = currentNode;
                while (current !== null) {
                    path.unshift(current);
                    current = current.parent;
                }
                return path;
            }



            // Generate possible next states (child nodes)
            const blankPosition = await findBlank(currentNode.state);
            const possibleMoves = await generateValidMoves(blankPosition);

            for (const move of possibleMoves) {
                const nextState = await applyMove(currentNode.state, blankPosition, move);

                // Check if this state has been visited before to avoid loops
                let isVisited = false;

                // Iterate through all levels in visitedNodesByLevelDFS
                // for (const [level, nodes] of visitedNodesByLevelDFS) {
                for (const nodes of visitedNodesByLevelDFS.values()) {
                    for (const visitedNode of nodes) {
                        // Check if the state of the visited node is equal to nextState
                        if (await statesAreEqual(visitedNode.state, nextState)) {
                            isVisited = true;
                            break; // No need to continue checking this level
                        }
                    }

                    if (isVisited) {
                        break; // No need to check other levels
                    }
                }

                if (!isVisited) {
                    const childNode = new PuzzleNode(nextState, currentNode, move);
                    stack.push(childNode);
                }
            }
        }

        return null; // No solution found
    }
    


    // Example usage:
    const initialState = [
        [1, 2, 3],
        [4, 0, 5],
        [6, 7, 8]
    ];
    // const goalState = [
    //     [1, 2, 3],
    //     [4, 5, 8],
    //     [0, 6, 7]
    // ];
    const goalState = [
        [1, 2, 3],
        [0, 4, 5],
        [6, 7, 8]
    ];

    // const goalState = [
    //     [2, 4, 3],
    //     [1, 0, 5],
    //     [6, 7, 8]
    // ];
    // const goalState = [
    //     [1, 2, 3],
    //     [4, 5, 8],
    //     [6, 0, 7]
    // ];


    console.log('Depth-First Search:');
    const visitedNodesByLevelDFS = new Map();
    const solutionPathDFS = await solvePuzzleDFS(initialState, goalState, visitedNodesByLevelDFS);
    if (solutionPathDFS !== null) {
        printNodesByLevel(visitedNodesByLevelDFS, goalState);
    } else {
        console.log('No solution found.');
    }


}