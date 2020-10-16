import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container, InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  width?: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, width, ...props }) => {
  return (
    <Container width={width} containsIcon={!!Icon}>
      {Icon && <Icon size={20} />}
      <InputContainer {...props} />
    </Container>
  );
};

export default Input;
