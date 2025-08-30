export interface Education {
  id: number;
  profile: number;
  degree: string;
  institution: string;
  start_year: number;
  end_year?: number;
}

export interface Skill {
  id: number;
  profile: number;
  name: string;
  level?: string;
}

export interface Project {
  id: number;
  profile: number;
  title: string;
  description: string;
  link?: string;
  tech_stack?: string[];
}

export interface Work {
  id: number;
  profile: number;
  company: string;
  role: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

export interface Link {
  id: number;
  profile: number;
  type: string;
  url: string;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  bio?: string;
  profilePic?: File | string;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  work: Work[];
  links: Link[];
}
