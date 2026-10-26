export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getEmojiForCategory(category: string): string {
  const emojiMap: Record<string, string> = {
    subject: '📚',
    school: '🏫',
    family: '👨‍👩‍👧‍👦',
    food: '🍔',
    drink: '🥤',
    fruit: '🍎',
    healthy: '💪',
    animal: '🐾',
    weather: '🌤️',
    season: '🍂',
    activity: '🎮',
    sport: '⚽',
    music: '🎵',
    art: '🎨',
    science: '🔬',
    math: '🔢',
    reading: '📖',
    writing: '✏️',
    reward: '⭐',
    place: '📍',
    description: '💬',
    meal: '🍽️',
    meat: '🍗',
    clothing: '👕',
    color: '🌈',
    number: '🔢',
    time: '🕐',
    greeting: '👋',
    emotion: '😊',
    body: '🦴',
    transport: '🚌',
    nature: '🌿',
    measurement: '📏',
    item: '📦',
  };
  return emojiMap[category] || '📝';
}
