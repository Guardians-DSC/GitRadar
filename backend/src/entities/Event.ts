interface Commit {
  message: string;
  sha: string;
}

export default interface Event {
  type: string;
  repo: {
    id: string;
    name: string;
    url: string;
  };
  payload: {
    commits?: Commit[];
  };
  created_at: string;
}
