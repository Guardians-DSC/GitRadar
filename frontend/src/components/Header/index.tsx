import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Teacher } from '../../entities';
import { getTeacher, logout } from '../../services/auth';
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
} from './styles';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const history = useHistory();
  const [teacher] = useState<Teacher | null>(getTeacher());

  const handleLogout = () => {
    logout();
    history.push('/login');
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

        <SyncMessage>
          Clique <Highlight>aqui</Highlight> para vincular sua conta do github
        </SyncMessage>
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
