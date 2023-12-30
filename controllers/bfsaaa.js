module.exports = async (req, res) => {
    class PuzzleNode {
    constructor(state, parent = null, action = null) {
        this.state = state; // The state of the puzzle (a 2D array)
        this.parent = parent; // Reference to the parent node
        this.action = action; // The action that led to this state ('up', 'down', 'left', 'right')
        this.level = parent ? parent.level + 1 : 0; // Level of the node
    }
}

// Function to check if two puzzle states are equal
function statesAreEqual(state1, state2) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state1[i][j] !== state2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// BFS function to solve the 8-puzzle and store nodes by level
function solvePuzzleBFS(initialState, goalState) {
    const queue = [new PuzzleNode(initialState)];
    const visitedNodesByLevel = new Map(); // To store nodes by level

    while (queue.length > 0) {
        const currentNode = queue.shift();

        // Check if the current state matches the goal state
        if (statesAreEqual(currentNode.state, goalState)) {
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
        const blankPosition = findBlank(currentNode.state);
        const possibleMoves = generateValidMoves(blankPosition);

        for (const move of possibleMoves) {
            const nextState = applyMove(currentNode.state, blankPosition, move);

            // Check if this state has been visited before to avoid loops
            if (!visitedNodesByLevel.has(currentNode.level + 1)) {
                visitedNodesByLevel.set(currentNode.level + 1, []);
            }
            const visitedNodes = visitedNodesByLevel.get(currentNode.level + 1);
            let isVisited = false;
            for (const visitedNode of visitedNodes) {
                if (statesAreEqual(visitedNode.state, nextState)) {
                    isVisited = true;
                    break;
                }
            }

            if (!isVisited) {
                const childNode = new PuzzleNode(nextState, currentNode, move);
                queue.push(childNode);
                visitedNodes.push(childNode);
            }
        }
    }

    return null; // No solution found
}

// DFS function to solve the 8-puzzle and store nodes by level
function solvePuzzleDFS(initialState, goalState) {
    const stack = [new PuzzleNode(initialState)];
    const visitedNodesByLevel = new Map(); // To store nodes by level

    while (stack.length > 0) {
        const currentNode = stack.pop();

        // Check if the current state matches the goal state
        if (statesAreEqual(currentNode.state, goalState)) {
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
        const blankPosition = findBlank(currentNode.state);
        const possibleMoves = generateValidMoves(blankPosition);

        for (const move of possibleMoves) {
            const nextState = applyMove(currentNode.state, blankPosition, move);

            // Check if this state has been visited before to avoid loops
            if (!visitedNodesByLevel.has(currentNode.level + 1)) {
                visitedNodesByLevel.set(currentNode.level + 1, []);
            }
            const visitedNodes = visitedNodesByLevel.get(currentNode.level + 1);
            let isVisited = false;
            for (const visitedNode of visitedNodes) {
                if (statesAreEqual(visitedNode.state, nextState)) {
                    isVisited = true;
                    break;
                }
            }

            if (!isVisited) {
                const childNode = new PuzzleNode(nextState, currentNode, move);
                stack.push(childNode);
                visitedNodes.push(childNode);
            }
        }
    }

    return null; // No solution found
}

// Helper function to find the position of the blank (0) tile
function findBlank(state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === 0) {
                return { row: i, col: j };
            }
        }
    }
}

// Helper function to generate valid moves
function generateValidMoves(blankPosition) {
    const { row, col } = blankPosition;
    const moves = [];

    if (row > 0) moves.push('up');
    if (row < 2) moves.push('down');
    if (col > 0) moves.push('left');
    if (col < 2) moves.push('right');

    return moves;
}

// Helper function to apply a move and generate the next state
function applyMove(state, blankPosition, move) {
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
}

// Helper function to print a puzzle state
function printPuzzleState(state) {
    for (const row of state) {
        console.log(row.join(' '));
    }
    console.log('---');
}

// Example usage:
const initialState = [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8]
];

const goalState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

console.log('Breadth-First Search:');
const visitedNodesByLevelBFS = new Map();
const solutionPathBFS = solvePuzzleBFS(initialState, goalState, visitedNodesByLevelBFS);
if (solutionPathBFS !== null) {
    for (const node of solutionPathBFS) {
        printPuzzleState(node.state);
    }
} else {
    console.log('No solution found.');
}

console.log('Depth-First Search:');
const visitedNodesByLevelDFS = new Map();
const solutionPathDFS = solvePuzzleDFS(initialState, goalState, visitedNodesByLevelDFS);
if (solutionPathDFS !== null) {
    for (const node of solutionPathDFS) {
        printPuzzleState(node.state);
    }
} else {
    console.log('No solution found.');
}


    return res.send();
};
