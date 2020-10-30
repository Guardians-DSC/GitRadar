import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import validationError from '../../utils/validationError';
import { Commit } from '../../entities';
import { PageContainer, Container } from './styles';

interface ProfileParams {
  username: string;
}

const Profile: React.FC = () => {
  const { username } = useParams<ProfileParams>();

  const [newCommits, setNewCommits] = useState(0);
  const [newInteractions, setNewInteractions] = useState(0);
  const [additions, setAdditions] = useState(0);
  const [deletions, setDeletions] = useState(0);
  const [newForks, setNewForks] = useState(0);
  const [newIssues, setNewIssues] = useState(0);
  const [newPrs, setNewPrs] = useState(0);
  const [newRepos, setNewRepos] = useState(0);
  const [newStars, setNewStars] = useState(0);
  const [commits, setCommits] = useState<Commit[]>([]);

  const getStudentReport = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/student/${username}/report?since=${since.toISOString()}`,
      );
      const report = response.data;

      setNewCommits(report.new_commits);
      setNewInteractions(report.new_interactions);
      setAdditions(report.additions);
      setDeletions(report.deletions);
      setNewForks(report.new_forks);
      setNewIssues(report.new_issues);
      setNewPrs(report.new_prs);
      setNewRepos(report.new_repositories);
      setNewStars(report.new_stars);
      setCommits(report.commits);
    } catch (error) {
      validationError(error);
    }
  }, []);

  return (
    <PageContainer>
      <Container>
        <Header />
        {username}
      </Container>
    </PageContainer>
  );
};

export default Profile;
