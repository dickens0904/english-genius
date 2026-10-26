import type { Unit } from '@/data/types';

const unit3: Unit = {
  id: 'unit3',
  title: 'Food and Health',
  theme: 'food vocabulary, meals, healthy habits',
  level: 1,
  color: '#45B7D1',
  icon: '🍎',
  vocabulary: [
    {
      id: 'u3-v1',
      word: 'breakfast',
      phonetic: '/ˈbrekfəst/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/0642c73c3f8c480e934cd0db046fb61b.png',
      exampleSentence: 'I eat breakfast at seven o\'clock.',
      difficulty: 'easy',
      tags: ['meal', 'food'],
    },
    {
      id: 'u3-v2',
      word: 'fruit',
      phonetic: '/fruːt/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/05c229d7e3bf44e88af858f80127987c.png',
      exampleSentence: 'I like to eat fruit every day.',
      difficulty: 'easy',
      tags: ['food', 'healthy'],
    },
    {
      id: 'u3-v3',
      word: 'vegetable',
      phonetic: '/ˈvedʒtəbl/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/1e6b0ac83c8d4f5185e239e4fd0e00f8.png',
      exampleSentence: 'Vegetables are good for your health.',
      difficulty: 'easy',
      tags: ['food', 'healthy'],
    },
    {
      id: 'u3-v4',
      word: 'rice',
      phonetic: '/raɪs/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/987d2d26caf94616a11d32df21d1dcb0.png',
      exampleSentence: 'We eat rice for lunch.',
      difficulty: 'easy',
      tags: ['food'],
    },
    {
      id: 'u3-v5',
      word: 'chicken',
      phonetic: '/ˈtʃɪkɪn/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/d1ba48c0df934140b815fa76f239115c.png',
      exampleSentence: 'I like chicken with rice.',
      difficulty: 'easy',
      tags: ['food', 'meat'],
    },
    {
      id: 'u3-v6',
      word: 'healthy',
      phonetic: '/ˈhelθi/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/11144e1007f549649985bed116e02d4a.png',
      exampleSentence: 'Eating fruit and vegetables is healthy.',
      difficulty: 'medium',
      tags: ['health'],
    },
    {
      id: 'u3-v7',
      word: 'noodle',
      phonetic: '/ˈnuːdl/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/059b92528b044a96ac9c6bc0b8a48d68.png',
      exampleSentence: 'I like noodles for dinner.',
      difficulty: 'easy',
      tags: ['food'],
    },
    {
      id: 'u3-v8',
      word: 'milk',
      phonetic: '/mɪlk/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f9df07621760411a85c28b17fdab1aff.png',
      exampleSentence: 'I drink milk every morning.',
      difficulty: 'easy',
      tags: ['drink', 'healthy'],
    },
    {
      id: 'u3-v9',
      word: 'delicious',
      phonetic: '/dɪˈlɪʃəs/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/734e94b1160c4e63980ad5e667966989.png',
      exampleSentence: 'The cake is delicious!',
      difficulty: 'medium',
      tags: ['description', 'food'],
    },
    {
      id: 'u3-v10',
      word: 'dinner',
      phonetic: '/ˈdɪnər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/828c240ae3d746d59080483f06634ec4.png',
      exampleSentence: 'We have dinner at six o\'clock.',
      difficulty: 'easy',
      tags: ['meal', 'food'],
    },
  ],
  lessons: [
    {
      id: 'u3-l1',
      title: 'What Do You Have for Breakfast?',
      content: `Mum: Good morning, Tom! What do you want for breakfast?
Tom: I want some milk and bread, please.
Mum: Would you like an egg, too?
Tom: Yes, please! An egg is good for me.
Mum: And have some fruit. Here is an apple.
Tom: Thank you, Mum! An apple a day keeps the doctor away!
Mum: Ha ha! That is right! Eating healthy food is very important.`,
      audioScript: 'Tom has breakfast with his mother. He has milk, bread, an egg, and an apple. His mother reminds him that eating healthy food is important.',
      keyPhrases: ['What do you want for breakfast?', 'I want some ...', 'Would you like ...?', 'An apple a day keeps the doctor away!'],
    },
    {
      id: 'u3-l2',
      title: 'At the School Cafeteria',
      content: `It is lunchtime! The students go to the school cafeteria. Today they have many choices.

Li Mei: Wow! We have rice, noodles, and chicken today!
Wang Tao: I want rice with chicken and vegetables, please.
Li Mei: I want noodles. They are my favorite!
Wang Tao: Do you want some soup?
Li Mei: Yes, tomato soup is delicious!
Wang Tao: Let us also have some fruit. There are bananas and oranges.
Li Mei: Good idea! We should eat healthy food every day.`,
      audioScript: 'Li Mei and Wang Tao have lunch at the school cafeteria. They have rice, noodles, chicken, vegetables, tomato soup, and fruit. They talk about eating healthy food.',
      keyPhrases: ['I want ... with ...', 'They are my favorite!', 'Do you want some ...?', 'We should eat healthy food.'],
    },
  ],
  readings: [
    {
      id: 'u3-r1',
      title: 'The Food Rainbow',
      content: `Did you know that eating colorful food is good for you? Let us learn about the food rainbow!

Red foods like tomatoes and strawberries are good for your heart. They help keep you strong.

Orange foods like carrots and oranges are good for your eyes. They help you see better.

Green foods like broccoli and spinach are good for your bones. They help you grow tall.

Yellow foods like bananas and corn give you energy. They help you run and play.

White foods like milk and rice give you strong teeth and bones.

So next time you eat, try to eat a rainbow! Your body will thank you!`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/b254615b08104000a735ff01aadaefb5.png',
      questions: [
        {
          id: 'u3-r1-q1',
          type: 'multiple_choice',
          question: 'What are red foods good for?',
          options: ['Your eyes', 'Your heart', 'Your bones', 'Your teeth'],
          correctAnswer: 'Your heart',
          points: 10,
        },
        {
          id: 'u3-r1-q2',
          type: 'multiple_choice',
          question: 'Which food helps you see better?',
          options: ['Bananas', 'Rice', 'Carrots', 'Milk'],
          correctAnswer: 'Carrots',
          points: 10,
        },
        {
          id: 'u3-r1-q3',
          type: 'true_false',
          question: 'Green foods help you grow tall.',
          correctAnswer: 'true',
          points: 10,
        },
        {
          id: 'u3-r1-q4',
          type: 'fill_blank',
          question: 'Yellow foods like bananas give you _____.',
          correctAnswer: 'energy',
          hint: 'It helps you run and play.',
          points: 15,
        },
      ],
      isExtracurricular: false,
    },
    {
      id: 'u3-r2',
      title: 'Tom\'s Lunchbox',
      content: `Every morning, Tom's mother makes a special lunchbox for him. Tom opens it at school and always finds something yummy inside.

On Monday, he finds a sandwich with ham and cheese. There is also a small box of grapes.

On Tuesday, his lunchbox has fried rice with egg and vegetables. There is a banana for dessert.

On Wednesday, Mother makes pasta with tomato sauce. There are some apple slices, too.

On Thursday, Tom finds sushi rolls! His mother learned to make them from a video. There is a cup of yogurt.

On Friday, it is a special day. Mother puts a little note inside: "Have a great weekend, Tom! I love you!" Tom smiles. His lunchbox also has his favorite: chicken nuggets and orange juice.

Tom loves his mother's lunchbox. It is the best part of his school day!`,
      level: 'intermediate',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/351d04c2ed8a41b0bd7ca155a96314d2.png',
      questions: [
        {
          id: 'u3-r2-q1',
          type: 'multiple_choice',
          question: 'What is in Tom\'s lunchbox on Monday?',
          options: ['Fried rice', 'A sandwich', 'Pasta', 'Sushi'],
          correctAnswer: 'A sandwich',
          points: 10,
        },
        {
          id: 'u3-r2-q2',
          type: 'multiple_choice',
          question: 'What day does Tom find sushi rolls?',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          correctAnswer: 'Thursday',
          points: 10,
        },
        {
          id: 'u3-r2-q3',
          type: 'fill_blank',
          question: 'Tom\'s favorite food in the lunchbox is chicken _____.',
          correctAnswer: 'nuggets',
          points: 10,
        },
        {
          id: 'u3-r2-q4',
          type: 'true_false',
          question: 'Mother puts a note in Tom\'s lunchbox on Monday.',
          correctAnswer: 'false',
          hint: 'Which day is special?',
          points: 10,
        },
        {
          id: 'u3-r2-q5',
          type: 'multiple_choice',
          question: 'How does Tom feel about his mother\'s lunchbox?',
          options: ['He does not like it.', 'He loves it.', 'He thinks it is OK.', 'He wants to buy lunch.'],
          correctAnswer: 'He loves it.',
          points: 10,
        },
      ],
      isExtracurricular: true,
    },
  ],
  exercises: [
    {
      id: 'u3-e1',
      type: 'multiple_choice',
      question: 'Which meal do you eat in the morning?',
      options: ['Lunch', 'Dinner', 'Breakfast', 'Snack'],
      correctAnswer: 'Breakfast',
      points: 10,
    },
    {
      id: 'u3-e2',
      type: 'multiple_choice',
      question: 'Which food is a vegetable?',
      options: ['Apple', 'Rice', 'Broccoli', 'Chicken'],
      correctAnswer: 'Broccoli',
      points: 10,
    },
    {
      id: 'u3-e3',
      type: 'fill_blank',
      question: 'I drink _____ every morning. It is white.',
      correctAnswer: 'milk',
      hint: 'It comes from a cow.',
      points: 15,
    },
    {
      id: 'u3-e4',
      type: 'fill_blank',
      question: 'The food is very _____. It tastes so good!',
      correctAnswer: 'delicious',
      points: 15,
    },
    {
      id: 'u3-e5',
      type: 'true_false',
      question: 'Fruit and vegetables are healthy foods.',
      correctAnswer: 'true',
      points: 10,
    },
    {
      id: 'u3-e6',
      type: 'true_false',
      question: 'You should eat candy for every meal.',
      correctAnswer: 'false',
      hint: 'Is candy healthy?',
      points: 10,
    },
    {
      id: 'u3-e7',
      type: 'matching',
      question: 'Match the meal with the time of day.',
      options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      correctAnswer: ['Morning', 'Afternoon', 'Evening', 'Anytime'],
      points: 20,
    },
    {
      id: 'u3-e8',
      type: 'word_scramble',
      question: 'Unscramble the word: E-G-A-B-L-T-E-V',
      correctAnswer: 'vegetable',
      hint: 'Green food that is good for you.',
      points: 15,
    },
    {
      id: 'u3-e9',
      type: 'sentence_building',
      question: 'Put the words in order: for / what / dinner / have / you',
      correctAnswer: 'what do you have for dinner',
      points: 20,
    },
    {
      id: 'u3-e10',
      type: 'image_select',
      question: 'Which picture shows fruit?',
      options: ['A cake', 'Fruit', 'Bread', 'Rice'],
      correctAnswer: 'Fruit',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/07156fbea4d4452eb557b91d3b1ae36a.png',
      points: 10,
    },
  ],
};

export default unit3;
