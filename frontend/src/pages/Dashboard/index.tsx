import React, { useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import api from '../../services/api';
import { confirmHasGithubToken } from '../../services/auth';
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

  useEffect(() => {
    syncGithub();
  }, [syncGithub]);

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

            <StudentsList title="Alunos Monitorados" students={[]} />
          </LeftContainer>

          <RightContainer>
            <InformationContainer>
              <InformationTitle>Informações da Turma</InformationTitle>

              <InformationGrid>
                <Information>
                  <Number>0</Number>
                  <Label>Total de novas interações</Label>
                </Information>

                <Information>
                  <Number>0</Number>
                  <Label>Média de novas interações</Label>
                </Information>

                <Information>
                  <Number>0</Number>
                  <Label>Total de novos commits</Label>
                </Information>

                <Information>
                  <Number>0</Number>
                  <Label>Média de novos commits</Label>
                </Information>
              </InformationGrid>
            </InformationContainer>

            <StudentsList
              title="Alunos com interações abaixo da média"
              students={[]}
            />
          </RightContainer>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
