export interface Discipline {
  id: string;
  name: string;
  slug: string;
  description: string;
  starterThinkers: string[];
  color: string;
}

export interface Thinker {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  photo?: string;
  perspective: {
    stance: string;
    approach: string;
    expertise: string[];
    leanings?: string[];
  };
  primaryDiscipline: string;
  topics: string[];
  notableWork: NotableWork[];
  links: {
    website?: string;
    twitter?: string;
    substack?: string;
    other?: string[];
  };
  complexity: 'accessible' | 'moderate' | 'advanced';
  controversiality: 'mainstream' | 'moderate' | 'controversial';
  dateAdded: string;
  featured: boolean;
  isStarter: boolean;
}

export interface NotableWork {
  title: string;
  url?: string;
  type: 'article' | 'book' | 'podcast' | 'video' | 'project' | 'talk';
  description: string;
}

