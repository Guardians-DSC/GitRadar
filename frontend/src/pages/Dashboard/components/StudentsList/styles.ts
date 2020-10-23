import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.h3`
  margin-bottom: 2vh;
`;

interface ListProps {
  height?: number;
}

export const List = styled.div`
  overflow-y: scroll;
  width: 100%;
  max-height: ${(props: ListProps) =>
    props.height ? `calc(100vh - ${props.height}px)` : '100%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Person = styled.button`
  border: none;
  background: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
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
`;

export const Username = styled.p`
  font-size: 20px;
  color: #3d3d4d;
  font-weight: 500;
`;

export const Name = styled.p`
  color: #a8a8b3;
`;

export const Arrow = styled.div``;
