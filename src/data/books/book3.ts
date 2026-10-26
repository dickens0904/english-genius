import type { Reading } from '@/data/types';

const book3: Reading = {
  id: 'book3',
  title: 'My First Cooking Adventure',
  content: `Today was a very special day. Lily was going to cook dinner for her family for the very first time! Her grandmother was going to help her.

"What should we cook, Grandma?" asked Lily.

"Let us make tomato and egg noodles!" said Grandma. "It is easy and delicious."

First, Grandma showed Lily how to wash the vegetables. "Always wash your hands before cooking," said Grandma. "And wash the vegetables very carefully."

Lily washed two big tomatoes and some green onions. Then Grandma taught her how to crack an egg. The first time, Lily got egg on her fingers! But the second time, she did it perfectly.

"Good job!" said Grandma. "Now, let us cut the tomatoes into small pieces."

Grandma held Lily's hand while she used the knife. "Be very careful with the knife," she said. "Always cut away from your fingers."

Lily cut the tomatoes slowly and carefully. They were not perfect, but Grandma smiled. "Practice makes perfect!" she said.

Next came the cooking part. Grandma put some oil in the pan. When the oil was hot, Lily poured in the eggs. Sizzle! The eggs started to cook. Lily stirred them with a big spoon.

"Now add the tomatoes," said Grandma. Lily put the tomato pieces into the pan. The kitchen smelled wonderful!

"Add a little salt and sugar," said Grandma. "The sugar makes the tomatoes less sour."

While the sauce was cooking, Grandma boiled the noodles in a big pot of water. In just a few minutes, everything was ready!

Lily put the noodles in bowls. Then she poured the tomato and egg sauce on top. She sprinkled some green onions on each bowl.

"Dinner is ready!" Lily called out happily.

Her parents came to the table. They took one bite and their eyes opened wide. "Lily! This is delicious!" said her father.

"You are a natural cook!" said her mother.

Lily beamed with pride. She could not stop smiling. Cooking was so much fun!

"Can we cook together again next weekend, Grandma?" asked Lily.

"Of course, my dear!" said Grandma. "Next time, we will make dumplings!"

Lily could not wait for her next cooking adventure!`,
  level: 'beginner',
  imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/63db436b422542af95598d6c745cc83a.png',
  questions: [
    {
      id: 'book3-q1',
      type: 'multiple_choice',
      question: 'What did Lily and Grandma cook?',
      options: ['Fried rice', 'Tomato and egg noodles', 'Dumplings', 'Soup'],
      correctAnswer: 'Tomato and egg noodles',
      points: 10,
    },
    {
      id: 'book3-q2',
      type: 'multiple_choice',
      question: 'Why did Grandma add sugar to the tomatoes?',
      options: ['To make them sweet', 'To make them less sour', 'To make them red', 'To make them soft'],
      correctAnswer: 'To make them less sour',
      points: 10,
    },
    {
      id: 'book3-q3',
      type: 'true_false',
      question: 'Lily cracked the egg perfectly on her first try.',
      correctAnswer: 'false',
      hint: 'How many tries did it take?',
      points: 10,
    },
    {
      id: 'book3-q4',
      type: 'fill_blank',
      question: 'Grandma said, "_____ makes perfect!"',
      correctAnswer: 'Practice',
      points: 10,
    },
    {
      id: 'book3-q5',
      type: 'multiple_choice',
      question: 'What will they cook next weekend?',
      options: ['Noodles', 'Pizza', 'Dumplings', 'Soup'],
      correctAnswer: 'Dumplings',
      points: 10,
    },
  ],
  isExtracurricular: true,
};

export default book3;
