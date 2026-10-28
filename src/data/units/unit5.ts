import type { Unit } from '@/data/types';

const unit5: Unit = {
  id: 'unit5',
  title: 'Amazing Animals',
  theme: 'animal names, descriptions, habitats',
  level: 1,
  color: '#FFB347',
  icon: '🐼',
  vocabulary: [
    {
      id: 'u5-v1',
      word: 'panda',
      phonetic: '/ˈpændə/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/b8f5e0d443824dd29fa5df97f699b7dc.png',
      exampleSentence: 'The panda eats bamboo every day.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v2',
      word: 'tiger',
      phonetic: '/ˈtaɪɡər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/19fa152d7b5440ecb55043216ea43de6.png',
      exampleSentence: 'The tiger has orange and black stripes.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v3',
      word: 'lion',
      phonetic: '/ˈlaɪən/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/ef4fc5c62ae741088e20087f50df7ad0.png',
      exampleSentence: 'The lion is the king of the jungle.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v4',
      word: 'monkey',
      phonetic: '/ˈmʌŋki/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/c5d69c732ae742e89c8bf1ddec3ad506.png',
      exampleSentence: 'The monkey can climb trees very fast.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v5',
      word: 'elephant',
      phonetic: '/ˈelɪfənt/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f4a41852b02c4af29e3bbd7c10e4521d.png',
      exampleSentence: 'The elephant is the biggest animal on land.',
      difficulty: 'medium',
      tags: ['animal'],
    },
    {
      id: 'u5-v6',
      word: 'rabbit',
      phonetic: '/ˈræbɪt/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/ed6d2d1cc15b4e7e81a9b467a2a49af8.png',
      exampleSentence: 'The rabbit has long ears and a short tail.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v7',
      word: 'bird',
      phonetic: '/bɜːrd/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/1472b260516c4f68ae69838b3dde9b2a.png',
      exampleSentence: 'A bird builds a nest in the tree.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v8',
      word: 'fish',
      phonetic: '/fɪʃ/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f7f057f0d9a84a94a65be3c5a2c0414f.png',
      exampleSentence: 'A fish swims in the river.',
      difficulty: 'easy',
      tags: ['animal'],
    },
    {
      id: 'u5-v9',
      word: 'kangaroo',
      phonetic: '/ˌkæŋɡəˈruː/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/5fcc7d6b28b84cdbbe35fad5071c4e49.png',
      exampleSentence: 'The kangaroo jumps very high.',
      difficulty: 'medium',
      tags: ['animal'],
    },
    {
      id: 'u5-v10',
      word: 'bear',
      phonetic: '/beər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f8797419738b4486a50384aff4601c26.png',
      exampleSentence: 'The bear sleeps all winter long.',
      difficulty: 'medium',
      tags: ['animal'],
    },
  ],
  lessons: [
    {
      id: 'u5-l1',
      title: 'At the Zoo',
      content: `Tom: Look, Lucy! A panda is eating bamboo.
Lucy: How cute! Pandas are black and white.
Tom: I like the tigers. They have orange and black stripes.
Lucy: Shh, Tom. The lion is sleeping.
Tom: Lions sleep a lot! They sleep in the day.
Lucy: Look at the monkeys! They are climbing the trees.
Tom: They are so funny. Let's watch them!`,
      audioScript: 'Tom and Lucy are at the zoo. They see a panda eating bamboo. Tom likes the tigers with orange and black stripes. The lion is sleeping. The monkeys are climbing the trees and they are very funny.',
      keyPhrases: ['Look at the ...!', 'How cute!', 'They are climbing ...', "Let's watch them!"],
    },
    {
      id: 'u5-l2',
      title: 'My Favorite Animal',
      content: `My favorite animal is the panda. Pandas live in China. They are black and white, and they are very cute. Pandas eat bamboo. They eat for many hours every day!

A baby panda is very small. It is pink and it has no hair. When it grows up, it becomes big and fluffy.

Pandas can climb trees, too. They are slow, but they are good climbers. I want to see a real panda one day!`,
      audioScript: 'A student talks about their favorite animal, the panda. Pandas live in China. They are black and white and eat bamboo for many hours every day. A baby panda is small and pink. Pandas are slow but good at climbing trees.',
      keyPhrases: ['My favorite animal is ...', 'Pandas live in China.', 'They eat ...', 'I want to ... one day!'],
    },
    {
      id: 'u5-l3',
      title: 'Animal Homes',
      content: `Animals live in different homes. A bird lives in a nest. The nest is in a tree. A rabbit lives in a hole under the ground. The hole is called a burrow.

A fish lives in water. It swims in rivers, lakes, and seas. A bear sleeps in a cave in the winter. A monkey lives high in the trees of the forest.

Where does your favorite animal live?`,
      audioScript: 'Animals live in different homes. A bird lives in a nest in a tree. A rabbit lives in a burrow under the ground. A fish lives in water. A bear sleeps in a cave, and a monkey lives high in the trees.',
      keyPhrases: ['A ... lives in ...', 'under the ground', 'in the water', 'Where does ... live?'],
    },
  ],
  readings: [
    {
      id: 'u5-r1',
      title: 'A Day at the Zoo',
      content: `Today our class goes to the zoo. Miss Chen is our teacher. She takes us to see the animals.

First, we see the pandas. A panda is eating bamboo. It is black and white. It eats and eats. Pandas eat for twelve hours every day!

Next, we see the elephants. The elephants are very big. They have long noses and big ears. An elephant drinks water with its long nose.

Then we see the monkeys. The monkeys jump and play. One little monkey takes Miss Chen's hat! Everyone laughs.

Before we go home, we see the tigers. A tiger has orange and black stripes. It has big teeth, but it looks sleepy.

What a fun day at the zoo!`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/a20779eae8274ecca7362794442d32cd.png',
      questions: [
        {
          id: 'u5-r1-q1',
          type: 'multiple_choice',
          question: 'What is the panda eating?',
          options: ['Leaves', 'Bamboo', 'Fish', 'Apples'],
          correctAnswer: 'Bamboo',
          points: 10,
        },
        {
          id: 'u5-r1-q2',
          type: 'multiple_choice',
          question: 'How many hours do pandas eat every day?',
          options: ['Two', 'Six', 'Ten', 'Twelve'],
          correctAnswer: 'Twelve',
          points: 10,
        },
        {
          id: 'u5-r1-q3',
          type: 'true_false',
          question: 'The elephant has a short nose.',
          correctAnswer: 'false',
          hint: 'What kind of nose does the elephant have?',
          points: 10,
        },
        {
          id: 'u5-r1-q4',
          type: 'fill_blank',
          question: 'The monkey takes Miss Chen\'s _____.',
          correctAnswer: 'hat',
          points: 10,
        },
      ],
      isExtracurricular: false,
    },
    {
      id: 'u5-r2',
      title: 'The Clever Little Rabbit',
      content: `Once upon a time, there is a little rabbit named Hui Hui. She has long ears and a short white tail. She lives in a burrow with her mother.

One day, a hungry fox comes to the forest. He wants to catch the little rabbit. Hui Hui is fast, but the fox is faster.

Hui Hui has a good idea. She jumps into a blackberry bush. "Ouch!" the fox says. The blackberries are sharp! The fox does not want to follow her.

Hui Hui runs home safely. Her mother says, "You are a clever rabbit! Big animals are strong, but small animals can be smart."

From that day, Hui Hui always thinks before she jumps. And she lives happily with her mother in their burrow.`,
      level: 'intermediate',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/299013535b99428dac4bdafd89017ffb.png',
      questions: [
        {
          id: 'u5-r2-q1',
          type: 'multiple_choice',
          question: 'What is the little rabbit\'s name?',
          options: ['Lily', 'Hui Hui', 'Emma', 'Lucy'],
          correctAnswer: 'Hui Hui',
          points: 10,
        },
        {
          id: 'u5-r2-q2',
          type: 'multiple_choice',
          question: 'Where does the rabbit hide from the fox?',
          options: ['In a tree', 'In a river', 'In a blackberry bush', 'In a cave'],
          correctAnswer: 'In a blackberry bush',
          points: 10,
        },
        {
          id: 'u5-r2-q3',
          type: 'true_false',
          question: 'The fox catches the little rabbit.',
          correctAnswer: 'false',
          hint: 'Does the fox get the rabbit?',
          points: 10,
        },
        {
          id: 'u5-r2-q4',
          type: 'fill_blank',
          question: 'The rabbit\'s mother says she is a _____ rabbit.',
          correctAnswer: 'clever',
          points: 10,
        },
      ],
      isExtracurricular: true,
    },
  ],
  exercises: [
    {
      id: 'u5-e1',
      type: 'multiple_choice',
      question: 'Which animal has a long nose and big ears?',
      options: ['Tiger', 'Panda', 'Elephant', 'Rabbit'],
      correctAnswer: 'Elephant',
      hint: 'It is the biggest animal on land.',
      points: 10,
    },
    {
      id: 'u5-e2',
      type: 'multiple_choice',
      question: 'Which animal can fly in the sky?',
      options: ['Fish', 'Bird', 'Bear', 'Panda'],
      correctAnswer: 'Bird',
      points: 10,
    },
    {
      id: 'u5-e3',
      type: 'fill_blank',
      question: 'The _____ is black and white and eats bamboo.',
      correctAnswer: 'panda',
      hint: 'It lives in China.',
      points: 15,
    },
    {
      id: 'u5-e4',
      type: 'fill_blank',
      question: 'A _____ lives in water and can swim very well.',
      correctAnswer: 'fish',
      points: 15,
    },
    {
      id: 'u5-e5',
      type: 'true_false',
      question: 'An elephant is the biggest animal on land.',
      correctAnswer: 'true',
      points: 10,
    },
    {
      id: 'u5-e6',
      type: 'true_false',
      question: 'A bird lives in the water.',
      correctAnswer: 'false',
      hint: 'Where does a bird build its nest?',
      points: 10,
    },
    {
      id: 'u5-e7',
      type: 'matching',
      question: 'Match the animals with what they can do.',
      options: ['panda', 'bird', 'fish', 'kangaroo'],
      correctAnswer: ['eats bamboo', 'flies in the sky', 'swims in water', 'jumps very high'],
      points: 20,
    },
    {
      id: 'u5-e8',
      type: 'word_scramble',
      question: 'Unscramble the word: K-E-Y-M-O-N',
      correctAnswer: 'monkey',
      hint: 'It can climb trees.',
      points: 15,
    },
    {
      id: 'u5-e9',
      type: 'sentence_building',
      question: 'Put the words in order: favorite / animal / panda / is / my',
      correctAnswer: 'panda is my favorite animal',
      points: 20,
    },
    {
      id: 'u5-e10',
      type: 'image_select',
      question: 'Which picture shows a rabbit?',
      options: ['A rabbit', 'A tiger', 'A bird', 'A fish'],
      correctAnswer: 'A rabbit',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/73ae7687041a404d87d0feb329099a35.png',
      points: 10,
    },
  ],
};

export default unit5;
