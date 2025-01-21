export enum Moods {
  Happy = 3,
  Neutral = 2,
  Sad = 1
};

export type Mood = {
  id: number;
  date: string;
  mood: Moods.Happy | Moods.Neutral | Moods.Sad
};

