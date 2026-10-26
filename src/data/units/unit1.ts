import type { Unit } from '@/data/types';

const unit1: Unit = {
  id: 'unit1',
  title: 'My School Life',
  theme: 'school subjects, classroom items, daily routines',
  level: 1,
  color: '#FF6B6B',
  icon: '🏫',
  vocabulary: [
    {
      id: 'u1-v1',
      word: 'English',
      phonetic: '/ˈɪŋɡlɪʃ/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/b8f5e0d443824dd29fa5df97f699b7dc.png',
      exampleSentence: 'I like English class very much.',
      difficulty: 'easy',
      tags: ['subject', 'school'],
    },
    {
      id: 'u1-v2',
      word: 'math',
      phonetic: '/mæθ/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/19fa152d7b5440ecb55043216ea43de6.png',
      exampleSentence: 'Math is my favorite subject.',
      difficulty: 'easy',
      tags: ['subject', 'school'],
    },
    {
      id: 'u1-v3',
      word: 'science',
      phonetic: '/ˈsaɪəns/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/ef4fc5c62ae741088e20087f50df7ad0.png',
      exampleSentence: 'We do experiments in science class.',
      difficulty: 'easy',
      tags: ['subject', 'school'],
    },
    {
      id: 'u1-v4',
      word: 'music',
      phonetic: '/ˈmjuːzɪk/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/c5d69c732ae742e89c8bf1ddec3ad506.png',
      exampleSentence: 'We sing songs in music class.',
      difficulty: 'easy',
      tags: ['subject', 'school'],
    },
    {
      id: 'u1-v5',
      word: 'playground',
      phonetic: '/ˈpleɪɡraʊnd/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f4a41852b02c4af29e3bbd7c10e4521d.png',
      exampleSentence: 'We play on the playground at recess.',
      difficulty: 'medium',
      tags: ['place', 'school'],
    },
    {
      id: 'u1-v6',
      word: 'homework',
      phonetic: '/ˈhoʊmwɜːrk/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/ed6d2d1cc15b4e7e81a9b467a2a49af8.png',
      exampleSentence: 'I finish my homework after dinner.',
      difficulty: 'easy',
      tags: ['activity', 'school'],
    },
    {
      id: 'u1-v7',
      word: 'blackboard',
      phonetic: '/ˈblækbɔːrd/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/1472b260516c4f68ae69838b3dde9b2a.png',
      exampleSentence: 'The teacher writes on the blackboard.',
      difficulty: 'medium',
      tags: ['item', 'classroom'],
    },
    {
      id: 'u1-v8',
      word: 'library',
      phonetic: '/ˈlaɪbreri/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f7f057f0d9a84a94a65be3c5a2c0414f.png',
      exampleSentence: 'I borrow books from the library.',
      difficulty: 'medium',
      tags: ['place', 'school'],
    },
    {
      id: 'u1-v9',
      word: 'recess',
      phonetic: '/rɪˈses/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/5fcc7d6b28b84cdbbe35fad5071c4e49.png',
      exampleSentence: 'Recess is my favorite time of the day.',
      difficulty: 'medium',
      tags: ['activity', 'school'],
    },
    {
      id: 'u1-v10',
      word: 'sticker',
      phonetic: '/ˈstɪkər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f8797419738b4486a50384aff4601c26.png',
      exampleSentence: 'I got a sticker for doing a good job!',
      difficulty: 'easy',
      tags: ['reward', 'school'],
    },
  ],
  lessons: [
    {
      id: 'u1-l1',
      title: 'What Subject Do You Like?',
      content: `Tom: Hi, Lucy! What is your favorite subject?
Lucy: I like English best! I love reading stories. What about you, Tom?
Tom: I like math. I am good at numbers.
Lucy: That is great! Do you like science, too?
Tom: Yes! We have science on Tuesday and Thursday.
Lucy: I like music class. We sing songs and play the piano.
Tom: School is so much fun!`,
      audioScript: 'Tom asks Lucy about her favorite subject. Lucy likes English because she loves reading stories. Tom likes math because he is good at numbers. They both enjoy science class. Lucy also likes music class where they sing songs and play the piano.',
      keyPhrases: ['What is your favorite subject?', 'I like ... best!', 'I am good at ...', 'What about you?'],
    },
    {
      id: 'u1-l2',
      title: 'My Daily Routine',
      content: `I go to school every day. I wake up at seven o'clock. I eat breakfast at seven fifteen. Then I walk to school with my friend. School starts at eight o'clock. We have four classes in the morning. At twelve o'clock, we eat lunch at school. In the afternoon, we have two more classes. After school, I do my homework. Then I play on the playground. I go to bed at nine o'clock. I love my school life!`,
      audioScript: 'A student describes their daily school routine. They wake up at 7, eat breakfast, walk to school, have classes in the morning and afternoon, eat lunch at school, do homework, play on the playground, and go to bed at 9.',
      keyPhrases: ['I go to school every day.', 'I wake up at seven o\'clock.', 'School starts at eight o\'clock.', 'I do my homework.'],
    },
    {
      id: 'u1-l3',
      title: 'In the Classroom',
      content: `Welcome to our classroom! Look, there is a big blackboard on the wall. The teacher writes new words on it every day. There are thirty desks and chairs. My desk is near the window. I have a pencil box, a notebook, and an English book on my desk. There is a bookshelf in the corner. We have many colorful books. I love our classroom!`,
      audioScript: 'A student describes their classroom. There is a big blackboard, thirty desks and chairs, a pencil box, a notebook, and an English book. There is also a bookshelf with many colorful books in the corner.',
      keyPhrases: ['Look, there is a ...', 'There are ... desks and chairs.', 'My desk is near the window.', 'I love our classroom!'],
    },
  ],
  readings: [
    {
      id: 'u1-r1',
      title: 'A New School Year',
      content: `Today is the first day of the new school year. Li Ming is very excited. He has a new backpack and new books. His backpack is blue and has a picture of a rocket on it.

Li Ming walks to school with his best friend, Wang Wei. They talk about their summer vacation. Wang Wei went to the beach. Li Ming visited his grandparents.

When they arrive at school, they see their new classroom. It is big and bright. There is a new computer on the teacher's desk. The blackboard is very clean.

"Welcome back, everyone!" says their teacher, Miss Chen. "This year, we will learn English, math, science, and music."

Li Ming is happy. He loves school!`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/a20779eae8274ecca7362794442d32cd.png',
      questions: [
        {
          id: 'u1-r1-q1',
          type: 'multiple_choice',
          question: 'What color is Li Ming\'s backpack?',
          options: ['Red', 'Blue', 'Green', 'Yellow'],
          correctAnswer: 'Blue',
          points: 10,
        },
        {
          id: 'u1-r1-q2',
          type: 'multiple_choice',
          question: 'Where did Wang Wei go during summer vacation?',
          options: ['The park', 'The beach', 'The mountains', 'The city'],
          correctAnswer: 'The beach',
          points: 10,
        },
        {
          id: 'u1-r1-q3',
          type: 'true_false',
          question: 'Li Ming visited his parents during summer vacation.',
          correctAnswer: 'false',
          hint: 'Think about who Li Ming visited.',
          points: 10,
        },
        {
          id: 'u1-r1-q4',
          type: 'fill_blank',
          question: 'Their teacher\'s name is Miss ____.',
          correctAnswer: 'Chen',
          points: 10,
        },
      ],
      isExtracurricular: false,
    },
    {
      id: 'u1-r2',
      title: 'My Favorite Teacher',
      content: `My favorite teacher is Mr. Wang. He teaches us English. He is tall and friendly. He always smiles at us.

Mr. Wang makes English class fun. He uses pictures and games to teach new words. Sometimes he tells us funny stories in English. We all laugh and learn.

Mr. Wang also plays the guitar. On Fridays, we sing English songs together. My favorite song is "Twinkle, Twinkle, Little Star."

After school, Mr. Wang helps us with our homework. He is very patient. He never gets angry when we make mistakes.

I want to be an English teacher like Mr. Wang someday.`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/299013535b99428dac4bdafd89017ffb.png',
      questions: [
        {
          id: 'u1-r2-q1',
          type: 'multiple_choice',
          question: 'What subject does Mr. Wang teach?',
          options: ['Math', 'Science', 'English', 'Music'],
          correctAnswer: 'English',
          points: 10,
        },
        {
          id: 'u1-r2-q2',
          type: 'true_false',
          question: 'Mr. Wang plays the piano.',
          correctAnswer: 'false',
          hint: 'What instrument does Mr. Wang play?',
          points: 10,
        },
        {
          id: 'u1-r2-q3',
          type: 'fill_blank',
          question: 'On Fridays, they sing English songs _____.',
          correctAnswer: 'together',
          points: 10,
        },
        {
          id: 'u1-r2-q4',
          type: 'multiple_choice',
          question: 'How is Mr. Wang when students make mistakes?',
          options: ['Angry', 'Patient', 'Sad', 'Tired'],
          correctAnswer: 'Patient',
          points: 10,
        },
      ],
      isExtracurricular: true,
    },
  ],
  exercises: [
    {
      id: 'u1-e1',
      type: 'multiple_choice',
      question: 'Which subject do you study numbers in?',
      options: ['English', 'Math', 'Music', 'Art'],
      correctAnswer: 'Math',
      hint: 'Think about counting and adding.',
      points: 10,
    },
    {
      id: 'u1-e2',
      type: 'multiple_choice',
      question: 'Where do students play at recess?',
      options: ['Library', 'Classroom', 'Playground', 'Office'],
      correctAnswer: 'Playground',
      points: 10,
    },
    {
      id: 'u1-e3',
      type: 'fill_blank',
      question: 'I finish my _____ after dinner.',
      correctAnswer: 'homework',
      hint: 'School work you do at home.',
      points: 15,
    },
    {
      id: 'u1-e4',
      type: 'fill_blank',
      question: 'The teacher writes on the _____.',
      correctAnswer: 'blackboard',
      hint: 'It is black and on the wall.',
      points: 15,
    },
    {
      id: 'u1-e5',
      type: 'true_false',
      question: 'A library is a place where you can borrow books.',
      correctAnswer: 'true',
      points: 10,
    },
    {
      id: 'u1-e6',
      type: 'true_false',
      question: 'You eat breakfast at school every day.',
      correctAnswer: 'false',
      hint: 'Most students eat breakfast at home.',
      points: 10,
    },
    {
      id: 'u1-e7',
      type: 'matching',
      question: 'Match the subjects with what you do in class.',
      options: ['English', 'Math', 'Music', 'Science'],
      correctAnswer: ['read stories', 'count numbers', 'sing songs', 'do experiments'],
      points: 20,
    },
    {
      id: 'u1-e8',
      type: 'word_scramble',
      question: 'Unscramble the word: L-O-B-R-A-R-Y',
      correctAnswer: 'library',
      hint: 'A place with many books.',
      points: 15,
    },
    {
      id: 'u1-e9',
      type: 'sentence_building',
      question: 'Put the words in order: favorite / is / my / English / subject',
      correctAnswer: 'English is my favorite subject',
      points: 20,
    },
    {
      id: 'u1-e10',
      type: 'image_select',
      question: 'Which picture shows a blackboard?',
      options: ['A book', 'A blackboard', 'A desk', 'A pencil'],
      correctAnswer: 'A blackboard',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/8c19f0c2981d4622b1f95274b0c45a47.png',
      points: 10,
    },
  ],
};

export default unit1;
