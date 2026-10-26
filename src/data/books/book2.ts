import type { Reading } from '@/data/types';

const book2: Reading = {
  id: 'book2',
  title: 'A Day at the Zoo',
  content: `Last Saturday, Emma and her family went to the Shanghai Zoo. Emma was very excited because she loved animals!

When they arrived, Emma saw a big sign: "Welcome to the Zoo!" Her little brother Tom pointed at the map. "Let us go see the pandas first!" he said.

They walked to the panda house. Two giant pandas were eating bamboo. One panda was sitting on a rock. The other one was lying on the grass. They looked so cute and fluffy!

"Pandas eat bamboo for about twelve hours a day," said Emma's mother, reading a sign. "That is a lot of bamboo!"

Next, they visited the monkey area. The monkeys were jumping from branch to branch. Some baby monkeys were riding on their mothers' backs. One clever monkey was peeling a banana. Everyone laughed!

"Monkeys are very smart animals," said Emma's father. "They can use tools and solve problems."

Then they went to the aquarium. Emma pressed her face against the glass. She saw colorful fish, a big sea turtle, and even sharks! The sharks were swimming slowly and gracefully.

"Do not worry," said Tom. "The glass is very thick!"

After lunch, they visited the elephant area. The elephants were huge! One elephant sprayed water with its long trunk. Tom got a little wet, and everyone laughed.

"The elephant's trunk has about forty thousand muscles!" said Emma's mother. "That is amazing!"

The last stop was the bird house. There were parrots of every color: red, blue, green, and yellow. One parrot said, "Hello! Hello!" Tom tried to talk back to it.

At the end of the day, Emma bought a small toy panda from the gift shop. "This was the best day ever!" she said.

On the way home, Tom fell asleep in the car. Emma looked at her toy panda and smiled. She could not wait to come back to the zoo again!`,
  level: 'beginner',
  imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/4b021519981d45b7944f70f8e741704e.png',
  questions: [
    {
      id: 'book2-q1',
      type: 'multiple_choice',
      question: 'Where did Emma and her family go?',
      options: ['The park', 'The zoo', 'The museum', 'The beach'],
      correctAnswer: 'The zoo',
      points: 10,
    },
    {
      id: 'book2-q2',
      type: 'multiple_choice',
      question: 'What do pandas eat?',
      options: ['Fish', 'Bananas', 'Bamboo', 'Meat'],
      correctAnswer: 'Bamboo',
      points: 10,
    },
    {
      id: 'book2-q3',
      type: 'fill_blank',
      question: 'The parrot said, "_____! Hello!"',
      correctAnswer: 'Hello',
      points: 10,
    },
    {
      id: 'book2-q4',
      type: 'true_false',
      question: 'Elephants have about forty thousand muscles in their trunk.',
      correctAnswer: 'true',
      points: 10,
    },
    {
      id: 'book2-q5',
      type: 'multiple_choice',
      question: 'What did Emma buy from the gift shop?',
      options: ['A toy monkey', 'A toy panda', 'A toy elephant', 'A toy parrot'],
      correctAnswer: 'A toy panda',
      points: 10,
    },
  ],
  isExtracurricular: true,
};

export default book2;
