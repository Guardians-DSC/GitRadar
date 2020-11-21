import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import api from '../../services/api';
import { confirmHasGithubToken } from '../../services/auth';
import validationError from '../../utils/validationError';
import { normalizeInformation } from '../../utils/normalizeStrings';
import { Student } from '../../entities';
import ListContainer from '../../components/ListContainer';
import {
  PageContainer,
  Container,
  Content,
  Information,
  InformationContainer,
  InformationGrid,
  InformationTitle,
  Label,
  LeftContainer,
  MonitorButton,
  MonitorInput,
  MonitorWrapper,
  Number,
  RightContainer,
  Loading,
} from './styles';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [belowAverage, setBelowAverage] = useState<Student[]>([]);
  const [allNewInteractions, setAllNewInteractions] = useState(0);
  const [allNewCommits, setAllNewCommits] = useState(0);
  const [newInteractionsAverage, setNewInteractionsAverage] = useState(0);
  const [newCommitsAverage, setNewCommitsAverage] = useState(0);
  const [monitored, setMonitored] = useState('');

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingBelow, setLoadingBelow] = useState(false);

  const syncGithub = useCallback(async () => {
    const query = new URLSearchParams(location.search);

    const code = query.get('code');

    if (code) {
      try {
        await api.get(`/teacher/callback?code=${code}`);
        toast('Sua conta do GitHub foi vinculada com sucesso!', {
          type: 'success',
        });
        confirmHasGithubToken();
        history.push('/dashboard');
      } catch (error) {
        toast('Não foi possível vincular a conta do GitHub.', {
          type: 'error',
        });
      }
    }
  }, [location.search, history]);

  const getClassInformation = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/class/report?since=${since.toISOString()}`,
      );

      const {
        all_new_interactions,
        all_new_commits,
        new_interactions_average,
        new_commits_average,
      } = response.data;

      setAllNewInteractions(all_new_interactions);
      setAllNewCommits(all_new_commits);
      setNewInteractionsAverage(new_interactions_average);
      setNewCommitsAverage(new_commits_average);
    } catch (error) {
      validationError(error);
    }
  }, []);

  const getAllStudents = useCallback(async () => {
    setLoadingStudents(true);

    try {
      const response = await api.get('/class');

      setAllStudents(response.data);
      setLoadingStudents(false);
    } catch (error) {
      setLoadingStudents(false);
      validationError(error);
    }
  }, []);

  const getBelowAverage = useCallback(async () => {
    setLoadingBelow(true);
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/class/below_average?since=${since.toISOString()}`,
      );

      setBelowAverage(response.data);
      setLoadingBelow(false);
    } catch (error) {
      setLoadingBelow(false);
      validationError(error);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        setLoadingSubmit(true);
        await api.post('/student', {
          github_login: monitored,
        });
        setLoadingSubmit(false);

        setMonitored('');
        setAllStudents([]);
        setBelowAverage([]);

        getAllStudents();
        getBelowAverage();
      } catch (error) {
        setLoadingSubmit(false);
        validationError(error);
      }
    },
    [monitored, getAllStudents, getBelowAverage],
  );

  useEffect(() => {
    syncGithub();

    getClassInformation();

    getAllStudents();

    getBelowAverage();
  }, [syncGithub, getClassInformation, getAllStudents, getBelowAverage]);

  return (
    <PageContainer>
      <Container>
        <Header />

        <Content>
          <LeftContainer>
            <MonitorWrapper onSubmit={handleSubmit}>
              <MonitorInput
                value={monitored}
                onChange={e => setMonitored(e.target.value)}
                placeholder="Digite o usuário que deseja monitorar"
              />
              <MonitorButton type="submit">
                {loadingSubmit ? <Loading /> : 'Monitorar'}
              </MonitorButton>
            </MonitorWrapper>

            <ListContainer
              isLoading={loadingStudents}
              listHeight={285}
              title="Spots Monitorados"
              items={allStudents}
              mapItem={item => ({
                label: item.github_login,
                subLabel: item.name,
                photo: item.avatar_url,
                link: `/dashboard/${item.github_login}`,
              })}
            />
          </LeftContainer>

          <RightContainer>
            <InformationContainer>
              <InformationTitle>Informações do Radar</InformationTitle>

              <InformationGrid>
                <Information>
                  <Number>{allNewInteractions}</Number>
                  <Label>Total de novas interações</Label>
                </Information>

                <Information>
                  <Number>
                    {normalizeInformation(newInteractionsAverage)}
                  </Number>
                  <Label>Média de novas interações</Label>
                </Information>

                <Information>
                  <Number>{allNewCommits}</Number>
                  <Label>Total de novos commits</Label>
                </Information>

                <Information>
                  <Number>{normalizeInformation(newCommitsAverage)}</Number>
                  <Label>Média de novos commits</Label>
                </Information>
              </InformationGrid>
            </InformationContainer>

            <ListContainer
              isLoading={loadingBelow}
              listHeight={385}
              title="Spots com interações abaixo da média"
              items={belowAverage}
              mapItem={item => ({
                label: item.github_login,
                subLabel: item.name,
                photo: item.avatar_url,
                link: `/dashboard/${item.github_login}`,
              })}
            />
          </RightContainer>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
