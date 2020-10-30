import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import validationError from '../../utils/validationError';
import { Commit, Repository } from '../../entities';
import {
  PageContainer,
  Container,
  Information,
  Label,
  Name,
  Number,
  Photo,
  ProfileContainer,
  ReportInfo,
  UserContainer,
  UserInfo,
  Username,
} from './styles';

interface ProfileParams {
  username: string;
}

interface ShowInformationProps {
  number: number;
  label: string;
}

const ShowInformation: React.FC<ShowInformationProps> = ({ number, label }) => (
  <Information>
    <Number>{number}</Number>
    <Label>{label}</Label>
  </Information>
);

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
  const [repositories, setRepositories] = useState<Repository[]>([]);

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

  const getRepositories = useCallback(async () => {
    try {
      const response = await api.get(`/student/${username}/repositories`);
      setRepositories(response.data);
    } catch (error) {
      validationError(error);
    }
  }, []);

  useEffect(() => {
    getStudentReport();

    getRepositories();
  }, [getStudentReport, getRepositories]);

  return (
    <PageContainer>
      <Container>
        <Header />

        <ProfileContainer>
          <UserContainer>
            <Photo />

            <UserInfo>
              <Username>davigsousa</Username>
              <Name>Davi Sousa</Name>
            </UserInfo>
          </UserContainer>

          <ReportInfo>
            <ShowInformation number={newCommits} label="Novos Commits" />
            <ShowInformation
              number={newInteractions}
              label="Novas Interações"
            />
            <ShowInformation number={additions} label="Novas Linhas" />
            <ShowInformation number={deletions} label="Linhas Removidas" />
            <ShowInformation number={newForks} label="Novos Forks" />
            <ShowInformation number={newIssues} label="Novas Issues" />
            <ShowInformation number={newPrs} label="Novas PR's" />
            <ShowInformation number={newRepos} label="Novas Repositórios" />
            <ShowInformation number={newStars} label="Novas Stars" />
          </ReportInfo>
        </ProfileContainer>
      </Container>
    </PageContainer>
  );
};

export default Profile;
