import styled from 'styled-components';

export const Container = styled.button`
  border: none;
  background: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  transition: 0.2s;
  padding: 0 10px;

  &:hover {
    transform: scale(1.01);
  }
`;

export const Photo = styled.img`
  height: 70px;
  border-radius: 50%;
`;

export const InfoContainer = styled.div`
  padding-left: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: start;
`;

export const Label = styled.p`
  font-size: 20px;
  color: #3d3d4d;
  font-weight: 500;
`;

export const SubLabel = styled.p`
  color: #a8a8b3;
`;

export const Arrow = styled.img`
  margin: 0 10px 0 5px;
`;
