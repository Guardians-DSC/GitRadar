import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`;

export const MessageArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GreetingsArea = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonsArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  height: 70%;
  margin-right: 40px;
`;

export const Greetings = styled.h3``;

export const Highlight = styled.span`
  color: #04d361;
`;

export const SyncMessage = styled.p``;

export const Sync = styled.button`
  border: none;
  background: none;
`;

export const ProfileImage = styled.img`
  height: 60%;
  border-radius: 50%;
  margin-right: 20px;
`;

export const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #3d3d4d;
`;

export const LogoutIcon = styled(BiPowerOff)`
  color: #04d361;
  margin-left: 10px;
`;
