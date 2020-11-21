import { Teacher } from '../entities';

export const TOKEN_KEY = '@GitRadar-Token';
export const MANAGER_KEY = '@Logged-Teacher';
export const HAS_GITHUB_KEY = '@Github-Token';

export const isAuthenticated = (): boolean =>
  localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getTeacher = (): Teacher | null => {
  const teacherJSON = localStorage.getItem(MANAGER_KEY);

  if (teacherJSON) {
    return JSON.parse(teacherJSON);
  }

  return null;
};

export const confirmHasGithubToken = (): void => {
  localStorage.setItem(HAS_GITHUB_KEY, 'true');
};

export const verifyHasGithubToken = (): boolean => {
  const result = localStorage.getItem(HAS_GITHUB_KEY);

  return result === 'true';
};

export const login = (
  token: string,
  teacher: Teacher,
  hasGithubToken: boolean,
): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(MANAGER_KEY, JSON.stringify(teacher));
  localStorage.setItem(HAS_GITHUB_KEY, String(hasGithubToken));
};

export const logout = (): void => {
  localStorage.clear();
};
