import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { PageContainer, Container } from './styles';

interface ProfileParams {
  username: string;
}

const Profile: React.FC = () => {
  const { username } = useParams<ProfileParams>();

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
