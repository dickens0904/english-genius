import type { Unit } from '@/data/types';

const unit2: Unit = {
  id: 'unit2',
  title: 'My Family and Friends',
  theme: 'family members, descriptions, hobbies',
  level: 1,
  color: '#4ECDC4',
  icon: '👨‍👩‍👧‍👦',
  vocabulary: [
    {
      id: 'u2-v1',
      word: 'mother',
      phonetic: '/ˈmʌðər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/35bee9be49d14442b2c4d922f6066e5b.png',
      exampleSentence: 'My mother is a teacher.',
      difficulty: 'easy',
      tags: ['family'],
    },
    {
      id: 'u2-v2',
      word: 'father',
      phonetic: '/ˈfɑːðər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/9b32e52e830d4ff8af80bf6928bf597b.png',
      exampleSentence: 'My father likes to read newspapers.',
      difficulty: 'easy',
      tags: ['family'],
    },
    {
      id: 'u2-v3',
      word: 'sister',
      phonetic: '/ˈsɪstər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/37a2b815ac5f4ada8c719eeb5775162b.png',
      exampleSentence: 'My sister is five years old.',
      difficulty: 'easy',
      tags: ['family'],
    },
    {
      id: 'u2-v4',
      word: 'brother',
      phonetic: '/ˈbrʌðər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/73ae7687041a404d87d0feb329099a35.png',
      exampleSentence: 'My brother and I play football together.',
      difficulty: 'easy',
      tags: ['family'],
    },
    {
      id: 'u2-v5',
      word: 'grandparents',
      phonetic: '/ˈɡrændpeərənts/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/4a25f9907a0a42cdbe0bdceab6babdd0.png',
      exampleSentence: 'I visit my grandparents on weekends.',
      difficulty: 'medium',
      tags: ['family'],
    },
    {
      id: 'u2-v6',
      word: 'hobby',
      phonetic: '/ˈhɒbi/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/e70dcdb4b243420aa603caf18119b8e8.png',
      exampleSentence: 'My hobby is painting.',
      difficulty: 'easy',
      tags: ['activity'],
    },
    {
      id: 'u2-v7',
      word: 'friendly',
      phonetic: '/ˈfrendli/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/71ee9518867644688c741d34eeb26d48.png',
      exampleSentence: 'My best friend is very friendly.',
      difficulty: 'easy',
      tags: ['description'],
    },
    {
      id: 'u2-v8',
      word: 'tall',
      phonetic: '/tɔːl/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/4d3dcb2dc32d4acfbe83d3d6571be8b6.png',
      exampleSentence: 'My father is very tall.',
      difficulty: 'easy',
      tags: ['description'],
    },
    {
      id: 'u2-v9',
      word: 'cousin',
      phonetic: '/ˈkʌzn/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/2dc835315fda427498bb616543418291.png',
      exampleSentence: 'My cousin lives in Beijing.',
      difficulty: 'medium',
      tags: ['family'],
    },
    {
      id: 'u2-v10',
      word: 'together',
      phonetic: '/təˈɡeðər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/22fb940a44c846cf98614019984fd76f.png',
      exampleSentence: 'We like to play together after school.',
      difficulty: 'easy',
      tags: ['description'],
    },
  ],
  lessons: [
    {
      id: 'u2-l1',
      title: 'This Is My Family',
      content: `Amy: Hello! This is my family photo.
Tom: Wow! Who is the tall man?
Amy: That is my father. He is a doctor. He is tall and strong.
Tom: And who is the woman next to him?
Amy: That is my mother. She is a nurse. She is very kind.
Tom: Who is the little girl?
Amy: That is my sister, Lily. She is four years old. She is cute!
Tom: You have a lovely family, Amy!
Amy: Thank you, Tom!`,
      audioScript: 'Amy shows Tom her family photo. Her father is a tall and strong doctor. Her mother is a kind nurse. Her little sister Lily is four years old and very cute.',
      keyPhrases: ['This is my family.', 'He/She is a ...', 'He/She is very ...', 'Who is the ...?'],
    },
    {
      id: 'u2-l2',
      title: 'My Best Friend',
      content: `My best friend is Wang Lei. He is nine years old, just like me. He is not very tall, but he is very fast. We are in the same class.

Wang Lei is friendly and funny. He likes to tell jokes. We always laugh together. His hobby is drawing. He can draw very nice pictures of animals.

After school, we play basketball together. Sometimes we ride our bikes in the park. On weekends, we go to the library and read books.

Wang Lei is a great friend. I am lucky to have him!`,
      audioScript: 'A student describes their best friend Wang Lei. He is nine years old, fast, friendly, and funny. He likes drawing and telling jokes. They play basketball, ride bikes, and read books together.',
      keyPhrases: ['My best friend is ...', 'He/She is ... years old.', 'His/Her hobby is ...', 'We ... together.'],
    },
  ],
  readings: [
    {
      id: 'u2-r1',
      title: 'A Family Picnic',
      content: `It is Sunday morning. The sun is shining. The Li family is going to the park for a picnic.

Mother makes sandwiches and fruit juice. Father packs a big blanket and a ball. Grandmother brings her famous cookies. Little brother Tom carries the kite.

At the park, they find a nice spot under a big tree. They sit on the blanket and eat lunch. The sandwiches are delicious!

After lunch, Father and Tom play with the ball. Mother reads a book. Grandmother takes a nap under the tree.

Then Tom flies his kite. It goes very high in the sky! Everyone claps and cheers.

"What a wonderful day!" says Mother. Everyone smiles and agrees.`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/e4f7c08fd8e34ea99c201890957854a0.png',
      questions: [
        {
          id: 'u2-r1-q1',
          type: 'multiple_choice',
          question: 'What day is it in the story?',
          options: ['Saturday', 'Sunday', 'Monday', 'Friday'],
          correctAnswer: 'Sunday',
          points: 10,
        },
        {
          id: 'u2-r1-q2',
          type: 'multiple_choice',
          question: 'What does Grandmother bring?',
          options: ['Sandwiches', 'A ball', 'Cookies', 'A kite'],
          correctAnswer: 'Cookies',
          points: 10,
        },
        {
          id: 'u2-r1-q3',
          type: 'true_false',
          question: 'They have a picnic at the beach.',
          correctAnswer: 'false',
          hint: 'Where do they have their picnic?',
          points: 10,
        },
        {
          id: 'u2-r1-q4',
          type: 'fill_blank',
          question: 'Tom flies his _____ in the sky.',
          correctAnswer: 'kite',
          points: 10,
        },
      ],
      isExtracurricular: false,
    },
    {
      id: 'u2-r2',
      title: 'Pen Pals',
      content: `Dear Li Hua,

My name is Emma. I am ten years old. I live in London, England. I want to be your pen pal!

Let me tell you about my family. I have a mother, a father, and a big brother named Jack. Jack is twelve. He likes football. My mother is a writer. She writes stories for children. My father is a chef. He makes the best pizza!

My hobby is reading. I love adventure stories. I also like drawing and painting. My favorite color is purple.

I have a pet cat named Whiskers. He is orange and very playful.

Please write back and tell me about your family and hobbies!

Your friend,
Emma`,
      level: 'intermediate',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/076f7713c7ac4d56bcf16b90422ab417.png',
      questions: [
        {
          id: 'u2-r2-q1',
          type: 'multiple_choice',
          question: 'Where does Emma live?',
          options: ['Paris', 'New York', 'London', 'Tokyo'],
          correctAnswer: 'London',
          points: 10,
        },
        {
          id: 'u2-r2-q2',
          type: 'multiple_choice',
          question: 'What is Emma\'s mother\'s job?',
          options: ['Teacher', 'Writer', 'Doctor', 'Chef'],
          correctAnswer: 'Writer',
          points: 10,
        },
        {
          id: 'u2-r2-q3',
          type: 'fill_blank',
          question: 'Emma\'s pet cat is named _____.',
          correctAnswer: 'Whiskers',
          points: 10,
        },
        {
          id: 'u2-r2-q4',
          type: 'multiple_choice',
          question: 'What is Emma\'s favorite color?',
          options: ['Blue', 'Red', 'Purple', 'Green'],
          correctAnswer: 'Purple',
          points: 10,
        },
      ],
      isExtracurricular: true,
    },
  ],
  exercises: [
    {
      id: 'u2-e1',
      type: 'multiple_choice',
      question: 'Your mother\'s mother is your _____.',
      options: ['aunt', 'sister', 'grandmother', 'cousin'],
      correctAnswer: 'grandmother',
      hint: 'Think about family relationships.',
      points: 10,
    },
    {
      id: 'u2-e2',
      type: 'multiple_choice',
      question: 'Which word describes someone who is nice to everyone?',
      options: ['Tall', 'Friendly', 'Fast', 'Strong'],
      correctAnswer: 'Friendly',
      points: 10,
    },
    {
      id: 'u2-e3',
      type: 'fill_blank',
      question: 'My _____ is drawing pictures.',
      correctAnswer: 'hobby',
      hint: 'Something you like to do for fun.',
      points: 15,
    },
    {
      id: 'u2-e4',
      type: 'fill_blank',
      question: 'My sister is very _____. She always helps others.',
      correctAnswer: 'kind',
      points: 15,
    },
    {
      id: 'u2-e5',
      type: 'true_false',
      question: 'A cousin is a member of your family.',
      correctAnswer: 'true',
      points: 10,
    },
    {
      id: 'u2-e6',
      type: 'true_false',
      question: 'A brother is always older than a sister.',
      correctAnswer: 'false',
      hint: 'A brother can be younger or older.',
      points: 10,
    },
    {
      id: 'u2-e7',
      type: 'matching',
      question: 'Match the family words.',
      options: ['mother', 'father', 'sister', 'brother'],
      correctAnswer: ['mom', 'dad', 'girl sibling', 'boy sibling'],
      points: 20,
    },
    {
      id: 'u2-e8',
      type: 'word_scramble',
      question: 'Unscramble the word: R-I-E-N-D-F-Y-L',
      correctAnswer: 'friendly',
      hint: 'Nice and kind to others.',
      points: 15,
    },
    {
      id: 'u2-e9',
      type: 'sentence_building',
      question: 'Put the words in order: family / my / big / is / very',
      correctAnswer: 'my family is very big',
      points: 20,
    },
    {
      id: 'u2-e10',
      type: 'image_select',
      question: 'Which picture shows a family?',
      options: ['A school', 'A family', 'A park', 'A store'],
      correctAnswer: 'A family',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/358d3b6d234c4c30ad394d251aa1285c.png',
      points: 10,
    },
  ],
};

export default unit2;
