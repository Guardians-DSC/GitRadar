import styled from 'styled-components';

interface ButtonContainerProps {
  width?: string;
}

// eslint-disable-next-line import/prefer-default-export
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
  }
`;
