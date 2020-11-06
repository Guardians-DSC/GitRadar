import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  align-items: flex-start;
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

export const LogoLink = styled(Link)`
  height: 70%;
  margin-right: 30px;
`;

export const Logo = styled.img`
  height: 100%;
`;

export const Greetings = styled.h3`
  font-size: 22px;
`;

export const Highlight = styled.span`
  color: #04d361;
`;

export const SyncMessage = styled.p`
  margin-left: 55px;
  font-size: 20px;
`;

export const Sync = styled.button`
  border: none;
  background: none;
  font-size: 20px;
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
