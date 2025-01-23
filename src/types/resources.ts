export interface Resource {
  title: string;
  description: string;
  level: string;
  duration: string;
  icon?: string;
  link: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface FacultyResources {
  courses: Resource[];
  skills: Skill[];
}

export type FacultyType = 'data-science' | 'bioinformatics' | 'computational-math';
