interface Commit {
  message: string;
}

export default interface Event {
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits: Commit[];
  };
  created_at: string;
}
