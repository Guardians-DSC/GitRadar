import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 1000px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ProfileContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Photo = styled.img`
  width: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Username = styled.h1``;

export const Name = styled.p``;

export const ReportInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 68%;
`;

export const Information = styled.div`
  padding: 10px;
`;

export const Number = styled.h1`
  font-size: 28px;
`;

export const Label = styled.p`
  color: #6c6c80;
`;

export const ListsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;

export const SideContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;
`;

export const ListWrapper = styled.div`
  width: 100%;
`;
