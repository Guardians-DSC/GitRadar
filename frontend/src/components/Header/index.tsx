import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Teacher } from '../../entities';
import { getTeacher, logout, verifyHasGithubToken } from '../../services/auth';
import {
  Container,
  ButtonsArea,
  Greetings,
  GreetingsArea,
  Highlight,
  Logo,
  LogoutButton,
  LogoutIcon,
  MessageArea,
  ProfileImage,
  SyncMessage,
  Sync,
} from './styles';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const history = useHistory();
  const [teacher] = useState<Teacher | null>(getTeacher());

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  const handleSync = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;

    if (clientId) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?client_id=${clientId}`,
      );
    }
  };

  return (
    <Container>
      <MessageArea>
        <GreetingsArea>
          <Logo src={logo} />
          <Greetings>
            Bem-vindo, <Highlight>{teacher?.name}</Highlight>
          </Greetings>
        </GreetingsArea>
        {!verifyHasGithubToken() && (
          <SyncMessage>
            Clique{' '}
            <Sync onClick={handleSync}>
              <Highlight>aqui</Highlight>
            </Sync>{' '}
            para vincular sua conta do github
          </SyncMessage>
        )}
      </MessageArea>

      <ButtonsArea>
        <ProfileImage src={teacher?.avatar_url} alt={teacher?.name} />

        <LogoutButton onClick={handleLogout}>
          Log out
          <LogoutIcon />
        </LogoutButton>
      </ButtonsArea>
    </Container>
  );
};

export default Header;
