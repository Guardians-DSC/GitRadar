export interface Teacher {
  github_login: string;
  name: string;
  email: string;
  avatar_url: string;
  github_id: string;
}

export interface Student {
  id: string;
  teacher_id: string;
  github_login: string;
  name: string;
  avatar_url: string;
  top_language: string;
  github_id: string;
}
