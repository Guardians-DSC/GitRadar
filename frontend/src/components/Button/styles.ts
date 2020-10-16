import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ImSpinner2 } from 'react-icons/im';

interface ButtonContainerProps extends ButtonHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export const ButtonContainer = styled.button`
  width: ${(props: ButtonContainerProps) => props.width || '250px'};
  height: 47px;
  border: none;
  border-radius: 8px;
  background-color: #04d361;
  color: white;
  transition: 0.3s;

  &:hover {
    filter: brightness(70%);
    cursor: ${(props: ButtonContainerProps) =>
      props.disabled ? 'not-allowed' : 'pointer'};
  }
`;

export const Loading = styled(ImSpinner2)`
  font-size: 25px;

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
