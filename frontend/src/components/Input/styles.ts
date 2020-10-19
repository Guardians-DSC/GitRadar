import styled from 'styled-components';

interface ContainerProps {
  width?: string;
  containsIcon?: boolean;
  margin?: string;
}

export const Container = styled.div`
  background-color: #e1e1e1;
  color: #a4a4a4;
  width: ${(props: ContainerProps) => props.width || '250px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 47px;
  padding-left: ${(props: ContainerProps) =>
    props.containsIcon ? '10px' : '0'};
  margin: ${(props: ContainerProps) => props.margin || '0'};
`;

export const InputContainer = styled.input`
  border: none;
  background: none;
  margin-left: 10px;
  height: 100%;
  width: 100%;
`;
