export const SAMPLE_TEXT_DATA = {
  id: 'sample-text',
  type: 'text',
  data: {
    title: 'Sample Text Content',
    content: 'This is sample text content for demonstration purposes.',
  },
};

export const SAMPLE_FLIP_CARD_DATA = {
  id: 'sample-flip-card',
  type: 'flipcard',
  data: {
    title: 'React Flashcards',
    cards: [
      {
        id: '1',
        front: 'What is React?',
        back: 'A JavaScript library for building user interfaces',
      },
      {
        id: '2',
        front: 'What is JSX?',
        back: 'A syntax extension for JavaScript recommended for use with React',
      },
      {
        id: '3',
        front: 'What is a React Component?',
        back: 'Independent, reusable code blocks that return HTML via a render function',
      },
      {
        id: '4',
        front: 'What is a React Hook?',
        back: 'Functions that let you use state and lifecycle features in functional components',
      },
    ],
  },
};

export const SAMPLE_QUIZ_DATA = {
  id: 'sample-quiz',
  type: 'quiz',
  data: {
    title: 'JavaScript Fundamentals Quiz',
    description: 'Test your knowledge of JavaScript basics',
    questions: [
      {
        id: 'q1',
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['String', 'Boolean', 'Float', 'Object'],
        correctOptionIndex: 2,
        explanation:
          'JavaScript has Number type for both integers and floating-point values, not a separate Float type.',
      },
      {
        id: 'q2',
        question: 'What will console.log(typeof []) output?',
        options: ['array', 'object', 'list', 'undefined'],
        correctOptionIndex: 1,
        explanation:
          'In JavaScript, arrays are objects, so typeof [] returns "object".',
      },
      {
        id: 'q3',
        question: 'Which method adds a new element to the end of an array?',
        options: ['push()', 'append()', 'addToEnd()', 'concat()'],
        correctOptionIndex: 0,
        explanation:
          'The push() method adds one or more elements to the end of an array.',
      },
      {
        id: 'q4',
        question: 'What does the "===" operator do in JavaScript?',
        options: [
          'Compares values only',
          'Compares types only',
          'Compares both values and types',
          'Assigns a value to a variable',
        ],
        correctOptionIndex: 2,
        explanation:
          'The strict equality operator (===) checks both value and type without performing type conversion.',
      },
      {
        id: 'q5',
        question:
          'Which function is used to parse a string to an integer in JavaScript?',
        options: [
          'Integer.parse()',
          'parseInteger()',
          'parseInt()',
          'Number.toInt()',
        ],
        correctOptionIndex: 2,
        explanation: 'parseInt() parses a string and returns an integer.',
      },
    ],
  },
};
