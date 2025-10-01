import fs from 'fs';
import path from 'path';

export interface Question {
  id: string;
  slug: string;
  question: string;
  hook: string;
  difficulty?: string;
  tags?: string[];
  perspectives: any[];
  relatedQuestions?: string[];
}

// Get all available questions
export function getAllQuestions(): Question[] {
  const questionsDir = path.join(process.cwd(), 'data', 'questions');
  
  if (!fs.existsSync(questionsDir)) {
    return [];
  }

  const files = fs.readdirSync(questionsDir).filter(file => file.endsWith('.json'));
  
  const questions = files.map(file => {
    const filePath = path.join(questionsDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const cleanContents = fileContents.replace(/^\uFEFF/, '');
    return JSON.parse(cleanContents) as Question;
  });

  return questions.sort((a, b) => a.id.localeCompare(b.id));
}

// Get today's question based on date
export function getTodaysQuestion(): Question | null {
  const questions = getAllQuestions();
  
  if (questions.length === 0) {
    return null;
  }

  // Use days since epoch to determine which question to show
  const today = new Date();
  const epochStart = new Date('2025-01-01'); // Start date for rotation
  const daysSinceEpoch = Math.floor(
    (today.getTime() - epochStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Rotate through questions
  const questionIndex = daysSinceEpoch % questions.length;
  return questions[questionIndex];
}

// Get a preview of tomorrow's question (just title and hook)
export function getTomorrowsPreview(): { question: string; hook: string } | null {
  const questions = getAllQuestions();
  
  if (questions.length === 0) {
    return null;
  }

  const today = new Date();
  const epochStart = new Date('2025-01-01');
  const daysSinceEpoch = Math.floor(
    (today.getTime() - epochStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  const tomorrowIndex = (daysSinceEpoch + 1) % questions.length;
  const tomorrowQuestion = questions[tomorrowIndex];

  return {
    question: tomorrowQuestion.question,
    hook: tomorrowQuestion.hook
  };
}

// Get archive of past questions (last 30 days)
export function getQuestionArchive(days: number = 30): Array<{ date: string; question: Question }> {
  const questions = getAllQuestions();
  
  if (questions.length === 0) {
    return [];
  }

  const today = new Date();
  const epochStart = new Date('2025-01-01');
  const archive: Array<{ date: string; question: Question }> = [];

  for (let i = 0; i < days; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - i);
    
    const daysSinceEpoch = Math.floor(
      (pastDate.getTime() - epochStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    const questionIndex = daysSinceEpoch % questions.length;
    
    archive.push({
      date: pastDate.toISOString().split('T')[0],
      question: questions[questionIndex]
    });
  }

  return archive;
}

