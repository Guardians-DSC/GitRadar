export interface Manager {
  github_login: string;
  name: string;
  email: string;
  avatar_url: string;
  github_id: string;
}

export interface Spot {
  id: string;
  teacher_id: string;
  github_login: string;
  name: string;
  avatar_url: string;
  top_language: string;
  github_id: string;
}

export interface Commit {
  sha: string;
  additions: number;
  deletions: number;
  message: string;
  repository?: {
    name: string;
    url: string;
  };
}

export interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  github_id: string;
}
