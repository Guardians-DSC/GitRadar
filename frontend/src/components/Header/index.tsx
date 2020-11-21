import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Manager } from '../../entities';
import { getManager, logout, verifyHasGithubToken } from '../../services/auth';
import {
  Container,
  ButtonsArea,
  Greetings,
  GreetingsArea,
  Highlight,
  Logo,
  LogoLink,
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
  const [manager] = useState<Manager | null>(getManager());

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
          <LogoLink to="/dashboard">
            <Logo src={logo} alt="GitRadar" />
          </LogoLink>
          <Greetings>
            Bem-vindo, <Highlight>{manager?.name}</Highlight>
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
        <ProfileImage src={manager?.avatar_url} alt={manager?.name} />

        <LogoutButton onClick={handleLogout}>
          Log out
          <LogoutIcon />
        </LogoutButton>
      </ButtonsArea>
    </Container>
  );
};

export default Header;
