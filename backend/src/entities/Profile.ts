import Repository from './Repository';

export default interface Profile {
  github_login: string;
  avatar_url: string;
  repositories: Repository[];
}
