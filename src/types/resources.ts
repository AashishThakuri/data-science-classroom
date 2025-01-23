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

export interface EducationalResource {
  id: string;
  title: string;
  url: string;
  description: string;
  resource_type: 'course' | 'book' | 'video' | 'article';
  class_level: string;
  subject: string;
  thumbnail_url: string | null;
  author: string;
  platform: string;
  language: string;
  is_free: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
}
