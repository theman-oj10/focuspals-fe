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
