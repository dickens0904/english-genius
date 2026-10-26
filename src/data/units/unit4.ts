import type { Unit } from '@/data/types';

const unit4: Unit = {
  id: 'unit4',
  title: 'Seasons and Weather',
  theme: 'seasons, weather, outdoor activities',
  level: 1,
  color: '#96CEB4',
  icon: '🌤️',
  vocabulary: [
    {
      id: 'u4-v1',
      word: 'spring',
      phonetic: '/sprɪŋ/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/8810d32d1b3f447fbc71e6d8c9330d8b.png',
      exampleSentence: 'Flowers bloom in spring.',
      difficulty: 'easy',
      tags: ['season'],
    },
    {
      id: 'u4-v2',
      word: 'summer',
      phonetic: '/ˈsʌmər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/c168797f55154de486e3a7c8e5b97bfc.png',
      exampleSentence: 'Summer is hot and sunny.',
      difficulty: 'easy',
      tags: ['season'],
    },
    {
      id: 'u4-v3',
      word: 'autumn',
      phonetic: '/ˈɔːtəm/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/6e9c0a5803204ec8be497852089298e6.png',
      exampleSentence: 'Leaves turn red and yellow in autumn.',
      difficulty: 'easy',
      tags: ['season'],
    },
    {
      id: 'u4-v4',
      word: 'winter',
      phonetic: '/ˈwɪntər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/751d30e7f13748f899e263fe8f9e91e7.png',
      exampleSentence: 'It snows in winter.',
      difficulty: 'easy',
      tags: ['season'],
    },
    {
      id: 'u4-v5',
      word: 'sunny',
      phonetic: '/ˈsʌni/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/dd4e57ca0dbe46e1bcb06d931e50c80c.png',
      exampleSentence: 'It is a sunny day today!',
      difficulty: 'easy',
      tags: ['weather'],
    },
    {
      id: 'u4-v6',
      word: 'rainy',
      phonetic: '/ˈreɪni/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/a62caa2ac32c46b793d4ad4756be2351.png',
      exampleSentence: 'Take an umbrella. It is rainy outside.',
      difficulty: 'easy',
      tags: ['weather'],
    },
    {
      id: 'u4-v7',
      word: 'snowy',
      phonetic: '/ˈsnoʊi/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/aa3cf9eb77fa4a9f897bac697d165f43.png',
      exampleSentence: 'We can make a snowman on snowy days.',
      difficulty: 'easy',
      tags: ['weather'],
    },
    {
      id: 'u4-v8',
      word: 'cloudy',
      phonetic: '/ˈklaʊdi/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/172e7a05677d4c998957aeda5ec296f9.png',
      exampleSentence: 'The sky is cloudy today.',
      difficulty: 'easy',
      tags: ['weather'],
    },
    {
      id: 'u4-v9',
      word: 'windy',
      phonetic: '/ˈwɪndi/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/64846b5748e5434688bd2a725bc09fe2.png',
      exampleSentence: 'It is very windy. Hold your hat!',
      difficulty: 'easy',
      tags: ['weather'],
    },
    {
      id: 'u4-v10',
      word: 'temperature',
      phonetic: '/ˈtemprətʃər/',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/09869315d2614d5f9cedda17a93d31bf.png',
      exampleSentence: 'The temperature is thirty degrees today.',
      difficulty: 'hard',
      tags: ['weather', 'measurement'],
    },
  ],
  lessons: [
    {
      id: 'u4-l1',
      title: 'How Is the Weather Today?',
      content: `Miss Li: Good morning, class! How is the weather today?
Students: Good morning, Miss Li!
Tom: It is sunny! The sun is shining brightly.
Miss Li: Very good, Tom! What season is it now?
Lucy: It is spring! I can see flowers blooming outside.
Miss Li: Excellent! What do you like to do in spring?
Lucy: I like to fly kites in the park.
Tom: I like to ride my bike.
Miss Li: Spring is a wonderful season! Let us enjoy the nice weather.`,
      audioScript: 'Miss Li asks the class about the weather. It is sunny and spring. Lucy likes to fly kites and Tom likes to ride his bike. Miss Li says spring is wonderful.',
      keyPhrases: ['How is the weather today?', 'It is sunny/cloudy/rainy!', 'What season is it now?', 'I like to ... in spring.'],
    },
    {
      id: 'u4-l2',
      title: 'Four Seasons',
      content: `There are four seasons in a year: spring, summer, autumn, and winter.

In spring, the weather is warm. Flowers grow and birds sing. We can fly kites and plant trees.

In summer, the weather is hot. The sun shines brightly. We can swim and eat ice cream. We wear T-shirts and shorts.

In autumn, the weather is cool. Leaves turn red, yellow, and orange. We can pick apples and go hiking. We wear jackets.

In winter, the weather is cold. It often snows. We can make snowmen and have snowball fights. We wear coats, scarves, and gloves.

Every season is special. I love all four seasons!`,
      audioScript: 'A student describes the four seasons. Spring is warm, summer is hot, autumn is cool, and winter is cold. Each season has fun activities to do.',
      keyPhrases: ['There are four seasons.', 'In spring/summer/autumn/winter, the weather is ...', 'We can ...', 'I love all four seasons!'],
    },
    {
      id: 'u4-l3',
      title: 'Weather Report',
      content: `Good morning! Here is today's weather report for Shanghai.

Today is Monday. It is cloudy in the morning, but it will be sunny in the afternoon. The temperature is twenty-two degrees. It is a nice day!

Tomorrow will be rainy. Do not forget your umbrella! The temperature will be eighteen degrees.

On Wednesday, it will be windy. Hold on to your hat!

Thursday and Friday will be sunny and warm. The temperature will be twenty-five degrees. Perfect for outdoor activities!

Have a wonderful week, everyone!`,
      audioScript: 'A weather report for Shanghai. Monday is cloudy then sunny, Tuesday is rainy, Wednesday is windy, and Thursday and Friday are sunny and warm.',
      keyPhrases: ['It is cloudy/sunny/rainy/windy.', 'The temperature is ... degrees.', 'Do not forget your umbrella!', 'It will be ... tomorrow.'],
    },
  ],
  readings: [
    {
      id: 'u4-r1',
      title: 'My Favorite Season',
      content: `My name is Xiao Ming. My favorite season is autumn. Let me tell you why!

In autumn, the weather is cool and comfortable. It is not too hot and not too cold. The sky is blue and clear.

I love the colors of autumn. The leaves turn red, yellow, and orange. They look like beautiful paintings. Sometimes I collect pretty leaves and put them in my books.

Autumn is also harvest time. My grandparents have a small farm. We go there to pick apples and pears. The fruit is sweet and juicy.

On weekends, my family goes to the park. We have picnics under the trees. We fly kites and play games.

At night, we eat mooncakes and look at the moon. The Mid-Autumn Festival is in autumn. It is my favorite holiday!

What is your favorite season?`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/e3678d2743034cd397e7142024a69ec7.png',
      questions: [
        {
          id: 'u4-r1-q1',
          type: 'multiple_choice',
          question: 'What is Xiao Ming\'s favorite season?',
          options: ['Spring', 'Summer', 'Autumn', 'Winter'],
          correctAnswer: 'Autumn',
          points: 10,
        },
        {
          id: 'u4-r1-q2',
          type: 'multiple_choice',
          question: 'What does Xiao Ming do with the pretty leaves?',
          options: ['Throws them away', 'Puts them in books', 'Eats them', 'Gives them to friends'],
          correctAnswer: 'Puts them in books',
          points: 10,
        },
        {
          id: 'u4-r1-q3',
          type: 'true_false',
          question: 'Xiao Ming\'s grandparents have a big factory.',
          correctAnswer: 'false',
          hint: 'What do his grandparents have?',
          points: 10,
        },
        {
          id: 'u4-r1-q4',
          type: 'fill_blank',
          question: 'During the Mid-Autumn Festival, they eat _____.',
          correctAnswer: 'mooncakes',
          points: 15,
        },
      ],
      isExtracurricular: false,
    },
    {
      id: 'u4-r2',
      title: 'A Snowy Day Adventure',
      content: `One winter morning, Emma woke up and looked out the window. Everything was white! It had snowed all night.

"Yay! Snow!" Emma shouted. She quickly put on her warm coat, scarf, gloves, and boots.

She ran outside with her dog, Buddy. The snow was soft and cold under her boots. Buddy jumped and played in the snow. He was so happy!

Emma decided to build a snowman. First, she made a big snowball for the body. Then she made a smaller one for the head. She found two rocks for eyes and a carrot for the nose. She put her old scarf on the snowman.

"Hello, Mr. Snowman!" she said with a smile.

Then Emma and Buddy went sledding down the small hill near her house. They went fast! It was so much fun.

When Emma went inside, her mother gave her a cup of hot chocolate. It was warm and sweet.

"This is the best winter day ever!" said Emma.`,
      level: 'beginner',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/3d28aa8e5fbc4aaab68428681e85ec82.png',
      questions: [
        {
          id: 'u4-r2-q1',
          type: 'multiple_choice',
          question: 'What did Emma see when she woke up?',
          options: ['Rain', 'Sunshine', 'Snow', 'Wind'],
          correctAnswer: 'Snow',
          points: 10,
        },
        {
          id: 'u4-r2-q2',
          type: 'multiple_choice',
          question: 'What is the dog\'s name?',
          options: ['Max', 'Buddy', 'Charlie', 'Daisy'],
          correctAnswer: 'Buddy',
          points: 10,
        },
        {
          id: 'u4-r2-q3',
          type: 'fill_blank',
          question: 'Emma used a _____ for the snowman\'s nose.',
          correctAnswer: 'carrot',
          points: 10,
        },
        {
          id: 'u4-r2-q4',
          type: 'true_false',
          question: 'Emma went swimming in the snow.',
          correctAnswer: 'false',
          hint: 'What did Emma do in the snow?',
          points: 10,
        },
        {
          id: 'u4-r2-q5',
          type: 'multiple_choice',
          question: 'What did Emma\'s mother give her?',
          options: ['Ice cream', 'Hot chocolate', 'Juice', 'Milk'],
          correctAnswer: 'Hot chocolate',
          points: 10,
        },
      ],
      isExtracurricular: true,
    },
  ],
  exercises: [
    {
      id: 'u4-e1',
      type: 'multiple_choice',
      question: 'Which season comes after winter?',
      options: ['Summer', 'Autumn', 'Spring', 'Winter'],
      correctAnswer: 'Spring',
      hint: 'Think about the order of seasons.',
      points: 10,
    },
    {
      id: 'u4-e2',
      type: 'multiple_choice',
      question: 'What do you wear when it is cold?',
      options: ['Shorts', 'T-shirt', 'Coat', 'Sandals'],
      correctAnswer: 'Coat',
      points: 10,
    },
    {
      id: 'u4-e3',
      type: 'fill_blank',
      question: 'When it rains, you need an _____.',
      correctAnswer: 'umbrella',
      hint: 'You hold it over your head.',
      points: 15,
    },
    {
      id: 'u4-e4',
      type: 'fill_blank',
      question: 'In autumn, leaves turn red, yellow, and _____.',
      correctAnswer: 'orange',
      points: 15,
    },
    {
      id: 'u4-e5',
      type: 'true_false',
      question: 'Summer is cold and snowy.',
      correctAnswer: 'false',
      hint: 'Think about summer weather.',
      points: 10,
    },
    {
      id: 'u4-e6',
      type: 'true_false',
      question: 'You can make a snowman in winter.',
      correctAnswer: 'true',
      points: 10,
    },
    {
      id: 'u4-e7',
      type: 'matching',
      question: 'Match the season with the weather.',
      options: ['Spring', 'Summer', 'Autumn', 'Winter'],
      correctAnswer: ['Warm', 'Hot', 'Cool', 'Cold'],
      points: 20,
    },
    {
      id: 'u4-e8',
      type: 'word_scramble',
      question: 'Unscramble the word: M-R-U-S-M-E',
      correctAnswer: 'summer',
      hint: 'The hottest season.',
      points: 15,
    },
    {
      id: 'u4-e9',
      type: 'sentence_building',
      question: 'Put the words in order: weather / is / today / how / the',
      correctAnswer: 'how is the weather today',
      points: 20,
    },
    {
      id: 'u4-e10',
      type: 'image_select',
      question: 'Which picture shows snowy weather?',
      options: ['Sunny day', 'Rainy day', 'Snowy day', 'Cloudy day'],
      correctAnswer: 'Snowy day',
      imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/f1a3984003ec4a48ab825db568890ce3.png',
      points: 10,
    },
  ],
};

export default unit4;
