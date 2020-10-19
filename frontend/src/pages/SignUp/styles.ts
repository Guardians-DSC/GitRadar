import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 100%;
`;

export const Title = styled.h2`
  margin: 30px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  margin-top: 25px;
  width: 100%;
`;

export const BackButton = styled(Link)`
  border: none;
  background: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  text-decoration: none;
  color: black;
`;

export const BackButtonIcon = styled(BsArrowLeft)`
  color: #04d361;
  font-size: 22px;
  margin-right: 10px;
`;
