import { Teacher } from '../entities';

export const TOKEN_KEY = '@GitRadar-Token';
export const TEACHER_KEY = '@Logged-Teacher';

export const isAuthenticated = (): boolean =>
  localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getUser = (): Teacher | null => {
  const teacherJSON = localStorage.getItem(TEACHER_KEY);

  if (teacherJSON) {
    return JSON.parse(teacherJSON);
  }

  return null;
};

export const login = (token: string, teacher: Teacher): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TEACHER_KEY, JSON.stringify(teacher));
};

export const logout = (): void => {
  localStorage.clear();
};
