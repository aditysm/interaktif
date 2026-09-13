export interface Question {
  id: number;
  text: string;
  answer: string;
  hint: string;
}

export interface MemoryCard {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  caption: string;
}

export interface AppConfig {
  partnerName: string;
  questions: Question[];
  memories: MemoryCard[];
  gdriveUrl: string;
  musicUrl: string;
  loveLetter?: string;
}
