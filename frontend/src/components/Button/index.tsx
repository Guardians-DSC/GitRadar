import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({ label, width }) => (
  <ButtonContainer width={width}>{label}</ButtonContainer>
);

export default Button;
