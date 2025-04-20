export const SAMPLE_TEXT_DATA = {
  id: 'sample-text',
  type: 'text',
  data: {
    title: "Understanding Dijkstra's Algorithm",
    content: `
# Dijkstra's Algorithm

Dijkstra's algorithm is a popular algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.

It was conceived by computer scientist **Edsger W. Dijkstra** in 1956 and published three years later. The algorithm exists in many variants; Dijkstra's original algorithm found the shortest path between two specified nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree.

## Key Characteristics

- Finds the shortest path from a starting node to all other nodes in a weighted graph
- Uses a greedy approach by always selecting the closest unvisited vertex
- Time complexity is **O(V²)** with a simple implementation or **O(E log V)** with a priority queue
- Works with positive edge weights only (use Bellman-Ford for graphs with negative weights)

Dijkstra's algorithm maintains a set of vertices whose shortest path from the source has been found. At each step, it finds the vertex with the minimum distance, adds it to the set, and updates the distance values of its adjacent vertices.

### Example Pseudocode

\`\`\`
function Dijkstra(Graph, source):
    dist[source] ← 0
    for each vertex v in Graph:
        if v ≠ source
            dist[v] ← INFINITY
        add v to Q
    
    while Q is not empty:
        u ← vertex in Q with min dist[u]
        remove u from Q
        
        for each neighbor v of u:
            alt ← dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] ← alt
    return dist
\`\`\`
    `,
  },
};

export const SAMPLE_FLIP_CARD_DATA = {
  id: 'sample-flip-card',
  type: 'flipcard',
  data: {
    title: "Dijkstra's Algorithm Flashcards",
    cards: [
      {
        id: '1',
        front: "What is Dijkstra's algorithm?",
        back: 'An algorithm for finding the shortest paths between nodes in a weighted graph',
      },
      {
        id: '2',
        front: 'Who invented this algorithm?',
        back: 'Edsger W. Dijkstra in 1956',
      },
      {
        id: '3',
        front: 'What is the time complexity with a priority queue?',
        back: 'O(E log V) where E is the number of edges and V is the number of vertices',
      },
      {
        id: '4',
        front: "Can Dijkstra's algorithm handle negative edge weights?",
        back: 'No, it requires all edge weights to be positive',
      },
      {
        id: '5',
        front:
          "What data structure is commonly used to implement Dijkstra's algorithm efficiently?",
        back: 'Priority Queue (Min-Heap)',
      },
      {
        id: '6',
        front: "What is the greedy property of Dijkstra's algorithm?",
        back: 'It always selects the vertex with the minimum distance value from the set of unvisited vertices',
      },
    ],
  },
};

export const SAMPLE_QUIZ_DATA = {
  id: 'sample-quiz',
  type: 'quiz',
  data: {
    title: "Dijkstra's Algorithm Quiz",
    description:
      "Test your understanding of Dijkstra's algorithm and graph theory",
    questions: [
      {
        id: 'q1',
        question: "What problem does Dijkstra's algorithm solve?",
        options: [
          'Finding the maximum flow in a network',
          'Finding the shortest path in a weighted graph',
          'Finding the minimum spanning tree',
          'Finding strongly connected components',
        ],
        correctOptionIndex: 1,
        explanation:
          "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph.",
      },
      {
        id: 'q2',
        question: "What limitation does Dijkstra's algorithm have?",
        options: [
          'It only works on directed graphs',
          'It only works on undirected graphs',
          'It cannot handle negative edge weights',
          'It only finds paths to adjacent nodes',
        ],
        correctOptionIndex: 2,
        explanation:
          "Dijkstra's algorithm doesn't work correctly with negative edge weights because it may choose suboptimal paths.",
      },
      {
        id: 'q3',
        question:
          "What data structure is most efficient for implementing Dijkstra's algorithm?",
        options: ['Array', 'Linked List', 'Stack', 'Priority Queue (Min-Heap)'],
        correctOptionIndex: 3,
        explanation:
          'A priority queue efficiently extracts the vertex with the minimum distance in each iteration, improving performance.',
      },
      {
        id: 'q4',
        question:
          "What is the time complexity of Dijkstra's algorithm using a priority queue?",
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(E log V)'],
        correctOptionIndex: 3,
        explanation:
          'With a priority queue, the time complexity is O(E log V) where E is the number of edges and V is the number of vertices.',
      },
      {
        id: 'q5',
        question:
          "Which of the following is NOT a step in Dijkstra's algorithm?",
        options: [
          'Initialize distances from source to all vertices as infinite',
          'Select a vertex with minimum distance value',
          'Update distances of adjacent vertices if a shorter path is found',
          'Sort all edges by weight before processing',
        ],
        correctOptionIndex: 3,
        explanation:
          "Dijkstra's algorithm doesn't sort all edges - it works by incrementally selecting the next closest vertex.",
      },
      {
        id: 'q6',
        question:
          "In Dijkstra's algorithm, how is the source vertex initially handled?",
        options: [
          'Its distance is set to infinity',
          'Its distance is set to zero',
          'Its distance is set to the sum of all edge weights',
          'Its distance is undefined until calculated',
        ],
        correctOptionIndex: 1,
        explanation:
          'The distance to the source vertex is set to zero, while all other vertices are set to infinity initially.',
      },
      {
        id: 'q7',
        question:
          "Which algorithm can handle negative edge weights, unlike Dijkstra's?",
        options: [
          'Breadth-First Search',
          'Depth-First Search',
          'Bellman-Ford algorithm',
          "Prim's algorithm",
        ],
        correctOptionIndex: 2,
        explanation:
          'The Bellman-Ford algorithm can handle graphs with negative edge weights (as long as there are no negative cycles).',
      },
    ],
  },
};
