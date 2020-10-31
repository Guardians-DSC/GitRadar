import styled from 'styled-components';
import { ImSpinner2 } from 'react-icons/im';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
`;

interface ListProps {
  height?: number;
}

export const List = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  max-height: ${(props: ListProps) =>
    props.height ? `calc(100vh - ${props.height}px)` : '100%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const NotFound = styled.p`
  margin-top: 20px;
`;

export const Loading = styled(ImSpinner2)`
  font-size: 40px;
  margin-top: 30px;
  color: #04d361;

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
