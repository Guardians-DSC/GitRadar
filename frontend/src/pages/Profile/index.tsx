import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import validationError from '../../utils/validationError';
import { normalizeDateLabel } from '../../utils/normalizeStrings';
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
  ListsWrapper,
  SideContainer,
  ListWrapper,
  PhotoLink,
  GraphicContainer,
} from './styles';
import ListContainer from '../../components/ListContainer';
import SingleLineGraphic from '../../components/SingleLineGraphic/index';

interface ProfileParams {
  username: string;
}

interface ShowInformationProps {
  number: number;
  label: string;
  type?: 'additions' | 'deletions' | 'regular';
}

interface ChartInfo {
  name: string;
  value: number;
}

const ShowInformation: React.FC<ShowInformationProps> = ({
  number,
  label,
  type = 'regular',
}) => (
  <Information>
    <Number type={type}>{number}</Number>
    <Label>{label}</Label>
  </Information>
);

const Profile: React.FC = () => {
  const { username } = useParams<ProfileParams>();

  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingCommits, setLoadingCommits] = useState(false);

  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
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

  const [interactionsChartInfo, setTnteractionsChartInfo] = useState<ChartInfo[]>([]);

  const getStudentReport = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);
    setLoadingCommits(true);

    try {
      const response = await api.get(
        `/student/${username}/report?since=${since.toISOString()}`,
      );
      const report = response.data;
      setLoadingCommits(false);

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
      setLoadingCommits(false);
      validationError(error);
    }
  }, [username]);

  const getStudentInfo = useCallback(async () => {
    setLoadingRepos(true);
    try {
      const response = await api.get(`/student/${username}`);
      const { student, repositories: repositoriesResponse } = response.data;
      setLoadingRepos(false);

      setName(student.name);
      setPhoto(student.avatar_url);
      setRepositories(repositoriesResponse);
    } catch (error) {
      setLoadingRepos(false);
      validationError(error);
    }
  }, [username]);

  const getInteractionsVolume = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/student/${username}/interactions/volume?since=${since.toISOString()}`,
      );

      setTnteractionsChartInfo(
        response.data.map(
          (info: { value: number; date: string }): ChartInfo => {
            const infoDate = new Date(info.date);
            const infoName = normalizeDateLabel(infoDate);

            return {
              value: info.value,
              name: infoName,
            };
          },
        ),
      );
    } catch (error) {
      validationError(error);
    }
  }, [username]);

  useEffect(() => {
    getStudentReport();

    getStudentInfo();

    getInteractionsVolume();
  }, [getStudentReport, getStudentInfo, getInteractionsVolume]);

  return (
    <PageContainer>
      <Container>
        <Header />
        <ProfileContainer>
          <UserContainer>
            {photo && (
              <PhotoLink
                href={`https://github.com/${username}`}
                target="_blank"
              >
                <Photo src={photo} alt={username} />
              </PhotoLink>
            )}

            <UserInfo>
              <Username>{username}</Username>
              <Name>{name}</Name>
            </UserInfo>
          </UserContainer>

          <ReportInfo>
            <ShowInformation number={newCommits} label="Novos Commits" />
            <ShowInformation
              number={newInteractions}
              label="Novas Interações"
            />
            <ShowInformation
              type="additions"
              number={additions}
              label="Novas Linhas"
            />
            <ShowInformation
              type="deletions"
              number={deletions}
              label="Linhas Removidas"
            />
            <ShowInformation number={newForks} label="Novos Forks" />
            <ShowInformation number={newIssues} label="Novas Issues" />
            <ShowInformation number={newPrs} label="Novas PR's" />
            <ShowInformation number={newRepos} label="Novos Repositórios" />
            <ShowInformation number={newStars} label="Novas Stars" />
          </ReportInfo>
        </ProfileContainer>

        <SingleLineGraphic name="Interações" title="Crescimento de Interações" data={interactionsChartInfo}></SingleLineGraphic>

        <ListsWrapper>
          <SideContainer>
            <ListWrapper>
              <ListContainer
                listHeight={350}
                isLoading={loadingRepos}
                items={repositories}
                mapItem={item => ({
                  label: item.full_name,
                  subLabel: item.description || 'Sem descrição.',
                  link: item.html_url,
                })}
                title="Repositórios"
                isExternal
              />
            </ListWrapper>
          </SideContainer>

          <SideContainer>
            <ListWrapper>
              <ListContainer
                listHeight={280}
                isLoading={loadingCommits}
                items={commits}
                mapItem={item => {
                  const repositoryName = item.repository
                    ? item.repository.name
                    : 'Repositório indisponível';
                  const repositoryLink = item.repository
                    ? `https://github.com/${username}/${repositoryName}`
                    : '';

                  return {
                    label: repositoryName,
                    subLabel: item.message,
                    link: repositoryLink,
                  };
                }}
                title="Commits"
                isExternal
              />
            </ListWrapper>
          </SideContainer>
        </ListsWrapper>
      </Container>
    </PageContainer>
  );
};

export default Profile;
