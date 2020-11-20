import api from '../githubApi/GraphQLApi';

interface Request {
  github_login: string;
  date: string;
}

interface Commit {
  repository: {
    id: string;
    name: string;
    url: string;
  };
  commit_url: string;
  sha: string;
  message: string;
  additions: number;
  deletions: number;
}

interface Response {
  user: {
    github_login: string;
    avatar_url: string;
  };
  payload: {
    new_interactions: number;
    new_repositories: number;
    new_prs: number;
    new_issues: number;
    new_commits: number;
    additions: number;
    deletions: number;
    commits: Commit[];
  };
}

interface RepositoryNode {
  nameWithOwner: string;
  id: string;
  url: string;
  defaultBranchRef: Branch;
}

interface Branch {
  target: Target;
}

interface Target {
  history: CommitHistory;
}

interface CommitHistory {
  nodes: CommitNode[];
}

interface CommitNode {
  commitUrl: string;
  author: {
    user: {
      login: string;
      name: string;
    };
  };
  message: string;
  additions: number;
  deletions: number;
  id: string;
}

class GetDailyReportService {
  async execute({ github_login, date }: Request): Promise<Response> {
    const data = await api.post('', {
      query: this.getQuery(github_login, date),
    });

    const {
      repositories,
      contributionsCollection,
      avatarUrl,
    } = data.data.data.user;

    const {
      totalIssueContributions,
      totalCommitContributions,
      totalRepositoryContributions,
      totalPullRequestContributions,
      totalPullRequestReviewContributions,
    } = contributionsCollection;

    const repositoriesNodes: RepositoryNode[] = repositories.nodes;

    const filteredRepositories = repositoriesNodes.filter(rep => {
      return rep.defaultBranchRef.target.history.nodes.length > 0;
    });

    const commits: Commit[] = this.getCommits(
      github_login,
      filteredRepositories,
    );

    const { additions, deletions } = this.getLines(commits);

    const payload = {
      new_interactions:
        totalIssueContributions +
        totalCommitContributions +
        totalRepositoryContributions +
        totalPullRequestContributions +
        totalPullRequestReviewContributions,
      new_repositories: totalRepositoryContributions,
      new_prs: totalPullRequestContributions,
      new_issues: totalIssueContributions,
      new_commits: totalCommitContributions,
      additions,
      deletions,
      commits,
    };

    return {
      user: {
        avatar_url: avatarUrl,
        github_login,
      },
      payload,
    };
  }

  private getLines(
    commits: Commit[],
  ): { additions: number; deletions: number } {
    let additions = 0;
    let deletions = 0;

    for (const commit of commits) {
      const {
        additions: commit_additions,
        deletions: commit_deletions,
      } = commit;

      additions += commit_additions;
      deletions += commit_deletions;
    }

    return { additions, deletions };
  }

  private getCommits(
    github_login: string,
    repositories: RepositoryNode[],
  ): Commit[] {
    const commits: Commit[] = [];

    for (const repository of repositories) {
      const {
        nameWithOwner,
        id: repository_id,
        defaultBranchRef,
        url,
      } = repository;

      const repositoryCommits = defaultBranchRef.target.history.nodes;

      const spotCommits = repositoryCommits.filter(({ author }) => {
        const { login } = author.user;

        return login === github_login;
      });

      for (const commit of spotCommits) {
        const {
          additions,
          deletions,
          id: commit_id,
          message,
          commitUrl,
        } = commit;

        const serializedCommit: Commit = {
          additions,
          deletions,
          message,
          sha: commit_id,
          commit_url: commitUrl,
          repository: {
            id: repository_id,
            name: nameWithOwner,
            url,
          },
        };

        commits.push(serializedCommit);
      }
    }

    return commits;
  }

  private getQuery(github_login: string, date: string): string {
    const query = `{
        user(login:"${github_login}") {
          avatarUrl
          repositories(first: 100, privacy: PUBLIC, affiliations: COLLABORATOR) {
            nodes {
              nameWithOwner
              id
              url
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 100, since: "${date}") {
                      nodes {
                        ... on Commit {
                          commitUrl
                          author {
                            user {
                              login
                              name
                            }
                          }
                          message
                          additions
                          deletions
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          contributionsCollection(from: "${date}") {
            totalIssueContributions
            totalCommitContributions
            totalRepositoryContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
          }
        }
      }`;

    return query;
  }
}

export default GetDailyReportService;
