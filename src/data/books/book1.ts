import type { Reading } from '@/data/types';

const book1: Reading = {
  id: 'book1',
  title: 'The Magic School Bus: Journey to the Stars',
  content: `Ms. Frizzle's class was learning about space. "Today, we are going on a special field trip!" she said with a big smile. The students cheered.

They all climbed into the Magic School Bus. Ms. Frizzle pressed a red button. The bus started to shake and rumble. Wings popped out of the sides. The wheels folded up. The bus turned into a rocket!

"WOW!" shouted the children as they flew up into the sky. They passed through the clouds. They flew higher and higher. Soon, they were in space!

"Look! That is the Moon!" said Carlos. The Moon was big and gray. It had many holes on its surface called craters.

"The Moon does not make its own light," explained Ms. Frizzle. "It reflects light from the Sun, just like a mirror!"

They flew past the Moon and saw Mars. Mars looked red and dusty. "Mars is called the Red Planet because of the red dust on its surface," said Ms. Frizzle.

Then they saw something beautiful. Rings of ice and rock surrounded a giant planet. "That is Saturn!" said Wanda. "It is so beautiful!"

"The rings are made of billions of pieces of ice and rock," said Ms. Frizzle. "Some pieces are as small as grains of sand. Some are as big as houses!"

They flew past Jupiter, the biggest planet. They saw Venus, the brightest planet. They even saw a shooting star zoom past the bus!

"Space is amazing!" said Arnold. "There is so much to learn!"

"Remember, class," said Ms. Frizzle. "Take chances, make mistakes, and get messy! That is how we learn!"

The Magic School Bus turned around and flew back to Earth. When they landed at school, everyone had a big smile on their face. It was the best field trip ever!`,
  level: 'intermediate',
  imageUrl: 'https://platform-outputs.agnes-ai.space/images/t2i/3531d77f4b284e6f9d0f5afbde056952.png',
  questions: [
    {
      id: 'book1-q1',
      type: 'multiple_choice',
      question: 'What did the Magic School Bus turn into?',
      options: ['A boat', 'A rocket', 'A submarine', 'A helicopter'],
      correctAnswer: 'A rocket',
      points: 10,
    },
    {
      id: 'book1-q2',
      type: 'multiple_choice',
      question: 'Why is Mars called the Red Planet?',
      options: ['Because it is very hot', 'Because of red dust on its surface', 'Because it is made of red rock', 'Because it glows red at night'],
      correctAnswer: 'Because of red dust on its surface',
      points: 10,
    },
    {
      id: 'book1-q3',
      type: 'fill_blank',
      question: 'The holes on the Moon\'s surface are called _____.',
      correctAnswer: 'craters',
      hint: 'They look like big bowls in the ground.',
      points: 15,
    },
    {
      id: 'book1-q4',
      type: 'true_false',
      question: 'Saturn\'s rings are made of water.',
      correctAnswer: 'false',
      hint: 'What are the rings made of?',
      points: 10,
    },
    {
      id: 'book1-q5',
      type: 'multiple_choice',
      question: 'What is the biggest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Venus'],
      correctAnswer: 'Jupiter',
      points: 10,
    },
  ],
  isExtracurricular: true,
};

export default book1;
