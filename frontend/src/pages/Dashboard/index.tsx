import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import api from '../../services/api';
import { confirmHasGithubToken } from '../../services/auth';
import validationError from '../../utils/validationError';
import { Student } from '../../entities';
import StudentsList from './components/StudentsList';
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
    try {
      const response = await api.get('/class');

      setAllStudents(response.data);
    } catch (error) {
      validationError(error);
    }
  }, []);

  const getBelowAverage = useCallback(async () => {
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    try {
      const response = await api.get(
        `/class/below_average?since=${since.toISOString()}`,
      );

      setBelowAverage(response.data);
    } catch (error) {
      validationError(error);
    }
  }, []);

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
            <MonitorWrapper>
              <MonitorInput placeholder="Digite o usuário que deseja monitorar" />
              <MonitorButton>Monitorar</MonitorButton>
            </MonitorWrapper>

            <StudentsList
              listHeight={300}
              title="Alunos Monitorados"
              students={allStudents}
            />
          </LeftContainer>

          <RightContainer>
            <InformationContainer>
              <InformationTitle>Informações da Turma</InformationTitle>

              <InformationGrid>
                <Information>
                  <Number>{allNewInteractions}</Number>
                  <Label>Total de novas interações</Label>
                </Information>

                <Information>
                  <Number>{newInteractionsAverage}</Number>
                  <Label>Média de novas interações</Label>
                </Information>

                <Information>
                  <Number>{allNewCommits}</Number>
                  <Label>Total de novos commits</Label>
                </Information>

                <Information>
                  <Number>{newCommitsAverage}</Number>
                  <Label>Média de novos commits</Label>
                </Information>
              </InformationGrid>
            </InformationContainer>

            <StudentsList
              listHeight={420}
              title="Alunos com interações abaixo da média"
              students={belowAverage}
            />
          </RightContainer>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
