import React, { useState, useEffect, useRef } from 'react';

const DijkstraGame = () => {
  // State variables
  const [graph, setGraph] = useState({}); // Represents the graph (nodes and edges)
  const [startNode, setStartNode] = useState(''); // The node where Dijkstra's algorithm starts
  const [endNode, setEndNode] = useState('');   // The target node
  const [currentPath, setCurrentPath] = useState([]); // The path being constructed
  const [shortestPath, setShortestPath] = useState([]); // The shortest path found by Dijkstra's algorithm
  const [distance, setDistance] = useState({});  // Distances from start node to all other nodes
  const [visited, setVisited] = useState({});    // Set of visited nodes
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [score, setScore] = useState(0); // Keep track of the user's score
  const [message, setMessage] = useState(''); // Display messages to the player
  const [nodes, setNodes] = useState([]); // Available nodes to add to the graph
  const [edges, setEdges] = useState([]); // Edges to add between nodes
  const [allNodes, setAllNodes] = useState(['A', 'B', 'C', 'D', 'E', 'F']);

  // Ref to store the initial start node. Necessary to reset.
  const initialStartNode = useRef('');
  const initialEndNode = useRef('');

  // Style object (inline CSS)
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0',
    },
    node: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'lightblue',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '10px',
      cursor: 'pointer',
      border: '2px solid transparent',
    },
    selectedNode: {
      borderColor: 'green',
      boxShadow: '0 0 5px green',
    },
    pathNode: {
      borderColor: 'blue',
      boxShadow: '0 0 5px blue',
    },
    correctPathNode: {
      borderColor: 'red',
      boxShadow: '0 0 5px red',
    },
    edge: {
      border: '1px solid black',
      margin: '5px',
      padding: '5px',
      backgroundColor: 'white'
    },
    startButton: {
      backgroundColor: 'green',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
    },
    resetButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
    },
    setupSection: {
      marginBottom: '20px',
      border: '1px solid #ccc',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '5px',
    },
    nodeBank: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    edgeSetup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '10px',
    },
    edgeInput: {
      margin: '5px',
      padding: '5px',
    },
    graphDisplay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    scoreboard: {
      backgroundColor: '#e0e0e0',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
  };

  // Initialize graph with some default values
  useEffect(() => {
    const initialGraph = {
      'A': { 'B': 4, 'C': 2 },
      'B': { 'A': 4, 'D': 5 },
      'C': { 'A': 2, 'D': 1, 'E': 8 },
      'D': { 'B': 5, 'C': 1, 'E': 2, 'F': 6 },
      'E': { 'C': 8, 'D': 2, 'F': 3 },
      'F': { 'D': 6, 'E': 3 },
    };
    setGraph(initialGraph);
    setNodes(Object.keys(initialGraph));
    setStartNode('A');
    setEndNode('F');
    initialStartNode.current = 'A';
    initialEndNode.current = 'F';
  }, []);

  // Dijkstra's algorithm implementation
  const dijkstra = () => {
    if (!startNode || !endNode || !graph) {
      console.error("Start node, end node, or graph not initialized.");
      return;
    }

    const distances = {}; // Store shortest distance from startNode to each node
    const visitedNodes = {}; // Mark visited nodes
    const previousNodes = {}; // Store the predecessor node in the shortest path

    // Initialize distances
    for (const node in graph) {
      distances[node] = Infinity;
      visitedNodes[node] = false;
    }
    distances[startNode] = 0;

    // Main loop
    for (let count = 0; count < Object.keys(graph).length - 1; count++) {
      // Find the node with the minimum distance
      let minDistanceNode = null;
      let minDistance = Infinity;
      for (const node in graph) {
        if (!visitedNodes[node] && distances[node] <= minDistance) {
          minDistance = distances[node];
          minDistanceNode = node;
        }
      }

      if (!minDistanceNode) break; // No more reachable nodes

      visitedNodes[minDistanceNode] = true; // Mark as visited

      // Update distances to neighbors
      for (const neighbor in graph[minDistanceNode]) {
        const weight = graph[minDistanceNode][neighbor];
        if (distances[minDistanceNode] + weight < distances[neighbor]) {
          distances[neighbor] = distances[minDistanceNode] + weight;
          previousNodes[neighbor] = minDistanceNode;
        }
      }
    }

    // Reconstruct the shortest path
    const path = [];
    let currentNode = endNode;
    while (currentNode) {
      path.unshift(currentNode); // Add to the beginning of the array
      currentNode = previousNodes[currentNode];
    }

    // Update state with the shortest path and distances
    setShortestPath(path);
    setDistance(distances);
  };

  // Function to handle node click for path construction
  const handleNodeClick = (node) => {
    if (!isGameRunning) return;

    if (currentPath.length === 0 && node !== startNode) {
      setMessage("You must start at the starting node!");
      return;
    }

    if (currentPath.length > 0 && graph[currentPath[currentPath.length - 1]][node] === undefined) {
      setMessage("That is not a valid path!");
      return;
    }

    if (currentPath.includes(node)) {
      setMessage("You can't go back the same node!");
      return;
    }

    setCurrentPath([...currentPath, node]);
    setMessage(''); // Clear any previous message
  };

  // Function to handle path submission
  const handleSubmitPath = () => {
    if (!isGameRunning) return;

    if (currentPath.length === 0) {
      setMessage("You haven't created a path yet!");
      return;
    }

    if (currentPath[currentPath.length - 1] !== endNode) {
      setMessage("The path must end at the end node!");
      return;
    }

    let correct = true;
    if (currentPath.length !== shortestPath.length) {
      correct = false;
    } else {
      for (let i = 0; i < currentPath.length; i++) {
        if (currentPath[i] !== shortestPath[i]) {
          correct = false;
          break;
        }
      }
    }

    if (correct) {
      setMessage("Congratulations! You found the shortest path!");
      setScore(score + 10);
    } else {
      setMessage("Incorrect path. Try again!");
      setScore(Math.max(0, score - 5)); // Prevent negative score
    }
    setIsGameRunning(false);
  };

  // Start the game
  const handleStartGame = () => {
    if (!startNode || !endNode) {
      setMessage("Please select a start and end node first.");
      return;
    }

    setCurrentPath([]); // Reset path
    setMessage(''); // Clear any previous messages
    setIsGameRunning(true);
    dijkstra();
  };

  // Reset the game
  const handleResetGame = () => {
    setCurrentPath([]);
    setShortestPath([]);
    setDistance({});
    setVisited({});
    setIsGameRunning(false);
    setMessage('');
    setStartNode(initialStartNode.current);
    setEndNode(initialEndNode.current);
  };

  const handleNodeBankClick = (node) => {
    if (nodes.includes(node)) {
      return;
    }
    setNodes([...nodes, node]);
  };

  return (
    <div style={styles.container}>
      <h1>Dijkstra's Algorithm Game</h1>

      <div style={styles.scoreboard}>
        Score: {score}
      </div>

      <div style={styles.setupSection}>
        <h2>Game Setup</h2>
        <div>
          Select Start Node:
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
          >
            {nodes.map((node) => (
              <option key={node} value={node}>{node}</option>
            ))}
          </select>
        </div>
        <div>
          Select End Node:
          <select
            value={endNode}
            onChange={(e) => setEndNode(e.target.value)}
          >
            {nodes.map((node) => (
              <option key={node} value={node}>{node}</option>
            ))}
          </select>
        </div>

        <button style={styles.startButton} onClick={handleStartGame} disabled={isGameRunning}>
          Start Game
        </button>
        <button style={styles.resetButton} onClick={handleResetGame}>
          Reset Game
        </button>
        <p>{message}</p>
      </div>

      <h2>Graph</h2>
      <div style={styles.graphDisplay}>
        {nodes.map((node) => (
          <div
            key={node}
            style={{
              ...styles.node,
              ...(startNode === node ? styles.selectedNode : {}),
              ...(endNode === node ? styles.selectedNode : {}),
              ...(currentPath.includes(node) ? styles.pathNode : {}),
              ...(shortestPath.includes(node) ? styles.correctPathNode : {}),
            }}
            onClick={() => handleNodeClick(node)}
          >
            {node}
          </div>
        ))}
      </div>

      <h2>Current Path</h2>
      <p>{currentPath.join(' -> ')}</p>

      {isGameRunning && (
        <button style={styles.startButton} onClick={handleSubmitPath}>Submit Path</button>
      )}
    </div>
  );
};

export default DijkstraGame;