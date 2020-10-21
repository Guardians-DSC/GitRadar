import React, { useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import api from '../../services/api';
import { confirmHasGithubToken } from '../../services/auth';
import { PageContainer, Container } from './styles';

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
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
