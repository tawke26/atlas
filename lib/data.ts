import fs from 'fs';
import path from 'path';
import { Discipline, Thinker } from './types';

const disciplinesPath = path.join(process.cwd(), 'disciplines.json');
const thinkersDir = path.join(process.cwd(), 'thinkers');

export function getDisciplines(): Discipline[] {
  const fileContents = fs.readFileSync(disciplinesPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.disciplines;
}

export function getDisciplineBySlug(slug: string): Discipline | null {
  const disciplines = getDisciplines();
  return disciplines.find(d => d.slug === slug) || null;
}

export function getAllThinkers(): Thinker[] {
  const filenames = fs.readdirSync(thinkersDir);
  
  return filenames
    .filter(name => name.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(thinkersDir, filename);
      let fileContents = fs.readFileSync(filePath, 'utf8');
      // Remove BOM if present
      if (fileContents.charCodeAt(0) === 0xFEFF) {
        fileContents = fileContents.slice(1);
      }
      return JSON.parse(fileContents) as Thinker;
    });
}

export function getThinkerBySlug(slug: string): Thinker | null {
  try {
    const filePath = path.join(thinkersDir, `${slug}.json`);
    let fileContents = fs.readFileSync(filePath, 'utf8');
    // Remove BOM if present
    if (fileContents.charCodeAt(0) === 0xFEFF) {
      fileContents = fileContents.slice(1);
    }
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

export function getThinkersByDiscipline(disciplineId: string): Thinker[] {
  const allThinkers = getAllThinkers();
  return allThinkers.filter(t => t.primaryDiscipline === disciplineId);
}

export function getStarterThinkers(disciplineId: string): Thinker[] {
  const allThinkers = getAllThinkers();
  return allThinkers.filter(
    t => t.primaryDiscipline === disciplineId && t.isStarter
  );
}

export function getRandomThinker(excludeSlugs: string[] = []): Thinker | null {
  const thinkers = getAllThinkers().filter(t => !excludeSlugs.includes(t.slug));
  
  if (thinkers.length === 0) return null;
  
  return thinkers[Math.floor(Math.random() * thinkers.length)];
}

export function getNextThinker(currentSlug: string, disciplineId?: string): Thinker | null {
  const currentThinker = getThinkerBySlug(currentSlug);
  if (!currentThinker) return null;
  
  const targetDiscipline = disciplineId || currentThinker.primaryDiscipline;
  
  // 70% chance: same discipline
  // 30% chance: different discipline
  const useSameDiscipline = Math.random() < 0.7;
  
  if (useSameDiscipline) {
    const sameDisciplineThinkers = getThinkersByDiscipline(targetDiscipline)
      .filter(t => t.slug !== currentSlug);
    
    if (sameDisciplineThinkers.length > 0) {
      return sameDisciplineThinkers[
        Math.floor(Math.random() * sameDisciplineThinkers.length)
      ];
    }
  }
  
  // Fall back to random from any discipline
  return getRandomThinker([currentSlug]);
}

