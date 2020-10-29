import { ImSpinner2 } from 'react-icons/im';
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

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`;

export const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 50px;
`;

export const MonitorWrapper = styled.form`
  width: 425px;
  height: 48px;
  display: flex;
  margin-bottom: 40px;
`;

export const MonitorInput = styled.input`
  flex: 1;
  background-color: #e8e8ec;
  border: none;
  border-radius: 8px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 10px;
`;

export const MonitorButton = styled.button`
  border: none;
  background-color: #04d361;
  color: white;
  height: 100%;
  padding: 5px 13px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const InformationTitle = styled.h3`
  margin-bottom: 10px;
`;

export const InformationGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
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

export const Loading = styled(ImSpinner2)`
  font-size: 20px;
  color: white;

  animation-name: rotating;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
