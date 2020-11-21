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
  SingleGraph,
} from './styles';
import ListContainer from '../../components/ListContainer';
import SimpleLineChart from '../../components/SimpleLineChart/index';
import SimpleBarChart from '../../components/SimpleBarChart/index';

interface ProfileParams {
  spotId: string;
}

interface ShowInformationProps {
  number: number;
  label: string;
  type?: 'additions' | 'deletions' | 'regular';
}

interface SimpleLineChartInfo {
  date: string;
  value: number;
}

interface LinesGrowthChartInfo {
  date: string;
  gains: number;
  loss: number;
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
  const { spotId } = useParams<ProfileParams>();

  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingCommits, setLoadingCommits] = useState(false);

  const [photo, setPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [newCommits, setNewCommits] = useState(0);
  const [newInteractions, setNewInteractions] = useState(0);
  const [additions, setAdditions] = useState(0);
  const [deletions, setDeletions] = useState(0);
  const [newIssues, setNewIssues] = useState(0);
  const [newPrs, setNewPrs] = useState(0);
  const [newRepos, setNewRepos] = useState(0);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [interactionsChartInfo, setInteractionsChartInfo] = useState<
    SimpleLineChartInfo[]
  >([]);

  const [linesGrowthChartInfo, setLinesGrowthChartInfo] = useState<
    LinesGrowthChartInfo[]
  >([]);

  const getSpotReport = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);
    setLoadingCommits(true);

    try {
      const response = await api.get(
        `/spot/${spotId}/report?since=${since.toISOString()}`,
      );
      const { spot, metrics, commits: responseCommits } = response.data;
      setLoadingCommits(false);

      setName(spot.name);
      setPhoto(spot.avatar_url);
      setUsername(spot.github_login);
      setRepositories([]);

      setNewCommits(metrics.new_commits);
      setNewInteractions(metrics.new_interactions);
      setAdditions(metrics.additions);
      setDeletions(metrics.deletions);
      setNewIssues(metrics.new_issues);
      setNewPrs(metrics.new_prs);
      setNewRepos(metrics.new_repositories);

      setCommits(responseCommits);
    } catch (error) {
      setLoadingCommits(false);
      validationError(error);
    }
  }, [spotId]);

  const getInteractionsVolume = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/spot/volume/${spotId}/interactions?since=${since.toISOString()}`,
      );

      setInteractionsChartInfo(
        response.data.map(
          (info: { value: number; date: string }): SimpleLineChartInfo => {
            const infoDate = new Date(info.date);
            const infoName = normalizeDateLabel(infoDate);

            return {
              value: info.value,
              date: infoName,
            };
          },
        ),
      );
    } catch (error) {
      validationError(error);
    }
  }, [spotId]);

  const getLinesGrowhtVolume = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/spot/volume/${spotId}/lines?since=${since.toISOString()}`,
      );

      setLinesGrowthChartInfo(
        response.data.map(
          (info: {
            gains: number;
            loss: number;
            date: string;
          }): LinesGrowthChartInfo => {
            const infoDate = new Date(info.date);
            const infoName = normalizeDateLabel(infoDate);

            return {
              gains: info.gains,
              loss: info.loss,
              date: infoName,
            };
          },
        ),
      );
    } catch (error) {
      validationError(error);
    }
  }, [spotId]);

  useEffect(() => {
    getSpotReport();

    getInteractionsVolume();

    getLinesGrowhtVolume();
  }, [getSpotReport, getInteractionsVolume, getLinesGrowhtVolume]);

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
            <ShowInformation number={newIssues} label="Novas Issues" />
            <ShowInformation number={newPrs} label="Novas PR's" />
            <ShowInformation number={newRepos} label="Novos Repositórios" />
          </ReportInfo>
        </ProfileContainer>

        <SingleGraph>
          <SimpleLineChart
            lines={[
              {
                dataKey: 'value',
                name: 'Interações',
                stroke: '#04D361',
              },
            ]}
            title="Crescimento de Interações"
            data={interactionsChartInfo}
            xAxisName="date"
          />
        </SingleGraph>

        <SingleGraph>
          <SimpleBarChart
            bars={[
              {
                dataKey: 'gains',
                name: 'Linhas Adicionadas',
                fill: '#04D361',
              },
              {
                dataKey: 'loss',
                name: 'Linhas Removidas',
                fill: '#F34444',
              },
            ]}
            title="Linhas Adicionadas e Removidas"
            data={linesGrowthChartInfo}
            xAxisName="date"
          />
        </SingleGraph>

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
